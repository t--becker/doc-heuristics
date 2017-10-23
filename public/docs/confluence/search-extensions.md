---
title: "Search extensions"
platform: cloud
product: confcloud
category: devguide
subcategory: learning
patterns: patterns
date: "2016-11-17"
aliases:
- confcloud/search-extensions-39985059.html
- /confcloud/search-extensions-39985059.md
dac_edit_link: https://developer.atlassian.com/pages/editpage.action?cjm=wozere&pageId=39985059
dac_view_link: https://developer.atlassian.com/pages/viewpage.action?cjm=wozere&pageId=39985059
confluence_id: 39985059
---
# Search extensions

![search extensions](/cloud/confluence/images/search-extension-01.png)

## What are search extensions?

A Search extension assigns custom properties to Confluence content and enables search filtering using those properties. In the REST API, they allow you to write [Confluence Query Language](https://developer.atlassian.com/blog/2015/02/confluence-5-7-apis/) (CQL) queries on content using your custom properties as terms.

## What can I build with search extensions?

Search extensions allow you to build add-ons with powerful filtering capabilities for content.

For example, search extensions could be used to create:

-   An add-on that ranks each page in Confluence and allows the user to search for only highly ranked pages.
-   An add-on that intelligently categorizes pages and allows search filtering on this category.

### Extend the search API with content properties

By storing properties against a piece of content and [declaring them as indexable](/cloud/confluence/modules/dialog/) by the Confluence search, you can write CQL queries that use them as terms.

For example, if you decide to save a 'last viewed date' on every page, you can then use CQL to query the Content API for all pages viewed in the past week, month, or year.

This might look like:

``` bash
type = page and lastViewedDate > now(-7d)
```

### Custom search and macro filters

Filtering content by querying the REST API as a developer is useful, but we should also make filtering possible for end users. With [UI support], you can use your content properties to add powerful search filters to macros that aggregate and display content, like the [content by label macro](https://confluence.atlassian.com/doc/content-by-label-macro-145566.html). As well as macros, your filters will also appear in the search screen, allowing users to refine their search queries.

 
![custom search and macro filters](/cloud/confluence/images/image2016-5-4-17-43-1.png)

Filter your search results by a custom property set on the content

## How do I build search extensions?

Content properties are key-value pairs stored on a page or blog post in Confluence. To get started with search extensions, you'll need to use the [REST API](https://developer.atlassian.com/display/CONFDEV/Content+Properties+in+the+REST+API) to store content properties (which must be valid JSON) against a piece of content.

To [integrate with search](/cloud/confluence/modules/dialog/), you'll need to define some [extractions](/cloud/confluence/modules/content-property-index-key-configuration/) to declare the fields and nested data you want to be indexable by Confluence. You'll also want to define an [alias](/cloud/confluence/modules/content-property-index-extraction-configuration/) for simpler CQL querying, and [UI support](/cloud/confluence/modules/content-property-index-extraction-configuration/) for your fields to be filterable by users on the search screen. You can declare both of these in your atlassian-connect.json file.

## What other patterns might be helpful?

### Page extensions

[Page extensions](/cloud/confluence/page-extensions) may also provide another useful way of surfacing metadata related to a page.

## Let's do this!

Get going by following our [Getting started tutorial](/cloud/confluence/getting-started) and referring to related documentation listed on the right hand side of this page. 

### Related Add-on categories

-   Integrations

### Related Connect modules

-   [Content Property Index Extractions](/cloud/confluence/modules/content-property-index-extraction-configuration/)
-   [Content Property Aliases](/cloud/confluence/modules/content-property-index-extraction-configuration/)
-   [Content Property UI Support](/cloud/confluence/modules/content-property-index-extraction-configuration/)

### Related REST APIs

-   [Content properties in the REST API](https://developer.atlassian.com/confdev/confluence-rest-api/content-properties-in-the-rest-api)
-   [Advanced searching using CQL](https://developer.atlassian.com/confdev/confluence-rest-api/advanced-searching-using-cql)

### Related documentation

-   [Confluence Search](https://confluence.atlassian.com/display/ConfCloud/Search)
-   [Content by Label Macro](https://confluence.atlassian.com/display/ConfCloud/Content+by+Label+Macro)
-   [Powerful new search and property storage APIs in Confluence](https://developer.atlassian.com/blog/2015/02/confluence-5-7-apis/)
-   [Confluence Connect integrations with CQL](https://developer.atlassian.com/blog/2016/01/confluence-connect-integrations-with-CQL/)

  