---
title: "Lesson 2 - Rise of the macros"
platform: cloud
product: confcloud
category: devguide
subcategory: learning
guides: tutorials
date: "2017-02-27"
aliases:
- confcloud/lesson-2-rise-of-the-macros-39987235.html
- /confcloud/lesson-2-rise-of-the-macros-39987235.md
dac_edit_link: https://developer.atlassian.com/pages/editpage.action?cjm=wozere&pageId=39987235
dac_view_link: https://developer.atlassian.com/pages/viewpage.action?cjm=wozere&pageId=39987235
confluence_id: 39987235
---

# Lesson 2 - Rise of the macros

<table>
<colgroup>
<col width="50%" />
<col width="50%" />
</colgroup>
<tbody>
<tr class="odd">
<td><strong>Description</strong></td>
<td>A guide to adding a Confluence macro with ACE.</td>
</tr>
<tr class="even">
<td><strong>Level</strong></td>
<td><div class="content-wrapper">
BEGINNER
</div></td>
</tr>
<tr class="odd">
<td><strong>Estimated time</strong></td>
<td>30 minutes</td>
</tr>
<tr class="even">
<td><strong>Example<strong></td>
<td><a href="https://bitbucket.org/mjensen/example-static-macro" class="uri" class="external-link">https://bitbucket.org/mjensen/example-static-macro</a></td>
</tr>
</tbody>
</table>

## Prerequisites

This lesson follows on from [Lesson 1 - The Source Awakens](/cloud/confluence/lesson-1-the-source-awakens).

## Macros - why do we need them?

Since they are so **powerful**, macros are one of the most commonly used features of Confluence. This follows on from the fact that users of Confluence spend most of their time creating and editing content --- macros are central to this experience.

This tutorial itself is a collection of macros, streamlined into a page!

## Specifying a macro module

Let's work on making a basic macro, which, when activated, allows the user to specify a background color for all enclosed content. We will build this as a static content macro. 

Before continuing, let's clarify the difference between a static and dynamic content macro.

-   **Static**: A static content macro is loaded synchronously into a page. This is the optimal choice for when you are building macros which will not render large amounts of content.
-   **Dynamic**: Loaded asynchronously into the page, and renders an iframe. As an opposite to the static macro use case, we build dynamic macros when large amounts of content need to be rendered.

