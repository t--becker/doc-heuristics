---
title: "Editing macro content in full screen"
platform: cloud
product: confcloud
category: devguide
subcategory: learning
patterns: patterns
date: "2016-11-11"
aliases:
- confcloud/editing-macro-content-in-full-screen-39987010.html
- /confcloud/editing-macro-content-in-full-screen-39987010.md
confluence_id: 39987010
dac_edit_link: https://developer.atlassian.com/pages/editpage.action?cjm=wozere&pageId=39987010
dac_view_link: https://developer.atlassian.com/pages/viewpage.action?cjm=wozere&pageId=39987010
---

# Editing macro content in full screen

If your macro integrates an existing SaaS product with a fully-fledged user interface, you can use the full screen dialog to bring your product interface into Confluence. The chrome on the full screen dialog appears as a black header, and maintains the context for the user of being inside Confluence. It also ensures users have a consistent path back to the main Confluence UI.

![editing macro content in full screen](/cloud/confluence/images/immersive-mode-3.gif)

## UI components

*Full screen dialog*

![full screen view](/cloud/confluence/images/fullscreen-view.png)

## Recommendations 

**Do:** 

-   Design an 'Open in' action to allow the user to access the full screen dialog.
-   Use "Back" or "Back to Confluence" to allow users to return to Confluence.
-   Follow a design style involving white outline and a pixel width stroke. 

**Don't:** 

-   Use labels like "Exit", "Close", "Save and Close", as they may confuse users and conflict with parts of the Confluence UI.
-   Provide on-boarding for users during editing. If you need to provide on-boarding, do it when users are inserting your macro.