---
title: "Custom content"
platform: cloud
product: confcloud
category: devguide
subcategory: learning
patterns: patterns
date: "2016-11-11"
aliases:
- confcloud/custom-content-39985060.html
- /confcloud/custom-content-39985060.md
dac_edit_link: https://developer.atlassian.com/pages/editpage.action?cjm=wozere&pageId=39985060
dac_view_link: https://developer.atlassian.com/pages/viewpage.action?cjm=wozere&pageId=39985060
confluence_id: 39985060
---
# Custom content

![questions](/cloud/confluence/images/questions.png)

## What is custom content?

Confluence provides creation and collaboration features for different types of content. Pages and blogs, for example, are content types that are supported by default, while Confluence Questions is an example of an add-on that introduces questions and answers as new types of content that integrate with Confluence.

The custom content pattern describes how an add-on can achieve a similar outcome to Confluence Questions by introducing other types of content into Confluence. Just like with the default content types, add-on content can be created by one user and navigated to via spaces, search, or dashboard streams by other users.

Custom content is modeled within a container-ship hierarchy. In the case of Confluence Questions, questions "contain" answers. This is similar to the behavior of the default Confluence content types, where one content type, like blogs, can contain another, like comments. Custom content can contain both default content types, as well as those created by add-ons. For example, questions can contain answers, as well as comments and attachments.

To fit with the theme of 'custom' content and to provide a unique look and feel to users, Confluence Connect allows custom content types to provide dedicated view, create and edit experiences within Confluence.

## What can I build with custom content?

Custom content can be used for several purposes, including macro attachments, team calendars, and forms.

### Content solutions

These add-ons create specialized forms of content and provide dedicated view/create/edit experiences.

Examples include:

-   Confluence Questions
-   Team Calendars
-   Recruiting solutions (candidates, roles, etc)
-   CRM solutions (customers, communications, etc)
-   Forms (forms, responses, etc).

### Macro attachments

These add-ons combine custom content with the macro pattern. Instead of custom view/create/edit experiences, macros are used to view/create/edit new types of content as they are added to a page. Essentially, the macro lets users create custom content attached to a page, which they can manage through the attachments screen. Macros then allow references to this attached content to be embedded within the content body of a page

Examples include:

-   Embedded diagramming add-ons
-   Diagramming integration (using custom content as an index that integrates with search)

## How do I build custom content?

To start with, you will want to [define new custom content](/cloud/confluence/custom-content-with-confluence-connect/) in your Connect module descriptor, populate it via the REST API, and confirm you can search on that content.

### Definition and search integration

When defining custom content you need to consider whether your use case needs space level or page level content. Content solutions typically need space level content, while custom attachments for specialized macros typically need page level content.

{{% note %}} Custom content must represent real world content related concepts as they are displayed to users for navigation and search. Only define custom content that will be a meaningful concept to users and consider their name carefully and avoid appending technical terms such as *definition* or *configuration*.{{% /note %}}

### Custom content view

When navigating to the blogs or pages under a space, users are provided with an experience native to Confluence. Unlike these native types, when introducing custom content, an add-on must provide it's own custom user interface for this view. For example, in the case of Confluence Questions, an input field is provided for asking a new question, above a list of the current questions in the chosen space.

### Custom content list view

When viewing the different types of content under a page in Confluence, a default experience is provided for all content types, including custom content, under the attachments screen. Each type of custom content will be collated within a separate tab. Your add-on needs to provide a custom icon to be rendered under this view. If you choose to create a 'diagram' content type, all diagrams placed on a page would be viewable under attachments in the 'diagram' tab.

### Custom content creation 

Using custom dialogs and the page extensions pattern, you can easily guide users through an in-context or out-of-context, full screen content creation experience. In addition to this level of UI support, Confluence Connect provides API support for important content events such as 'create', 'update', 'trash', 'restore' or 'delete'. This allows your add-on service to perform these actions remotely through the Confluence API.

## What other patterns might be helpful?

### Macros

Macros are a relevant pattern if your add-on is implementing a specialized attachment style of custom content. See discussion on specialized attachments above.

## Let's do this!

Get going by following our [Custom content tutorial](/cloud/confluence/custom-content-with-confluence-connect) and referring to the related documentation listed on the right hand side of this page.

### Related Add-on categories

-   Integrations
-   Content solutions

### Related design guidelines

-   [Display custom content in search](/cloud/confluence/display-custom-content-in-search)
-   [Display custom content in attachments](/cloud/confluence/display-custom-content-in-attachments)
-   [Comments (ADG)](https://design.atlassian.com/product/patterns/comments/)

### Related Connect modules

-   [Custom content module](/cloud/confluence/custom-content-with-confluence-connect)


