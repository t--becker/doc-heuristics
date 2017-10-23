---
title: "Pagination in the REST API"
platform: cloud
product: confcloud
category: reference
subcategory: api
date: "2016-11-18"
aliases:
- confcloud/pagination-in-the-rest-api-39985841.html
- /confcloud/pagination-in-the-rest-api-39985841.md
dac_edit_link: https://developer.atlassian.com/pages/editpage.action?cjm=wozere&pageId=39985841
dac_view_link: https://developer.atlassian.com/pages/viewpage.action?cjm=wozere&pageId=39985841
confluence_id: 39985841
---
# Pagination in the REST API

{{% tip %}}If you do not use parentheses, the statement will be evaluated left to right.{{% /tip %}}

The examples on this page use `curl`, and the responses are piped into `python -mjson.tool`

## Why pagination?

When you're making calls to the Confluence REST API, there will often be a lot of results to return - so we paginate the results to make the responses easier to handle.

Let's say your initial call is asking for all the pages in a Confluence instance; the result could be a massive response with hundreds of thousands of pages. That's not a good place to start.

We've built in a default limit on results so that doesn't happen, but we still recommend you always explicitly set the `limit` parameter to ensure you know how many results per page you'll get. Don't rely on the defaults as they'll be different depending on what [parts of the response you're expanding], so the response you get might not be what you expected.

## Set the limit parameter

For example, you might need to request all the pages in the Demonstration space (ds is the spaceKey) of your Confluence instance, but you only want the results 5 at a time. The endpoint we're going to hit here to specifically get the pages in that space is `/rest/api/space/{spaceKey}/content/{type}`, with the `type` being `page` (you could also use `blogpost`).

Your GET would look something like this:

``` bash
curl -u admin@example.com:password -X GET "https://your-domain.atlassian.net/wiki/rest/api/space/ds/content/page?limit=5" | python -mjson.tool
```

Note the `limit` parameter in this call is set to 5, so the response shows items 0 through 4.

``` bash
{
    "_links": {
        "base": "https://your-domain.atlassian.net/wiki",
        "context": "",
        "next": "/rest/api/space/ds/content/page?limit=5&start=5",
        "self": "https://your-domain.atlassian.net/wiki/rest/api/space/ds/content/page"
    },
    "limit": 5,
    "results": [
        {
            "_expandable": {
                "ancestors": "",
                "body": "",
                "children": "/rest/api/content/98308/child",
                "container": "",
                "descendants": "/rest/api/content/98308/descendant",
                "history": "/rest/api/content/98308/history",
                "metadata": "",
                "space": "/rest/api/space/ds",
                "version": ""
            },
            "_links": {
                "self": "https://your-domain.atlassian.net/wiki/rest/api/content/98308",
                "tinyui": "/x/BIAB",
                "webui": "/pages/viewpage.action?pageId=98308"
            },
            "id": "98308",
            "status": "current",
            "title": "What is Confluence? (step 1 of 9)",
            "type": "page"
        },
        {
            "_expandable": {
                "ancestors": "",
                "body": "",
                "children": "/rest/api/content/98309/child",
                "container": "",
                "descendants": "/rest/api/content/98309/descendant",
                "history": "/rest/api/content/98309/history",
                "metadata": "",
                "space": "/rest/api/space/ds",
                "version": ""
            },
            "_links": {
                "self": "https://your-domain.atlassian.net/wiki/rest/api/content/98309",
                "tinyui": "/x/BYAB",
                "webui": "/pages/viewpage.action?pageId=98309"
            },
            "id": "98309",
            "status": "current",
            "title": "A quick look at the editor (step 2 of 9)",
            "type": "page"
        },
        {
            "_expandable": {
                "ancestors": "",
                "body": "",
                "children": "/rest/api/content/98306/child",
                "container": "",
                "descendants": "/rest/api/content/98306/descendant",
                "history": "/rest/api/content/98306/history",
                "metadata": "",
                "space": "/rest/api/space/ds",
                "version": ""
            },
            "_links": {
                "self": "https://your-domain.atlassian.net/wiki/rest/api/content/98306",
                "tinyui": "/x/AoAB",
                "webui": "/pages/viewpage.action?pageId=98306"
            },
            "id": "98306",
            "status": "current",
            "title": "Get serious with a table (step 5 of 9)",
            "type": "page"
        },
        {
            "_expandable": {
                "ancestors": "",
                "body": "",
                "children": "/rest/api/content/98307/child",
                "container": "",
                "descendants": "/rest/api/content/98307/descendant",
                "history": "/rest/api/content/98307/history",
                "metadata": "",
                "space": "/rest/api/space/ds",
                "version": ""
            },
            "_links": {
                "self": "https://your-domain.atlassian.net/wiki/rest/api/content/98307",
                "tinyui": "/x/A4AB",
                "webui": "/display/ds/Welcome+to+Confluence"
            },
            "id": "98307",
            "status": "current",
            "title": "Welcome to Confluence",
            "type": "page"
        },
        {
            "_expandable": {
                "ancestors": "",
                "body": "",
                "children": "/rest/api/content/98305/child",
                "container": "",
                "descendants": "/rest/api/content/98305/descendant",
                "history": "/rest/api/content/98305/history",
                "metadata": "",
                "space": "/rest/api/space/ds",
                "version": ""
            },
            "_links": {
                "self": "https://your-domain.atlassian.net/wiki/rest/api/content/98305",
                "tinyui": "/x/AYAB",
                "webui": "/pages/viewpage.action?pageId=98305"
            },
            "id": "98305",
            "status": "current",
            "title": "Share your page with a team member (step 9 of 9)",
            "type": "page"
        }
    ],
    "size": 5,
    "start": 0
}
```


