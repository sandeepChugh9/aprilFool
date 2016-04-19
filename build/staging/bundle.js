/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	(function(W) {
	    'use strict';

	    __webpack_require__(1);
	    W.Mustache = __webpack_require__(2);

	    var platformSdk = __webpack_require__(3);
	    var utils = __webpack_require__(4);

	    W.notifDataReceived = function(res) {
	        console.log('Some notif data recieved');
	    };

	    platformSdk.ready(function() {
	        var environment = document.body.getAttribute('data-env'),
	            config = __webpack_require__(6)(environment),
	            Constants = __webpack_require__(5);

	        W.appConfig = config;

	        var Application = __webpack_require__(7);

	        if (platformSdk.appData === undefined) {
	            platformSdk.appData = {};
	            platformSdk.appData.helperData = {};


	            // save all helperData to localStorage
	            platformSdk.events.subscribe('app.noHelperData', function(res) {
	                platformSdk.events.publish('app.store.set', {
	                    key: '_helperData',
	                    value: res
	                });
	            });

	            platformSdk.events.publish('app.store.get', {
	                key: '_helperData',
	                ctx: this,
	                cb: function(res) {
	                    if (res.status === 1) {
	                        platformSdk.appData.helperData = res.results;
	                    }
	                }
	            });

	        }

	        //if (platformSdk.bridgeEnabled) platformSdk.bridge.setDebuggableEnabled(environment === Constants.PROD_ENV || environment === Constants.DEV_ENV);

	        if ((platformSdk.appData && platformSdk.appData.platformUid === undefined) || (platformSdk.appData && platformSdk.appData.platformUid === "")) platformSdk.appData.platformUid = 'VhzmGOSwNYkM6JHE';
	        if ((platformSdk.appData && platformSdk.appData.platformToken === undefined) || (platformSdk.appData && platformSdk.appData.platformToken === "")) platformSdk.appData.platformToken = 'mACoHN4G0DI=';

	        try {
	            platformSdk.appData.helperData = JSON.parse(platformSdk.appData.helperData);
	        } catch (e) {
	            // platformSdk.helperData = platformSdk.appData.helperData;
	        }

	        var application = new Application({
	            container: document.getElementById("container"),
	            route: platformSdk.link && platformSdk.link.route // ToDo: Where is this link being set from
	        });

	        application.start();

	        window.onResume = application.resumeHikeNinja.bind(application);
	        window.intentData = application.getIntentData.bind(application);
	    });

	})(window);

