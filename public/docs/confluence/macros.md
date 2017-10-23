---
title: "Macros" 
platform: cloud
product: confcloud
category: devguide
subcategory: learning
patterns: patterns
date: "2016-05-13"
aliases:
- confcloud/macros-39984560.html
- /confcloud/macros-39984560.md
dac_edit_link: https://developer.atlassian.com/pages/editpage.action?cjm=wozere&pageId=39984560
dac_view_link: https://developer.atlassian.com/pages/viewpage.action?cjm=wozere&pageId=39984560
confluence_id: 39984560
---
# Macros

![macros](/cloud/confluence/images/image2016-4-21-20-38-34.png)

## What are macros?

Macros provide dynamic content inside Confluence pages at the point where the macro is positioned. Users can insert macros into content when editing and can select from both default macros provided by Confluence and macros provided by your add-on.

## What can I build with macros?

You can use macros to build the following types of add-ons:

### Integrations

Macros can enable you to integrate with other systems, either owned by you or by accessing the public API of a known service. Your macro may integrate aspects of the service's experience within a Confluence page, or create an experience that accesses the service's API.

Examples include integration with:

-   An external diagramming service to display and edit diagrams
-   An external HR system to display candidate details
-   A social media API to display related activity

### Specialized content

You can use macros to create content that meets a specialized use case. This could be content that's difficult or impossible for users to create using default types of content available in the Confluence editor.

Examples include:

-   Adding specialized mathematical symbols and equations
-   Composing diagrams that are stored as attachments
-   Displaying a software roadmap with an editor for adding and editing colored bars

### Composed content

Macros can display content contained within the macro itself, known as the 'macro body'. For example, the chart macro that's built in to Confluence uses data in a table in the macro body to display a chart. Confluence renders the macro as a container in the editor, which users can add data to that the macro will display.

Examples include:

-   Displaying a chart based on data in a contained table
-   Displaying a carousel of images in the macro body
-   Hiding and showing contained content using a toggle (as in the Confluence expand macro)

## How do I build macros?

The main elements you need to build for a macro are:

### Macro view

Macros need to render within pages in order to be viewed. This is an easy first step to take after defining your macro following the getting started guide or the technical documentation.

### Macro create

When creating your macro you need to decide between a dynamic macro and a static macro. Dynamic macros are rendered asynchronously within an iframe. Static macros are rendered synchronously. 

{{% note %}}We recommend dynamic macros by default, as they don't negatively impact page load time for users.{{% /note %}} 

When your macro is defined, default Confluence features will allow users to create instances of your macro on a page using the macro browser and related keyboard shortcuts.

If you are integrating an external service with a unique URL pattern, you may want to consider implementing an autoconvert extension also which dynamically matches the URL when pasting and converts it to a macro instance.

### Macro edit

When users add your macro to a page, there are three ways they can edit and specify properties for it:

-   **Default editor based on macro properties** - Confluence will display the standard [macro properties](/cloud/confluence/editing-macro-properties) dialog, which allows users to specify values for your macro's properties. This is the quickest approach.
-   **Custom macro editor** - You design the experience for editing your macro's properties based on our [design guidelines](/cloud/confluence/editing-macro-properties).
-   **Full screen designer** - Useful when a full screen experience is required for complex tasks, like diagram editing. Take a look at our design guidelines for [previewing](/cloud/confluence/viewing-custom-macro-content-in-an-overlay) and [full screen editing](/cloud/confluence/editing-macro-content-in-full-screen).

The property panel can also be extended to provide a shortcut to changing macro properties.

## What other patterns might be helpful?

### Blueprints

You can create a page [blueprint](/cloud/confluence/blueprints) to complement your macro(s), as a shortcut to creating a new Confluence page. The page could have one or more instances of your macro on it, if it suits your macro's use case.

### Custom content

Page-level [custom content](/cloud/confluence/custom-content) can be a storage option for macros that store their data in Confluence, or as a way of creating a copy of an object stored in an external service. This leverages the benefit of integrating macros with Confluence search and navigation.

## Let's do this!

Get going by following our [Getting started tutorial](cloud/confluence/getting-started/) and referring to related documentation listed on the right hand side of this page.

### Related add-on categories

- Diagramming
- Reports & charts
- Integrations
- Project planning
- Documentation

### Related design guidelines

- [Adding macro content to a page](/cloud/confluence/adding-macro-content-to-a-page)
- [Viewing custom macro content in an overlay](/cloud/confluence/viewing-custom-macro-content-in-an-overlay)
- [Editing macro properties](/cloud/confluence/editing-macro-properties)
- [Editing macro content in full screen](/cloud/confluence/editing-macro-content-in-full-screen)

### Related Connect modules

-  [Dynamic Content Macro](/cloud/confluence/modules/dynamic-content-macro/)
-  [Static Content Macro](/cloud/confluence/modules/static-content-macro/)

### Related REST APIs

-  [Get macro body by hash](https://docs.atlassian.com/atlassian-confluence/REST/latest/#content-getMacroBodyByHash)
-  [Get macro body by id](https://docs.atlassian.com/atlassian-confluence/REST/latest/#content-getMacroBodyByMacroId)

### Related documentation

-   [Introduction to Confluence Connect](/cloud/confluence/introduction-to-confluence-connect)
 
