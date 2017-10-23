---
title: "Basic auth for REST APIs"
platform: cloud
product: confcloud
category: devguide
subcategory: security
date: "2017-04-14"
---
# Basic auth for REST APIs

This page shows you how to allow REST clients to authenticate themselves using **[basic authentication](http://en.wikipedia.org/wiki/Basic_access_authentication)** (user name and password). The Confluence REST API supports basic authentication as well as [cookie-based authentication](/cloud/jira/platform/jira-rest-api-cookie-based-authentication) and [OAuth](/cloud/confluence/oauth-2-jwt-bearer-tokens-for-add-ons).

## Before you begin

Have you picked the right authentication method?

{{< include path="docs/content/cloud/jira/platform/temp/authentication-methods.snippet.md">}}



## Overview

Confluence's REST API is protected by the same restrictions which are provided via Confluence's standard web interface. This means that if you do not log in, you are accessing Confluence anonymously. Furthermore, if you log in and do not have permission to view something in Confluence, you will not be able to view it using the Confluence REST API either.

In most cases, the first step in using the Confluence REST API is to authenticate a user account with your Confluence site. Any authentication that works against Confluence will work against the REST API. On this page we will show you a simple example of basic authentication.

## Simple example

Most client software provides a simple mechanism for supplying a user name and password and will build the required authentication headers automatically. For example, you can specify the `-u` argument with curl as follows

``` bash
curl -D- -u user@example.com:user_password -X GET -H "Content-Type: application/json"  https://your-domain.atlassian.net/rest/api/2/issue/createmeta
```

## Supplying basic auth headers

If you need to you may construct and send basic auth headers yourself. To do this you need to perform the following steps:

1.  Build a string of the form `user@example.com:user_password`
2.  Base64 encode the string
3.  Supply an "Authorization" header with content "Basic " followed by the encoded string. For example, the string `user:user` encodes to `ZnJlZDpmcmVk` in base64, so you would make the request as follows.

``` bash
curl -D- -X GET -H "Authorization: Basic ZnJlZDpmcmVk" -H "Content-Type: application/json" "https://example.com:8081/rest/api/2/issue/QA-31"
```

## Advanced topics

#### Authentication challenges

Because Confluence permits a default level of access to anonymous users, it does not supply a typical authentication challenge. Some HTTP client software expect to receive an authentication challenge before they will send an authorization header. This means that it may not behave as expected. In this case, you may need to configure it to supply the authorization header, as described above, rather than relying on its default mechanism.

## Related pages

-   [Confluence REST API - OAuth authentication](/cloud/confluence/oauth-2-jwt-bearer-tokens-for-add-ons)

