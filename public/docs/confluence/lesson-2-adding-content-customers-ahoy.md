---
title: "Lesson 2 - Adding content - Customers, ahoy!"
platform: cloud
product: confcloud
category: devguide
subcategory: learning
guides: tutorials
date: "2016-11-11"
aliases:
- confcloud/lesson-2-adding-content-customers-ahoy-40511959.html
- /confcloud/lesson-2-adding-content-customers-ahoy-40511959.md
dac_edit_link: https://developer.atlassian.com/pages/editpage.action?cjm=wozere&pageId=40511959
dac_view_link: https://developer.atlassian.com/pages/viewpage.action?cjm=wozere&pageId=40511959
confluence_id: 40511959
---

# Lesson 2 - Adding content - Customers, ahoy!

<table>
<colgroup>
<col width="50%" />
<col width="50%" />
</colgroup>
<tbody>
<tr class="odd">
<td><strong>Description</strong></td>
<td>Setup and create instances of a new Customer content type.</td>
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

Ensure you have worked through [Lesson 1 - A New Content Type](/cloud/confluence/lesson-1-a-new-content-type) in the Custom content series.

## The missing link

Okay, so now that we have our Customer content type setup, and a general page which is going to soon visualize this content, how do form the link between the Content API and our UI? Let's quickly understand this before jumping into creating some instances of our content type. To acquire the data we need, we can use one of two approaches (or even both): 

-   **The Backendy Approach: **
    With this approach, you can do a server-side call to the Confluence REST API, and collect all content of the type you are interested in. Typically, this will look something like this:

    ``` javascript
    //  Setup a HTTP client with all under-the-hood authentication and validation handled by ACE.
    var httpClient = addon.httpClient(req);
    httpClient.get({
        url: '/rest/api/content',
        qs: {
          type: 'ac:custom-content-example:customer',
          space: {
            key: '<your-space-key>'
          }
        },
    }, function(err, res, body){
        // Handle response data here...
    });
    ```

    This method provides you the ability to do any server-side data manipulation, by leveraging any custom architecture or services you may be using on your backend services.

-   **The Frontendy Approach**
    But, it's understandable that you may not need all this. If instead of a backend service you intend on sending this API data through a custom front-end stack (for example using React, Webpack, ES6), you can easily use the **Connect Request JS API** to make authenticated calls to Confluence. This would typically look like this: 

    ``` javascript
    AP.require('request', function(request){
      request({
        url: '/rest/api/content',
        data: {
            type: 'ac:confluence-custom-content-example:customers',
            space: {
                key: '<your-space-key>'
            }
        },
        success: (data) => {
            console.log(data);
        },
        error: (err) => {
            console.log(err);   
        }
      });
    });
    ```

We can use the same backend or frontend protocol for all HTTP requests within our add-on service. 

## Creating a customer

Let's setup a basic dialog that looks like this:

![add a new customer](/cloud/confluence/images/image2016-7-20-17-53-17.png)

To achieve this, we need to do two things: 

-   Setup a **dialog module** in our atlassian-connect.json descriptor. This could be done as follows: 

    ``` javascript
    "dialogs": [
      {
        "url": "/add-new-customer",
        "options": {
          "height": "420px",
          "width": "600px",
          "header": {
            "value": "Add a new customer"
          }
        },
        "key": "newCustomer"
      }
    ]
    ```

    Once we have set this dialog up, we can trigger it to appear from anywhere within our add-on. The important thing to note is the dialog's **key** attribute.

-   Adding a UI trigger to our generalPage. For example, we have the following button in place:
    ![add a new customer button](/cloud/confluence/images/image2016-7-20-17-53-1.png)
    
    Which, when clicked, calls the **Dialog JS API** and asks Confluence to render our dialog through the following: 

    ``` javascript
    AP.require('dialog', function(dialog) {
      dialog.create({
        key: 'newCustomer'
      })
    });
    ```

Simple as that! We leave the UI to your imagination and needs, however here's a simple bit of AUI markup we used to render our dialog above:

