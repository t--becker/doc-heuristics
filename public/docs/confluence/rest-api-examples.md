---
title: "REST API examples"
platform: cloud
product: confcloud
category: reference
subcategory: api
date: "2017-01-23"
aliases:
- confcloud/confluence-rest-api-examples-39985294.html
- /confcloud/confluence-rest-api-examples-39985294.md
dac_edit_link: https://developer.atlassian.com/pages/editpage.action?cjm=wozere&pageId=39985294
dac_view_link: https://developer.atlassian.com/pages/viewpage.action?cjm=wozere&pageId=39985294
confluence_id: 39985294
---

# REST API examples

{{% tip %}}This page contains examples of using the Confluence Content REST API using `curl`. The responses are piped into `python -mjson.tool` ([JSON encoder / decoder](https://docs.python.org/2.6/library/json.html)) to make them easier to read.{{% /tip%}}

Because the REST API is based on open standards, you can use any web development language to access the API.

## Finding content

### Find blog posts

This example finds blog posts to display in a blog roll with labels.

``` bash
 curl -u admin@example.com:password -X GET "https://your-domain.atlassian.net/wiki/rest/api/content?type=blogpost&start=0&limit=10&expand=space,history,body.view,metadata.labels" | python -mjson.tool
```

Example result:

``` javascript
{
    "_links": {
        "self": "https://your-domain.atlassian.net/wiki/rest/api/content"
    },
    "limit": 10,
    "results": [
        {
            "_expandable": {
                "ancestors": "",
                "children": "/rest/api/content/557065/child",
                "container": "",
                "descendants": "/rest/api/content/557065/descendant",
                "version": ""
            },
            "_links": {
                "self": "https://your-domain.atlassian.net/wiki/rest/api/content/557065",
                "tinyui": "/x/CYAI",
                "webui": "/display/TST/Test+Space+Home"
            },
            "body": {
                "editor": {
                    "_expandable": {
                        "content": "/rest/api/content/557065"
                    },
                    "representation": "editor"
                },
                "export_view": {
                    "_expandable": {
                        "content": "/rest/api/content/557065"
                    },
                    "representation": "export_view"
                },
                "storage": {
                    "_expandable": {
                        "content": "/rest/api/content/557065"
                    },
                    "representation": "storage"
                },
                "view": {
                    "_expandable": {
                        "content": "/rest/api/content/557065"
                    },
                    "representation": "view",
                    "value": "<p>Example page</p>"
                }
            },
            "history": {
                "_expandable": {
                    "lastUpdated": ""
                },
                "_links": {
                    "self": "https://your-domain.atlassian.net/wiki/rest/api/content/557065/history"
                },
                "createdBy": {
                    "displayName": "A. D. Ministrator",
                    "profilePicture": {
                        "height": 48,
                        "isDefault": true,
                        "path": "/confluence/s/en_GB-1988229788/4960/NOCACHE1/_/images/icons/profilepics/default.png",
                        "width": 48
                    },
                    "type": "known",
                    "username": "admin"
                },
                "createdDate": "2014-03-07T16:14:35.220+1100",
                "latest": true
            },
            "id": "557065",
            "metadata": {
                "labels": {
                    "_links": {
                        "self": "https://your-domain.atlassian.net/wiki/rest/api/content/557065/label"
                    },
                    "limit": 200,
                    "results": [],
                    "size": 0,
                    "start": 0
                },
                "likesCount": null
            },
            "space": {
                "_links": {
                    "self": "https://your-domain.atlassian.net/wiki/rest/api/space/TST"
                },
                "id": 786433,
                "key": "TST",
                "name": "Test Space"
            },
            "title": "Test Space Home",
            "type": "page"
        },
        {
            "_expandable": {
                "ancestors": "",
                "children": "/rest/api/content/557067/child",
                "container": "",
                "descendants": "/rest/api/content/557067/descendant",
                "version": ""
            },
            "_links": {
                "self": "https://your-domain.atlassian.net/wiki/rest/api/content/557067",
                "tinyui": "/x/C4AI",
                "webui": "/display/TST/A+new+page"
            },
            "body": {
                "editor": {
                    "_expandable": {
                        "content": "/rest/api/content/557067"
                    },
                    "representation": "editor"
                },
                "export_view": {
                    "_expandable": {
                        "content": "/rest/api/content/557067"
                    },
                    "representation": "export_view"
                },
                "storage": {
                    "_expandable": {
                        "content": "/rest/api/content/557067"
                    },
                    "representation": "storage"
                },
                "view": {
                    "_expandable": {
                        "content": "/rest/api/content/557067"
                    },
                    "representation": "view",
                    "value": ""
                }
            },
            "history": {
                "_expandable": {
                    "lastUpdated": ""
                },
                "_links": {
                    "self": "https://your-domain.atlassian.net/wiki/rest/api/content/557067/history"
                },
                "createdBy": {
                    "displayName": "A. D. Ministrator",
                    "profilePicture": {
                        "height": 48,
                        "isDefault": true,
                        "path": "/confluence/s/en_GB-1988229788/4960/NOCACHE1/_/images/icons/profilepics/default.png",
                        "width": 48
                    },
                    "type": "known",
                    "username": "admin"
                },
                "createdDate": "2014-03-07T16:18:33.554+1100",
                "latest": true
            },
            "id": "557067",
            "metadata": {
                "labels": {
                    "_links": {
                        "self": "https://your-domain.atlassian.net/wiki/rest/api/content/557067/label"
                    },
                    "limit": 200,
                    "results": [],
                    "size": 0,
                    "start": 0
                },
                "likesCount": null
            },
            "space": {
                "_links": {
                    "self": "https://your-domain.atlassian.net/wiki/rest/api/space/TST"
                },
                "id": 786433,
                "key": "TST",
                "name": "Test Space"
            },
            "title": "A new page",
            "type": "page"
        },
        {
            "_expandable": {
                "ancestors": "",
                "children": "/rest/api/content/950276/child",
                "container": "",
                "descendants": "/rest/api/content/950276/descendant",
                "version": ""
            },
            "_links": {
                "self": "https://your-domain.atlassian.net/wiki/rest/api/content/950276",
                "tinyui": "/x/BIAO",
                "webui": "/display/TST/myPage+Title"
            },
            "body": {
                "editor": {
                    "_expandable": {
                        "content": "/rest/api/content/950276"
                    },
                    "representation": "editor"
                },
                "export_view": {
                    "_expandable": {
                        "content": "/rest/api/content/950276"
                    },
                    "representation": "export_view"
                },
                "storage": {
                    "_expandable": {
                        "content": "/rest/api/content/950276"
                    },
                    "representation": "storage"
                },
                "view": {
                    "_expandable": {
                        "content": "/rest/api/content/950276"
                    },
                    "representation": "view",
                    "value": "<p>Some content</p>"
                }
            },
            "history": {
                "_expandable": {
                    "lastUpdated": ""
                },
                "_links": {
                    "self": "https://your-domain.atlassian.net/wiki/rest/api/content/950276/history"
                },
                "createdBy": {
                    "displayName": "A. D. Ministrator",
                    "profilePicture": {
                        "height": 48,
                        "isDefault": true,
                        "path": "/confluence/s/en_GB-1988229788/4960/NOCACHE1/_/images/icons/profilepics/default.png",
                        "width": 48
                    },
                    "type": "known",
                    "username": "admin"
                },
                "createdDate": "2014-03-07T17:08:20.326+1100",
                "latest": true
            },
            "id": "950276",
            "metadata": {
                "labels": {
                    "_links": {
                        "self": "https://your-domain.atlassian.net/wiki/rest/api/content/950276/label"
                    },
                    "limit": 200,
                    "results": [],
                    "size": 0,
                    "start": 0
                },
                "likesCount": null
            },
            "space": {
                "_links": {
                    "self": "https://your-domain.atlassian.net/wiki/rest/api/space/TST"
                },
                "id": 786433,
                "key": "TST",
                "name": "Test Space"
            },
            "title": "myPage Title",
            "type": "page"
        }
    ],
    "size": 3,
    "start": 0
}
```

### Browse content

This example shows how you can browse content. 

``` bash
curl -u admin@example.com:password https://your-domain.atlassian.net/wiki/rest/api/content/ | python -mjson.tool
```

Example result:

``` javascript
{
    "_links": {
        "self": "https://your-domain.atlassian.net/wiki/rest/api/content/"
    },
    "limit": 100,
    "results": [
        {
            "_expandable": {
                "ancestors": "",
                "body": "",
                "children": "",
                "container": "",
                "history": "/rest/api/content/3965071/history",
                "metadata": "",
                "space": "/rest/api/space/TST",
                "version": ""
            },
            "_links": {
                "self": "https://your-domain.atlassian.net/wiki/rest/api/content/3965071",
                "tinyui": "/x/j4A8",
                "webui": "/display/TST/Test+Space+Home"
            },
            "id": "3965071",
            "title": "Test Space Home",
            "type": "page"
        },
        {
            "_expandable": {
                "ancestors": "",
                "body": "",
                "children": "",
                "container": "",
                "history": "/rest/api/content/3965072/history",
                "metadata": "",
                "space": "/rest/api/space/TST",
                "version": ""
            },
            "_links": {
                "self": "https://your-domain.atlassian.net/wiki/rest/api/content/3965072",
                "tinyui": "/x/kIA8",
                "webui": "/display/TST/Test+Page"
            },
            "id": "3965072",
            "title": "Test Page",
            "type": "page"
        }
    ],
    "size": 2,
    "start": 0
}
```

### Read content, and expand the body

This example shows how you can read the content of a page with the body [expanded](/cloud/confluence/expansions).

``` bash
curl -u admin@example.com:password https://your-domain.atlassian.net/wiki/rest/api/content/3965072?expand=body.storage | python -mjson.tool
```

Example result:

``` javascript
{
    "_expandable": {
        "ancestors": "",
        "children": "",
        "container": "",
        "history": "/rest/api/content/3965072/history",
        "metadata": "",
        "space": "/rest/api/space/TST",
        "version": ""
    },
    "_links": {
        "base": "https://your-domain.atlassian.net/wiki",
        "collection": "/rest/api/contents",
        "self": "https://your-domain.atlassian.net/wiki/rest/api/content/3965072",
        "tinyui": "/x/kIA8",
        "webui": "/display/TST/Test+Page"
    },
    "body": {
        "editor": {
            "_expandable": {
                "content": "/rest/api/content/3965072"
            },
            "representation": "editor"
        },
        "export_view": {
            "_expandable": {
                "content": "/rest/api/content/3965072"
            },
            "representation": "export_view"
        },
        "storage": {
            "_expandable": {
                "content": "/rest/api/content/3965072"
            },
            "representation": "storage",
            "value": "<p>blah blah</p>"
        },
        "view": {
            "_expandable": {
                "content": "/rest/api/content/3965072"
            },
            "representation": "view"
        }
    },
    "id": "3965072",
    "title": "Test Page",
    "type": "page"
}
```

### Find a page by title and space key

This example shows how you can look up a page by space key and title with history [expanded](/cloud/confluence/expansions) to find the creator.

``` bash
curl -u admin@example.com:password -X GET "https://your-domain.atlassian.net/wiki/rest/api/content?title=myPage%20Title&spaceKey=TST&expand=history" | python -mjson.tool
```

Example result : 

``` javascript
{
    "_links": {
        "self": "https://your-domain.atlassian.net/wiki/rest/api/content"
    },
    "limit": 100,
    "results": [
        {
            "_expandable": {
                "ancestors": "",
                "body": "",
                "children": "/rest/api/content/950276/child",
                "container": "",
                "descendants": "/rest/api/content/950276/descendant",
                "metadata": "",
                "space": "/rest/api/space/TST",
                "version": ""
            },
            "_links": {
                "self": "https://your-domain.atlassian.net/wiki/rest/api/content/950276",
                "tinyui": "/x/BIAO",
                "webui": "/display/TST/myPage+Title"
            },
            "history": {
                "_expandable": {
                    "lastUpdated": ""
                },
                "_links": {
                    "self": "https://your-domain.atlassian.net/wiki/rest/api/content/950276/history"
                },
                "createdBy": {
                    "displayName": "A. D. Ministrator",
                    "profilePicture": {
                        "height": 48,
                        "isDefault": true,
                        "path": "/confluence/s/en_GB-1988229788/4960/NOCACHE1/_/images/icons/profilepics/default.png",
                        "width": 48
                    },
                    "type": "known",
                    "username": "admin"
                },
                "createdDate": "2014-03-07T17:08:20.326+1100",
                "latest": true
            },
            "id": "950276",
            "title": "myPage Title",
            "type": "page"
        }
    ],
    "size": 1,
    "start": 0
}
```

## Manipulating content

### Create a new page

This example shows how you can create a new page, with `body` content, in a specific `space`. 

``` bash
curl -u admin@example.com:password -X POST -H 'Content-Type: application/json' -d'{"type":"page","title":"new page","space":{"key":"TST"},"body":{"storage":{"value":"<p>This is a new page</p>","representation":"storage"}}}' https://your-domain.atlassian.net/wiki/rest/api/content/ | python -mjson.tool
```

Example result:

``` javascript
{
    "_expandable": {
        "children": "/rest/api/content/3604482/child",
        "descendants": "/rest/api/content/3604482/descendant",
        "metadata": ""
    },
    "_links": {
        "base": "https://your-domain.atlassian.net/wiki",
        "collection": "/rest/api/contents",
        "self": "https://your-domain.atlassian.net/wiki/rest/api/content/3604482",
        "tinyui": "/x/AgA3",
        "webui": "/display/TST/new+page"
    },
    "ancestors": [],
    "body": {
        "editor": {
            "_expandable": {
                "content": "/rest/api/content/3604482"
            },
            "representation": "editor"
        },
        "export_view": {
            "_expandable": {
                "content": "/rest/api/content/3604482"
            },
            "representation": "export_view"
        },
        "storage": {
            "_expandable": {
                "content": "/rest/api/content/3604482"
            },
            "representation": "storage",
            "value": "<p>This is a new page</p>"
        },
        "view": {
            "_expandable": {
                "content": "/rest/api/content/3604482"
            },
            "representation": "view"
        }
    },
    "container": {
        "_links": {
            "self": "https://your-domain.atlassian.net/wiki/rest/api/space/TST"
        },
        "id": 2719747,
        "key": "TST",
        "name": "Test Space"
    },
    "history": {
        "_expandable": {
            "lastUpdated": ""
        },
        "_links": {
            "self": "https://your-domain.atlassian.net/wiki/rest/api/content/3604482/history"
        },
        "createdBy": {
            "displayName": "A. D. Ministrator",
            "profilePicture": {
                "height": 48,
                "isDefault": true,
                "path": "/confluence/s/en_GB-1988229788/4960/NOCACHE1/_/images/icons/profilepics/default.png",
                "width": 48
            },
            "type": "known",
            "username": "admin"
        },
        "createdDate": "2014-03-10T23:14:35.031+1100",
        "latest": true
    },
    "id": "3604482",
    "space": {
        "_links": {
            "self": "https://your-domain.atlassian.net/wiki/rest/api/space/TST"
        },
        "id": 2719747,
        "key": "TST",
        "name": "Test Space"
    },
    "title": "new page",
    "type": "page",
    "version": {
        "by": {
            "displayName": "A. D. Ministrator",
            "profilePicture": {
                "height": 48,
                "isDefault": true,
                "path": "/confluence/s/en_GB-1988229788/4960/NOCACHE1/_/images/icons/profilepics/default.png",
                "width": 48
            },
            "type": "known",
            "username": "admin"
        },
        "message": "",
        "minorEdit": false,
        "number": 1,
        "when": "2014-03-10T23:14:35.031+1100"
    }
}
```

### Create a new page (jQuery)

``` javascript
// This creates a page in a space.
var username = "admin";
var password = "admin";
var jsondata = {"type":"page",
 "title":"My Test Page",
 "space":{"key":"TST"},
 "body":{"storage":{"value":"<p>This is a new page</p>","representation":"storage"}}};
  
$.ajax
  ({
    type: "POST",
    url: "https://your-domain.atlassian.net/wiki/rest/api/content/",
    contentType:"application/json; charset=utf-8",
    dataType: "json",
    async: false,
    headers: {
        "Authorization": "Basic " + btoa(username+ ":" + password)
    }, 
    data: JSON.stringify(jsondata),
    success: function (){
        console.log('Page saved!'); 
    },
    error : function(xhr, errorText){
        console.log('Error '+ xhr.responseText);
    }
});
```

### Create a new page as a child of another page

This example shows how you can create a new page, with `body` content, as a child of another page with ID 456. Note the `ancestors` property where we specify the parent page's `id`.

``` bash
curl -u admin@example.com:password -X POST -H 'Content-Type: application/json' -d'{"type":"page","title":"new page", "ancestors":[{"id":456}], "space":{"key":"TST"},"body":{"storage":{"value":"<p>This is a new page</p>","representation":"storage"}}}' https://your-domain.atlassian.net/wiki/rest/api/content/ | python -mjson.tool
```

### Update a page

This example shows how you can update the content of an existing page. 

``` bash
curl -u admin@example.com:password -X PUT -H 'Content-Type: application/json' -d'{"id":"3604482","type":"page","title":"new page","space":{"key":"TST"},"body":{"storage":{"value":"<p>This is the updated text for the new page</p>","representation":"storage"}},"version":{"number":2}}' https://your-domain.atlassian.net/wiki/rest/api/content/3604482 | python -mjson.tool
```

Example result:

``` javascript
{
    "_expandable": {
        "children": "/rest/api/content/3604482/child",
        "descendants": "/rest/api/content/3604482/descendant",
        "metadata": ""
    },
    "_links": {
        "base": "https://your-domain.atlassian.net/wiki",
        "collection": "/rest/api/contents",
        "self": "https://your-domain.atlassian.net/wiki/rest/api/content/3604482",
        "tinyui": "/x/AgA3",
        "webui": "/display/TST/new+page"
    },
    "ancestors": [],
    "body": {
        "editor": {
            "_expandable": {
                "content": "/rest/api/content/3604482"
            },
            "representation": "editor"
        },
        "export_view": {
            "_expandable": {
                "content": "/rest/api/content/3604482"
            },
            "representation": "export_view"
        },
        "storage": {
            "_expandable": {
                "content": "/rest/api/content/3604482"
            },
            "representation": "storage",
            "value": "<p>This is the updated text for the new page</p>"
        },
        "view": {
            "_expandable": {
                "content": "/rest/api/content/3604482"
            },
            "representation": "view"
        }
    },
    "container": {
        "_links": {
            "self": "https://your-domain.atlassian.net/wiki/rest/api/space/TST"
        },
        "id": 2719747,
        "key": "TST",
        "name": "Test Space"
    },
    "history": {
        "_expandable": {
            "lastUpdated": "",
            "previousVersion": ""
        },
        "_links": {
            "self": "https://your-domain.atlassian.net/wiki/rest/api/content/3604482/history"
        },
        "createdBy": {
            "displayName": "A. D. Ministrator",
            "profilePicture": {
                "height": 48,
                "isDefault": true,
                "path": "/confluence/s/en_GB-1988229788/4960/NOCACHE1/_/images/icons/profilepics/default.png",
                "width": 48
            },
            "type": "known",
            "username": "admin"
        },
        "createdDate": "2014-03-10T23:14:35.031+1100",
        "latest": true
    },
    "id": "3604482",
    "space": {
        "_links": {
            "self": "https://your-domain.atlassian.net/wiki/rest/api/space/TST"
        },
        "id": 2719747,
        "key": "TST",
        "name": "Test Space"
    },
    "title": "new page",
    "type": "page",
    "version": {
        "by": {
            "displayName": "A. D. Ministrator",
            "profilePicture": {
                "height": 48,
                "isDefault": true,
                "path": "/confluence/s/en_GB-1988229788/4960/NOCACHE1/_/images/icons/profilepics/default.png",
                "width": 48
            },
            "type": "known",
            "username": "admin"
        },
        "minorEdit": false,
        "number": 2,
        "when": "2014-03-10T23:16:50.757+1100"
    }
}
```

### Delete a page

This example shows how you can delete a page by content ID.

``` bash
curl -v -S -u admin@example.com:password -X DELETE https://your-domain.atlassian.net/wiki/rest/api/content/3604482 | python -mjson.tool
```

Expect a `HTTP/1.1 204 No Content` response after a successful deletion.

### Upload an attachment

This example shows how you can upload an attachment to a specific page (where `3604482` is the content ID), and specify a comment.

``` bash
curl -v -S -u admin@example.com:password -X POST -H "X-Atlassian-Token: no-check" -F "file=@myfile.txt" -F "comment=this is my file" "https://your-domain.atlassian.net/wiki/rest/api/content/3604482/child/attachment" | python -mjson.tool
```

``` javascript
{
    "_expandable": {
        "icon": ""
    },
    "_links": {
        "base": "https://your-domain.atlassian.net/wiki",
        "collection": "/rest/api/space",
        "context": "/confluence",
        "self": "https://your-domain.atlassian.net/wiki/rest/api/space/RAID4"
    },
    "description": {
        "_expandable": {
            "view": ""
        },
        "plain": {
            "representation": "plain",
            "value": "Raider Space for raiders"
        }
    },
    "homepage": {
        "_expandable": {
            "ancestors": "",
            "body": "",
            "children": "/rest/api/content/3997704/child",
            "container": "",
            "descendants": "/rest/api/content/3997704/descendant",
            "history": "/rest/api/content/3997704/history",
            "metadata": "",
            "space": "/rest/api/space/RAID4",
            "version": ""
        },
        "_links": {
            "self": "https://your-domain.atlassian.net/wiki/rest/api/content/3997704",
            "tinyui": "/x/CAA9",
            "webui": "/display/RAID4/Raider+Home"
        },
        "id": "3997704",
        "title": "Raider Home",
        "type": "page"
    },
    "id": 4030468,
    "key": "RAID",
    "name": "Raider",
    "type": "global"
}
```

### Add a comment to a page (python)

This python example shows how to add a comment to a page. The page to be commented on is first fetched from the API by title, then used as the container of the comment.

**comment.py**

``` py
import requests, json
def printResponse(r):
    print '{} {}\n'.format(json.dumps(r.json(), sort_keys=True, indent=4, separators=(',', ': ')), r)
r = requests.get('https://your-domain.atlassian.net/wiki/rest/api/content',
    params={'title' : 'Page title to comment on'},
    auth=('admin', 'admin'))
printResponse(r)
parentPage = r.json()['results'][0]
pageData = {'type':'comment', 'container':parentPage,
    'body':{'storage':{'value':"<p>A new comment</p>",'representation':'storage'}}}
r = requests.post('https://your-domain.atlassian.net/wiki/rest/api/content',
    data=json.dumps(pageData),
    auth=('admin','admin'),
    headers=({'Content-Type':'application/json'}))
printResponse(r)
```

### Create a space

This example demonstrates creating a new space. The call declares the space `key`, `name`, `type` (`global` or `personal`), and `description`.

``` bash
curl -u admin@example.com:password -X POST -H 'Content-Type: application/json' -d' { "key":"RAID", "name":"Raider", "type":"global",  "description":{"plain": { "value": "Raider Space for raiders","representation": "plain" }}}' https://your-domain.atlassian.net/wiki/rest/api/space
```

## Content conversion

### Convert storage format to view format

This example shows how to convert storage format to view format.

``` bash
curl -u admin@example.com:password -X POST -H 'Content-Type: application/json' -d'{"value":"<ac:structured-macro ac:name=\"cheese\" />","representation":"storage"}' "https://your-domain.atlassian.net/wiki/rest/api/contentbody/convert/view" | python -mjson.tool
```

Example result:

``` javascript
{
    "_links": {
        "base": "https://your-domain.atlassian.net/wiki"
    },
    "representation": "view",
    "value": "I like cheese!"
}
```

### Convert wiki markup to storage format

This example shows how to convert wiki markup to storage format.

``` bash
curl -u admin@example.com:password -X POST -H 'Content-Type: application/json' -d'{"value":"{cheese}","representation":"wiki"}' "https://your-domain.atlassian.net/wiki/rest/api/contentbody/convert/storage" | python -mjson.tool
```

Example result:

``` javascript
{
    "_links": {
        "base": "https://your-domain.atlassian.net/wiki"
    },
    "representation": "storage",
    "value": "<ac:structured-macro ac:name=\"cheese\" />"
}
```

### Convert storage format to view format using a particular page for the conversion context

This example shows how to convert storage format to view format again, but this time using an existing piece of content for the conversion context.  Some macros require a page context when they execute. In this example the space attachments macro is used, and this uses the space that the page is in to determine what attachments to show :

``` bash
curl -u admin@example.com:password -X POST -H 'Content-Type: application/json' -d'{"representation":"storage","value":"<p><ac:structured-macro ac:name=\"space-attachments\"/></p>","content":{"id":"1448805348"}}' "https://your-domain.atlassian.net/wiki/rest/api/contentbody/convert/view" | python -mjson.tool
``` 