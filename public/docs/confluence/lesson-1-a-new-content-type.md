---
title: "Lesson 1 - A new content type"
platform: cloud
product: confcloud
category: devguide
subcategory: learning
guides: tutorials
date: "2017-02-27"
aliases:
- confcloud/lesson-1-a-new-content-type-40511958.html
- /confcloud/lesson-1-a-new-content-type-40511958.md
dac_edit_link: https://developer.atlassian.com/pages/editpage.action?cjm=wozere&pageId=40511958
dac_view_link: https://developer.atlassian.com/pages/viewpage.action?cjm=wozere&pageId=40511958
confluence_id: 40511958
---
# Lesson 1 - A new content type

<table>
<colgroup>
<col width="50%" />
<col width="50%" />
</colgroup>
<tbody>
<tr class="odd">
<td><strong>Description</strong></td>
<td>Set up a new &quot;Customer&quot; content type</td>
</tr>
<tr class="even">
<td><strong>Level</strong></td>
<td><div class="content-wrapper">
<p>3 - INTERMEDIATE</p>
</div></td>
</tr>
<tr class="odd">
<td><strong>Estimated time</strong></td>
<td>10 minutes</td>
</tr>
<tr class="even">
<td><strong>Example</strong></td>
<td><a href="https://bitbucket.org/atlassianlabs/confluence-custom-content-example" class="uri" class="external-link">https://bitbucket.org/atlassianlabs/confluence-custom-content-example</a></td>
</tr>
</tbody>
</table>

## Prerequisites

Ensure you have installed all the tools you need for Confluence Connect add-on development, and running Confluence by going through the [Development setup](/cloud/confluence/development-setup).

## Information in Confluence

Confluence comes packaged with a powerful information hierarchy. Through the option of using Spaces, Pages, Attachments and Comments by default, simple entities can be used to garner an information architecture tailored to your needs. But, what if you wanted to introduce a new type of content? Say, for example, you wanted to provide a service that allowed users to create diagrams. Wouldn't it be ideal to surface this content as a seemingly native content type?

Enter, custom content!

Custom content allows you to introduce content types which integrate tightly with Confluence features like search and navigation, in addition to having the API capabilities of default Confluence content. In this tutorial, we'll be going through the process of setting up two simple custom content types, with one contained within the other.

## Customer management

Let's introduce a content type called 'Customers' contained inside Spaces. The aim of introducing this content will be to make it easier for us to keep track of customer information in Confluence. 

First, the custom content module needs to be added to our **atlassian-connect.json** plugin descriptor. Let's add a basic 'Customer' custom content type, here.

``` javascript
"customContent": [
  {
    "key": "customer",
    "name": {
      "value": "Customers"
    },
    "uiSupport": {
      "contentViewComponent": {
        "moduleKey": "customersViewer"
      },
      "listViewComponent": {
        "moduleKey": "customerList"
       },
      "icons": {
        "item": {
          "url": "/images/customers.png"
        }
      }
    },
    "apiSupport": {
      "supportedContainerTypes": [
        "space"
      ]
    }
  }
]
```

What do all these things mean? Let's take a look:

-   **key:**
    One of the most important things to keep in mind while building a new Confluence content type, is that Confluence understands our content type is named **"ac:&lt;your-add-on-key&gt;:&lt;your-custom-content-key&gt;**". So, in this case, assuming our add-on has a key of **"custom-content-example"**, we've declared a content type named **"ac:custom-content-example:customer"**.
     
-   **uiSupport:** 
    Here, our add-on defines the three UI components we need to integrate our custom content type into Confluence.
    -   **contentViewComponent:** 
        By default, if a custom content type is registered to be contained within Spaces, a link is exposed in the Confluence Sidebar to view all content of this type. For example, in the context of our normal Confluence world, we see a link to 'Pages' and 'Blogs' in the sidebar. The view for this is entirely up to us in the domain of custom content. You can treat this as the landing page to your 'content hub'! 
        We leave this as an exercise for the reader.
        Keep in mind, this component also determines how *individual* pieces of content of our custom content type are displayed. To handle the display of our content hub and content instance elegantly, we can use [context parameters], and handle both cases accordingly. In the snippet above, the moduleKey "**customersViewer"** maps to a generalPage module we have defined in our add-on. This generalPage is passed the context parameters we specify, and visualizes our content accordingly.
         
    -   **listViewComponent: **
        This component defines how a single piece of custom content will look when rendered in native Confluence list contexts.
    -   **icon:** 
        This icon is used as the default icon provided when rendering a sidebar link to our content hub. Ideally please provide an icon that is at least 24x24 pixels.
-   **apiSupport:** 
    Here, we create the associations we need with current content types registered in Confluence. This way, the Confluence API knows what our custom content types need to declare when being created, read, updated, or deleted. By setting the **supportedContainerTypes** of our custom content, Confluence is made aware of content types 'customers' can be created under. Later, we will see how **supportedChildTypes **is used.

Awesome! You've just registered your first Confluence custom content type. Let's keep the momentum going and power through to the [next lesson](/cloud/confluence/lesson-2-adding-content-customers-ahoy).

