---
title: "Theme"
platform: cloud
product: confcloud
category: devguide
subcategory: learning
patterns: patterns
---

# Theme

Theming lets you change the [look and feel](/cloud/confluence/theme-properties) of Confluence. Your [theme](/cloud/confluence/create-a-confluence-theme) can change styling for all spaces on a Confluence site, or be applied on a space-by-space basis. You can also choose to affect certain aspects within a space, like the space home page, other pages and blog posts, and the Confluence header.

Themes aren't just for show, though --- they can help emphasize parts of the UI, and guide and influence user behavior in Confluence. When you're designing a theme for commercial use, it's a good idea to define its purpose and understand how you'd like users to experience it.

## Create an empty Connect theme

To get down the basics of creating and managing a theme, you can [create an empty Connect theme](/cloud/confluence/create-a-confluence-theme#create-an-empty-connect-theme). During this process you'll set up a Connect project and begin defining the theme in preparation for further customization using [`lookAndFeel` properties](/cloud/confluence/theme-properties).

## Change the look and feel

By utilizing a slew of [`lookAndFeel` properties](/cloud/confluence/theme-properties) you can easily change the look and feel of pages, blog posts, and the Confluence header for any space.

### Example look and feel

Here's a complete example of a theme changing the look and feel of Confluence:

``` css
"lookAndFeel": {
    "headings": {
        "color": "#333333"
    },
    "links": {
        "color": "#732D3E"
    },
    "menus": {
        "hoverOrFocus": {
            "backgroundColor": "#3873AE"
        },
        "color": "#732D3E"
    },
    "bordersAndDividers": {
        "color": "#0D0E0E"
    },
    "header": {
        "backgroundColor": "#661F2D",
        "button": {
            "backgroundColor": "#894E59",
            "color": "#FFFFFF"
        },
        "primaryNavigation": {
            "hoverOrFocus": {
                "backgroundColor": "#863647",
                "color" : "#FFFFFF"
            },
            "color": "#FFFFFF"
        },
        "secondaryNavigation": {
            "hoverOrFocus": {
                "backgroundColor": "#863647",
                "color": "#FFFFFF"
            },
            "color": "#000000"
        },
        "search": {
            "backgroundColor": "#9A636B",
            "color": "#FFFFFF"
        }
    },
    "content": {
        "screen": {
            "layer": {
                "height": "250px",
                "width": "100%",
                "backgroundImage": "url('//img/skyline_pink.jpg')",
                "backgroundSize": "cover",
                "backgroundRepeat": "no-repeat"
            },
            "background": "linear-gradient(45deg, rgba(176,104,112,1) 0%, rgba(244,212,216,1) 100%)",
            "gutterTop": "20px",
            "gutterRight": "small",
            "gutterBottom": "none",
            "gutterLeft": "small"
        },
        "container": {
            "background": "#F4D4D8",
            "padding": "0 20px",
            "borderRadius": "10px"
        },
        "header": {
            "background": "rgba(0, 0, 0, 0.2)",
            "padding": "20px 0  90px 20px",
            "borderRadius": "5px 5px 0 0"
        },
        "body": {
            "background": "#FFFFFF",
            "padding": "10px",
            "borderRadius": "0 0 5px 5px"
        }
    }
}
```

## Customize space home page

Rather than displaying the default Confluence page when users visit your space, you can [override the space home page](/cloud/confluence/create-a-confluence-theme#override-the-space-home-page-optional) and apply your own custom template. This option enables you to define your space home experience to one that is more suitable to your theme.

## Installing and selling your theme

Once you've completed styling your theme and customizing the home page experience, you can make your creation available to others using the [Atlassian Marketplace](https://marketplace.atlassian.com/).


### Related topics

-   [Create a Confluence theme](/cloud/confluence/create-a-confluence-theme)
-   [Theme properties](/cloud/confluence/theme-properties)
