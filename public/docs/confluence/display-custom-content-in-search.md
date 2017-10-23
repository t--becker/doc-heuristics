---
title: "Display custom content in search"
platform: cloud
product: confcloud
category: devguide
subcategory: learning
patterns: patterns
date: "2017-03-17"
dac_edit_link:
- https://developer.atlassian.com/pages/editpage.action?cjm=wozere&pageId=39988673
- https://developer.atlassian.com/pages/editpage.action?cjm=wozere&pageId=39988790 
dac_view_link:
- https://developer.atlassian.com/pages/viewpage.action?cjm=wozere&pageId=39988673
- https://developer.atlassian.com/pages/viewpage.action?cjm=wozere&pageId=39988790
---

# Display custom content in search

Users need to be able to search for the [custom content](/cloud/confluence/custom-content) they create, so making it discoverable via Confluence's quick search and full search is very important. As the name implies, quick search will allow users to add search terms and see a list of possible matches, while full search allows them to further refine a search using filters.

## Display in the quick navigation search

Users access the quick search to search for add-on custom content by clicking the magnifying glass icon in the global navigation. Once open, users enter search terms and Confluence will return a series of likely matches.

![quick nav search](/cloud/confluence/images/quick-nav-search.png)

{{% tip %}} Type "/" to jump straight into the quick search field and start typing your search terms.{{% /tip %}}

### Graphic elements required

An icon for your content type with the following specs:

-   16x16px in size, optimized for retina display
-   Transparent background
-   Line weight of 1px for icon graphics
-   Color `#707070` only

### When will this icon be used?

Confluence uses your icon in the quick search results to help users easily identify different content types. Having a distinctive icon helps distinguish your custom content, particularly when other types of content may have a similar title.

If you don't provide an icon, we'll use the default object attachment icon ![default](/cloud/confluence/images/default.png).

![display in nav](/cloud/confluence/images/displayinnav.png)

### Recommendations

-   Don't use colored icons.
-   Use simple graphics that are easily recognizable at small sizes.


## Display in the full search

The full search allows users to add filters to their search terms to further refine the results. For example, users can search for content created by a particular user, or they can limit their search to one or more spaces. Take a look at [our page on searching in Confluence](https://confluence.atlassian.com/confcloud/search-724765412.html#Search-Fullsearch) for more about search filters.

![search results](/cloud/confluence/images/search-results-crop.png)

### Graphic elements required

An icon of your content type with the following specs:

-   16x16px in size, optimized for retina display
-   Transparent background
-   Line weight of 1px for icon graphics
-   Color `#707070` only

If you don't provide an icon, we'll use the default object attachment icon ![default](/cloud/confluence/images/default.png).

### How do I optimize this?

The full search provides additional functionality to help users find the right content. You can use the [search extension pattern](/cloud/confluence/search-extensions) to help users when they're trying to find custom content.

### How does this interaction work?

Users can type keywords into the quick search, then hit Enter or choose the "Search for" option at the end of the list of results:

-   Results show in the full screen as a list.
-   Users can apply additional filters to help narrow down the results.

### UI components in the flow

![search results](/cloud/confluence/images/search-results.png)

### Recommendations

-   Don't use colored icons.
-   Use simple graphics that are easily recognizable at small sizes.

 

