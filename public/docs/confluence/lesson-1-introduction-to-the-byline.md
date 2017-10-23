---
title: "Lesson 1 - Introduction to the byline"
platform: cloud
product: confcloud
category: devguide
subcategory: learning
guides: tutorials
date: "2016-07-26"
aliases:
- confcloud/lesson-1-introduction-to-the-byline-40514318.html
- /confcloud/lesson-1-introduction-to-the-byline-40514318.md
dac_edit_link: https://developer.atlassian.com/pages/editpage.action?cjm=wozere&pageId=40514318
dac_view_link: https://developer.atlassian.com/pages/viewpage.action?cjm=wozere&pageId=40514318
confluence_id: 40514318
---

# Lesson 1 - Introduction to the byline 

<table>
<colgroup>
<col width="50%" />
<col width="50%" />
</colgroup>
<tbody>
<tr class="odd">
<td><strong>Description</strong></td>
<td>Add a simple 'approval' byline item under all pages in Confluence.</td>
</tr>
<tr class="even">
<td><strong>Level</strong></td>
<td><div class="content-wrapper">
<p>2 - BEGINNER</p>
</div></td>
</tr>
<tr class="odd">
<td><strong>Estimated time</strong></td>
<td>15 minutes</td>
</tr>
</tbody>
</table>

## Prerequisites

Ensure you have installed all the tools you need for Confluence Connect add-on development, and running Confluence by going through the [Development setup](/cloud/confluence/development-setup).

## A glance of information

When reading or editing a page in Confluence, you want to be able to focus on the task at hand. The Confluence Editor does a wonderful job at this, however, what if we want to be able to gain further insight into the external context of a page? Some questions which come to mind are:

-   How many people have approved the page we are currently reading? 
-   Which pages have similar content? 
-   Where in a specific workflow is our current page?

Providing insight into such forms of external metadata provide a powerful mechanism for understanding the relevance and context of the content we are creating or consuming. To reconcile these needs in an easy way, Confluence provides the **content byline item**, visible under the title of a Page. In this tutorial, we'll be taking a look at building a basic byline item, which allows for users to see how many approvals a page has, and to add an approval of their own. Let's get started!

![page approvals](/cloud/confluence/images/image2016-7-26-16-0-30.png)


## Plugin descriptor

As is the case with all Confluence Connect modules, we first add a **'contentBylineItems'** key to our plugin descriptor. Under this, we define our first byline item. Let's go ahead and do this in our atlassian-connect.json file.

``` javascript
{
  'key': 'confluence-byline-addon',
  'name': 'Byline Item for Confluence',
  'description': 'Page Approvals Integration',
  'vendor': {
    'name': 'Confluence Tutorials',
    'url': 'https://www.atlassian.com/'
  },
  'baseUrl': '{{localBaseUrl}}',
  'links': {
    'self': '{{localBaseUrl}}/atlassian-connect.json',
    'homepage': '{{localBaseUrl}}/atlassian-connect.json'
  },
  'authentication': {
    'type': 'jwt'
  },
  'lifecycle': {
    'installed': '/installed'
  },
  'scopes': [
    'READ',
    'WRITE'
  ],
  'modules': {
    'contentBylineItems': [
      {
        'context': 'addon',
        'target': {
          'type': 'inlinedialog'
        },
        'tooltip': {
          'value': 'Approvals'
        },
        'icon': {
          'url': '/images/approval.png'
        },
        'name': {
          'value': 'Page Approvals'
        },
        'key': 'byline-item',
        'url': '/approvals?contentId={content.id}'
      }
    ]
  }
}
```

 

Demonstrated above, we map our byline item's URL to a handler defined in our **routes/index.js** file. Notice here, that we are passing 'contentId' as a context parameter - '/approvals?**contentId={content.id}**'. This allows us to access the contentId of the current page in our route handler, rather than needing to query the REST API for this information and then passing it to our route.

{{% tip %}}As you will see below, in this tutorial, we are doing REST API calls for our content property from both our client and server using:
  
  - Client-side: confluence.getContentProperty()

  - Server-side: httpClient.get()

This is to purely to demonstrate the way in which a mixture of client-side and server-side rendering can be used by your add-on. For an add-on such as the Page Approvals add-on, we would ideally use the client-side approach throughout.{{% /tip %}}





We use a route handler defined as follows: 

