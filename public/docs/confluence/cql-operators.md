---
title: "CQL operators"
platform: cloud
product: confcloud
category: reference
subcategory: cql
date: "2016-11-17"
aliases:
- confcloud/cql-operators-reference-39985874.html
- /confcloud/cql-operators-reference-39985874.md
dac_edit_link: https://developer.atlassian.com/pages/editpage.action?cjm=wozere&pageId=39985874
dac_view_link: https://developer.atlassian.com/pages/viewpage.action?cjm=wozere&pageId=39985874
confluence_id: 39985874
---
# CQL operators

An operator in CQL is one or more symbols or words which compares the value of a [field](/cloud/confluence/cql-fields) on its left with one or more values (or [functions](/cloud/confluence/cql-functions)) on its right, such that only true results are retrieved by the clause. Some operators may use the `NOT` keyword.

## EQUALS

The "`=`" operator is used to search for content where the value of the specified field exactly matches the specified value (cannot be used with [text](/cloud/confluence/advanced-searching-using-cql#text) fields; see the [CONTAINS](#contains) operator instead.)

To find content where the value of a specified field exactly matches *multiple* values, use multiple "`=`" statements with the [AND](/cloud/confluence/cql-keywords#and) operator.

### Examples

-   Find all content that were created by jsmith:

    ``` bash
    creator = jsmith
    ```

-   Find all content that has the title "Advanced Searching"

    ``` bash
    title = "Advanced Searching"
    ```

## NOT EQUALS

The "`!=`" operator is used to search for content where the value of the specified field does not match the specified value. It cannot be used with [text](/cloud/confluence/advanced-searching-using-cql#text) fields; see the [DOES NOT CONTAIN](#does-not-contain) ("`!~`") operator instead.

{{% note %}}Typing `field != value` is the same as typing `NOT field = value`.{{% /note %}}

Currently a negative expression cannot be the first clause in a CQL statement

### Examples

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

## GREATER THAN

The "`>`" operator is used to search for content where the value of the specified field is greater than the specified value. Cannot be used with [text] fields.

The "`>`" operator can only be used with fields which support range operators (e.g. date fields and numeric fields). To see a field's supported operators, check the individual [field](/cloud/confluence/advanced-searching-using-cql#field-reference) reference.

### Examples

-   Find all content created in the last 4 weeks

    ``` bash
    created > now("-4w")
    ```

-   Find all attachments last modified since the start of the month

    ``` bash
    created > startOfMonth() and type = attachment
    ```

## GREATER THAN EQUALS

The "`>=`" operator is used to search for content where the value of the specified field is greater than or equal to the specified value. Cannot be used with [text](/cloud/confluence/advanced-searching-using-cql#text) fields.

The "`>=`" operator can only be used with fields which support range operators (e.g. date fields). To see a field's supported operators, check the individual [field](/cloud/confluence/advanced-searching-using-cql#field-reference) reference.

### Examples

-   Find all content created on or after 31/12/2008:

    ``` bash
    created >= "2008/12/31"
    ```

## LESS THAN

The "`<`" operator is used to search for content where the value of the specified field is less than the specified value. Cannot be used with [text](/cloud/confluence/advanced-searching-using-cql#text) fields.

The "`<`" operator can only be used with fields which support range operators (e.g. date fields). To see a field's supported operators, check the individual [field](/cloud/confluence/advanced-searching-using-cql#field-reference) reference.

### Examples

-   Find all pages lastModified before the start of the year

    ``` bash
    lastModified < startOfYear() and type = page
    ```

## LESS THAN EQUALS

The "`<=`" operator is used to search for content where the value of the specified field is less than or equal to than the specified value. Cannot be used with [text](/cloud/confluence/advanced-searching-using-cql#text) fields.

The "`<=`" operator can only be used with fields which support range operators (e.g. date fields). To see a field's supported operators, check the individual [field](/cloud/confluence/advanced-searching-using-cql#field-reference) reference.

### Examples

-   Find blogposts created in the since the start of the fortnight

    ``` bash
    created >= startOfWeek("-1w") and type = blogpost
    ```

## IN

The "`IN`" operator is used to search for content where the value of the specified field is one of multiple specified values. The values are specified as a comma-delimited list, surrounded by parentheses.

Using "`IN`" is equivalent to using multiple `EQUALS (=)` statements with the OR keyword, but is shorter and more convenient. That is, typing `creator IN (tom, jane, harry)` is the same as typing `creator = "tom" OR creator = "jane" OR creator = "harry"`.

### Examples

-   Find all content that mentions either jsmith or jbrown or jjones:

    ``` bash
    mention in (jsmith,jbrown,jjones)
    ```

-   Find all content where the creator or contributor is either Jack or Jill:

    ``` bash
    creator in (Jack,Jill) or contributor in (Jack,Jill)
    ```

## NOT IN

The "`NOT IN`" operator is used to search for content where the value of the specified field is not one of multiple specified values.

Using "`NOT IN`" is equivalent to using multiple `NOT_EQUALS (!=)` statements, but is shorter and more convenient. That is, typing `creator NOT IN (tom, jane, harry)` is the same as typing `creator != "tom" AND creator != "jane" AND creator != "harry"`.

### Examples

-   Find all content where the creator is someone other than Jack, Jill or John:

    ``` bash
    space = DEV and creator not in (Jack,Jill,John)
    ```

## CONTAINS

The "`~`" operator is used to search for content where the value of the specified field matches the specified value (either an exact match or a "fuzzy" match -- see examples below). The "~" operator can only be used with text fields, for example:

-   title
-   text

{{% note %}}When using the "`~`" operator, the value on the right-hand side of the operator can be specified using [Confluence text-search syntax](/cloud/confluence/performing-text-searches-using-cql).{{% /note %}}

### Examples

-   Find all content where the title contains the word "win" (or simple derivatives of that word, such as "wins"):

    ``` bash
    title ~ win
    ```

-   Find all content where the title contains a wild-card match for the word "win":

    ``` bash
    title ~ "win*"
    ```

-   Find all content where the text contains the word "advanced" and the word "search":

    ``` bash
    text ~ "advanced search"
    ```

## DOES NOT CONTAIN

The "`!~`" operator is used to search for content where the value of the specified field is not a "fuzzy" match for the specified value. The "!~" operator can only be used with text fields, for example:

-   title
-   text

{{% note %}}When using the "`!~`" operator, the value on the right-hand side of the operator can be specified using [Confluence text-search syntax](/cloud/confluence/performing-text-searches-using-cql).{{% /note %}}

### Examples

-   Find all content where the title does not contain the word "run" (or derivatives of that word, such as "running" or "ran"):

    ``` bash
    space = DEV and title !~ run
    ```