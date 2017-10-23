---
title: "Collaborative editing"
platform: cloud
product: confcloud
category: devguide
subcategory: blocks
date: "2016-11-17"
aliases:
- confcloud/collaborative-editing-for-cloud-38451724.html
- /confcloud/collaborative-editing-for-cloud-38451724.md
dac_edit_link: https://developer.atlassian.com/pages/editpage.action?cjm=wozere&pageId=38451724
dac_view_link: https://developer.atlassian.com/pages/viewpage.action?cjm=wozere&pageId=38451724
confluence_id: 38451724
---
# Collaborative editing

Collaborative editing allows multiple people to concurrently edit a single Confluence page or blog post (we'll just call them pages from here on). When using collaborative editing, a page editor will see the avatar(s) of others editing the page, and the changes they make will appear in the editor in real time.

This page provides an overview of the various components that make up collaborative editing. We'll go through how each component works, and how you can build plugins to integrate with them.

Developing for Confluence Server? Head to [Collaborative editing for Confluence Server](https://developer.atlassian.com/display/CONFDEV/Collaborative+editing+for+Confluence+Server).

## Shared drafts

### The shared draft vs personal draft model

We're changing the way drafts behave, and moving to a model that's more consistent with how content should be stored for collaborative editing. We'll call the outgoing model, used prior to collaborative editing, **personal drafts**, and the new model **shared drafts**. The notable differences are:

-   When editing a page prior to collaborative editing a new **personal** draft was created for each user, and the changes couldn't be seen by other users as personal drafts are private. Using collaborative editing a single *shared* draft is created for each page, and anyone editing the page will see the same draft.
     
-   Personal drafts were represented by a `Draft` class, which extends `ContentEntityObject` and contains a `draftType` field indicating whether the draft was a `page` or `blogpost`. We're deprecating the `Draft` class in favor of using the existing `Page` and `Blogpost` classes, where a `contentStatus` field of `draft` will indicate the object is a draft.

Comparing the personal draft and shared draft models:

| Personal drafts (before collaborative editing)                      | Shared drafts (collaborative editing)                             |
|---------------------------------------------------------------------|-------------------------------------------------------------------|
| ![personal draft flow](/cloud/confluence/images/personal-draft-flow.png) | ![shared draft flow](/cloud/confluence/images/shared-draft-flow.png) |

 

A draft page object in its different representations:

<table>
<colgroup>
<col width="50%" />
<col width="50%" />
</colgroup>
<thead>
<tr class="header">
<th>Personal draft</th>
<th>Shared draft</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Class: <code>Draft</code></p>
<p>ContentStatus: N/A</p>
<p>DraftType: <code>page</code> or <code>blogpost</code></p></td>
<td><p>Class: <code>Page</code> or <code>Blogpost</code></p>
<p>ContentStatus: <code>draft</code></p>
<p>DraftType: N/A</p></td>
</tr>
</tbody>
</table>

### Shared drafts API

#### REST API

We provide a REST API that allows external interaction with shared drafts. The currently-supported operations are:

-   Creating a shared draft
-   Fetching a single or a list of shared drafts
-   Publishing a draft

The Drafts API extends Confluence's existing REST API. In order to reference the draft, you'll need to add the following query parameter to REST requests:

``` bash
?status=draft
```

For example, if the request to fetch an existing page is:

``` bash
GET /rest/api/content/{contentId}
```

The request to fetch the corresponding draft will be:

``` bash
GET /rest/api/content/{contentId}?status=draft
```

Similarly, publishing a draft will be:

``` bash
PUT /rest/api/content/{contentId}?status=draft
```

where the request payload will contain:

``` bash
{
   ...
   "status": "current"
   ...
}
```

indicating that the status should be updated from `draft` to `current`.

When publishing drafts, it's also possible to specify a `conflictPolicy` query parameter. Currently only the `abort` policy is supported. This means that the publish operation will be aborted (and an error code returned) if a conflict is encountered during the publishing of a draft.

{{% tip %}}You can find more detailed documentation for the Confluence REST API at [https://docs.atlassian.com/atlassian-confluence/REST/latest/](https://docs.atlassian.com/atlassian-confluence/REST/latest/).{{% /tip %}}

#### Java API

Draft operations are also exposed as a Java interface via the `ContentService` and `ContentDraftService`. These services are made available to plugins as Spring Beans with `apiContentService` and `apiContentDraftService` IDs.

You can create a shared draft by calling:

``` bash
contentService
    .create(Content
        .builder()
        .status(ContentStatus.DRAFT)
        ...
        .build());
```

Note that the API currently only supports creating new shared drafts - it doesn't support creating a shared draft for an existing page.

To fetch a shared draft:

``` bash
contentService
    .find()
    .withStatus(ContentStatus.DRAFT)
    ...
    .fetchOne();
```

Finally, to publish a draft:

``` bash
contentDraftService
    .publishEditDraft(Content
        .builder()
        .status(ContentStatus.CURRENT)
        ...
        .build(), ConflictPolicy.ABORT);
```

### Event list

| Event                     | Type       | Purpose                                                                                                                                                                          | Example                                            |
|---------------------------|------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------|
| `SharedDraftCreatedEvent` | Java       | Triggered when a new shared draft gets created.                                                                                                                                  | [Event Listener Module](https://developer.atlassian.com/display/CONFDEV/Event+Listener+Module)                            |
| `SharedDraftUpdatedEvent` | Java       | Triggered when a shared draft is updated. This normally happens at regular intervals in an editing session when a draft is auto-saved.                                           | [Event Listener Module](https://developer.atlassian.com/display/CONFDEV/Event+Listener+Module)                            |
| `rte-draft-saved`         | Javascript | Triggered when a draft is saved. This is similar to `SharedDraftUpdatedEvent`, except that it's fired from the client side and is triggered for both personal and shared drafts. | `AJS.bind('rte-draft-saved', <handler function>);` |

### Extending the XWork actions

Shared draft support is provided to actions that extend the `AbstractCreateAndEditPageAction`.

Prior to shared drafts, actions could access drafts by calling `getDraft()`. This method - to be deprecated - only returns the old `Draft` class, which is incompatible with shared drafts. In order to support shared drafts you need to replace calls to `getDraft` with `getDraftAsCEO`, which will return a shared draft on instances that support them or a personal draft on other instances. This allows actions to maintain compatibility with instances that haven't been upgraded to collaborative editing.

You should ensure that future calls are made to `getContentDraft`, which will only return shared drafts and doesn't provide support for personal drafts.

### Checking for shared drafts using Javascript

To find out if shared drafts are supported using client-side Javascript:

``` javascript
AJS.Meta.getBoolean('shared-drafts')
```

### What happens when shared drafts are disabled?

Once shared drafts have been rolled out to instances, they won't be disabled.

### What happens to personal drafts once shared drafts have been rolled out?

Personal drafts will still be accessible from users' drafts list. They won't, however, be able to resume editing the draft in the editor. Opening a personal draft will display it in a read-only dialog, from which the user can copy the content into a new page.

### How do shared drafts behave in the drafts list?

A user's drafts list will be populated with the following drafts:

-   Personal drafts, created by the user
-   Shared drafts created by the user but never published

Drafts that have a corresponding published page won't appear in the drafts list - users can access those drafts by editing the corresponding page.

### Restoring historical versions

When a page is reverted, the corresponding shared draft is also updated to contain the new page content. This will also trigger an 'external changes' request (see our explanation of [external changes](#external-changes)).

### Location persistence

Shared drafts will now implement the hierarchical interface (inherited from the `Page` and `Blogpost` classes), which means it's now possible to persist location onto drafts.

Drafts created using the `AbstractCreateAndEditPageAction` or `DraftsTransitionHelper` will:

-   Have its parent automatically set as the page from which user clicks the **Create** button
-   Default to a space's home page if the parent page isn't specific (for example, when clicking **Create** from the dashboard)

We've also updated the move page dialog so that it persists the draft's location by calling `MovePageAction` rather than temporarily storing the location on the client. This means the draft location will persist between different editing sessions.

### Permissions and labels on shared drafts

There are two scenarios for draft metadata:

<table>
<colgroup>
<col width="50%" />
<col width="50%" />
</colgroup>
<thead>
<tr class="header">
<th>Scenario</th>
<th>Metadata persistence</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>A shared draft has never been published</td>
<td><ul>
<li>All permissions applied to the draft are saved with the draft</li>
<li>All labels added are saved with the draft</li>
</ul></td>
</tr>
<tr class="even">
<td>A shared draft has been published and as such links with a corresponding page</td>
<td><ul>
<li>Permissions are added to the page. The draft object has no permissions saved with it. This means, to determine if a user can view a draft, you must check whether the user is allowed to view and edit the corresponding page.</li>
<li>Labels are added to the page. The draft object has no labels saved with it.</li>
</ul></td>
</tr>
</tbody>
</table>

### Sharing a shared draft

To collaborate on a shared draft that's linked to a published page, users only need to edit the published page.

To access a shared draft that's never been published, you need two pieces of information:

1.  The `contentId` (this will also be the `draftId` for unpublished drafts)
2.  The `draftShareId` of the draft

At the time a draft is created, a `draftShareId` is generated and stored against the draft's content properties. This content and `draftShareId` are displayed in the URL while the draft is being edited. It'll look like this:

``` bash
<your_confluence_URL>/pages/resumedraft.action?draftId=1234&draftShareId=e4d05ef0-3cef-3c63-9f44-15e899469ad2
```

Sharing this link with other users will allow them to edit the same draft, assuming the view and edit restrictions on the draft allow it.

Once a user accesses a draft with the correct `draftShareId` they'll be granted a `ContentPermission#SHARED_PERMISSION`, which allows them to make future edits to the draft without providing the `draftShareId`. This shared permission won't be visible in the UI, and it'll be removed once the draft is published.

### Draft Versioning

Stricter rules now apply to draft versioning. Whereas it was possible to save drafts as new versions prior to collaborative editing, this action is no longer permitted. **Drafts must have a version of 1**. If a version bump of a draft is attempted, Confluence will throw an exception.

{{% warning %}}When saving a draft, don't call `PageManager#saveNewVersion`.{{% /warning %}}

### Draft Indexing

Shared drafts, like personal drafts, aren't indexed in Confluence. Since they're not added to the content index, it means drafts won't appear in features that access the context index, including:

-   Search
-   Recently updated
-   Space activity

Page updates triggered by draft publishes will appear in the content index as usual.

### Things to test

Make sure:

-   The correct type of draft is created in the database - all drafts created after the the introduction of collaborative editing should be shared drafts.
-   The correct type of draft is retrieved.

## Synchrony

### What's Synchrony?

Synchrony is a micro service that allows the synchronization of arbitrary data models in real time. It supports special synchronization for HTML WYSIWYG editors, including telepointers (remote selections).

### How does Synchrony work?

![synchrony DAC diagram](/cloud/confluence/images/synchrony-dac-diagram-08-02-2016-v02-1640pwide.png)

1.  Confluence is configured to communicate with the Synchrony service using an `appId` and `appSecret`
2.  A JSON Web Token (JWT) is provided to clients containing the connection details
3.  Synchrony Javascript is loaded into the browser when the Confluence editor is initialized
4.  A web socket session is opened to Synchrony using the provided JWT and the `contentId` of the page being edited
5.  The web socket connection allows multiple clients to be kept in sync

This means that content data will be stored on the Synchrony service and the service will act as the source of truth for page content. While this is the case, Confluence will continue storing a snapshot of the most recent state of the document being edited at regular intervals. This content is stored as the body content in the shared draft but shouldn't be referenced as the most up-to-date content, as changes stored in Synchrony may not have been saved to the draft yet.

### How do we configure the Synchrony connection?

The connection to Synchrony is configured via the 'Confluence Collaborative Editor Plugin'. There are four editable parameters on the plugin configuration screen:

1.  Service URL
2.  App ID
3.  Secret
4.  Synchrony Settings (a toggle to enable or disable Synchrony)

The first three parameters must be correct in order to make a successful connection to Synchrony. The toggle allows Confluence admins to manually enable or disable the connection to the Synchrony service. Parameters can either be modified using the admin screen or a request to the `SynchronyConfigurationAction` with the following form data:

-   `appId`
-   `appSecret`
-   `serviceUrl`
-   `synchronyEnabled`

The Confluence Collaborative Editor Plugin can also be configured via system properties:

<table>
<colgroup>
<col width="33%" />
<col width="33%" />
<col width="33%" />
</colgroup>
<thead>
<tr class="header">
<th>Property</th>
<th>Description</th>
<th>Example</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p><code>synchrony.service.url</code></p></td>
<td><p>Where the plugin expects the Synchrony service to be. Trailing forward slash is optional.</p>
<p><strong>Default:</strong> http://localhost:10123/</p></td>
<td>https://synchrony.atlassian.io/</td>
</tr>
<tr class="even">
<td><p><code>synchrony.service.debug</code></p></td>
<td><p>Whether a debug <code>appId</code> should be auto-generated.</p>
<p><strong>Default:</strong> false</p></td>
<td>true</td>
</tr>
<tr class="odd">
<td><p><code>synchrony.service.debug.override.list</code></p></td>
<td><p>A list of instance hosts that should ignore the debug flag above. Useful when multiple instances are configured by the same system properties and you need to make exceptions. Yay snowflakes!</p>
<p><strong>Default:</strong> <em>none</em></p></td>
<td>https://confluence.atlassian.com</td>
</tr>
</tbody>
</table>

### The Synchrony API

Synchrony doesn't currently provide an API for third party plugins. A client-side implementation is already provided by the Confluence Collaborative Editor Plugin, which will:

-   Automatically open a session to Synchrony when the Confluence editor is opened
-   Propagate changes to synchrony when page content is changed outside of the editor (see our explanation of [external changes](#external-changes))

### The Synchrony whitelist

When a session is opened to Synchrony, a whitelist of styles, elements and attributes is provided. The whitelist prevents malicious content from being synchronized from one client to another. Any items not in the whitelist will be ignored and won't be synchronized to other editing sessions.
 

``` javascript
'styles': $.extend({}, Synchrony.whitelists.tinymce.styles, {
    // Syncing the padding-top on the body element will
    // cause an infinite sync loop (WD-170). Other
    // padding-* styles are blacklisted for
    // completeness.
    'padding-top': false,
    'padding-right': false,
    'padding-bottom': false,
    'padding-left': false,
    'padding': false,
    'display': cssQuiteSafeValueRx,
    'list-style-type': cssQuiteSafeValueRx,
    'background-image': true
}),
'attributes': $.extend({}, Synchrony.whitelists.tinymce.attributes, {
    // ** date lozenge support
    // TODO this is only a workaround, the
    // contenteditable atribute should not be synced
    'contenteditable': true,
    // -- end date lozenge support
    // ** inline comments support
    'data-ref': true,
    // -- end inline comments support
    //Extra HTML attributes CONF uses
    'accesskey' : true,
    'datetime': true,
    'data-highlight-class':true,
    'data-highlight-colour':true,
    'data-space-key':true,
    'data-username': true,
    // ** space-list macro
    'data-entity-id': true,
    'data-entity-type': true,
    'data-favourites-bound': true,
    // -- end space-list macro
    // ** macro placeholder support
    'data-macro-id': true,
    'data-macro-name': true,
    'data-macro-schema-version': true,
    'data-macro-body-type': true,
    'data-macro-parameters': true,
    'data-macro-default-parameter': true,
    // -- end macro placeholder support
    // ** page layout support
    'data-atlassian-layout': true,
    'data-placeholder-type': true,
    'data-layout': true,
    'data-title': true,
    'data-type': true,
    // -- end page layout support
    // ** inline task support
    'data-inline-task-id': true,
    // -- end inline task support
    // ** WD-323
    'data-base-url': true,
    'data-linked-resource-id': true,
    'data-linked-resource-type': true,
    'data-linked-resource-version': true,
    'data-linked-resource-default-alias': true,
    'data-linked-resource-container-version': true,
    // -- end WD-323
    'data-unresolved-comment-count': true,
    'data-location': true,
    'data-image-height': true,
    'data-image-width': true,
    'data-attachment-copy': true
    // -- end WD-323
}),
'elements': $.extend({}, Synchrony.whitelists.tinymce.elements, {
    // ** date lozenge support
    'time': true,
    // -- end date lozenge support
    'label': true,
    'form': true
})
```

### What happens if Synchrony is disabled?

Depending on how Synchrony is disabled:

-   If Synchrony is temporarily offline, users can still edit their content but are prevented from publishing. All changes are buffered; once Synchrony comes back online, buffered changes will be merged and synchronized between clients.
-   If Synchrony is intentionally switched off for an extended period, users are prevented from concurrently editing a page. If a page is already being edited, other users won't be able to edit that page at the same time. This prevents any merge conflicts and data loss while Synchrony is offline.

### Debugging Synchrony

As Confluence opens a web socket connection to Synchrony, all Synchrony traffic can be monitored in the web socket request via the developer tools' **Network** tab:

![debugging synchrony](/cloud/confluence/images/image2016-1-29-15-34-41.png)

### Things to test

-   Make sure changes are properly persisted to Synchrony. For example, plugins that display a preview in the editor should make sure that this is updated accordingly.
-   Make sure style and attribute changes aren't filtered out by the whitelist.

## External Changes

### What are external changes?

External changes refer to updates made to page content outside of the Confluence editor, like inline comments and tasks. When external changes are made, the changes need to be propagated to Synchrony to ensure that Confluence and Synchrony are in sync.

External changes can be triggered in a number of ways. A plugin can:

1.  Make a request to the Confluence REST API.
2.  Call the `ContentService`.
3.  Call the `PageManager`.

{{% warning %}}It's possible to externally modify page content using other means, but it's important to stick with the methods listed above and only update published pages to ensure the changes are correctly propagated to Synchrony. Things to be aware of:

- Don't use `ContentEntityManager` to update page content --- this'll bypass the external changes call to Synchrony.

- Don't make external changes to the draft object, as these changes will be lost when the published page is synchronized with Synchrony.{{% /warning %}}

### How do external changes work?

Synchrony provides an API that allows external applications to inform Synchrony of external changes. Confluence automatically makes a call to the Synchrony API whenever page content is updated, so plugins should avoid calling the Synchrony API directly.

{{% tip %}}If a plugin needs to modify page content, it just needs to make the appropriate updates in Confluence and the updates are pushed to Synchrony.{{% /tip %}}

### How are external changes triggered?

The external changes call to the Synchrony API will be made from `PageManager#saveContentEntity`.

If page updates are made which bypass the `PageManager`, then updates won't be synchronized to Synchrony.

### What external changes will be pushed to Synchrony?

Changes to the following will be propagated to Synchrony:

-   Page title
-   Body contents

### Event List

<table>
<colgroup>
<col width="25%" />
<col width="25%" />
<col width="25%" />
<col width="25%" />
</colgroup>
<thead>
<tr class="header">
<th>Event</th>
<th>Type</th>
<th>Purpose</th>
<th>Example</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>editor.external.change</code></td>
<td>Javascript</td>
<td><p>Triggered after an external change has occurred and the changes have been synchronized to the editor</p>
<p>Also triggered once after the content in the editor is initialized by Synchrony.</p></td>
<td><code>AJS.bind('editor.external.change', &lt;handler function&gt;);</code></td>
</tr>
</tbody>
</table>


### Things to test

-   Any changes to page contents without interacting with the editor. Make sure the change is still present when the page is edited then published.
-   Any changes to page content made programmatically, like direct modification of the DOM using Javascript. Make sure the change is still there after an external change is made and the page is published.

## Things you shouldn't do

Don't:

-   Cache a DOM reference in the plugin JS - Synchrony will perform a replacement and render the reference obsolete. Use a selector instead.
-   Use the `ContentEntityManager` to directly modify page content - the external changes call will be bypassed. Always use the `PageManager`.

## Test Scenario Checklist

-   Test plugins with two open tabs, as this forces the synchronized changes to be filtered by the whitelist.
-   Test that external changes are correctly propagated by triggering another publish from the shared draft after the external change is made. This is to check that the change is still there after the publish.

  