``` javascript
app.get('/approvals', addon.authenticate(), function (req, res) {

    //  Get the ACE HTTP Client which interfaces with our Confluence instance.
    var httpClient = addon.httpClient(req);
    var contentId  = req.query['contentId'];
 
    //  Using the client, check if the page we are currently viewing has a
    //  content property with a key of 'approvals'. 
    //  We use the /rest/api/content/{contentId}/property/{key} endpoint here.
    httpClient.get({
        url: '/rest/api/content/' + contentId + '/property/approvals'
    }, function(err, responseApproval, approvalObj){

        approvalObj = JSON.parse(approvalObj);
        
        //  Setup all the parameters we need to pass through to our client.
        var propertyExists = approvalObj.statusCode !== 404;
        var allApprovals   = (propertyExists ? approvalObj.value.approvedBy : []);
        var version        = (propertyExists ? approvalObj.version.number   : null);
 
        //  Render.
        return res.render('approvals', {
            numberApprovedBy: allApprovals.length,
            allApprovals: JSON.stringify(allApprovals)
        });

    });
});
```

 

This all looks pretty nice and straightforward, but let's unpack a couple of things here. 

-   **httpClient:**
    By default, Atlassian Connect Express comes with a HTTP client which wraps the Node request library. This allows our add-on service to make authenticated calls to Confluence. Here, we use this client to see if our page already has a particular contentProperty, and accordingly send information through to our view. 
-   **contentProperty:**
    We store approvals as a JSON property against our Page content. These are known as 'contentProperties', and have the [following Connect API](/cloud/confluence/jsapi/custom-content/). Of interest to us is the **confluence.getContentProperty **and **confluence.setContentProperty** JavaScript methods. We use these to store a representation to store an array of usernames indicating who has approved a page and its content.


Sweet, everything's going great thus far. Now, we setup an **approvals.hbs** file in the **views/** directory, which looks like the following:

``` xml
{{!< layout}}

<div class='container'>
    <div class='approval-container'>
        <p class='current-approvals'>This page has <b class='number-approvals'>{{numberApprovedBy}} approvals</b>.</p>
        <button class='aui-button' id='approve-page'>
            <span class='aui-icon aui-icon-small aui-iconfont-approve'></span> Approve
        </button>
    </div>
</div>

<script>
    $(function(){
        var currUsers = JSON.parse('{{{allApprovals}}}');
        var currentApprovalNumber = {{numberApprovedBy}};
        var currUser;

        console.log(propertyExists, currUsers);

        AP.getUser(function(user){
            currUser = user.id;
            if(currUsers.indexOf(currUser) !== -1){
                //  We already have the user,
                //  update our UI accordingly.
                console.log('User has already approved this page.');
                $('p.your-approval').text('You have already approved this page!');
                $('button#approve-page').prop('disabled', true);
            }
        });

        $('#approve-page').on('click', function(){

            //  Send request to Confluence API, and update our DOM.
            AP.require(['confluence'], function(confluence){

                //  Add current user's approval to list.
                currUsers.push(currUser);

                //  Get the correct version for our 'approvals' content property.
                confluence.getContentProperty('approvals', function(property){

                    var version = 1;
                    if (property && property.version && property.version.number) {
                        version = property.version.number + 1;
                    }

                    //  Setup our updated approvals object.
                    var updatedApprovals = {
                        'key':     'approvals',
                        'value':   { 'approvedBy': currUsers },
                        'version': { 'number': version }
                    };

                    //  Update approvals list.
                    confluence.setContentProperty(updatedApprovals, function(){
                        // Dynamically update our dialog to have an accurate amount of approvals
                        // visible to the user.
                        $('p.your-approval').text('You have approved this page.');
                        $('b.number-approvals').text((currentApprovalNumber+1) + ' approvals');
                        $('button#approve-page').prop('disabled', true);
                    });

                });
            });
        });
    });
</script>
```

This page exposes a simple inline dialog experience with an 'Approve' button as we saw earlier. When a user clicks 'Approve' to approve a page, the button is disabled, and the total count of all current page approvals is dynamically updated. Let's take a look at some of the tools we are using above: 

-   **[AP.getUser](/cloud/confluence/jsapi/user/):** 
    This API returns the current user logged into the Confluence instance. We use this object to extract their username, and add it to the list of 'approvals' for our content.
     
-   **[AP.require('confluence')](/cloud/confluence/jsapi/confluence/):** 
    A Connect JS API, this allows for our add-on to make authenticated calls to the Confluence on the client-side. We use this to persist the updated list of approvals to Confluence if it already exists, or, we create a contentProperty with the current user as the only array entry.
     

And, there you have it - your first content byline item! As you can see, through basic REST API calls and UI interactions, the content byline item easily provides unique and interesting insights to the users of Confluence. Now, head over to [Lesson 2 - Dynamically Update your Byline](/cloud/confluence/lesson-2-dynamically-update-your-byline), to see how we can update our byline item in real-time. 