``` xml
<div>
  <header class="aui-dialog2-header">
    <h2 class="aui-dialog2-header-main">Add a new customer</h2>
  </header>
  <div class="aui-dialog2-content">
    <form id="add-customer-dialog" class="aui top-label new-customer-dialog">
      <div class="field-group top-label">
        <label for="logo">Logo</label>
        <input class="text long-field" type="text" id="logo" name="logo" placeholder="http://path/to/a/logo" />
      </div>
      <div class="field-group top-label">
        <label for="companyName">Company Name</label>
        <input class="text long-field" type="text" id="companyName" name="companyName" placeholder="Atlassian" />
      </div>
      <div class="field-group top-label">
        <label for="description">Description</label>
        <input class="text long-field" type="text" id="description" name="description" placeholder="Collaboration tools for small and large teams" />
      </div>
      <div class="field-group top-label">
        <label for="website">Website</label>
        <input class="text long-field" type="website" id="website" name="website" placeholder="http://www.atlassian.com" />
      </div>
    </form>
  </div>
  <footer class="aui-dialog2-footer">
    <div class="aui-dialog2-footer-actions">
      <button id="dialog-submit-button" class="aui-button aui-button-primary">Submit</button>
      <button id="dialog-close-button" class="aui-button aui-button-link">Close</button>
    </div>
  </footer>
</div>
```

 

To check out more markup and UI components, check out the [AUI documentation](https://docs.atlassian.com/aui/latest/docs/dialog2.html).

The last step involved in creating our customer entity, is issuing a POST request to Confluence. To do this, we use the awesome AP Request library again, and send our form data through. Before doing this, let's understand the ways in which we can store the information we have acquired from our form submission.

### Storage representation

Confluence stores the XML markup of each piece of content in a native 'Storage Format'. This is sanitized HTML, which is used more for storing bodies of information or content. Typically, the content stored in Pages and Comments is in this format. It stores 'prose-like' content.

### Content properties

If we are acquiring input which is not prose-like, but rather a set of key-value pairs, we can use content properties. These are JSON objects stored against a piece of content. In our case, this would be the better approach. We capture this information under the 'metadata' key.

Awesome, now we know what our data needs to be stored as. In order to POST a new content entity, we use the [/rest/api/content](https://docs.atlassian.com/atlassian-confluence/REST/latest/#content-createContent) endpoint. This endpoint assumes our data is of the following format: 

``` javascript
//  Assuming we have stored our form data in a 'data' key-value store,
//  we would proceed as follows.
var jsonData = {
  "type": "ac:confluence-custom-content-example:customers",
  "space": {
    "key": "<your-space-key>"
  },
  "title": data.title,
  "body": {
    "storage": {
      "value": "",
      "representation": "storage"
    }
  },
  "metadata": {
    //  Store a 'customer-data' content property against our Customer.
    "properties": {
      "customer-data": {
        "key": "customer-data",
        "value": {
          "logo": data.logo,
          "companyName": data.companyName,
          "description": data.description,
          "website": data.website
        } 
      }
    }
  }
}
```

To understand this better, check out the awesome [Confluence REST API Docs](https://docs.atlassian.com/atlassian-confluence/REST/latest/). To go ahead with building our Customer content entity, we do the following:

``` javascript
AP.require('request', function(request){
  request({
    url: '/rest/api/content',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(jsonData),
    success: function(customer){
      customer = JSON.parse(customer);
      console.log("Customer successfully persisted to Confluence", customer);
    },
    error: function(err){
      console.log(err);
    }
  });
});
```

 

You should see the following in your developer tools: 

![insert menu](/cloud/confluence/images/dev-tools-message.png)


Awesome, this is a great step forward! We can now visualize our content hub using basic HTTP GET request to /rest/api/content, searching for the type "ac:confluence-custom-content-example:customer". Here is an example of what we can do with these capabilities:


![content hub](/cloud/confluence/images/image2016-7-20-17-52-21.png)
 

Again, the ability to handle the view for singular and all customers can be implemented in your add-on through the use of context parameters. Here, we are viewing the content 'hub' landing page.

Now, before we start building 'notes', let's take a look at how we can make our Customer custom content types searchable! Head over to the [Lesson 3 - Extra Searching Capabilities](/cloud/confluence/lesson-3-extra-searching-capabilities)!