/***/ },
/* 1 */
/***/ function(module, exports) {

	/* Zepto 1.1.6 - zepto event ajax form ie - zeptojs.com/license */

	var Zepto = (function() {
	  var undefined, key, $, classList, emptyArray = [], slice = emptyArray.slice, filter = emptyArray.filter,
	    document = window.document,
	    elementDisplay = {}, classCache = {},
	    cssNumber = { 'column-count': 1, 'columns': 1, 'font-weight': 1, 'line-height': 1,'opacity': 1, 'z-index': 1, 'zoom': 1 },
	    fragmentRE = /^\s*<(\w+|!)[^>]*>/,
	    singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
	    tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
	    rootNodeRE = /^(?:body|html)$/i,
	    capitalRE = /([A-Z])/g,

	    // special attributes that should be get/set via method calls
	    methodAttributes = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'],

	    adjacencyOperators = [ 'after', 'prepend', 'before', 'append' ],
	    table = document.createElement('table'),
	    tableRow = document.createElement('tr'),
	    containers = {
	      'tr': document.createElement('tbody'),
	      'tbody': table, 'thead': table, 'tfoot': table,
	      'td': tableRow, 'th': tableRow,
	      '*': document.createElement('div')
	    },
	    readyRE = /complete|loaded|interactive/,
	    simpleSelectorRE = /^[\w-]*$/,
	    class2type = {},
	    toString = class2type.toString,
	    zepto = {},
	    camelize, uniq,
	    tempParent = document.createElement('div'),
	    propMap = {
	      'tabindex': 'tabIndex',
	      'readonly': 'readOnly',
	      'for': 'htmlFor',
	      'class': 'className',
	      'maxlength': 'maxLength',
	      'cellspacing': 'cellSpacing',
	      'cellpadding': 'cellPadding',
	      'rowspan': 'rowSpan',
	      'colspan': 'colSpan',
	      'usemap': 'useMap',
	      'frameborder': 'frameBorder',
	      'contenteditable': 'contentEditable'
	    },
	    isArray = Array.isArray ||
	      function(object){ return object instanceof Array }

	  zepto.matches = function(element, selector) {
	    if (!selector || !element || element.nodeType !== 1) return false
	    var matchesSelector = element.webkitMatchesSelector || element.mozMatchesSelector ||
	                          element.oMatchesSelector || element.matchesSelector
	    if (matchesSelector) return matchesSelector.call(element, selector)
	    // fall back to performing a selector:
	    var match, parent = element.parentNode, temp = !parent
	    if (temp) (parent = tempParent).appendChild(element)
	    match = ~zepto.qsa(parent, selector).indexOf(element)
	    temp && tempParent.removeChild(element)
	    return match
	  }

	  function type(obj) {
	    return obj == null ? String(obj) :
	      class2type[toString.call(obj)] || "object"
	  }

	  function isFunction(value) { return type(value) == "function" }
	  function isWindow(obj)     { return obj != null && obj == obj.window }
	  function isDocument(obj)   { return obj != null && obj.nodeType == obj.DOCUMENT_NODE }
	  function isObject(obj)     { return type(obj) == "object" }
	  function isPlainObject(obj) {
	    return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
	  }
	  function likeArray(obj) { return typeof obj.length == 'number' }

	  function compact(array) { return filter.call(array, function(item){ return item != null }) }
	  function flatten(array) { return array.length > 0 ? $.fn.concat.apply([], array) : array }
	  camelize = function(str){ return str.replace(/-+(.)?/g, function(match, chr){ return chr ? chr.toUpperCase() : '' }) }
	  function dasherize(str) {
	    return str.replace(/::/g, '/')
	           .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
	           .replace(/([a-z\d])([A-Z])/g, '$1_$2')
	           .replace(/_/g, '-')
	           .toLowerCase()
	  }
	  uniq = function(array){ return filter.call(array, function(item, idx){ return array.indexOf(item) == idx }) }

	  function classRE(name) {
	    return name in classCache ?
	      classCache[name] : (classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)'))
	  }

	  function maybeAddPx(name, value) {
	    return (typeof value == "number" && !cssNumber[dasherize(name)]) ? value + "px" : value
	  }

	  function defaultDisplay(nodeName) {
	    var element, display
	    if (!elementDisplay[nodeName]) {
	      element = document.createElement(nodeName)
	      document.body.appendChild(element)
	      display = getComputedStyle(element, '').getPropertyValue("display")
	      element.parentNode.removeChild(element)
	      display == "none" && (display = "block")
	      elementDisplay[nodeName] = display
	    }
	    return elementDisplay[nodeName]
	  }

	  function children(element) {
	    return 'children' in element ?
	      slice.call(element.children) :
	      $.map(element.childNodes, function(node){ if (node.nodeType == 1) return node })
	  }

	  // `$.zepto.fragment` takes a html string and an optional tag name
	  // to generate DOM nodes nodes from the given html string.
	  // The generated DOM nodes are returned as an array.
	  // This function can be overriden in plugins for example to make
	  // it compatible with browsers that don't support the DOM fully.
	  zepto.fragment = function(html, name, properties) {
	    var dom, nodes, container

	    // A special case optimization for a single tag
	    if (singleTagRE.test(html)) dom = $(document.createElement(RegExp.$1))

	    if (!dom) {
	      if (html.replace) html = html.replace(tagExpanderRE, "<$1></$2>")
	      if (name === undefined) name = fragmentRE.test(html) && RegExp.$1
	      if (!(name in containers)) name = '*'

	      container = containers[name]
	      container.innerHTML = '' + html
	      dom = $.each(slice.call(container.childNodes), function(){
	        container.removeChild(this)
	      })
	    }

	    if (isPlainObject(properties)) {
	      nodes = $(dom)
	      $.each(properties, function(key, value) {
	        if (methodAttributes.indexOf(key) > -1) nodes[key](value)
	        else nodes.attr(key, value)
	      })
	    }

	    return dom
	  }

	  // `$.zepto.Z` swaps out the prototype of the given `dom` array
	  // of nodes with `$.fn` and thus supplying all the Zepto functions
	  // to the array. Note that `__proto__` is not supported on Internet
	  // Explorer. This method can be overriden in plugins.
	  zepto.Z = function(dom, selector) {
	    dom = dom || []
	    dom.__proto__ = $.fn
	    dom.selector = selector || ''
	    return dom
	  }

	  // `$.zepto.isZ` should return `true` if the given object is a Zepto
	  // collection. This method can be overriden in plugins.
	  zepto.isZ = function(object) {
	    return object instanceof zepto.Z
	  }

	  // `$.zepto.init` is Zepto's counterpart to jQuery's `$.fn.init` and
	  // takes a CSS selector and an optional context (and handles various
	  // special cases).
	  // This method can be overriden in plugins.
	  zepto.init = function(selector, context) {
	    var dom
	    // If nothing given, return an empty Zepto collection
	    if (!selector) return zepto.Z()
	    // Optimize for string selectors
	    else if (typeof selector == 'string') {
	      selector = selector.trim()
	      // If it's a html fragment, create nodes from it
	      // Note: In both Chrome 21 and Firefox 15, DOM error 12
	      // is thrown if the fragment doesn't begin with <
	      if (selector[0] == '<' && fragmentRE.test(selector))
	        dom = zepto.fragment(selector, RegExp.$1, context), selector = null
	      // If there's a context, create a collection on that context first, and select
	      // nodes from there
	      else if (context !== undefined) return $(context).find(selector)
	      // If it's a CSS selector, use it to select nodes.
	      else dom = zepto.qsa(document, selector)
	    }
	    // If a function is given, call it when the DOM is ready
	    else if (isFunction(selector)) return $(document).ready(selector)
	    // If a Zepto collection is given, just return it
	    else if (zepto.isZ(selector)) return selector
	    else {
	      // normalize array if an array of nodes is given
	      if (isArray(selector)) dom = compact(selector)
	      // Wrap DOM nodes.
	      else if (isObject(selector))
	        dom = [selector], selector = null
	      // If it's a html fragment, create nodes from it
	      else if (fragmentRE.test(selector))
	        dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null
	      // If there's a context, create a collection on that context first, and select
	      // nodes from there
	      else if (context !== undefined) return $(context).find(selector)
	      // And last but no least, if it's a CSS selector, use it to select nodes.
	      else dom = zepto.qsa(document, selector)
	    }
	    // create a new Zepto collection from the nodes found
	    return zepto.Z(dom, selector)
	  }

	  // `$` will be the base `Zepto` object. When calling this
	  // function just call `$.zepto.init, which makes the implementation
	  // details of selecting nodes and creating Zepto collections
	  // patchable in plugins.
	  $ = function(selector, context){
	    return zepto.init(selector, context)
	  }

	  function extend(target, source, deep) {
	    for (key in source)
	      if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
	        if (isPlainObject(source[key]) && !isPlainObject(target[key]))
	          target[key] = {}
	        if (isArray(source[key]) && !isArray(target[key]))
	          target[key] = []
	        extend(target[key], source[key], deep)
	      }
	      else if (source[key] !== undefined) target[key] = source[key]
	  }

	  // Copy all but undefined properties from one or more
	  // objects to the `target` object.
	  $.extend = function(target){
	    var deep, args = slice.call(arguments, 1)
	    if (typeof target == 'boolean') {
	      deep = target
	      target = args.shift()
	    }
	    args.forEach(function(arg){ extend(target, arg, deep) })
	    return target
	  }

	  // `$.zepto.qsa` is Zepto's CSS selector implementation which
	  // uses `document.querySelectorAll` and optimizes for some special cases, like `#id`.
	  // This method can be overriden in plugins.
	  zepto.qsa = function(element, selector){
	    var found,
	        maybeID = selector[0] == '#',
	        maybeClass = !maybeID && selector[0] == '.',
	        nameOnly = maybeID || maybeClass ? selector.slice(1) : selector, // Ensure that a 1 char tag name still gets checked
	        isSimple = simpleSelectorRE.test(nameOnly)
	    return (isDocument(element) && isSimple && maybeID) ?
	      ( (found = element.getElementById(nameOnly)) ? [found] : [] ) :
	      (element.nodeType !== 1 && element.nodeType !== 9) ? [] :
	      slice.call(
	        isSimple && !maybeID ?
	          maybeClass ? element.getElementsByClassName(nameOnly) : // If it's simple, it could be a class
	          element.getElementsByTagName(selector) : // Or a tag
	          element.querySelectorAll(selector) // Or it's not simple, and we need to query all
	      )
	  }

	  function filtered(nodes, selector) {
	    return selector == null ? $(nodes) : $(nodes).filter(selector)
	  }

	  $.contains = document.documentElement.contains ?
	    function(parent, node) {
	      return parent !== node && parent.contains(node)
	    } :
	    function(parent, node) {
	      while (node && (node = node.parentNode))
	        if (node === parent) return true
	      return false
	    }

	  function funcArg(context, arg, idx, payload) {
	    return isFunction(arg) ? arg.call(context, idx, payload) : arg
	  }

	  function setAttribute(node, name, value) {
	    value == null ? node.removeAttribute(name) : node.setAttribute(name, value)
	  }

	  // access className property while respecting SVGAnimatedString
	  function className(node, value){
	    var klass = node.className || '',
	        svg   = klass && klass.baseVal !== undefined

	    if (value === undefined) return svg ? klass.baseVal : klass
	    svg ? (klass.baseVal = value) : (node.className = value)
	  }

	  // "true"  => true
	  // "false" => false
	  // "null"  => null
	  // "42"    => 42
	  // "42.5"  => 42.5
	  // "08"    => "08"
	  // JSON    => parse if valid
	  // String  => self
	  function deserializeValue(value) {
	    try {
	      return value ?
	        value == "true" ||
	        ( value == "false" ? false :
	          value == "null" ? null :
	          +value + "" == value ? +value :
	          /^[\[\{]/.test(value) ? $.parseJSON(value) :
	          value )
	        : value
	    } catch(e) {
	      return value
	    }
	  }

	  $.type = type
	  $.isFunction = isFunction
	  $.isWindow = isWindow
	  $.isArray = isArray
	  $.isPlainObject = isPlainObject

	  $.isEmptyObject = function(obj) {
	    var name
	    for (name in obj) return false
	    return true
	  }

	  $.inArray = function(elem, array, i){
	    return emptyArray.indexOf.call(array, elem, i)
	  }

	  $.camelCase = camelize
	  $.trim = function(str) {
	    return str == null ? "" : String.prototype.trim.call(str)
	  }

	  // plugin compatibility
	  $.uuid = 0
	  $.support = { }
	  $.expr = { }

	  $.map = function(elements, callback){
	    var value, values = [], i, key
	    if (likeArray(elements))
	      for (i = 0; i < elements.length; i++) {
	        value = callback(elements[i], i)
	        if (value != null) values.push(value)
	      }
	    else
	      for (key in elements) {
	        value = callback(elements[key], key)
	        if (value != null) values.push(value)
	      }
	    return flatten(values)
	  }

	  $.each = function(elements, callback){
	    var i, key
	    if (likeArray(elements)) {
	      for (i = 0; i < elements.length; i++)
	        if (callback.call(elements[i], i, elements[i]) === false) return elements
	    } else {
	      for (key in elements)
	        if (callback.call(elements[key], key, elements[key]) === false) return elements
	    }

	    return elements
	  }

	  $.grep = function(elements, callback){
	    return filter.call(elements, callback)
	  }

	  if (window.JSON) $.parseJSON = JSON.parse

	  // Populate the class2type map
	  $.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	    class2type[ "[object " + name + "]" ] = name.toLowerCase()
	  })

	  // Define methods that will be available on all
	  // Zepto collections
	  $.fn = {
	    // Because a collection acts like an array
	    // copy over these useful array functions.
	    forEach: emptyArray.forEach,
	    reduce: emptyArray.reduce,
	    push: emptyArray.push,
	    sort: emptyArray.sort,
	    indexOf: emptyArray.indexOf,
	    concat: emptyArray.concat,

	    // `map` and `slice` in the jQuery API work differently
	    // from their array counterparts
	    map: function(fn){
	      return $($.map(this, function(el, i){ return fn.call(el, i, el) }))
	    },
	    slice: function(){
	      return $(slice.apply(this, arguments))
	    },

	    ready: function(callback){
	      // need to check if document.body exists for IE as that browser reports
	      // document ready when it hasn't yet created the body element
	      if (readyRE.test(document.readyState) && document.body) callback($)
	      else document.addEventListener('DOMContentLoaded', function(){ callback($) }, false)
	      return this
	    },
	    get: function(idx){
	      return idx === undefined ? slice.call(this) : this[idx >= 0 ? idx : idx + this.length]
	    },
	    toArray: function(){ return this.get() },
	    size: function(){
	      return this.length
	    },
	    remove: function(){
	      return this.each(function(){
	        if (this.parentNode != null)
	          this.parentNode.removeChild(this)
	      })
	    },
	    each: function(callback){
	      emptyArray.every.call(this, function(el, idx){
	        return callback.call(el, idx, el) !== false
	      })
	      return this
	    },
	    filter: function(selector){
	      if (isFunction(selector)) return this.not(this.not(selector))
	      return $(filter.call(this, function(element){
	        return zepto.matches(element, selector)
	      }))
	    },
	    add: function(selector,context){
	      return $(uniq(this.concat($(selector,context))))
	    },
	    is: function(selector){
	      return this.length > 0 && zepto.matches(this[0], selector)
	    },
	    not: function(selector){
	      var nodes=[]
	      if (isFunction(selector) && selector.call !== undefined)
	        this.each(function(idx){
	          if (!selector.call(this,idx)) nodes.push(this)
	        })
	      else {
	        var excludes = typeof selector == 'string' ? this.filter(selector) :
	          (likeArray(selector) && isFunction(selector.item)) ? slice.call(selector) : $(selector)
	        this.forEach(function(el){
	          if (excludes.indexOf(el) < 0) nodes.push(el)
	        })
	      }
	      return $(nodes)
	    },
	    has: function(selector){
	      return this.filter(function(){
	        return isObject(selector) ?
	          $.contains(this, selector) :
	          $(this).find(selector).size()
	      })
	    },
	    eq: function(idx){
	      return idx === -1 ? this.slice(idx) : this.slice(idx, + idx + 1)
	    },
	    first: function(){
	      var el = this[0]
	      return el && !isObject(el) ? el : $(el)
	    },
	    last: function(){
	      var el = this[this.length - 1]
	      return el && !isObject(el) ? el : $(el)
	    },
	    find: function(selector){
	      var result, $this = this
	      if (!selector) result = $()
	      else if (typeof selector == 'object')
	        result = $(selector).filter(function(){
	          var node = this
	          return emptyArray.some.call($this, function(parent){
	            return $.contains(parent, node)
	          })
	        })
	      else if (this.length == 1) result = $(zepto.qsa(this[0], selector))
	      else result = this.map(function(){ return zepto.qsa(this, selector) })
	      return result
	    },
	    closest: function(selector, context){
	      var node = this[0], collection = false
	      if (typeof selector == 'object') collection = $(selector)
	      while (node && !(collection ? collection.indexOf(node) >= 0 : zepto.matches(node, selector)))
	        node = node !== context && !isDocument(node) && node.parentNode
	      return $(node)
	    },
	    parents: function(selector){
	      var ancestors = [], nodes = this
	      while (nodes.length > 0)
	        nodes = $.map(nodes, function(node){
	          if ((node = node.parentNode) && !isDocument(node) && ancestors.indexOf(node) < 0) {
	            ancestors.push(node)
	            return node
	          }
	        })
	      return filtered(ancestors, selector)
	    },
	    parent: function(selector){
	      return filtered(uniq(this.pluck('parentNode')), selector)
	    },
	    children: function(selector){
	      return filtered(this.map(function(){ return children(this) }), selector)
	    },
	    contents: function() {
	      return this.map(function() { return slice.call(this.childNodes) })
	    },
	    siblings: function(selector){
	      return filtered(this.map(function(i, el){
	        return filter.call(children(el.parentNode), function(child){ return child!==el })
	      }), selector)
	    },
	    empty: function(){
	      return this.each(function(){ this.innerHTML = '' })
	    },
	    // `pluck` is borrowed from Prototype.js
	    pluck: function(property){
	      return $.map(this, function(el){ return el[property] })
	    },
	    show: function(){
	      return this.each(function(){
	        this.style.display == "none" && (this.style.display = '')
	        if (getComputedStyle(this, '').getPropertyValue("display") == "none")
	          this.style.display = defaultDisplay(this.nodeName)
	      })
	    },
	    replaceWith: function(newContent){
	      return this.before(newContent).remove()
	    },
	    wrap: function(structure){
	      var func = isFunction(structure)
	      if (this[0] && !func)
	        var dom   = $(structure).get(0),
	            clone = dom.parentNode || this.length > 1

	      return this.each(function(index){
	        $(this).wrapAll(
	          func ? structure.call(this, index) :
	            clone ? dom.cloneNode(true) : dom
	        )
	      })
	    },
	    wrapAll: function(structure){
	      if (this[0]) {
	        $(this[0]).before(structure = $(structure))
	        var children
	        // drill down to the inmost element
	        while ((children = structure.children()).length) structure = children.first()
	        $(structure).append(this)
	      }
	      return this
	    },
	    wrapInner: function(structure){
	      var func = isFunction(structure)
	      return this.each(function(index){
	        var self = $(this), contents = self.contents(),
	            dom  = func ? structure.call(this, index) : structure
	        contents.length ? contents.wrapAll(dom) : self.append(dom)
	      })
	    },
	    unwrap: function(){
	      this.parent().each(function(){
	        $(this).replaceWith($(this).children())
	      })
	      return this
	    },
	    clone: function(){
	      return this.map(function(){ return this.cloneNode(true) })
	    },
	    hide: function(){
	      return this.css("display", "none")
	    },
	    toggle: function(setting){
	      return this.each(function(){
	        var el = $(this)
	        ;(setting === undefined ? el.css("display") == "none" : setting) ? el.show() : el.hide()
	      })
	    },
	    prev: function(selector){ return $(this.pluck('previousElementSibling')).filter(selector || '*') },
	    next: function(selector){ return $(this.pluck('nextElementSibling')).filter(selector || '*') },
	    html: function(html){
	      return 0 in arguments ?
	        this.each(function(idx){
	          var originHtml = this.innerHTML
	          $(this).empty().append( funcArg(this, html, idx, originHtml) )
	        }) :
	        (0 in this ? this[0].innerHTML : null)
	    },
	    text: function(text){
	      return 0 in arguments ?
	        this.each(function(idx){
	          var newText = funcArg(this, text, idx, this.textContent)
	          this.textContent = newText == null ? '' : ''+newText
	        }) :
	        (0 in this ? this[0].textContent : null)
	    },
	    attr: function(name, value){
	      var result
	      return (typeof name == 'string' && !(1 in arguments)) ?
	        (!this.length || this[0].nodeType !== 1 ? undefined :
	          (!(result = this[0].getAttribute(name)) && name in this[0]) ? this[0][name] : result
	        ) :
	        this.each(function(idx){
	          if (this.nodeType !== 1) return
	          if (isObject(name)) for (key in name) setAttribute(this, key, name[key])
	          else setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)))
	        })
	    },
	    removeAttr: function(name){
	      return this.each(function(){ this.nodeType === 1 && name.split(' ').forEach(function(attribute){
	        setAttribute(this, attribute)
	      }, this)})
	    },
	    prop: function(name, value){
	      name = propMap[name] || name
	      return (1 in arguments) ?
	        this.each(function(idx){
	          this[name] = funcArg(this, value, idx, this[name])
	        }) :
	        (this[0] && this[0][name])
	    },
	    data: function(name, value){
	      var attrName = 'data-' + name.replace(capitalRE, '-$1').toLowerCase()

	      var data = (1 in arguments) ?
	        this.attr(attrName, value) :
	        this.attr(attrName)

	      return data !== null ? deserializeValue(data) : undefined
	    },
	    val: function(value){
	      return 0 in arguments ?
	        this.each(function(idx){
	          this.value = funcArg(this, value, idx, this.value)
	        }) :
	        (this[0] && (this[0].multiple ?
	           $(this[0]).find('option').filter(function(){ return this.selected }).pluck('value') :
	           this[0].value)
	        )
	    },
	    offset: function(coordinates){
	      if (coordinates) return this.each(function(index){
	        var $this = $(this),
	            coords = funcArg(this, coordinates, index, $this.offset()),
	            parentOffset = $this.offsetParent().offset(),
	            props = {
	              top:  coords.top  - parentOffset.top,
	              left: coords.left - parentOffset.left
	            }

	        if ($this.css('position') == 'static') props['position'] = 'relative'
	        $this.css(props)
	      })
	      if (!this.length) return null
	      var obj = this[0].getBoundingClientRect()
	      return {
	        left: obj.left + window.pageXOffset,
	        top: obj.top + window.pageYOffset,
	        width: Math.round(obj.width),
	        height: Math.round(obj.height)
	      }
	    },
	    css: function(property, value){
	      if (arguments.length < 2) {
	        var computedStyle, element = this[0]
	        if(!element) return
	        computedStyle = getComputedStyle(element, '')
	        if (typeof property == 'string')
	          return element.style[camelize(property)] || computedStyle.getPropertyValue(property)
	        else if (isArray(property)) {
	          var props = {}
	          $.each(property, function(_, prop){
	            props[prop] = (element.style[camelize(prop)] || computedStyle.getPropertyValue(prop))
	          })
	          return props
	        }
	      }

	      var css = ''
	      if (type(property) == 'string') {
	        if (!value && value !== 0)
	          this.each(function(){ this.style.removeProperty(dasherize(property)) })
	        else
	          css = dasherize(property) + ":" + maybeAddPx(property, value)
	      } else {
	        for (key in property)
	          if (!property[key] && property[key] !== 0)
	            this.each(function(){ this.style.removeProperty(dasherize(key)) })
	          else
	            css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';'
	      }

	      return this.each(function(){ this.style.cssText += ';' + css })
	    },
	    index: function(element){
	      return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0])
	    },
	    hasClass: function(name){
	      if (!name) return false
	      return emptyArray.some.call(this, function(el){
	        return this.test(className(el))
	      }, classRE(name))
	    },
	    addClass: function(name){
	      if (!name) return this
	      return this.each(function(idx){
	        if (!('className' in this)) return
	        classList = []
	        var cls = className(this), newName = funcArg(this, name, idx, cls)
	        newName.split(/\s+/g).forEach(function(klass){
	          if (!$(this).hasClass(klass)) classList.push(klass)
	        }, this)
	        classList.length && className(this, cls + (cls ? " " : "") + classList.join(" "))
	      })
	    },
	    removeClass: function(name){
	      return this.each(function(idx){
	        if (!('className' in this)) return
	        if (name === undefined) return className(this, '')
	        classList = className(this)
	        funcArg(this, name, idx, classList).split(/\s+/g).forEach(function(klass){
	          classList = classList.replace(classRE(klass), " ")
	        })
	        className(this, classList.trim())
	      })
	    },
	    toggleClass: function(name, when){
	      if (!name) return this
	      return this.each(function(idx){
	        var $this = $(this), names = funcArg(this, name, idx, className(this))
	        names.split(/\s+/g).forEach(function(klass){
	          (when === undefined ? !$this.hasClass(klass) : when) ?
	            $this.addClass(klass) : $this.removeClass(klass)
	        })
	      })
	    },
	    scrollTop: function(value){
	      if (!this.length) return
	      var hasScrollTop = 'scrollTop' in this[0]
	      if (value === undefined) return hasScrollTop ? this[0].scrollTop : this[0].pageYOffset
	      return this.each(hasScrollTop ?
	        function(){ this.scrollTop = value } :
	        function(){ this.scrollTo(this.scrollX, value) })
	    },
	    scrollLeft: function(value){
	      if (!this.length) return
	      var hasScrollLeft = 'scrollLeft' in this[0]
	      if (value === undefined) return hasScrollLeft ? this[0].scrollLeft : this[0].pageXOffset
	      return this.each(hasScrollLeft ?
	        function(){ this.scrollLeft = value } :
	        function(){ this.scrollTo(value, this.scrollY) })
	    },
	    position: function() {
	      if (!this.length) return

	      var elem = this[0],
	        // Get *real* offsetParent
	        offsetParent = this.offsetParent(),
	        // Get correct offsets
	        offset       = this.offset(),
	        parentOffset = rootNodeRE.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset()

	      // Subtract element margins
	      // note: when an element has margin: auto the offsetLeft and marginLeft
	      // are the same in Safari causing offset.left to incorrectly be 0
	      offset.top  -= parseFloat( $(elem).css('margin-top') ) || 0
	      offset.left -= parseFloat( $(elem).css('margin-left') ) || 0

	      // Add offsetParent borders
	      parentOffset.top  += parseFloat( $(offsetParent[0]).css('border-top-width') ) || 0
	      parentOffset.left += parseFloat( $(offsetParent[0]).css('border-left-width') ) || 0

	      // Subtract the two offsets
	      return {
	        top:  offset.top  - parentOffset.top,
	        left: offset.left - parentOffset.left
	      }
	    },
	    offsetParent: function() {
	      return this.map(function(){
	        var parent = this.offsetParent || document.body
	        while (parent && !rootNodeRE.test(parent.nodeName) && $(parent).css("position") == "static")
	          parent = parent.offsetParent
	        return parent
	      })
	    }
	  }

	  // for now
	  $.fn.detach = $.fn.remove

	  // Generate the `width` and `height` functions
	  ;['width', 'height'].forEach(function(dimension){
	    var dimensionProperty =
	      dimension.replace(/./, function(m){ return m[0].toUpperCase() })

	    $.fn[dimension] = function(value){
	      var offset, el = this[0]
	      if (value === undefined) return isWindow(el) ? el['inner' + dimensionProperty] :
	        isDocument(el) ? el.documentElement['scroll' + dimensionProperty] :
	        (offset = this.offset()) && offset[dimension]
	      else return this.each(function(idx){
	        el = $(this)
	        el.css(dimension, funcArg(this, value, idx, el[dimension]()))
	      })
	    }
	  })

	  function traverseNode(node, fun) {
	    fun(node)
	    for (var i = 0, len = node.childNodes.length; i < len; i++)
	      traverseNode(node.childNodes[i], fun)
	  }

	  // Generate the `after`, `prepend`, `before`, `append`,
	  // `insertAfter`, `insertBefore`, `appendTo`, and `prependTo` methods.
	  adjacencyOperators.forEach(function(operator, operatorIndex) {
	    var inside = operatorIndex % 2 //=> prepend, append

	    $.fn[operator] = function(){
	      // arguments can be nodes, arrays of nodes, Zepto objects and HTML strings
	      var argType, nodes = $.map(arguments, function(arg) {
	            argType = type(arg)
	            return argType == "object" || argType == "array" || arg == null ?
	              arg : zepto.fragment(arg)
	          }),
	          parent, copyByClone = this.length > 1
	      if (nodes.length < 1) return this

	      return this.each(function(_, target){
	        parent = inside ? target : target.parentNode

	        // convert all methods to a "before" operation
	        target = operatorIndex == 0 ? target.nextSibling :
	                 operatorIndex == 1 ? target.firstChild :
	                 operatorIndex == 2 ? target :
	                 null

	        var parentInDocument = $.contains(document.documentElement, parent)

	        nodes.forEach(function(node){
	          if (copyByClone) node = node.cloneNode(true)
	          else if (!parent) return $(node).remove()

	          parent.insertBefore(node, target)
	          if (parentInDocument) traverseNode(node, function(el){
	            if (el.nodeName != null && el.nodeName.toUpperCase() === 'SCRIPT' &&
	               (!el.type || el.type === 'text/javascript') && !el.src)
	              window['eval'].call(window, el.innerHTML)
	          })
	        })
	      })
	    }

	    // after    => insertAfter
	    // prepend  => prependTo
	    // before   => insertBefore
	    // append   => appendTo
	    $.fn[inside ? operator+'To' : 'insert'+(operatorIndex ? 'Before' : 'After')] = function(html){
	      $(html)[operator](this)
	      return this
	    }
	  })

	  zepto.Z.prototype = $.fn

	  // Export internal API functions in the `$.zepto` namespace
	  zepto.uniq = uniq
	  zepto.deserializeValue = deserializeValue
	  $.zepto = zepto

	  return $
	})()

	window.Zepto = Zepto
	window.$ === undefined && (window.$ = Zepto)

	;(function($){
	  var _zid = 1, undefined,
	      slice = Array.prototype.slice,
	      isFunction = $.isFunction,
	      isString = function(obj){ return typeof obj == 'string' },
	      handlers = {},
	      specialEvents={},
	      focusinSupported = 'onfocusin' in window,
	      focus = { focus: 'focusin', blur: 'focusout' },
	      hover = { mouseenter: 'mouseover', mouseleave: 'mouseout' }

	  specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents'

	  function zid(element) {
	    return element._zid || (element._zid = _zid++)
	  }
	  function findHandlers(element, event, fn, selector) {
	    event = parse(event)
	    if (event.ns) var matcher = matcherFor(event.ns)
	    return (handlers[zid(element)] || []).filter(function(handler) {
	      return handler
	        && (!event.e  || handler.e == event.e)
	        && (!event.ns || matcher.test(handler.ns))
	        && (!fn       || zid(handler.fn) === zid(fn))
	        && (!selector || handler.sel == selector)
	    })
	  }
	  function parse(event) {
	    var parts = ('' + event).split('.')
	    return {e: parts[0], ns: parts.slice(1).sort().join(' ')}
	  }
	  function matcherFor(ns) {
	    return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)')
	  }

	  function eventCapture(handler, captureSetting) {
	    return handler.del &&
	      (!focusinSupported && (handler.e in focus)) ||
	      !!captureSetting
	  }

	  function realEvent(type) {
	    return hover[type] || (focusinSupported && focus[type]) || type
	  }

	  function add(element, events, fn, data, selector, delegator, capture){
	    var id = zid(element), set = (handlers[id] || (handlers[id] = []))
	    events.split(/\s/).forEach(function(event){
	      if (event == 'ready') return $(document).ready(fn)
	      var handler   = parse(event)
	      handler.fn    = fn
	      handler.sel   = selector
	      // emulate mouseenter, mouseleave
	      if (handler.e in hover) fn = function(e){
	        var related = e.relatedTarget
	        if (!related || (related !== this && !$.contains(this, related)))
	          return handler.fn.apply(this, arguments)
	      }
	      handler.del   = delegator
	      var callback  = delegator || fn
	      handler.proxy = function(e){
	        e = compatible(e)
	        if (e.isImmediatePropagationStopped()) return
	        e.data = data
	        var result = callback.apply(element, e._args == undefined ? [e] : [e].concat(e._args))
	        if (result === false) e.preventDefault(), e.stopPropagation()
	        return result
	      }
	      handler.i = set.length
	      set.push(handler)
	      if ('addEventListener' in element)
	        element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
	    })
	  }
	  function remove(element, events, fn, selector, capture){
	    var id = zid(element)
	    ;(events || '').split(/\s/).forEach(function(event){
	      findHandlers(element, event, fn, selector).forEach(function(handler){
	        delete handlers[id][handler.i]
	      if ('removeEventListener' in element)
	        element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
	      })
	    })
	  }

	  $.event = { add: add, remove: remove }

	  $.proxy = function(fn, context) {
	    var args = (2 in arguments) && slice.call(arguments, 2)
	    if (isFunction(fn)) {
	      var proxyFn = function(){ return fn.apply(context, args ? args.concat(slice.call(arguments)) : arguments) }
	      proxyFn._zid = zid(fn)
	      return proxyFn
	    } else if (isString(context)) {
	      if (args) {
	        args.unshift(fn[context], fn)
	        return $.proxy.apply(null, args)
	      } else {
	        return $.proxy(fn[context], fn)
	      }
	    } else {
	      throw new TypeError("expected function")
	    }
	  }

	  $.fn.bind = function(event, data, callback){
	    return this.on(event, data, callback)
	  }
	  $.fn.unbind = function(event, callback){
	    return this.off(event, callback)
	  }
	  $.fn.one = function(event, selector, data, callback){
	    return this.on(event, selector, data, callback, 1)
	  }

	  var returnTrue = function(){return true},
	      returnFalse = function(){return false},
	      ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$)/,
	      eventMethods = {
	        preventDefault: 'isDefaultPrevented',
	        stopImmediatePropagation: 'isImmediatePropagationStopped',
	        stopPropagation: 'isPropagationStopped'
	      }

	  function compatible(event, source) {
	    if (source || !event.isDefaultPrevented) {
	      source || (source = event)

	      $.each(eventMethods, function(name, predicate) {
	        var sourceMethod = source[name]
	        event[name] = function(){
	          this[predicate] = returnTrue
	          return sourceMethod && sourceMethod.apply(source, arguments)
	        }
	        event[predicate] = returnFalse
	      })

	      if (source.defaultPrevented !== undefined ? source.defaultPrevented :
	          'returnValue' in source ? source.returnValue === false :
	          source.getPreventDefault && source.getPreventDefault())
	        event.isDefaultPrevented = returnTrue
	    }
	    return event
	  }

	  function createProxy(event) {
	    var key, proxy = { originalEvent: event }
	    for (key in event)
	      if (!ignoreProperties.test(key) && event[key] !== undefined) proxy[key] = event[key]

	    return compatible(proxy, event)
	  }

	  $.fn.delegate = function(selector, event, callback){
	    return this.on(event, selector, callback)
	  }
	  $.fn.undelegate = function(selector, event, callback){
	    return this.off(event, selector, callback)
	  }

	  $.fn.live = function(event, callback){
	    $(document.body).delegate(this.selector, event, callback)
	    return this
	  }
	  $.fn.die = function(event, callback){
	    $(document.body).undelegate(this.selector, event, callback)
	    return this
	  }

	  $.fn.on = function(event, selector, data, callback, one){
	    var autoRemove, delegator, $this = this
	    if (event && !isString(event)) {
	      $.each(event, function(type, fn){
	        $this.on(type, selector, data, fn, one)
	      })
	      return $this
	    }

	    if (!isString(selector) && !isFunction(callback) && callback !== false)
	      callback = data, data = selector, selector = undefined
	    if (isFunction(data) || data === false)
	      callback = data, data = undefined

	    if (callback === false) callback = returnFalse

	    return $this.each(function(_, element){
	      if (one) autoRemove = function(e){
	        remove(element, e.type, callback)
	        return callback.apply(this, arguments)
	      }

	      if (selector) delegator = function(e){
	        var evt, match = $(e.target).closest(selector, element).get(0)
	        if (match && match !== element) {
	          evt = $.extend(createProxy(e), {currentTarget: match, liveFired: element})
	          return (autoRemove || callback).apply(match, [evt].concat(slice.call(arguments, 1)))
	        }
	      }

	      add(element, event, callback, data, selector, delegator || autoRemove)
	    })
	  }
	  $.fn.off = function(event, selector, callback){
	    var $this = this
	    if (event && !isString(event)) {
	      $.each(event, function(type, fn){
	        $this.off(type, selector, fn)
	      })
	      return $this
	    }

	    if (!isString(selector) && !isFunction(callback) && callback !== false)
	      callback = selector, selector = undefined

	    if (callback === false) callback = returnFalse

	    return $this.each(function(){
	      remove(this, event, callback, selector)
	    })
	  }

	  $.fn.trigger = function(event, args){
	    event = (isString(event) || $.isPlainObject(event)) ? $.Event(event) : compatible(event)
	    event._args = args
	    return this.each(function(){
	      // handle focus(), blur() by calling them directly
	      if (event.type in focus && typeof this[event.type] == "function") this[event.type]()
	      // items in the collection might not be DOM elements
	      else if ('dispatchEvent' in this) this.dispatchEvent(event)
	      else $(this).triggerHandler(event, args)
	    })
	  }

	  // triggers event handlers on current element just as if an event occurred,
	  // doesn't trigger an actual event, doesn't bubble
	  $.fn.triggerHandler = function(event, args){
	    var e, result
	    this.each(function(i, element){
	      e = createProxy(isString(event) ? $.Event(event) : event)
	      e._args = args
	      e.target = element
	      $.each(findHandlers(element, event.type || event), function(i, handler){
	        result = handler.proxy(e)
	        if (e.isImmediatePropagationStopped()) return false
	      })
	    })
	    return result
	  }

	  // shortcut methods for `.bind(event, fn)` for each event type
	  ;('focusin focusout focus blur load resize scroll unload click dblclick '+
	  'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave '+
	  'change select keydown keypress keyup error').split(' ').forEach(function(event) {
	    $.fn[event] = function(callback) {
	      return (0 in arguments) ?
	        this.bind(event, callback) :
	        this.trigger(event)
	    }
	  })

	  $.Event = function(type, props) {
	    if (!isString(type)) props = type, type = props.type
	    var event = document.createEvent(specialEvents[type] || 'Events'), bubbles = true
	    if (props) for (var name in props) (name == 'bubbles') ? (bubbles = !!props[name]) : (event[name] = props[name])
	    event.initEvent(type, bubbles, true)
	    return compatible(event)
	  }

	})(Zepto)

	;(function($){
	  var jsonpID = 0,
	      document = window.document,
	      key,
	      name,
	      rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
	      scriptTypeRE = /^(?:text|application)\/javascript/i,
	      xmlTypeRE = /^(?:text|application)\/xml/i,
	      jsonType = 'application/json',
	      htmlType = 'text/html',
	      blankRE = /^\s*$/,
	      originAnchor = document.createElement('a')

	  originAnchor.href = window.location.href

	  // trigger a custom event and return false if it was cancelled
	  function triggerAndReturn(context, eventName, data) {
	    var event = $.Event(eventName)
	    $(context).trigger(event, data)
	    return !event.isDefaultPrevented()
	  }

	  // trigger an Ajax "global" event
	  function triggerGlobal(settings, context, eventName, data) {
	    if (settings.global) return triggerAndReturn(context || document, eventName, data)
	  }

	  // Number of active Ajax requests
	  $.active = 0

	  function ajaxStart(settings) {
	    if (settings.global && $.active++ === 0) triggerGlobal(settings, null, 'ajaxStart')
	  }
	  function ajaxStop(settings) {
	    if (settings.global && !(--$.active)) triggerGlobal(settings, null, 'ajaxStop')
	  }

	  // triggers an extra global event "ajaxBeforeSend" that's like "ajaxSend" but cancelable
	  function ajaxBeforeSend(xhr, settings) {
	    var context = settings.context
	    if (settings.beforeSend.call(context, xhr, settings) === false ||
	        triggerGlobal(settings, context, 'ajaxBeforeSend', [xhr, settings]) === false)
	      return false

	    triggerGlobal(settings, context, 'ajaxSend', [xhr, settings])
	  }
	  function ajaxSuccess(data, xhr, settings, deferred) {
	    var context = settings.context, status = 'success'
	    settings.success.call(context, data, status, xhr)
	    if (deferred) deferred.resolveWith(context, [data, status, xhr])
	    triggerGlobal(settings, context, 'ajaxSuccess', [xhr, settings, data])
	    ajaxComplete(status, xhr, settings)
	  }
	  // type: "timeout", "error", "abort", "parsererror"
	  function ajaxError(error, type, xhr, settings, deferred) {
	    var context = settings.context
	    settings.error.call(context, xhr, type, error)
	    if (deferred) deferred.rejectWith(context, [xhr, type, error])
	    triggerGlobal(settings, context, 'ajaxError', [xhr, settings, error || type])
	    ajaxComplete(type, xhr, settings)
	  }
	  // status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
	  function ajaxComplete(status, xhr, settings) {
	    var context = settings.context
	    settings.complete.call(context, xhr, status)
	    triggerGlobal(settings, context, 'ajaxComplete', [xhr, settings])
	    ajaxStop(settings)
	  }

	  // Empty function, used as default callback
	  function empty() {}

	  $.ajaxJSONP = function(options, deferred){
	    if (!('type' in options)) return $.ajax(options)

	    var _callbackName = options.jsonpCallback,
	      callbackName = ($.isFunction(_callbackName) ?
	        _callbackName() : _callbackName) || ('jsonp' + (++jsonpID)),
	      script = document.createElement('script'),
	      originalCallback = window[callbackName],
	      responseData,
	      abort = function(errorType) {
	        $(script).triggerHandler('error', errorType || 'abort')
	      },
	      xhr = { abort: abort }, abortTimeout

	    if (deferred) deferred.promise(xhr)

	    $(script).on('load error', function(e, errorType){
	      clearTimeout(abortTimeout)
	      $(script).off().remove()

	      if (e.type == 'error' || !responseData) {
	        ajaxError(null, errorType || 'error', xhr, options, deferred)
	      } else {
	        ajaxSuccess(responseData[0], xhr, options, deferred)
	      }

	      window[callbackName] = originalCallback
	      if (responseData && $.isFunction(originalCallback))
	        originalCallback(responseData[0])

	      originalCallback = responseData = undefined
	    })

	    if (ajaxBeforeSend(xhr, options) === false) {
	      abort('abort')
	      return xhr
	    }

	    window[callbackName] = function(){
	      responseData = arguments
	    }

	    script.src = options.url.replace(/\?(.+)=\?/, '?$1=' + callbackName)
	    document.head.appendChild(script)

	    if (options.timeout > 0) abortTimeout = setTimeout(function(){
	      abort('timeout')
	    }, options.timeout)

	    return xhr
	  }

	  $.ajaxSettings = {
	    // Default type of request
	    type: 'GET',
	    // Callback that is executed before request
	    beforeSend: empty,
	    // Callback that is executed if the request succeeds
	    success: empty,
	    // Callback that is executed the the server drops error
	    error: empty,
	    // Callback that is executed on request complete (both: error and success)
	    complete: empty,
	    // The context for the callbacks
	    context: null,
	    // Whether to trigger "global" Ajax events
	    global: true,
	    // Transport
	    xhr: function () {
	      return new window.XMLHttpRequest()
	    },
	    // MIME types mapping
	    // IIS returns Javascript as "application/x-javascript"
	    accepts: {
	      script: 'text/javascript, application/javascript, application/x-javascript',
	      json:   jsonType,
	      xml:    'application/xml, text/xml',
	      html:   htmlType,
	      text:   'text/plain'
	    },
	    // Whether the request is to another domain
	    crossDomain: false,
	    // Default timeout
	    timeout: 0,
	    // Whether data should be serialized to string
	    processData: true,
	    // Whether the browser should be allowed to cache GET responses
	    cache: true
	  }

	  function mimeToDataType(mime) {
	    if (mime) mime = mime.split(';', 2)[0]
	    return mime && ( mime == htmlType ? 'html' :
	      mime == jsonType ? 'json' :
	      scriptTypeRE.test(mime) ? 'script' :
	      xmlTypeRE.test(mime) && 'xml' ) || 'text'
	  }

	  function appendQuery(url, query) {
	    if (query == '') return url
	    return (url + '&' + query).replace(/[&?]{1,2}/, '?')
	  }

	  // serialize payload and append it to the URL for GET requests
	  function serializeData(options) {
	    if (options.processData && options.data && $.type(options.data) != "string")
	      options.data = $.param(options.data, options.traditional)
	    if (options.data && (!options.type || options.type.toUpperCase() == 'GET'))
	      options.url = appendQuery(options.url, options.data), options.data = undefined
	  }

	  $.ajax = function(options){
	    var settings = $.extend({}, options || {}),
	        deferred = $.Deferred && $.Deferred(),
	        urlAnchor
	    for (key in $.ajaxSettings) if (settings[key] === undefined) settings[key] = $.ajaxSettings[key]

	    ajaxStart(settings)

	    if (!settings.crossDomain) {
	      urlAnchor = document.createElement('a')
	      urlAnchor.href = settings.url
	      urlAnchor.href = urlAnchor.href
	      settings.crossDomain = (originAnchor.protocol + '//' + originAnchor.host) !== (urlAnchor.protocol + '//' + urlAnchor.host)
	    }

	    if (!settings.url) settings.url = window.location.toString()
	    serializeData(settings)

	    var dataType = settings.dataType, hasPlaceholder = /\?.+=\?/.test(settings.url)
	    if (hasPlaceholder) dataType = 'jsonp'

	    if (settings.cache === false || (
	         (!options || options.cache !== true) &&
	         ('script' == dataType || 'jsonp' == dataType)
	        ))
	      settings.url = appendQuery(settings.url, '_=' + Date.now())

	    if ('jsonp' == dataType) {
	      if (!hasPlaceholder)
	        settings.url = appendQuery(settings.url,
	          settings.jsonp ? (settings.jsonp + '=?') : settings.jsonp === false ? '' : 'callback=?')
	      return $.ajaxJSONP(settings, deferred)
	    }

	    var mime = settings.accepts[dataType],
	        headers = { },
	        setHeader = function(name, value) { headers[name.toLowerCase()] = [name, value] },
	        protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
	        xhr = settings.xhr(),
	        nativeSetHeader = xhr.setRequestHeader,
	        abortTimeout

	    if (deferred) deferred.promise(xhr)

	    if (!settings.crossDomain) setHeader('X-Requested-With', 'XMLHttpRequest')
	    setHeader('Accept', mime || '*/*')
	    if (mime = settings.mimeType || mime) {
	      if (mime.indexOf(',') > -1) mime = mime.split(',', 2)[0]
	      xhr.overrideMimeType && xhr.overrideMimeType(mime)
	    }
	    if (settings.contentType || (settings.contentType !== false && settings.data && settings.type.toUpperCase() != 'GET'))
	      setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded')

	    if (settings.headers) for (name in settings.headers) setHeader(name, settings.headers[name])
	    xhr.setRequestHeader = setHeader

	    xhr.onreadystatechange = function(){
	      if (xhr.readyState == 4) {
	        xhr.onreadystatechange = empty
	        clearTimeout(abortTimeout)
	        var result, error = false
	        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 || (xhr.status == 0 && protocol == 'file:')) {
	          dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader('content-type'))
	          result = xhr.responseText

	          try {
	            // http://perfectionkills.com/global-eval-what-are-the-options/
	            if (dataType == 'script')    (1,eval)(result)
	            else if (dataType == 'xml')  result = xhr.responseXML
	            else if (dataType == 'json') result = blankRE.test(result) ? null : $.parseJSON(result)
	          } catch (e) { error = e }

	          if (error) ajaxError(error, 'parsererror', xhr, settings, deferred)
	          else ajaxSuccess(result, xhr, settings, deferred)
	        } else {
	          ajaxError(xhr.statusText || null, xhr.status ? 'error' : 'abort', xhr, settings, deferred)
	        }
	      }
	    }

	    if (ajaxBeforeSend(xhr, settings) === false) {
	      xhr.abort()
	      ajaxError(null, 'abort', xhr, settings, deferred)
	      return xhr
	    }

	    if (settings.xhrFields) for (name in settings.xhrFields) xhr[name] = settings.xhrFields[name]

	    var async = 'async' in settings ? settings.async : true
	    xhr.open(settings.type, settings.url, async, settings.username, settings.password)

	    for (name in headers) nativeSetHeader.apply(xhr, headers[name])

	    if (settings.timeout > 0) abortTimeout = setTimeout(function(){
	        xhr.onreadystatechange = empty
	        xhr.abort()
	        ajaxError(null, 'timeout', xhr, settings, deferred)
	      }, settings.timeout)

	    // avoid sending empty string (#319)
	    xhr.send(settings.data ? settings.data : null)
	    return xhr
	  }

	  // handle optional data/success arguments
	  function parseArguments(url, data, success, dataType) {
	    if ($.isFunction(data)) dataType = success, success = data, data = undefined
	    if (!$.isFunction(success)) dataType = success, success = undefined
	    return {
	      url: url
	    , data: data
	    , success: success
	    , dataType: dataType
	    }
	  }

	  $.get = function(/* url, data, success, dataType */){
	    return $.ajax(parseArguments.apply(null, arguments))
	  }

	  $.post = function(/* url, data, success, dataType */){
	    var options = parseArguments.apply(null, arguments)
	    options.type = 'POST'
	    return $.ajax(options)
	  }

	  $.getJSON = function(/* url, data, success */){
	    var options = parseArguments.apply(null, arguments)
	    options.dataType = 'json'
	    return $.ajax(options)
	  }

	  $.fn.load = function(url, data, success){
	    if (!this.length) return this
	    var self = this, parts = url.split(/\s/), selector,
	        options = parseArguments(url, data, success),
	        callback = options.success
	    if (parts.length > 1) options.url = parts[0], selector = parts[1]
	    options.success = function(response){
	      self.html(selector ?
	        $('<div>').html(response.replace(rscript, "")).find(selector)
	        : response)
	      callback && callback.apply(self, arguments)
	    }
	    $.ajax(options)
	    return this
	  }

	  var escape = encodeURIComponent

	  function serialize(params, obj, traditional, scope){
	    var type, array = $.isArray(obj), hash = $.isPlainObject(obj)
	    $.each(obj, function(key, value) {
	      type = $.type(value)
	      if (scope) key = traditional ? scope :
	        scope + '[' + (hash || type == 'object' || type == 'array' ? key : '') + ']'
	      // handle data in serializeArray() format
	      if (!scope && array) params.add(value.name, value.value)
	      // recurse into nested objects
	      else if (type == "array" || (!traditional && type == "object"))
	        serialize(params, value, traditional, key)
	      else params.add(key, value)
	    })
	  }

	  $.param = function(obj, traditional){
	    var params = []
	    params.add = function(key, value) {
	      if ($.isFunction(value)) value = value()
	      if (value == null) value = ""
	      this.push(escape(key) + '=' + escape(value))
	    }
	    serialize(params, obj, traditional)
	    return params.join('&').replace(/%20/g, '+')
	  }
	})(Zepto)

	;(function($){
	  $.fn.serializeArray = function() {
	    var name, type, result = [],
	      add = function(value) {
	        if (value.forEach) return value.forEach(add)
	        result.push({ name: name, value: value })
	      }
	    if (this[0]) $.each(this[0].elements, function(_, field){
	      type = field.type, name = field.name
	      if (name && field.nodeName.toLowerCase() != 'fieldset' &&
	        !field.disabled && type != 'submit' && type != 'reset' && type != 'button' && type != 'file' &&
	        ((type != 'radio' && type != 'checkbox') || field.checked))
	          add($(field).val())
	    })
	    return result
	  }

	  $.fn.serialize = function(){
	    var result = []
	    this.serializeArray().forEach(function(elm){
	      result.push(encodeURIComponent(elm.name) + '=' + encodeURIComponent(elm.value))
	    })
	    return result.join('&')
	  }

	  $.fn.submit = function(callback) {
	    if (0 in arguments) this.bind('submit', callback)
	    else if (this.length) {
	      var event = $.Event('submit')
	      this.eq(0).trigger(event)
	      if (!event.isDefaultPrevented()) this.get(0).submit()
	    }
	    return this
	  }

	})(Zepto)

	;(function($){
	  // __proto__ doesn't exist on IE<11, so redefine
	  // the Z function to use object extension instead
	  if (!('__proto__' in {})) {
	    $.extend($.zepto, {
	      Z: function(dom, selector){
	        dom = dom || []
	        $.extend(dom, $.fn)
	        dom.selector = selector || ''
	        dom.__Z = true
	        return dom
	      },
	      // this is a kludge but works
	      isZ: function(object){
	        return $.type(object) === 'array' && '__Z' in object
	      }
	    })
	  }

	  // getComputedStyle shouldn't freak out when called
	  // without a valid element as argument
	  try {
	    getComputedStyle(undefined)
	  } catch(e) {
	    var nativeGetComputedStyle = getComputedStyle;
	    window.getComputedStyle = function(element){
	      try {
	        return nativeGetComputedStyle(element)
	      } catch(e) {
	        return null
	      }
	    }
	  }
	})(Zepto)


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * mustache.js - Logic-less {{mustache}} templates with JavaScript
	 * http://github.com/janl/mustache.js
	 */

	/*global define: false Mustache: true*/

	(function defineMustache (global, factory) {
	  if (typeof exports === 'object' && exports && typeof exports.nodeName !== 'string') {
	    factory(exports); // CommonJS
	  } else if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
	  } else {
	    global.Mustache = {};
	    factory(Mustache); // script, wsh, asp
	  }
	}(this, function mustacheFactory (mustache) {

	  var objectToString = Object.prototype.toString;
	  var isArray = Array.isArray || function isArrayPolyfill (object) {
	    return objectToString.call(object) === '[object Array]';
	  };

	  function isFunction (object) {
	    return typeof object === 'function';
	  }

	  /**
	   * More correct typeof string handling array
	   * which normally returns typeof 'object'
	   */
	  function typeStr (obj) {
	    return isArray(obj) ? 'array' : typeof obj;
	  }

	  function escapeRegExp (string) {
	    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
	  }

	  /**
	   * Null safe way of checking whether or not an object,
	   * including its prototype, has a given property
	   */
	  function hasProperty (obj, propName) {
	    return obj != null && typeof obj === 'object' && (propName in obj);
	  }

	  // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
	  // See https://github.com/janl/mustache.js/issues/189
	  var regExpTest = RegExp.prototype.test;
	  function testRegExp (re, string) {
	    return regExpTest.call(re, string);
	  }

	  var nonSpaceRe = /\S/;
	  function isWhitespace (string) {
	    return !testRegExp(nonSpaceRe, string);
	  }

	  var entityMap = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#39;',
	    '/': '&#x2F;'
	  };

	  function escapeHtml (string) {
	    return String(string).replace(/[&<>"'\/]/g, function fromEntityMap (s) {
	      return entityMap[s];
	    });
	  }

	  var whiteRe = /\s*/;
	  var spaceRe = /\s+/;
	  var equalsRe = /\s*=/;
	  var curlyRe = /\s*\}/;
	  var tagRe = /#|\^|\/|>|\{|&|=|!/;

	  /**
	   * Breaks up the given `template` string into a tree of tokens. If the `tags`
	   * argument is given here it must be an array with two string values: the
	   * opening and closing tags used in the template (e.g. [ "<%", "%>" ]). Of
	   * course, the default is to use mustaches (i.e. mustache.tags).
	   *
	   * A token is an array with at least 4 elements. The first element is the
	   * mustache symbol that was used inside the tag, e.g. "#" or "&". If the tag
	   * did not contain a symbol (i.e. {{myValue}}) this element is "name". For
	   * all text that appears outside a symbol this element is "text".
	   *
	   * The second element of a token is its "value". For mustache tags this is
	   * whatever else was inside the tag besides the opening symbol. For text tokens
	   * this is the text itself.
	   *
	   * The third and fourth elements of the token are the start and end indices,
	   * respectively, of the token in the original template.
	   *
	   * Tokens that are the root node of a subtree contain two more elements: 1) an
	   * array of tokens in the subtree and 2) the index in the original template at
	   * which the closing tag for that section begins.
	   */
	  function parseTemplate (template, tags) {
	    if (!template)
	      return [];

	    var sections = [];     // Stack to hold section tokens
	    var tokens = [];       // Buffer to hold the tokens
	    var spaces = [];       // Indices of whitespace tokens on the current line
	    var hasTag = false;    // Is there a {{tag}} on the current line?
	    var nonSpace = false;  // Is there a non-space char on the current line?

	    // Strips all whitespace tokens array for the current line
	    // if there was a {{#tag}} on it and otherwise only space.
	    function stripSpace () {
	      if (hasTag && !nonSpace) {
	        while (spaces.length)
	          delete tokens[spaces.pop()];
	      } else {
	        spaces = [];
	      }

	      hasTag = false;
	      nonSpace = false;
	    }

	    var openingTagRe, closingTagRe, closingCurlyRe;
	    function compileTags (tagsToCompile) {
	      if (typeof tagsToCompile === 'string')
	        tagsToCompile = tagsToCompile.split(spaceRe, 2);

	      if (!isArray(tagsToCompile) || tagsToCompile.length !== 2)
	        throw new Error('Invalid tags: ' + tagsToCompile);

	      openingTagRe = new RegExp(escapeRegExp(tagsToCompile[0]) + '\\s*');
	      closingTagRe = new RegExp('\\s*' + escapeRegExp(tagsToCompile[1]));
	      closingCurlyRe = new RegExp('\\s*' + escapeRegExp('}' + tagsToCompile[1]));
	    }

	    compileTags(tags || mustache.tags);

	    var scanner = new Scanner(template);

	    var start, type, value, chr, token, openSection;
	    while (!scanner.eos()) {
	      start = scanner.pos;

	      // Match any text between tags.
	      value = scanner.scanUntil(openingTagRe);

	      if (value) {
	        for (var i = 0, valueLength = value.length; i < valueLength; ++i) {
	          chr = value.charAt(i);

	          if (isWhitespace(chr)) {
	            spaces.push(tokens.length);
	          } else {
	            nonSpace = true;
	          }

	          tokens.push([ 'text', chr, start, start + 1 ]);
	          start += 1;

	          // Check for whitespace on the current line.
	          if (chr === '\n')
	            stripSpace();
	        }
	      }

	      // Match the opening tag.
	      if (!scanner.scan(openingTagRe))
	        break;

	      hasTag = true;

	      // Get the tag type.
	      type = scanner.scan(tagRe) || 'name';
	      scanner.scan(whiteRe);

	      // Get the tag value.
	      if (type === '=') {
	        value = scanner.scanUntil(equalsRe);
	        scanner.scan(equalsRe);
	        scanner.scanUntil(closingTagRe);
	      } else if (type === '{') {
	        value = scanner.scanUntil(closingCurlyRe);
	        scanner.scan(curlyRe);
	        scanner.scanUntil(closingTagRe);
	        type = '&';
	      } else {
	        value = scanner.scanUntil(closingTagRe);
	      }

	      // Match the closing tag.
	      if (!scanner.scan(closingTagRe))
	        throw new Error('Unclosed tag at ' + scanner.pos);

	      token = [ type, value, start, scanner.pos ];
	      tokens.push(token);

	      if (type === '#' || type === '^') {
	        sections.push(token);
	      } else if (type === '/') {
	        // Check section nesting.
	        openSection = sections.pop();

	        if (!openSection)
	          throw new Error('Unopened section "' + value + '" at ' + start);

	        if (openSection[1] !== value)
	          throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
	      } else if (type === 'name' || type === '{' || type === '&') {
	        nonSpace = true;
	      } else if (type === '=') {
	        // Set the tags for the next time around.
	        compileTags(value);
	      }
	    }

	    // Make sure there are no open sections when we're done.
	    openSection = sections.pop();

	    if (openSection)
	      throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);

	    return nestTokens(squashTokens(tokens));
	  }

	  /**
	   * Combines the values of consecutive text tokens in the given `tokens` array
	   * to a single token.
	   */
	  function squashTokens (tokens) {
	    var squashedTokens = [];

	    var token, lastToken;
	    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
	      token = tokens[i];

	      if (token) {
	        if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
	          lastToken[1] += token[1];
	          lastToken[3] = token[3];
	        } else {
	          squashedTokens.push(token);
	          lastToken = token;
	        }
	      }
	    }

	    return squashedTokens;
	  }

	  /**
	   * Forms the given array of `tokens` into a nested tree structure where
	   * tokens that represent a section have two additional items: 1) an array of
	   * all tokens that appear in that section and 2) the index in the original
	   * template that represents the end of that section.
	   */
	  function nestTokens (tokens) {
	    var nestedTokens = [];
	    var collector = nestedTokens;
	    var sections = [];

	    var token, section;
	    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
	      token = tokens[i];

	      switch (token[0]) {
	      case '#':
	      case '^':
	        collector.push(token);
	        sections.push(token);
	        collector = token[4] = [];
	        break;
	      case '/':
	        section = sections.pop();
	        section[5] = token[2];
	        collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
	        break;
	      default:
	        collector.push(token);
	      }
	    }

	    return nestedTokens;
	  }

	  /**
	   * A simple string scanner that is used by the template parser to find
	   * tokens in template strings.
	   */
	  function Scanner (string) {
	    this.string = string;
	    this.tail = string;
	    this.pos = 0;
	  }

	  /**
	   * Returns `true` if the tail is empty (end of string).
	   */
	  Scanner.prototype.eos = function eos () {
	    return this.tail === '';
	  };

	  /**
	   * Tries to match the given regular expression at the current position.
	   * Returns the matched text if it can match, the empty string otherwise.
	   */
	  Scanner.prototype.scan = function scan (re) {
	    var match = this.tail.match(re);

	    if (!match || match.index !== 0)
	      return '';

	    var string = match[0];

	    this.tail = this.tail.substring(string.length);
	    this.pos += string.length;

	    return string;
	  };

	  /**
	   * Skips all text until the given regular expression can be matched. Returns
	   * the skipped string, which is the entire tail if no match can be made.
	   */
	  Scanner.prototype.scanUntil = function scanUntil (re) {
	    var index = this.tail.search(re), match;

	    switch (index) {
	    case -1:
	      match = this.tail;
	      this.tail = '';
	      break;
	    case 0:
	      match = '';
	      break;
	    default:
	      match = this.tail.substring(0, index);
	      this.tail = this.tail.substring(index);
	    }

	    this.pos += match.length;

	    return match;
	  };

	  /**
	   * Represents a rendering context by wrapping a view object and
	   * maintaining a reference to the parent context.
	   */
	  function Context (view, parentContext) {
	    this.view = view;
	    this.cache = { '.': this.view };
	    this.parent = parentContext;
	  }

	  /**
	   * Creates a new context using the given view with this context
	   * as the parent.
	   */
	  Context.prototype.push = function push (view) {
	    return new Context(view, this);
	  };

	  /**
	   * Returns the value of the given name in this context, traversing
	   * up the context hierarchy if the value is absent in this context's view.
	   */
	  Context.prototype.lookup = function lookup (name) {
	    var cache = this.cache;

	    var value;
	    if (cache.hasOwnProperty(name)) {
	      value = cache[name];
	    } else {
	      var context = this, names, index, lookupHit = false;

	      while (context) {
	        if (name.indexOf('.') > 0) {
	          value = context.view;
	          names = name.split('.');
	          index = 0;

	          /**
	           * Using the dot notion path in `name`, we descend through the
	           * nested objects.
	           *
	           * To be certain that the lookup has been successful, we have to
	           * check if the last object in the path actually has the property
	           * we are looking for. We store the result in `lookupHit`.
	           *
	           * This is specially necessary for when the value has been set to
	           * `undefined` and we want to avoid looking up parent contexts.
	           **/
	          while (value != null && index < names.length) {
	            if (index === names.length - 1)
	              lookupHit = hasProperty(value, names[index]);

	            value = value[names[index++]];
	          }
	        } else {
	          value = context.view[name];
	          lookupHit = hasProperty(context.view, name);
	        }

	        if (lookupHit)
	          break;

	        context = context.parent;
	      }

	      cache[name] = value;
	    }

	    if (isFunction(value))
	      value = value.call(this.view);

	    return value;
	  };

	  /**
	   * A Writer knows how to take a stream of tokens and render them to a
	   * string, given a context. It also maintains a cache of templates to
	   * avoid the need to parse the same template twice.
	   */
	  function Writer () {
	    this.cache = {};
	  }

	  /**
	   * Clears all cached templates in this writer.
	   */
	  Writer.prototype.clearCache = function clearCache () {
	    this.cache = {};
	  };

	  /**
	   * Parses and caches the given `template` and returns the array of tokens
	   * that is generated from the parse.
	   */
	  Writer.prototype.parse = function parse (template, tags) {
	    var cache = this.cache;
	    var tokens = cache[template];

	    if (tokens == null)
	      tokens = cache[template] = parseTemplate(template, tags);

	    return tokens;
	  };

	  /**
	   * High-level method that is used to render the given `template` with
	   * the given `view`.
	   *
	   * The optional `partials` argument may be an object that contains the
	   * names and templates of partials that are used in the template. It may
	   * also be a function that is used to load partial templates on the fly
	   * that takes a single argument: the name of the partial.
	   */
	  Writer.prototype.render = function render (template, view, partials) {
	    var tokens = this.parse(template);
	    var context = (view instanceof Context) ? view : new Context(view);
	    return this.renderTokens(tokens, context, partials, template);
	  };

	  /**
	   * Low-level method that renders the given array of `tokens` using
	   * the given `context` and `partials`.
	   *
	   * Note: The `originalTemplate` is only ever used to extract the portion
	   * of the original template that was contained in a higher-order section.
	   * If the template doesn't use higher-order sections, this argument may
	   * be omitted.
	   */
	  Writer.prototype.renderTokens = function renderTokens (tokens, context, partials, originalTemplate) {
	    var buffer = '';

	    var token, symbol, value;
	    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
	      value = undefined;
	      token = tokens[i];
	      symbol = token[0];

	      if (symbol === '#') value = this.renderSection(token, context, partials, originalTemplate);
	      else if (symbol === '^') value = this.renderInverted(token, context, partials, originalTemplate);
	      else if (symbol === '>') value = this.renderPartial(token, context, partials, originalTemplate);
	      else if (symbol === '&') value = this.unescapedValue(token, context);
	      else if (symbol === 'name') value = this.escapedValue(token, context);
	      else if (symbol === 'text') value = this.rawValue(token);

	      if (value !== undefined)
	        buffer += value;
	    }

	    return buffer;
	  };

	  Writer.prototype.renderSection = function renderSection (token, context, partials, originalTemplate) {
	    var self = this;
	    var buffer = '';
	    var value = context.lookup(token[1]);

	    // This function is used to render an arbitrary template
	    // in the current context by higher-order sections.
	    function subRender (template) {
	      return self.render(template, context, partials);
	    }

	    if (!value) return;

	    if (isArray(value)) {
	      for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
	        buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate);
	      }
	    } else if (typeof value === 'object' || typeof value === 'string' || typeof value === 'number') {
	      buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate);
	    } else if (isFunction(value)) {
	      if (typeof originalTemplate !== 'string')
	        throw new Error('Cannot use higher-order sections without the original template');

	      // Extract the portion of the original template that the section contains.
	      value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);

	      if (value != null)
	        buffer += value;
	    } else {
	      buffer += this.renderTokens(token[4], context, partials, originalTemplate);
	    }
	    return buffer;
	  };

	  Writer.prototype.renderInverted = function renderInverted (token, context, partials, originalTemplate) {
	    var value = context.lookup(token[1]);

	    // Use JavaScript's definition of falsy. Include empty arrays.
	    // See https://github.com/janl/mustache.js/issues/186
	    if (!value || (isArray(value) && value.length === 0))
	      return this.renderTokens(token[4], context, partials, originalTemplate);
	  };

	  Writer.prototype.renderPartial = function renderPartial (token, context, partials) {
	    if (!partials) return;

	    var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
	    if (value != null)
	      return this.renderTokens(this.parse(value), context, partials, value);
	  };

	  Writer.prototype.unescapedValue = function unescapedValue (token, context) {
	    var value = context.lookup(token[1]);
	    if (value != null)
	      return value;
	  };

	  Writer.prototype.escapedValue = function escapedValue (token, context) {
	    var value = context.lookup(token[1]);
	    if (value != null)
	      return mustache.escape(value);
	  };

	  Writer.prototype.rawValue = function rawValue (token) {
	    return token[1];
	  };

	  mustache.name = 'mustache.js';
	  mustache.version = '2.1.3';
	  mustache.tags = [ '{{', '}}' ];

	  // All high-level mustache.* functions use this writer.
	  var defaultWriter = new Writer();

	  /**
	   * Clears all cached templates in the default writer.
	   */
	  mustache.clearCache = function clearCache () {
	    return defaultWriter.clearCache();
	  };

	  /**
	   * Parses and caches the given template in the default writer and returns the
	   * array of tokens it contains. Doing this ahead of time avoids the need to
	   * parse templates on the fly as they are rendered.
	   */
	  mustache.parse = function parse (template, tags) {
	    return defaultWriter.parse(template, tags);
	  };

	  /**
	   * Renders the `template` with the given `view` and `partials` using the
	   * default writer.
	   */
	  mustache.render = function render (template, view, partials) {
	    if (typeof template !== 'string') {
	      throw new TypeError('Invalid template! Template should be a "string" ' +
	                          'but "' + typeStr(template) + '" was given as the first ' +
	                          'argument for mustache#render(template, view, partials)');
	    }

	    return defaultWriter.render(template, view, partials);
	  };

	  // This is here for backwards compatibility with 0.4.x.,
	  /*eslint-disable */ // eslint wants camel cased function name
	  mustache.to_html = function to_html (template, view, partials, send) {
	    /*eslint-enable*/

	    var result = mustache.render(template, view, partials);

	    if (isFunction(send)) {
	      send(result);
	    } else {
	      return result;
	    }
	  };

	  // Export the escaping function so that the user may override it.
	  // See https://github.com/janl/mustache.js/issues/244
	  mustache.escape = escapeHtml;

	  // Export these mainly for testing, but also for advanced usage.
	  mustache.Scanner = Scanner;
	  mustache.Context = Context;
	  mustache.Writer = Writer;

	}));


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	(function (window) {
	    'use strict';

	    var messageId,

	        /**
	         * Creates wrappers on bridge object for the list of methods provided.
	         * @param {Object} bridgeObj - The bridge object being built with methods as per platform version
	         * @param {Object[]} methodList - List of methods for which wrappers need to be created
	         * @private
	         */
	        _createWrappers = function (bridgeObj, methodList) {
	            var wrapper = function () {
	                var args = Array.prototype.slice.call(arguments);
	                _invokeMethod.apply(null, args);
	            },
	                methodKey;

	            for (var i = 0; i < methodList.length; i++) {
	                methodKey = methodList[i];
	                bridgeObj[methodKey] = wrapper.bind(null, methodKey);
	            }
	        },

	        /**
	         * Fallback for method not being available on Android Bridge.
	         * @private
	         */
	        _handleMethodNotAvailable = function () {
	            if (console) {
	                console.log("function not available");
	            }
	        },

	        /**
	         * Invokes method on Android Bridge
	         * @param {string} methodName The name of the method to be invoked
	         * @private
	         */
	        _invokeMethod = function (methodName) {
	            if (typeof PlatformBridge[methodName] === 'function') {
	                PlatformBridge[methodName].apply(PlatformBridge, Array.prototype.slice.call(arguments, 1));
	            } else {
	                _handleMethodNotAvailable();
	            }
	        };

	    /*
	     _______  _______  __   __  __   __  _______  __    _    _______  ______    ___   ______   _______  _______    __   __  _______  _______  __   __  _______  ______   _______
	     |       ||       ||  |_|  ||  |_|  ||       ||  |  | |  |  _    ||    _ |  |   | |      | |       ||       |  |  |_|  ||       ||       ||  | |  ||       ||      | |       |
	     |       ||   _   ||       ||       ||   _   ||   |_| |  | |_|   ||   | ||  |   | |  _    ||    ___||    ___|  |       ||    ___||_     _||  |_|  ||   _   ||  _    ||  _____|
	     |       ||  | |  ||       ||       ||  | |  ||       |  |       ||   |_||_ |   | | | |   ||   | __ |   |___   |       ||   |___   |   |  |       ||  | |  || | |   || |_____
	     |      _||  |_|  ||       ||       ||  |_|  ||  _    |  |  _   | |    __  ||   | | |_|   ||   ||  ||    ___|  |       ||    ___|  |   |  |       ||  |_|  || |_|   ||_____  |
	     |     |_ |       || ||_|| || ||_|| ||       || | |   |  | |_|   ||   |  | ||   | |       ||   |_| ||   |___   | ||_|| ||   |___   |   |  |   _   ||       ||       | _____| |
	     |_______||_______||_|   |_||_|   |_||_______||_|  |__|  |_______||___|  |_||___| |______| |_______||_______|  |_|   |_||_______|  |___|  |__| |__||_______||______| |_______|

	     */

	    var _commonBridgeMethods = {
	        ver0: [
	            /**
	             * Platform Bridge Version 0 Call this function to log analytics events.
	             * @method logAnalytics
	             * @memberOf platformSdk.bridge
	             * @param {string} isUI
	             * @param {string} subType
	             * @param {string} json Stringifed json object
	             */
	            'logAnalytics',

	            /**
	             * Platform Bridge Version 0 calling this function will generate logs for testing at the android IDE.
	             * @method logFromJS
	             * @memberOf platformSdk.bridge
	             * @param {string} tag
	             * @param {string} data
	             */
	            'logFromJS',

	            /**
	             * Platform Bridge Version 0 This function is called whenever the onLoadFinished of the html is called.
	             * @method onLoadFinished
	             * @memberOf platformSdk.bridge
	             * @param {string} height
	             */
	            'onLoadFinished',

	            /**
	             * Platform bridge Version 0 Call this function to open a full page webView within hike.
	             * @method openFullPage
	             * @memberOf platformSdk.bridge
	             * @param {string} title
	             * @param {string} url
	             */
	            'openFullPage',

	            /**
	             * Platform Bridge Version 0 call this function with parameter as true to enable the debugging for javascript.
	             * @method setDebuggableEnabled
	             * @memberOf platformSdk.bridge
	             * @param {string} enabled
	             */
	            'setDebuggableEnabled',

	            /**
	             * Platform Bridge Version 0 calling this function will share the screenshot of the webView along with the text at the top and a caption text to all social network platforms by calling the system's intent.
	             * @method share
	             * @memberOf platformSdk.bridge
	             * @param {string} text
	             * @param {string} caption
	             */
	            'share',

	            /**
	             * Platform Bridge Version 0 calling this function will share the screenshot of the webView along with the text at the top and a caption text to all social
	             * @method showToast
	             * @memberOf platformSdk.bridge
	             * @param {string} toast
	             */
	            'showToast',

	            /**
	             * Platform Bridge Version 0 This function can be used to start a hike native contact chooser/picker which will show all hike contacts to user and user
	             * @method startContactChooser
	             * @memberOf platformSdk.bridge
	             */
	            'startContactChooser',

	            /**
	             * Platform Bridge Version 0 Call this function to vibrate the device.
	             * @method vibrate
	             * @memberOf platformSdk.bridge
	             */
	            'vibrate'
	        ],

	        ver1: [
	            /**
	             * Platform Bridge Version 1 call this function to open a web page in the default browser.
	             * @method openPageInBrowser
	             * @memberOf platformSdk.bridge
	             * @param {string} url
	             */
	            'openPageInBrowser'
	        ],

	        ver3: [
	            /**
	             * Platform Bridge Version 3 Call this function to send email.
	             * @method sendEmail
	             * @memberOf platformSdk.bridge
	             * @param {string} subject
	             * @param {string} body
	             * @param {string} sendTo
	             */
	            'sendEmail',

	            /**
	             * Platform Bridge Version 3 Call this function to enable zooming in webViews.
	             * @method setZoomEnabled
	             * @memberOf platformSdk.bridge
	             * @param {string} enabled
	             */
	            'setZoomEnabled'
	        ],

	        ver5: [
	            /**
	             * Platform Bridge version 5 To download sticker pack
	             * @method downloadStkPack
	             * @memberOf platformSdk.bridge
	             * @param {string} stickerData
	             */
	            'downloadStkPack', // Platform Bridge version 5 To download sticker pack

	            /**
	             * Platform Bridge version 5
	             * @method sendMultiFwdSticker
	             * @memberOf platformSdk.bridge
	             * @param {string} stickerData
	             */
	            'sendMultiFwdSticker'
	        ],

	        ver6: [
	            /**
	             * Platform Bridge version 6 Call this function to close the current activity.
	             * @method closeWebView
	             * @memberOf platformSdk.bridge
	             */
	            'closeWebView'
	        ]
	    };

	    /*
	     __   __  _______  _______  _______  _______  _______  ___   __    _  _______    _______  ______    ___   ______   _______  _______    __   __  _______  _______  __   __  _______  ______   _______
	     |  |_|  ||       ||       ||       ||   _   ||       ||   | |  |  | ||       |  |  _    ||    _ |  |   | |      | |       ||       |  |  |_|  ||       ||       ||  | |  ||       ||      | |       |
	     |       ||    ___||  _____||  _____||  |_|  ||    ___||   | |   |_| ||    ___|  | |_|   ||   | ||  |   | |  _    ||    ___||    ___|  |       ||    ___||_     _||  |_|  ||   _   ||  _    ||  _____|
	     |       ||   |___ | |_____ | |_____ |       ||   | __ |   | |       ||   | __   |       ||   |_||_ |   | | | |   ||   | __ |   |___   |       ||   |___   |   |  |       ||  | |  || | |   || |_____
	     |       ||    ___||_____  ||_____  ||       ||   ||  ||   | |  _    ||   ||  |  |  _   | |    __  ||   | | |_|   ||   ||  ||    ___|  |       ||    ___|  |   |  |       ||  |_|  || |_|   ||_____  |
	     | ||_|| ||   |___  _____| | _____| ||   _   ||   |_| ||   | | | |   ||   |_| |  | |_|   ||   |  | ||   | |       ||   |_| ||   |___   | ||_|| ||   |___   |   |  |   _   ||       ||       | _____| |
	     |_|   |_||_______||_______||_______||__| |__||_______||___| |_|  |__||_______|  |_______||___|  |_||___| |______| |_______||_______|  |_|   |_||_______|  |___|  |__| |__||_______||______| |_______|

	     */

	    var _msgBridgeMethods = {
	        ver0: [
	            /**
	             * Platform Bridge Version 0 calling this function will delete the alarm associated with this javascript.
	             * @method deleteAlarm
	             * @memberOf platformSdk.bridge
	             */
	            'deleteAlarm',

	            /**
	             * Platform Bridge Version 0 call this function to delete the message.
	             * @method deleteMessage
	             * @memberOf platformSdk.bridge
	             */
	            'deleteMessage',

	            /**
	             * Platform Bridge Version 0 Calling this function will initiate forward of the message to a friend or group.
	             * @method forwardToChat
	             * @memberOf platformSdk.bridge
	             * @param {string} json
	             */
	            'forwardToChat',

	            /**
	             * Platform Bridge Version 0 calling this method will forcefully mute the chat thread.
	             * @method muteChatThread
	             * @memberOf platformSdk.bridge
	             */
	            'muteChatThread',

	            /**
	             * Platform Bridge Version 0 Call this function to set the alarm at certain time that is defined by the second parameter.
	             * @method setAlarm
	             * @memberOf platformSdk.bridge
	             * @param {string} json Stringified json
	             * @param {string} timeInMillis
	             */
	            'setAlarm',

	            /**
	             * Platform Bridge Version 0
	             * @method share
	             * @memberOf platformSdk.bridge
	             */
	            'share',

	            /**
	             * Platform Bridge Version 0 this function will update the helper data.
	             * @method updateHelperData
	             * @memberOf platformSdk.bridge
	             * @param {string} json Stringified json
	             */
	            'updateHelperData',

	            /**
	             * Platform Bridge Version 0 Calling this function will update the metadata.
	             * @method updateMetaData
	             * @memberOf platformSdk.bridge
	             * @param {string} json
	             * @param {string} notifyScreen
	             */
	            'updateMetadata'
	        ]
	    };

	    /*
	     __    _  _______  __    _         __   __  _______  _______  _______  _______  _______  ___   __    _  _______    _______  ______    ___   ______   _______  _______    __   __  _______  _______  __   __  _______  ______   _______
	     |  |  | ||       ||  |  | |       |  |_|  ||       ||       ||       ||   _   ||       ||   | |  |  | ||       |  |  _    ||    _ |  |   | |      | |       ||       |  |  |_|  ||       ||       ||  | |  ||       ||      | |       |
	     |   |_| ||   _   ||   |_| | ____  |       ||    ___||  _____||  _____||  |_|  ||    ___||   | |   |_| ||    ___|  | |_|   ||   | ||  |   | |  _    ||    ___||    ___|  |       ||    ___||_     _||  |_|  ||   _   ||  _    ||  _____|
	     |       ||  | |  ||       ||____| |       ||   |___ | |_____ | |_____ |       ||   | __ |   | |       ||   | __   |       ||   |_||_ |   | | | |   ||   | __ |   |___   |       ||   |___   |   |  |       ||  | |  || | |   || |_____
	     |  _    ||  |_|  ||  _    |       |       ||    ___||_____  ||_____  ||       ||   ||  ||   | |  _    ||   ||  |  |  _   | |    __  ||   | | |_|   ||   ||  ||    ___|  |       ||    ___|  |   |  |       ||  |_|  || |_|   ||_____  |
	     | | |   ||       || | |   |       | ||_|| ||   |___  _____| | _____| ||   _   ||   |_| ||   | | | |   ||   |_| |  | |_|   ||   |  | ||   | |       ||   |_| ||   |___   | ||_|| ||   |___   |   |  |   _   ||       ||       | _____| |
	     |_|  |__||_______||_|  |__|       |_|   |_||_______||_______||_______||__| |__||_______||___| |_|  |__||_______|  |_______||___|  |_||___| |______| |_______||_______|  |_|   |_||_______|  |___|  |__| |__||_______||______| |_______|

	     */
	    var _nonMsgBridgeMethods = {
	        ver1: [
	            /**
	             * Platform Bridge Version 1 Call this function to allow the back Press.
	             * @method allowBackPress
	             * @memberOf platformSdk.bridge
	             * @param {string} allowBack
	             */
	            'allowBackPress',

	            /**
	             * Platform Bridge Version 1 calling this method will forcefully block the full screen bot.
	             * @method blockChatThread
	             * @memberOf platformSdk.bridge
	             * @param {string} isBlocked
	             */
	            'blockChatThread',

	            /**
	             * Platform Bridge Version 1 call this function to delete the entire notif data of the microApp.
	             * @method deleteAllNotifData
	             * @memberOf platformSdk.bridge
	             */
	            'deleteAllNotifData',

	            /**
	             * Platform Bridge Version 1 Call this function to delete partial notif data pertaining to a microApp.
	             * @method deletePartialNotifData
	             * @memberOf platformSdk.bridge
	             */
	            'deletePartialNotifData',

	            /**
	             * Platform Bridge Version 1 Utility method to call finish of the current activity
	             * @method finish
	             * @memberOf platformSdk.bridge
	             */
	            'finish',

	            /**
	             * Platform Bridge Version 1 Calling this function will initiate forward of the message to a friend or group.
	             * @method forwardToChat
	             * @param {string} json Stringified json
	             * @param {string} hikeMessage
	             * @memberOf platformSdk.bridge
	             */
	            'forwardToChat',

	            /**
	             * Platform Bridge Version 1 calling this method will forcefully mute the full screen bot.
	             * @method muteChatThread
	             * @memberOf platformSdk.bridge
	             */
	            'muteChatThread',

	            /**
	             * Platform Bridge Version 1 Call this method to put data in cache.
	             * @method putInCache
	             * @param {string} key
	             * @param {string} value
	             * @memberOf platformSdk.bridge
	             */
	            'putInCache',

	            /**
	             * Platform Bridge Version 1 Call this method to put bulk data in cache.
	             * @method putLargeDataInCache
	             * @param {string} json Stringified json
	             * @memberOf platformSdk.bridge
	             */
	            'putLargeDataInCache',

	            /**
	             * Platform Bridge Version 1 Utility method to remove a menu from the list of menu options for a bot
	             * @method removeMenu
	             * @param {string} id
	             * @memberOf platformSdk.bridge
	             */
	            'removeMenu',

	            /**
	             * Platform Bridge Version 1 Utility method to fetch the overflowMenu from the MicroApp.
	             * @method replaceOverflowMenu
	             * @param {string} newMenuString Stringified menu item object
	             * @memberOf platformSdk.bridge
	             */
	            'replaceOverflowMenu',

	            /**
	             * Platform Bridge Version 1 this function will update the helper data.
	             * @method updateHelperData
	             * @param {string} json Stringified helper data object
	             * @memberOf platformSdk.bridge
	             */
	            'updateHelperData',

	            /**
	             * Platform Bridge Version 1 Call this function to update the overflow menu items.
	             * @method updateOverflowMenu
	             * @param {string} itemId
	             * @param {string} itemJson Stringified menu item json
	             * @memberOf platformSdk.bridge
	             */
	            'updateOverflowMenu'
	        ],

	        ver2: [
	            /**
	             * Platform Version 2 called by the special packet sent in the bot to delete the conversation of the particular bot
	             * @method deleteBotConversation
	             * @memberOf platformSdk.bridge
	             */
	            'deleteBotConversation',

	            /**
	             * Platform bridge Version 2 Call this function to open a full page webView within hike.
	             * @method openFullPage
	             * @param {string} title
	             * @param {string} url
	             * @memberOf platformSdk.bridge
	             */
	            'openFullPage'
	        ],

	        ver3: [
	            /**
	             * Platform Version 3 call this method to change the title of the action bar for the bot.
	             * @method changeBotTitle
	             * @param {string} title New title
	             * @memberOf platformSdk.bridge
	             */
	            'changeBotTitle',

	            /**
	             * Platform Bridge Version 3 call this function to delete the entire caching related to the namespace of the bot.
	             * @method deleteAllCacheData
	             * @memberOf platformSdk.bridge
	             */
	            'deleteAllCacheData',

	            /**
	             * Platform Bridge Version 3 Call this function to delete partial cached data pertaining to the namespace of the bot, The key is provided by Javascript
	             * @method deletePartialCacheData
	             * @param {string} key
	             * @memberOf platformSdk.bridge
	             */
	            'deletePartialCacheData',

	            /**
	             * Platform Version 3 call this method to reset the title of the action bar for the bot to the original title sent by server.
	             * @method resetBotTitle
	             * @memberOf platformSdk.bridge
	             */
	            'resetBotTitle'
	        ],

	        ver4: [
	            /**
	             * Platform bridge Version 4 Call this method to change the status bar color at runtime.
	             * @method setStatusBarColor
	             * @param {string} sbColor Status bar color in argb
	             * @memberOf platformSdk.bridge
	             */
	            'setStatusBarColor'
	        ],

	        ver5: [
	            /**
	             * Platform Bridge Version 5 Call this function to allow the up Press.
	             * @method allowUpPress
	             * @param {string} toAllow
	             * @memberOf platformSdk.bridge
	             */
	            'allowUpPress',

	            /**
	             * Platform Bridge Version 5 Call this function to change action bar color at runtime.
	             * @method setActionBarColor
	             * @param {string} abColor Action bar color in argb
	             * @memberOf platformSdk.bridge
	             */
	            'setActionBarColor'
	        ],

	        ver6: [
	            /**
	             * Platform Version 6 This function is made for the special Shared bot that has the information about some other bots as well, and acts as a channel for them.
	             * @method blockBot
	             * @param {string} block
	             * @param {string} msisdn
	             * @memberOf platformSdk.bridge
	             */
	            'blockBot',

	            /**
	             * Platform Version 6 Call this function to delete all the events, be it shared data or normal event pertaining to a single message.
	             * @method deleteAllEventsForMessage
	             * @param {string} messageHash
	             * @memberOf platformSdk.bridge
	             */
	            'deleteAllEventsForMessage',

	            /**
	             * Platform Version 6 Call this function to delete an event from the list of events that are shared with the microapp.
	             * @method deleteEvent
	             * @param {string} eventId
	             * @memberOf platformSdk.bridge
	             */
	            'deleteEvent',

	            /**
	             * Platform Bridge Version 6 Call this method to post a status update to timeline.
	             * @method postStatusUpdate
	             * @param {string} status
	             * @param {string} moodId
	             * @param {string} [imageFilePath]
	             * @memberOf platformSdk.bridge
	             */
	            'postStatusUpdate',

	            /**
	             * Platform version 6 Call this method to send a normal event.
	             * @method sendNormalEvent
	             * @param {string} messageHash
	             * @param {string} eventData
	             * @memberOf platformSdk.bridge
	             */
	            'sendNormalEvent',

	            /**
	             * Platform Version 6 Call this function to send a shared message to the contacts of the user.
	             * @method sendSharedMessage
	             * @param {string} cardObject Stringified card object
	             * @param {string} hikeMessage
	             * @param {string} sharedData Stringified json
	             * @memberOf platformSdk.bridge
	             */
	            'sendSharedMessage' // Platform Version 6 Call this function to send a shared message to the contacts of the user.
	        ]
	    };

	    /**
	     * Initiates android bridge.
	     * @param platformVersion
	     * @param appType
	     * @param appMessageId
	     * @returns {Object}
	     */
	    window.initiateBridge = function (platformVersion, appType, appMessageId) {
	        var _bridge, bridgeMethods, counter;

	        /**
	         * Methods to interact with the Android Bridge.
	         *
	         * @namespace platformSdk.bridge
	         * @memberOf platformSdk
	         */
	        _bridge = {};

	        messageId = appMessageId;

	        bridgeMethods = appType === 'NM' ? _nonMsgBridgeMethods : _msgBridgeMethods;

	        for (counter = 0; counter <= parseInt(platformVersion); counter++) {
	            var versionKey = 'ver' + counter,
	                baseMethodList = _commonBridgeMethods[versionKey],
	                bridgeMethodList = bridgeMethods[versionKey];

	            baseMethodList && _createWrappers(_bridge, baseMethodList);
	            bridgeMethodList && _createWrappers(_bridge, bridgeMethodList);
	        }

	        return _bridge;
	    };

	})(window);

	/**
	 * @namespace platformSdk
	 */

	window.platformSdk = function (window, undefined) {
	    "use strict";

	    //classlist hack for android 2.3 and below
	    if (!("classList" in document.documentElement) && Object.defineProperty && typeof HTMLElement !== "undefined") {
	        Object.defineProperty(HTMLElement.prototype, "classList", {
	            get: function () {
	                function t (t) {
	                    return function (n) {
	                        var r = e.className.split(/\s+/),
	                            i = r.indexOf(n);
	                        t(r, i, n);
	                        e.className = r.join(" ");
	                    };
	                }

	                var e = this;
	                var n = {
	                    add: t(function (e, t, n) {
	                        ~t || e.push(n);
	                    }),
	                    remove: t(function (e, t) {
	                        ~t && e.splice(t, 1);
	                    }),
	                    toggle: t(function (e, t, n) {
	                        ~t ? e.splice(t, 1) : e.push(n);
	                    }),
	                    contains: function (t) {
	                        return !!~e.className.split(/\s+/).indexOf(t);
	                    },
	                    item: function (t) {
	                        return e.className.split(/\s+/)[t] || null;
	                    }
	                };
	                Object.defineProperty(n, "length", {
	                    get: function () {
	                        return e.className.split(/\s+/).length;
	                    }
	                });
	                return n;
	            }
	        });
	    }

	    var platformVersion = parseInt(document.getElementsByTagName('body')[0].getAttribute("data-platform-version")) || 0;
	    var appType = document.getElementsByTagName('body')[0].getAttribute("data-app-type") || 'M';
	    var messageId = document.getElementsByTagName('body')[0].getAttribute('data-message-id');

	    var platformBridge = window.initiateBridge(platformVersion, appType);

	    var fireAppInit = function () {
	        var cardHeight = document.body.offsetHeight;
	        if (platformBridge) platformSdk.ui.onLoadFinished(cardHeight + "");

	        if ('M' === appType) {
	            setTimeout(function () {
	                cardHeight = document.body.offsetHeight;

	                if (Math.abs(window.innerHeight - cardHeight) > 5 && platformBridge) {
	                    platformSdk.ui.resize(cardHeight);
	                    platformSdk.events.publish('onnativeready');
	                }
	            }, 100);
	        }
	    };

	    window.onload = fireAppInit;

	    /**
	     * Called by the android to pass on the initial data to micro app
	     * @function
	     * @global
	     * @param {String} msisdn - msisdn of micro app.
	     * @param {Object} helperData - helper data for the micro app.
	     * @param {Boolean} isSent - isSent
	     * @param {String} uid - uid
	     * @param {String} appVersion - app version
	     */
	    var setData = function (msisdn, helperData, isSent, uid, appVersion) {

	        var appData = {
	            msisdn: msisdn,
	            isSent: isSent,
	            uid: uid,
	            appVersion: appVersion
	        };

	        appData.helperData = JSON.parse(helperData);
	        setAppData(appData);
	    };

	    var appInitialized = false;


	    /**
	     * Called by the android to pass on the initial data to micro app
	     * @function
	     * @global
	     * @param {Object} appData - application data passed to the micro app on startup
	     */
	    var setAppData = function (appData) {

	        if (appInitialized) return;
	        else appInitialized = true;

	        if (typeof appData === 'string') {
	            appData = decodeURIComponent(appData);
	            appData = JSON.parse(appData);
	        }

	        if (appData.hd) {
	            appData.helperData = JSON.parse(appData.hd);
	            delete appData.hd;
	        }

	        if (appData.msisdn) {

	            platformSdk.appData = appData;

	            /*for (var key in appData) {
	             platformSdk[key] = appData[key];
	             }*/

	            if (appData.helperData) {
	                if (appData.helperData.debug) {
	                    platformSdk.debugMode = true;
	                    platformSdk.logger.logLoadTimeInfo();
	                    platformBridge.setDebuggableEnabled(true);
	                }
	            } else platformSdk.appData.helperData = {};
	        }

	        platformSdk.events.publish('webview/data/loaded');

	        if (platformSdk.appData && platformSdk.appData.helperData && platformSdk.appData.helperData.cardExpireTime) {
	            PlatformBridge.setAlarm('{"alarm_data": {"isAlarmSet": 0},  "conv_msisdn" :"' + platformSdk.msisdn + '", "inc_unread": "0", "delete_card": true}', platformSdk.helperData.cardExpireTime.toString());
	        }
	    };

	    window.setData = setData;

	    /**
	     * Called by the android to pass on the initial data to micro app
	     * @function
	     * @global
	     */
	    window.onResume = function () {
	        platformSdk.events.publish('app/onresume');
	    };

	    /**
	     * Called by the android on exit from the micro app.
	     * @function
	     * @global
	     * @fire 'app/onbeforeunload'
	     */
	    window.onPause = function () {
	        platformSdk.events.publish('app/onbeforeunload');
	    };

	    if (typeof PlatformBridge === "undefined") window.onload = setAppData;
	    
	    window.init = setAppData;

	    return {
	        /**
	         * @memberOf platformSdk
	         * @inner
	         * @type {String}
	         */
	        VERSION: '0.0.1',

	        /**
	         * @memberOf platformSdk
	         * @inner
	         * @type {String}
	         */
	        card: '',

	        /**
	         * @memberOf platformSdk
	         * @inner
	         * @type {String}
	         */
	        msisdn: null,

	        /**
	         * @memberOf platformSdk
	         * @inner
	         * @type {Boolean}
	         */
	        bridgeEnabled: true, // ToDo: This should be dynamically set

	        /**
	         * @memberOf platformSdk
	         * @inner
	         * @type {String}
	         */
	        platformVersion: platformVersion,

	        /**
	         * @memberOf platformSdk
	         * @inner
	         * @type {String}
	         */
	        appType: appType,

	        /**
	         * @memberOf platformSdk
	         * @inner
	         * @type {String}
	         */
	        messageId: messageId,

	        /**
	         * @memberOf platformSdk
	         * @inner
	         * @type {Object}
	         */
	        bridge: platformBridge,


	        /**
	         * Specify a function to execute when the micro-app and android bridge are fully loaded.
	         * @function
	         * @memberOf platformSdk
	         * @inner
	         * @param {function} fn - function to be called once the 'webview/data/loaded' event has been fired
	         */
	        ready: function (fn) {
	            var that = this;
	            var start = platformSdk.events.subscribe('webview/data/loaded', function () {
	                that.bridgeEnabled = that.checkBridge();
	                if (typeof fn === "function") fn();
	                start.remove();
	            });
	        },

	        /**
	         * checks if android bridge is available or not
	         * @function
	         * @memberOf platformSdk
	         * @inner
	         * @param {function} fn - function to be called once the 'webview/data/loaded' event has been fired
	         * @return {Boolean} 'true' if bridge available, 'false' otherwise
	         */
	        checkBridge: function () {
	            return typeof PlatformBridge === "undefined" ? false : true;
	        },

	        /**
	         * Blocks the current chat thread. The user won't see any messages in the chat thread afterwards.
	         * @function
	         * @memberOf platformSdk
	         * @inner
	         */
	        blockChatThread: function () {
	            platformBridge.blockChatThread("true");
	        },

	        /**
	         * Un-blocks the current chat thread.
	         * @function
	         * @memberOf platformSdk
	         * @inner
	         */
	        unblockChatThread: function () {
	            platformBridge.blockChatThread("false");
	        },

	        /**
	         * Deletes the current message.
	         * @function
	         * @memberOf platformSdk
	         * @inner
	         */
	        deleteMessage: function () {
	            platformBridge.deleteMessage();
	        },


	        /**
	         * Updates the metadata of the app.
	         * @function
	         * @memberOf platformSdk
	         * @inner
	         * @param {Object} data - new metaData object
	         * @param {boolean} notifyScreen - if true, the adapter will be notified of the change, else there will be only db update.
	         */
	        updateMetadata: function (data, notifyScreen) {
	            platformBridge.updateMetadata(platformSdk.utils.validateStringifyJson(data), notifyScreen);
	        },


	        /**
	         * Opens the given link in a full screen webview.
	         * @function
	         * @memberOf platformSdk
	         * @inner
	         * @param {String} title - title of the new page.
	         * @param {String} href - url of the web page to be opened in full screen.
	         */
	        openFullPage: function (title, href) {
	            platformBridge.openFullPage(title, href);
	        },


	        /**
	         * Mutes the current chat thread. The user won't receive any more notifications there after.
	         * @function
	         * @memberOf platformSdk
	         * @inner
	         */
	        muteChatThread: function () {
	            platformBridge.muteChatThread();
	        },

	        /**
	         * Deletes any alarm set by the micro app
	         * @function
	         * @memberOf platformSdk
	         * @inner
	         */
	        deleteAlarm: function () {
	            platformBridge.deleteAlarm();
	        },

	        /**
	         * Updates the helper data of the micro app.
	         * @function
	         * @memberOf platformSdk
	         * @inner
	         * @param {Object} data - new helper data object
	         */
	        updateHelperData: function (data) {
	            if (typeof platformBridge.updateHelperData === "function") platformBridge.updateHelperData(platformSdk.utils.validateStringifyJson(data));
	            else platformSdk.events.publish('app.noHelperData', data);
	        },

	        /**
	         * puts large data in the cache for the microapp.
	         * @function
	         * @memberOf platformSdk
	         * @inner
	         * @param {Object} data - data object to be put into cache
	         */
	        setBlob: function (data) {
	            var str = platformSdk.utils.validateStringifyJson(data);
	            platformBridge.putLargeDataInCache(str);
	        },

	        /**
	         * sets an alarm for the micro app for the given time.
	         * @function
	         * @memberOf platformSdk
	         * @inner
	         * @param {Object} alarmData - data to pass for setting alarm
	         * @param {Object} nextPollIt - time in milli seconds.
	         */
	        setAlarm: function (alarmData, nextPollIt) {
	            if (typeof alarmData !== 'string')
	                alarmData = platformSdk.utils.validateStringifyJson(alarmData);

	            platformBridge.setAlarm(alarmData, nextPollIt);
	        },

	        /**
	         * Gets the latest data received by the app through notifications.
	         * @function
	         * @memberOf platformSdk
	         * @inner
	         * @return {Object} latest notification data object
	         */
	        getLatestNotifData: function () {
	            var notifData = platformSdk.appData.notifData;

	            var arr = [];
	            for (var key in notifData) {
	                arr.push(key);
	            }

	            arr.sort(function (a, b) {
	                return b - a;
	            });
	            return notifData[arr[0]];
	        }
	    };
	}(window);

	if (true) {
	    module.exports = platformSdk;
	}

	/**
	 * General utility function.
	 * @namespace platformSdk.utils
	 * @memberOf platformSdk
	 */
	platformSdk.utils = function (window, platformSdk) {

	    var platformBridge = platformSdk.bridge;

	    (function () {
	        var cache = {};
	        this.tmpl = function tmpl (str, data) {
	            var fn = !/\W/.test(str) ? cache[str] = cache[str] || tmpl(document.getElementById(str).innerHTML) : new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};" + "with(obj){p.push('" + str.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');");
	            return data ? fn(data) : fn;
	        };
	    })();

	    return {
	        /**
	         * Logs the given message and caption
	         * @function
	         * @memberOf platformSdk.utils
	         * @inner
	         * @param {String} msg - message string to be logged
	         * @param {String} caption - caption for the log
	         */
	        log: function (msg, caption) {
	            if (platformSdk.bridgeEnabled) platformBridge.logFromJS("platform-js-sdk", msg);
	            if (console) {
	                if (caption)
	                    console.log(caption + ":");
	                console.log(msg);
	            }
	        },

	        debug: function (object) {
	            if (platformSdk.bridgeEnabled) platformBridge.logFromJS("platform-js-sdk", this.validateStringifyJson(object));
	        },

	        /**
	         * Logs the analytics to the analytics server
	         * @function
	         * @memberOf platformSdk.utils
	         * @inner
	         * @param {Boolean} isUI - whether the event is a UI event or not
	         * @param {String} type - the subtype of the event to be logged, eg. send "click", to determine whether it is a click event.
	         * @param {Object} analyticEvents  - the analytics event object
	         */
	        logAnalytics: function (isUI, type, analyticEvents) {
	            analyticEvents = this.validateStringifyJson(analyticEvents);
	            this.log("analytic with isui = " + isUI + " type = " + type + " analyticEvents = " + analyticEvents);
	            if (platformSdk.bridgeEnabled) PlatformBridge.logAnalytics(isUI, type, analyticEvents);
	        },

	        /**
	         * Validates and stringify a passed json Object
	         * @function
	         * @memberOf platformSdk.utils
	         * @inner
	         * @param {Object} josn - json object to be validated and strigified
	         * @return {String} stringified json
	         */
	        validateStringifyJson: function (json) {
	            //HACK to handle the helperdata bug. we cannot have \" or ' in the str.
	            var jsonString = JSON.stringify(json);
	            jsonString = jsonString.replace(/\\"/g, "&quot;");
	            jsonString = jsonString.replace(/'/g, "&#39;");
	            jsonString = jsonString.replace(/\\n/g, " ");
	            return jsonString;
	        },

	        /**
	         * Merges 2 arrays while removing the duplicate enteries.
	         * @function
	         * @memberOf platformSdk.utils
	         * @inner
	         * @param {Array} array1 - first array
	         * @param {Array} array2 - second array to be merged
	         * @return {Array} merged array
	         */
	        merge: function (array1, array2) {
	            var array = array1.concat(array2);
	            for (var i = 0; i < array.length; i++) {
	                for (var j = i + 1; j < array.length; j++) {
	                    if (array[i] === array[j])
	                        array.splice(j--, 1);
	                }
	            }
	            return array;
	        },

	        /**
	         * Sort an array with the given key
	         * @function
	         * @memberOf platformSdk.utils
	         * @inner
	         * @param {Array} array - Array to be sorted
	         * @param {String} key - key to sort the array with
	         * @param {String} type - type of sorting, 'asc' for ascending and 'desc' for descending
	         */
	        sort: function (array, key, type) {
	            type = type || 'asc';
	            return array.sort(function (a, b) {
	                var x = a[key];
	                var y = b[key];
	                if (type === "asc") return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	                else return ((x > y) ? -1 : ((x < y) ? 1 : 0));
	            });
	        },

	        /**
	         * Determines if object is empty(has no properties of his own)
	         * @function
	         * @memberOf platformSdk.utils
	         * @inner
	         * @param {Object} obj - Object to be checked for emptiness
	         * @return {Boolean} true if object is empty, false otherwise.
	         */
	        isEmpty: function (obj) {
	            for (var prop in obj) {
	                if (obj.hasOwnProperty(prop))
	                    return false;
	            }

	            return true;
	        },

	        /**
	         * Adds a given function as an event listener for a list of node elements
	         * @function
	         * @memberOf platformSdk.utils
	         * @inner
	         * @param {Array} list - list of node elemnets
	         * @param {String} event - event name
	         * @param {Function} fn - listener function
	         */
	        addEventListenerList: function (list, event, fn) {
	            for (var i = 0, len = list.length; i < len; i++) {
	                list[i].addEventListener(event, fn, false);
	            }
	        },

	        /**
	         * Removes a given function as an event listener for a list of node elements
	         * @function
	         * @memberOf platformSdk.utils
	         * @inner
	         * @param {Array} list - list of node elemnets
	         * @param {String} event - event name
	         * @param {Function} fn - listener function to be removed
	         */
	        removeEventListenerList: function (list, event, fn) {
	            for (var i = 0, len = list.length; i < len; i++) {
	                list[i].removeEventListener(event, fn, false);
	            }
	        },

	        /**
	         * returns a list of all siblings of the given element
	         * @param  {nodeElement} ele - element whose siblings are required
	         * @return {Array} list of siblings
	         */
	        siblings: function (ele) {
	            function getChildren (ele, skipMe) {
	                var r = [];
	                var elem = null;
	                for (; ele; ele = ele.nextSibling)
	                    if (ele.nodeType == 1 && ele != skipMe)
	                        r.push(ele);
	                return r;
	            }

	            return getChildren(ele.parentNode.firstChild, ele);
	        },

	        /**
	         * Scrolls down a given element to the given Y position
	         * @function
	         * @memberOf platformSdk.utils
	         * @inner
	         * @param {HtmlNode} elem - element to scroll
	         * @param {Number} Y - position to scroll to
	         * @param {Number} duration - scroll duration in milliseconds
	         * @param {Function} easingFunction - easing function to scroll with
	         * @param {Function} callback - callback once the scroll is complete
	         */
	        scrollTo: function (elem, Y, duration, easingFunction, callback) {

	            if (typeof elem == "undefined")
	                elem = document.documentElement.scrollTop ? document.documentElement : document.body;
	            var start = Date.now();
	            var from = elem.scrollTop;

	            if (from === Y) {
	                if (callback) callback();
	                return;
	                /* Prevent scrolling to the Y point if already there */
	            }

	            function min (a, b) {
	                return a < b ? a : b;
	            }

	            function scroll () {

	                var currentTime = Date.now(),
	                    time = min(1, ((currentTime - start) / duration)),
	                    easedT = easingFunction(time);

	                elem.scrollTop = (easedT * (Y - from)) + from;

	                if (time < 1) requestAnimationFrame(scroll);
	                else if (callback) callback();
	            }

	            requestAnimationFrame(scroll);
	        },

	        /**
	         * common easing function, each of them require time duration as input
	         * @namespace
	         * @memberOf platformSdk.utils
	         * @inner
	         * @property {Function} linear - no easing, no acceleration
	         * @property {Function} easeInQuad - accelerating from zero velocity
	         * @property {Function} easeOutQuad - decelerating to zero velocity
	         * @property {Function} easeInOutQuad - acceleration until halfway, then deceleration
	         * @property {Function} easeInCubic - accelerating from zero velocity
	         * @property {Function} easeOutCubic - decelerating to zero velocity
	         * @property {Function} easeInOutCubic - acceleration until halfway, then deceleration
	         * @property {Function} easeInQuart - accelerating from zero velocity
	         * @property {Function} easeOutQuart - decelerating to zero velocity
	         * @property {Function} easeInOutQuart - acceleration until halfway, then deceleration
	         * @property {Function} easeInQuint - accelerating from zero velocity
	         * @property {Function} easeOutQuint - decelerating to zero velocity
	         * @property {Function} easeInOutQuint - acceleration until halfway, then deceleration
	         */
	        easing: {
	            // no easing, no acceleration
	            linear: function (t) {
	                return t;
	            },

	            // accelerating from zero velocity
	            easeInQuad: function (t) {
	                return t * t;
	            },

	            // decelerating to zero velocity
	            easeOutQuad: function (t) {
	                return t * (2 - t);
	            },

	            // acceleration until halfway, then deceleration
	            easeInOutQuad: function (t) {
	                return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
	            },

	            // accelerating from zero velocity
	            easeInCubic: function (t) {
	                return t * t * t;
	            },

	            // decelerating to zero velocity
	            easeOutCubic: function (t) {
	                return (--t) * t * t + 1;
	            },

	            // acceleration until halfway, then deceleration
	            easeInOutCubic: function (t) {
	                return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
	            },

	            // accelerating from zero velocity
	            easeInQuart: function (t) {
	                return t * t * t * t;
	            },

	            // decelerating to zero velocity
	            easeOutQuart: function (t) {
	                return 1 - (--t) * t * t * t;
	            },

	            // acceleration until halfway, then deceleration
	            easeInOutQuart: function (t) {
	                return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
	            },

	            // accelerating from zero velocity
	            easeInQuint: function (t) {
	                return t * t * t * t * t;
	            },

	            // decelerating to zero velocity
	            easeOutQuint: function (t) {
	                return 1 + (--t) * t * t * t * t;
	            },

	            // acceleration until halfway, then deceleration
	            easeInOutQuint: function (t) {
	                return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
	            }
	        },

	        /**
	         * get the height of a dom element
	         * @function
	         * @memberOf platformSdk.utils
	         * @inner
	         * @param {NodeElement} el - dom element
	         * @return {Number} height of the given element
	         */
	        getHeight: function (el) {
	            var children = el.children;
	            var len = children.length;
	            var height = 0;

	            for (var i = 0; i < len; i++) {
	                height = height + parseInt(children[i].offsetHeight);
	            }
	            return height;
	        },

	        /**
	         * Find the closest elemnt of a given dom element
	         * @function
	         * @memberOf platformSdk.utils
	         * @inner
	         * @param {NodeElement} el - Dom element to find closest of
	         * @param {String} tag - elemnt to search for closest to el
	         * @return {NodeElement} closest element
	         */
	        closest: function (el, tag) {
	            tag = tag.toUpperCase();
	            do {
	                if (el.nodeName === tag) return el;
	            } while (el = el.parentNode);

	            return null;
	        },

	        /**
	         * The debounce function will not allow a callback to be used more than once per given time frame.
	         * @function
	         * @memberOf platformSdk.utils
	         * @inner
	         * @param {Function} func - the callback function
	         * @param {Number} wait - wait time in milliseconds
	         * @param {Boolean} immediate - if true callback will be executed on the leading edge instead of trailing edge
	         * @return {Function} Returns a function, that, as long as it continues to be invoked, will not be triggered. The function will be called after it stops being called for 'wait' milliseconds. If `immediate` is passed, the callback function will be triggered on the leading edge, instead of the trailing.
	         */
	        debounce: function (func, wait, immediate) {
	            var timeout;
	            return function () {
	                var context = this,
	                    args = arguments;
	                var later = function () {
	                    timeout = null;
	                    if (!immediate) func.apply(context, args);
	                };
	                var callNow = immediate && !timeout;
	                clearTimeout(timeout);
	                timeout = setTimeout(later, wait);
	                if (callNow) func.apply(context, args);
	            };
	        }
	    };

	}(window, window.platformSdk);


	/**
	 * @namespace platformSdk.events
	 * @memberOf platformSdk
	 */
	platformSdk.events = function (window, platformSdk) {
	    var events = {};
	    var hOP = events.hasOwnProperty;
	    var platformBridge = platformSdk.bridge;

	    return {
	        /**
	         * Subscribe to an event and attach a listener function to be called whenever that event is published
	         * @function
	         * @memberOf platformSdk.events
	         * @param {String} eventName - name of the event you wish to subscribe to
	         * @param {Function} listener - function to be executed each time the event is published
	         * @return {Object} an object with a remove function to remove the event subscription
	         */
	        subscribe: function (eventName, listener) {
	            if (!hOP.call(events, eventName)) events[eventName] = [];
	            var index = events[eventName].push(listener) - 1;
	            return {
	                remove: function () {
	                    delete events[eventName][index];
	                }
	            };
	        },


	        /**
	         * Publish an event.
	         * @function
	         * @memberOf platformSdk.events
	         * @param {String} eventName - name of the event you wish to publish
	         * @param {Object} data - data to be passed to the listener function
	         */
	        publish: function (eventName, data) {
	            if (!hOP.call(events, eventName))
	                return;
	            events[eventName].forEach(function (item) {
	                item(data != undefined ? data : {});
	            });
	        }
	    };

	}(window, window.platformSdk);

	(function (window, platformSdk) {
	    var callbacks = {};
	    var eventsObject = {};

	    function getNewId () {
	        var cbId = Math.round(Math.random() * 999999999);
	        while (cbId in callbacks) {
	            cbId = Math.round(Math.random() * 999999999);
	        }
	        return cbId;
	    }

	    /**
	     * Called by the android to return the response for the action asked by the microapp through platformSdk.nativeReq function.
	     * @function
	     * @global
	     * @param {String} id - unique id to map the response to the action.
	     * @param {Object} data - data in response from the android.
	     */
	    window.callbackFromNative = function (id, data) {

	        var args, cbItem = callbacks[id];
	        if (cbItem && typeof(cbItem.callback) === 'function') {
	            cbItem.callback.call(cbItem.context, data);
	        }

	        delete callbacks[id];
	    };

	    /**
	     * calling an action from android and accepting a success callback to be called with data from android in response
	     * @function
	     * @memberOf platformSdk
	     * @inner
	     * @param {Object} param - object containing the configuration for communication with android
	     */
	    platformSdk.nativeReq = function (param) {

	        var callBackId = "" + getNewId();

	        callbacks[callBackId] = {
	            context: param.ctx,
	            callback: param.success
	        };

	        if (platformSdk.bridgeEnabled) {
	            if (param.data === "" || param.data === undefined || param.data === null) PlatformBridge[param.fn](callBackId);
	            else PlatformBridge[param.fn](callBackId, param.data);
	        }
	    };

	    /**
	     * Setting up 3-dot menu options and setting up callbacks for each of them
	     * @function
	     * @memberOf platformSdk
	     * @inner
	     * @param {Object} omList - object containing the 3-dot menu options.
	     */
	    platformSdk.setOverflowMenu = function (omList) {
	        for (var i = 0; i < omList.length; i++) {
	            var omItem = omList[i];
	            var eventId = getNewId();
	            callbacks[eventId] = omItem;
	            omItem.id = eventId;
	        }

	        omListObject = omList;

	        if (platformSdk.bridgeEnabled) PlatformBridge.replaceOverflowMenu(platformSdk.utils.validateStringifyJson(omList));
	    };


	    /**
	     * Called from android on click of 3-dot menu items
	     * @function
	     * @memberOf platformSdk
	     * @inner
	     * @param {String} id - id of the clicked menu item
	     */
	    platformSdk.onMenuItemClicked = function (id) {
	        platformSdk.events.publish(callbacks[id].eventName, id);
	    };

	    /**
	     * updating the 3-dot menu options and setting up callbacks for each of them
	     * @function
	     * @memberOf platformSdk
	     * @inner
	     * @param {Object} omList - object containing the 3-dot menu options.
	     */
	    platformSdk.updateOverflowMenu = function (id, c) {
	        var obj = callbacks[id];
	        for (var key in c) {
	            obj[key] = c[key];
	        }

	        console.log('updateOverflowMenu object: ', id, obj);
	        if (platformSdk.bridgeEnabled) PlatformBridge.updateOverflowMenu(id, platformSdk.utils.validateStringifyJson(obj));
	    };

	    /**
	     * Get the id of the 3-dot menu item by their event name
	     * @function
	     * @memberOf platformSdk
	     * @inner
	     * @param {String} eventName - event name of the required 3-dot menu item
	     * @return {String} id of the required 3-dot menu item
	     */
	    platformSdk.retrieveId = function (eventName) {
	        for (var i = 0; i < omListObject.length; i++) {
	            var omItem = omListObject[i];
	            if (omItem.eventName === eventName) return omItem.id;
	        }
	    };

	})(window, window.platformSdk);

	platformSdk.device = function (window, platformSdk) {

	    "use strict";

	    var platformBridge = platformSdk.bridge;

	    return {};

	}(window, window.platformSdk);

	platformSdk.network = function (window, platformSdk) {

	    "use strict";

	    var platformBridge = platformSdk.bridge;

	    return {};

	}(window, window.platformSdk);

	platformSdk.user = function (window, platformSdk) {

	    "use strict";
	    var platformBridge = platformSdk.bridge;

	    return {};

	}(window, window.platformSdk);

	/**
	 * Microapp UI functions
	 * @namespace platformSdk.ui
	 * @memberOf platformSdk
	 */
	platformSdk.ui = function (window, platformSdk) {

	    var platformBridge = platformSdk.bridge;

	    var shareMessage;
	    var captionText;

	    platformSdk.events.subscribe('refresh/startAnimation/', function (ele) {
	        ele.classList.add('play');
	    });

	    platformSdk.events.subscribe('refresh/stopAnimation/', function (ele) {
	        ele.classList.remove('play');
	    });

	    if (!platformSdk.checkBridge) return false;
	    return {

	        /**
	         * Communicate the Android about windows onload being finished, so that webview can be resized if required.
	         * @function
	         * @memberOf platformSdk.ui
	         * @inner
	         * @param {String} height - offsetHeight of the document.body
	         */
	        onLoadFinished: function (height) {
	            platformBridge.onLoadFinished(height + "");
	        },

	        /**
	         * Resize webview to a new height
	         * @function
	         * @memberOf platformSdk.ui
	         * @inner
	         * @param {String} height - height to be resized to
	         */
	        resize: function (height) {
	            height = height || document.body.offsetHeight;
	            platformBridge.onResize(height + "");
	        },

	        /**
	         * Shows toast message to the user
	         * @function
	         * @memberOf platformSdk.ui
	         * @inner
	         * @param {String} msg - message to be shown in toast
	         */
	        showToast: function (msg) {
	            platformBridge.showToast(msg);
	        },


	        /**
	         * Share the current card to other users
	         * @function
	         * @memberOf platformSdk.ui
	         * @inner
	         * @param {Object} e - click event of the share button/link
	         */
	        shareCard: function (e) {
	            e.preventDefault();
	            e.stopPropagation();

	            platformSdk.utils.log("share calling");

	            if (platformSdk.appData.helperData != null && platformSdk.appData.helperData.share_text) {
	                shareMessage = platformSdk.appData.helperData.share_text;
	            } else {
	                //shareMessage = "World Cup 2015 Live scores only on hike!";
	                shareMessage = "hike up your life only on hike!";
	            }
	            if (platformSdk.appData.helperData != null && platformSdk.appData.helperData.caption_text) {
	                captionText = platformSdk.appData.helperData.caption_text;
	            } else {
	                captionText = "";
	            }

	            platformBridge.share(shareMessage, captionText);
	            platformSdk.utils.log("share called");

	            return false;
	        },

	        /**
	         * Forwards the current card to other users
	         * @function
	         * @memberOf platformSdk.ui
	         * @inner
	         * @param {Object} e - click event of the share button/link
	         */
	        forwardCard: function (e) {
	            e.preventDefault();
	            e.stopPropagation();
	            //addRippleEffect(e);

	            platformSdk.utils.log("forward calling");
	            platformBridge.forwardToChat(platformSdk.forwardCardData);
	            platformSdk.utils.log("forward callied  with json=" + platformSdk.forwardCardData);

	            return false;
	        }
	    };
	}(window, window.platformSdk);


	/**
	 * creates XMLHttpRequest object, set up the event listeners and makes httpRequest as per the given options
	 * @function
	 * @memberOf platformSdk
	 * @inner
	 * @param {Object} options - an object with properties required to make an ajax call.
	 */
	platformSdk.ajax = function (window, platformSdk) {

	    var platformBridge = platformSdk.bridge;

	    /**
	     * function to handle success of ajax request
	     * @param  {Object} xhr - XMLHttpRequest Object
	     * @param  {Function} callback - callback function to be called on success
	     */
	    var ajaxSuccess = function (xhr, callback) {
	        if (callback && typeof callback === 'function')
	            callback(xhr.responseText, xhr.status);
	    };


	    /**
	     * function to handle error of ajax request
	     * @param  {Object} xhr - XMLHttpRequest Object
	     * @param  {Function} callback - callback function to be called on error
	     * @return {String} errorMsg - error message to be shown as toast in case of ajax error
	     */
	    var ajaxError = function (xhr, callback, errorMsg) {
	        if (callback && typeof callback === 'function')
	            callback(xhr.responseText, xhr.status, xhr);
	        if (errorMsg)
	            platformBridge.showToast(errorMsg);
	    };

	    /**
	     * function to check internet connection
	     * @param  {Function} fn - function to be called if user is connected to internet
	     */
	    var checkConnection = function (fn) {
	        platformSdk.nativeReq({
	            fn: 'checkConnection',
	            ctx: this,
	            data: "",
	            success: function (response) {
	                if (response != "-1" && response != "0") {
	                    if (typeof fn === "function")
	                        fn();
	                } else
	                    platformSdk.events.publish('app/offline');
	            }
	        });
	    };

	    /**
	     * takes the options object for the ajax call, creates XMLHttpRequest object and set up the event listeners
	     * @param  {Object} options - an object with properties required to make an ajax call
	     */
	    var fire = function (options) {
	        var url = options.url,
	            headers = options.headers,
	            data = options.data,
	            errorMsg = options.errorMessage,
	            callbackSucess = options.success,
	            callbackFailure = options.error,
	            type = options.type.toUpperCase();

	        var xhr = new XMLHttpRequest();

	        platformSdk.utils.log("ajax call started on " + url);
	        if (xhr) {

	            /**
	             * ready state change listener for the xhr object
	             */
	            xhr.onreadystatechange = function () {
	                if (4 == xhr.readyState && 200 == xhr.status) {
	                    if (platformSdk.debugMode)
	                        platformSdk.logger.endMarker('xhrCall');
	                    ajaxSuccess(xhr, callbackSucess);
	                }
	                if (4 == xhr.readyState && 200 != xhr.status) {
	                    if (platformSdk.debugMode)
	                        platformSdk.logger.endMarker('xhrCall');
	                    ajaxError(xhr, callbackFailure, errorMsg);
	                }
	            };

	            var datatype = Object.prototype.toString.call(data);
	            if (datatype === '[object Object]')
	                data = platformSdk.utils.validateStringifyJson(data);

	            xhr.open(type, url, true);
	            if (headers) {
	                for (var i = 0; i < headers.length; i++) {
	                    xhr.setRequestHeader(headers[i][0], headers[i][1]);
	                }
	            }

	            if (platformSdk.debugMode)
	                platformSdk.logger.setMarker('xhrCall');

	            xhr.send(data);
	        }
	    }

	    return function (options) {
	        fire(options);
	    };

	}(window, window.platformSdk);

	/**
	 * @namespace platformSdk.logger
	 * @memberOf platformSdk
	 */
	platformSdk.logger = function (window, platformSdk) {

	    "use strict";

	    var platformBridge = platformSdk.bridge;

	    var markers = {};

	    var latencyData = {
	        html: {}
	    };

	    var drawDebugInfoOverlay = function (name, dataObj) {
	        var debugInfoOverlay = document.getElementById("debug-info-overlay");

	        if (debugInfoOverlay) {
	            debugInfoOverlay.remove();
	        }

	        setTimeout(function () {
	            var htmlStr = name;
	            var body = document.body;
	            var listStr = '<ul>';
	            var link = document.getElementsByTagName('link');
	            var basePath = link[0].getAttribute('href').split('assets')[0];
	            var debugInfoOverlayDiv = document.createElement("div");
	            var keyData;

	            for (var key in dataObj) {
	                listStr += '<li><b>' + key + '</b></li>';
	                keyData = dataObj[key];

	                for (var key in keyData) {
	                    listStr += '<li>' + key + ' : ' + keyData[key] + '</li>';
	                }
	            }
	            listStr += '</ul>';
	            htmlStr = listStr + '<span class="icon-close tappingEffect" id="close-icon"><img width="14" src="' + basePath + 'assets/images/cross.png"></span>';

	            debugInfoOverlayDiv.setAttribute('id', "debug-info-overlay");
	            debugInfoOverlayDiv.innerHTML = htmlStr;

	            body.appendChild(debugInfoOverlayDiv);

	            var closeIcon = debugInfoOverlayDiv.getElementsByClassName('icon-close')[0];
	            closeIcon.addEventListener('click', function () {
	                debugInfoOverlayDiv.remove();
	            });

	        }, 15);
	    };

	    return {

	        /**
	         * Logs the load time data
	         * @function
	         * @memberOf platformSdk.logger
	         * @inner
	         */
	        logLoadTimeInfo: function () {
	            setTimeout(function () {
	                var timingAPI;
	                if (!platformSdk.debugMode)
	                    return;

	                if (window.performance) {
	                    timingAPI = performance.timing;
	                } else {
	                    platformSdk.utils.log("timing API not supported by the webView");
	                    return;
	                }
	                latencyData.html.networkLatency = timingAPI.responseEnd - timingAPI.fetchStart;
	                latencyData.html.domReadiness = timingAPI.loadEventEnd - timingAPI.responseEnd;

	                if (platformSdk.appData.time) {
	                    latencyData.native = platformSdk.appData.time;
	                }

	                drawDebugInfoOverlay('DOM load', latencyData);

	                platformSdk.utils.log(latencyData, 'latencyData');

	            }, 100);
	        },


	        /**
	         * Set a marker for navigation.performance api for performance measurements
	         * @function
	         * @memberOf platformSdk.logger
	         * @inner
	         * @param {String} name - name of the marker
	         */
	        setMarker: function (name) {
	            if (window.performance)
	                window.performance.mark(name + "_marker_start");
	        },


	        /**
	         * End the marker set using setMarker function
	         * @function
	         * @memberOf platformSdk.logger
	         * @inner
	         * @param {String} name - name of the marker you wish to end
	         * @param {Boolean} clearFlag - if true marker will be cleared
	         */
	        endMarker: function (name, clearFlag) {
	            if (window.performance) {
	                window.performance.mark(name + "_marker_end");
	                this.measureMarker(name, clearFlag);
	            }
	        },

	        /**
	         * Logs the measurements of given marker
	         * @function
	         * @memberOf platformSdk.logger
	         * @inner
	         * @param {String} name - name of the marker you wish to measure
	         * @param {Boolean} clearFlag - if true marker and its measurements will be cleared
	         */
	        measureMarker: function (name, clearFlag) {
	            var measureName = name + '_measure';
	            if (!window.performance) return;

	            window.performance.measure(measureName, name + '_marker_start', name + '_marker_end');
	            var measures = window.performance.getEntriesByName(name + '_measure');


	            platformSdk.utils.log('name: ' + measures[0].name + ', duration: ' + measures[0].duration);

	            if (clearFlag) {
	                this.clearMarker(name);
	                this.clearMeasure(name);
	            }

	            drawDebugInfoOverlay(name, measures[0]);
	        },

	        /**
	         * Clear the marker set using setMarker function
	         * @function
	         * @memberOf platformSdk.logger
	         * @inner
	         * @param {String} name - name of the marker you wish to clear
	         */
	        clearMarker: function (name) {
	            if (window.performance) {
	                window.performance.clearMarks(name + "_marker_start");
	                window.performance.clearMarks(name + "_marker_end");
	            }
	        },

	        /**
	         * Clear the measure
	         * @function
	         * @memberOf platformSdk.logger
	         * @inner
	         * @param {String} name - name of the marker you wish to clear
	         */
	        clearMeasure: function (name) {
	            if (window.performance) {
	                window.performance.clearMeasures(name + "_measure");
	            }
	        },


	        /**
	         * Clear all the markers
	         * @function
	         * @memberOf platformSdk.logger
	         * @inner
	         */
	        clearAllMarker: function () {
	            if (window.performance) {
	                window.performance.clearMarks();
	            }
	        }
	    };

	}(window, window.platformSdk);

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	( function (W, undefined) {
	    'use strict';

	    HTMLElement.prototype.toggleClass = function (classToken, flag) {
	        var element = this;

	        if ( flag !== undefined ) {
	            if ( flag ) {
	                element.classList.add(classToken);
	            } else {
	                element.classList.remove(classToken);
	            }
	        } else {
	            element.classList.toggle(classToken);
	        }
	    };

	    var ConnTypes = __webpack_require__(5).ConnectionTypes,
	        _extend = function ( toObj, fromObj ) {
	            for( var key in fromObj ) {
	                if ( fromObj.hasOwnProperty( key ) && toObj[key] === undefined ) {
	                    toObj[key] = fromObj[key];
	                }
	            }
	        },
	        imageOptimizationConnTypes = [ConnTypes.NO_NETWORK, ConnTypes.UNKNOWN, ConnTypes.TWO_G],
	        noop = function () {

	        },
	        memoizationCache = {},
	        basePrefix = 'id_',
	        idCounter = 1;

	    module.exports = {
	        isFunction: function (fn) {
	            return typeof fn === 'function';
	        },

	        extend: function ( toObj, fromObj ) {
	            _extend( toObj.prototype, fromObj.prototype );
	            _extend( toObj, fromObj );

	            return toObj;
	        },

	        serializeParams: function ( params ) {
	            var serializedParams = [];

	            for ( var key in params ) {
	                if ( params.hasOwnProperty( key ) ) {
	                    serializedParams.push( key + '=' + params[key] );
	                }
	            }

	            return serializedParams.join( '&' );
	        },

	        empty: function ( element ) {
	            while ( element.firstChild ) {
	                element.removeChild( element.firstChild );
	            }

	            return element;
	        },

	        getUniqueId: function (prefix) {
	            return (prefix || basePrefix) + idCounter++;
	        },

	        simpleClone: function (obj) {
	            return JSON.parse(JSON.stringify(obj));
	        },

	        loadImage: function (params) {
	            var imageEl = document.createElement('img');

	            imageEl.src = params.src;
	            
	            imageEl.onload = function () {
	                params.success(imageEl,params.src);
	            };

	            imageEl.onError = function(){
	                params.error(imageEl);
	            };
	        },

	        toOptimizeForImages: function (connectionType) {
	            if (memoizationCache[connectionType] === undefined) {
	                memoizationCache[connectionType] = imageOptimizationConnTypes.indexOf(connectionType) !== -1;
	            }

	            return memoizationCache[connectionType];
	        },

	        getNodeIndex: function (elem) {
	            var index = 0;

	            while(elem == elem.previousElementSibling) {
	                index++;
	            }

	            return index;
	        },

	        createCustomEvent: function (eventName) {
	            var customEvent;

	            if (W.CustomEvent) {
	                customEvent = new CustomEvent(eventName, {
	                    bubbles: true
	                });
	            } else {
	                customEvent = document.createEvent('Event');
	                customEvent.initEvent(eventName, true, false);
	            }

	            return customEvent;

	        },

	        // Toggle Back Navigation Set For Allowing Back and Up Press Inside The Application

	        toggleBackNavigation: function (enable) {
	            
	            enable = enable ? 'true' : 'false';

	            if (platformSdk.bridgeEnabled) {
	                platformSdk.bridge.allowBackPress(enable);
	                // Allow up press in only available since Platform Version 5
	                platformSdk.bridge.allowUpPress && platformSdk.bridge.allowUpPress(enable);
	            }
	        },

	        debounce: function(func, wait, immediate) {
	            var timeout;
	            return function() {
	                var context = this, args = arguments;
	                var later = function() {
	                    timeout = null;
	                    if (!immediate) func.apply(context, args);
	                };
	                var callNow = immediate && !timeout;
	                clearTimeout(timeout);
	                timeout = setTimeout(later, wait);
	                if (callNow) func.apply(context, args);
	            };
	        }
	    };

	} )(window);

/***/ },
/* 5 */
/***/ function(module, exports) {

	(function() {
	    'use strict';

	    module.exports = {
	        DEV_ENV: 'dev',
	        STAGING_ENV: 'staging',
	        PROD_ENV: 'prod',

	        ConnectionTypes: {
	            NO_NETWORK: '-1',
	            UNKNOWN: '0',
	            WIFI: '1',
	            TWO_G: '2',
	            THREE_G: '3',
	            FOUR_G: '4'
	        },

	        Events: {
	            NAVIGATE_APP: 'app.navigate',
	            TOGGLE_BLOCK: 'app.menu.om.block',
	            RESET_APP: 'app.reset'
	        },

	        // Levels 0- Bronze; 1-Silver; Gold-2

	        TROPHIES: [{
	                id: 0,
	                label: 'Hike Age',
	                subtext: '',
	                levels: [{
	                        value: '1 month',
	                        icon: 'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-hikeage-bronze.png',
	                        text: 'Celebrate 30 days on Hike !'
	                    }, {
	                        value: '1 year',
	                        icon:'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-hikeage-silver.png',
	                        text: 'Completing 1 year on Hike !'
	                    }, {
	                        icon:'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-hikeage-gold.png',
	                        value: 'Completing 3 years on Hike !',
	                        text: ''
	                    }

	                ]

	            }, {
	                id: 1,
	                label: 'Messaging',
	                subtext: '',
	                levels: [{
	                        icon:'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-messaging-bronze.png',
	                        value: 100,
	                        text: 'Completing 100 messages !'
	                    }, {
	                        icon:'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-messaging-silver.png',
	                        value: 1000,
	                        text: 'Completing 1000 messages !'
	                    }, {
	                        icon:'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-messaging-gold.png',
	                        value: 10000,
	                        text: 'Completing 10000 messages !'
	                    }

	                ]

	            }, {
	                id: 2,
	                label: 'Stickers',
	                subtext: '',
	                levels: [{
	                        icon:'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-stickers-bronze.png',
	                        value: 100,
	                        text: 'Send and Recieve 100 Stickers on hike !'
	                    }, {
	                        icon:'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-stickers-silver.png',
	                        value: 1000,
	                        text: 'Send and Receive 1000 stickers on hike !'
	                    }, {
	                        icon:'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-stickers-gold.png',
	                        value: 10000,
	                        text: 'Send and Receive 10000 stickers on hike !'
	                    }

	                ]

	            }, {
	                id: 3,
	                label: 'Files',
	                subtext: '',
	                levels: [{
	                        icon:'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-files-bronze.png',
	                        value: 10,
	                        text: 'Complete 10 file tranfers with your friends and family on hike.'
	                    }, {
	                        icon:'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-files-silver.png',
	                        value: 100,
	                        text: 'Complete 100 file transfers with your friends and family on hike.'
	                    }, {
	                        icon:'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-files-gold.png',
	                        value: 1000,
	                        text: 'Complete 1000 file transfers with your friends and family on hike.'
	                    }

	                ]

	            }, 
	            {
	                id:4,
	                label: 'Data Transfered (hike direct)',
	                subtext: '',
	                levels: [{
	                        icon:'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-hikedirect-bronze.png',
	                        value: '1 GB',
	                        text: 'Complete a total file transfer for 1GB using hike direct.'
	                    }, {
	                        icon:'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-hikedirect-silver.png',
	                        value: '10 GB',
	                        text: 'Complete a totla file tranfer for 10GB using hike direct.'
	                    }, {
	                        icon:'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-hikedirect-gold.png',
	                        value: '100 GB',
	                        text: 'Complete a total file transfer for 100GB using hike direct.'
	                    }

	            ]},
	            {
	                id:5,
	                label: 'Chat Themes',
	                subtext: '',
	                levels: [{
	                        icon:'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-chattheme-bronze.png',
	                        value: 10,
	                        text: 'Make chats more interesting by changing your chat backgrounds.'
	                    }, {
	                        icon:'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-chattheme-silver.png',
	                        value: 100,
	                        text: 'Make chats more interesting by changing your chat backgrounds.'
	                    }, {
	                        icon:'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-chattheme-gold.png',
	                        value: 1000,
	                        text: 'Make chats more interesting by changing your chat backgrounds.'
	                    }

	                ]

	            }, {
	                id: 6,
	                label: 'Status Updates',
	                subtext: '',
	                levels: [{
	                        icon:'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-statusupdate-bronze.png',
	                        value: 1,
	                        text: 'Go post your first status on the timeline.'
	                    }, {
	                        icon:'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-statusupdate-silver.png',
	                        value: 10,
	                        text: 'Complete your 10 status updates and get rewarded.'
	                    }, {
	                        icon:'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-statusupdate-gold.png',
	                        value: 100,
	                        text: 'Complete your 100 status updates and get rewarded.'
	                    }

	                ]

	            }, {
	                id: 7,
	                label: 'Favourites',
	                subtext: '',
	                levels: [{
	                        icon:'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-favourites-bronze.png',
	                        value: 1,
	                        text: 'Add one of your friend as favourite.'
	                    }, {
	                        icon:'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-favourites-silver.png',
	                        value: 10,
	                        text: 'Add 10 favourites on hike. '
	                    }, {
	                        icon:'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-favourites-gold.png',
	                        value: 25,
	                        text: 'Add 25 favourites on hike.'
	                    }

	                ]

	            }
	        ]

	    };

	})();


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	    'use strict';

	    var Constants = __webpack_require__(5);

	    module.exports = function(env) {
	        if (env === Constants.DEV_ENV) {
	            return {
	                API_URL: 'http://nixy.hike.in',

	            };
	        } else if (env === Constants.STAGING_ENV) {
	            return {
	                API_URL: 'http://nixy.hike.in',


	            };
	        } else if (env === Constants.PROD_ENV) {
	            return {
	                API_URL: 'http://nixy.hike.in',

	            };
	        }

	        return {};
	    };
	})();

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	(function(W, events) {
	    'use strict';

	    var WorkspaceController = __webpack_require__(8),
	        TrophiesController = __webpack_require__(10),

	        Router = __webpack_require__(12),
	        utils = __webpack_require__(4),

	        TxService = __webpack_require__(13),
	        NinjaServices = __webpack_require__(14);

	    // Full Screen Loader
	    var loader = document.getElementById('loader');
	    var loadObject = events.subscribe('update.loader', function(params) {
	        loader.toggleClass('loading', params.show);
	    });

	    // Router Navigates To Home Page In The Start
	    var APIData = {};
	    var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
	    var firstDate = new Date(1449858600000);
	    var secondDate = new Date();
	    var diffDays;


	    // Tap State Events :: Touch Start And Touch End

	    document.addEventListener('touchstart', function(e) {
	        e = e || window.event;
	        var target = e.target;
	        if (target.classList.contains('buttonTap')) {
	            target.classList.add('tapState');
	        } else if (target.classList.contains('buttonTapRed')) {
	            target.classList.add('tapStateRed');
	        } else if (target.classList.contains('buttonTapOffer')) {
	            target.classList.add('tapStateOffer');
	        } else {
	            return;
	        }
	    }, false);

	    document.addEventListener('touchend', function(e) {
	        e = e || window.event;
	        var target = e.target;
	        if (target.classList.contains('buttonTap')) {
	            target.classList.remove('tapState');
	        } else if (target.classList.contains('buttonTapRed')) {
	            target.classList.remove('tapStateRed');
	        } else if (target.classList.contains('buttonTapOffer')) {
	            target.classList.remove('tapStateOffer');
	        } else {
	            return;
	        }
	    }, false);

	    // Block Connection Tab
	    var isBlock = document.getElementById('blockScreen');
	    var isBlockObject = events.subscribe('app/block', function(params) {
	        isBlock.toggleClass('block-msg', params.show);
	    });

	    var unBlockApp = function() {
	        var self = this;
	        var id = '' + platformSdk.retrieveId('app.menu.om.block');

	        platformSdk.appData.block = 'false';
	        if (platformSdk.bridgeEnabled) platformSdk.unblockChatThread();
	        platformSdk.events.publish('app.state.block.hide');
	        platformSdk.updateOverflowMenu(id, {
	            'title': 'Block'
	        });

	        //utils.toggleBackNavigation( false );
	        events.publish('update.loader', {
	            show: false
	        });
	        events.publish('app/block', {
	            show: false
	        });
	    };

	    var Application = function(options) {
	        this.container = options.container;
	        this.routeIntent = options.route;

	        this.router = new Router();

	        this.workspaceController = new WorkspaceController();
	        this.trophiesController = new TrophiesController();

	        this.TxService = new TxService();
	        this.ninjaServices = new NinjaServices(this.TxService); //communication layer
	    };

	    Application.prototype = {

	        // Three Dot Menu Overflow Events Subscriptions
	        OverflowEvents: function() {

	            var that = this;

	            // Notifications ON/OFF
	            platformSdk.events.subscribe('app.menu.om.mute', function(id) {
	                id = '' + platformSdk.retrieveId('app.menu.om.mute');

	                if (platformSdk.appData.mute == 'true') {
	                    platformSdk.appData.mute = 'false';
	                    platformSdk.muteChatThread();
	                    platformSdk.updateOverflowMenu(id, {
	                        'is_checked': 'true'
	                    });
	                } else {
	                    platformSdk.appData.mute = 'true';
	                    platformSdk.muteChatThread();
	                    platformSdk.updateOverflowMenu(id, {
	                        'is_checked': 'false'
	                    });
	                }
	            });

	            // Block Event From The Three Dot
	            platformSdk.events.subscribe('app.menu.om.block', function(id) {
	                id = '' + platformSdk.retrieveId('app.menu.om.block');
	                if (platformSdk.appData.block === 'true') {
	                    unBlockApp();

	                } else {
	                    platformSdk.appData.block = 'true';
	                    platformSdk.blockChatThread();
	                    platformSdk.events.publish('app.state.block.show');
	                    platformSdk.updateOverflowMenu(id, {
	                        'title': 'Unblock'
	                    });
	                    utils.toggleBackNavigation(false);
	                    events.publish('app/block', {
	                        show: true
	                    });
	                    events.publish('app/offline', {
	                        show: false
	                    });

	                }
	            });
	        },

	        // Setting Up The Three Dot Menu
	        initOverflowMenu: function() {

	            var that = this;

	            var omList = [{
	                    'title': 'Notifications',
	                    'en': 'true',
	                    'eventName': 'app.menu.om.mute',
	                    'is_checked': platformSdk.appData.mute === 'true' ? 'false' : 'true'
	                },

	                {
	                    'title': platformSdk.appData.block === 'true' ? 'Unblock' : 'Block',
	                    'en': 'true',
	                    'eventName': 'app.menu.om.block'
	                }
	            ];

	            that.OverflowEvents();

	            platformSdk.setOverflowMenu(omList);
	        },

	        // If card Data Comes From Any Forwarded Card that calls Open Non Messaging Bot Here
	        getIntentData: function(data) {
	            var that = this;
	            console.log(data);
	            data = decodeURIComponent(data);
	            data = JSON.parse(data);

	        },

	        getNumberAbrr: function(value) {
	            var newValue = value;
	            if (value >= 1000) {
	                var suffixes = ["", "K", "M", "B", "T"];
	                var suffixNum = Math.floor(("" + value).length / 3);
	                var shortValue = '';
	                var shortNum;
	                for (var precision = 2; precision >= 1; precision--) {
	                    shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000, suffixNum)) : value).toPrecision(precision));
	                    var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g, '');
	                    if (dotLessShortValue.length <= 2) {
	                        break;
	                    }
	                }
	                if (shortValue % 1 != 0) shortNum = shortValue.toFixed(1);
	                newValue = shortValue + suffixes[suffixNum];
	            }
	            return newValue;
	        },

	        bytesToSize: function(bytes) {
	            var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	            if (bytes === 0) return '0';
	            var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
	            return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
	        },

	        formatData: function() {
	            for (var key in APIData.statsData) {

	                if (key == "hdFileTr") {
	                    APIData.statsData[key].sent = this.bytesToSize(APIData.statsData[key].sent);
	                    APIData.statsData[key].rec = this.bytesToSize(APIData.statsData[key].rec);

	                } else {
	                    if (typeof APIData.statsData[key].sent != "undefined")
	                        APIData.statsData[key].sent = this.getNumberAbrr(APIData.statsData[key].sent);

	                    if (typeof APIData.statsData[key].rec != "undefined")
	                        APIData.statsData[key].rec = this.getNumberAbrr(APIData.statsData[key].rec);

	                    if (typeof APIData.statsData[key].count != "undefined")
	                        APIData.statsData[key].count = this.getNumberAbrr(APIData.statsData[key].count);

	                }
	            }
	        },

	        backPressTrigger: function() {
	            this.router.back();
	        },

	        resumeHikeNinja: function() {
	            console.log('The Micro App Has Benn Resumed');
	        },

	        getRoute: function() {
	            var that = this;

	            // ToDo: Remvove this if block from here?
	            if (this.routeIntent !== undefined) {

	            } else {
	                events.publish('app.store.get', {
	                    key: '_routerCache',
	                    ctx: this,
	                    cb: function(r) {
	                        if (r.status === 1 && platformSdk.bridgeEnabled) {
	                            try {
	                                that.router.navigateTo(r.results.route, r.results.cache);
	                            } catch (e) {
	                                that.router.navigateTo('/');
	                            }
	                        } else {
	                            that.router.navigateTo('/');
	                        }
	                    }
	                });
	            }
	        },

	        getHikeStats: function() {

	            // Calling Hike Statistics After Getting the Hike Profile
	            if (!platformSdk.appData.helperData.statsData) {
	                this.ninjaServices.getHikeStats(function(res) {
	                    console.log(res);
	                    if (res.stat == 'ok') {
	                        console.log('Hike Stats have been recieved for the user');
	                        APIData.statsData = res;
	                        console.log("New user with:", APIData);
	                        platformSdk.appData.helperData.statsData = res;
	                        platformSdk.updateHelperData(platformSdk.appData.helperData);
	                        this.router.navigateTo('/', APIData);
	                    } else {
	                        platformSdk.ui.showToast('Hmm. Something went wrong. Not to worry, try again in a little bit :)');
	                    }
	                });
	            } else {
	                console.log("Returning user with:", APIData);
	                APIData.statsData = platformSdk.appData.helperData.statsData;
	                this.router.navigateTo('/', APIData);
	            }
	        },

	        daysConvertor: function(diff) {

	            // The string we're working with to create the representation
	            var str = '';
	            // Map lengths of `diff` to different time periods
	            var values = [
	                [' year', 365],
	                [' month', 30],
	                [' day', 1]
	            ];

	            // Iterate over the values...
	            for (var i = 0; i < values.length; i++) {
	                var amount = Math.floor(diff / values[i][1]);

	                // ... and find the largest time value that fits into the diff
	                if (amount >= 1) {
	                    // If we match, add to the string ('s' is for pluralization)
	                    str += amount + values[i][0] + (amount > 1 ? 's' : '') + ' ';

	                    // and subtract from the diff
	                    diff -= amount * values[i][1];
	                }
	            }

	            return str;

	        },

	        start: function() {

	            var self = this;
	            self.$el = $(this.container);

	            self.initOverflowMenu();

	            utils.toggleBackNavigation(false);
	            document.querySelector('.unblockButton').addEventListener('click', function() {
	                unBlockApp();
	            }, false);

	            // No Internet Connection Tab
	            var noInternet = document.getElementById('nointernet');
	            var noInternetObject = events.subscribe('app/offline', function(params) {
	                noInternet.toggleClass('no-internet-msg', params.show);

	            });

	            platformSdk.events.subscribe('onBackPressed', function() {
	                self.backPressTrigger();
	            });

	            platformSdk.events.subscribe('onUpPressed', function() {
	                self.backPressTrigger();
	            });

	            // Subscribe :: Home Screen Aroma
	            this.router.route('/', function(data) {
	                self.container.innerHTML = '';
	                self.workspaceController.render(self.container, self, data);
	                utils.toggleBackNavigation(false);
	            });

	            // Subscribe :: Home Screen Aroma
	            this.router.route('/trophies', function(data) {
	                self.container.innerHTML = '';
	                self.trophiesController.render(self.container, self, data);
	                utils.toggleBackNavigation(true);
	            });

	            if (platformSdk.bridgeEnabled) {

	                if (!platformSdk.appData.helperData.profileData) {

	                    this.ninjaServices.getProfile(function(res) {
	                        console.log(res);
	                        if (res.stat == 'ok') {
	                            console.log('Profile Data arrived');

	                            res.reg_time = parseInt(res.reg_time);
	                            firstDate = new Date(res.reg_time * 1000);
	                            diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
	                            //res.age = diffDays;

	                            if (diffDays === 0) {
	                                res.age = '1 day';
	                            } else {
	                                res.age = self.daysConvertor(diffDays);
	                            }

	                            if (res.gender === '' || typeof res.gender === 'undefined')
	                                res.gender = 'neutral';
	                            APIData.profileData = res;

	                            //Save the data in Helper data/Cache
	                            platformSdk.appData.helperData.profileData = res;
	                            platformSdk.updateHelperData(platformSdk.appData.helperData);
	                            self.getHikeStats();

	                        } else {
	                            platformSdk.ui.showToast('Hmm. Something went wrong. Not to worry, try again in a little bit :)');
	                        }
	                    });
	                } else {
	                    APIData.profileData = platformSdk.appData.helperData.profileData;
	                    self.getHikeStats();
	                }

	                // Chrome Dev Using STUB Data For Hike

	            } else {

	                diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));

	                APIData.profileData = {
	                    name: 'Sandeep Chugh',
	                    age: diffDays,
	                    icon: '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',
	                    gender: 'm'
	                };

	                APIData.statsData = {


	                    "messages": {
	                        "sent": "1000",
	                        "rec": "1000000",
	                        "top": "2",
	                        "level": "1"
	                    },

	                    "stickers": {
	                        "sent": "1000000",
	                        "rec": "1000000",
	                        "top": "2",
	                        "level": "1"
	                    },

	                    "files": {
	                        "sent": "1000000",
	                        "rec": "1000000",
	                        "top": "2",
	                        "level": "1"
	                    },

	                    "chatThemes": {
	                        "sent": "100000000",
	                        "rec": "100",

	                    },

	                    "hdFileTr": {
	                        "sent": "230000",
	                        "rec": "45002",
	                        "top": "2",
	                        "level": "3"
	                    },


	                    "favorite": {
	                        "count": "200",
	                        "top": "2",
	                        "level": "2"
	                    },

	                    "statusUpdates": {
	                        "count": "2",
	                        "top": "2",
	                        "level": "3"
	                    },

	                    "invites": {
	                        "count": "2",
	                        "top": "2",
	                        "level": "3"
	                    },

	                    "trophyCount": "5",
	                    "hikeLatestVersion": "4.2.5.82"
	                };
	            }


	            this.formatData();
	            self.router.navigateTo('/', APIData);

	        }
	    };

	    module.exports = Application;

	})(window, platformSdk.events);

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	(function(W, platformSdk, events) {
	    'use strict';

	    var utils = __webpack_require__(4),
	        Constants = __webpack_require__(5),

	        WorkspaceController = function(options) {
	            this.template = __webpack_require__(9);
	        };

	    WorkspaceController.prototype.bind = function(App, data) {
	        var $el = $(this.el);

	        var btn = document.getElementById('btnAction');
	        var age = document.getElementById('hikeAge').getAttribute('data-age');

	        var upgradeHeading = document.getElementsByClassName('upgradeHeading')[0];
	        var trophiesCount = document.getElementById('trophyCount').getAttribute('data-count');
	        var upgradeOverlay = document.getElementsByClassName('upgradeOverlay')[0];

	        var topTag = document.getElementsByClassName('topHeading');
	        var crossIcon = document.getElementsByClassName('crossIcon')[0];
	        var topTagOverlay = document.getElementsByClassName('topTagOverlay')[0];

	        upgradeHeading.addEventListener('click', function(ev) {
	            window.open('https://play.google.com/store/apps/details?id=com.bsb.hike');
	        });


	        var currentVersion = '';
	        var userVersion = '';

	        if (!platformSdk.appData.appVersion || !data.hikeLatestVersion) {
	            console.log('No app version exists');
	        } else {
	            if (platformSdk.bridgeEnabled) {
	                currentVersion = data.hikeLatestVersion.split('.');
	                userVersion = platformSdk.appData.appVersion.split('.');
	            } else {
	                currentVersion = '4.2.5.82';
	                userVersion = '4.2.5.82';
	            }

	            currentVersion = currentVersion.split('.');
	            userVersion = userVersion.split('.');

	            var length = Math.min(currentVersion.length, userVersion.length);

	            for (var index = 0; index < length; index++) {
	                if (currentVersion[index] == userVersion[index])
	                    console.log('Version number matching');
	                else if (userVersion[index] < currentVersion[index]) {
	                    console.log('User version is older :: Taking to Upgrade screen');

	                    // Adding upgrade Overlay over it
	                    upgradeOverlay.classList.remove('hide');
	                }
	            }
	        }
	        for (var i = 0, n = topTag.length; i < n; i++)
	            topTag[i].addEventListener('click', topTagPopUp, false);


	        function topTagPopUp() {
	            topTagOverlay.classList.remove('hide');
	            topTagOverlay.querySelectorAll('.topStat')[0].innerHTML = this.getAttribute('data-topTag') + '%';
	            topTagOverlay.querySelectorAll('.topStat')[1].innerHTML = this.getAttribute('data-topTag') + '%';
	            topTagOverlay.querySelectorAll('.infoSection')[0].innerHTML = this.getAttribute('data-info');
	            topTagOverlay.querySelectorAll('.levelCommon')[0].classList.remove(['topTagLevel1', 'topTagLevel2', 'topTagLevel3'])
	            topTagOverlay.querySelectorAll('.levelCommon')[0].classList.add('topTagLevel' + this.getAttribute('data-topTagLevel'));


	        }

	        crossIcon.addEventListener('click', function(ev) {
	            topTagOverlay.classList.add('hide');
	        });

	        btn.addEventListener('click', function(ev) {

	            if (platformSdk.bridgeEnabled) {

	                // Run the API call only if the
	                // if ((platformSdk.appData.helperData.aTrophies) && (platformSdk.appData.helperData.aTrophies.count === trophiesCount)) {
	                //     console.log('Either this is the First Time Call :: Or the trophies count has not changed');
	                //     App.router.navigateTo('/trophies', { trophiesData: Constants.TROPHIES, age: age });
	                // } else {
	                //     console.log('Getting the new trophies for the first time or the trophies have changed');
	                //     App.ninjaServices.getTrophyData(function(res) {
	                //         console.log(res);
	                //         if (res.stat == 'ok') {

	                //             // Awarded Trophies Into The Response :: Match the Count Here
	                //             platformSdk.appData.helperData.aTrophies = res;
	                //             platformSdk.updateHelperData(platformSdk.appData.helperData.aTrophies);
	                //             App.router.navigateTo('/trophies', { trophiesData: Constants.TROPHIES, age: age });
	                //         } else {
	                //             platformSdk.ui.showToast('Hmm. Something went wrong. Not to worry, try again in a little bit :)');
	                //         }
	                //     });
	                // }

	                console.log('Getting the new trophies for the first time or the trophies have changed');

	                App.ninjaServices.getTrophyData(function(res) {
	                    console.log(res);
	                    if (res.stat == 'ok') {
	                        // Awarded Trophies Into The Response :: Match the Count Here
	                        platformSdk.appData.helperData.aTrophies = res;
	                        platformSdk.updateHelperData(platformSdk.appData.helperData.aTrophies);
	                        App.router.navigateTo('/trophies', { trophiesData: Constants.TROPHIES, age: age });
	                    } else {
	                        platformSdk.ui.showToast('Hmm. Something went wrong. Not to worry, try again in a little bit :)');
	                    }
	                });

	            } else {
	                age = 26;
	                App.router.navigateTo('/trophies', { trophiesData: Constants.TROPHIES, age: age });

	            }

	        });

	    };

	    WorkspaceController.prototype.render = function(ctr, App, data) {

	        var that = this;

	        that.el = document.createElement('div');
	        that.el.className = 'workSpaceContainer animation_fadein noselect';
	        that.el.innerHTML = Mustache.render(unescape(that.template), { userData: data });
	        ctr.appendChild(that.el);
	        events.publish('update.loader', { show: false });

	        try {
	            PlatformBridge.changeBotTitle('Stats');
	        } catch (e) {
	            console.log('Error in changing bot title');
	        }


	        App.ninjaServices.getHikeStats(function(res) {
	            //console.log( res );
	            if (res.stat == 'ok') {
	                console.log('Updating Hike stats for user');
	                platformSdk.appData.helperData.statsData = res;
	                platformSdk.updateHelperData(platformSdk.appData.helperData);
	            } else {
	                console.log("error updating stats");
	            }
	        });


	        that.bind(App, data);
	    };

	    WorkspaceController.prototype.destroy = function() {

	    };

	    module.exports = WorkspaceController;

	})(window, platformSdk, platformSdk.events);

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = "<div class=\"statsOverallContainer\">\n    <div class=\"statsContainer\">\n        <div class=\"statsWrapperOne\">\n            <div class=\"statsProfile\">\n                <div class=\"profilePhoto backgroundImageGeneric\" style=\"{{#userData.profileData.icon}}background-image:url('data:image/png;base64,{{userData.profileData.icon}}{{/userData.profileData.icon}}')\"></div>\n                <div class=\"profileName\">{{userData.profileData.name}}</div>\n            </div>\n            <div class=\"statsAction\">\n                <div class=\"ageRow\">\n                    <div class=\"ageIcon backgroundImageGeneric {{userData.profileData.gender}}Icon\"></div>\n                    <div class=\"ageInfo\">\n                        <p class=\"profileStatHead\">Hike Age</p>\n                        <p id=\"hikeAge\" data-age=\"{{userData.profileData.age}}\" class=\"profileStatSubHead\">{{userData.profileData.age}}</p>\n                    </div>\n                </div>\n                <div class=\"rowTrophies\">\n                    <div class=\"tcIcon backgroundImageGeneric\"></div>\n                    <div class=\"tcInfo\">\n                        <p class=\"profileStatHead\">Trophies</p>\n                        <p id=\"trophyCount\" data-count=\"{{userData.statsData.trophyCount}}\" class=\"profileStatSubHead\">{{userData.statsData.trophyCount}}</p>\n                    </div>\n                    <div id=\"btnAction\"> VIEW ALL </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"statsWrapperTwo\">\n            <br/>\n            <div class=\"cardContainer\">\n                <div class=\"cardHeader\"> MESSAGING </div>\n                <div class=\"halfCard\">\n                    <div class=\"header\"> <span class=\"cardIcon messageIcon backgroundImageGeneric\"></span> <span class=\"statHeading\"> Messages</span> {{#userData.statsData.messages.top}} <span class=\"topHeading\" data-info=\"messaging\" data-topTag=\"{{userData.statsData.messages.top}}\" data-topTagLevel=\"{{userData.statsData.messages.level}}\"> TOP {{userData.statsData.messages.top}}%</span> {{/userData.statsData.messages.top}}</div>\n                    <div class=\"dataHeader\"> <span class=\"statSubHeading\"> Sent :</span> <span class=\"statData\"> {{userData.statsData.messages.sent}}</span> </div>\n                    <div class=\"dataHeader\"> <span class=\"statSubHeading\"> Recieved:</span> <span class=\"statData\">{{userData.statsData.messages.rec}} </span> </div>\n                </div>\n                <div class=\"halfCard\">\n                    <div class=\"header\"> <span class=\"cardIcon stickerIcon backgroundImageGeneric\"></span> <span class=\"statHeading\"> Stickers</span>{{#userData.statsData.files.top}}<span class=\"topHeading\" data-info=\"stickers\" data-topTag=\"{{userData.statsData.stickers.top}}\" data-topTagLevel=\"{{userData.statsData.stickers.level}}\"> TOP {{userData.statsData.files.top}}%</span> {{/userData.statsData.files.top}}</div>\n                    <div class=\"dataHeader\"> <span class=\"statSubHeading\"> Sent :</span> <span class=\"statData\"> {{userData.statsData.files.sent}}</span> </div>\n                    <div class=\"dataHeader\"> <span class=\"statSubHeading\"> Recieved:</span> <span class=\"statData\">{{userData.statsData.stickers.sent}} </span> </div>\n                </div>\n            </div>\n            <div class=\"cardContainer\">\n                <div class=\"halfCard\">\n                    <div class=\"header\"> <span class=\"cardIcon filesIcon backgroundImageGeneric\"></span> <span class=\"statHeading\"> Files</span>{{#userData.statsData.files.top}} <span class=\"topHeading\" data-info=\"files\" data-topTag=\"{{userData.statsData.files.top}}\" data-topTagLevel=\"{{userData.statsData.files.level}}\"> TOP {{userData.statsData.files.top}}%</span> {{/userData.statsData.files.top}}</div>\n                    <div class=\"dataHeader\"> <span class=\"statSubHeading\"> Sent :</span> <span class=\"statData\"> {{userData.statsData.files.sent}}</span> </div>\n                    <div class=\"dataHeader\"> <span class=\"statSubHeading\"> Recieved:</span> <span class=\"statData\">{{userData.statsData.files.sent}} </span> </div>\n                </div>\n                <div class=\"halfCard\">\n                    <div class=\"header\"> <span class=\"cardIcon hikeDirectIcon backgroundImageGeneric\"></span> <span class=\"statHeading\"> Hike Direct </span>{{#userData.statsData.hdFileTr.top}} <span class=\"topHeading\" data-info=\"Hike direct file transfer\" data-topTag=\"{{userData.statsData.hdFileTr.top}}\" data-topTagLevel=\"{{userData.statsData.hdFileTr.level}}\"> TOP {{userData.statsData.hdFileTr.top}}%</span> {{/userData.statsData.hdFileTr.top}}</div>\n                    <div class=\"dataHeader\"> <span class=\"statSubHeading\"> Sent :</span> <span class=\"statData\"> {{userData.statsData.hdFileTr.sent}}</span> </div>\n                    <div class=\"dataHeader\"> <span class=\"statSubHeading\"> Recieved:</span> <span class=\"statData\">{{userData.statsData.hdFileTr.rec}}</span> </div>\n                </div>\n            </div>\n            <div class=\"cardContainer\">\n                <div class=\"halfCard\">\n                    <div class=\"header\"> <span class=\"cardIcon chatThemesIcon backgroundImageGeneric\"></span> <span class=\"statHeading\"> Chat Themes</span>{{#userData.statsData.chatThemes.top}}<span class=\"topHeading\" data-info=\"chat themes\" data-topTag=\"{{userData.statsData.chatThemes.top}}\" data-topTagLevel=\"{{userData.statsData.chatThemes.level}}\"> TOP {{userData.statsData.chatThemes.top}}%</span> {{/userData.statsData.chatThemes.top}}</div>\n                    <div class=\"dataHeader\"> <span class=\"statSubHeading\"> Sent :</span> <span class=\"statData\"> {{userData.statsData.chatThemes.sent}}</span> </div>\n                    <div class=\"dataHeader\"> <span class=\"statSubHeading\"> Recieved:</span> <span class=\"statData\">{{userData.statsData.chatThemes.sent}} </span> </div>\n                </div>\n                <div class=\"halfCard hide\">\n                    <div class=\"header\"> <span class=\"cardIcon chatThemesIcon backgroundImageGeneric\"></span> <span class=\"statHeading\"> Chat Themes</span></div>\n                    <div class=\"dataHeader\"> <span class=\"statSubHeading\"> Sent :</span> <span class=\"statData\"> {{userData.statsData.chatThemes.sent}}</span> </div>\n                    <div class=\"dataHeader\"> <span class=\"statSubHeading\"> Recieved:</span> <span class=\"statData\">{{userData.statsData.chatThemes.sent}} </span> </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"cardContainer marT16\">\n            <div class=\"cardHeader\"> SOCIAL </div>\n            <div class=\"fullCard\">\n                <div class=\"header\"> <span class=\"cardIcon favouriteIcon backgroundImageGeneric\"></span> <span class=\"statHeading\"> Favorites</span>{{#userData.statsData.favorite.top}} <span class=\"topHeading\" data-info=\"favorite\" data-topTag=\"{{userData.statsData.favorite.top}}\" data-topTagLevel=\"{{userData.statsData.favorite.level}}\"> TOP {{userData.statsData.favorite.top}}%</span> {{/userData.statsData.favorite.top}}</div>\n                <div class=\"dataHeader\"> <span class=\"statSubHeading\"> {{userData.statsData.favorite.count}} Friends added you as Favorites</span> </div>\n            </div>\n        </div>\n        <div class=\"cardContainer\">\n            <div class=\"fullCard\">\n                <div class=\"header\"> <span class=\"cardIcon statusUpdatesIcon backgroundImageGeneric\"></span> <span class=\"statHeading\"> Status Updates</span>{{#userData.statsData.statusUpdates.top}}<span class=\"topHeading\" data-info=\"status updates\" data-topTag=\"{{userData.statsData.statusUpdates.top}}\" data-topTagLevel=\"{{userData.statsData.statusUpdates.level}}\"> TOP {{userData.statsData.statusUpdates.top}}%</span> {{/userData.statsData.statusUpdates.top}}</div>\n                <div class=\"dataHeader\"> <span class=\"statSubHeading\"> {{userData.statsData.statusUpdates.count}} status updates by you</span> </div>\n            </div>\n        </div>\n        <div class=\"cardContainer\">\n            <div class=\"fullCard\">\n                <div class=\"header\"> <span class=\"cardIcon invitesIcon backgroundImageGeneric\"></span> <span class=\"statHeading\"> Invites</span>{{#userData.statsData.invites.top}} <span class=\"topHeading\" data-info=\"invites\" data-topTag=\"{{userData.statsData.invites.top}}\" data-topTagLevel=\"{{userData.statsData.invites.level}}\"> TOP {{userData.statsData.invites.top}}%</span> {{/userData.statsData.invites.top}}</div>\n                <div class=\"dataHeader\"> <span class=\"statSubHeading\"> {{userData.statsData.invites.count}} invites sent</span> </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"upgradeOverlay centerToScreenContainer hide\">\n        <div class=\"upgradeOverlayWrapper align-center centerToScreenWrapper\">\n            <div class=\"upgradeSticker backgroundImageGeneric\"></div>\n            <h1 class=\"upgradeHeading\">Update Hike</h1>\n            <p class=\"upgradeText\">Upgrade to the latest version to view your hike stats and earn rewards.</p>\n        </div>\n    </div>\n    <div class=\"topTagOverlay trophyOverlay centerToScreenContainer hide\">\n        <div class=\"trophyOverlayWrapper centerToScreenWrapper\">\n            <div class=\"crossIcon backgroundImageGeneric\"></div>\n            <div class=\"levelsIconWrapper\">\n                <div class=\"levelCommon backgroundImageGeneric\"></div>\n            </div>\n            <h1 class=\"trophyHeading align-center\">\n            Ranked in Top <span class=\"topStat\"></span>  Hikers</h1>\n            <p class=\"levelText align-center\">You have reserved a <span class=\"infoSection\"></span> rank in Top <span class=\"topStat\"></span> of Hike users.</p>\n            <hr noshade>\n            <div class=\"levelAction align-center\">SHARE WITH FRIENDS</div>\n        </div>\n    </div>\n</div>"

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	(function(W, platformSdk, events) {
	    'use strict';

	    var utils = __webpack_require__(4);

	    var TrophiesController = function(options) {
	        this.template = __webpack_require__(11);
	    };

	    TrophiesController.prototype.bind = function(App, data) {
	        var $el = $(this.el);

	        var trophyIdGlobal = null;
	        var globalExperiment = null;

	        var trophyOverlay = document.getElementsByClassName('trophyOverlay')[0];
	        var rewardedTrophyIcons = document.getElementsByClassName('awarded');

	        var allTrophies = document.getElementsByClassName('commonTrophy');

	        var levelBronze = document.getElementsByClassName('levelBronze')[0];
	        var levelSilver = document.getElementsByClassName('levelSilver')[0];
	        var levelGold = document.getElementsByClassName('levelGold')[0];

	        var crossIcon = document.getElementsByClassName('crossIcon')[0];

	        var levelCommon = document.getElementsByClassName('levelCommon');

	        var trophyHeading = document.getElementsByClassName('trophyHeading')[0];
	        var levelText = document.getElementsByClassName('levelText')[0];
	        var levelAction = document.getElementsByClassName('levelAction')[0];

	        crossIcon.addEventListener('click', function(ev) {
	            trophyOverlay.classList.add('hide');
	            resetPopupClasses();
	        });

	        levelAction.addEventListener('click', function(ev) {
	            trophyOverlay.classList.add('hide');
	            resetPopupClasses();
	        });

	        var resetPopupClasses = function() {
	            trophyIdGlobal = null;
	            levelSilver.className = '';
	            levelBronze.className = '';
	            levelGold.className = '';

	            trophyHeading.innerHTML = '';
	            levelText.innerHTML = '';

	            levelBronze.removeAttribute('style');
	            levelSilver.removeAttribute('style');
	            levelGold.removeAttribute('style');

	            levelBronze.classList.add('levelCommon', 'levelBronze', 'backgroundImageGeneric');
	            levelSilver.classList.add('levelCommon', 'levelSilver', 'backgroundImageGeneric');
	            levelGold.classList.add('levelCommon', 'levelGold', 'backgroundImageGeneric');
	        };

	        var tapOnLockedTrophy = function() {
	            console.log('Tapping on Locked Trophy');

	            var level = this.getAttribute('data-level');

	            if (this.classList.contains('levelLocked') && globalExperiment === 'exp3') {

	                // Task is hidden
	                if (data[trophyIdGlobal]) {
	                    levelText.innerHTML = data[trophyIdGlobal].levels[level].text;
	                } else {
	                    levelText.innerHTML = '';
	                }

	            } else {
	                levelText.innerHTML = data[trophyIdGlobal].levels[level].text;
	            }

	            var alreadyTapped = document.getElementsByClassName('levelLockTap');

	            for (var t = 0; t < alreadyTapped.length; t++) {
	                alreadyTapped[t].classList.remove('levelLockTap');
	            }

	            //var level = this.getAttribute('data-level');
	            this.classList.add('levelLockTap');
	        };

	        var openTrophy = function() {

	            var experiment = this.getAttribute('data-experiment');
	            var tid = this.getAttribute('data-tid');
	            trophyIdGlobal = tid;
	            globalExperiment = experiment;

	            trophyHeading.innerHTML = data[tid].label;

	            if (this.classList.contains('awarded')) {
	                console.log('Trophy is awarded');
	                var awardedLevel = data[tid].curLevel;

	                // Current Level Is zero :: Dont show any other Level
	                if (awardedLevel === 0) {
	                    console.log('Awarded Level 0');
	                    levelBronze.style.backgroundImage = 'url(\'' + data[tid].levels[awardedLevel].icon + '\')';
	                    levelSilver.classList.add('levelLocked');
	                    levelSilver.classList.add('levelLockNoTap');
	                    levelGold.classList.add('levelLocked');
	                    levelGold.classList.add('levelLockNoTap');
	                    levelText.innerHTML = data[tid].levels[awardedLevel].text;
	                }

	                // Current Level is 1 :: Show Zeroth Level Also
	                else if (awardedLevel === 1) {
	                    console.log('Awarded Level 1');
	                    levelBronze.style.backgroundImage = 'url(\'' + data[tid].levels[awardedLevel - 1].icon + '\')';
	                    levelSilver.style.backgroundImage = 'url(\'' + data[tid].levels[awardedLevel].icon + '\')';
	                    levelGold.classList.add('levelLocked');
	                    levelGold.classList.add('levelLockNoTap');
	                    levelText.innerHTML = data[tid].levels[awardedLevel].text;
	                }

	                // Current Level is 2 :: Show zeroth and First Level both
	                else if (awardedLevel === 2) {
	                    console.log('Awarded Level 2');
	                    levelBronze.style.backgroundImage = 'url(\'' + data[tid].levels[awardedLevel - 1].icon + '\')';
	                    levelSilver.style.backgroundImage = 'url(\'' + data[tid].levels[awardedLevel - 2].icon + '\')';
	                    levelGold.style.backgroundImage = 'url(\'' + data[tid].levels[awardedLevel].icon + '\')';
	                    levelText.innerHTML = data[tid].levels[awardedLevel].text;
	                }

	                console.log('Opening Rewarded Trophy :: Show Level current and Locked for other Levels with task not hidden');
	            }

	            // Experiment 2 :: Non Hidden Tasks
	            else if (this.classList.contains('locked') && experiment == 'exp2') {
	                console.log('Experiment two :: Show Locked Trophy Task as well');

	                // Bronze Active Currently
	                levelBronze.classList.add('levelLocked');
	                levelText.innerHTML = data[tid].levels[0].text;

	                // Silver Inactive
	                levelSilver.classList.add('levelLocked');
	                levelSilver.classList.add('levelLockNoTap');

	                // Gold Inactive
	                levelGold.classList.add('levelLocked');
	                levelGold.classList.add('levelLockNoTap');
	            }

	            // Experiment 3 :: Hidden Tasks
	            else if (this.classList.contains('locked') && experiment == 'exp3') {
	                console.log('Experiment Three :: Dont Show Locked Trophy Task');

	                trophyHeading.innerHTML = '????';

	                levelBronze.classList.add('levelLocked');
	                levelText.innerHTML = '';

	                // Silver Inactive
	                levelSilver.classList.add('levelLocked');
	                levelSilver.classList.add('levelLockNoTap');

	                // Gold Inactive
	                levelGold.classList.add('levelLocked');
	                levelGold.classList.add('levelLockNoTap');
	            }

	            // Show the Overlay now
	            trophyOverlay.classList.remove('hide');

	        };

	        for (var i = 0; i < rewardedTrophyIcons.length; i++) {
	            var trophyId = rewardedTrophyIcons[i].getAttribute('data-tid');
	            var trophyEarnedLevel = data[trophyId].curLevel;
	            rewardedTrophyIcons[i].style.backgroundImage = 'url(\'' + data[trophyId].levels[trophyEarnedLevel].icon + '\')';
	        }

	        for (var j = 0; j < allTrophies.length; j++) {
	            allTrophies[j].addEventListener('click', openTrophy, false);
	        }

	        for (var z = 0; z < levelCommon.length; z++) {
	            levelCommon[z].addEventListener('click', tapOnLockedTrophy, false);
	        }

	    };

	    TrophiesController.prototype.render = function(ctr, App, data) {

	        var that = this;
	        var awardedTrophies;

	        if (platformSdk.bridgeEnabled)

	            awardedTrophies = platformSdk.appData.helperData.aTrophies;
	        else {
	            awardedTrophies = {
	                'awarded': {
	                    '1': 0,
	                    '3': 1,
	                    '5': 2,
	                    '7': 2
	                }
	            };
	        }

	        if (data.age >= 30)
	            awardedTrophies.awarded[0] = 0;
	        else if (data.age >= 365)
	            awardedTrophies.awarded[0] = 1;
	        else if (data.age >= 1095)
	            awardedTrophies.awarded[0] = 2;

	        data = data.trophiesData;

	        var exp2 = false,
	            exp3 = false;

	        for (var key in awardedTrophies.awarded) {
	            data[key].awarded = 'true';
	            data[key].curLevel = awardedTrophies.awarded[key];
	        }

	        // Logic 1 :: Only show Awarded Trophies and Not Show Any More upcoming Trophies

	        if (platformSdk.bridgeEnabled) {
	            if (platformSdk.appData.helperData.experiment == 2 && data)


	                exp2 = true;

	            // Logic 2 : Show Rewarded and Not Rewarded (Task Locked state)
	            else if (platformSdk.appData.helperData.experiment == 3 && data)

	                exp3 = true;

	        } else {
	            exp2 = true;
	        }

	        // Logic 3 : Show Rewarded and not Rewarded (Task Not Locked )

	        that.el = document.createElement('div');
	        that.el.className = 'smellOptInContainer animation_fadein noselect';
	        that.el.innerHTML = Mustache.render(unescape(that.template), { experiment2: exp2, experiment3: exp3, trophiesData: data, awardedCount: Object.keys(awardedTrophies.awarded).length, totalCount: data.length });

	        ctr.appendChild(that.el);
	        events.publish('update.loader', { show: false });

	        try {
	            PlatformBridge.changeBotTitle('Trophies');
	        } catch (e) {
	            console.log('Error in changing bot title');
	        }

	        that.bind(App, data);
	    };

	    TrophiesController.prototype.destroy = function() {

	    };

	    module.exports = TrophiesController;

	})(window, platformSdk, platformSdk.events);

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = "<div class=\"trophyContainer\">\n    <div class=\"overallWrapper\">\n        <div class=\"trophyCountWrapper\">\n            <div class=\"trophyCountIcon backgroundImageGeneric\"></div>\n            <div class=\"trophyCount\"><span>{{awardedCount}}</span> / {{totalCount}}</div>\n        </div>\n        <!-- List Of All Trophies -->\n        <div class=\"centerToScreenContainer\">\n            <div class=\"trophyWrapper centerToScreenWrapper\">\n                {{#experiment2}} {{#trophiesData}}\n                <div class=\"trophyIconContain\">\n                    <div data-tid=\"{{id}}\" data-experiment=\"exp2\" id=\"trophyIcon\" class=\"commonTrophy {{^awarded}}locked{{/awarded}} {{#awarded}}awarded{{/awarded}} backgroundImageGeneric\"></div>\n                </div>\n                {{/trophiesData}} {{/experiment2}} {{#experiment3}} {{#trophiesData}}\n                <div class=\"trophyIconContain\">\n                    <div id=\"trophyIcon\" data-tid=\"{{id}}\" data-experiment=\"exp3\" class=\"commonTrophy {{^awarded}}locked{{/awarded}} {{#awarded}}awarded{{/awarded}} backgroundImageGeneric\"></div>\n                </div>\n                {{/trophiesData}} {{/experiment3}}\n            </div>\n        </div>\n    </div>\n    <div class=\"trophyOverlay centerToScreenContainer hide\">\n        <div class=\"trophyOverlayWrapper centerToScreenWrapper\">\n            <div class=\"crossIcon backgroundImageGeneric\"></div>\n            <div class=\"levelsIconWrapper\">\n                <div data-level= 0  class=\"levelCommon levelBronze backgroundImageGeneric\"></div>\n                <div data-level= 1 class=\"levelCommon levelSilver backgroundImageGeneric\"></div>\n                <div data-level= 2 class=\"levelCommon levelGold backgroundImageGeneric\"></div>\n            </div>\n            <h1 class=\"trophyHeading align-center\"></h1>\n            <p class=\"levelText align-center\"></p>\n            <hr noshade>\n            <div class=\"levelAction align-center\">Ok</div>\n        </div>\n\n    </div>\n</div>\n"

