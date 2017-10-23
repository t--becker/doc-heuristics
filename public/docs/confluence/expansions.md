---
title: "Expansions"
platform: cloud
product: confcloud
category: reference
subcategory: api
date: "2016-11-18"
aliases:
- confcloud/expansions-in-the-rest-api-39985838.html
- /confcloud/expansions-in-the-rest-api-39985838.md
dac_edit_link: https://developer.atlassian.com/pages/editpage.action?cjm=wozere&pageId=39985838
dac_view_link: https://developer.atlassian.com/pages/viewpage.action?cjm=wozere&pageId=39985838
confluence_id: 39985838 
---
# Expansions in the REST API

{{% tip %}}The examples on this page use `curl`, and the responses are piped into `python -mjson.tool`.{{% /tip %}}

The Confluence REST API supports the expansion of certain elements in order to limit the number of calls to the API and the size of the responses. If your `GET` returns a list of results and you don't choose to expand anything, the response is terse, displaying only a basic representation of the resource. It will, however, include a list of the expandable items for the resource.

If you `GET` a specific piece of content, like a page by page ID (`https://your-domain.atlassian.net/wiki/rest/api/content/12345` where `12345` is the page ID), we expand some properties by default. For a specific page, we'll expand the space, history, and version information, but you can explicitly request expansion of different properties in your call.

In this example, we'll send a `GET` to return a list of pages in the space with the space key, `TEST`:

``` bash
curl -u admin@example.com:password -X GET "https://your-domain.atlassian.net/wiki/rest/api/content?type=page&spaceKey=TEST"  | python -mjson.tool
```

{{% note %}}Only `id`, `status`, `title` and `type` are expanded, but the _expandable block contains the properties that can be expanded.{{% /note %}}


``` bash
{
    "_links": {
        "base": "https://your-domain.atlassian.net/wiki",
        "context": "",
        "self": "https://your-domain.atlassian.net/wiki/rest/api/content"
    },
    "limit": 25,
    "results": [
        {
            "_expandable": {
                "ancestors": "",
                "body": "",
                "children": "/rest/api/content/589828/child",
                "container": "",
                "descendants": "/rest/api/content/589828/descendant",
                "history": "/rest/api/content/589828/history",
                "metadata": "",
                "space": "/rest/api/space/TEST",
                "version": ""
            },
            "_links": {
                "self": "https://your-domain.atlassian.net/wiki/rest/api/content/589828",
                "tinyui": "/x/BAAJ",
                "webui": "/display/TEST/Test+Space+Home"
            },
            "id": "589828",
            "status": "current",
            "title": "Test Space Home",
            "type": "page"
        }
    ],
    "size": 1,
    "start": 0
}
```

{{% note %}}In the above example, even though there's only one piece of content returned, nothing is expanded by default because we didn't request a specific piece of content. However, we do get a list of expandable items.{{% /note %}}

## Expand one or more items

As shown in the above example, you can use the `expand` parameter to explicitly expand any or all of the following items relating to the returned content item(s): history, body, container, ancestors, children, descendants, space, version, and metadata. Rather than creating multiple calls to return the information you need, you can make one call and only expand the items you need for your purpose.

If you need to expand more than one item, you can add them as a comma-separated list in the expand parameter. For example, if you need the `history` and `version` information for the resource(s):

``` bash
curl -u admin@example.com:password -X GET "https://your-domain.atlassian.net/wiki/rest/api/content?type=page&spaceKey=TEST&expand=history,version" | python -mjson.tool
```

{{% note %}}That version and history are expanded because we specified `expand=version,history` as a query parameter in the request.{{% /note %}}

