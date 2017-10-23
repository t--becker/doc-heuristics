---
title: "Content properties"
platform: cloud
product: confcloud
category: reference
subcategory: api
date: "2016-11-17"
aliases:
- confcloud/content-properties-in-the-rest-api-39985912.html
- /confcloud/content-properties-in-the-rest-api-39985912.md
dac_edit_link: https://developer.atlassian.com/pages/editpage.action?cjm=wozere&pageId=39985912
dac_view_link: https://developer.atlassian.com/pages/viewpage.action?cjm=wozere&pageId=39985912
confluence_id: 39985912
---
# Content properties in the REST API

## What are content properties?

Content properties are a key-value storage associated with a piece of Confluence content, and are one of the forms of persistence available to you as an add-on developer. Content properties free you from having to use your own data store, by allowing you to store up to 32KB of JSON with each piece of content (a page, blog post, or an attachment). If you need to store metadata about a piece (or pieces) of content, for example, this is a great way to do it.

## Query content properties with CQL

You can now [use CQL to query content properties](#cql-search-extension) in your Confluence instance. For example, a plugin could store the number of likes on a page in a content property, then by creating an index schema module for that property you can query the values to see how many pieces of content have more than 20 likes. See the section on the [CQL Search Extension](#cql-search-extension) for more information.

## GET, POST, and DELETE content properties

To retrieve any existing content properties for a piece of content, perform a **GET** on the endpoint `/rest/api/content/{content_ID}/property`.

**GET content properties**

``` bash
# Retrieves content properties associated with a piece of content with ID 12345
curl -u admin@example.com:password -X GET "https://your-domain.atlassian.net/wiki/rest/api/content/12345/property" | python -mjson.tool
```

To add content properties to a piece of Confluence content, perform a **POST** to the same endpoint. The key in your content property can be an arbitrary string (like "myprop"), whereas the value must be structured JSON.

**POST new content properties**

``` bash
# Stores a JSON document under the key "myprop" against content with ID 12345
curl -i -u admin@example.com:password -X POST -H "Content-Type: application/json" \
-d '{ "key" : "myprop", "value" : 
{
    "id": "507f1f77bcf86cd799439011",
    "editDate": "2000-01-01T11:00:00.000+11:00",
    "description": "If you have any questions please address them to admin@example.com",
    "content": {
        "likes": 5,
        "tags": ["cql", "confluence"]
    }
}
 }' https://your-domain.atlassian.net/wiki/rest/api/content/12345/property
```

If you need to delete content properties, you can perform a **DELETE** on the endpoint  `/rest/api/content/<CONTENT_ID>/property/<KEY>`.

**DELETE content properties**

``` bash
# Removes JSON document associated with key "myprop from content with ID 12345
curl -i -u admin@example.com:password -X DELETE "https://your-domain.atlassian.net/wiki/rest/api/content/12345/property/myprop"
```

## Fetch content properties as an expansion when retrieving content

Content properties are now available as an expansion on the content resource. This allows content properties to be retrieved in the same REST call as fetching the content itself. This expansion is available from any resource that returns content, including the [CQL search resource](/cloud/confluence/advanced-searching-using-cql).

**GET content properties as an expansion on content**

``` bash
# fetch properties at the same time as fetching content, note the expand=metadata.properties.myprop
curl -u admin@example.com:password -X GET 
    "https://your-domain.atlassian.net/wiki/rest/api/content/12345?expand=metadata.properties.myprop" | python -mjson.tool
{   
    id: "12345",
    type: "page",
    status: "current",
    title: "New in the platform team? Read me first",
    metadata: {
        _expandable: {
            currentuser: "",
            labels: ""
            properties: {
                myprop: {
                    "id": "507f1f77bcf86cd799439011",
                    "editDate": "2000-01-01T11:00:00.000+11:00",
                    "description": "If you have any questions please address them to admin@example.com",
                    "content": {
                            "likes": 5,
                            "tags": ["cql", "confluence"]
                    }
            }
        }
    }
}

```

## CQL search extension

To allow searching of content properties using CQL, you can enable indexing of data stored as content properties by defining an index schema. You can define an exclusive index schema for each content property key; then, whenever a content property is saved, Confluence checks if a schema was defined for its key. If a schema exists, indexable values are extracted from content property values and stored in an index. There can only be one index schema definition for a content property key, so any duplicates will be disabled. In the case of offending keys, an appropriate log message will be available.

### Index schema definition

When defining an index schema for content properties, you need to provide a set of extraction expressions and field type pairs, which are used to retrieve a specific value from a JSON document and transform it into the desired representation. [Supported index field types](/cloud/confluence/advanced-searching-using-cql) are: `string`, `text` `number`, and `date`.

See the below JSON document and its index schema as an example:

**Example content property value**

``` javascript
{
    "id": "507f1f77bcf86cd799439011",
    "editDate": "2000-01-01T11:00:00.000+11:00",
    "description": "If you have any questions please address them to admin@example.com",
    "content": {
        "likes": 5,
        "tags": ["cql", "confluence"]
    }
}
```

Use dot-notation to access an embedded field in a document (as shown below). After successful validation, all extracted values are stored inside an index and you can address them in CQL queries.

Putting it all together, here's a sample index schema definition:

`atlassian-connect.json`

**Example Connect add-on index schema definition**

``` bash
"confluenceContentProperties": [{
    "name": {
        "value" :"Attachments index",
        "i18n": "attachments.index"
    },
    "keyConfigurations": [{
        "propertyKey" : "attachments",
        "extractions" : [{
            "objectName" : "id",
            "type" : "string"
        }]
    }]
}]
```

Field type doesn't only specify how data is stored in the index, but also determines which CQL operators are available in your query.

#### Supported index field types

| Type     | Description                                                                                                                                                                                                                                                                                                                        | Supported CQL operators |
|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------|
| `string` | Entire extracted value will be indexed as a single token, without any filtering. When extraction expression evaluates to a JSON array, each element will be indexed separately. Enables searching for an exact value, e.g. unique identifier.                                                                                      | `IN, NOT IN, =, !=`     |
| `text`   | Extracted value will be tokenized before indexing, allowing searching for a particular words.                                                                                                                                                                                                                                      | `~, !~`                 |
| `number` | Extracted number will be indexed as a `double` value for efficient range filtering and sorting.                                                                                                                                                                                                                                    | `<, <=, =, !=, >, >=`   |
| `date`   | Two representation are possible, either a `String` following the <a href="http://en.wikipedia.org/wiki/ISO_8601" class="external-link">ISO 8601</a> datetime format, or a `long` value in the <a href="http://en.wikipedia.org/wiki/Unix_time" class="external-link">Unix time</a>. Enables efficient range filtering and sorting. | `<, <=, =, !=, >, >=`   |

### Querying with CQL

Indexed content properties can be addressed in a CQL query using the `content.property` field handler. Any content that contains content properties matching the query are returned in the results.

The query syntax is as follows: `content.property[<KEY>].<PATH> <OPERATOR> value`

**Examples of CQL queries on content properties**

``` bash
content.property[attachments].editDate >= 2001-01-01
content.property[attachments].description ~ "questions"
content.property[metadata].content.tags IN ("cql", "help")
content.property[metadata].content.likes <= 5
```

{{% note %}}The dot notation when referencing embedded fields like 'content.likes'.{{% /note %}}

**Legend:**

| Symbol   | Meaning                                                                                                 |
|----------|---------------------------------------------------------------------------------------------------------|
| KEY      | The key of the content properties you're searching.                                                     |
| PATH     | The path to the value you'd like to search in the JSON document (use dot notation for embedded fields). |
| OPERATOR | One of the supported CQL operators for the field type.                                                  |

 
