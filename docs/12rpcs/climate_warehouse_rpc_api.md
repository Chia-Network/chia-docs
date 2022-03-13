---
sidebar_position: 4
---
# 12.4 Climate Warehouse (Beta) RPC API

[todo: add intro]
[todo: add commands]
---

## Reference

### `organizations`

Functionality: Use GET, POST, and PUT to list, create, and update organizations

GET Options: None

GET Example to list organizations:

```json
// Request
curl --location --request GET 'localhost:31310/v1/organizations' --header 'Content-Type: application/json'

// Response
{
    "77641db780adc6c74f1ff357804e26a799e4a09157f426aac588963a39bdb2d9":{
        "orgUid":"77641db780adc6c74f1ff357804e26a799e4a09157f426aac588963a39bdb2d9",
        "name":"Org Test",
        "icon":"https://climate-warehouse.s3.us-west-2.amazonaws.com/public/orgs/me.svg",
        "isHome":true,
        "subscribed":true
    }
}
```

POST Options:

| Key                | Type       | Description |
|:------------------:|:----------:|:------------|
| name               | text       | (Required) Name of the organization to be created
| icon               | text       | (Required) URL of the icon to be used for this organization
| language           | text       | The language used for this organization

POST Example to create an organization:

```json
// Request
curl --location --header 'Content-Type: application/json' --request POST \
     -F 'name=DanSample' \
     -F 'icon=https://climate-warehouse.s3.us-west-2.amazonaws.com/public/orgs/me.svg' \
     'localhost:31310/v1/organizations/create'
[todo fix + add language]
 {
      "name": "POST Organization",
      "request": {
        "method": "POST",
        "header": [],
        "body": {
          "mode": "raw",
          "raw": "{\r\n    \"name\": \"New Org\",\r\n    \"icon\": \"https://climate-warehouse.s3.us-west-2.amazonaws.com/public/orgs/me.svg\"\r\n}",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        },
        "url": {
          "raw": "{{default}}/organizations/",
          "host": ["{{default}}"],
          "path": ["organizations", ""]
        }
      },
      "response": []
    },
    {
      "name": "POST Create Organization",
      "request": {
        "method": "POST",
        "header": [],
        "url": {
          "raw": "{{default}}/organizations/create",
          "host": ["{{default}}"],
          "path": ["organizations", "create"]
        }
      },
      "response": []
    },
// Response

```

PUT Options:

| Key                | Type       | Description |
|:------------------:|:----------:|:------------|
| name               | text       | (Required) Name of the organization to be created
| icon               | text       | (Required) URL of the icon to be used for this organization
| language           | text       | The language used for this organization

PUT Example to update an organization:
[todo update]
```json
// Request
curl --location --header 'Content-Type: application/json' --request PUT 'localhost:31310/v1/organizations'


   
    {
      "name": "PUT Organization",
      "request": {
        "method": "PUT",
        "header": [],
        "url": {
          "raw": "{{default}}/organizations/",
          "host": ["{{default}}"],
          "path": ["organizations", ""]
        }
      },
      "response": []
    }
  ],
  "auth": {
    "type": "basic",
    "basic": [
      {
        "key": "username",
        "value": "<Basic Auth Username>",
        "type": "string"
      },
      {
        "key": "password",
        "value": "<Basic Auth Password>",
        "type": "string"
      }
    ]
  },
  "variable": [
    {
      "key": "baseUrl",
      "value": "localhost:3000",
      "type": "string"
    }
  ]
}
// Response
```

-----

### `audit`

Functionality: Show the complete history of an organization

Options:

| Key                | Type       | Description |
|:------------------:|:----------:|:------------|
| orgUid             | Hex String | (Required) Display subscribed projects matching this orgUid |

Example:

```json
// Request
curl --location --request GET 'localhost:31310/v1/audit?orgUid=77641db780adc6c74f1ff357804e26a799e4a09157f426aac588963a39bdb2d9' --header 'Content-Type: application/json'

// Response
[{
  "id":2,
  "orgUid":"77641db780adc6c74f1ff357804e26a799e4a09157f426aac588963a39bdb2d9",
  "registryId":"9508ff7a1851ead7702b28f37f36145a0b389e374e2b82504b6ceb977ea41ada",
  "rootHash":"0x0000000000000000000000000000000000000000000000000000000000000000",
  "type":"CREATE REGISTRY",
  "change":null,
  "table":null,
  "onchainConfirmationTimeStamp":0,
  "createdAt":"2022-03-09T05:22:53.217Z",
  "updatedAt":"2022-03-09T05:22:53.217Z"
},{
  "id":3,
  "orgUid":"77641db780adc6c74f1ff357804e26a799e4a09157f426aac588963a39bdb2d9",
  "registryId":"9508ff7a1851ead7702b28f37f36145a0b389e374e2b82504b6ceb977ea41ada",
  "rootHash":"0x4e25dd858553085c246546085f7d79140c2f78db8fc3ff8e34e73c849f3844df",
  "type":"INSERT",
  "change":"{
    \"currentRegistry\":\"Gold Standard\",
    \"registryOfOrigin\":\"Gold Standard\",
    \"originProjectId\":\"555\",
    \"projectId\":\"555\",
    \"projectName\":\"Stop Deforestation\",
    \"projectLink\":\"http://testurl.com\",
    \"projectDeveloper\":\"Example Developer\",
    \"sector\":\"Agriculture Forestry and Other Land Use (AFOLU)\",
    \"projectType\":\"Soil Enrichment\",
    \"coveredByNDC\":\"Unknown\",
    \"projectStatus\":\"Listed\",
    \"unitMetric\":\"tCO2e\",
    \"methodology\":\"Decomposition of fluoroform (HFC-23) waste streams --- Version 6.0.0\",
    \"projectStatusDate\":\"2022-03-02T00:00:00.000Z\",
    \"warehouseProjectId\":\"51ca9638-22b0-4e14-ae7a-c09d23b37b58\",
    \"timeStaged\":1646803417,
    \"orgUid\":\"77641db780adc6c74f1ff357804e26a799e4a09157f426aac588963a39bdb2d9\"
  }",
  "table":"project",
  "onchainConfirmationTimeStamp":1646803574,
  "createdAt":"2022-03-09T05:27:23.266Z",
  "updatedAt":"2022-03-09T05:27:23.266Z"
},{"id":4,
  ...
  abbreviated (output is same as above)
  ...
}
```
-----

### `projects`

Functionality: List subscribed projects, as specified by the appropriate URL option(s)

Query string options:

| Key                | Type       | Description |
|:------------------:|:----------:|:------------|
| None (default)     | N/A        | Display all subscribed projects |
| warehouseProjectId | Hex String | Only display subscribed projects matching this warehouseProjectId |
| orgUid             | Hex String | [todo: update]Only display subscribed projects matching this orgUid |
| search             | Text       | Display all subscribed projects that contain the specified query (case insensitive) |
| columns            | Text       | Limit the result to the specified column. Can be used multiple times to show multiple columns
| limit              | Number     | Limit the number subscribed projects to be displayed (must be used with page, eg `?page=5&limit=2`) |
| page               | Number     | Only display results from this page number (must be used with limit, eg `?page=5&limit=2`) |
| xls                | Boolean    | If `true`, save the results to xls (Excel spreadsheet) format |

Example without a query string, which will show all subscribed projects:

```json
// Request
curl --location --request GET 'localhost:31310/v1/projects' --header 'Content-Type: application/json'

// Response
[{
    "warehouseProjectId":"9b9bb857-c71b-4649-b805-a289db27dc1c",
    "orgUid":"77641db780adc6c74f1ff357804e26a799e4a09157f426aac588963a39bdb2d9",
    "currentRegistry":"Climate Action Reserve (CAR)",
    "projectId":"789",
    "originProjectId":"123",
    "registryOfOrigin":"Sweden National Registry",
    "program":null,
    "projectName":"Stop Desertification",
    "projectLink":"desertificationtest.com",
    "projectDeveloper":"Dev 2",
    "sector":"Fugitive emissions – from fuels (solid, oil and gas)",
    "projectType":"Coal Mine Methane",
    "projectTags":null,
    "coveredByNDC":"Outside NDC",
    "ndcInformation":null,
    "projectStatus":"Registered",
    "projectStatusDate":"2022-02-02T00:00:00.000Z",
    "unitMetric":"tCO2e",
    "methodology":"Substitution of CO2 from fossil or mineral origin by CO2 from biogenic residual sources in the production of inorganic compounds --- Version 3.0",
    "validationBody":null,
    "validationDate":null,
    "timeStaged":1646975765,
    "createdAt":"2022-03-11T05:17:55.427Z",
    "updatedAt":"2022-03-11T05:17:55.427Z",
    "projectLocations":[{
        "id":"8182100d-7794-4df7-b3b3-758391d13011",
        "warehouseProjectId":"9b9bb857-c71b-4649-b805-a289db27dc1c",
        "orgUid":"77641db780adc6c74f1ff357804e26a799e4a09157f426aac588963a39bdb2d9",
        "country":"Latvia",
        "inCountryRegion":null,
        "geographicIdentifier":"Sample Identifier",
        "timeStaged":null,
        "createdAt":"2022-03-11T05:17:55.425Z",
        "updatedAt":"2022-03-11T05:17:55.425Z"
    }],
    "labels":[{
        "id":"dcacd68e-1cfb-4f06-9798-efa0aacda42c",
        "warehouseProjectId":"9b9bb857-c71b-4649-b805-a289db27dc1c",
        "orgUid":"77641db780adc6c74f1ff357804e26a799e4a09157f426aac588963a39bdb2d9",
        "label":"Sample Label",
        "labelType":"Certification",
        "creditingPeriodStartDate":"2014-03-29T00:00:00.000Z",
        "creditingPeriodEndDate":"2022-03-30T00:00:00.000Z",
        "validityPeriodStartDate":"2017-03-08T00:00:00.000Z",
        "validityPeriodEndDate":"2025-03-19T00:00:00.000Z",
        "unitQuantity":40,
        "labelLink":"http://samplelabel.net",
        "timeStaged":null,
        "createdAt":"2022-03-11T05:17:55.426Z",
        "updatedAt":"2022-03-11T05:17:55.426Z"
    }],
    "issuances":[{
        "id":"d9f58b08-af25-461c-88eb-403bb02b135e",
        "orgUid":"77641db780adc6c74f1ff357804e26a799e4a09157f426aac588963a39bdb2d9",
        "warehouseProjectId":"9b9bb857-c71b-4649-b805-a289db27dc1c",
        "startDate":"2022-01-02T00:00:00.000Z",
        "endDate":"2022-02-11T00:00:00.000Z",
        "verificationApproach":"Sample Approach",
        "verificationReportDate":"2022-03-16T00:00:00.000Z",
        "verificationBody":"Sample Body",
        "timeStaged":null,
        "createdAt":"2022-03-11T05:17:55.426Z",
        "updatedAt":"2022-03-11T05:17:55.426Z"
    }],
    "coBenefits":[{
        "id":"73cfbe9c-8cea-4aca-94d8-f1641e686787",
        "warehouseProjectId":"9b9bb857-c71b-4649-b805-a289db27dc1c",
        "orgUid":"77641db780adc6c74f1ff357804e26a799e4a09157f426aac588963a39bdb2d9",
        "cobenefit":"Sample Benefit",
        "timeStaged":null,
        "createdAt":"2022-03-11T05:17:55.424Z",
        "updatedAt":"2022-03-11T05:17:55.424Z"
    }],
    "relatedProjects":[{
        "id":"e880047e-cdf4-45bb-a9df-e706fa427713",
        "warehouseProjectId":"9b9bb857-c71b-4649-b805-a289db27dc1c",
        "orgUid":"77641db780adc6c74f1ff357804e26a799e4a09157f426aac588963a39bdb2d9",
        "relatedProjectId":"333",
        "relationshipType":"Sample",
        "registry":null,
        "timeStaged":null,
        "createdAt":"2022-03-11T05:17:55.426Z",
        "updatedAt":"2022-03-11T05:17:55.426Z"
    }],
    "projectRatings":[{
        "id":"d31c3c75-b944-498d-9557-315f9005f478",
        "warehouseProjectId":"9b9bb857-c71b-4649-b805-a289db27dc1c",
        "orgUid":"77641db780adc6c74f1ff357804e26a799e4a09157f426aac588963a39bdb2d9",
        "ratingType":"CCQI",
        "ratingRangeHighest":"100",
        "ratingRangeLowest":"0",
        "rating":"97",
        "ratingLink":"testlink.com",
        "timeStaged":null,
        "createdAt":"2022-03-11T05:17:55.427Z",
        "updatedAt":"2022-03-11T05:17:55.427Z"
    }],
    "estimations":[{
        "id":"c73fb4e7-3bd0-4449-8a57-6137b7c95a1f",
        "warehouseProjectId":"9b9bb857-c71b-4649-b805-a289db27dc1c",
        "orgUid":"77641db780adc6c74f1ff357804e26a799e4a09157f426aac588963a39bdb2d9",
        "creditingPeriodStart":"2022-02-04T00:00:00.000Z",
        "creditingPeriodEnd":"2022-03-04T00:00:00.000Z",
        "unitCount":100,
        "timeStaged":null,
        "createdAt":"2022-03-11T05:17:55.427Z",
        "updatedAt":"2022-03-11T05:17:55.427Z"
    }]
    
},{
    "warehouseProjectId":"51ca9638-22b0-4e14-ae7a-c09d23b37b58",
    "orgUid":"77641db780adc6c74f1ff357804e26a799e4a09157f426aac588963a39bdb2d9",
    "currentRegistry":"Gold Standard",
    "projectId":"555",
    "originProjectId":"555",
    "registryOfOrigin":"Gold Standard",
    "program":null,
    "projectName":"Stop Deforestation",
    "projectLink":"http://testurl.com",
    "projectDeveloper":"Example Developer",
    "sector":"Agriculture Forestry and Other Land Use (AFOLU)",
    "projectType":"Soil Enrichment",
    "projectTags":null,
    "coveredByNDC":"Unknown",
    "ndcInformation":null,
    "projectStatus":"Listed",
    "projectStatusDate":"2022-03-02T00:00:00.000Z",
    "unitMetric":"tCO2e",
    "methodology":"Decomposition of fluoroform (HFC-23) waste streams --- Version 6.0.0",
    "validationBody":null,
    "validationDate":null,
    "timeStaged":1646803417,
    "createdAt":"2022-03-11T05:17:55.422Z",
    "updatedAt":"2022-03-11T05:17:55.422Z",
    "projectLocations":[],
    "labels":[],
    "issuances":[],
    "coBenefits":[],
    "relatedProjects":[],
    "projectRatings":[],
    "estimations":[]
}]
```
-----

