---
title: "Lesson 2 - Dynamically update your byline"
platform: cloud
product: confcloud
category: devguide
subcategory: learning
guides: tutorials
date: "2016-11-17"
aliases:
- confcloud/lesson-2-dynamically-update-your-byline-40514317.html
- /confcloud/lesson-2-dynamically-update-your-byline-40514317.md
dac_edit_link: https://developer.atlassian.com/pages/editpage.action?cjm=wozere&pageId=40514317
dac_view_link: https://developer.atlassian.com/pages/viewpage.action?cjm=wozere&pageId=40514317
confluence_id: 40514317
---

# Lesson 2 - Dynamically update your byline

<table>
<colgroup>
<col width="50%" />
<col width="50%" />
</colgroup>
<tbody>
<tr class="odd">
<td><strong>Description</strong></td>
<td>Link your byline item with a content property stored in Confluence to allow for dynamic UI updates.</td>
</tr>
<tr class="even">
<td><strong>Level</strong></td>
<td><div class="content-wrapper">
<p>2 - BEGINNER</p>
</div></td>
</tr>
<tr class="odd">
<td><strong>Estimated time</strong></td>
<td>10 minutes</td>
</tr>
</tbody>
</table>

## Prerequisites

Ensure you have worked through [Lesson 1 - Introduction to the Byline](/cloud/confluence/lesson-1-introduction-to-the-byline) of the Content Byline series.

## Updating our UI 

We have a simple but powerful page approval system up and running. This looks like below.  

![page approval system](/cloud/confluence/images/image2016-7-26-16-1-23.png)

Our JavaScript code successfully updates our dialog and its UI to surface information accurate to the current state of our page, and its approvals. However, what if we would like to change the title of our byline item, or, change the icon? If we are building a small, consumable piece of content, changing these dynamically would allow for users to understand that a transition has occurred without needing to bring the dialog up.

To do this, we need to use **Content Properties**.

## Content properties and the byline

If we have a quick look at the documentation for the content byline item, we see that **contentPropertyKey **is one of the properties which we can specify in an instance of a byline item.

{{% tip %}}To read more about Content Properties and how they operate in Confluence, check out the [REST API Documentation](https://docs.atlassian.com/atlassian-confluence/REST/latest/), or this [great summary](/cloud/confluence/content-properties).{{% /tip %}}

Let's set this up. In your plugin descriptor, add the following to your contentBylineItem entry.

``` javascript
{
  'contentPropertyKey': 'byline-ui'
}
```

In terms of our Connect plugin, we're all good to go! Next, we have to make sure that this content property exists in Confluence. Content Properties by default can only be defined under a page, or blogpost.

To quickly try this functionality, let's pick a random page and build a content property with key** 'byline-ui'** under it. If we look at the REST endpoint for creating a content property, we see that we need an ID under which to create our content property. Let's get this information first. To do this, head to the page tools menu, and click on 'Page Information' as below.

![page information](/cloud/confluence/images/image2016-7-26-16-1-34.png)

Once this page has loaded, we can acquire our page's content ID through the URL we are redirected to. E.g. redirecting to **https://&lt;your-host-name&gt;.net/wiki/pages/viewinfo.action?pageId=196667** would mean your page has a content ID of 196667. We now have the information we need to build our content property.

Issue a POST request to **https://&lt;your-host-name&gt;/rest/api/content/196667/property** (using [Postman](https://www.getpostman.com/) or curl), with the following JSON body:

``` javascript
{
    'key':'byline-ui',
    'value': {
        'name': {
            'value': 'Page Approval (through content property)'
        },
        'icon': {
            'url': '/images/approval.png'
        },
        'tooltip': {
            'value': 'Approvals'
        }
     }
 }
```

Awesome! Now, if we refresh the page, we should see the following:

![page approvals through content property](/cloud/confluence/images/screen-shot-2016-06-06-at-4.30.37-pm.png.jpeg)

Now, we have a powerful link between our byline item, and its UI. Let's turn this into something meaningful. 

Consider when a page has been approved by a user. In order to give better feedback, let's change the icon of the byline item, as well as its text. Thankfully, we already have a content property setup from earlier! Let's add a similar property to update our UI.

{{% note %}}If you have already created a 'byline-ui' content property under this page, ensure you use **getContentProperty()** to set the correct version number.{{% /note %}}

``` javascript
<script>
    $(function(){
        var currUsers = JSON.parse('{{{allApprovals}}}');
        var currentApprovalNumber = {{numberApprovedBy}};
        var currUser;

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
                    if(property && property.version && property.version.number) {
                        version = property.version.number + 1;
                    }

                    //  Setup our updated JSON objects.
                    var updatedApprovals = {
                        'key':     'approvals',
                        'value':   { 'approvedBy': currUsers },
                        'version': { 'number': version }
                    };
                    var updatedBylineTextAndIcon = {
                        'key': 'byline-ui',
                        'value': {
                            'name':    { 'value': 'Page Approved'       },
                            'icon':    { 'url':   'images/approved.png' },
                            'tooltip': { 'value': 'Page Approved'       }
                        }
                    };

                    //  Update approvals list.
                    confluence.setContentProperty(updatedApprovals, function(){
                        // Dynamically update our dialog to have an accurate amount of approvals
                        // visible to the user.
                        $('p.your-approval').text('You have approved this page.');
                        $('b.number-approvals').text((currentApprovalNumber+1) + ' approvals');
                        $('button#approve-page').prop('disabled', true);
                    });
                    //  Update the byline item text/icon.
                    confluence.setContentProperty(updatedBylineTextAndIcon, function(){
                        console.log('UI updates persisted.');
                    });

                });
            });
        });
    });
</script>
```

Now, after approving a page we will see the following: 

![page approved](/cloud/confluence/images/image2016-7-26-16-1-49.png)

Nice! As one can gauge, content properties in unison with content byline items afford great capabilities to Confluence. Through dynamic updates to the UI, we are able to ensure users are able to consume information quickly and meaningfully.

This concludes our Content Byline tutorial. 
