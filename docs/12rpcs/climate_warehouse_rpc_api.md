---
sidebar_position: 4
---
# 12.4 Climate Warehouse (Beta) RPC API

[todo: add intro]
[todo: add commands]
---

## Reference

### `organizations`

Functionality: List all subcribed organizations

Options: None

Example:

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
-----

### `projects`

Functionality: List subcribed projects, as specified by the appropriate URL option(s)

Query string options:

| Key                | Type       | Description |
|:------------------:|:----------:|:------------|
| None (default)     | N/A        | Display all subscribed projects |
| warehouseProjectId | Hex String | Only display subscribed projects matching this warehouseProjectId |
| orgUid             | Hex String | Only display subscribed projects matching this orgUid |
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