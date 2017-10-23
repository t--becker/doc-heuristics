---
title: "Interacting with macros in view mode"
platform: cloud
product: confcloud
category: devguide
subcategory: learning
patterns: patterns
date: "2016-05-17"
aliases:
- confcloud/interacting-with-macros-in-view-mode-39987923.html
- /confcloud/interacting-with-macros-in-view-mode-39987923.md
dac_edit_link: https://developer.atlassian.com/pages/editpage.action?cjm=wozere&pageId=39987923
dac_view_link: https://developer.atlassian.com/pages/viewpage.action?cjm=wozere&pageId=39987923
confluence_id: 39987923
---
# Interacting with macros in view mode

## Graphic elements required

-   A toolbar that appears when content is hovered over. This should be consistent with the example shown below.

-   Icons or text labels for each available action. Icons should use a 1px white outline line style at 16x16 pixels.

![new toolbar](/cloud/confluence/images/new-toolbar.png)


## Interacting with add-on content while in view mode

The toolbar lets you surface key features for users interacting with add-on content in the view mode. We recommend having the toolbar appear when your add-on content is hovered over.

## UI components

-   Connect doesn't provide APIs that you can reuse, but we recommend designing your toolbar to the specifications provided above. 

## Recommendations

-   Limit the actions on your toolbar to a maximum of 4.

-   Use icons instead of text when possible, to minimize the toolbar width.

-   Your toolbar should always fit into your add-on container. This means that the minimum width that your container can be resized to should be at least the width of the toolbar.