``` bash
{
    "_links": {
        "base": "https://your-domain.atlassian.net/wiki",
        "context": "",
        "self": "https://your-domain.atlassian.net/wiki/rest/api/content"
    },
    "limit": 25,
    "results": [
        {
            "_expandable": {
                "ancestors": "",
                "body": "",
                "children": "/rest/api/content/589828/child",
                "container": "",
                "descendants": "/rest/api/content/589828/descendant",
                "metadata": "",
                "space": "/rest/api/space/TEST"
            },
            "_links": {
                "self": "https://your-domain.atlassian.net/wiki/rest/api/content/589828",
                "tinyui": "/x/BAAJ",
                "webui": "/display/TEST/Test+Space+Home"
            },
            "history": {
                "_expandable": {
                    "lastUpdated": "",
                    "nextVersion": "",
                    "previousVersion": ""
                },
                "_links": {
                    "self": "https://your-domain.atlassian.net/wiki/rest/api/content/589828/history"
                },
                "createdBy": {
                    "displayName": "Gil Admin",
                    "profilePicture": {
                        "height": 48,
                        "isDefault": true,
                        "path": "/s/en_GB/5723/dfa6f4056bde4993312ffa3cb0f626ca41e68821.1/_/images/icons/profilepics/default.png",
                        "width": 48
                    },
                    "type": "known",
                    "userKey": "2c968271494ecbb701494ecc80dd0002",
                    "username": "admin"
                },
                "createdDate": "2014-10-27T11:57:01.915+1100",
                "latest": true
            },
            "id": "589828",
            "status": "current",
            "title": "Test Space Home",
            "type": "page",
            "version": {
                "by": {
                    "displayName": "Gil Admin",
                    "profilePicture": {
                        "height": 48,
                        "isDefault": true,
                        "path": "/s/en_GB/5723/dfa6f4056bde4993312ffa3cb0f626ca41e68821.1/_/images/icons/profilepics/default.png",
                        "width": 48
                    },
                    "type": "known",
                    "userKey": "2c968271494ecbb701494ecc80dd0002",
                    "username": "admin"
                },
                "minorEdit": false,
                "number": 3,
                "when": "2014-10-27T14:17:30.558+1100"
            }
        }
    ],
    "size": 1,
    "start": 0
}
```

The above response provides an expanded view of the page history and version information. You should also notice that the expanded items can also contain nested items that can be further expanded. The 'history' element also contains: nextVersion, previousVersion, and lastUpdated, which can all be expanded in the response.

## Expand nested items

As well as using a comma-separated list for expanding multiple elements, you can use dot-separated notation to expand nested elements.

For example, if you only need the history expanded, but you want to expand `lastUpdated`:

``` bash
curl -u admin@example.com:password -X GET "https://your-domain.atlassian.net/wiki/rest/api/content?type=page&spaceKey=TEST&expand=history.lastUpdated" | python -mjson.tool
```

{{% note %}}The history object now includes the expanded `lastUpdated` object.{{% /note %}}

``` bash
{
    "_links": {
        "base": "https://your-domain.atlassian.net/wiki",
        "context": "",
        "self": "https://your-domain.atlassian.net/wiki/rest/api/content"
    },
    "limit": 25,
    "results": [
        {
            "_expandable": {
                "ancestors": "",
                "body": "",
                "children": "/rest/api/content/589828/child",
                "container": "",
                "descendants": "/rest/api/content/589828/descendant",
                "metadata": "",
                "space": "/rest/api/space/TEST",
                "version": ""
            },
            "_links": {
                "self": "https://your-domain.atlassian.net/wiki/rest/api/content/589828",
                "tinyui": "/x/BAAJ",
                "webui": "/display/TEST/Test+Space+Home"
            },
            "history": {
                "_expandable": {
                    "nextVersion": "",
                    "previousVersion": ""
                },
                "_links": {
                    "self": "https://your-domain.atlassian.net/wiki/rest/api/content/589828/history"
                },
                "createdBy": {
                    "displayName": "Gil Admin",
                    "profilePicture": {
                        "height": 48,
                        "isDefault": true,
                        "path": "/s/en_GB/5723/dfa6f4056bde4993312ffa3cb0f626ca41e68821.1/_/images/icons/profilepics/default.png",
                        "width": 48
                    },
                    "type": "known",
                    "userKey": "2c968271494ecbb701494ecc80dd0002",
                    "username": "admin"
                },
                "createdDate": "2014-10-27T11:57:01.915+1100",
                "lastUpdated": {
                    "by": {
                        "displayName": "Gil Admin",
                        "profilePicture": {
                            "height": 48,
                            "isDefault": true,
                            "path": "/s/en_GB/5723/dfa6f4056bde4993312ffa3cb0f626ca41e68821.1/_/images/icons/profilepics/default.png",
                            "width": 48
                        },
                        "type": "known",
                        "userKey": "2c968271494ecbb701494ecc80dd0002",
                        "username": "admin"
                    },
                    "minorEdit": false,
                    "number": 3,
                    "when": "2014-10-27T14:17:30.558+1100"
                },
                "latest": true
            },
            "id": "589828",
            "status": "current",
            "title": "Test Space Home",
            "type": "page"
        }
    ],
    "size": 1,
    "start": 0
}
```

## Modify expanded elements

