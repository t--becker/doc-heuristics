---
title: "Lesson 1 - The source awakens"
platform: cloud
product: confcloud
category: devguide
subcategory: learning
guides: tutorials
date: "2017-11-17"
aliases:
- confcloud/lesson-1-the-source-awakens-39987233.html
- /confcloud/lesson-1-the-source-awakens-39987233.md
dac_edit_link: https://developer.atlassian.com/pages/editpage.action?cjm=wozere&pageId=39987233
dac_view_link: https://developer.atlassian.com/pages/viewpage.action?cjm=wozere&pageId=39987233
confluence_id: 39987233
---
# Lesson 1 - The source awakens

<table>
<colgroup>
<col width="50%" />
<col width="50%" />
</colgroup>
<tbody>
<tr class="odd">
<td><strong>Description</strong></td>
<td>A guide to setting up a general page using ACE.</td>
</tr>
<tr class="even">
<td><strong>Level</strong></td>
<td><div class="content-wrapper">
BEGINNER
</div></td>
</tr>
<tr class="odd">
<td><strong>Estimated time</strong></td>
<td>15 minutes</td>
</tr>
<tr class="even">
<td><strong>Example</strong></td>
<td>N/A</td>
</tr>
</tbody>
</table>

 

## Prerequisites

Ensure you have installed all the tools you need for Confluence Connect add-on development, and running Confluence by going through the [Development setup](/cloud/confluence/development-setup).

## Making a new project

Before we begin this process, let's double-check that we have all our pre-requisites correctly installed. By issuing the following commands, you should see these results:

``` bash
$ node -v
v5.5.0
$ npm -v
3.5.3
$ atlas-connect -h 
 
  Usage: atlas-connect [options] <command>
  Commands:

    new [options] <AwesomeApp>  Creates a new project with the given AwesomeApp name

  Options:

    -h, --help  output usage information
```

If any of the above commands are not found, please refer to the [Getting started tutorial](/cloud/confluence/getting-started).

To create your new project:

``` bash
$ atlas-connect new awesome-app
```

Now, let's enter our newly created app directory, and see what we've got. 

``` bash
$ cd awesome-app/
$ ls
LICENSE.txt            app.js                 package.json           store.db
Procfile               atlassian-connect.json public                 test
README.md              config.json            routes                 views
```

First, lets install the node dependencies:

``` bash
$ npm install
```

## Starting Confluence

If you don't already have a Connect-compatible product running, your add-on will not register with any hosts. For this, setup a Cloud Development instance [here](http://go.atlassian.com/cloud-dev)!

## Starting the add-on

In order for your add-on to register with your cloud instance, add a **credentials.json** to your add-on directory. It should look like the following:

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

We've now got everything we need to get stuck into our development workflow. To start the add on, issue the following command:

``` bash
$ npm start
```

We will see the following output: 

``` bash
$ npm start
//...More stuff above here.
[VERIFY] Attempt 1 : Verifying public key for instance http://localhost:1990/confluence
Saved tenant details for <your-client-key> to database
{ key: 'helloWorldTest',
  clientKey: '<your-client-key>',
  publicKey: '<your-public-key>',
  sharedSecret: '<your-shared-secret>',
  serverVersion: '6211',
  pluginsVersion: '1.1.78',
  baseUrl: 'http://localhost:1990/confluence',
  productType: 'confluence',
  description: 'Atlassian Confluence at http://localhost:1990/confluence ',
  eventType: 'installed' }
POST /installed?user_key=2c9682714db22c7c014db22f51970002 204 20ms
//...More stuff below here
```

## Hello World

Nearly done! Navigate to your Confluence instance, and click on 'Hello World' in the top left. You should be greeted with this:

![hello world](/cloud/confluence/images/hello-world.png)

 

## The add-on descriptor

Yes! You're all ready to go - this is an example of a **general page** built using Connect. How does this generalPage actually come about in our add-on? The secrets are all hidden in our add-on descriptor...

