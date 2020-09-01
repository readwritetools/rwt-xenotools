//=============================================================================
//
// File:         /node_modules/rwt-xenotools/rwt-xenotools.js
// Language:     ECMAScript 2015
// Copyright:    Read Write Tools © 2020
// License:      MIT
// Initial date: Aug 27, 2020
// Contents:     Search popular tech websites for questions and answers related to this document
//
//=============================================================================

const Static = {
	componentName:    'rwt-xenotools',
	elementInstance:  1,
	htmlURL:          '/node_modules/rwt-xenotools/rwt-xenotools.blue',
	cssURL:           '/node_modules/rwt-xenotools/rwt-xenotools.css',
	htmlText:         null,
	cssText:          null
};

Object.seal(Static);

export default class RwtXenotools extends HTMLElement {

	constructor() {
		super();
		
		// guardrails
		this.instance = Static.elementInstance++;
		this.isComponentLoaded = false;
		
		// properties
		this.collapseSender = `${Static.componentName} ${this.instance}`;
		this.shortcutKey = null;
		
		//meta <HEAD> tags
		this.metaQuery = '';
		this.metaTagged = '';
		this.metaSubreddit = '';
		this.metaLanguage = '';
		
		// MRU user value
		this.query = '';
		this.host = '';
		
		// child elements
		this.panel = null;
		this.stackoverflow = null;
		this.quora = null;
		this.reddit = null;
		this.twitter = null;
		this.medium = null;
		this.github = null;
		this.dev = null;
		this.label1 = null;
		this.criteria1 = null;
		this.label2 = null;
		this.criteria2 = null;
		this.url = null;
		this.go = null;

		Object.seal(this);
	}
	
	//-------------------------------------------------------------------------
	// customElement life cycle callback
	//-------------------------------------------------------------------------
	async connectedCallback() {		
		if (!this.isConnected)
			return;
		
		try {
			var htmlFragment = await this.getHtmlFragment();
			var styleElement = await this.getCssStyleElement();

			this.attachShadow({mode: 'open'});
			this.shadowRoot.appendChild(htmlFragment); 
			this.shadowRoot.appendChild(styleElement); 
			
			this.identifyChildren();
			this.registerEventListeners();
			this.getMeta();
			this.initializeShortcutKey();
			this.sendComponentLoaded();
		}
		catch (err) {
			console.log(err.message);
		}
	}
	
	//-------------------------------------------------------------------------
	// initialization
	//-------------------------------------------------------------------------

	// Only the first instance of this component fetches the HTML text from the server.
	// All other instances wait for it to issue an 'html-template-ready' event.
	// If this function is called when the first instance is still pending,
	// it must wait upon receipt of the 'html-template-ready' event.
	// If this function is called after the first instance has already fetched the HTML text,
	// it will immediately issue its own 'html-template-ready' event.
	// When the event is received, create an HTMLTemplateElement from the fetched HTML text,
	// and resolve the promise with a DocumentFragment.
	getHtmlFragment() {
		return new Promise(async (resolve, reject) => {
			var htmlTemplateReady = `${Static.componentName}-html-template-ready`;
			
			document.addEventListener(htmlTemplateReady, () => {
				var template = document.createElement('template');
				template.innerHTML = Static.htmlText;
				resolve(template.content);
			});
			
			if (this.instance == 1) {
				var response = await fetch(Static.htmlURL, {cache: "no-cache", referrerPolicy: 'no-referrer'});
				if (response.status != 200 && response.status != 304) {
					reject(new Error(`Request for ${Static.htmlURL} returned with ${response.status}`));
					return;
				}
				Static.htmlText = await response.text();
				document.dispatchEvent(new Event(htmlTemplateReady));
			}
			else if (Static.htmlText != null) {
				document.dispatchEvent(new Event(htmlTemplateReady));
			}
		});
	}
	
