---
title: "Lesson 4 - Noting down information"
platform: cloud
product: confcloud
category: devguide
subcategory: learning
guides: tutorials
date: "2016-07-20"
aliases:
- confcloud/lesson-4-noting-down-information-40511961.html
- /confcloud/lesson-4-noting-down-information-40511961.md
dac_edit_link: https://developer.atlassian.com/pages/editpage.action?cjm=wozere&pageId=40511961
dac_view_link: https://developer.atlassian.com/pages/viewpage.action?cjm=wozere&pageId=40511961
confluence_id: 40511961
---

# Lesson 4 - Noting down information

<table>
<colgroup>
<col width="50%" />
<col width="50%" />
</colgroup>
<tbody>
<tr class="odd">
<td><strong>Description</strong></td>
<td>Setup and create instances of a new Note content type, contained within 'Customers'.</td>
</tr>
<tr class="even">
<td><strong>Level</strong></td>
<td><div class="content-wrapper">
<p>3 - INTERMEDIATE</p>
</div></td>
</tr>
<tr class="odd">
<td><strong>Estimated time</strong></td>
<td>20 minutes</td>
</tr>
<tr class="even">
<td><strong>Example</strong></td>
<td><a href="https://bitbucket.org/atlassianlabs/confluence-custom-content-example" class="uri" class="external-link">https://bitbucket.org/atlassianlabs/confluence-custom-content-example</a></td>
</tr>
</tbody>
</table>

## Prerequisites

Ensure you have worked through [Lesson 3 - Extra Searching Capabilities](/cloud/confluence/lesson-3-extra-searching-capabilities) in the Custom content series.

## Another custom content type

As we did earlier on, we will now declare another custom content type in our atlassian-connect.json descriptor. Let's call them 'notes'.

``` javascript
{
  "uiSupport": {
    "contentViewComponent": {
      "moduleKey": "customersViewer"
    },
    "listViewComponent": {
      "moduleKey": "notesViewer"
    },
    "icons": {
      "item": {
        "url": "/images/conversations.png"
      }
    }
  },
  "apiSupport": {
    "supportedContainerTypes": [
      "ac:custom-content-example:customers"
    ]
  },
  "name": {
    "value": "Notes"
  },
  "key": "note"
}
```

Before moving onward, we also add more information to our customer custom content type, as follows:

``` javascript
"customContent": [
  {
    "key": "customer",
    //  More options above here...
    "apiSupport": {
      "supportedContainerTypes": [
        "space"
      ],
      "supportedChildTypes" : [
        "ac:custom-content-example:note"
      ]
    }   
  }
]
```

We have introduced a new key here, namely, **'supportedChildTypes'**. This establishes consistency in our declaration that a 'note' can be contained within a 'customer', and that a 'note' is indeed a supported child type of a 'customer'. So, what's left to do? In terms of understanding the backend code needed, we are all done! Let's quickly look at how to create a note and retrieve all notes under a customer.

## Noteworthy content

Using your favorite Connect JS API, the Request library, we perform the following: 

``` javascript
var jsondata = {
  "type": "ac:confluence-custom-content-example:note",
  "space": {
    "key": "<your-space-key>"
  },
  "container": {
    "type": "ac:confluence-custom-content-example:customers",
    "id": <customer-content-id>
  },
  "title": "Hello, World",
  "body": {
    "storage": {
      "value": "Goodbye, boy",
      "representation": "storage"
    }
  }
};
AP.require('request', function(request){
  request({
    url: '/rest/api/content',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(jsondata),
    success: function(note){
      note = JSON.parse(note);
      console.log("Note successfully persisted to Confluence", note);
    },
    error: function(err){
      console.log(err);
    }
  });
});
```

We use storage representation here, as we are not acquiring attributes or properties, but rather, we are looking to store a body of text. To see our note as a child of our content, let's pretend our customer has an id of '156831'. If we issue a GET request to the `/rest/api/content/156831/child/ac:custom-content-example:note` endpoint, we should see the following: 

``` javascript
{
  "results": [
    {
      "id": "1605728",
      "title": "Hello, World",
      // More properties...
    }
  ],
  // More below here...
}
```

And, voila! A connection has been established between the customer, and the note underneath them. As you can see, this affords great capabilities to add-on developers in the Confluence Ecosystem. Custom content well and truly provides a fully-integrated content solution.

To wrap up, we now have all the essentials we need to build the UI we want in Confluence! Here's another snapshot of what 'notes' could look like in Confluence:

![essentials to build the UI you want in Confluence](/cloud/confluence/images/image2016-7-20-17-51-1.png)  


This concludes our deep-dive into the capabilities of Custom content in Confluence Connect.

Happy dev-ing!
