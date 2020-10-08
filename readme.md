











<figure>
	<img src='/img/components/xenotools/rwt-xenotools.png' width='100%' />
	<figcaption></figcaption>
</figure>

##### Open Source DOM Component

# Xenotools

## Search popular tech websites


<address>
<img src='/img/rwtools.png' width=80 /> by <a href='https://readwritetools.com' title='Read Write Tools'>Read Write Tools</a> <time datetime=2020-08-31>Aug 31, 2020</time></address>



<table>
	<tr><th>Abstract</th></tr>
	<tr><td>The <span class=product>rwt-xenotools</span> DOM component links to popular tech forums to search for questions and answers related to this document's topic.</td></tr>
</table>

### Motivation

Sometimes visitors are unsatisfied with the information provided in your
document and need to further research the topic. As a convenience to your
visitors you can provide quick links to external forums that may have additional
information about the your document's main topic.

The <span>rwt-xenotools</span> DOM component facilitates this by
keeping a social-media style linkbar hidden at the bottom of the page until the
user needs it.

When activated, the linkbar slides over the page content, showing a collection
of icons associated with popular tech forums.

Activation may also be initiated through the component's `toggleMenu` method or
through its event interface.

The component has these features:

   * Each third-party link is prefilled with a query value that is determined by the
      document's `<meta content=xenotools:query>` value.
   * When appropriate, some links are prefilled with a hashtag values that are
      determined by the document's `<meta content=xenotools:tagged>` value.
   * The Reddit link uses any value provided by the document's `<meta content=xenotools:subreddit>`
value.
   * The Github link uses any value provided by the document's `<meta content=xenotools:language>`
value.
   * The linkbar has an event interface for showing and hiding itself.
   * The linkbar emits a custom event to close sibling menus and dialog boxes.
   * A keyboard listener is provided to allow a shortcut key to open/close the
      linkbar.

#### In the wild

To see an example of this component in use, visit the <a href='https://bluephrase.com'><span class=bp>BLUE</span><span class=phrase>PHRASE</span></a>
website and press <kbd>F6</kbd> "Link to Q&A forums". To understand what's going
on under the hood, use the browser's inspector to view the HTML source code and
network activity, and follow along as you read this documentation.

#### Prerequisites

The <span>rwt-xenotools</span> DOM component works in any browser that
supports modern W3C standards. Templates are written using <span>BLUE</span><span>
PHRASE</span> notation, which can be compiled into HTML using the free <a href='https://hub.readwritetools.com/desktop/rwview.blue'>Read Write View</a>
desktop app. It has no other prerequisites. Distribution and installation are
done with either NPM or via Github.

#### Installation using NPM

If you are familiar with Node.js and the `package.json` file, you'll be
comfortable installing the component just using this command:

```bash
npm install rwt-xenotools
```

If you are a front-end Web developer with no prior experience with NPM, follow
these general steps:

   * Install <a href='https://nodejs.org'>Node.js/NPM</a>
on your development computer.
   * Create a `package.json` file in the root of your web project using the command:
```bash
npm init
```

   * Download and install the DOM component using the command:
```bash
npm install rwt-xenotools
```


Important note: This DOM component uses Node.js and NPM and `package.json` as a
convenient *distribution and installation* mechanism. The DOM component itself
does not need them.

#### Installation using Github

If you are more comfortable using Github for installation, follow these steps:

   * Create a directory `node_modules` in the root of your web project.
   * Clone the <span>rwt-xenotools</span> DOM component into it using the
      command:
```bash
git clone https://github.com/readwritetools/rwt-xenotools.git
```


### Using the DOM component

After installation, you need to add two things to your HTML page to make use of
it.

   * Add a `script` tag to load the component's `rwt-xenotools.js` file:
```html
<script src='/node_modules/rwt-xenotools/rwt-xenotools.js' type=module></script>             
```

   * Add the component tag somewhere on the page:
```html
<rwt-xenotools id=xenotools shortcut='F6' role=navigation />
```


#### Self identification

The linkbar's inputs are prefilled with values provided in the document's <meta>
tags. Here's an example:

```html
<meta name=xenotools:query content='h1, h2, h3' />
<meta name=xenotools:tagged content=html />
<meta name=xenotools:language content=HTML />
<meta name=xenotools:subreddit content=HTML5 />
```

### Customization

#### Dialog size and position

The linkbar is positioned in a fixed location at the bottom of the viewport. Its
position and size may be overridden using CSS by defining new values for the
bottom, width and height variables.

```css
rwt-xenotools {
    --bottom: 3rem;
    --height: 11rem;
    --width: 30rem;
}
```

#### Dialog color scheme

The default color palette for the dialog uses a dark mode theme. You can use CSS
to override the variables' defaults:

```css
rwt-xenotools {
    --color: var(--white);
    --accent-color1: var(--pure-white);
    --background-color: var(--nav-black);
    --accent-background1: var(--pure-black);
    --accent-background2: var(--medium-black);
    --accent-background3: var(--light-black);
    --accent-background4: var(--title-blue);
    --border-color1: var(--gray);    
    --border-color2: var(--pure-white);    
    --border-color3: var(--pure-black);    
}
```

### Life-cycle events

The component issues life-cycle events.


<dl>
	<dt><code>component-loaded</code></dt>
	<dd>Sent when the component is fully loaded and ready to be used. As a convenience you can use the <code>waitOnLoading()</code> method which returns a promise that resolves when the <code>component-loaded</code> event is received. Call this asynchronously with <code>await</code>.</dd>
</dl>

---

### Reference


<table>
	<tr><td><img src='/img/read-write-hub.png' alt='DOM components logo' width=40 /></td>	<td>Documentation</td> 		<td><a href='https://hub.readwritetools.com/components/xenotools.blue'>READ WRITE HUB</a></td></tr>
	<tr><td><img src='/img/git.png' alt='git logo' width=40 /></td>	<td>Source code</td> 			<td><a href='https://github.com/readwritetools/rwt-xenotools'>github</a></td></tr>
	<tr><td><img src='/img/dom-components.png' alt='DOM components logo' width=40 /></td>	<td>Component catalog</td> 	<td><a href='https://domcomponents.com/xenotools.blue'>DOM COMPONENTS</a></td></tr>
	<tr><td><img src='/img/npm.png' alt='npm logo' width=40 /></td>	<td>Package installation</td> <td><a href='https://www.npmjs.com/package/rwt-xenotools'>npm</a></td></tr>
	<tr><td><img src='/img/read-write-stack.png' alt='Read Write Stack logo' width=40 /></td>	<td>Publication venue</td>	<td><a href='https://readwritestack.com/components/xenotools.blue'>READ WRITE STACK</a></td></tr>
</table>

### License

The <span>rwt-xenotools</span> DOM component is licensed under the MIT
License.

<img src='/img/blue-seal-mit.png' width=80 align=right />

<details>
	<summary>MIT License</summary>
	<p>Copyright © 2020 Read Write Tools.</p>
	<p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</p>
	<p>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p>
	<p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>
</details>