{{% tip %}}For more information on the rendering lifecycle of these macros, check out [Matthew Jensen's](https://developer.atlassian.com/display/~557057%7Ceacef652-f47b-4c91-b0aa-39a290cb9662) [AtlasCamp talk](https://www.slideshare.net/GoAtlassian/atlascamp-2014-writing-connect-addons-for-confluence).{{% /tip %}}

We specify a [static content macro](/cloud/confluence/modules/static-content-macro/) like this:

``` bash
"modules": {
    "staticContentMacros": [{
        "url": "/v1/backgroundColor?color={color}&userKey={user.key}&pageId={page.id}&pageVersion={page.version}&macroHash={macro.hash}",
        "description": {
            "value": "Allow users to add a background colour around selected content."
        },
        "documentation": {
            "url" : "http://www.google.com"
        },
        "categories": ["formatting"],
        "outputType": "inline",
        "bodyType": "rich-text",
        "name": {
            "value": "Background Colour (Connect)"
        },
        "key": "bg-color-macro",
        "parameters": [{
            "identifier": "color",
            "name": {
                "value": "Color"
            },
            "type": "string",
            "required": true,
            "multiple": false
        }]
    }]
}
```

Once you have saved your descriptor, reload your browser, and create a new Confluence page. 

Now for the moment of truth - type "{back" - you should have results like below.

![open macro browser](/cloud/confluence/images/macro-open.png)


If we select it, the Confluence macro browser should appear, with the following:

![Confluence macro browser](/cloud/confluence/images/background-color-macro.png)

 

Awesome! How quick was that? With just a bit more code, we'll have a fully functional macro!

## Setting up a preview message

Let's now add two things:

-   A route on our add-on server to receive the parameters inputted by a user.
-   A view to be returned every time this route is hit.

Our routes are configured in **routes/index.js**,** **whilst our views are defined in the **views/background-color.hbs**.

``` javascript
 // Render the background-color macro.
app.get('/v1/backgroundColor', addon.authenticate(), function(req, res){

    //  Tell the add-on to send back the 'background-color' view as
    //  a HTTP response.
    res.render('background-color', {});
    
});
```

``` html
{{!< layout}}
{{!--
    If we have received a macro body, render it.
    Otherwise, show a preview screen/message.
--}}
<div style="background-color: {{{color}}};">
    {{#if body}}
        {{{body}}}
    {{else}}
        Here is a preview of your screen!
    {{/if}}
</div>
```
 

Our macro should now display *'Here is a preview of your screen!'*, like this:

![edit macro](/cloud/confluence/images/edit-macro.png)

 

Next, let's make the coloring mechanism work. Our final step will be applying this to the macro body. 

## Setting a color

In order to grab the color inputted by a user, we update our index.js handler to:

**routes/index.js**

``` javascript
// Render the background-color macro.
app.get('/v1/backgroundColor', addon.authenticate(), function(req, res){

    //  Grab all input parameters - sent through to us as query params.
    var color = req.query['color'];

    //  Tell the add-on to send back the 'background-color' view as
    //  a HTTP response.
    res.render('background-color', {
        color: color
    });

});
```

And...that's it! But how does it work? Looking at our descriptor:

1.  The color inputted by a user is sent to the add-on server with identifier 'color'. 
2.  This parameter is attached to our URL under the query parameter, 'color' - e.g. if we chose the color 'red' as above, the URL being hit in our add-on would be '/v1/backgroundColor?**color=red**'.

Finally, in our index.js handler, we extract this parameter, and pass it to our template. 

## But, where's the body?

Up until this stage, we have achieved the following things:

1.  Set up a static content macro, visible in the macro browser.
2.  Prompt the user for parameter values for this macro (color).
3.  Display 'Here's a preview of your screen!' both when previewing, and actually rendering the macro on page save.
4.  Displaying this message enclosed in the background color specified by us (yay!).

To make this macro fully functional, we now need to make it a little smarter. We are easily handling the case where our macro does NOT have a body. This however, is only true for the state of the macro on initial render. Once we have committed the contents of the macro to our Confluence page, our preview message is not required. Let's now discuss how to actually **get the body**. The keyword here is 'GET'. 


This REST call does the trick: 

``` javascript
getHTTPClient(clientKey, userKey).get(
    '/rest/api/content/' + pageId + '/history/' + pageVersion + '/macro/hash/' + macroHash, 
    function(err, response, contents){
        //  Handle response here.
    }
);
```

 

Let's step through the concepts above.

-   **getHTTPClient()**: This function wraps a method native to ACE, namely, addon.httpClient. It is defined as the following, and allows your add-on to execute REST methods complying to your host product's REST API methods.

    ``` javascript
    // Returns a HTTP client which can make calls to our host product.
    // @param clientKey formed when app created.
    // @param userKey formed when app created.
    // @returns {*} http client

    function getHTTPClient (clientKey, userKey){
        return addon.httpClient({
            clientKey : clientKey,
            userKey   : userKey,
            appKey    : addon.key
        });
    }
    ```

-   **pageId, pageVersion, macroHash:** In order to actually get the body of our macro, we need to know which page we were working on as well as its version, and a hash of the latest macro contents. This allows us to execute a REST call to [this endpoint](https://docs.atlassian.com/confluence/REST/latest/#d3e757). In order to allow for this to happen, we add a few more query parameters to our add-on URL, like so:

    ``` bash
    "staticContentMacros": [{
        //...More stuff above.
        "url": "/v1/backgroundColor?color={color}&pageId={page.id}&pageVersion={page.version}&macroHash={macro.hash}"
        //...More stuff below.
    }]
    ```

-   Lastly, we have introduced a **user\_key **and **clientKey. **We grab these credentials separately, without explicitly defining a query parameter:

    ``` javascript
    //  Grab credentials needed for setting up our httpClient.
    var userKey   = req.query['user_key'],
        clientKey = req.context.clientKey;
    ```

    They are exposed to use through the addon.authenticate() call we do in our route.

## Conclusion

Putting all of these together, and reworking our index.js handler, we get the following:

``` javascript
// Render the background-color macro.
app.get('/v1/backgroundColor', function(req, res){

    //  Grab all input parameters - sent through to us as query params.
    var color       = req.query['color'],
        pageId      = req.query['pageId'],
        pageVersion = req.query['pageVersion'],
        macroHash   = req.query['macroHash'],
        userKey     = req.query['user_key'];
    var clientKey = req.context.clientKey;

    //  Execute API request to get the macro body.
    getHTTPClient(clientKey, userKey).get(
        '/rest/api/content/' + pageId +
        '/history/' + pageVersion +
        '/macro/hash/' + macroHash,
        function(err, response, contents){

            //  If we've encountered errors, render an error screen.
            if(err || (response.statusCode < 200 || response.statusCode > 299)) {
                console.log(err);
                res.render('<strong>An error has occurred :( '+ response.statusCode +'</strong>');
            }

            //  Parse the response, and send the body through.
            contents = JSON.parse(contents);

            //  Render with required body.
            res.render('background-color', { body : contents.body, color: color });

        }
    );

});
```

 

Voila, a macro of our own making! As you can see, building a macro which can query a host product (and potentially external services) is pretty easy with ACE.

 