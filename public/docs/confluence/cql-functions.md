---
title: "CQL functions"
platform: cloud
product: confcloud
category: reference
subcategory: cql
date: "2016-11-21"
aliases:
- confcloud/cql-function-reference-39985867.html
- /cloud/confluence/cql-function-reference-39985867.md
dac_edit_link: https://developer.atlassian.com/pages/editpage.action?cjm=wozere&pageId=39985867
dac_view_link: https://developer.atlassian.com/pages/viewpage.action?cjm=wozere&pageId=39985867
confluence_id: 39985867
---
# CQL functions

The instructions on this page describe how to use functions in CQL to define structured search queries to [search for content in Confluence](/cloud/confluence/advanced-searching-using-cql).  

## Functions Reference

A function in CQL appears as a word followed by parentheses which may contain one or more explicit values. In a clause, a function is preceded by an [operator](/cloud/confluence/advanced-searching-using-cql#operator-reference), which in turn is preceded by a [field](/cloud/confluence/advanced-searching-using-cql/#field-reference). A function performs a calculation on either specific Confluence data or the function's content in parentheses, such that only true results are retrieved by the function and then again by the clause in which the function is used.

This document also covers the reserved [characters](https://confluence.atlassian.com/display/JIRA/Advanced+Searching+Functions#AdvancedSearchingFunctions-characters) and [words](https://confluence.atlassian.com/display/JIRA/Advanced+Searching+Functions#AdvancedSearchingFunctions-words) that Confluence uses.

## currentUser()

Perform searches based on the currently logged-in user.

Note that this function can only be used by logged-in users. Anonymous users cannot use this function.

### Syntax

``` bash
currentUser()
```

### Supported fields

{{< include path="docs/content/cloud/confluence/snippets/cqllistuserfields.snippet.md">}}


### Supported operators

{{< include path="docs/content/cloud/confluence/snippets/cqlsupportedopequality.snippet.md">}}

### Examples

-   Find content that was created by me

    ``` bash
    creator = currentUser()
    ```

-   Find content that mentions me but wasn't created by me

    ``` bash
    mention = currentUser() and creator != currentUser()
    ```

## endOfDay()

Perform searches based on the end of the current day. See also [endOfWeek()](#endofweek), [endOfMonth](#endofmonth), [endOfYear()](#endofyear), [startOfDay()](#startofday), [startOfWeek()](#startofweek), [startOfMonth()](#startofmonth) and [startOfYear()](#startofyear).

### Syntax

``` bash
endOfDay()
```

or

``` bash
endOfDay("inc")
```

{{< include path="docs/content/cloud/confluence/snippets/cqlsupporteddatefunctionparams.snippet.md">}}


### Supported fields

{{< include path="docs/content/cloud/confluence/snippets/cqllistdatefields.snippet.md">}}

#### Supported operators

{{< include path="docs/content/cloud/confluence/snippets/cqlsupportedopsrange.snippet.md">}}


### Examples

-   Find content created since the end of yesterday

    ``` bash
    created > endOfDay("-1d")
    ```

## endOfMonth()

Perform searches based on the end of the current month. See also [endOfDay](#endofday), [endOfWeek](#endofweek) and [endOfYear](#endofyear); and [startOfDay](#startofday), [startOfWeek](#startofweek), [startOfMonth](#startofmonth), and [startOfYear](#startofyear).

### Syntax

``` bash
endOfMonth()
```

or

``` bash
endOfMonth("inc")
```

{{< include path="docs/content/cloud/confluence/snippets/cqlsupporteddatefunctionparams.snippet.md">}}

### Supported fields

{{< include path="docs/content/cloud/confluence/snippets/cqllistdatefields.snippet.md">}}

### Supported operators

{{< include path="docs/content/cloud/confluence/snippets/cqlsupportedopsrange.snippet.md">}}


### Examples

-   Find content modified before the end of the month

    ``` bash
    lastmodified < endOfMonth()
    ```

## endOfWeek()

Perform searches based on the end of the current week. See also [endOfDay](#endofday), [endOfMonth](#endofmonth) and [endOfYear](#endofyear); and [startOfDay](#startofday), [startOfWeek](#startofweek), [startOfMonth](#startofmonth), and [startOfYear](#startofyear).

### Syntax

``` bash
endOfWeek()
```

or

``` bash
endOfWeek("inc")
```

{{< include path="docs/content/cloud/confluence/snippets/cqlsupporteddatefunctionparams.snippet.md">}}

### Supported fields

{{< include path="docs/content/cloud/confluence/snippets/cqllistdatefields.snippet.md">}}

### Supported operators

{{< include path="docs/content/cloud/confluence/snippets/cqlsupportedopsrange.snippet.md">}}


### Examples

-   Find content created after the end of last week

    ``` bash
    created > endOfWeek("-1w")
    ```

## endOfYear()

Perform searches based on the end of the current year. See also [startOfDay](#startofday), [startOfWeek](#startofweek) and [startOfMonth](#startofmonth); and [endOfDay](#endofday), [endOfWeek](#endofweek), [endOfMonth](#endofmonth) and [endOfYear](#endofyear).

``` bash
endOfYear()
```

or

``` bash
endOfYear("inc")
```

{{< include path="docs/content/cloud/confluence/snippets/cqlsupporteddatefunctionparams.snippet.md">}}

### Supported fields

{{< include path="docs/content/cloud/confluence/snippets/cqllistdatefields.snippet.md">}}

### Supported operators

{{< include path="docs/content/cloud/confluence/snippets/cqlsupportedopsrange.snippet.md">}}


### Examples

-   Find content created by the end of this year:

    ``` bash
    created < endOfYear()
    ```

## startOfDay()

Perform searches based on the start of the current day. See also [endOfWeek](#endofweek), [endOfMonth](#endofmonth) and [endOfYear](#endofyear); and [startOfDay](#startofday), [startOfWeek](#startofweek), [startOfMonth](#startofmonth), and [startOfYear](#startofyear).

### Syntax

``` bash
startOfDay()
```

or

``` bash
startOfDay("inc")
```

{{< include path="docs/content/cloud/confluence/snippets/cqlsupporteddatefunctionparams.snippet.md">}}

### Supported fields

{{< include path="docs/content/cloud/confluence/snippets/cqllistdatefields.snippet.md">}}

### Supported operators

{{< include path="docs/content/cloud/confluence/snippets/cqlsupportedopsrange.snippet.md">}}


### Examples

-   Find content created since the start of today

    ``` bash
    created > startOfDay()
    ```

-   Find content created in the last 7 days

    ``` bash
    created > startOfDay("-7d")
    ```

### startOfMonth()

Perform searches based on the start of the current month. See also [endOfDay](#endofday), [endOfWeek](#endofweek) and [endOfYear](#endofyear); and [startOfDay](#startofday), [startOfWeek](#startofweek), [startOfMonth](#startofmonth), and [startOfYear](#startofyear).

### Syntax

``` bash
startOfMonth()
```

or

``` bash
startOfMonth("inc")
```

{{< include path="docs/content/cloud/confluence/snippets/cqlsupporteddatefunctionparams.snippet.md">}}

### Supported fields

{{< include path="docs/content/cloud/confluence/snippets/cqllistdatefields.snippet.md">}}

### Supported operators

{{< include path="docs/content/cloud/confluence/snippets/cqlsupportedopsrange.snippet.md">}}


### Examples

-   Find content created since the start of the month

    ``` bash
    created >= startOfMonth()
    ```

## startOfWeek()

Perform searches based on the start of the current week. See also [endOfDay](#endofday), [endOfMonth](#endofmonth), and [endOfYear](#endofyear); and [startOfDay](#startofday), [startOfWeek](#startofweek), [startOfMonth](#startofmonth), and [startOfYear](#startofyear).

### Syntax

``` bash
startOfWeek()
```

or

``` bash
startOfWeek("inc")
```

{{< include path="docs/content/cloud/confluence/snippets/cqlsupporteddatefunctionparams.snippet.md">}}

### Supported fields

{{< include path="docs/content/cloud/confluence/snippets/cqllistdatefields.snippet.md">}}

### Supported operators

{{< include path="docs/content/cloud/confluence/snippets/cqlsupportedopsrange.snippet.md">}}


### Examples

-   Find content created since the start of the week

    ``` bash
    created >= startOfWeek()
    ```

## startOfYear()

Perform searches based on the start of the current year. See also [startOfDay](#startofday), [startOfWeek](#startofweek), and [startOfMonth](#startofmonth); and [endOfDay](#endofday), [endOfWeek](#endofweek), [endOfMonth](#endofmonth), and [endOfYear](#endofyear).

``` bash
startOfYear()
```

or

``` bash
startOfYear("inc")
```

{{< include path="docs/content/cloud/confluence/snippets/cqlsupporteddatefunctionparams.snippet.md">}}

### Supported fields

{{< include path="docs/content/cloud/confluence/snippets/cqllistdatefields.snippet.md">}}

### Supported operators

{{< include path="docs/content/cloud/confluence/snippets/cqlsupportedopsrange.snippet.md">}}


### Examples

-   Find content created this year

    ``` bash
    created >= startOfYear()
    ```

## favouriteSpaces()

Returns a list of space keys, corresponding to the favorite spaces of the logged in user. 

### Syntax

``` bash
favouriteSpaces()
```

### Supported fields

-   [Space](/cloud/confluence/cql-fields#space)

### Supported operators

{{< include path="docs/content/cloud/confluence/snippets/cqlsupportedopsset.snippet.md">}}


### Examples

-   Find content which exists in the favorite spaces of the logged in user 

``` bash
space IN favouriteSpaces()
```

-   Find content which exists in the favorite spaces of the logged in user as well as other listed spaces

``` bash
space IN (favouriteSpaces(), 'FS', 'TS')
```

### Available from version

5.9

## recentlyViewedContent()

Returns a list of IDs of recently viewed content for the logged in user.

### Syntax

``` bash
recentlyViewedContent(limit, offset)
```

### Supported fields

-   ancestor
-   content
-   id
-   parent

### Supported operators

{{< include path="docs/content/cloud/confluence/snippets/cqlsupportedopsset.snippet.md">}}

### Examples

-   Find contents with limit to recent 10 history

``` bash
id in recentlyViewedContent(10)
```

-   Find contents with limit to recent 10 history, but skip first 20

``` bash
id in recentlyViewedContent(10, 20)
```

### Available from version

5.9

## recentlyViewedSpaces()

Returns a list of key of spaces recently viewed by the logged in user.

### Syntax

``` bash
recentlyViewedSpaces(limit)
```

### Supported fields

-   space

### Supported operators

{{< include path="docs/content/cloud/confluence/snippets/cqlsupportedopsset.snippet.md">}}


### Examples

-   Find spaces with limit to recent 10 history

``` bash
 space in recentlyViewedSpaces(10)
```

### Available from version

5.9


## Reserved characters

CQL has a list of reserved characters :

-   **space** (`" "`)
-   `"+"`
-   `"."`
-   `","`
-   `";"`
-   `"?"`
-   `"|"`
-   `"*"`
-   `"/"`
-   `"%"`
-   `"^"`
-   `"$"`
-   `"#"`
-   `"@"`
-   `"["`
-   `"]"`

 

If you wish to use these characters in queries, you need to:

-   surround them with quote-marks (you can use either single quote-marks (`'`) or double quote-marks (`"`);
    **and,** if you are searching a text field and the character is on the list of [reserved characters for text searches](/cloud/confluence/performing-text-searches-using-cql)
-   precede them with two backslashes.

## Reserved words

CQL has a list of reserved words. These words need to be surrounded by quote-marks if you wish to use them in queries:

"after", "and", "as", "avg", "before", "begin", "by","commit", "contains"**,** "count", "distinct", "else", "empty", "end", "explain", "from", "having", "if", "in", "inner", "insert", "into", "is", "isnull", "left", "like", "limit", "max", "min", "not", "null", "or", "order", "outer", "right", "select", "sum", "then", "was", "where", "update"

 

#### Related topics

-   [Advanced Searching using CQL](/cloud/confluence/advanced-searching-using-cql)
-   [Performing text searches using CQL](/cloud/confluence/performing-text-searches-using-cql)
-   [CQL fields](/cloud/confluence/cql-fields)
