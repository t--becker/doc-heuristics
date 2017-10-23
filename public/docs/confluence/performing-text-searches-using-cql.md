---
title: "Performing text searches using CQL"
platform: cloud
product: confcloud
category: reference
subcategory: cql
date: "2016-11-21"
aliases:
- confcloud/performing-text-searches-using-cql-39985876.html
- /confcloud/performing-text-searches-using-cql-39985876.md
dac_edit_link: https://developer.atlassian.com/pages/editpage.action?cjm=wozere&pageId=39985876
dac_view_link: https://developer.atlassian.com/pages/viewpage.action?cjm=wozere&pageId=39985876
confluence_id: 39985876
---

# Performing text searches using CQL

This page provides information on how to perform text searches. It applies to [advanced searches](/cloud/confluence/advanced-searching-using-cql) when used with the [CONTAINS](/cloud/confluence/advanced-searching-using-cql#contains) operator.

{{% tip %}}**Acknowledgments:** Confluence uses Apache Lucene for text indexing, which provides a rich query language. Much of the information on this page is derived from the [Query Parser Syntax](http://lucene.apache.org/core/4_4_0/queryparser/org/apache/lucene/queryparser/classic/package-summary.html#Term_Modifiers) page of the Lucene documentation.{{% /tip %}}

## Query terms

A query is broken up into **terms** and **operators.** There are two types of terms: **Single Terms** and **Phrases.**

A **Single Term** is a single word such as "`test`" or "`hello`".

A **Phrase** is a group of words surrounded by double quotes such as "`hello dolly`".

{{% note %}}All query terms in Confluence are case insensitive.{{% /note %}}

## Term modifiers

Confluence supports modifying query terms to provide a wide range of searching options.

[Wildcard searches: ? and \*](#wildcard-searches-and) | [Fuzzy searches: ~](#fuzzy-searches)

### Wildcard searches: ? and \*

Confluence supports single and multiple character wildcard searches.

To perform a single character wildcard search use the "`?`" symbol.

To perform a multiple character wildcard search use the "`*`" symbol.

{{% note %}}Wildcard characters need to be enclosed in quote-marks, as they are reserved [characters in advanced search](/cloud/confluence/advanced-searching-using-cql). Use quotations, e.g. `summary ~ "cha?k and che*"`.{{% /note %}}

The single character wildcard search looks for terms that match that with the single character replaced. For example, to search for "`text`" or "`test`" you can use the search:

``` bash
te?t
```

Multiple character wildcard searches looks for 0 or more characters. For example, to search for `Windows`, `Win95` or `WindowsNT` you can use the search:

``` bash
win*
```

You can also use the wildcard searches in the middle of a term. For example, to search for `Win95` or `Windows95` you can use the search

``` bash
wi*95
```

You cannot use a \* or ? symbol as the first character of a search. The feature request for this is [JRA-6218](https://jira.atlassian.com/browse/JRA-6218).

### Fuzzy searches

Confluence supports fuzzy searches. To do a fuzzy search use the tilde, (~), symbol at the end of a single word term. For example to search for a term similar in spelling to "`roam`" use the fuzzy search:

``` bash
roam~
```

This search will find terms like foam and roams.

{{% note %}}Terms found by the fuzzy search will automatically get a boost factor of 0.2.{{% /note %}}

#### Related topics

-   [Advanced Searching using CQL](/cloud/confluence/advanced-searching-using-cql)

