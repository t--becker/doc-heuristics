---
title: "CQL keywords"
platform: cloud
product: confcloud
category: reference
subcategory: cql
date: "2016-11-17"
aliases:
- confcloud/cql-keywords-reference-39985872.html
- /cloud/confluence/cql-keywords-reference-39985872.md
dac_edit_link: https://developer.atlassian.com/pages/editpage.action?cjm=wozere&pageId=39985872
dac_view_link: https://developer.atlassian.com/pages/viewpage.action?cjm=wozere&pageId=3998587
confluence_id: 39985872
---
# CQL keywords

A keyword in CQL is a word or phrase that:

- joins two or more clauses together to form a complex CQL query, or
- alters the logic of one or more clauses, or
- alters the logic of [operators](/cloud/confluence/advanced-searching-using-cql#operator-reference), or
- has an explicit definition in a CQL query, or
- performs a specific function that alters the results of a CQL query.

## AND

Used to combine multiple clauses, allowing you to refine your search.

{{% note %}}You can use [parentheses](/cloud/confluence/advanced-searching-using-cql#setting-precedence-of-operators) to control the order in which clauses are executed.{{% /note %}}

### Examples

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

## OR

Used to combine multiple clauses, allowing you to expand your search.

{{% note %}} You can use [parentheses](/cloud/confluence/advanced-searching-using-cql#operator-reference) to control the order in which clauses are executed. Also see [IN](/cloud/confluence/cql-operators#in), which can be a more convenient way to search for multiple values of a field.{{% /note %}}

### Examples

-   Find all content in the IDEAS space or with the label idea

    ``` bash
    space = IDEAS or label = idea
    ```

-   Find all content last modified before the start of the year or with the label needs\_review

    ``` bash
    lastModified < startOfYear() or label = needs_review
    ```

## NOT

Used to negate individual clauses or a complex CQL query (a query made up of more than one clause) using [parentheses](/cloud/confluence/advanced-searching-using-cql#operator-reference), allowing you to refine your search.

{{% note %}} Also see [NOT EQUALS](/cloud/confluence/cql-operators#not-equals) ("!="), [DOES NOT CONTAIN](/cloud/confluence/cql-operators#does-not-contain) ("!~") and [NOT IN](/cloud/confluence/cql-operators#not-in).){{% /note %}} 

### Examples

-   Find all pages with the "cql" label that aren't in the dev space

    ``` bash
    label = cql and not space = dev 
    ```

## ORDER BY

Used to specify the fields by whose values the search results will be sorted.

By default, the field's own sorting order will be used. You can override this by specifying ascending order ("`asc`") or descending order ("`desc`").

Not all fields support Ordering. Generally, ordering is not supported where a piece of content can have multiple values for a field, for instance ordering is not supported on labels.

### Examples

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