Example using a query string of `warehouseProjectId`:

```json
// Request
curl --location --request GET 'localhost:31310/v1/projects?warehouseProjectId=51ca9638-22b0-4e14-ae7a-c09d23b37b58' --header 'Content-Type: application/json'

// Response
{
    "warehouseProjectId":"51ca9638-22b0-4e14-ae7a-c09d23b37b58",
    "orgUid":"77641db780adc6c74f1ff357804e26a799e4a09157f426aac588963a39bdb2d9",
    "currentRegistry":"Gold Standard",
    "projectId":"555",
    ...
    abbreviated (output is same as above)
    ...
}
```
-----

Example using a query string of `orgUid`:

```json
// Request
curl --location --request GET 'localhost:31310/v1/projects?orgUid=77641db780adc6c74f1ff357804e26a799e4a09157f426aac588963a39bdb2d9' --header 'Content-Type: application/json'

// Response
[{
    "warehouseProjectId":"9b9bb857-c71b-4649-b805-a289db27dc1c",
    "orgUid":"77641db780adc6c74f1ff357804e26a799e4a09157f426aac588963a39bdb2d9",
    "currentRegistry":"Climate Action Reserve (CAR)",
    "projectId":"789",
    ...
    abbreviated (output is same as above)
    ...
},{
    "warehouseProjectId":"51ca9638-22b0-4e14-ae7a-c09d23b37b58",
    "orgUid":"77641db780adc6c74f1ff357804e26a799e4a09157f426aac588963a39bdb2d9",
    "currentRegistry":"Gold Standard",
    "projectId":"555",
    ...
    abbreviated (output is same as above)
    ...
}]

```
-----

Example using a query string of `search`:

```json
// Request
curl --location --request GET 'localhost:31310/v1/projects?search=forestry' --header 'Content-Type: application/json'

// Response
[{
    "warehouseProjectId":"51ca9638-22b0-4e14-ae7a-c09d23b37b58",
    "orgUid":"77641db780adc6c74f1ff357804e26a799e4a09157f426aac588963a39bdb2d9",
    "currentRegistry":"Gold Standard",
    "projectId":"555",
    "originProjectId":"555",
    "registryOfOrigin":"Gold Standard",
    "program":null,
    "projectName":"Stop Deforestation",
    "projectLink":"http://testurl.com",
    "projectDeveloper":"Example Developer",
    "sector":"Agriculture Forestry and Other Land Use (AFOLU)",
    ...
    abbreviated (output is same as above)
    ...
}
```
-----

Example using a query string of `page` and `limit`:

```json
// Request
curl --location --request GET 'localhost:31310/v1/projects?page=2&limit=1' --header 'Content-Type: application/json'

// Response
{
    "page":2,
    "pageCount":2,
    "data":[{
        "warehouseProjectId":"51ca9638-22b0-4e14-ae7a-c09d23b37b58",
        "orgUid":"77641db780adc6c74f1ff357804e26a799e4a09157f426aac588963a39bdb2d9",
        "currentRegistry":"Gold Standard",
        "projectId":"555",
        ...
        abbreviated (output is same as above)
        ...
    }]
}
```
-----

Example using a query string of `page`, `limit` and `orgUid`:

```json
// Request
curl --location --request GET 'localhost:31310/v1/projects?page=2&limit=1&orgUid=77641db780adc6c74f1ff357804e26a799e4a09157f426aac588963a39bdb2d9' --header 'Content-Type: application/json'

// Response
{
    "page":2,
    "pageCount":2,
    "data":[{
        "warehouseProjectId":"51ca9638-22b0-4e14-ae7a-c09d23b37b58",
        "orgUid":"77641db780adc6c74f1ff357804e26a799e4a09157f426aac588963a39bdb2d9",
        "currentRegistry":"Gold Standard",
        "projectId":"555",
        ...
        abbreviated (output is same as above)
        ...
    }]
}
```
-----