``` bash
{
    "key": "helloWorldTest",
    "name": "Ping Pong",
    "description": "My very first add-on",
    "vendor": {
        "name": "Angry Nerds",
        "url": "https://www.atlassian.com/angrynerds"
    },
    "baseUrl": "{{localBaseUrl}}",
    "links": {
        "self": "{{localBaseUrl}}/atlassian-connect.json",
        "homepage": "{{localBaseUrl}}/atlassian-connect.json"
    },
    "authentication": {
        "type": "jwt"
    },
    "lifecycle": {
        // atlassian-connect-express expects this route to be configured to manage the installation handshake
        "installed": "/installed"
    },
    "scopes": [
        "READ"
    ],
    "modules": {
        "generalPages": [

            // JIRA - Add a Hello World menu item to the navigation bar
            {
                "key": "helloWorldTest-page-jira",
                "location": "system.top.navigation.bar",
                "name": {
                    "value": "Hello World"
                },
                "url": "/hello-world",
                "conditions": [{
                    "condition": "user_is_logged_in"
                }]
            },

            // Confluence - Add a Hello World menu item to the navigation bar
            {
                "key": "helloWorldTest-page-confluence",
                "location": "system.header/left",
                "name": {
                    "value": "Hello World"
                },
                "url": "/hello-world",
                "conditions": [{
                    "condition": "user_is_logged_in"
            }]
        }]
    }
}
```

Of interest to us are the modules configured under the "modules" key of our add-on descriptor. 

``` bash
 // Confluence - Add a Hello World menu item to the navigation bar
 {
    "key": "helloWorldTest-page-confluence",
    "location": "system.header/left",
    "name": {
        "value": "Hello World"
    },
    "url": "/hello-world",
    "conditions": [{
        "condition": "user_is_logged_in"
    ]
}
```

 

Before we take a deeper look at this, let's see our dev-loop in action. Try commenting out and/or deleting the JIRA module from your descriptor (since we are operating in Confluence, it does not make sense to keep it with us). Once you have deleted it, and saved your descriptor, you will notice the following in your terminal: 

``` bash
// ...More stuff above here.
Re-registering due to atlassian-connect.json change
Registered with host <your-client-key> at http://localhost:1990/confluence
[VERIFY] Attempt 1 : Verifying public key for instance http://localhost:1990/confluence
Saved tenant details for <your-client-key> to database
{ key: 'helloWorldTest',
  clientKey: '<your-client-key>',
  publicKey: '<your-public-key>',
  sharedSecret: '<your-shared-secret>',
  serverVersion: '6211',
  pluginsVersion: '1.1.78',
  baseUrl: 'http://localhost:1990/confluence',
  productType: 'confluence',
  description: 'Atlassian Confluence at http://localhost:1990/confluence ',
  eventType: 'installed' }
POST /installed?user_key=2c9682714db22c7c014db22f51970002 204 20ms
// ...More stuff below here
```

 

Let's break down exactly what's going on here. 

