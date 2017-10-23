---
title: "Multi-page blueprints with Confluence Connect"
platform: cloud
product: confcloud
category: devguide
subcategory: learning
guides: tutorials
date: "2016-11-17"
aliases:
- confcloud/multi-page-blueprints-with-confluence-connect-39985809.html
- /confcloud/multi-page-blueprints-with-confluence-connect-39985809.md
dac_edit_link: https://developer.atlassian.com/pages/editpage.action?cjm=wozere&pageId=39985809
dac_view_link: https://developer.atlassian.com/pages/viewpage.action?cjm=wozere&pageId=39985809
confluence_id: 39985809
---
# Multi-page blueprints with Confluence Connect

<table>
<colgroup>
<col width="50%" />
<col width="50%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><strong>Description</strong></p></td>
<td><p>A quick guide to building a multi-page blueprint with a custom parent and child pages.</p></td>
</tr>
<tr class="even">
<td><p><strong>Level</strong></p></td>
<td><p>3 - INTERMEDIATE</p></td>
</tr>
<tr class="odd">
<td><p><strong>Estimated time</strong></p></td>
<td><p>1 hour</p></td>
</tr>
<tr class="even">
<td><strong>Example</strong></td>
<td><a href="https://bitbucket.org/atlassianlabs/confluence-multipage-blueprint-example" class="uri" class="external-link">https://bitbucket.org/atlassianlabs/confluence-multipage-blueprint-example</a></td>
</tr>
</tbody>
</table>

## Prerequisites

Ensure you have installed all the tools you need for Confluence Connect add-on development, and running Confluence by running through the [Development setup](/cloud/confluence/development-setup/).

## Overview of the tutorial

In this tutorial you'll create an Atlassian Connect multi-page blueprint, which allows you to create multiple pages with control over the resulting page structure, like the one shown below. 

![5 child pages](/cloud/confluence/images/5-child-pages.png)

## Configuring your development environment 

Before you begin this tutorial, [configure your development environment](/cloud/confluence/development-setup/). to find out how set up your development environment.

{{% tip %}}Instead of cloning the Confluence Gardener repository, please follow the steps below for **steps 1 and 2**.{{% /tip %}}

1.  Clone the `Confluence Multi-page Blueprint Example`.

    ``` bash
    $ git clone git@bitbucket.org:atlassianlabs/confluence-multipage-blueprint-example.git
    ```

2.  Change into the `confluence-multipage-blueprint-example` directory.

    ``` bash
    $ cd confluence-multipage-blueprint-example
    ```

Once you've logged in to Confluence as an administrator you can continue with this tutorial.

## Review the Atlassian Connect descriptor

The `atlassian-connect.json` descriptor is located at the project root directory. See more about the [add-on descriptor](/cloud/confluence/add-on-descriptor/).

The descriptor defines 2 modules in `modules` section:

1.  **Blueprint**: Allows the add-on to provide a content creation template.

2.  **Webhook**: Lets Confluence call the given url when the blueprint creates the page.

It will look like something like this:

``` javascript
{
  "key": "confluence-multipage-blueprint-example",
  "name": "Confluence Multi-page Blueprint Example",
  "description": "Create multiple pages with control over the structure",
  "vendor": {
    "name": "Atlassian Labs",
    "url": "https://www.atlassian.com"
  },
  "baseUrl": "http://localhost:3000",
  "links": {
    "self": "http://localhost:3000/atlassian-connect.json",
    "homepage": "http://localhost:3000/atlassian-connect.json"
  },
  "authentication": {
    "type": "jwt"
  },
  "lifecycle": {
    "installed": "/installed"
  },
  "scopes": [
    "READ",
    "WRITE"
  ],
  "modules": {
    "blueprints": [
      {
        "template": {
          "url": "/blueprint.xml"
        },
        "createResult": "edit",
        "key": "remote-blueprint",
        "name": {
          "value": "Simple Remote Blueprint"
        }
      }
    ],
    "webhooks": [
      {
        "event": "blueprint_page_created",
        "url": "/created"
      }
    ]
  }
}
```

## Add code to route handler

The controllers for serving `atlassian-connect.json` and `blueprint.xml` are defined in `./routes/index.js` 
Now we need to write a controller to handle the blueprint creation callback so we can create a multi-page structure.