Example using a query string of `page`, `limit` and `search`:

```json
// Request
curl --location --request GET 'localhost:31310/v1/projects?page=1&limit=1&search=gold' --header 'Content-Type: application/json'

// Response

{
  "page":1,
  "pageCount":1,
  "data":[{
    "warehouseProjectId":"51ca9638-22b0-4e14-ae7a-c09d23b37b58",
    "orgUid":"77641db780adc6c74f1ff357804e26a799e4a09157f426aac588963a39bdb2d9",
    "currentRegistry":"Gold Standard",
    "projectId":"555",
    ...
    abbreviated (output is same as above)
    ...
  }]
}
```
-----

Example using a query string of `xls=true`:

```json
// Request
curl --location --request GET 'localhost:31310/v1/projects?xls=true' --header 'Content-Type: application/json' > cw_query.xlsx

// Response
The results are saved to a file in the current directory called `cw_query.xlsx`.
```
-----

Example using a query string using `page`, `limit` and `columns` to show only the requested six columns:

```json
// Request
curl --location --request GET 'http://localhost:31310/v1/projects?page=1&limit=5&columns=warehouseProjectId&columns=currentRegistry&columns=registryOfOrigin&columns=originProjectId&columns=program&columns=projectName' --header 'Content-Type: application/json'
// Response

{
  "page":1,
  "pageCount":1,
  "data":[{
    "warehouseProjectId":"9b9bb857-c71b-4649-b805-a289db27dc1c",
    "currentRegistry":"Climate Action Reserve (CAR)",
    "registryOfOrigin":"Sweden National Registry",
    "originProjectId":"123",
    "program":null,
    "projectName":"Stop Desertification"
  },{
    "warehouseProjectId":"51ca9638-22b0-4e14-ae7a-c09d23b37b58",
    "currentRegistry":"Gold Standard",
    "registryOfOrigin":"Gold Standard",
    "originProjectId":"555",
    "program":null,
    "projectName":"Stop Deforestation"
  }]
}
```
-----

Example using POST to stage a new project with the minimum required fields:

```json
// Request
curl --location --request POST \
     -F 'projectId=c9d147e2-bc07-4e68-a76d-43424fa8cd4e' \
     -F 'originProjectId=12345-123-123-12345' \
     -F 'registryOfOrigin=UNFCCC' \
     -F 'projectName=POST sample' \
     -F 'projectLink=http://testurl.com' \
     -F 'projectDeveloper=POST developer' \
     -F 'sector=Manufacturing industries' \
     -F 'projectType=Conservation' \
     -F 'coveredByNDC=Inside NDC' \
     -F 'projectStatus=Registered' \
     -F 'projectStatusDate=2022-03-12' \
     -F 'ndcInformation=Shuffletag' \
     -F 'unitMetric=tCO2e' \
     -F 'methodology=Integrated Solar Combined Cycle (ISCC) projects --- Version 1.0.0' \
     'http://localhost:31310/v1/projects'
// Response
{"message":"Project staged successfully"}
```
-----

For the next example, we'll use file named `createProject.csv` with the following contents:
```
currentRegistry,projectId,registryOfOrigin,program,projectName,projectLink,projectDeveloper,sector,projectType,coveredByNDC,ndcInformation,projectStatus,projectStatusDate,unitMetric,methodology
123,Abcde-12345,500,,Example,https://exampleurl,Example Developer,Viva,,NO,Outside NDC,Registered,3/10/2022,tCO2e,Quatz
```

Example using POST to stage a new project from a csv file.

```json
// Request
curl --location --request POST 'http://localhost:31310/v1/projects/batch' --form 'csv=@"./createProject.csv"'

// Response
{"message":"CSV processing complete, your records have been added to the staging table."}
```
-----

Example using PUT to update a pre-existing project using only the required parameters

```json
// Request
curl --location -g --request PUT 'http://localhost:31310/v1/projects' \
--header 'Content-Type: application/json' \
--data-raw '{
    "warehouseProjectId": "51ca9638-22b0-4e14-ae7a-c09d23b37b58",
    "projectId": "987",
    "originProjectId": "555",
    "registryOfOrigin": "Verra",
    "projectName": "Stop Deforestation",
    "projectLink": "http://testurl.com",
    "projectDeveloper": "Example Developer",
    "sector": "Mining/Mineral production",
    "projectType": "Afforestation",
    "coveredByNDC": "Inside NDC",
    "ndcInformation": "Shuffletag",
    "projectStatus": "Listed",
    "projectStatusDate": "2022-03-19",
    "unitMetric": "tCO2e",
    "methodology": "Baseline methodology for water pumping efficiency improvements --- Version 2.0"
}'

// Response
{"message":"Project update added to staging"}
```
-----