-   **key**: This value determines the URL which is loaded when a person attempts to access this general page. In this instance, it would be: `http://localhost:1990/confluence/plugins/servlet/ac/helloWorldTest/helloWorldTest-page-confluence`.
-   **location**: Tells our host product where to situate a link to this general page. In this case, we are targeting the system navigation area, in the top left. For a list of valid locations, take a look [here]!
-   **name**: Specifies the text we see in a link to this page.
-   **url:** Tells our add-on which route to send a HTTP request to when a user accesses our general page. The magic happens here: 

    ``` javascript
    // This is an example route that's used by the default "generalPage" module.
    // Verify that the incoming request is authenticated with Atlassian Connect
    app.get('/hello-world', addon.authenticate(), function (req, res) {
            // Rendering a template is easy; the `render()` method takes two params: name of template
            // and a json object to pass the context in
            res.render('hello-world', {
                title: 'Atlassian Connect'
            });
        }
    );
    ```

    Which calls on the following template: 

    ``` xml
    {{!< layout}}
    <header class="aui-page-header">
      <div class="aui-page-header-inner">
        <div class="aui-page-header-main intro-header">
          <h1>Hello World!</h1>

          <p class="subtitle">Welcome to {{title}}</p>
        </div>
      </div>
    </header>

    <div class="aui-page-panel main-panel">
      <div class="aui-page-panel-inner">
        <section class="aui-page-panel-item">
          <div class="aui-group">
            <div class="aui-item">
              <p>
                Congratulations. You've successfully created an Atlassian Connect add-on using the
                <a href="https://bitbucket.org/atlassian/atlassian-connect-express/src/master/README.md#markdown-header-atlassian-connect-express-nodejs-package-for-express-based-atlassian-add-ons" target="_parent">atlassian-connect-express</a>
                client library.
              </p>
              <p>
                <a class="aui-button aui-button-primary" href="https://bitbucket.org/atlassian/atlassian-connect-express/src/master/README.md#markdown-header-atlassian-connect-express-nodejs-package-for-express-based-atlassian-add-ons" target="_parent">
                  Get Started
                  <span class="aui-icon aui-icon-small aui-iconfont-devtools-arrow-right">Arrow right</span>
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div> 
    ```

    {{% note %}}Click the box above to show the entire code example.{{% /note %}}

     

    Pretty cool, right?

-   **conditions**: Specifies the conditions which must be reached before we a user is allowed to access this page. To understand the conditions system better, have a read [here](/cloud/confluence/conditions/).

## The AUI Sandbox

Next up, try and edit your add-on, so that it looks a little different - maybe like this!

 

![connect is awesome](/cloud/confluence/images/connect-is-awesome.png)

 