In the above response, line 5 shows the link for the `next` page of results (` /rest/api/space/ds/content/page?limit=5&start=5` ). Note that there's no  `previous`  link in the response, which means that there are no results before this page.

## GET the next page of results

You can then make a call to return the next page. The `start` parameter in the `next` link is 5, so the next page of results will show items 5 through 9.

The call will be as follows:

``` bash
    curl -u admin@example.com:password -X GET "https://your-domain.atlassian.net/wiki/rest/api/space/ds/content/page?limit=5&start=5" | python -mjson.tool
```

Which will deliver the next set of results, this time with links for the `next` and `previous` pages.

{{% tip %}}You could use these `next` and `previous` links to submit calls via next and previous buttons in a UI, for example.{{% /tip %}}


``` bash
{
    "_links": {
        "base": "https://your-domain.atlassian.net/wiki",
        "context": "",
        "next": "/rest/api/space/ds/content/page?limit=5&start=10",
        "prev": "/rest/api/space/ds/content/page?limit=5&start=0",
        "self": "https://your-domain.atlassian.net/wiki/rest/api/space/ds/content/page"
    },
    "limit": 5,
    "results": [
        {
            "_expandable": {
                "ancestors": "",
                "body": "",
                "children": "/rest/api/content/98314/child",
                "container": "",
                "descendants": "/rest/api/content/98314/descendant",
                "history": "/rest/api/content/98314/history",
                "metadata": "",
                "space": "/rest/api/space/ds",
                "version": ""
            },
            "_links": {
                "self": "https://your-domain.atlassian.net/wiki/rest/api/content/98314",
                "tinyui": "/x/CoAB",
                "webui": "/pages/viewpage.action?pageId=98314"
            },
            "id": "98314",
            "status": "current",
            "title": "Let's edit this page (step 3 of 9)",
            "type": "page"
        },
        {
            "_expandable": {
                "ancestors": "",
                "body": "",
                "children": "/rest/api/content/98313/child",
                "container": "",
                "descendants": "/rest/api/content/98313/descendant",
                "history": "/rest/api/content/98313/history",
                "metadata": "",
                "space": "/rest/api/space/ds",
                "version": ""
            },
            "_links": {
                "self": "https://your-domain.atlassian.net/wiki/rest/api/content/98313",
                "tinyui": "/x/CYAB",
                "webui": "/pages/viewpage.action?pageId=98313"
            },
            "id": "98313",
            "status": "current",
            "title": "Tell people what you think in a comment (step 8 of 9)",
            "type": "page"
        },
        {
            "_expandable": {
                "ancestors": "",
                "body": "",
                "children": "/rest/api/content/98312/child",
                "container": "",
                "descendants": "/rest/api/content/98312/descendant",
                "history": "/rest/api/content/98312/history",
                "metadata": "",
                "space": "/rest/api/space/ds",
                "version": ""
            },
            "_links": {
                "self": "https://your-domain.atlassian.net/wiki/rest/api/content/98312",
                "tinyui": "/x/CIAB",
                "webui": "/pages/viewpage.action?pageId=98312"
            },
            "id": "98312",
            "status": "current",
            "title": "Prettify the page with an image (step 4 of 9)",
            "type": "page"
        },
        {
            "_expandable": {
                "ancestors": "",
                "body": "",
                "children": "/rest/api/content/98311/child",
                "container": "",
                "descendants": "/rest/api/content/98311/descendant",
                "history": "/rest/api/content/98311/history",
                "metadata": "",
                "space": "/rest/api/space/ds",
                "version": ""
            },
            "_links": {
                "self": "https://your-domain.atlassian.net/wiki/rest/api/content/98311",
                "tinyui": "/x/B4AB",
                "webui": "/pages/viewpage.action?pageId=98311"
            },
            "id": "98311",
            "status": "current",
            "title": "Lay out your page (step 6 of 9)",
            "type": "page"
        },
        {
            "_expandable": {
                "ancestors": "",
                "body": "",
                "children": "/rest/api/content/98310/child",
                "container": "",
                "descendants": "/rest/api/content/98310/descendant",
                "history": "/rest/api/content/98310/history",
                "metadata": "",
                "space": "/rest/api/space/ds",
                "version": ""
            },
            "_links": {
                "self": "https://your-domain.atlassian.net/wiki/rest/api/content/98310",
                "tinyui": "/x/BoAB",
                "webui": "/pages/viewpage.action?pageId=98310"
            },
            "id": "98310",
            "status": "current",
            "title": "Learn the wonders of autoconvert (step 7 of 9)",
            "type": "page"
        }
    ],
    "size": 5,
    "start": 5
}
```

 

