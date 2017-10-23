---
title: "About Confluence Cloud"
platform: cloud
product: confcloud
category: devguide
subcategory: intro
date: "2016-05-18"
aliases:
- confcloud/39985284.html
- /confcloud/39985284.md
confluence_id: 39985284
dac_edit_link: https://developer.atlassian.com/pages/editpage.action?cjm=wozere&pageId=39985284
dac_view_link: https://developer.atlassian.com/pages/viewpage.action?cjm=wozere&pageId=39985284
---
# About Confluence Cloud

Confluence Connect is a platform built on top of the Atlassian Connect Framework that allows you to build add-ons for Confluence. An add-on can be an integration with another existing service, an extension of a Confluence feature, or even a new application running within Confluence.

Confluence Connect add-ons are web applications that integrate with the Confluence web application, both at the programmatic and user experience level. They operate remotely over HTTP and can be written with any programming language and web framework, like Node.js, Java and Ruby.

Connect add-ons can be hosted in a micro-service platform accessible to Confluence Cloud. They're registered with Confluence and describe how they extend Confluence in a JSON file called a "descriptor".

## What can Confluence add-ons do?

Here are some common capabilities of Confluence Connect add-ons, and some specific examples:

<table>
<colgroup>
<col width="50%" />
<col width="50%" />
</colgroup>
<thead>
<tr class="header">
<th>Capability</th>
<th>Confluence Example</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Insert content in certain defined places in the Confluence application's UI.</td>
<td>A Confluence content macro is rendered inside an iframe with the experience provided by the add-on.</td>
</tr>
<tr class="even">
<td><p>Make calls to the Atlassian application's <a href="/cloud/confluence/about-confluence-cloud-rest-api">REST API</a>.</p></td>
<td>A Confluence page extension that exports a page and uses the REST API to get the content of the current page.</td>
</tr>
<tr class="odd">
<td>Listen and respond to direct calls from Confluence or <a href="/cloud/confluence/modules/webhook">Webhooks</a> fired by the Atlassian application.</td>
<td>A Confluence blueprint add-on is called over HTTP to provide content to be used as the template for new pages.</td>
</tr>
</tbody>
</table>

## Where to from here?

-   Find out [what you can build with Confluence Connect](/cloud/confluence/integrating-with-confluence-cloud).
-   See which [Confluence Connect patterns](/cloud/confluence/confluence-connect-patterns) are available.
-   Dive in with the [Getting started tutorial](/cloud/confluence/getting-started).