	// Use the same pattern to fetch the CSS text from the server
	// When the 'css-text-ready' event is received, create an HTMLStyleElement from the fetched CSS text,
	// and resolve the promise with that element.
	getCssStyleElement() {
		return new Promise(async (resolve, reject) => {
			var cssTextReady = `${Static.componentName}-css-text-ready`;

			document.addEventListener(cssTextReady, () => {
				var styleElement = document.createElement('style');
				styleElement.innerHTML = Static.cssText;
				resolve(styleElement);
			});
			
			if (this.instance == 1) {
				var response = await fetch(Static.cssURL, {cache: "no-cache", referrerPolicy: 'no-referrer'});
				if (response.status != 200 && response.status != 304) {
					reject(new Error(`Request for ${Static.cssURL} returned with ${response.status}`));
					return;
				}
				Static.cssText = await response.text();
				document.dispatchEvent(new Event(cssTextReady));
			}
			else if (Static.cssText != null) {
				document.dispatchEvent(new Event(cssTextReady));
			}
		});
	}

	
	//^ Identify this component's children
	identifyChildren() {
		this.panel = this.shadowRoot.getElementById('panel');
		this.stackoverflow = this.shadowRoot.getElementById('stackoverflow');
		this.quora = this.shadowRoot.getElementById('quora');
		this.reddit = this.shadowRoot.getElementById('reddit');
		this.twitter = this.shadowRoot.getElementById('twitter');
		this.medium = this.shadowRoot.getElementById('medium');
		this.github = this.shadowRoot.getElementById('github');
		this.dev = this.shadowRoot.getElementById('dev');

		this.label1 = this.shadowRoot.getElementById('label1');
		this.criteria1 = this.shadowRoot.getElementById('criteria1');
		this.label2 = this.shadowRoot.getElementById('label2');
		this.criteria2 = this.shadowRoot.getElementById('criteria2');
		this.url= this.shadowRoot.getElementById('url');
		this.go = this.shadowRoot.getElementById('go');
	}		

	registerEventListeners() {
		// document events
		document.addEventListener('click', this.onClickDocument.bind(this));
		document.addEventListener('keydown', this.onKeydownDocument.bind(this));
		document.addEventListener('collapse-popup', this.onCollapsePopup.bind(this));
		document.addEventListener('toggle-xenotools', this.onToggleEvent.bind(this));
		
		// component events
		this.panel.addEventListener('click', this.onClickPanel.bind(this));

		this.stackoverflow.addEventListener('focus', this.onFocusStackoverflow.bind(this));
		this.quora.addEventListener('focus', this.onFocusQuora.bind(this));
		this.reddit.addEventListener('focus', this.onFocusReddit.bind(this));
		this.twitter.addEventListener('focus', this.onFocusTwitter.bind(this));
		this.medium.addEventListener('focus', this.onFocusMedium.bind(this));
		this.github.addEventListener('focus', this.onFocusGithub.bind(this));
		this.dev.addEventListener('focus', this.onFocusDev.bind(this));

		this.stackoverflow.addEventListener('click', this.onClickStackoverflow.bind(this));
		this.quora.addEventListener('click', this.onClickQuora.bind(this));
		this.reddit.addEventListener('click', this.onClickReddit.bind(this));
		this.twitter.addEventListener('click', this.onClickTwitter.bind(this));
		this.medium.addEventListener('click', this.onClickMedium.bind(this));
		this.github.addEventListener('click', this.onClickGithub.bind(this));
		this.dev.addEventListener('click', this.onClickDev.bind(this));

		this.criteria1.addEventListener('keyup', this.onChangeQuery.bind(this));
		this.criteria2.addEventListener('keyup', this.onChangeCriteria2.bind(this));
		this.url.addEventListener('keyup', this.onChangeURL.bind(this));
	}

	getMeta() {
		var meta = document.querySelector('meta[name="xenotools:query"]')
		if (meta != null) {
			this.metaQuery = meta.getAttribute('content');
			if (this.metaQuery == null)
				this.metaQuery = '';
		}
		this.query = this.metaQuery;
		
		var meta = document.querySelector('meta[name="xenotools:tagged"]')
		if (meta != null) {
			this.metaTagged = meta.getAttribute('content');
			if (this.metaTagged == null)
				this.metaTagged = '';
		}

		var meta = document.querySelector('meta[name="xenotools:subreddit"]')
		if (meta != null) {
			this.metaSubreddit = meta.getAttribute('content');
			if (this.metaSubreddit == null)
				this.metaSubreddit = '';
		}
		
		var meta = document.querySelector('meta[name="xenotools:language"]')
		if (meta != null) {
			this.metaLanguage = meta.getAttribute('content');
			if (this.metaLanguage == null)
				this.metaLanguage = '';
		}
	}
	
	//^ Get the user-specified shortcut key. This will be used to open the dialog.
	//  Valid values are "F1", "F2", etc., specified with the *shortcut attribute on the custom element
	initializeShortcutKey() {
		if (this.hasAttribute('shortcut'))
			this.shortcutKey = this.getAttribute('shortcut');
	}
	