/***/ },
/* 12 */
/***/ function(module, exports) {

	(function (W, events) {
	    'use strict';

	    var Router = function () {
	        this.routes = {};
	        this.history = [];
	        this.prevData = null;

	        this.getCache();
	    };

	    var _routerCache = {};

	    var unload = function () {
	        // ToDo: Redundant code
	        events.publish('app.store.set', {
	            key: '_routerCache',
	            value: _routerCache
	        });
	    };

	    // window.onbeforeunload = unload;

	    Router.prototype.getCache = function () {
	        events.publish('app.store.get', {
	            key: '_routerCache',
	            ctx: this,
	            cb: function (r) {
	                if (r.status === 1) {
	                    this.history = r.results.history || [];
	                }
	            }
	        });
	    };

	    Router.prototype.route = function (route, callback) {
	        this.routes[route] = callback;
	    };

	    Router.prototype.navigateTo = function (route, data) {

	        var historyTop = this.history[this.history.length - 1];

	        if (historyTop && historyTop.route === route) {
	            if (data.subPath !== undefined && (data.subPath === historyTop.data.subPath)) {
	                return;
	            } else {
	                // Navigate to sub path. Don't push into History. Replace top item with this one.
	                this.history[this.history.length - 1] = {
	                    route: route,
	                    data: data
	                };
	            }
	        } else {
	            this.history.push({
	                route: route,
	                data: data
	            });
	        }

	        this.routes[route](data);

	        _routerCache['route'] = route;
	        _routerCache['cache'] = data;
	        _routerCache['history'] = this.history;

	        unload();

	    };

	    Router.prototype.back = function () {
	        var history = this.history,
	            historyItem;



	        if (history.length !== 1) {
	            history.pop();
	        }

	        historyItem = history[history.length - 1];
	        this.routes[historyItem.route](historyItem.data);
	    };

	    module.exports = Router;
	})(window, platformSdk.events);

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	(function (W, platformSdk, events) {
	    'use strict';

	    var utils = __webpack_require__(4);
	    var checkTimeout = null;

	    var Constants = __webpack_require__(5);

	    var TxService = function () {
	        },
	        checkConnection = function (fn, ctx) {

	            // For Devices, else case to run on Chrome's onLine method

	            if (platformSdk.bridgeEnabled) {
	                platformSdk.nativeReq({
	                    fn: 'checkConnection',
	                    ctx: this,
	                    data: "",
	                    success: function (response) {
	                        if (typeof fn === "function") {
	                            fn.call(ctx, response);
	                        }
	                    }
	                });
	            } else {
	                if (navigator.onLine) {
	                    if (typeof fn === "function") fn.call(ctx, navigator.onLine);
	                } else {
	                    if (typeof fn === "function") fn.call(ctx, -1);
	                }
	            }
	        };

	    TxService.prototype = {
	        communicate: function (params, fn, x) {
	            var that = this,
	                requestUrl = params.url,

	                successCb = function (res) {
	                    console.log("Success", res);

	                    var response;

	                    events.publish('app/offline', {show: false});

	                    try {
	                        res = JSON.parse(decodeURIComponent(res));

	                        if ( res.status == 'failure' && res.status_code == 429 ) 
	                            fn.call(x, res);  /*  Special Case when response status is failure and status code is 429*/
	                        else if ( res.status == 'failure' ) 
	                            fn.call(x,  { 'stat':'fail'});
	                        else if (requestUrl.indexOf('subscribe.json') > 0)
	                            fn.call(x,  res);
	                        else
	                            res = JSON.parse((res.response));
	                    }
	                    catch (e) {
	                        return false;
	                    }
	                    if (res ) {
	                        fn.call(x, res);
	                    }
	                    else {
	                        if (platformSdk.bridgeEnabled) {
	                            // Switch Off Loader and Show Toast
	                            events.publish('update.loader', {show: false});
	                            platformSdk.ui.showToast("Hmm. Something went wrong. Not to worry, try again in a little bit :)");
	                        }
	                        else {
	                            console.log("Hmm. Something went wrong. Not to worry, try again in a little bit :)");
	                        }
	                    }
	                };

	            // For Every API Call start the Loader Once The Api Hits Communicate
	            
	            if( params.loader ){
	                events.publish('update.loader', {show: false});
	            }
	                            
	            checkConnection(function (connType) {
	                if (connType === Constants.ConnectionTypes.NO_NETWORK) {
	                    // Show no internet screen.
	                    platformSdk.events.publish('app/offline', {
	                        show: true
	                    });

	                    return;
	                }

	                platformSdk.events.publish('app/offline', {
	                    show: false
	                });
	                if(platformSdk.bridgeEnabled)
	                {
	                        if (params.type === 'GET') {
	                            console.log('calling service GET', requestUrl);

	                            platformSdk.nativeReq({
	                                fn: 'doGetRequest',
	                                ctx: params.ctx || that,
	                                data: requestUrl,
	                                success: successCb
	                            });
	                        } else if (params.type === 'POST') {
	                            var data = {};
	                            data.url = params.url;

	                            if (params.data) {
	                                data.params = params.data;
	                            } else {
	                                data.params = {};
	                            }

	                            console.log('calling service POST', data);
	                            data = JSON.stringify(data);

	                            platformSdk.nativeReq({
	                                fn: 'doPostRequest',
	                                ctx: params.ctx || this,
	                                data: data,
	                                success: successCb
	                            });
	                                }
	                    }
	                    else{
	                        platformSdk.ajax({
	                           type: params.type,
	                           url: requestUrl,
	                           timeout: 30000,
	                           data: params.data !== undefined ? JSON.stringify(params.data) : null,
	                           headers: params.headers,
	                           success: successCb
	                        });
	                    }

	            

	            });
	        }
	    };

	    module.exports = TxService;

	})(window, platformSdk, platformSdk.events);

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	(function(W, platformSdk) {
	    'use strict';

	    var utils = __webpack_require__(4);
	    var checkTimeout = null;
	    var suffix = '?random=' + Math.round(Math.random() * 999999999);

	    var ninjaServices = function(service) {
	        this.ninjaServices = service;
	    };

	    var URL = {
	        location: appConfig.API_URL,
	    };

	    ninjaServices.prototype = {


	        // Hike Stats Fron URL
	        getProfile: function(fn, x) {
	            var params = {
	                'url': URL.location + '/profile?random=' + Math.round(Math.random() * 999999999),
	                'type': 'GET',
	                'loader': true
	            };
	            if (typeof fn === 'function') return this.ninjaServices.communicate(params, fn, x);
	            else this.ninjaServices.communicate(params);
	        },


	        // Hike Stats Fron URL
	        getHikeStats: function(fn, x) {
	            var params = {
	                'url': URL.location + '/stats?random=' + Math.round(Math.random() * 999999999),
	                'type': 'GET',
	                'loader': true
	            };
	            if (typeof fn === 'function') return this.ninjaServices.communicate(params, fn, x);
	            else this.ninjaServices.communicate(params);
	        },

	        //Trophy Data From URL
	        getTrophyData: function(fn, x) {
	            var params = {
	                'url': URL.location + '/trophies?random=' + Math.round(Math.random() * 999999999),
	                'type': 'GET',
	                'loader': true
	            };
	            if (typeof fn === 'function') return this.ninjaServices.communicate(params, fn, x);
	            else this.ninjaServices.communicate(params);
	        },


	        logData: function(obj) {
	            var analyticEvents = {};

	            if (obj)
	                for (var key in obj) {
	                    analyticEvents[key] = obj[key];
	                }

	            //analyticEvents['ek'] = "aprilFool";

	            platformSdk.utils.logAnalytics("true", "click", analyticEvents);
	        },

	    };

	    module.exports = ninjaServices;

	})(window, platformSdk);

/***/ }
/******/ ]);