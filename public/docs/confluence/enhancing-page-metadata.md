---
title: "Enhancing page metadata"
platform: cloud
product: confcloud
category: devguide
subcategory: learning
patterns: patterns
date: "2016-05-17"
aliases:
- confcloud/enhancing-page-metadata-39988127.html
- /confcloud/enhancing-page-metadata-39988127.md
dac_edit_link: https://developer.atlassian.com/pages/editpage.action?cjm=wozere&pageId=39988127
dac_view_link: https://developer.atlassian.com/pages/viewpage.action?cjm=wozere&pageId=39988127
confluence_id: 39988127
---

# Enhancing page metadata

## Graphic elements required

-   16x16 brand or add-on icon to be displayed in the byline along with the text.

## How do users find metadata?

The byline extension lets add-ons provide users with further information about a page's metadata.

## How should the interaction work?

-   Users can find basic metadata in the byline, below the page title.
-   If they then click on the add-on icon or insight text, an inline dialog will show further information or actions related to the add-on.
-   The **View more... **button lets** **add-ons take the user to a dedicated view to see additional details or complete related actions.

## UI components

[Web items](/cloud/confluence/modules/web-item/), inline dialogs, and modal dialogs can be used to build byline extensions.

![byline extension](/cloud/confluence/images/byline-extension.png)

##  Recommendation

-   Use progressive disclosure in surfacing the metadata. 
