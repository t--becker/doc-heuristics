---
title: "Create a Confluence theme"
platform: cloud
product: confcloud
category: devguide
subcategory: learning
guides: tutorials
---

# Create a Confluence theme

Theming lets you change the [look and feel](/cloud/confluence/theme-properties) of Confluence. You can affect certain aspects within one Confluence space, like a blog post or page, or apply styling changes across all spaces on a Confluence site. A well-designed [theme](/cloud/confluence/theme) helps guide the user and shape their experience as they view and interact with Confluence content.

## Prerequisites

Before you start, make sure you've worked through the [Getting started tutorial](/cloud/confluence/getting-started).

## Create an empty Connect theme

First, we'll set up a Connect project and define a Confluence Connect theme. By the end of this section you won't yet have a functioning theme (we'll get to that), but you'll understand the basics of how a theme is defined.

1.  Create a new Connect add-on with [atlas-connect](https://www.npmjs.com/package/atlas-connect) and install the required npm dependencies.
    Enter the following in the command line:

    ``` bash
    atlas-connect new example-connect-theme
    cd example-connect-theme
    npm install
    ```

2.  Add a new Confluence theme to your add-on descriptor in `atlassian-*connect.json`:

    ``` javascript
    "confluenceThemes": [{
        "key": "my-first-theme",
        "routeOverride": false,
        "availableGlobally": true,
        "icon": {
            "width": 110,
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
        }
    }]
    ```

3.  In the command line, run `npm start`.

    {{% note %}}The `availableGlobally` property determines whether your theme can be applied globally, as the default for all new spaces, or whether it can only be applied to individual spaces. In this example, we've set `availableGlobally` to `true`. Because of that, your theme will now appear on the Confluence admin themes page.{{% /note %}}

4. Head to ![cog icon](/cloud/confluence/images/cog.png) &gt; **General configuration** &gt; **Themes** to find your theme.

    ![select theme](/cloud/confluence/images/select-theme.png)

Nice work! You've just created a Confluence theme.

## Override the space home page (optional)

You can replace the space home page with a completely different experience. Rather than displaying a regular Confluence page when users visit a space using your theme, you can define an experience more suited to your theme.

To do this, we'll tell Confluence to load the URL `/space/{space.key}` from your Connect add-on when the theme is enabled.

1.  **Turn on the space home override** We previously added a property in the descriptor, `routeOverride`, and set it to `false`. Change the value of `routeOverride` to `true`, which tells Confluence we're overriding the space home experience.   
   
2.  **Create a route handler** We previously added this snippet in the connect module in `atlassian-connect.json`:

    ``` javascript
    "routes": {
        "spaceview": {
            "url": "/space/{space.key}"
        }
    }
    ```

    Now, we're going to create a route handler to handle requests to `/space/{space.key}`.

3.  Add the following route handler to `routes/index.js` to replace the space home page with a generic "Hello World" page:

    ``` javascript
    app.get('/space/:spaceKey', addon.authenticate(), function (req, res) {
            res.render('hello-world', {
                title: 'Atlassian Connect'
            });
        }
    );
    ```

4.  Restart your add-on with `npm start` in the command line.

5.  To ensure everything is working up to this point, do either of the following:
    -   **Enable the theme for the whole site** Go to ![cog icon](/cloud/confluence/images/cog.png) &gt; **General configuration** &gt; **Themes** and select your theme.
    -   **Enable the theme for one space** Go to the space, choose **Space tools** &gt; **Look and Feel** &gt; **Themes** and select your theme.   
             

6.  Go to a space the theme is applied to, and you should now see this page:
        
    ![hello world space home](/cloud/confluence/images/hello-world-space-home.png)
        
    Next, we create the new space home page. We'll make our own space home override by adding a new template file to `view`, Javascript file to `public/js`, and stylesheet file to `public/css`.

7.  Add the file `view/my-space-home.hbs` with the following:

    ``` xml
    {{!< layout}}
    <div id="main">
        <div class="main-container">
            <div class="search-area">
                <h1 class="headings">{{ title }}</h1>
                <input type="text" class="search-box" placeholder="Search for content within this space" />
            </div>
            <div class="content">
                <p class="newspaper">
                    <span class="title">Lorem ipsum</span><br> dolor sit amet, consectetur adipiscing elit.
                    Ut in nulla vitae elit faucibus lobortis at vel nibh.
                </p>
            </div>
        </div>
    </div>
    ```

8.  Change `routes/index.js` to:   

    ``` javascript
    app.get('/space/:spaceKey', addon.authenticate(), function (req, res) {
            res.render('space-home', {
                title: 'Welcome to Theme Home'
            });
        }
    );
    ```

7.  Add any CSS rules for styling your space home to `public/css/addon.css`.
8.  Restart your add-on with `npm start` in the command line.
9.  Make sure your theme is still enabled for your current space, then head to the space.

    You should see your new space home page.

    ![space home](/cloud/confluence/images/space-home.png)

    From here, it's up to you to decide what your space home experience is like.

### Related topics

-   [Theme properties](/cloud/confluence/theme-properties)
-   [Theme](/cloud/confluence/theme)