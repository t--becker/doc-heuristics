---
title: "Page extensions"
platform: cloud
product: confcloud
category: devguide
subcategory: learning
patterns: patterns
date: "2016-11-11"
aliases:
- confcloud/page-extensions-39985058.html
- /confcloud/page-extensions-39985058.md
dac_edit_link: https://developer.atlassian.com/pages/editpage.action?cjm=wozere&pageId=39985058
dac_view_link: https://developer.atlassian.com/pages/viewpage.action?cjm=wozere&pageId=39985058
confluence_id: 39985058
---

# Page extensions

![page extensions](/cloud/confluence/images/image2016-4-21-22-7-42.png)

## What are page extensions?

Page extensions allow your add-on to define context and actions that add value to content for users. You might want to show important information related to a page, implement a custom workflow, or provide custom actions for users to launch from the More Actions menu.

## What can I build with page extensions?

Below are some possible add-ons that can be built with the page extensions pattern.

### Metadata workflows

Workflows can be used to put additional controls on when content is ready for consumption or stakeholder approval. They can also otherwise integrate content into organizational processes related to the content being created. For example, this may be an approval or review process specific to your needs. 

Workflows are often based on metadata relating to the current status of a page. For example, if a page is awaiting stakeholder approval it may be marked as 'Under Progress' or 'In Review'. By displaying this information as a byline extension, users are able to transition through custom workflows in a quick and unobtrusive way.

Examples include:

-   Basic page workflows
-   Document signing

### Related content

When consuming content, insights are key. As a user interacts with content, add-ons can add value to the user by recommending which other pages in Confluence cover related material in order to harness organizational knowledge. Content available on the internet or other specialized sources can also bring new knowledge into the organization. With page extensions, exposing such functionality through an add-on service becomes quick and easy.

Examples include:

-   Content related to the current page
-   External data related to the current page

### Exporters

Extending Confluence to include advanced export functionality allows users to collaborate with stakeholders and systems in other formats. This can be of primary importance when shifting between Confluence and common content creation and management services.

Taking users through this process of exporting Confluence content to different formats should be a convenient experience. By using page extensions which expose these services from the More Actions menu, the friction users face when shifting between consuming and exporting content is largely reduced.

Examples include:

-   Export to XML markup
-   Export to PDF

## How do I build a page extension?

The main elements you need to build a page extension are:

### Content byline

Located underneath the page title, content byline extensions provide meaningful content to users in an unobtrusive manner. They can be used to address the following questions when coming to a page in Confluence:

-   What has happened to this page?
-   Who else is viewing and interested in this page?
-   Where is this page in terms of workflow transitions?

Typically, an inline dialog experience is an optimal choice when building byline extensions.

### More Actions menu

Found at the top right of every Confluence page, the **More Actions menu** ![ellipsis](/cloud/confluence/images/ellipsis.png) is one of the most frequented locations in Confluence. Extending the More Actions menu addresses the following concerns:

-   What actions can I perform within this page?
-   What actions can I perform external to, but related to this page?

Providing an entry point to your add-on service through a menu item is optimal from a user awareness perspective. This item can be used to redirect users to an in-context dialog experience, or out-of-context full screen dialog experience (detailed more below).

### Custom dialog

Through Confluence Connect JavaScript APIs, the **More Actions menu** items can be used to direct users to a focused add-on experience. Add-ons can provide fully immersive environments by triggering custom dialogs which appear within a page or as a full screen experience. This lets users seamlessly shift between Confluence and other dedicated services.

## What other patterns might be helpful?

### Custom content

Specialized data that is related to pages. 

## Let's do this!

Get going by following our [Getting started tutorial](/cloud/confluence/getting-started) and referring to related documentation listed on the right hand side of this page. 

### Related design guidelines

-   [Enhancing page metadata](/cloud/confluence/enhancing-page-metadata)
-   [Extending page actions](/cloud/confluence/extending-page-actions)

### Related Connect modules

-   [Byline items](/cloud/confluence/modules/content-byline-item/)
-   [Web items](/cloud/confluence/modules/web-item/)

### Related documentation

-   [Creating a byline item page extension](/cloud/confluence/content-byline-items-with-confluence-connect/)