Does this look long and tiring? Truth be told, it took **less than 5 minutes** using the [AUI Sandbox](https://docs.atlassian.com/aui/5.2/sandbox/). Lastly, here's what our source looks like!
 

``` xml
{{!< layout}}
<header class="aui-page-header">

  <div class="aui-page-header-inner">
    <div class="aui-page-header-main intro-header">
      <h1>Connect is awesome!</h1>

      <p class="subtitle">Welcome to {{title}}</p>
    </div>
  </div>
</header>

<nav class="aui-navgroup aui-navgroup-horizontal">
    <div class="aui-navgroup-inner">
        <div class="aui-navgroup-primary">
            <ul class="aui-nav">
                <li><a href="#">Nav item</a></li>
                <li class="aui-nav-selected"><a href="#">Nav item</a></li>
                <li><a href="#">Nav item</a></li>
                <li><a href="#">Nav item <span class="aui-badge">12</span></a></li>
                <li><a href="#">Nav item</a></li>
            </ul>
        </div><!-- .aui-navgroup-primary -->
        <div class="aui-navgroup-secondary">
            <ul class="aui-nav">
                <li><a href="#hnavsettingsDropdown" class="aui-dropdown2-trigger" aria-owns="hnavsettings-dropdown" aria-haspopup="true"><span class="aui-icon aui-icon-small aui-iconfont-configure">Configure</span> <span class="aui-icon-dropdown"></span></a></li>
            </ul>
        </div><!-- .aui-navgroup-secondary -->
    </div><!-- .aui-navgroup-inner -->
</nav>

<div class="aui-page-panel">
    <div class="aui-page-panel-inner">
        <section class="aui-page-panel-content">
            <h2>This is a heading.</h2>
            <div class="aui-item">
                <p>
                    Here is a cool table.
                </p>
                <div class="aui-tabs horizontal-tabs" id="tabs-example1">
                    <ul class="tabs-menu">
                        <li class="menu-item active-tab">
                            <a href="#tabs-example-first"><strong>Designers</strong></a>
                        </li>
                        <li class="menu-item">
                            <a href="#tabs-example-second"><strong>Developers</strong></a>
                        </li>
                        <li class="menu-item">
                            <a href="#tabs-example-third"><strong>PMs</strong></a>
                        </li>
                    </ul>
                    <div class="tabs-pane active-pane" id="tabs-example-first">
                        <h3>Designers</h3>
                        <table class="aui">
                            <thead>
                            <tr>
                                <th id="basic-number">#</th>
                                <th id="basic-fname">First name</th>
                                <th id="basic-lname">Last name</th>
                                <th id="basic-username">Username</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td headers="basic-number">1</td>
                                <td headers="basic-fname">Matt</td>
                                <td headers="basic-lname">Bond</td>
                                <td headers="basic-username">mbond</td>
                            </tr>
                            <tr>
                                <td headers="basic-number">2</td>
                                <td headers="basic-fname">Ross</td>
                                <td headers="basic-lname">Chaldecott</td>
                                <td headers="basic-username">rchaldecott</td>
                            </tr>
                            <tr>
                                <td headers="basic-number">3</td>
                                <td headers="basic-fname">Henry</td>
                                <td headers="basic-lname">Tapia</td>
                                <td headers="basic-username">htapia</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="tabs-pane" id="tabs-example-second">
                        <h3>Developers</h3>
                        <table class="aui">
                            <thead>
                            <tr>
                                <th id="basic-number">#</th>
                                <th id="basic-fname">First name</th>
                                <th id="basic-lname">Last name</th>
                                <th id="basic-username">Username</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td headers="basic-number">4</td>
                                <td headers="basic-fname">Seb</td>
                                <td headers="basic-lname">Ruiz</td>
                                <td headers="basic-username">sruiz</td>
                            </tr>
                            <tr>
                                <td headers="basic-number">7</td>
                                <td headers="basic-fname">Sean</td>
                                <td headers="basic-lname">Curtis</td>
                                <td headers="basic-username">scurtis</td>
                            </tr>
                            <tr>
                                <td headers="basic-number">8</td>
                                <td headers="basic-fname">Matthew</td>
                                <td headers="basic-lname">Watson</td>
                                <td headers="basic-username">mwatson</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="tabs-pane" id="tabs-example-third">
                        <h3>Product management</h3>
                        <table class="aui">
                            <thead>
                            <tr>
                                <th id="basic-number">#</th>
                                <th id="basic-fname">First name</th>
                                <th id="basic-lname">Last name</th>
                                <th id="basic-username">Username</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td headers="basic-number">5</td>
                                <td headers="basic-fname">Jens</td>
                                <td headers="basic-lname">Schumacher</td>
                                <td headers="basic-username">jschumacher</td>
                            </tr>
                            <tr>
                                <td headers="basic-number">6</td>
                                <td headers="basic-fname">Sten</td>
                                <td headers="basic-lname">Pittet</td>
                                <td headers="basic-username">spittet</td>
                            </tr>
                            <tr>
                                <td headers="basic-number">9</td>
                                <td headers="basic-fname">James</td>
                                <td headers="basic-lname">Dumay</td>
                                <td headers="basic-username">jdumay</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div><!-- .aui-tabs -->

            </div>
        </section>
    </div>
</div>


<div class="aui-dropdown2 aui-style-default" id="hnavsettings-dropdown" data-dropdown2-alignment="right">
    <ul>
        <li><a href="#" class="">Nav dropdown item</a></li>
        <li><a href="#" class="active">Nav dropdown item</a></li>
        <li><a href="#">Nav dropdown item</a></li>
    </ul>
</div>
```

## Conclusion

As you can see, general pages provide a powerful mechanism to display customized content on a page in Confluence. For more information on the many other different kinds of modules and entities you can specify in your add-on descriptor, check out the [Connect Docs](/cloud/confluence/modules/). 

But before that...check out how to add macros to the Confluence editor in [Lesson 2 - Rise of the Macros](/cloud/confluence/lesson-2-rise-of-the-macros)! 

 