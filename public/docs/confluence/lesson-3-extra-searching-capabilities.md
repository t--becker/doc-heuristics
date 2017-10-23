---
title: "Lesson 3 - Extra searching capabilities"
platform: cloud
product: confcloud
category: devguide
subcategory: learning
guides: tutorials
date: "2016-07-20"
aliases:
- confcloud/lesson-3-extra-searching-capabilities-40511960.html
- /confcloud/lesson-3-extra-searching-capabilities-40511960.md
dac_edit_link: https://developer.atlassian.com/pages/editpage.action?cjm=wozere&pageId=40511960
dac_view_link: https://developer.atlassian.com/pages/viewpage.action?cjm=wozere&pageId=40511960
confluence_id: 40511960
---

# Lesson 3 - Extra searching capabilities

<table>
<colgroup>
<col width="50%" />
<col width="50%" />
</colgroup>
<tbody>
<tr class="odd">
<td><strong>Description</strong></td>
<td>Add extra searching capabilities to our Customer content type</td>
</tr>
<tr class="even">
<td><strong>Level</strong></td>
<td><div class="content-wrapper">
<p>3 - INTERMEDIATE</p>
</div></td>
</tr>
<tr class="odd">
<td><strong>Estimated time</strong></td>
<td>15 minutes</td>
</tr>
<tr class="even">
<td><strong>Example</strong></td>
<td><a href="https://bitbucket.org/atlassianlabs/confluence-custom-content-example" class="uri" class="external-link">https://bitbucket.org/atlassianlabs/confluence-custom-content-example</a></td>
</tr>
</tbody>
</table>

## Prerequisites

Ensure you have worked through [Lesson 2 - Adding Content - Customers Ahoy](/cloud/confluence/lesson-2-adding-content-customers-ahoy) in the Custom content series.

## Search integration

Up till this point, we have worked on allowing our simple system to create new customers. Let's now leverage the strong integration custom content types have with Confluence search so that we can find our customers easily!

This can be done in a very convenient way. We tell Confluence to index our custom content by declaring the **indexing.enabled** property in descriptor. 

``` javascript
{
  "uiSupport": {
    "contentViewComponent": {
      "moduleKey": "customersViewer"
    },
    "listViewComponent" : {
      "moduleKey": "customersViewer"
    },
    "icons": {
      "item": {
        "url": "/images/conversations.png"
      }
    }
  },
  "apiSupport": {
    "supportedContainerTypes": [
      "space"
    ],
    "supportedChildTypes" : [
      "ac:confluence-custom-content-example:note"
    ],
    "indexing" : {
      "enabled" : true
    }
  },
  "name": {
    "value": "Customers"
  },
  "key": "customers"
}
```

By setting this property to true, Confluence will index the title and body of a piece of custom content.

Let's have a look and see if it works. Suppose we have added a customer like following:

![view custom content](/cloud/confluence/images/image2016-7-20-22-8-20.png)


Searching for 'NASA' yields the following:

![search for NASA](/cloud/confluence/images/image2016-7-20-22-8-46.png)


Voila! The search is working without any extra configuration.

## Custom text in search results

We can go one step further and supply excerpt text in our search results. This will make our search result a bit more specific and useful.

The magic happens in a content property called **'ac:custom-content:search-body'**, where you can store a short description for a piece of custom content. The value of this content property will be displayed in search result. You can create a new content property after a piece of Customer content is created. An alternative way of creating content property is via the metadata field in the content POST request. Please refer to [Create Content REST API](https://docs.atlassian.com/atlassian-confluence/REST/latest/#content-createContent) for more information.

For the purposes of this tutorial, we use the Customer description as excerpt text - as shown below. 

``` javascript
// Store content excerpt to ac:custom-content:search-body.
// We assume all required details are stored in a JSON object, 'data'.
request({
  url: "/rest/api/content/" + customer.id + "/property",
  type: "POST",
  contentType: "application/json",
  data: JSON.stringify({
    "key" : "ac:custom-content:search-body",
    "value": data.description
  }),
  success: function(response){
    //...
  },
  error: function(err){
    //...
  }
});
```

Now the description of new customer is showing in the search result. Nice and easy!

![new customer description showing](/cloud/confluence/images/image2016-7-20-17-51-52.png)

![Tesla description showing](/cloud/confluence/images/image2016-7-20-17-51-31.png)


Further more, your customized excerpt text is now indexed by Confluence as well. Users are able to find their content more quickly and easily.

What's next? Head over to [Lesson 4 - Noting Down Information](/cloud/confluence/lesson-4-noting-down-information). We will build a nested content type! 
 