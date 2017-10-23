---
title: "Macro custom editor with Confluence Connect"
platform: cloud
product: confcloud
category: devguide
subcategory: learning
guides: guides
date: "2016-08-12"
aliases:
- confcloud/macro-custom-editor-with-confluence-connect-41224399.html
- /confcloud/macro-custom-editor-with-confluence-connect-41224399.md
dac_edit_link: https://developer.atlassian.com/pages/editpage.action?cjm=wozere&pageId=41224399
dac_view_link: https://developer.atlassian.com/pages/viewpage.action?cjm=wozere&pageId=41224399
confluence_id: 41224399
---
# Macro custom editor with Confluence Connect

<table>
<colgroup>
<col width="50%" />
<col width="50%" />
</colgroup>
<tbody>
<tr class="odd">
<td><strong>Description</strong></td>
<td>Add a custom editor to your macro experience.</td>
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
</tbody>
</table>

## Prerequisites

Ensure you have worked through the [Getting started tutorial](/cloud/confluence/getting-started).

## Editor magic

As we discovered in [Macro Custom Editor with Confluence Connect](/cloud/confluence/macro-custom-editor-with-confluence-connect), Confluence Connect ships with features which allows macros defined by your add-on to provide highly customized and focused user experiences.

Normally when a macro is inserted into the Confluence Editor, we rely on the macro browser and editor to configure our macro and then insert it into a page. However, with Confluence Connect, this editor experience can be provided by a custom dialog completely under your control. Let's take another look at what we are looking to build.

![what we're going to build gif](/cloud/confluence/images/giphy-1.gif)

We have already taken a look at [autoconvert](/cloud/confluence/macro-autoconvert-with-confluence-connect/) and how it allows for URLs to be mapped to an instance of your macro. In this tutorial, we will be looking at the custom editor experience above.
 

-   **Custom Editor:**
    When attempting to enter a new GIPHY macro, we were presented with a custom macro editing experience.

Once again, as a developer, this allows you to provide users with a dedicated user experience. Let's go through the process of building this.

{{% tip %}}This tutorial extends the GIPHY macro we built in the [Getting started tutorial](/cloud/confluence/getting-started). Check it out before moving on!{{% /tip %}}

## Searching GIPHY in style

The purpose of building a custom editor in our case is to provide users with a search screen through which they can easily browse for and choose the GIF they need. Under the hood, the custom editor capability uses a Connect dialog to render our view. This simplifies the process of building your own Confluence insert dialog - by simply specifying a width, height and URL, we have essentially replaced the default macro insert dialog! 

Let's go back to our plugin's descriptor. We need only to define the mentioned parameters under the "editor" key of our GIPHY macro.

``` javascript
{
  "editor": {
    "url": "/gif-picker",
    "editTitle": {
      "value": "Giphy Search"
    },
    "insertTitle": {
      "value": "Giphy Search"
    },
    "width": "640px",
    "height": "370px"
  }
}
```

{{% note %}}Check out the full [atlassian-connect.json descriptor here](https://bitbucket.org/atlassian/confluence-giphy-addon/src/5d34957b0c2769d0f4202ee848e94a77e88d03e8/atlassian-connect.json?fileviewer=file-view-default).{{% /note %}}

Now, we add a router handler for the above url: **"/gif-picker"**. In this handler, we will render a view which we have defined. Here's an example of how to go about this with a basic **gif-picker.hbs**: 

``` xml
{{!< layout}}

<div class="search-container">
    <form onsubmit="return false;" autocomplete="off">
        <input id="giphy-search-field" class="search-field" type="search" placeholder="Search">
    </form>
</div>

<div id="giphy-container"></div>

<script>
    $(function () {
        
        console.log("Running awesome script.");
 
        //  Hardcoded URL for demonstrative purposes.
        var data = {
            url: "http://giphy.com/gifs/applause-clapping-clap-aLdiZJmmx4OVW"
        };
 
        //  Use the Connect JS API to pass current macro parameters. 
        AP.require(["confluence", "dialog"], function (confluence, dialog) {
            //  Latch onto the macro editor's 'submit' event.
            dialog.getButton("submit").bind(function () {
                confluence.saveMacro({
                    'url': data.url
                });
                confluence.closeMacroEditor();
                return true;
            });
        });
    });
</script>
```
{{% tip %}}Unsure of how to add a route handler?

``` javascript
app.get('/gif-picker', addon.authenticate(), function (req, res) {
    // Handle request here.
    return res.render('<your-template>', { 
        // More params. 
    });
});
```

If you'd like a full example, take a quick look at how we did this earlier [Getting started tutorial](/cloud/confluence/getting-started)!{{% /tip %}} 

As mentioned in the code snippet above, we use the Connect JS API to interface between our custom editor implementation and the insertion of a macro instance with certain parameters. To understand the Confluence and Dialog JS API's better, head over to the [related Connect Documentation](/cloud/confluence/jsapi/confluence/). 

![custom GIPHY experience](/cloud/confluence/images/image2016-8-12-14-21-20.png)

*Our very own macro editor!*

Through the extensibility provided by the plugin descriptor and Connect APIs, we are able to provide a custom experience with relative ease. This concludes our deep dive into the advanced capabilities provided by Confluence Connect macros. 

All the best! 
