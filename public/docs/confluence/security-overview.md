---
title: "Security overview"
platform: cloud
product: confcloud
category: devguide
subcategory: security
date: "2017-04-13"
---
# Security overview

Implementing security is an essential part of integrating with Confluence Cloud. It lets Atlassian applications protect customer data from unauthorized access and from malicious or accidental changes. It also allows administrators to install add-ons with confidence, letting users enjoy the benefits of add-ons in a secure manner.

There are two parts to securing your Confluence add-on or integration: authentication and authorization. Authentication tells Confluence Cloud the identity of your add-on, authorization determines what actions it can take within Confluence.

## Authentication

Authentication is the process of identifying your add-on or integration to the Atlassian application and is the basis for all other security. Confluence Cloud offers several authentication patterns, depending on whether you are building an Atlassian Connect add-on or calling the Confluence REST APIs directly.

### Authentication for add-ons

Atlassian Connect uses [JWT](https://jwt.io/) (JSON Web Tokens) to authenticate add-ons. This is built into the supported [Atlassian Connect libraries](/cloud/jira/platform/frameworks-and-tools/).

When an add-on is installed, a security context is exchanged with the application. This context is used to create and validate JWT tokens, embedded in API calls. The use of JWT tokens guarantees that:

* Confluence Cloud can verify it is talking to the add-on, and vice versa (authenticity).
* None of the query parameters of the HTTP request, nor the path (excluding the context path), nor the HTTP method, were altered in transit (integrity).

To learn more, read our page on [authentication for add-ons](/cloud/confluence/authentication-for-add-ons).

### Authentication for REST API requests

Confluence can use one of the following four methods to authenticate clients directly: 

|  |  |
|------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Basic authentication | Basic authentication uses a predefined set of user credentials to authenticate the client. We recommend that you don't use basic authentication, except for tools like personal scripts or bots. It may be easier to implement, but it is much less secure. <br>Read the [Basic authentication tutorial](/cloud/confluence/basic-auth-for-rest-apis). |
| Cookie/session authentication | Cookie/session authentication allows you to generate a session against Confluence using your username and password, which you then subsequently use for all requests. |
| Atlassian Connect JWT authentication | Atlassian Connect JWT authentication allows you to act as the Atlassian Connect user in the system using JSON Web Tokens (JWT) as a standard way of representing security claims between the add-on and the Atlassian host product. <br>Read the [JWT documentation](/cloud/confluence/understanding-jwt/). |
| Atlassian Connect OAuth 2 JWT token exchange | Atlassian Connect OAuth 2 JWT token exchange allows add-ons with the appropriate scope (ACT_AS_USER) to act as a user and request resources and perform actions in JIRA and Confluence. <br>Read the [OAuth 2 JWT bearer token documentation](/cloud/confluence/oauth-2-jwt-bearer-tokens-for-add-ons/). |

## Authorization

Authorization is the process of allowing your add-on or integration to take certain actions in the Atlassian application, after it has been authenticated. Confluence Cloud has different types of authorization, depending on whether you are building an Atlassian Connect add-on or calling the Confluence REST APIs directly.

### Authorization for add-ons

Atlassian Connect provides two types of authorization: 

*   **Authorization via scopes and add-on users** - This is the default authorization method. You should use this for most cases.
*   **Authorization via JWT bearer token authorization grant type for OAuth 2.0** - You should only use this method when your add-on needs to make server-to-server requests on behalf of a user.

#### Authorization for add-ons via scopes and add-on users

This method has two levels of authorization: static authorization via scopes and run-time authorization via add-on users. 

| | |
|--------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Scopes       | Scopes are defined in the add-on descriptor and statically specify the maximum set of actions that an add-on may perform: read, write, etc. This security level is enforced by Atlassian Connect and cannot be bypassed by add-on implementations. To learn more, read our page on [scopes](/cloud/jira/platform/scopes/). |
| Add-on users | Every add-on is assigned its own user in a Cloud instance. In general, server-to-server requests are made by the add-on user. This allows an administrator to restrict an add-on's access to certain projects and issues, just as they would for any other user. To learn more, read our [architecture overview](/cloud/jira/platform/architecture-overview/). <br> Note, it is possible to make a request on behalf of the current user, rather than the add-on user. To do this, the request needs to be a client-side REST API request, using the [`AP.request()` method](/cloud/jira/platform/jira-cloud-platform-rest-api/)(../jsapi/request/), or the add-on needs to make a server-to-server request using an OAuth 2.0 bearer token (see next section). |

<div class="aui-message tip">
    <div class="icon"></div>
    <p class="title">
        <strong>Combining static and run-time authorization</strong>
    </p>
    <p>
    The set of actions that an add-on is capable of performing is the intersection of the static scopes and the permissions of the user assigned to the request. This means that requests can be rejected because the assigned user lacks the required permissions. Therefore, your add-on should always defensively detect HTTP 403 forbidden responses from the product.
    </p>
</div>

#### Authorization for add-ons via JWT bearer token authorization grant type for OAuth 2.0

At a high level, this method works by the add-on exchanging a JWT for an OAuth 2.0 access token (provided by the application). The access token can be used to make server-to-server calls, on behalf of the user, to the application's API.

To learn more, read our page on [OAuth 2.0 - JWT Bearer token authorization grant type](/cloud/confluence/oauth-2-jwt-bearer-tokens-for-add-ons).  

