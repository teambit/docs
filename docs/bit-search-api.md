Learn how to integrate [bit.dev](https://bit.dev)'s component search API.

- [Search components](#search-components)
   - [Simple search request](#simple-search-request)
   - [Using filters](#using-filters)
   - [Pagination](#pagination)
   - [Search response format](#search-response-format)
- [Get aggregated component data](#get-aggregated-component-data)
   - [Simple aggregation request](#simple-aggregation-request)
   - [Aggregation request with search parameters](#aggregation-request-with-search-parameters)
   - [Aggregation response format](#aggregation-response-format)


The Search API helps you find the components you want. For example, you can find all components that performe a specific functionality by specifying this functionality in the search query, or find all components with a specific dependency or size range by using the search filters. The results are sorted by their relevance and quality.

The API also provides an endpoint providing component aggregation data, such as the number of components with a specific dependenct or size range.

## Search components

| Search endpoint: | POST 'api.bit.dev/search/v1/components' |
| --------------- | ---------------------- |

The search request parameters are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| queryString | string | the search query. To get all public components, send an empty string.
| filters? | See [Using filters](#using-filters)| the property to filter by. Can be 'labels' / 'dependencies' / 'size' / 'tests' / 'examples'|
| offset? | number | for pagination. The offset from the first result. E.g. offset: 10 will return all results from the 10th position|
| limit? | number | the maximum number of results to return |


### Simple search request

The simplest search request only requires specifying the query string.

***Request***
```json
{
    "queryString": "hero button"
}
```
***Response***
```json
{
    "code": 200,
    "message": "ok",
    "payload": {
        "total": 1317,
        "results": [
            {
                "id": "5b2a4444a98e96ea12b8d274",
                "name": "components/hero-button",
                "fullName": "bit.movie-app/components/hero-button",
                "url": "https://bit.dev/bit/movie-app/components/hero-button",
                "owner": "bit",
                "collection": "movie-app",
                "version": "1.0.1",
                "description": "CTA button for `Hero` featured content",
                "downloads": 1866,
                "license": "mit",
                "visibility": "public",
                "likeCount": 4,
                "liked": false,
                "buildStatus": "pass",
                "size": {
                    "gzipped": 4635,
                    "nonGzipped": 12664
                }
            },
            {
                "id": "5c759f3909fc20001488e7dd",
                "name": "hero-button",
                "fullName": "giladshoham.demo12/hero-button",
                "url": "https://bit.dev/giladshoham/demo12/hero-button",
                "owner": "giladshoham",
                "collection": "demo12",
                "version": "1.0.1",
                "description": "CTA button for `Hero` featured content",
                "downloads": 18,
                "license": "none",
                "visibility": "public",
                "likeCount": 0,
                "liked": false,
                "buildStatus": "pass",
                "size": {
                    "gzipped": 2749,
                    "nonGzipped": 6516
                }
            },
            ...
        ]
    }
}
```

### Using filters

You can narrow down your search using search filters. The supported filters are:

| Filter | Type | Description  |
| ------ |---- | ---------- |
| dependencies | string[] | package names on which a component depends |
| labels | string[] | omponent labels describing its functionality, like 'navigation', 'array', 'form elements' or 'utils' |
| size | {'min': number, 'max': number} | the size (gzipped) of the component in bytes. Note that when using this filter, you need to specify the size range using 'min' and 'max'|
| tests | Boolean | whether or not the component is tested |
| examples | Boolean | whether or not the component has usage examples |


The filters are optional and can be combined with one another.
Here is an example of a request combining all filters:

***Request***
```json
{
    "queryString": "button",
    "filters": {
    	"dependencies": ["styled-components"],
    	"labels": ["radio button"],
    	"size": { "min": 0, "max": 60000 },
    	"tests": false,
    	"examples": true
    }
}
```

***Response***
```json
{
    "code": 200,
    "message": "ok",
    "payload": {
        "total": 2,
        "results": [
            {
                "id": "5c85179c1bd73500134af7ab",
                "name": "radio-button",
                "fullName": "grommet.grommet/radio-button",
                "url": "https://bit.dev/grommet/grommet/radio-button",
                "owner": "grommet",
                "collection": "grommet",
                "version": "2.6.5",
                "description": "A radio button control.",
                "downloads": 42,
                "license": "apache",
                "visibility": "public",
                "likeCount": 1,
                "liked": false,
                "buildStatus": "pass",
                "size": {
                    "gzipped": 51487,
                    "nonGzipped": 185460
                }
            },
            {
                "id": "5c4eb02263a49116b56eb278",
                "name": "components/radio-buttons",
                "fullName": "rivigo.ui/components/radio-buttons",
                "url": "https://bit.dev/rivigo/ui/components/radio-buttons",
                "owner": "rivigo",
                "collection": "ui",
                "version": "0.0.8",
                "description": "",
                "downloads": 41,
                "license": "mit",
                "visibility": "public",
                "likeCount": 0,
                "liked": false,
                "buildStatus": "pass",
                "size": {
                    "gzipped": 44292,
                    "nonGzipped": 156220
                }
            }
        ]
    }
}
```
### Pagination

You can paginate results by using the 'offset' and 'limit' parameters. The 'offset' parameter denotes the offset from the first result, and the 'limit' parameter denotes the maximum number of results to be returned. This is how to combine them in the query:

***Request***
```json
{
    "queryString": "button",
    "filters": {
    	"dependencies": ["styled-components"],
    	"labels": ["radio button"],
    	"size": { "min": 0, "max": 60000 },
    	"tests": false,
    	"examples": true
    },
    "offset": 0,
    "limit": 20
}
```

The response is the same as above .

### Search response format

Each component in the reponse has the following properties:

| Property | Type | Description |
| -------- | ---- | ----------- |
| id | string | the component's unique id |
| name | string | the component's name |
| fullName | string | \<ownername\>.\<collection name\>/component name |
| url | string | the component's url on bit.dev|
| owner | string | the component owner's name |
| collection | string | the component's collection |
| version | string | the component's version number |
| description | string | a short description of the component |
| downloads | number | how many times the component was downloaded |
| license | string | the component's license type |
| visibility | string | whether the component is 'private' or 'public' |
| buildStatus | string | can be 'pass'/'failed'/'processing'/'pending'/'none' |
| likeCount | number | the component's number of likes |
| liked | Boolean | whether or not the component has likeCount > 0 |
| size | { 'gzipped': number, 'nonGzipped': number} | the component's gaipped size in bytes |

***Component example***
```json
{
        "id": "5c5ae54dd30f880014a3b20c",
        "name": "array",
        "fullName": "lodash.lodash/array",
        "url": "https://bit.dev/lodash/lodash/array",
        "owner": "lodash",
        "collection": "lodash",
        "version": "4.17.11",
        "description": "",
        "downloads": 5,
        "license": "mit",
        "visibility": "public",
        "likeCount": 0,
        "liked": false,
        "buildStatus": "pass",
        "size": {
            "nonGzipped": -1,
            "gzipped": -1
        }
}
```

## Get aggregated component data

| Aggregations endpoint: | POST 'api.bit.dev/search//v1/aggregations' |
| --------------- | ---------------------- |

### Simple aggregation request

This endpoint provides component aggregation data, i.e. the number of components with a certain property.

Specifically, the API supports 3 types of aggregations: 'labels', 'dependencies' and 'size'.

The aggregation request parameters are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| queryString | string | the search query (if any) on which to aggregate. If you want to get an aggregation on all public components, send an empty string. |
| filters? | See [Using filters](#using-filters)| the property to filter by. Can be 'labels' / 'dependencies' / 'size' / 'tests' / 'examples'|
| aggregatedBy | enum | the propaerty on which to aggregate. Can be 'labels' / 'dependencies' / 'size'|
| histogram? | {'min': number, 'max': number, 'numBins': number} | an optional parameter which is only relevant for the 'size' aggregation. 'min' indicates the minimal component size to include in the aggregation; 'max' indicates the maximal size; and 'numBins' indicates the number of buckets to include in the aggregation.|

The following request will return the numbers of all of [bit.dev](https://bit.dev)'s public components with the 'button' functionality, aggregated by dependencies:

***Request***
```json
{
    "queryString": "button",
    "aggregatedBy": "dependencies"
}
```
***Response***
```json
{
    "code": 200,
    "message": "ok",
    "payload": {
        "total": 21697,
        "results": [
            {
                "aggName": "react",
                "numComponents": 13639
            },
            {
                "aggName": "prop-types",
                "numComponents": 4328
            },
            {
                "aggName": "enzyme",
                "numComponents": 1635
            },
            {
                "aggName": "styled-components",
                "numComponents": 1589
            },
            ...
        ]
    }
}
```

### Aggregation request with search parameters

You can narrow down aggregation requests using the same [search filters](#using-filters) described above.

The following request aggregates results by size (with a minumum size of ~10KB, maximum size of ~30KB, and 10 bins), for all components dependent on Lodash:

***Request***
```json
{
    "queryString": "",
    "filters": {
    	"dependencies": ["lodash"]
    },
    "aggregatedBy": "size",
    "histogram": {
      "min": 10000,
      "max": 30000,
      "numBins": 10
    }
}
```

***Response***
```json
{
    "code": 200,
    "message": "ok",
    "payload": {
        "total": 890,
        "results": [
            {
                "aggName": 10000,
                "numComponents": 6
            },
            {
                "aggName": 12000,
                "numComponents": 1
            },
            {
                "aggName": 14000,
                "numComponents": 2
            },
            {
                "aggName": 16000,
                "numComponents": 1
            },
            {
                "aggName": 18000,
                "numComponents": 5
            },
            {
                "aggName": 20000,
                "numComponents": 462
            },
            {
                "aggName": 22000,
                "numComponents": 2
            },
            {
                "aggName": 24000,
                "numComponents": 1
            },
            {
                "aggName": 26000,
                "numComponents": 2
            },
            {
                "aggName": 28000,
                "numComponents": 3
            }
        ]
    }
}
```

### Aggregation response format

The aggregation response payload includes a 'total' property indicating the total number of components on which the aggregation was performed, and 'results' - an array of objects with the following properties:

| Property | Type | Description |
| -------- | ---- | ----------- |
| aggName  | string | the name of the 'bucket' or category of the aggregation. It can be a dependency, a label, or a specific size
| numComponents | number | the number of components in this 'bucket' or category

For example, the following result for the size aggregation indicates that there are 2 components in the size category 26,000 bytes.
```json
{
    "aggName": 26000,
    "numComponents": 2
}

```
