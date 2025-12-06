#!/usr/bin/env node

/**
 * Validation script to check for common translation issues in MDX files
 * Run with: npm run validate:translations
 */

const fs = require('fs');
const path = require('path');

const I18N_DIR = path.join(__dirname, '..', 'i18n');
const DOCS_DIR = path.join(__dirname, '..', 'docs');

// Patterns to check for
const ISSUES = {
  missingImports: {
    pattern: /<img src=\{(\w+)\}/g,
    message: 'Missing import for image component',
    check: (content, filePath) => {
      const matches = [...content.matchAll(/<img src=\{(\w+)\}/g)];
      const imports = [...content.matchAll(/import (\w+) from/g)];
      const importedNames = new Set(imports.map(m => m[1]));
      
      return matches
        .filter(m => !importedNames.has(m[1]))
        .map(m => `Line ${getLineNumber(content, m.index)}: Missing import for ${m[1]}`);
    }
  },
  brokenLinks: {
    pattern: /\]\((\/[^)]+)\)/g,
    message: 'Potentially broken link',
    check: (content, filePath) => {
      const matches = [...content.matchAll(/\]\((\/[^)]+)\)/g)];
      const issues = [];
      
      matches.forEach(match => {
        const link = match[1];
        // Check for old-style links that should be updated
        if (link.startsWith('/installation') && !link.startsWith('/reference-client/install-and-setup/installation')) {
          issues.push(`Line ${getLineNumber(content, match.index)}: Old installation link: ${link}`);
        }
        if (link.startsWith('/vc-rpc') && !link.startsWith('/reference-client/rpc-reference/vc-rpc')) {
          issues.push(`Line ${getLineNumber(content, match.index)}: Old vc-rpc link: ${link}`);
        }
        if (link.startsWith('/dao-cli') && !link.startsWith('/reference-client/cli-reference/dao-cli')) {
          issues.push(`Line ${getLineNumber(content, match.index)}: Old dao-cli link: ${link}`);
        }
      });
      
      return issues;
    }
  },
  malformedDetails: {
    pattern: /<details><summary>/g,
    message: 'Malformed details tag (should be on separate lines)',
    check: (content, filePath) => {
      const matches = [...content.matchAll(/<details><summary>/g)];
      return matches.map(m => `Line ${getLineNumber(content, m.index)}: <details><summary> should be on separate lines`);
    }
  },
  duplicateContent: {
    pattern: /(.+)\n\1\n/g,
    message: 'Potential duplicate content',
    check: (content, filePath) => {
      const lines = content.split('\n');
      const issues = [];
      let inCodeBlock = false;
      
      for (let i = 0; i < lines.length - 1; i++) {
        // Track code blocks
        if (lines[i].trim().startsWith('```')) {
          inCodeBlock = !inCodeBlock;
          continue;
        }
        
        // Check for duplicate lines
        if (lines[i].trim() && lines[i] === lines[i + 1] && lines[i].length > 20) {
          const trimmed = lines[i].trim();
          
          // Skip if it looks like a URL, file path, or long technical output (common in examples)
          const isUrl = trimmed.startsWith('http://') || trimmed.startsWith('https://');
          const isPath = trimmed.startsWith('~/.') || trimmed.startsWith('/') || trimmed.match(/^[a-zA-Z]:\\/);
          const isLongTechnical = trimmed.length > 80 || trimmed.includes('{') || trimmed.includes('[') || trimmed.includes('(');
          
          // For code blocks, only flag short text duplicates (likely errors)
          // For non-code blocks, flag all duplicates
          if (inCodeBlock) {
            // In code blocks: only flag short, simple text duplicates (likely translation errors)
            if (!isUrl && !isPath && !isLongTechnical && trimmed.length < 60) {
              issues.push(`Lines ${i + 1}-${i + 2}: Potential duplicate in code block: ${lines[i].substring(0, 50)}...`);
            }
          } else {
            // Outside code blocks: flag all duplicates except URLs/paths
            if (!isUrl && !isPath) {
              issues.push(`Lines ${i + 1}-${i + 2}: Potential duplicate: ${lines[i].substring(0, 50)}...`);
            }
          }
        }
      }
      return issues;
    }
  }
};

function getLineNumber(content, index) {
  return content.substring(0, index).split('\n').length;
}

function validateFile(filePath) {
  let content;
  try {
    content = fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    throw new Error(`Failed to read file: ${error.message}`);
  }
  
  const issues = [];
  
  for (const [issueType, config] of Object.entries(ISSUES)) {
    try {
      const fileIssues = config.check(content, filePath);
      if (fileIssues.length > 0) {
        issues.push({
          type: issueType,
          message: config.message,
          details: fileIssues
        });
      }
    } catch (error) {
      // Log but don't fail for individual check errors
      console.warn(`Warning: Error in ${issueType} check for ${filePath}: ${error.message}`);
    }
  }
  
  return issues;
}

function getAllMdFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      getAllMdFiles(filePath, fileList);
    } else if (file.endsWith('.md')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

function main() {
  console.log('Validating translation files...\n');
  
  if (!fs.existsSync(I18N_DIR)) {
    console.error(`Error: i18n directory not found at ${I18N_DIR}`);
    process.exit(1);
  }
  
  const files = getAllMdFiles(I18N_DIR);
  
  if (files.length === 0) {
    console.log('No translation files found in i18n directory.');
    process.exit(0);
  }
  
  console.log(`Checking ${files.length} translation file(s)...\n`);
  
  let totalIssues = 0;
  const filesWithIssues = [];
  
  files.forEach(file => {
    try {
      const issues = validateFile(file);
      if (issues.length > 0) {
        filesWithIssues.push({ file, issues });
        totalIssues += issues.reduce((sum, issue) => sum + issue.details.length, 0);
      }
    } catch (error) {
      console.error(`Error validating ${file}: ${error.message}`);
      // Don't fail the entire validation for a single file error
    }
  });
  
  if (filesWithIssues.length === 0) {
    console.log('No issues found!');
    process.exit(0);
  }
  
  console.log(`Found ${totalIssues} issue(s) in ${filesWithIssues.length} file(s):\n`);
  
  filesWithIssues.forEach(({ file, issues }) => {
    // Use path.relative with normalized paths for cross-platform compatibility
    const relativePath = path.relative(process.cwd(), file).replace(/\\/g, '/');
    console.log(`\n${relativePath}:`);
    issues.forEach(issue => {
      console.log(`  [${issue.type}] ${issue.message}`);
      issue.details.forEach(detail => {
        console.log(`    - ${detail}`);
      });
    });
  });
  
  console.log('\n');
  process.exit(1);
}

if (require.main === module) {
  main();
}

module.exports = { validateFile, ISSUES };

