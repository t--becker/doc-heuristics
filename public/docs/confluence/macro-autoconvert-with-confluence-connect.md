---
title: "Macro autoconvert with Confluence Connect"
platform: cloud
product: confcloud
category: devguide
subcategory: learning
guides: guides
date: "2016-11-17"
aliases:
- confcloud/macro-autoconvert-with-confluence-connect-41224402.html
- /confcloud/macro-autoconvert-with-confluence-connect-41224402.md
dac_edit_link: https://developer.atlassian.com/pages/editpage.action?cjm=wozere&pageId=41224402
dac_view_link: https://developer.atlassian.com/pages/viewpage.action?cjm=wozere&pageId=41224402
confluence_id: 41224402
---
# Macro autoconvert with Confluence Connect

<table>
<colgroup>
<col width="50%" />
<col width="50%" />
</colgroup>
<tbody>
<tr class="odd">
<td><strong>Description</strong></td>
<td>Add autoconvert patterns to your macro experience.</td>
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

## Macro magic

Macros are arguably the most powerful capabilities provided by the Confluence Editor. As an add-on developer, building a macro is a quick process, as outlined in our [Getting started tutorial](/cloud/confluence/getting-started). However, Confluence Connect macros come bundled with extra behaviors and customizations - ensuring you are able to develop and guide users through the add-on experience you desire.

Let's take a quick look at macro autoconvert --- a feature which allows for intelligent insertion of macros to the Confluence Editor (below is also a sneak peak of the [Macro Custom Editor with Confluence Connect](/cloud/confluence/macro-custom-editor-with-confluence-connect)).
 

![macro autoconvert giphy](/cloud/confluence/images/giphy-1.gif)

So, what happened here?

**Autoconvert**: We pasted the link, [http://giphy.com/gifs/l3E6xxDZC4AADCAE0](http://giphy.com/gifs/l3E6xxDZC4AADCAE0), into our Confluence page, and it auto-created an instance of the GIPHY macro, with this URL set. 
     

As a developer, this gives you extra control over the behavior of the macros you introduce into Confluence. Pretty awesome, right? Let's take a look at how to do this. ** **

{{% tip %}}If you haven't already built a basic GIPHY macro, check out the [Getting started tutorial](/cloud/confluence/getting-started)! It'll only take you a few minutes!{{% /tip %}}

## From URL to macro

Autoconvert works in a simple but powerful way.

By declaring URL patterns in our atlassian-connect.json descriptor, Confluence ensures that any pasted URLs which match these patterns are autoconverted to an instance of our macro, with a specific parameter set. This occurs by registering specific "matchers" in our macro module descriptor.

For example, if we specify a pattern of [http://giphy.com/](http://giphy.com/) and relate this to the `url` parameter of our GIPHY macro, all pasted URLs which match this pattern will be converted to an instance of our GIPHY macro with the url set to [http://giphy.com/{}](http://giphy.com/).

{{% note %}} "**{}**" denotes a wildcard pattern match. This allows the above pattern to match both of these urls:

  - [http://giphy.com/123](http://www.youtube.com/123)
  - [http://giphy.com/abc123](http://www.youtube.com/abc123)

If we were to for example, have a URL like [http://giphy.com/{}/](https://www.giphy.com), this would match:

  - [http://giphy.com/123/456](http://giphy.com/123/456)
  - [http://giphy.com/hello/world](http://giphy.com/hello/world)

You can use as many wildcards in the same pattern, allowing for some complex URL matching!{{% /note %}}

The magic happens in our plugin descriptor. Add the following to the GIPHY module defined under 'dynamicContentMacros': 

``` javascript
{
  "autoconvert": {
    "urlParameter": "url",
    "matchers": [
      {
        "pattern": "http://giphy.com/gifs/{}"
      }
    ]
  }
}
```

*The key to remember here is, if we are specifying that the "urlParameter" is "url" as above, we must have a parameter with an "identifier" of "url" in our plugin descriptor.*

For the above example we may have the following macro parameter defined: 

``` bash
"parameters": [
  {
    "identifier": "url",
    "name": {
      "value": "URL"
    },
    "description": {
      "value": "Giphy URL."
    },
    "type": "string",
    "required": true
  }
]
```

We must also ensure that the rest of our macro parameters are not required (or in other words, have default parameter values), otherwise the macro editor will appear when a URL is pasted.

To see an example of more complex URL matching in play for GIPHY, check out the full [atlassian-connect.json descriptor here](https://bitbucket.org/atlassian/confluence-giphy-addon/src/5d34957b0c2769d0f4202ee848e94a77e88d03e8/atlassian-connect.json?fileviewer=file-view-default#atlassian-connect.json-68)!

## Creating a macro through autoconvert

What more is involved here?

Nothing, that's it! Try pasting a link such as [http://giphy.com/gifs/applause-clapping-clap-aLdiZJmmx4OVW](http://giphy.com/gifs/applause-clapping-clap-aLdiZJmmx4OVW) into your Confluence editor. You should see the following: 
 

![this is pretty awesome giphy](/cloud/confluence/images/image2016-8-12-14-25-2.png)

 

Simple and awesome!
