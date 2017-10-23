---
title: "Advanced searching using CQL"
platform: cloud
product: confcloud
category: reference
subcategory: cql
date: "2016-11-21"
aliases:
- confcloud/advanced-searching-using-cql-39985862.html
- /cloud/confluence/advanced-searching-using-cql-39985862.md
confluence_id: 39985862
dac_edit_link: https://developer.atlassian.com/pages/editpage.action?cjm=wozere&pageId=39985862
dac_view_link: https://developer.atlassian.com/pages/viewpage.action?cjm=wozere&pageId=39985862
---
# Advanced searching using CQL

The instructions on this page describe how to define and execute a search using the advanced search capabilities of the Confluence REST API. 

## What is an advanced search?

An advanced search allows you to use structured queries to search for content in Confluence. Your search results will take the same form as the Content model returned by the Content REST API.

When you perform an advanced search, you are using the Confluence Query Language (CQL).

A simple query in CQL (also known as a 'clause') consists of a [field](#field-reference), followed by an [operator](#operator-reference), followed by one or more values or [functions](/cloud/confluence/cql-functions). For example, the following simple query will find all content in the "TEST" space. It uses the Space [field](#field-reference), the [EQUALS](#equals) operator, and the value (`"TEST"`.)

``` bash
space = "TEST"
```

It is not possible to compare two [fields](#field-reference).

{{% note %}}CQL gives you some SQL-like syntax, such as the [ORDER BY](#order-by) SQL keyword. However, CQL is not a database query language. For example, CQL does not have a `SELECT` statement.{{% /note %}}

### How to perform an advanced search

The Content API REST Resource now supports CQL as a query parameter to filter the list of returned content.

``` javascript
https://your-domain.atlassian.net/wiki/rest/api/content/search?cql=space=TEST
```

To perform an advanced search:

1.  Add your query using the [fields](#field-reference), [operators](#operator-reference) and field values or [functions](/cloud/confluence/cql-functions) as the value for the CQL query parameter.
2.  Execute a GET request on the resource, you can apply expansions and pagination as you would normally in the Confluence REST API.

### Performing text searches

You can use the [CONTAINS](#contains) operator to use Lucene's text-searching features when performing searches on these fields:

-   title
-   text
-   space.title

For details, please see the page on [Performing text searches](/cloud/confluence/performing-text-searches-using-cql).

### Setting precedence of operators

You can use parentheses in complex CQL statements to enforce the precedence of [operators](#operator-reference).

For example, if you want to find all pages in the Developer space as well as all blog posts created by the the system administrator (bobsmith), you can use parentheses to enforce the precedence of the boolean operators in your query. For example:

``` bash
(type=page and Space=DEV) OR (creator=bobsmith and type=blogpost)
```

{{% note %}}If you do not use parentheses, the statement will be evaluated left to right.{{% /note %}}

You can also use parentheses to group clauses, so that you can apply the [NOT](#not) operator to the group.

## Keyword reference

A keyword in CQL is a word or phrase that:

-   joins two or more clauses together to form a complex CQL query, or
-   alters the logic of one or more clauses, or
-   alters the logic of [operators](#operator-reference), or
-   has an explicit definition in a CQL query, or
-   performs a specific function that alters the results of a CQL query.

**List of keywords:**

-   [AND](#and)
-   [OR](#or)
-   [NOT](#not)
-   [ORDER BY](#order-by)

#### AND

Used to combine multiple clauses, allowing you to refine your search.

{{% note %}}You can use [parentheses](#setting-precedence-of-operators) to control the order in which clauses are executed.{{% /note %}}

###### Examples

-   Find all blogposts with the label "performance"

    ``` bash
    label = "performance" and type = "blogpost"
    ```

-   Find all pages created by jsmith in the DEV space

    ``` bash
    type = page and creator = jsmith and space = DEV
    ```

-   Find all content that mentions jsmith but was not created by jsmith

    ``` bash
    mention = jsmith and creator != jsmith
    ```


#### OR

Used to combine multiple clauses, allowing you to expand your search.

{{% note %}}You can use [parentheses](#setting-precedence-of-operators) to control the order in which clauses are executed.{{% /note %}}

{{% tip %}}Also see [IN](#in), which can be a more convenient way to search for multiple values of a field.{{% /tip %}}

###### Examples

-   Find all content in the IDEAS space or with the label idea

    ``` bash
    space = IDEAS or label = idea
    ```

-   Find all content last modified before the start of the year or with the label needs\_review

    ``` bash
    lastModified < startOfYear() or label = needs_review
    ```


#### NOT

Used to negate individual clauses or a complex CQL query (a query made up of more than one clause) using [parentheses](#setting-precedence-of-operators), allowing you to refine your search.

{{% note %}}Also see [NOT EQUALS](#not-equals)("!="), [DOES NOT CONTAIN](#does-not-contain)("!~") and [NOT IN](#not-in).{{% /note %}}

###### Examples

-   Find all pages with the "cql" label that aren't in the dev space

    ``` bash
    label = cql and not space = dev 
    ```

#### ORDER BY

Used to specify the fields by whose values the search results will be sorted.

By default, the field's own sorting order will be used. You can override this by specifying ascending order ("`asc`") or descending order ("`desc`").

Not all fields support Ordering. Generally, ordering is not supported where a piece of content can have multiple values for a field, for instance ordering is not supported on labels.

###### Examples

-   Find content in the DEV space ordered by creation date

    ``` bash
    space = DEV order by created
    ```

-   Find content in the DEV space ordered by creation date with the newest first, then title

    ``` bash
    space = DEV order by created desc, title
    ```

-   Find pages created by jsmith ordered by space, then title

    ``` bash
    creator = jsmith order by space, title asc
    ```

## Operator reference

An operator in CQL is one or more symbols or words which compares the value of a [field](#field-reference) on its left with one or more values (or functions) on its right, such that only true results are retrieved by the clause. Some operators may use the [NOT](#not) keyword.

**List of operators:**

-   [EQUALS: =](#equals)
-   [NOT EQUALS: !=](#not-equals)
-   [GREATER THAN: &gt;](#greater-than)
-   [GREATER THAN EQUALS: &gt;=](#greater-than-equals)
-   [LESS THAN: &lt;](#less-than)
-   [LESS THAN EQUALS: &lt;=](#less-than-equals)
-   [IN](#in)
-   [NOT IN](#not-in)
-   [CONTAINS: ~](#contains)
-   [DOES NOT CONTAIN: !~](#does-not-contain)

#### EQUALS: =

The "`=`" operator is used to search for content where the value of the specified field exactly matches the specified value (cannot be used with [text](#text) fields; see the [CONTAINS](#contains) operator instead.)

To find content where the value of a specified field exactly matches *multiple* values, use multiple "`=`" statements with the [AND](#and) operator.

###### Examples

-   Find all content that were created by jsmith:

    ``` bash
    creator = jsmith
    ```

-   Find all content that has the title "Advanced Searching"

    ``` bash
    title = "Advanced Searching"
    ```

#### NOT EQUALS: !=

The "`!=`" operator is used to search for content where the value of the specified field does not match the specified value. (Note: cannot be used with [text](#text) fields; see the [DOES NOT MATCH](#does-not-contain) ("`!~`") operator instead.)

{{% note %}}Typing `field != value` is the same as typing `NOT field = value`.{{% /note %}}

Currently a negative expression cannot be the first clause in a CQL statement

###### Examples

-   Find all content in the DEV space that was created by someone other than jsmith:

    ``` bash
    space = DEV and not creator = jsmith
    ```

    or:

    ``` bash
    space = DEV and creator != jsmith
    ```

-   Find all content that was created by me but doesn't mention me

    ``` bash
    creator = currentUser() and mention != currentUser()
    ```

#### GREATER THAN: &gt;

The "`>`" operator is used to search for content where the value of the specified field is greater than the specified value. Cannot be used with [text](#text) fields.

Note that the "`>`" operator can only be used with fields which support range operators (e.g. date fields and numeric fields). To see a field's supported operators, check the individual [field](#field-reference) reference.

###### Examples

-   Find all content created in the last 4 weeks

    ``` bash
    created > now("-4w")
    ```

-   Find all attachments last modified since the start of the month

    ``` bash
    created > startOfMonth() and type = attachment
    ```

#### GREATER THAN EQUALS: &gt;=

The "`>=`" operator is used to search for content where the value of the specified field is greater than or equal to the specified value. Cannot be used with [text](#text) fields.

Note that the "`>=`" operator can only be used with fields which support range operators (e.g. date fields). To see a field's supported operators, check the individual [field](#field-reference) reference.

###### Examples

-   Find all content created on or after 31/12/2008:

    ``` bash
    created >= "2008/12/31"
    ```

#### LESS THAN: &lt;

The "`<`" operator is used to search for content where the value of the specified field is less than the specified value. Cannot be used with [text](#text) fields.

Note that the "`<`" operator can only be used with fields which support range operators (e.g. date fields). To see a field's supported operators, check the individual [field](#field-reference) reference.

###### Examples

-   Find all pages lastModified before the start of the year

    ``` bash
    lastModified < startOfYear() and type = page
    ```

#### LESS THAN EQUALS: &lt;=

The "`<=`" operator is used to search for content where the value of the specified field is less than or equal to than the specified value. Cannot be used with [text](#text) fields.

Note that the "`<=`" operator can only be used with fields which support range operators (e.g. date fields). To see a field's supported operators, check the individual [field](#field-reference) reference.

###### Examples

-   Find blogposts created in the since the start of the fortnight

    ``` bash
    created >= startOfWeek("-1w") and type = blogpost
    ```

#### IN

The "`IN`" operator is used to search for content where the value of the specified field is one of multiple specified values. The values are specified as a comma-delimited list, surrounded by parentheses.

Using "`IN`" is equivalent to using multiple `EQUALS (=)` statements with the OR keyword, but is shorter and more convenient. That is, typing `creator IN (tom, jane, harry)` is the same as typing `creator = "tom" OR creator = "jane" OR creator = "harry"`.

###### Examples

-   Find all content that mentions either jsmith or jbrown or jjones:

    ``` bash
    mention in (jsmith,jbrown,jjones)
    ```

-   Find all content where the creator or contributor is either Jack or Jill:

    ``` bash
    creator in (Jack,Jill) or contributor in (Jack,Jill)
    ```

#### NOT IN

The "`NOT IN`" operator is used to search for content where the value of the specified field is not one of multiple specified values.

Using "`NOT IN`" is equivalent to using multiple `NOT_EQUALS (!=)` statements, but is shorter and more convenient. That is, typing `creator NOT IN (tom, jane, harry)` is the same as typing `creator != "tom" AND creator != "jane" AND creator != "harry"`.

###### Examples

-   Find all content where the creator is someone other than Jack, Jill or John:

    ``` bash
    space = DEV and creator not in (Jack,Jill,John)
    ```

#### CONTAINS: ~

The "`~`" operator is used to search for content where the value of the specified field matches the specified value (either an exact match or a "fuzzy" match -- see examples below). The "~" operator can only be used with text fields, for example:

-   title
-   text

{{% note %}}When using the "`~`" operator, the value on the right-hand side of the operator can be specified using [Confluence text-search syntax](/cloud/confluence/performing-text-searches-using-cql).{{% /note %}}

###### Examples

-   Find all content where the title contains the word "win" (or simple derivatives of that word, such as "wins"):

    ``` bash
    title ~ win
    ```

-   Find all content where the title contains a [wild-card](/cloud/confluence/cql-operators) match for the word "win":

    ``` bash
    title ~ "win*"
    ```

-   Find all content where the text contains the word "advanced" and the word "search":

    ``` bash
    text ~ "advanced search"
    ```

#### DOES NOT CONTAIN: !~

The "`!~`" operator is used to search for content where the value of the specified field is not a "fuzzy" match for the specified value. The "!~" operator can only be used with text fields, for example:

-   title
-   text

{{% note %}}When using the "`!~`" operator, the value on the right-hand side of the operator can be specified using [Confluence text-search syntax](/cloud/confluence/performing-text-searches-using-cql).{{% /note %}}

###### Examples

-   Find all content where the title does not contain the word "run" (or derivatives of that word, such as "running" or "ran"):

    ``` bash
    space = DEV and title !~ run
    ```


## Field reference

A field in CQL is a word that represents an indexed property of content in Confluence. In a clause, a field is followed by an [operator](#operator-reference), which in turn is followed by one or more values (or functions). The operator compares the value of the field with one or more values or functions on the right, such that only true results are retrieved by the clause.

**List of fields:**

-   [Ancestor](#ancestor)
-   [Content](#content)
-   [Created](#created)
-   [Creator](#creator)
-   [Contributor](#contributor)
-   [favourite, favourite](#favourite-favourite)
-   [ID](#id)
-   [Label](#label)
-   [LastModified](#lastmodified)
-   [Macro](#macro)
-   [Mention](#mention)
-   [Parent](#parent)
-   [Space](#space)
-   [text](#text)
-   [Title](#title)
-   [Type](#type)
-   [Watcher](#watcher)

#### Ancestor

Search for all pages that are descendants of a given ancestor page. This includes direct child pages and their descendants. It is more general than the [parent](#parent) field.

###### Syntax

``` bash
ancestor
```

###### Field type

CONTENT

###### Supported operators

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
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>yes</p></td>
<td><p>yes</p></td>
</tr>
</tbody>
</table>

###### Supported functions

None

###### Examples

-   Find all descendant pages with a given ancestor page

    ``` bash
    ancestor = 123
    ```

-   Find descendants of a group of ancestor pages

    ``` bash
    ancestor in (123, 456, 789)
    ```

#### Content

Search for content that have a given content ID. This is an alias of the [ID](#id) field.

###### Syntax

``` bash
content
```

###### Field type

CONTENT

###### Supported operators

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
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>yes</p></td>
<td><p>yes</p></td>
</tr>
</tbody>
</table>

###### Supported functions

None
###### Examples

-   Find content with a given content id

    ``` bash
    content = 123
    ```

-   Find content in a set of content ids

    ``` bash
    content in (123, 223, 323)
    ```

#### Created

Search for content that was created on, before or after a particular date (or date range).

{{% note %}}Search results will be relative to your configured time zone (which is by default the Confluence server's time zone).{{% /note %}}

Use one of the following formats:

`"yyyy/MM/dd HH:mm"`
`"yyyy-MM-dd HH:mm"`
`"yyyy/MM/dd"`
`"yyyy-MM-dd"`

###### Syntax

``` bash
created
```

###### Field type

DATE

###### Supported operators

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
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>yes</p></td>
<td><p>yes</p></td>
<td><p>yes</p></td>
<td><p>yes</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
</tr>
</tbody>
</table>

###### Supported functions

-   [endOfDay()](/cloud/confluence/cql-functions/#endofday)
-   [endOfMonth()](/cloud/confluence/cql-functions/#endofmonth)
-   [endOfWeek()](/cloud/confluence/cql-functions/#endofweek)
-   [endOfYear()](/cloud/confluence/cql-functions/#endofyear)
-   [startOfDay()](/cloud/confluence/cql-functions/#startofday)
-   [startOfMonth()](/cloud/confluence/cql-functions/#startofmonth)
-   [startOfWeek()](/cloud/confluence/cql-functions/#startofweek)
-   [startOfYear()](/cloud/confluence/cql-functions/#startofyear)

###### Examples

-   Find content created after the 1st September 2014

    ``` bash
    created > 2014/09/01
    ```

-   Find content created in the last 4 weeks

    ``` bash
    created >= now("-4w")
    ```

#### Creator

Search for content that was created by a particular user. You can search by the user's username.

###### Syntax

``` bash
creator
```

###### Field type

USER

###### Supported operators

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
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>yes</p></td>
<td><p>yes</p></td>
</tr>
</tbody>
</table>

###### Supported functions

-   [currentUser()](/cloud/confluence/cql-functions/#currentuser)

###### Examples

-   Find content created by jsmith

    ``` bash
    created = jsmith
    ```

-   Find content created by john smith or bob nguyen

    ``` bash
    created in (jsmith, bnguyen)
    ```

#### Contributor

Search for content that was created or edited by a particular user. You can search by the user's username.

###### Syntax

``` bash
contributor
```

###### Field type

USER

###### Supported operators

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
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>yes</p></td>
<td><p>yes</p></td>
</tr>
</tbody>
</table>

###### Supported functions

-   [currentUser()](/cloud/confluence/cql-functions/#currentuser)

###### Examples

-   Find content created by jsmith

    ``` bash
    contributor = jsmith
    ```

-   Find content created by john smith or bob nguyen

    ``` bash
    contributor in (jsmith, bnguyen)
    ```

#### favourite, favourite

Search for content that was favorited by a particular user. You can search by the user's username.

Due to security restrictions you are only allowed to filter on the logged in user's favorites. This field is available in both British and American spellings.

###### Syntax

``` bash
favourite
```

###### Field type

USER

###### Supported operators

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
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>yes</p></td>
<td><p>yes</p></td>
</tr>
</tbody>
</table>

###### Supported functions

-   [currentUser()](/cloud/confluence/cql-functions/#currentuser)

###### Examples

-   Find content that is favorited by the current user

    ``` bash
    favourite = currentUser()
    ```

-   Find content favorited by jsmith, where jsmith is also the logged in user

    ``` bash
    favourite = jsmith
    ```

#### ID

Search for content that have a given content ID.

###### Syntax

``` bash
id
```

###### Field type

CONTENT

###### Supported operators

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
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>yes</p></td>
<td><p>yes</p></td>
</tr>
</tbody>
</table>

###### Supported functions

None

###### Examples

-   Find content with the id 123

    ``` bash
    id = 123
    ```

-   Find content in a set of content ids

    ``` bash
    id in (123, 223, 323)
    ```

#### Label

Search for content that has a particular label

###### Syntax

``` bash
label
```

###### Field type

STRING

###### Supported operators

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
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>yes</p></td>
<td><p>yes</p></td>
</tr>
</tbody>
</table>

###### Supported functions

None

###### Examples

-   Find content that has the label finished

    ``` bash
    label = finished
    ```

-   Find content that doesn't have the label draft or review

    ``` bash
    label not in (draft, review)
    ```

#### LastModified

Search for content that was last modified on, before, or after a particular date (or date range).

The search results will be relative to your configured time zone (which is by default the Confluence server's time zone)

Use one of the following formats:

`"yyyy/MM/dd HH:mm"`
`"yyyy-MM-dd HH:mm"`
`"yyyy/MM/dd"`
`"yyyy-MM-dd"`

###### Syntax

``` bash
lastmodified
```

###### Field type

DATE

###### Supported operators

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
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>yes</p></td>
<td><p>yes</p></td>
<td><p>yes</p></td>
<td><p>yes</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
</tr>
</tbody>
</table>

###### Supported functions

-   [endOfDay()](/cloud/confluence/cql-functions/#endofday)
-   [endOfMonth()](/cloud/confluence/cql-functions/#endofmonth)
-   [endOfWeek()](/cloud/confluence/cql-functions/#endofweek)
-   [endOfYear()](/cloud/confluence/cql-functions/#endofyear)
-   [startOfDay()](/cloud/confluence/cql-functions/#startofday)
-   [startOfMonth()](/cloud/confluence/cql-functions/#startofmonth)
-   [startOfWeek()](/cloud/confluence/cql-functions/#startofweek)
-   [startOfYear()](/cloud/confluence/cql-functions/#startofyear)

###### Examples

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

#### Macro

Search for content that has an instance of the macro with the given name in the body of the content

###### Syntax

``` bash
macro
```

###### Field type

STRING

###### Supported operators

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
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>yes</p></td>
<td><p>yes</p></td>
</tr>
</tbody>
</table>

###### Supported functions

none

###### Examples

-   Find content that has the JIRA issue macro

    ``` bash
    macro = jira
    ```

-   Find content that has Table of content macro or the widget macro

    ``` bash
    macro in (toc, widget)
    ```

#### Mention

Search for content that mentions a particular user. You can search by the user's username.

###### Syntax

``` bash
mention
```

###### Field type

USER

###### Supported operators

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
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>yes</p></td>
<td><p>yes</p></td>
</tr>
</tbody>
</table>

###### Supported functions

-   [currentUser()](/cloud/confluence/cql-functions/#currentuser)

###### Examples

-   Find content that mentions jsmith or kjones

    ``` bash
    mention in (jsmith, kjones)
    ```

-   Find content that mentions jsmith

    ``` bash
    mention = jsmith
    ```

#### Parent

Search for child content of a particular parent page

###### Syntax

``` bash
parent
```

###### Field type

CONTENT

###### Supported operators

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
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>yes</p></td>
<td><p>yes</p></td>
</tr>
</tbody>
</table>

###### Supported functions

none

###### Examples

-   Find child pages of a parent page with ID 123

    ``` bash
    parent = 123
    ```

#### Space

Search for content that is in a particular Space. You can search by the space's key.

###### Syntax

``` bash
space
```

###### Field type

SPACE

###### Supported operators

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
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>yes</p></td>
<td><p>yes</p></td>
</tr>
</tbody>
</table>

###### Supported functions

none

###### Examples

-   Find content in the development space or the QA space

    ``` bash
    space in (DEV, QA)
    ```

-   Find content in the development space

    ``` bash
    space = DEV
    ```

#### Text

This is a "master-field" that allows you to search for text across a number of other text fields. These are the same fields used by Confluence's search user interface.

-   [Title](#title)
-   Content body
-   [Labels](#label)

{{% note %}}[Confluence text-search syntax](/cloud/confluence/performing-text-searches-using-cql) can be used with this field.{{% /note %}}

###### Syntax

``` bash
text
```

###### Field type

TEXT

###### Supported operators

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
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>yes</p></td>
<td><p>yes</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
</tr>
</tbody>
</table>

###### Supported functions

none

###### Examples

-   Find content that contains the word Confluence

    ``` bash
    text ~ Confluence
    ```

-   Find content in the development space

    ``` bash
    space = DEV
    ```

#### Title

Search for content by title, or with a title that contains particular text.

{{% note %}}[Confluence text-search syntax](/cloud/confluence/performing-text-searches-using-cql) can be used with these fields when used with the [CONTAINS](#contains) operator ("~", "!~").{{% /note %}}

###### Syntax

``` bash
title
```

###### Field type

TEXT

###### Supported operators

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

###### Supported functions

none

###### Examples

-   Find content with the title "Advanced Searching using CQL"

    ``` bash
    title = "Advanced Searching using CQL"
    ```

-   Find content that matches Searching CQL (i.e. a "fuzzy" match):

    ``` bash
    title ~ "Searching CQL"
    ```

#### Type

Search for content of a particular type. Supported content types are:

-   page
-   blogpost
-   comment
-   attachment

###### Syntax

``` bash
type
```

###### Field type

TYPE

###### Supported operators

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
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>yes</p></td>
<td><p>yes</p></td>
</tr>
</tbody>
</table>

###### Supported functions

none

###### Examples

-   Find blogposts or pages

    ``` bash
    type IN (blogpost, page)
    ```

-   Find attachments

    ``` bash
    type = attachment
    ```


#### Watcher

Search for content that a particular user is watching. You can search by the user's username.

###### Syntax

``` bash
watcher
```

###### Field type

USER

###### Supported operators

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
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>no</p></td>
<td><p>yes</p></td>
<td><p>yes</p></td>
</tr>
</tbody>
</table>

###### Supported functions

-   [currentUser()](/cloud/confluence/cql-functions/#currentuser)

###### Examples

-   Search for content that you are watching:

    ``` bash
    watcher = currentUser()
    ```

-   Search for content that the user "jsmith" is watching:

    ``` bash
    watcher = "jsmith"
    ```

 

### Related topics

-   [Performing text searches using CQL](/cloud/confluence/performing-text-searches-using-cql/)
-   [Adding a field to CQL](/cloud/confluence/cql-fields)
-   [CQL field module](https://developer.atlassian.com/confdev/confluence-plugin-guide/confluence-plugin-module-types/cql-field-module)
-   [CQL function module](/cloud/confluence/cql-functions)