Another example would be expanding the body of returned content in Confluence storage format (XHTML). If you `GET` the body in storage format, you can then `PUT` changes to that information to update the content. We'll also expand the version in this call, as we'll need to increment the version number when we `PUT` our changes.

``` bash
curl -u admin@example.com:password -X GET "https://your-domain.atlassian.net/wiki/rest/api/content?type=page&spaceKey=TEST&expand=body.storage,version" | python -mjson.tool
```

``` bash
{
    "_links": {
        "base": "https://your-domain.atlassian.net/wiki",
        "context": "",
        "self": "https://your-domain.atlassian.net/wiki/rest/api/content"
    },
    "limit": 20,
    "results": [
        {
            "_expandable": {
                "ancestors": "",
                "children": "/rest/api/content/589828/child",
                "container": "",
                "descendants": "/rest/api/content/589828/descendant",
                "history": "/rest/api/content/589828/history",
                "metadata": "",
                "space": "/rest/api/space/TEST"
            },
            "_links": {
                "self": "https://your-domain.atlassian.net/wiki/rest/api/content/589828",
                "tinyui": "/x/BAAJ",
                "webui": "/display/TEST/Test+Space+Home"
            },
            "body": {
                "_expandable": {
                    "anonymous_export_view": "",
                    "editor": "",
                    "export_view": "",
                    "view": ""
                },
                "storage": {
                    "_expandable": {
                        "content": "/rest/api/content/589828"
                    },
                    "representation": "storage",
                    "value": "<ac:layout><ac:layout-section ac:type=\"single\"><ac:layout-cell>\n<ac:structured-macro ac:name=\"tip\"><ac:parameter ac:name=\"title\">Welcome to my new space!</ac:parameter><ac:rich-text-body>\n                    <p>Confluence spaces are great for sharing content and news with your team. This is your home page. Right now it shows recent space activity, but you can customize this page in anyway you like.</p>\n                </ac:rich-text-body></ac:structured-macro><h2>Complete these tasks to get started</h2><ac:task-list>\n<ac:task>\n<ac:task-id>1</ac:task-id>\n<ac:task-status>incomplete</ac:task-status>\n<ac:task-body>\n                        <strong>Edit this home page</strong> - Click <em>Edit</em> in the top right of this screen to customize your Space home page\n                    </ac:task-body>\n</ac:task>\n<ac:task>\n<ac:task-id>2</ac:task-id>\n<ac:task-status>incomplete</ac:task-status>\n<ac:task-body>\n                        <strong>Create your first page</strong> - Click the <em>Create</em> button in the header to get started\n                    </ac:task-body>\n</ac:task>\n<ac:task>\n<ac:task-id>3</ac:task-id>\n<ac:task-status>incomplete</ac:task-status>\n<ac:task-body>\n                        <strong>Brand your Space</strong> - Click <em>Configure Sidebar</em> in the left panel to update space details and logo\n                    </ac:task-body>\n</ac:task>\n<ac:task>\n<ac:task-id>4</ac:task-id>\n<ac:task-status>incomplete</ac:task-status>\n<ac:task-body>\n                        <strong>Set permissions</strong> - Click <em>Space Tools</em> in the left sidebar to update permissions and give others access\n                    </ac:task-body>\n</ac:task>\n</ac:task-list>\n\n<p>&nbsp;</p></ac:layout-cell></ac:layout-section><ac:layout-section ac:type=\"two_equal\"><ac:layout-cell>\n<h2>Recent space activity</h2><p>\n                    <ac:structured-macro ac:name=\"recently-updated\"><ac:parameter ac:name=\"hideHeading\">true</ac:parameter><ac:parameter ac:name=\"max\">5</ac:parameter><ac:parameter ac:name=\"theme\">social</ac:parameter><ac:parameter ac:name=\"types\">page, comment, blogpost</ac:parameter></ac:structured-macro>\n                </p></ac:layout-cell><ac:layout-cell>\n<h2>Space contributors</h2><p>\n                    <ac:structured-macro ac:name=\"contributors\"><ac:parameter ac:name=\"limit\">5</ac:parameter><ac:parameter ac:name=\"scope\">descendants</ac:parameter><ac:parameter ac:name=\"order\">update</ac:parameter><ac:parameter ac:name=\"showLastTime\">true</ac:parameter><ac:parameter ac:name=\"mode\">list</ac:parameter></ac:structured-macro>\n                </p></ac:layout-cell></ac:layout-section><ac:layout-section ac:type=\"single\"><ac:layout-cell>\n<p>&nbsp;</p></ac:layout-cell></ac:layout-section></ac:layout>"
                }
            },
            "id": "589828",
            "status": "current",
            "title": "Test Space Home",
            "type": "page",
            "version": {
                "by": {
                    "displayName": "Gil Admin",
                    "profilePicture": {
                        "height": 48,
                        "isDefault": true,
                        "path": "/s/en_GB/5723/dfa6f4056bde4993312ffa3cb0f626ca41e68821.1/_/images/icons/profilepics/default.png",
                        "width": 48
                    },
                    "type": "known",
                    "userKey": "2c968271494ecbb701494ecc80dd0002",
                    "username": "admin"
                },
                "message": "",
                "minorEdit": false,
                "number": 4,
                "when": "2014-10-27T16:09:24.368+1100"
            }
        }
    ],
    "size": 1,
    "start": 0
}
```