For the next example, we'll use file named `updateProject.xlsx` created from a csv file with the following contents:
```
currentRegistry,projectId,registryOfOrigin,program,projectName,projectLink,projectDeveloper,sector,projectType,coveredByNDC,ndcInformation,projectStatus,projectStatusDate,unitMetric,methodology
112233,Aabbccddee-1122334455,600,,Example after updating,https://exampleurl,Example Developer,Viva,,NO,Outside NDC,Registered,3/10/2022,tCO2e,Quatz
```

Example using PUT to update a pre-existing project from a csv file

```json
// Request
curl --location -g --request PUT 'http://localhost:31310/v1/projects/xlsx' --form 'xlsx=@"./updateProject.xlsx"'

// Response
[todo]
```
-----

Example using DELETE to delete a project

```json
// Request
curl --location -g --request DELETE 'http://localhost:31310/v1/projects' \
--header 'Content-Type: application/json' \
--data-raw '{
    "warehouseProjectId": "693d37f6-318e-4d8b-9e14-3d2328b569be"
  }'

// Response
{"message":"Project deleted successfully"}
```
-----

### `issuances`

Functionality: List all issuances from subscribed projects

Options: None

Example:

```json
// Request
curl --location --request GET 'localhost:31310/v1/issuances' --header 'Content-Type: application/json'

// Response
[{
  "id":"d9f58b08-af25-461c-88eb-403bb02b135e",
  "orgUid":"77641db780adc6c74f1ff357804e26a799e4a09157f426aac588963a39bdb2d9",
  "warehouseProjectId":"9b9bb857-c71b-4649-b805-a289db27dc1c",
  "startDate":"2022-01-02T00:00:00.000Z",
  "endDate":"2022-02-11T00:00:00.000Z",
  "verificationApproach":"Sample Approach",
  "verificationReportDate":"2022-03-16T00:00:00.000Z",
  "verificationBody":"Sample Body",
  "timeStaged":null,
  "createdAt":"2022-03-12T08:58:43.271Z",
  "updatedAt":"2022-03-12T08:58:43.271Z"
}]
```
-----

### `labels`

Functionality: List all labels from subscribed projects

Options: None

Example:

```json
// Request
curl --location --request GET 'localhost:31310/v1/labels' --header 'Content-Type: application/json'

// Response
[{
  "id":"dcacd68e-1cfb-4f06-9798-efa0aacda42c",
  "warehouseProjectId":"9b9bb857-c71b-4649-b805-a289db27dc1c",
  "orgUid":"77641db780adc6c74f1ff357804e26a799e4a09157f426aac588963a39bdb2d9",
  "label":"Sample Label",
  "labelType":"Certification",
  "creditingPeriodStartDate":"2014-03-29T00:00:00.000Z",
  "creditingPeriodEndDate":"2022-03-30T00:00:00.000Z",
  "validityPeriodStartDate":"2017-03-08T00:00:00.000Z",
  "validityPeriodEndDate":"2025-03-19T00:00:00.000Z",
  "unitQuantity":40,
  "labelLink":"http://samplelabel.net",
  "timeStaged":null,
  "createdAt":"2022-03-12T08:58:43.270Z",
  "updatedAt":"2022-03-12T08:58:43.270Z"
}]
```
-----

### `staging`

Functionality: List, modify, confirm, and cancel projects and units in the `STAGING` state

Options:

| Key                | Type       | Description |
|:------------------:|:----------:|:------------|
| None (default)     | N/A        | Display all projects and units that are currently in `STAGING` |




| limit              | Number     | Limit the number subscribed projects to be displayed (must be used with page, eg `?page=5&limit=2`) |
| page               | Number     | Only display results from this page number (must be used with limit, eg `?page=5&limit=2`) |

GET Example to list all projects and units in the `STAGING` state. For this example, there is one project with a `DELETE` action, one project with an `INSERT` action, and one unit with an `INSERT` action:

```json
// Request
curl --location --request GET 'localhost:31310/v1/staging' --header 'Content-Type: application/json'

// Response
[{
  "id":38,
  "uuid":"cbc966cd-f4a9-4f7b-9c57-8186fea8b54c",
  "table":"Projects",
  "action":"DELETE",
  "commited":false,
  "failedCommit":false,
  "createdAt":"2022-03-13T03:08:15.156Z",
  "updatedAt":"2022-03-13T03:08:15.156Z",
  "diff":{
    "original":{
      "warehouseProjectId":"cbc966cd-f4a9-4f7b-9c57-8186fea8b54c",
      "orgUid":"77641db780adc6c74f1ff357804e26a799e4a09157f426aac588963a39bdb2d9",
      "currentRegistry":"123",
      "projectId":"Abcde-12345",
      "originProjectId":null,
      "registryOfOrigin":"500",
      "program":"",
      "projectName":"Example",
      "projectLink":"https://exampleurl",
      "projectDeveloper":"Example Developer",
      "sector":"Viva",
      "projectType":"",
      "projectTags":null,
      "coveredByNDC":"NO",
      "ndcInformation":"Outside NDC",
      "projectStatus":"Registered",
      "projectStatusDate":"2022-03-09T16:00:00.000Z",
      "unitMetric":"tCO2e",
      "methodology":"Quatz",
      "validationBody":null,
      "validationDate":null,
      "timeStaged":null,
      "createdAt":"2022-03-13T03:04:53.168Z",
      "updatedAt":"2022-03-13T03:04:53.168Z",
      "projectLocations":[],
      "labels":[],
      "issuances":[],
      "coBenefits":[],
      "relatedProjects":[],
      "projectRatings":[],
      "estimations":[]
    },
    "change":{}
  }
},{
  "id":39,
  "uuid":"2120ab85-4622-454c-be29-c97071286df1",
  "table":"Projects",
  "action":"INSERT",
  "commited":false,
  "failedCommit":false,
  "createdAt":"2022-03-13T03:09:10.194Z",
  "updatedAt":"2022-03-13T03:09:10.194Z",
  "diff":{
    "original":{},
    "change":[{
      "currentRegistry":"123",
      "projectId":"Abcde-12345",
      "registryOfOrigin":"500",
      "program":"",
      "projectName":"Example",
      "projectLink":"https://exampleurl",
      "projectDeveloper":"Example Developer",
      "sector":"Viva",
      "projectType":"",
      "coveredByNDC":"NO",
      "ndcInformation":"Outside NDC",
      "projectStatus":"Registered",
      "projectStatusDate":"3/10/2022",
      "unitMetric":"tCO2e",
      "methodology":"Quatz",
      "warehouseProjectId":"2120ab85-4622-454c-be29-c97071286df1",
      "orgUid":"77641db780adc6c74f1ff357804e26a799e4a09157f426aac588963a39bdb2d9"
    }]
  }
},{
  "id":40,
  "uuid":"89d7a102-a5a6-4f80-bc67-d28eba4952f3",
  "table":"Units",
  "action":"INSERT",
  "commited":false,
  "failedCommit":false,
  "createdAt":"2022-03-13T03:17:51.752Z",
  "updatedAt":"2022-03-13T03:17:51.752Z",
  "diff":{
    "original":{},
    "change":[{
      "projectLocationId":"789",
      "unitOwner":"Sample Owner",
      "countryJurisdictionOfOwner":"Belize",
      "serialNumberBlock":"A345-B567",
      "serialNumberPattern":"[.*\\D]+([0-9]+)+[-][.*\\D]+([0-9]+)$",
      "vintageYear":2014,
      "unitRegistryLink":"sampleurl.com",
      "unitType":"Reduction - technical",
      "unitStatus":"Buffer",
      "correspondingAdjustmentDeclaration":"Unknown",
      "correspondingAdjustmentStatus":"Pending",
      "warehouseUnitId":"89d7a102-a5a6-4f80-bc67-d28eba4952f3",
      "timeStaged":1647141471,
      "orgUid":"77641db780adc6c74f1ff357804e26a799e4a09157f426aac588963a39bdb2d9"
    }]
  }
}]
```
-----

GET Example to list only units, with paging:

```json
// Request
curl --location --request GET 'localhost:31310/v1/staging?page=1&limit=5&type=units' --header 'Content-Type: application/json'

// Response
[todo: currently shows projects and units. verify/sort out later]
{"page":1,"pageCount":1,"data":[{"id":38,"uuid":"cbc966cd-f4a9-4f7b-9c57-8186fea8b54c","table":"Projects","action":"DELETE","commited":false,"failedCommit":false,"createdAt":"2022-03-13T03:08:15.156Z","updatedAt":"2022-03-13T03:08:15.156Z","diff":{"original":{"warehouseProjectId":"cbc966cd-f4a9-4f7b-9c57-8186fea8b54c","orgUid":"77641db780adc6c74f1ff357804e26a799e4a09157f426aac588963a39bdb2d9","currentRegistry":"123","projectId":"Abcde-12345","originProjectId":null,"registryOfOrigin":"500","program":"","projectName":"Example","projectLink":"https://exampleurl","projectDeveloper":"Example Developer","sector":"Viva","projectType":"","projectTags":null,"coveredByNDC":"NO","ndcInformation":"Outside NDC","projectStatus":"Registered","projectStatusDate":"2022-03-09T16:00:00.000Z","unitMetric":"tCO2e","methodology":"Quatz","validationBody":null,"validationDate":null,"timeStaged":null,"createdAt":"2022-03-13T03:04:53.168Z","updatedAt":"2022-03-13T03:04:53.168Z","projectLocations":[],"labels":[],"issuances":[],"coBenefits":[],"relatedProjects":[],"projectRatings":[],"estimations":[]},"change":{}}},{"id":39,"uuid":"2120ab85-4622-454c-be29-c97071286df1","table":"Projects","action":"INSERT","commited":false,"failedCommit":false,"createdAt":"2022-03-13T03:09:10.194Z","updatedAt":"2022-03-13T03:09:10.194Z","diff":{"original":{},"change":[{"currentRegistry":"123","projectId":"Abcde-12345","registryOfOrigin":"500","program":"","projectName":"Example","projectLink":"https://exampleurl","projectDeveloper":"Example Developer","sector":"Viva","projectType":"","coveredByNDC":"NO","ndcInformation":"Outside NDC","projectStatus":"Registered","projectStatusDate":"3/10/2022","unitMetric":"tCO2e","methodology":"Quatz","warehouseProjectId":"2120ab85-4622-454c-be29-c97071286df1","orgUid":"77641db780adc6c74f1ff357804e26a799e4a09157f426aac588963a39bdb2d9"}]}},{"id":40,"uuid":"89d7a102-a5a6-4f80-bc67-d28eba4952f3","table":"Units","action":"INSERT","commited":false,"failedCommit":false,"createdAt":"2022-03-13T03:17:51.752Z","updatedAt":"2022-03-13T03:17:51.752Z","diff":{"original":{},"change":[{"projectLocationId":"789","unitOwner":"Sample Owner","countryJurisdictionOfOwner":"Belize","serialNumberBlock":"A345-B567","serialNumberPattern":"[.*\\D]+([0-9]+)+[-][.*\\D]+([0-9]+)$","vintageYear":2014,"unitRegistryLink":"sampleurl.com","unitType":"Reduction - technical","unitStatus":"Buffer","correspondingAdjustmentDeclaration":"Unknown","correspondingAdjustmentStatus":"Pending","warehouseUnitId":"89d7a102-a5a6-4f80-bc67-d28eba4952f3","timeStaged":1647141471,"orgUid":"77641db780adc6c74f1ff357804e26a799e4a09157f426aac588963a39bdb2d9"}]}}]}

```
-----

Post Example to commit all projects and units in the `STAGING` state:

```json
// Request
curl --location --request POST \
    --header 'Content-Type: application/json' \
     'localhost:31310/v1/staging/commit'

// Response
{"message":"Staging Table committed to full node"}
-----

Post Example to commit a single project, using its `uuid`:

```json
// Request
curl --location -g --request POST 'localhost:31310/v1/staging/commit' \
--header 'Content-Type: application/json' \
--data-raw '{
    "uuid": "37a620bd-c832-44e3-927e-849cd1c2999f"
}'
[TODO: how to commit a single project or unit?]
// Response

```
-----

POST Example to retry committing a single project, using its `uuid`:

```json
// Request
curl --location -g --request POST 'localhost:31310/v1/staging/retry' \
--header 'Content-Type: application/json' \
--data-raw '{
    "uuid": "37a620bd-c832-44e3-927e-849cd1c2999f"
}'

[TODO: Cannot POST /v1/staging/retry]
// Response

```
-----

DELETE all projects and units in `STAGING`:

```json
// Request
curl --location -g --request DELETE 'localhost:31310/v1/staging/clean' \
     --header 'Content-Type: application/json'
// Response
{"message":"Staging Data Cleaned"}
```
-----

DELETE a specific project in `STAGING`:

```json
// Request
curl --location -g --request DELETE 'localhost:31310/v1/staging' \
--header 'Content-Type: application/json' \
--data-raw '{
    "uuid": "1647855c-c1fa-4f5b-ae8e-bd9d544442ea"
}'
// Response
{"message":"Deleted from stage"}
```
-----

DELETE a specific unit in `STAGING`:

```json
// Request
curl --location -g --request DELETE 'localhost:31310/v1/staging' \
--header 'Content-Type: application/json' \
--data-raw '{
    "uuid": "1936260d-632c-4d63-8cba-0014e7c84c0c"
}'
// Response
{"message":"Deleted from stage"}
```
-----

```