1.  Open `./routes/created.js.`This is the controller that handles POST requests to `/created` when a blueprint page is created.
2.  Add some code to check if the callback event was trigged by the blueprint we specified:

    ``` javascript
    // Import the descriptor at the beginning of the created.js as we want
    // to read the blueprint key from it.
    const descriptor = require('../atlassian-connect.json');

    // Add following code into the body of route handler function.

    // Create a wrapper for request (https://www.npmjs.com/package/request) 
    // which handles authorisation and signing automatically
    var httpClient = addon.httpClient(req);
    var body = req.body;

    // Check if the blueprint creation callback is triggered by current
    // add-on
    if
    (body.blueprint.indexKey !== descriptor.modules.blueprints[0].key) {
        return;
    }
    ```

3.  Then we can create the child pages using the REST API.

    Remember, you can't create multiple pages with same name in the same space. Because your blueprint add-on will be able to be executed multiple times, you may want to add some random text to the title to ensure it is unique, like we've done in the following example.

    ``` javascript
    // Create content for child pages
    for (var i = 1; i <= 5; i++) {
        // Randomize the title because we can't create pages with same name in one space
        var title = 'Test child page ' + i + ' - ' + String(Math.random()).slice(2);

        // Content of the page
        var contentBody = '<p>Data for child page ' + i + '.</p>';

        var content = {
            'type': 'page',
            'title': title,
            'space': {
                'key': body.page.spaceKey
            },
            'ancestors': [{'id': body.page.id}],
            'body': {
                'storage': {
                    'value': contentBody,
                    'representation': 'storage'
                }
            }
        };

        // Create child pages
        httpClient.post({
            url: '/rest/api/content',
            headers: {
                'X-Atlassian-Token': 'nocheck'
            },
            json: content
        }, function (err, res, body) {
            if (err) {
                console.error(err);
            }
        });
    }
    ```

4.  The final result of created.js should look like this:

    **created.js**  Expand source

    ``` javascript
    const descriptor = require('../atlassian-connect.json');
    module.exports = function (app, addon) {
        app.post('/created', addon.authenticate(), function (req, res) {
            // Create a wrapper for request (https://www.npmjs.com/package/request)
            // which handles authorisation signing automatically
            var httpClient = addon.httpClient(req);
            var body = req.body;

            // Check if the blueprint creation callback is current registered blueprint
            if (body.blueprint.indexKey !== descriptor.modules.blueprints[0].key) {
                return;
            }

            // Create content for child pages
            for (var i = 1; i <= 5; i++) {
                // Randomize the title because we can't create pages with same name in one space
                var title = 'Test child page ' + i + ' - ' + String(Math.random()).slice(2);

                // Content of the page
                var contentBody = '<p>Data for child page ' + i + '.</p>';

                var content = {
                    'type': 'page',
                    'title': title,
                    'space': {
                        'key': body.page.spaceKey
                    },
                    'ancestors': [{'id': body.page.id}],
                    'body': {
                        'storage': {
                            'value': contentBody,
                            'representation': 'storage'
                        }
                    }
                };

                // Create child pages
                httpClient.post({
                    url: '/rest/api/content',
                    headers: {
                        'X-Atlassian-Token': 'nocheck'
                    },
                    json: content
                }, function (err, res, body) {
                    if (err) {
                        console.error(err);
                    }
                });
            }
        });
    };
    ```

## Host and install your add-on

In order for your add-on to register with your cloud instance, add a **credentials.json** to your add-on directory. It should look like the following:

``` bash
{
    "hosts" : {
        "<your-confluence-domain>/wiki": {
            "username" : "<username>",
            "password" : "<password>"
        }
    }
}
```

Now, issue the following command:

``` bash
$ npm start
```

Voila, your add-on has been installed!

## Test your add-on

1.  In your browser, navigate to your Confluence instance. 
2.  Choose the **Create from template** button on the header

    Hint: It's next to the **Create** button.
    
    ![Create from template](/cloud/confluence/images/create-from-template.png)  

3.  Your new blueprint is listed in the Create dialog. Select your new blueprint and hit **Create**.
    
    ![Create dialog](/cloud/confluence/images/create-dialog.png)  

4.  Give your page a title then **Save**.
    
    ![Give title](/cloud/confluence/images/give-title.png)  

5.  Your page is created, along with 5 child pages.  
    
    ![5 child pages](/cloud/confluence/images/5-child-pages.png)

Congratulations, you're all done!
