---
title: "Theme properties"
platform: cloud
product: confcloud
category: devuide
subcategory: learning
patterns: patterns
date: "2017-04-24"
---

# Theme properties

You can change the look and feel of pages, blog posts, and the Confluence header by applying `lookAndFeel` properties to your [Confluence theme](/cloud/confluence/create-a-confluence-theme).

## Add a look and feel property

The `lookAndFeel` properties aren't mandatory. If you don't specify a value, default values are used.

To add a `lookAndFeel` property (detailed in the sections below for [headers](#header-properties), [headings](#heading-properties), [links](#links-properties), [menus](#menus-properties), and [content](#content-properties)) in your `confluenceThemes` module in `atlassian-connect.json`:

``` javascript
"confluenceThemes": [{
    "key": "my-first-theme",
    "routeOverride": false,
    "availableGlobally": true,
    "icon": {
        "width":110,
        "height": 70,
        "url":"/icon.png"
    },
    "name": {
        "value": "Hello World Theme"
    },
    "description": {
        "value": "My first Connect theme."
    },
    "routes": {
        "spaceview": {
            "url": "/space/{space.key}"
        }
    },
    "lookAndFeel": {
        // Your look and feel settings go here.
    }
}]
```

To specify a black header for your theme, for instance, add a `lookAndFeel` property in your `confluenceThemes` module in `atlassian-connect.json`:

``` javascript
"confluenceThemes": [{
    ...
    "lookAndFeel": {
        "header": {
            "backgroundColor": "#000000"
                ...
        }
        ...
    }
}]
```

## Header properties

`lookAndFeel.header.backgroundColor`

This property changes the background color of the Confluence header.

*Example with the value set to `#666666`*
![grey header](/cloud/confluence/images/grey-header.png)   


`lookAndFeel.header.primaryNavigation.hoverOrFocus.backgroundColor`

This property changes the background color when hovering menu items in the Confluence header.

*Example with the value set to `#FF8C00`*
![orange hover](/cloud/confluence/images/orange-hover.png)  

   
`lookAndFeel.header.primaryNavigation.hoverOrFocus.color` 

This property changes the text color when hovering menu items in the Confluence header.

*Example with value set to `#FFFF00`*  
![yellow text hover](/cloud/confluence/images/yellow-text-hover.png)   

   
`lookAndFeel.header.primaryNavigation.color` 

This property changes the text color for menu items in the Confluence header.

*Example with the value set to `#000000`*
![black header menu text](/cloud/confluence/images/black-header-menu-text.png)   

   
`lookAndFeel.header.secondaryNavigation.hoverOrFocus.backgroundColor`  

This property changes the background color when hovering drop-down menus in the Confluence header.

*Example with the value set to `#FFFF00`*  
![yellow highlight menu items](/cloud/confluence/images/yellow-highlight-menu-items.png)  

   
`lookAndFeel.header.secondaryNavigation.hoverOrFocus.color`  

This property changes the text color when hovering drop-down menus in the Confluence header.

*Example with the value set to `#000000`*  
![yellow highlight menu items](/cloud/confluence/images/yellow-highlight-menu-items.png)  

   
`lookAndFeel.header.secondaryNavigation.color`  

This property changes the text color of items in drop-down menus that extend from the Confluence header.

*Example with the value set to `#999999`*  
![yellow highlight menu items](/cloud/confluence/images/yellow-highlight-menu-items.png)    


`lookAndFeel.header.search.backgroundColor`  

This property changes the background color of the search box in the Confluence header.

*Example with the value set to `#CC0000`*
![red search field](/cloud/confluence/images/red-search-field.png)      


`lookAndFeel.header.search.color` 

This property changeshanges the text color of the search box in the Confluence header.

*Example with the value set to `#FFFFFF`*  
![red search field](/cloud/confluence/images/red-search-field.png)        


`lookAndFeel.header.button.backgroundColor` 

This property changes the background color of the Create button in the Confluence header.

*Example with the value set to `#FF8C00`*  
![orange create button](/cloud/confluence/images/orange-create-button.png)   


`lookAndFeel.header.button.color`  

This property changes the text color of the **Create** button in the Confluence header (currently not applied to the ellipsis ![ellipsis](/cloud/confluence/images/ellipsis.png)).

*Example with the value set to `#CC0000`*  
![red create text](/cloud/confluence/images/red-create-text.png)   


## Heading properties


`lookAndFeel.headings.color` 

This property applies to HTML H1 to H6 tags.

*Example with the value set to `#990000`*  
![red HTML headings](/cloud/confluence/images/red-html-headings.png)   


## Links properties

`lookAndFeel.links.color` 

This property applies to a variety of anchors.

*Example with the value set to `#FF8C00`*  
![orange links](/cloud/confluence/images/orange-links.png)   


## Menus properties

`lookAndFeel.menus.hoverOrFocus.backgroundColor` 

This property changes the background color of drop-down menus inside pages when hovering, like the network macro auto-complete menu.

*Example with the value set to `#C99366`*  
![brown page menu items](/cloud/confluence/images/brown-page-menu-items.png)   


`lookAndFeel.menus.color` 

This property changes the text color of drop-down menus. For example, the more actions menu ![ellipsis](/cloud/confluence/images/ellipsis.png) and the **Space tools** menu.

*Example with the value set to `#722837`*  
![red page menu text](/cloud/confluence/images/red-page-menu-text.png)   


## Content properties

`lookAndFeel.content.screen.gutterTop`  

This property modifies the gutter between the content for pages and blog posts and the Confluence header. Allowed values are: `none`, `default`, `height` (in pixels), and `percentage`.

**`lookAndFeel.content.screen.gutterRight`**  

This property modifies the gutter on the right of the content for pages and blog posts. Allowed values are: `none`, `default`, `small`, `medium`, and `large`.


**`lookAndFeel.content.screen.gutterBottom`**  

This property modifies the gutter between the content for pages, blog posts and the footer. Allowed values are: `none`, `default`, `eight` (in pixels), and `percentage`.


**`lookAndFeel.content.screen.gutterLeft`**  

This property modifies the gutter on the left of the content for pages and blog posts. Allowed values are: `none`, `small`, `medium`, and `large`.

*Example with `gutterLeft` set to `medium`, `gutterTop` set to `20px`, `gutterRight` set to `small`, and `gutterBottom` set to `none`*  
![gutters](/cloud/confluence/images/gutters.png)   


`lookAndFeel.content.screen.background`  
`lookAndFeel.content.screen.background-color`  
`lookAndFeel.content.screen.background-image`  
`lookAndFeel.content.screen.background-repeat`  
`lookAndFeel.content.screen.background-size*`  
`lookAndFeel.content.screen.background-clip`  
`lookAndFeel.content.screen.background-attachment`  
`lookAndFeel.content.screen.background-origin`  
`lookAndFeel.content.screen.background-position`  
`lookAndFeel.content.screen.background-blend-mode`  

These properties modify the background of Confluence content. All CSS3 background properties found in the [MDN reference](https://developer.mozilla.org/en/docs/Web/CSS/background) are supported.

*Example with the `background` property set to `linear-gradient(45deg, rgba(176,104,112,1) 0%, rgba(244,212,216,1) 100%)`*
![gradient background](/cloud/confluence/images/gradient-background.png)   


`lookAndFeel.content.screen.layer.background`  
`lookAndFeel.content.screen.layer.background-color`  
`lookAndFeel.content.screen.layer.background-image`  
`lookAndFeel.content.screen.layer.background-repeat`   
`lookAndFeel.content.screen.layer.background-size`   
`lookAndFeel.content.screen.layer.background-clip`  
`lookAndFeel.content.screen.layer.background-attachment`  
`lookAndFeel.content.screen.layer.background-origin`  
`lookAndFeel.content.screen.layer.background-position`  
`llookAndFeel.content.screen.layer.background-blend-mode`  

These properties modify the background of the layer behind Confluence content and above the screen. All CSS3 background properties found in the [MDN Reference](https://developer.mozilla.org/en/docs/Web/CSS/background) are supported.

*Example with the `background` property set to `{url('/img/sunset-beach.jpg') no-repeat 0 0/cover` (screen layer width of `250px` and height of `100%`)*  
![sunset image top](/cloud/confluence/images/sunset-image-top.png)   


`lookAndFeel.content.screen.layer.width`  
`lookAndFeel.content.screen.layer.height`  

These properties modify the width and height of the layer behind Confluence content and above the screen. Allowed values are: `length` (in pixels) and `percentage`.

*Example*  
![red page menu text](/cloud/confluence/images/red-page-menu-text.png)  


`lookAndFeel.content.container.background`  
`lookAndFeel.content.container.background-color`  
`lookAndFeel.content.container.background-image`  
`lookAndFeel.content.container.background-repeat`  
`lookAndFeel.content.container.background-size`  
`lookAndFeel.content.container.background-clip`  
`lookAndFeel.content.container.background-attachment`  
`lookAndFeel.content.container.background-origin`  
`lookAndFeel.content.container.background-position`  
`lookAndFeel.content.container.background-blend-mode`  

The container refers to the surrounding element for the content header, content body, and comments. This background style will apply to the container if no background values are specified for header or body.

*Example with the value set to `rgba(0, 0, 0, 0.2)` (container padding of `40px` and border radius of `10px`)*  
![grey container](/cloud/confluence/images/grey-container.png)  


`lookAndFeel.content.container.padding`   

This property applies padding to the container element. The padding style will apply to the container if no padding values are specified for header or body.


`lookAndFeel.content.container.borderRadius`  

This property changes the border radius of the container element. The border radius style will apply to the container if no border radius values are specified for the header or body. Allowed values are: `length` (in pixels) and `percentage`.


`lookAndFeel.content.header.background`  
`lookAndFeel.content.header.background-color`  
`lookAndFeel.content.header.background-image*`  
`lookAndFeel.content.header.background-repeat`  
`lookAndFeel.content.header.background-size`  
`lookAndFeel.content.header.background-clip`  
`lookAndFeel.content.header.background-attachment`  
`lookAndFeel.content.header.background-origin`  
`lookAndFeel.content.header.background-blend-mode`  

These properties modify the background of the content header. All CSS3 background properties found in the [MDN Reference](https://developer.mozilla.org/en/docs/Web/CSS/background) are supported.

*Example with the value set to `rgba(0, 0, 0, 0.2)` (content header padding of `20px 0 90px 20px` and border radius of `5px 5px 0 0`)*  
![translucent header](/cloud/confluence/images/translucent-header.png)   


`lookAndFeel.content.header.padding`  

This property changes the padding for the content header.


`lookAndFeel.content.header.borderRadius`   

This property changes the border radius of the content header.


`lookAndFeel.content.body.background`  
`lookAndFeel.content.body.background-color`  
`lookAndFeel.content.body.background-image`  
`lookAndFeel.content.body.background-repeat`  
`lookAndFeel.content.body.background-size`  
`lookAndFeel.content.body.background-clip`  
`lookAndFeel.content.body.background-attachment`  
`lookAndFeel.content.body.background-origin`  
`lookAndFeel.content.body.background-position`  
`lookAndFeel.content.body.background-blend-mode`  

These properties modify the background of the content body and comments. All CSS3 background properties found in the [MDN Reference](https://developer.mozilla.org/en/docs/Web/CSS/background) are supported.

*Example with the background property set to `url('/img/skyline-pink-grey.jpg'), no-repeat center bottom` (content body padding of `0 40px 40px 40px` and border radius of `0 0 5px 5px` )*  
![content body image](/cloud/confluence/images/content-body-image.png)


`lookAndFeel.content.body.padding`  

This property changes the padding on the content body and supports the CSS padding shorthand property as defined in the [MDN Reference](https://developer.mozilla.org/en/docs/Web/CSS/padding).

The example above shows the value set to `0 40px 40px 40px`.


`lookAndFeel.content.body.borderRadius`  

This property changes the border radius of the content body and supports the CSS border-radius shorthand property as defined in the [MDN Reference](https://developer.mozilla.org/en/docs/Web/CSS/border-radius).

*Example with the value set to `0 0 20px 20px`*  
![rounded bottom border radius](/cloud/confluence/images/rounded-bottom-border-radius.png)


### Related topics

-   [Create a Confluence theme](/cloud/confluence/create-a-confluence-theme)
-   [Theme](/cloud/confluence/theme)