---
title: "Editing macro properties"
platform: cloud
product: confcloud
category: devguide
subcategory: learning
patterns: patterns
date: "2016-05-17"
aliases:
- confcloud/editing-macro-properties-39986992.html
- /confcloud/editing-macro-properties-39986992.md

dac_edit_link: https://developer.atlassian.com/pages/editpage.action?cjm=wozere&pageId=39986992
dac_view_link: https://developer.atlassian.com/pages/viewpage.action?cjm=wozere&pageId=39986992
confluence_id: 39986992
---
# Editing macro properties

## Graphic elements required

-   A brand icon for the macro placeholder. For best results, provide a square image that's at least 80x80 pixels.
-   Optionally, you can provide an [image placeholder](/cloud/confluence/modules/image-placeholder/) to represent what the content will look like in the editor (if you don't provide one, your brand icon is shown).

## How do users edit your macro's properties?

When a user adds your macro to the page, or edits a page with the macro already added, they'll click the macro placeholder (shown in the image below) to see the macro properties panel. They can also double-click the macro placeholder to bypass the macro properties panel and go straight to the macro properties dialog.

## UI components

*Macro properties panel*

![property panel](/cloud/confluence/images/property-panel.png)

*Macro properties dialog*

![macro property dialog](/cloud/confluence/images/macro-property-dialog.png)

## Recommendation

-   Provide quick actions for editing your macro's content in the macro properties panel. This is for editing commonly-used macro parameters, like iframe size, deleting the content, and a button to go to the macro properties dialog for more involved editing and previewing the content.
-   Use the macro properties dialog for more involved or comprehensive editing of macro content. Some examples are entering a data source or URL, and filtering and sorting options.