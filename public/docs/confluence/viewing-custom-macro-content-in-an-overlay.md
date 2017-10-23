---
title: "Viewing custom macro content in an overlay"
platform: cloud
product: confcloud
category: devguide
subcategory: learning
patterns: patterns
date: "2016-05-17"
aliases:
- confcloud/viewing-custom-macro-content-in-an-overlay-39986941.html
- /confcloud/viewing-custom-macro-content-in-an-overlay-39986941.md
dac_edit_link: https://developer.atlassian.com/pages/editpage.action?cjm=wozere&pageId=39986941
dac_view_link: https://developer.atlassian.com/pages/viewpage.action?cjm=wozere&pageId=39986941
confluence_id: 39986941
---
# Viewing custom macro content in an overlay

In the overlay mode, users can view macro content in detail and perform further actions using the toolbar. This page will help you design a consistent full-screen overlay for custom macro content. 

## Graphic elements required

There are no specific assets required for previewing custom macro content, but you should ensure that the toolbars displayed within the iframe are consistent with the example shown below. The toolbar isn't provided by Connect.

If you're representing actions with icons, use a 1px white outline line style at 16x16 pixels.

![new toolbar](/cloud/confluence/images/new-toolbar.png)

*Design specification for the toolbar*

## Accessing the preview

Users should be able to access the overlay in either of the following ways:

-   Clicking on a button in your toolbar that appears when they hover over your add-on content
-   Clicking on the add-on content

![on-hover toolbar](/cloud/confluence/images/onhover-toolbar.gif)

## UI components

*Toolbar on mouse-over on your add-on content rendered in an iframe*

![preview toolbar](/cloud/confluence/images/preview-toolbar.png)

*Full screen dialog* (You'll need to [define your dialog](/cloud/confluence/modules/dialog/) and use the [Javascript API](/cloud/confluence/jsapi/dialog/) to launch it.)

![preview fullscreen](/cloud/confluence/images/preview-fullscreen.png)

## Recommendations

-   Have no more than 4 actions for users to take from the toolbar.
-   Use the full screen overlay to show more features of your product.
