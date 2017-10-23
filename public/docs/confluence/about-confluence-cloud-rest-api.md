---
title: "About the Confluence Cloud REST API"
platform: cloud
product: confcloud
category: reference
subcategory: api
date: "2016-05-16"
aliases:
- confcloud/confluence-rest-api-39985291.html
- /confcloud/confluence-rest-api-39985291.md
dac_edit_link: https://developer.atlassian.com/pages/editpage.action?cjm=wozere&pageId=39985291
dac_view_link: https://developer.atlassian.com/pages/viewpage.action?cjm=wozere&pageId=39985291
confluence_id: 39985291
---
# About the Confluence Cloud REST API

The Confluence REST API is for admins who want to script interactions with Confluence and developers who want to integrate with or build on top of the Confluence platform.

For REST API documentation, go to [Confluence REST API reference](https://docs.atlassian.com/atlassian-confluence/REST/latest/).

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

``` bash
{
    "_links": {
        "base": "https://your-domain.atlassian.net/wiki",
        "context": "",
        "self": "https://your-domain.atlassian.net/wiki/rest/api/content"
    },
    "limit": 25,
    "results": [
        {
            "_expandable": {
                "ancestors": "",
                "body": "",
                "children": "/rest/api/content/589828/child",
                "container": "",
                "descendants": "/rest/api/content/589828/descendant",
                "history": "/rest/api/content/589828/history",
                "metadata": "",
                "space": "/rest/api/space/TEST",
                "version": ""
            },
            "_links": {
                "self": "https://your-domain.atlassian.net/wiki/rest/api/content/589828",
                "tinyui": "/x/BAAJ",
                "webui": "/display/TEST/Test+Space+Home"
            },
            "id": "589828",
            "status": "current",
            "title": "Test Space Home",
            "type": "page"
        }
    ],
    "size": 1,
    "start": 0
}
```

## CRUD operations

Confluence's REST APIs provide access to resources (data entities) via URI paths. To use a REST API, your application will make an HTTP request and parse the response. By default, the response format is JSON. Your methods will be the standard HTTP methods: GET, PUT, POST and DELETE. The REST API is based on open standards, so you can use any web development language to access the API.

For some examples of what you can do with the REST API, see [Confluence REST API Examples](/cloud/confluence/rest-api-examples).

## Pagination

Confluence's REST API provides a way to paginate your calls to limit the amount of data you are fetching. Read more about this in [Pagination in the REST API](/cloud/confluence/pagination).

## Expansions

Confluence's REST API also provides a way to fetch more data in a single call through REST API Expansions. Read more about this in [Expansions in the REST API](/cloud/confluence/expansions).

## Advanced search through CQL

Confluence's REST API provides an [advanced search](/cloud/confluence/advanced-searching-using-cql) that lets you use structured queries to search for content within Confluence. Your search results will take the same form as the Content model returned by the Content REST API. 

## Content and space properties

Content and Space Properties are JSON key-value storages that you can access through the REST API. This is a great way, for example, to store metadata about a piece (or pieces) of content. Read more about [Content Properties here](/cloud/confluence/content-properties).

## REST API policy

Read the [Atlassian REST API Policy](https://developer.atlassian.com/display/HOME/Atlassian+REST+API+policy) for information on compatibility, versioning and deprecation. 