	//^ Inform the document's custom element that it is ready for programmatic use 
	sendComponentLoaded() {
		this.isComponentLoaded = true;
		this.dispatchEvent(new Event('component-loaded', {bubbles: true}));
	}

	//^ A Promise that resolves when the component is loaded
	waitOnLoading() {
		return new Promise((resolve) => {
			if (this.isComponentLoaded == true)
				resolve();
			else
				this.addEventListener('component-loaded', resolve);
		});
	}
	
	//-------------------------------------------------------------------------
	// document events
	//-------------------------------------------------------------------------
	
	// User has clicked on the document
	onClickDocument(event) {
		this.hideMenu();
		event.stopPropagation();
	}

	// close the dialog when user presses the ESC key
	// toggle the dialog when user presses the assigned shortcutKey
	onKeydownDocument(event) {		
		if (event.key == "Escape") {
			this.hideMenu();
			event.stopPropagation();
		}
		// like 'F1', 'F2', etc
		if (event.key == this.shortcutKey && this.shortcutKey != null) {
			this.toggleMenu(event);
			event.stopPropagation();
			event.preventDefault();
		}
	}

	//^ Send an event to close/hide all other registered popups
	collapseOtherPopups() {
		var collapseEvent = new CustomEvent('collapse-popup', {detail: this.collapseSender});
		document.dispatchEvent(collapseEvent);
	}
	
	//^ Listen for an event on the document instructing this component to close/hide
	//  But don't collapse this component, if it was the one that generated it
	onCollapsePopup(event) {
		if (event.detail == this.collapseSender)
			return;
		else
			this.hideMenu();
	}
	
	//^ Anybody can use: document.dispatchEvent(new Event('toggle-xenotools'));
	// to open/close this component.
	onToggleEvent(event) {
		event.stopPropagation();
		this.toggleMenu(event);
	}
	
	//-------------------------------------------------------------------------
	// component events
	//-------------------------------------------------------------------------

	// User has clicked in the panel, but not on a hyperlink
	onClickPanel(event) {
		event.stopPropagation();
	}

	onFocusStackoverflow(event) {
		this.setActiveHost(event.currentTarget.id);
		this.setCriteria('stackoverflow.com', 'query', this.query, 'tagged', this.metaTagged);
		this.determineURL();
	}

	onFocusQuora(event) {
		this.setActiveHost(event.currentTarget.id);
		this.setCriteria('quora.com', 'query', this.query, null, null);
		this.determineURL();
	}

	onFocusReddit(event) {
		this.setActiveHost(event.currentTarget.id);
		this.setCriteria('reddit.com', 'query', this.query, 'subreddit', this.metaSubreddit);
		this.determineURL();
	}

	onFocusTwitter(event) {
		this.setActiveHost(event.currentTarget.id);
		this.setCriteria('twitter.com', 'query', this.query, 'tagged', this.metaTagged);
		this.determineURL();
	}
	
	onFocusMedium(event) {
		this.setActiveHost(event.currentTarget.id);
		this.setCriteria('medium.com', 'query', this.query, null, null);
		this.determineURL();
	}

	onFocusGithub(event) {
		this.setActiveHost(event.currentTarget.id);
		this.setCriteria('github.com', 'query', this.query, 'language', this.metaLanguage);
		this.determineURL();
	}

	onFocusDev(event) {
		this.setActiveHost(event.currentTarget.id);
		this.setCriteria('dev.to', 'query', this.query, 'tagged', this.metaTagged);
		this.determineURL();
	}	

	onClickStackoverflow(event) {
		this.criteria1.select();
	}

	onClickQuora(event) {
		this.criteria1.select();
	}

	onClickReddit(event) {
		this.criteria1.select();
	}

	onClickTwitter(event) {
		this.criteria1.select();
	}
	
	onClickMedium(event) {
		this.criteria1.select();
	}

	onClickGithub(event) {
		this.criteria1.select();
	}

	onClickDev(event) {
		this.criteria1.select();
	}
	
	// the user has typed something in criteria1
	onChangeQuery() {
		this.determineURL();
		this.query = this.criteria1.value;
	}
	
	// the user has typed something in criteria2
	onChangeCriteria2() {
		this.determineURL();
	}
	
	// the user has typed something in url
	onChangeURL() {
		this.go.href = this.url.value;
	}
	
	//-------------------------------------------------------------------------
	// component methods
	//-------------------------------------------------------------------------
	
