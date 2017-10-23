---
title: Blueprints
platform: cloud
product: confcloud
category: devguide
subcategory: learning
pattern: patterns
date: "2016-09-16"
aliases:
- confcloud/blueprints-39985061.html
- /confcloud/blueprints-39985061.md
confluence_id: 39985061
dac_edit_link: https://developer.atlassian.com/pages/editpage.action?cjm=wozere&pageId=39985061
dac_view_link: https://developer.atlassian.com/pages/viewpage.action?cjm=wozere&pageId=39985061
---
# Blueprints

![insert menu](/cloud/confluence/images/blueprints.png)

## What are blueprints?

Confluence blueprints give users a way to create pages based on pre-defined content. Users can select from available blueprints in the **Create** dialog, and as an add-on developer you can add your own blueprints to this dialog. Basic blueprints create pages from static templates, while more advanced ones create dynamic content from templates that have variable placeholders that are loaded with data from your add-on.

## What can I build with blueprints?

### New content with a macro

If your add-on provides a macro, an obvious use of a blueprint is to create a new page with an instance of it (as described in the macro pattern). This is a great way of increasing visibility for any macros that are part of your add-on.

### Pages with instructions for the user

Blueprints allow you to create temporary placeholder text for users to replace with their own content. This can be helpful in guiding users when creating standardized pages with dynamic content.

### Multiple pages

Using Confluence's REST APIs, you can turn the creation of one page from a blueprint into the creation of a series of pages. This is useful for "packs" like:

-   Employee on-boarding packs
-   Competitive analysis packs

## How do I build blueprints?

### Create a static blueprint

The simplest form of a blueprint is one which provides content to Confluence from the add-on. Confluence stores this content which is used to create new pages.

### Dynamically replace content when a page is created (optional)

You might need to generate or replace content with your add-on when a page is created from your blueprint. This can be done by including variables in your original static template and providing content for the variables when the page is created.

## What other patterns might be helpful?

### Macros

Macros are a relevant pattern if your add-on is implementing a "macro creation blueprint" as discussed above.

## Let's do this!

Get going by following our [Creating a multi-page blueprint tutorial](/cloud/confluence/multi-page-blueprints-with-confluence-connect/) and referring to related documentation listed on the right hand side of this page.

### Related add-on categories

-   Diagramming
-   Integrations
-   [Macros](/cloud/confluence/macros)

### Related Connect modules

-   [Blueprint module](/cloud/confluence/modules/blueprint/)

### Related REST APIs

-   [Create Instance from Blueprint/template](https://docs.atlassian.com/atlassian-confluence/REST/latest/#template-createInstance)

### Related documentation

-   [Creating a multi-page blueprint tutorial](/cloud/confluence/multi-page-blueprints-with-confluence-connect/)