## How do I know if there are more pages?

When the response doesn't contain a link to the `next` page of results, you know that you've reached the end. Below you'll see the call for the next page of results, and the response which doesn't contain a `next` link.

``` bash
curl -u admin@example.com:password -X GET "https://your-domain.atlassian.net/wiki/rest/api/space/ds/content/page?limit=5&start=10" | python -mjson.tool
```

``` bash
{
    "_links": {
        "base": "https://your-domain.atlassian.net/wiki",
        "context": "",
        "prev": "/rest/api/space/ds/content/page?limit=5&start=5",
        "self": "https://your-domain.atlassian.net/wiki/rest/api/space/ds/content/page"
    },
    "limit": 5,
    "results": [
        {
            "_expandable": {
                "ancestors": "",
                "body": "",
                "children": "/rest/api/content/589845/child",
                "container": "",
                "descendants": "/rest/api/content/589845/descendant",
                "history": "/rest/api/content/589845/history",
                "metadata": "",
                "space": "/rest/api/space/ds",
                "version": ""
            },
            "_links": {
                "self": "https://your-domain.atlassian.net/wiki/rest/api/content/589845",
                "tinyui": "/x/FQAJ",
                "webui": "/display/ds/The+eleventh+page"
            },
            "id": "589845",
            "status": "current",
            "title": "The eleventh page",
            "type": "page"
        }
    ],
    "size": 1,
    "start": 10
}
```
