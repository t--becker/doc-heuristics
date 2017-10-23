---
title: Getting started
platform: cloud
product: confcloud
category: devguide
subcategory: intro
date: "2017-04-10"
aliases:
- confcloud/quick-start-to-confluence-connect-39987884.html
- /confcloud/quick-start-to-confluence-connect-39987884.md
dac_edit_link: https://developer.atlassian.com/pages/editpage.action?cjm=wozere&pageId=39987884
dac_view_link: https://developer.atlassian.com/pages/viewpage.action?cjm=wozere&pageId=39987884
confluence_id: 39987884
---

# Getting started

This tutorial will teach you the basics of developing add-ons for Confluence Cloud using Atlassian 
Connect. The Atlassian Connect framework handles discovery, installation, authentication, and 
seamless integration into the Confluence user interface.

By the end of this tutorial, you'll have everything you need to start developing add-ons, including:

- setting up a cloud development site
- validating your setup by deploying a basic add-on 

## Before you begin

To complete this tutorial, you'll need a basic understanding of Confluence and the following:

- IDE or text editor
- [Atlassian Connect Express (ACE)](#install-ace)
- A tool for tunneling to the internet (we recommend [ngrok](https://ngrok.com/download), which is free, easy to use, and comes bundled with ACE)
- [Node.js](https://www.nodejs.org/en/download) version 4.5.0 or later 
- npm (bundled with Node.js)
- [Git](https://git-scm.com/downloads)

## Cloud development site

We'll start by getting a free Confluence Cloud development site that you can use for building and 
testing add-ons. 

1. Go to [go.atlassian.com/cloud-dev](http://go.atlassian.com/cloud-dev) to sign up. It takes several minutes to provision your site.
1. Once your site is ready, sign in, and complete the setup wizard. 

Your cloud development site has Confluence and all of the JIRA products installed, but be aware that 
Atlassian Cloud development instances have limits on the number of users.

## Enable development mode

Development mode allows you to install add-on descriptors from any public URL in your development 
site. This means that you do not need to list the add-on in the Atlassian Marketplace before 
installing it.

1. Navigate to Confluence administration (**cog icon** in the header) > **Add-ons** > **Manage add-ons**.
1. Scroll to the bottom of the **Manage add-ons** page, and click **Settings**.
1. Select **Enable development mode**, and then click **Apply**.

After the page refreshes, you'll see the **Upload add-on** link. This allows you to install add-ons 
while you're developing them.

## Install ACE

ACE is a Node.js toolkit for building Atlassian Connect add-ons. As the name suggests, it utilizes 
the Node.js Express framework, allowing you to leverage routing, middleware, and templating within 
a Node.js environment. 

1. Verify that you have Node.js and npm set up correctly (the version numbers returned may vary):

	``` bash
	$ node -v
	v5.5.0
	$ npm -v
	3.5.3
	```
1. Install `atlas-connect` by running :

	``` bash
	$ npm install -g atlas-connect
	```
1. Verify the installation by running:

	``` bash
	$ atlas-connect --help
	```

If ACE installed successfully, you'll see the following:
	
``` bash
 Usage: atlas-connect [options] [command]


 Commands:

  new [name]  create a new Atlassian add-on
  help [cmd]  display help for [cmd]

 Options:

  -h, --help     output usage information
  -V, --version  output the version number
```

## Create a basic add-on

Now, we're ready to create your first add-on. The add-on is a simple [macro](https://confluence.atlassian.com/confcloud/macros-724765157.html)  
that prints *Hello World* on Confluence pages.

Now we'll clone a repository that contains the source code for the *Hello World* add-on. 

``` bash
$ git clone https://bitbucket.org/atlassian/confluence-helloworld-addon
```

Now that we have the source code, we're ready to get to work:

1. Switch to the add-on directory:

	``` bash
	$ cd confluence-helloworld-addon
	```
1. Install dependencies for the add-on using npm:

	``` bash
	$ npm install
	```
1. Add a **credentials.json** file in your add-on directory with your information:
 - **your-confluence-domain**: Use the domain of your cloud development site (e.g., *your-domain.atlassian.net*).
 - **username**: Use the username for your Confluence account (the default user is typically **admin**).
 - **password**: Specify the password you used to register your cloud development site.

	``` json
	{
		"hosts" : {
			"<your-confluence-domain>": {
				"product" : "confluence",
				"username" : "<username>",
				"password" : "<password>"
			}
		}
	}
	```

1. Start the server:

	``` bash
	$ npm start
	```

	You should see something similar to the following: 

	``` bash
	$ npm start

	> helloworld-addon@0.0.1 start /home/ubuntu/workspace/confluence-helloworld-addon
	> node app.js

	Watching atlassian-connect.json for changes
	Initialized memory storage adapter
	Add-on server running at http://<your-machine-name>:8080
	Local tunnel established at https://<example>.ngrok.io/
	Check http://127.0.0.1:4040 for tunnel status
	Registering add-on...
	GET /atlassian-connect.json 200 11.418 ms - 633
	Saved tenant details for <example> to database
	{ key: 'confluence-helloworld-addon',
	  clientKey: 'example',
	  publicKey: 'example',
	  sharedSecret: 'example',
	  serverVersion: 'example',
	  pluginsVersion: '1.3.19',
	  baseUrl: 'https://<your-cloud-dev-site>.net/wiki',
	  productType: 'confluence',
	  description: 'Atlassian Confluence at https://<your-cloud-dev-site>.net/wiki ',
	  eventType: 'installed' }
	POST /installed?user_key=example 204 49.872 ms - -
	Registered with host at https://<your-cloud-dev-site>.net/wiki
	```

## Test your add-on

Awesome! You've just installed your first sample add-on. Let's see it in action:

1. Edit any page, and type **{hello**: 
	
	![type {hello](/cloud/confluence/images/type-hello.png)

1. Select **Hello World Macro**, and save the page. You should see the following content:

	![hello world macro](/cloud/confluence/images/hello-world-macro.png)

## Next steps

Now that you have set up your cloud development site, you're ready to get started building add-ons. 
Check out the [other tutorials](/cloud/confluence/tutorials-and-guides), or take a look at the [REST API](/cloud/confluence/about-confluence-cloud-rest-api) docs.