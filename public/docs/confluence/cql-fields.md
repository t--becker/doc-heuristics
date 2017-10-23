---
title: "CQL fields"
platform: cloud
product: confcloud
category: reference
subcategory: cql
date: "2016-12-01"
aliases:
- confcloud/cql-field-reference-39985865.html
- /cloud/confluence/cql-field-reference-39985865.md
dac_edit_link: https://developer.atlassian.com/pages/editpage.action?cjm=wozere&pageId=39985865
dac_view_link: https://developer.atlassian.com/pages/viewpage.action?cjm=wozere&pageId=39985865
confluence_id: 39985865
---
# CQL fields

A field in CQL is a word that represents an indexed property of content in Confluence. In a clause, a field is followed by an [operator](/cloud/confluence/advanced-searching-using-cql#operator-reference), which in turn is followed by one or more values or [functions](/cloud/confluence/cql-functions). The operator compares the value of the field with one or more values or functions on the right, such that only true results are retrieved by the clause.

## Ancestor

Search for all pages that are descendants of a given ancestor page. This includes direct child pages and their descendants. It is more general than the [parent](#parent) field.

### Syntax

``` bash
ancestor
```

### Field type

CONTENT

### Supported operators

{{< include path="/docs/content/cloud/confluence/snippets/cqlsupportedopequality.snippet.md">}}


### Supported functions

None

### Examples

-   Find all descendant pages with a given ancestor page

    ``` bash
    ancestor = 123
    ```

-   Find descendants of a group of ancestor pages

    ``` bash
    ancestor in (123, 456, 789)
    ```

## Content

Search for content that have a given content ID. This is an alias of the [ID](#id) field.

### Syntax

``` bash
content
```

### Field type

CONTENT

#### Supported operators

{{< include path="docs/content/cloud/confluence/snippets/cqlsupportedopequality.snippet.md">}}


### Supported functions

None
### Examples

-   Find content with a given content id

    ``` bash
    content = 123
    ```

-   Find content in a set of content ids

    ``` bash
    content in (123, 223, 323)
    ```

## Created

Search for content that was created on, before or after a particular date (or date range).

{{% note %}}Search results will be relative to your configured time zone (which is by default the Confluence server's time zone).{{% /note %}}

Use one of the following formats:

`"yyyy/MM/dd HH:mm"`
`"yyyy-MM-dd HH:mm"`
`"yyyy/MM/dd"`
`"yyyy-MM-dd"`

### Syntax

``` bash
created
```

### Field type

DATE

### Supported operators

{{< include path="docs/content/cloud/confluence/snippets/cqlsupportedopsrange.snippet.md">}}


### Supported functions

{{< include path="docs/content/cloud/confluence/snippets/cqllistdatefunctions.snippet.md">}}

### Examples

-   Find content created after the 1st September 2014

    ``` bash
    created > 2014/09/01
    ```

-   Find content created in the last 4 weeks

    ``` bash
    created >= now("-4w")
    ```

## Creator

Search for content that was created by a particular user. You can search by the user's username.

### Syntax

``` bash
creator
```

### Field type

USER

### Supported operators

{{< include path="docs/content/cloud/confluence/snippets/cqlsupportedopequality.snippet.md">}}


### Supported functions

{{< include path="docs/content/cloud/confluence/snippets/cqllistuserfunctions.snippet.md">}}

### Examples

-   Find content created by jsmith

    ``` bash
    created = jsmith
    ```

-   Find content created by john smith or bob nguyen

    ``` bash
    created in (jsmith, bnguyen)
    ```

## Contributor

Search for content that was created or edited by a particular user. You can search by the user's username.

### Syntax

``` bash
contributor
```

### Field type

USER

### Supported operators

{{< include path="docs/content/cloud/confluence/snippets/cqlsupportedopequality.snippet.md">}}


### Supported functions

{{< include path="docs/content/cloud/confluence/snippets/cqllistuserfunctions.snippet.md">}}

### Examples

-   Find content created by jsmith

    ``` bash
    contributor = jsmith
    ```

-   Find content created by john smith or bob nguyen

    ``` bash
    contributor in (jsmith, bnguyen)
    ```

## favourite, favourite

Search for content that was favorited by a particular user. You can search by the user's username.

Due to security restrictions you are only allowed to filter on the logged in user's favorites. This field is available in both British and American spellings.

### Syntax

``` bash
favourite
```

### Field type

USER

### Supported operators

{{< include path="docs/content/cloud/confluence/snippets/cqlsupportedopequality.snippet.md">}}


### Supported functions

{{< include path="docs/content/cloud/confluence/snippets/cqllistuserfunctions.snippet.md">}}

### Examples

-   Find content that is favorited by the current user

    ``` bash
    favourite = currentUser()
    ```

-   Find content favorited by jsmith, where jsmith is also the logged in user

    ``` bash
    favourite = jsmith
    ```

## ID

Search for content that have a given content ID.

### Syntax

``` bash
id
```

### Field type

CONTENT

### Supported operators

{{< include path="docs/content/cloud/confluence/snippets/cqlsupportedopequality.snippet.md">}}


### Supported functions

None

### Examples

-   Find content with the id 123

    ``` bash
    id = 123
    ```

-   Find content in a set of content ids

    ``` bash
    id in (123, 223, 323)
    ```

## Label

Search for content that has a particular label

### Syntax

``` bash
label
```

### Field type

STRING

### Supported operators

{{< include path="docs/content/cloud/confluence/snippets/cqlsupportedopequality.snippet.md">}}


### Supported functions

None

### Examples

-   Find content that has the label finished

    ``` bash
    label = finished
    ```

-   Find content that doesn't have the label draft or review

    ``` bash
    label not in (draft, review)
    ```

## LastModified

Search for content that was last modified on, before, or after a particular date (or date range).

The search results will be relative to your configured time zone (which is by default the Confluence server's time zone).

Use one of the following formats:

`"yyyy/MM/dd HH:mm"`
`"yyyy-MM-dd HH:mm"`
`"yyyy/MM/dd"`
`"yyyy-MM-dd"`

### Syntax

``` bash
lastmodified
```

### Field type

DATE

### Supported operators

{{< include path="docs/content/cloud/confluence/snippets/cqlsupportedopsrange.snippet.md">}}


### Supported functions

{{< include path="docs/content/cloud/confluence/snippets/cqllistdatefunctions.snippet.md">}}

### Examples

-   Find content that was last modified on 1st September 2014

    ``` bash
    lastmodified = 2014-09-01
    ```

-   Find content that was last modified before the start of the year

    ``` bash
    lastmodified < startOfYear()
    ```

-   Find content that was last modified on or after 1st September but before 9am on 3rd September 2014

    ``` bash
    lastmodified >= 2014-09-01 and lastmodified < "2014-09-03 09:00"
    ```

## Macro

Search for content that has an instance of the macro with the given name in the body of the content

### Syntax

``` bash
macro
```

### Field type

STRING

### Supported operators

{{< include path="docs/content/cloud/confluence/snippets/cqlsupportedopequality.snippet.md">}}


### Supported functions

none

### Examples

-   Find content that has the JIRA issue macro

    ``` bash
    macro = jira
    ```

-   Find content that has Table of content macro or the widget macro

    ``` bash
    macro in (toc, widget)
    ```

## Mention

Search for content that mentions a particular user. You can search by the user's username.

### Syntax

``` bash
mention
```

### Field type

USER

### Supported operators

{{< include path="docs/content/cloud/confluence/snippets/cqlsupportedopequality.snippet.md">}}


### Supported functions

{{< include path="docs/content/cloud/confluence/snippets/cqllistuserfunctions.snippet.md">}}

### Examples

-   Find content that mentions jsmith or kjones

    ``` bash
    mention in (jsmith, kjones)
    ```

-   Find content that mentions jsmith

    ``` bash
    mention = jsmith
    ```

## Parent

Search for child content of a particular parent page

### Syntax

``` bash
parent
```

### Field type

CONTENT

### Supported operators

{{< include path="docs/content/cloud/confluence/snippets/cqlsupportedopequality.snippet.md">}}


### Supported functions

### Examples

-   Find child pages of a parent page with ID 123

    ``` bash
    parent = 123
    ```

## Space

Search for content that is in a particular Space. You can search by the space's key.

### Syntax

``` bash
space
```

### Field type

SPACE

### Supported operators

{{< include path="docs/content/cloud/confluence/snippets/cqlsupportedopequality.snippet.md">}}


### Supported functions

none

### Examples

-   Find content in the development space or the QA space

    ``` bash
    space in (DEV, QA)
    ```

-   Find content in the development space

    ``` bash
    space = DEV
    ```

## Text

This is a "master-field" that allows you to search for text across a number of other text fields. These are the same fields used by Confluence's search user interface.

-   [Title](#title)
-   Content body
-   [Labels](#label)

{{% note %}}[Confluence text-search syntax](/cloud/confluence/performing-text-searches-using-cql) can be used with this field.{{% /note %}}

### Syntax

``` bash
text
```

### Field type

TEXT

### Supported operators

{{< include path="docs/content/cloud/confluence/snippets/cqlsupportedopstext.snippet.md">}}


### Supported functions

none

### Examples

-   Find content that contains the word Confluence

    ``` bash
    text ~ Confluence
    ```

-   Find content in the development space

    ``` bash
    space = DEV
    ```

## Title

Search for content by title, or with a title that contains particular text.

{{% note %}}[Confluence text-search syntax](/cloud/confluence/performing-text-searches-using-cql) can be used with this fields when used with the [CONTAINS](/cloud/confluence/advanced-searching-using-cql#contains) operator ("~", "!~").{{% /note %}}

### Syntax

``` bash
title
```

### Field type

TEXT

### Supported operators

<table style="width:100%;">
<colgroup>
<col width="10%" />
<col width="10%" />
<col width="10%" />
<col width="10%" />
<col width="10%" />
<col width="10%" />
<col width="10%" />
<col width="10%" />
<col width="10%" />
<col width="10%" />
</colgroup>
<thead>
<tr class="header">
<th><p>=</p></th>
<th><p>!=</p></th>
<th><p>~</p></th>
<th><p>!~</p></th>
<th><p>&gt;</p></th>
<th><p>&gt;=</p></th>
<th><p>&lt;</p></th>
<th><p>&lt;=</p></th>
<th><p>IN</p></th>
<th><p>NOT IN</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>yes</p></td>
<td><p>yes</p></td>
<td><p>yes</p></td>
<td><p>yes</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>yes</p></td>
<td><p>yes</p></td>
</tr>
</tbody>
</table>

### Supported functions

none

### Examples

-   Find content with the title "Advanced Searching using CQL"

    ``` bash
    title = "Advanced Searching using CQL"
    ```

-   Find content that matches Searching CQL (i.e. a "fuzzy" match):

    ``` bash
    title ~ "Searching CQL"
    ```

## Type

Search for content of a particular type. Supported content types are:

-   page
-   blogpost
-   comment
-   attachment

### Syntax

``` bash
type
```

### Field type

TYPE

### Supported operators

{{< include path="docs/content/cloud/confluence/snippets/cqlsupportedopequality.snippet.md">}}


### Supported functions

none

### Examples

-   Find blogposts or pages

    ``` bash
    type IN (blogpost, page)
    ```

-   Find attachments

    ``` bash
    type = attachment
    ```

## Watcher

Search for content that a particular user is watching. You can search by the user's username.

### Syntax

``` bash
watcher
```

### Field type

USER

### Supported operators

{{< include path="docs/content/cloud/confluence/snippets/cqlsupportedopequality.snippet.md">}}


### Supported functions

{{< include path="docs/content/cloud/confluence/snippets/cqllistuserfunctions.snippet.md">}}

### Examples

-   Search for content that you are watching:

    ``` bash
    watcher = currentUser()
    ```

-   Search for content that the user "jsmith" is watching:

    ``` bash
    watcher = "jsmith"
    ```