	// open/close
	toggleMenu(event) {
		if (this.panel.className == 'hide-menu')
			this.showMenu();
		else
			this.hideMenu();
		event.stopPropagation();		
	}

	showMenu() {
		this.collapseOtherPopups();
		this.panel.className = 'show-menu';
		this.setDefaults();
	}

	hideMenu() {
		this.panel.className = 'hide-menu';
	}
	
	setDefaults() {
		this.stackoverflow.focus();
		this.host = 'stackoverflow.com';
		this.determineURL();
	}
	
	determineURL() {
		var url = `https://${this.host}`;
		var q = this.criteria1.value
		q = q.replace(/,/g, '');				// remove commas
		q = encodeURIComponent(q);
		q = q.replace(/%20/g, '+');				// replace spaces with +
				
		switch (this.host) {	
			case 'stackoverflow.com':
				// https://stackoverflow.com/questions/tagged/css?sort=newest
				// https://stackoverflow.com/search?q=%5Bcss%5D+font-face   // %5B...%5D  tagged
				url += `/search?q=${q}`;
				var tagged = this.criteria2.value;
				if (tagged != '') {
					var tags = tagged.split(' ');
					for (let i=0; i < tags.length; i++) {
						var tag = tags[i];
						if (tag.length > 0) {
							url = url + '+' + encodeURIComponent(`[${tag}]`);
						}
					}
				}
				break;
				
			case 'quora.com':
				// https://www.quora.com/search?q=css%20font-face
				url += `/search?q=${q}`;
				break;

			case 'reddit.com':
				// https://www.reddit.com/r/css/search?q=font-face&restrict_sr=1
				var subreddit = this.criteria2.value;
				if (subreddit == '')
					subreddit = 'webdev';
				url = `${url}/r/${subreddit}/search?q=${q}&restrict_sr=1`;				
				break;
				
			case 'twitter.com':
				// https://twitter.com/search?q=css%20font-face&src=typed_query
				url += `/search?q=${q}`;
				var tagged = this.criteria2.value;
				if (tagged != '') {
					var tags = tagged.split(' ');
					for (let i=0; i < tags.length; i++) {
						var tag = tags[i];
						if (tag.length > 0) {
							if (tag.charAt(0) != '#')
								tag = '#' + tag;
							url = url + '+' + encodeURIComponent(`${tag}`);
						}
					}
				}
				url += `&src=typed_query`;
				break;
				
			case 'medium.com':
				// https://medium.com/search?q=css%20font-face
				url += `/search?q=${q}`;
				break;
				
			case 'github.com':
				// https://github.com/search?q=font-face&l=CSS&type=Issues
				url += `/search?q=${q}`;
				var lang = this.criteria2.value;
				if (lang != '')
					url += `&l=${lang}`;
				url += '&type=Issues';
				break;
				
			case 'dev.to':
				// https://dev.to/search?q=css
				url += `/search?q=${q}`;
				var tagged = this.criteria2.value;
				if (tagged != '') {
					var tags = tagged.split(' ');
					for (let i=0; i < tags.length; i++) {
						var tag = tags[i];
						if (tag.length > 0) {
							if (tag.charAt(0) != '#')
								tag = '#' + tag;
							url = url + '+' + encodeURIComponent(`${tag}`);
						}
					}
				}
				break;				
			
			default:
				console.log(`rwt-xenotools: unrecognized host ${this.host}`);
		}
		
		this.url.value = url;
		this.go.href = url;
	}
		
	//-------------------------------------------------------------------------
	// private methods
	//-------------------------------------------------------------------------
	
	//> label1, criteria1 may be null
	//> label2, criteria2 must be provided
	setCriteria(host, label1, criteria1, label2, criteria2) {
		this.host = host;
		this.url.value = host;
		this.label1.innerText = label1;
		this.criteria1.value = criteria1;

		if (label2 == null) {
			this.label2.style.display = 'none';
			this.criteria2.style.display = 'none';
		}
		else
		{
			this.label2.style.display = 'inline';
			this.criteria2.style.display = 'inline';
			this.label2.innerText = label2;
			this.criteria2.value = criteria2;
		}
	}
	
	//^ Use this to set the visual styling of one of the anchors as 'active' 
	setActiveHost(id) {
		var anchors = this.shadowRoot.querySelectorAll('a');
		for (let el of anchors) {
			if (el.id == id)
				el.classList.add('active-host');
			else
				el.classList.remove('active-host');
		}
	}

}

window.customElements.define(Static.componentName, RwtXenotools);
