---
title: "Display custom content in attachments"
platform: cloud
product: confcloud
category: devguide
subcategory: learning
patterns: patterns
date: "2016-11-11"
aliases:
- confcloud/handling-page-attachments-39988795.html
- /confcloud/handling-page-attachments-39988795.md
confluence_id: 39988795
dac_edit_link: https://developer.atlassian.com/pages/editpage.action?cjm=wozere&pageId=39988795
dac_view_link: https://developer.atlassian.com/pages/viewpage.action?cjm=wozere&pageId=39988795
---

# Display custom content in attachments

## Graphic elements required

An icon of your content type with the following specs:

-   16x16px in size, optimized for retina display
-   Transparent background
-   Line weight of 1px for icon graphics
-   Color `#707070` only

## How do users interact with attachments?

Users can find all the attachments on a page by clicking the ![ellipsis](/cloud/confluence/images/ellipsis.png) on the top right hand of a page &gt; **Attachments**. All the files attached to a page will appear here in a table, with different tabs for each type of custom content.

## UI components

As each type of custom content is automatically sectioned into separate tabs, you can also use this to add in actions that are specific to your type of custom content.

![attachments](/cloud/confluence/images/attachments.png)

## Recommendations

-   Use the [table design guidelines](https://design.atlassian.com/product/components/tables/).