You can then `PUT` your changes as follows:

{{% note %}}Remember that Confluence pages and blog posts are versioned, so you'll need to add the version number in your call.{{% /note %}}

``` bash
curl -u admin@example.com:password -X PUT -H 'Content-Type: application/json' -d'{"id":"589828","type":"page","title":"Test Space Home","space":{"key":"TEST"},"body":{"storage":{"value":"<p>This is the newly updated text for my page</p>","representation":"storage"}},"version":{"number":5}}' https://your-domain.atlassian.net/wiki/rest/api/content/589828 | python -mjson.tool
```

``` bash
{
    "_expandable": {
        "children": "/rest/api/content/589828/child",
        "descendants": "/rest/api/content/589828/descendant",
        "metadata": ""
    },
    "_links": {
        "base": "https://your-domain.atlassian.net/wiki",
        "collection": "/rest/api/content",
        "context": "",
        "self": "https://your-domain.atlassian.net/wiki/rest/api/content/589828",
        "tinyui": "/x/BAAJ",
        "webui": "/display/TEST/Test+Space+Home"
    },
    "ancestors": [],
    "body": {
        "_expandable": {
            "anonymous_export_view": "",
            "editor": "",
            "export_view": "",
            "view": ""
        },
        "storage": {
            "_expandable": {
                "content": "/rest/api/content/589828"
            },
            "representation": "storage",
            "value": "<p>This is the newly updated text for my page</p>"
        }
    },
    "container": {
        "_expandable": {
            "description": "",
            "homepage": "/rest/api/content/589828",
            "icon": ""
        },
        "_links": {
            "self": "https://your-domain.atlassian.net/wiki/rest/api/space/TEST"
        },
        "id": 753665,
        "key": "TEST",
        "name": "Test Space",
        "type": "global"
    },
    "history": {
        "_expandable": {
            "lastUpdated": "",
            "nextVersion": "",
            "previousVersion": ""
        },
        "_links": {
            "self": "https://your-domain.atlassian.net/wiki/rest/api/content/589828/history"
        },
        "createdBy": {
            "displayName": "Gil Admin",
            "profilePicture": {
                "height": 48,
                "isDefault": true,
                "path": "/s/en_GB/5723/dfa6f4056bde4993312ffa3cb0f626ca41e68821.1/_/images/icons/profilepics/default.png",
                "width": 48
            },
            "type": "known",
            "userKey": "2c968271494ecbb701494ecc80dd0002",
            "username": "admin"
        },
        "createdDate": "2014-10-27T11:57:01.915+1100",
        "latest": true
    },
    "id": "589828",
    "space": {
        "_expandable": {
            "description": "",
            "homepage": "/rest/api/content/589828",
            "icon": ""
        },
        "_links": {
            "self": "https://your-domain.atlassian.net/wiki/rest/api/space/TEST"
        },
        "id": 753665,
        "key": "TEST",
        "name": "Test Space",
        "type": "global"
    },
    "status": "current",
    "title": "Test Space Home",
    "type": "page",
    "version": {
        "by": {
            "displayName": "Gil Admin",
            "profilePicture": {
                "height": 48,
                "isDefault": true,
                "path": "/s/en_GB/5723/dfa6f4056bde4993312ffa3cb0f626ca41e68821.1/_/images/icons/profilepics/default.png",
                "width": 48
            },
            "type": "known",
            "userKey": "2c968271494ecbb701494ecc80dd0002",
            "username": "admin"
        },
        "minorEdit": false,
        "number": 5,
        "when": "2014-10-27T16:09:24.368+1100"
    }
}
```


