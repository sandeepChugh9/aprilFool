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

	        //window.onResume = application.resumeHikeNinja.bind(application);
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

	(function(W, undefined) {
	    'use strict';

	    HTMLElement.prototype.toggleClass = function(classToken, flag) {
	        var element = this;

	        if (flag !== undefined) {
	            if (flag) {
	                element.classList.add(classToken);
	            } else {
	                element.classList.remove(classToken);
	            }
	        } else {
	            element.classList.toggle(classToken);
	        }
	    };

	    var ConnTypes = __webpack_require__(5).ConnectionTypes,
	        _extend = function(toObj, fromObj) {
	            for (var key in fromObj) {
	                if (fromObj.hasOwnProperty(key) && toObj[key] === undefined) {
	                    toObj[key] = fromObj[key];
	                }
	            }
	        },
	        imageOptimizationConnTypes = [ConnTypes.NO_NETWORK, ConnTypes.UNKNOWN, ConnTypes.TWO_G],
	        noop = function() {

	        },
	        memoizationCache = {},
	        basePrefix = 'id_',
	        idCounter = 1;

	    module.exports = {
	        isFunction: function(fn) {
	            return typeof fn === 'function';
	        },

	        extend: function(toObj, fromObj) {
	            _extend(toObj.prototype, fromObj.prototype);
	            _extend(toObj, fromObj);

	            return toObj;
	        },

	        serializeParams: function(params) {
	            var serializedParams = [];

	            for (var key in params) {
	                if (params.hasOwnProperty(key)) {
	                    serializedParams.push(key + '=' + params[key]);
	                }
	            }

	            return serializedParams.join('&');
	        },

	        empty: function(element) {
	            while (element.firstChild) {
	                element.removeChild(element.firstChild);
	            }

	            return element;
	        },

	        getUniqueId: function(prefix) {
	            return (prefix || basePrefix) + idCounter++;
	        },

	        simpleClone: function(obj) {
	            return JSON.parse(JSON.stringify(obj));
	        },

	        loadImage: function(params) {
	            var imageEl = document.createElement('img');

	            imageEl.src = params.src;

	            imageEl.onload = function() {
	                params.success(imageEl, params.src);
	            };

	            imageEl.onError = function() {
	                params.error(imageEl);
	            };
	        },

	        toOptimizeForImages: function(connectionType) {
	            if (memoizationCache[connectionType] === undefined) {
	                memoizationCache[connectionType] = imageOptimizationConnTypes.indexOf(connectionType) !== -1;
	            }

	            return memoizationCache[connectionType];
	        },

	        getNodeIndex: function(elem) {
	            var index = 0;

	            while (elem == elem.previousElementSibling) {
	                index++;
	            }

	            return index;
	        },

	        createCustomEvent: function(eventName) {
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

	        toggleBackNavigation: function(enable) {

	            enable = enable ? 'true' : 'false';

	            if (platformSdk.bridgeEnabled) {
	                platformSdk.bridge.allowBackPress(enable);
	            }
	        },


	        debounce: function(func, wait, immediate) {
	            var timeout;
	            return function() {
	                var context = this,
	                    args = arguments;
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

	})(window);

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
	                    textlocked: 'Complete a month in hike to unlock this trophy!',
	                    textunlocked: 'Congrats! We have just completed our first month together.'
	                }, {
	                    value: '1 year',
	                    icon: 'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-hikeage-silver.png',
	                    textlocked: 'Complete a year to unlock this trophy!',
	                    textunlocked: 'We have just completed a year together. Cheers!'
	                }, {
	                    icon: 'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-hikeage-gold.png',
	                    value: 'Completing 3 years on Hike !',
	                    textlocked: 'Complete 3 years together to unlock this trophy!',
	                    textunlocked: 'We have been together for 3 years now. In love!'
	                }

	            ]

	        }, {
	            id: 1,
	            label: 'Messaging',
	            subtext: '',
	            levels: [{
	                    icon: 'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-messaging-bronze.png',
	                    value: 100,
	                    textlocked: 'Get 100 messages from friends to unlock this trophy!',
	                    textunlocked: 'You have gotten your first 100 messages!'
	                }, {
	                    icon: 'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-messaging-silver.png',
	                    value: 1000,
	                    textlocked: 'Get 1000 messages from friends to unlock this trophy!',
	                    textunlocked: 'First ton! You have gotten 1000 messages already! Great going.'
	                }, {
	                    icon: 'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-messaging-gold.png',
	                    value: 10000,
	                    textlocked: 'Get 10k messages from friends to unlock this trophy!',
	                    textunlocked: 'You have gotten 10k messages already! You are on fire!'
	                }

	            ]

	        }, {
	            id: 2,
	            label: 'Stickers',
	            subtext: '',
	            levels: [{
	                    icon: 'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-stickers-bronze.png',
	                    value: 100,
	                    textlocked: 'Get 100 stickers from friends to unlock this trophy!',
	                    textunlocked: 'You have gotten your first 100 stickers!'
	                }, {
	                    icon: 'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-stickers-silver.png',
	                    value: 1000,
	                    textlocked: 'Get 1000 stickers from friends to unlock this trophy!',
	                    textunlocked: 'First ton! You have gotten 1000 stickers already! Great going.'
	                }, {
	                    icon: 'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-stickers-gold.png',
	                    value: 10000,
	                    textlocked: 'Get 10k stickers from friends to unlock this trophy!',
	                    textunlocked: 'You have gotten 10k stickers already! You are on fire!'
	                }

	            ]

	        }, {
	            id: 3,
	            label: 'Files',
	            subtext: '',
	            levels: [{
	                    icon: 'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-files-bronze.png',
	                    value: 10,
	                    textlocked: 'Get 100 files from friends to unlock this trophy!',
	                    textunlocked: 'You have gotten your first 10 files!'
	                }, {
	                    icon: 'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-files-silver.png',
	                    value: 100,
	                    textlocked: 'Get 100 files from friends to unlock this trophy!',
	                    textunlocked: 'First ton! You have gotten 100 files already! Great going.'
	                }, {
	                    icon: 'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-files-gold.png',
	                    value: 1000,
	                    textlocked: 'Get 10k files from friends to unlock this trophy!',
	                    textunlocked: 'You have gotten 10000 files already! You are on fire!'
	                }

	            ]

	        }, {
	            id: 4,
	            label: 'Hike Direct',
	            subtext: '',
	            levels: [{
	                    icon: 'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-hikedirect-bronze.png',
	                    value: '1 GB',
	                    textlocked: 'Share 1 GB of data on Hike Direct to unlock this trophy!',
	                    textunlocked: 'You have shared 1 GB of files via Hike Direct! Keep going!'
	                }, {
	                    icon: 'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-hikedirect-silver.png',
	                    value: '10 GB',
	                    textlocked: 'Share 10 GB of data on Hike Direct with friends to unlock this trophy!',
	                    textunlocked: 'First ton! You have shared 10 GB of files via Hike Direct. Kudos!'
	                }, {
	                    icon: 'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-hikedirect-gold.png',
	                    value: '100 GB',
	                    textlocked: 'Share 100 GB of data on Hike Direct with friends to unlock this trophy!',
	                    textunlocked: 'Awesome! You have shared 100 GB of files via Hike Direct. Well done!'
	                }

	            ]
	        }, {
	            id: 5,
	            label: 'Chat Themes',
	            subtext: '',
	            levels: [{
	                    icon: 'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-chattheme-bronze.png',
	                    value: 10,
	                    textlocked: 'Get 10 friends to change your chat theme to unlock!',
	                    textunlocked: 'Your friends have changed 10 chat themes with you! Nice.'
	                }, {
	                    icon: 'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-chattheme-silver.png',
	                    value: 100,
	                    textlocked: 'Get 100 friends to change your chat theme to unlock!',
	                    textunlocked: 'Your friends have changed 100 chat themes with you! Cool.'
	                }, {
	                    icon: 'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-chattheme-gold.png',
	                    value: 1000,
	                    textlocked: 'Get 1000 friends to change your chat theme to unlock!',
	                    textunlocked: 'Your friends have changed 1000 chat themes with you! Brilliant!'
	                }

	            ]

	        }, {
	            id: 6,
	            label: 'Status Updates',
	            subtext: '',
	            levels: [{
	                    icon: 'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-statusupdate-bronze.png',
	                    value: 1,
	                    textlocked: 'Post your first status update to unlock this trophy.',
	                    textunlocked: 'You have posted your first status update!'
	                }, {
	                    icon: 'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-statusupdate-silver.png',
	                    value: 10,
	                    textlocked: 'Post 10 status updates to unlock this trophy.',
	                    textunlocked: 'You have posted 10 status updates already! Whoa!'
	                }, {
	                    icon: 'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-statusupdate-gold.png',
	                    value: 100,
	                    textlocked: 'Century! You have posted 100 status updates already.',
	                    textunlocked: 'Post 100 status updates to unlock this trophy.'
	                }

	            ]

	        }, {
	            id: 7,
	            label: 'Favorites',
	            subtext: '',
	            levels: [{
	                    icon: 'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-favourites-bronze.png',
	                    value: 1,
	                    textlocked: 'Add your first favorite on hike to unlock this trophy.',
	                    textunlocked: 'You have added your first favorite on hike. Nice.'
	                }, {
	                    icon: 'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-favourites-silver.png',
	                    value: 10,
	                    textlocked: 'Add 10 favorites on hike to unlock this trophy.',
	                    textunlocked: 'You have added 10 favorites on hike. Great going.'
	                }, {
	                    icon: 'https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-favourites-gold.png',
	                    value: 25,
	                    textlocked: 'Add 25 favorites on hike to unlock this trophy.',
	                    textunlocked: 'You have added 25 favorites on hike. You arre on fire.'
	                }

	            ]

	        }]

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
	                API_URL: 'http://52.76.46.27:5002',
	                LOG_URL:'http://52.76.46.27:5002',

	            };
	        } else if (env === Constants.STAGING_ENV) {
	            return {
	                API_URL: 'http://52.76.46.27:5002',
	                LOG_URL:'http://52.76.46.27:5002',

	            };
	        } else if (env === Constants.PROD_ENV) {
	            return {
	                API_URL: 'http://nixy.hike.in',
	                LOG_URL:'http://epsy.hike.in',
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
	        QuestionController = __webpack_require__(10),
	        SurveyDoneController = __webpack_require__(19),


	        Router = __webpack_require__(21),
	        utils = __webpack_require__(4),

	        TxService = __webpack_require__(22),
	        SurveyServices = __webpack_require__(23),
	        dataQues = {

	            "10": {
	                "qid": 10,
	                "questionText": "q0 - Which one is your favourate App? Answer to get reward",
	                "type": "radio",
	                "skipTo": 4,
	                "options": [{
	                    "text": "Whatsapp",
	                    "child": "7",
	                }, {
	                    "text": "snapchat",
	                    "child": "2",
	                }, {
	                    "text": "tinder",
	                    "child": "3",
	                }, {
	                    "text": "facebok",
	                    "child": "1",
	                }]
	            },

	            "9": {
	                "qid": 9,
	                "questionText": "q1- Describe yourself in one line!",
	                "type": "text",
	                "charLimit": 300,
	                "defaultMessage": "Describe yourself!"
	            },

	            "0": {
	                "qid": 0,
	                "questionText": "q2- Do you like the new Director of Engineering ? ",
	                "type": "imageOption1",
	                "skipTo": 8,
	                "options": [{
	                    "text": "Yes",
	                    "child": "5",
	                    "type": "positive"
	                }, {
	                    "text": "ummm!",
	                    "child": "6",
	                    "type": "neutral"
	                }, {
	                    "text": "No",
	                    "child": "8",
	                    "type": "negative"
	                }]
	            },


	            "3": {
	                "qid": 3,
	                "questionText": "q3 - Checkbox",
	                "type": "checkbox",
	                "options": [{
	                    "text": "reason 1"
	                }, {
	                    "text": "reason 2"
	                }, {
	                    "text": "reason 3"
	                }, {
	                    "text": "reason 4"
	                }]
	            },

	            "4": {
	                "qid": 4,
	                "questionText": "q4 - checkbox",
	                "type": "checkbox",
	                "options": [{
	                    "text": "reason 1"
	                }, {
	                    "text": "reason 2"
	                }, {
	                    "text": "reason 3"
	                }, {
	                    "text": "reason 4"
	                }]
	            },

	            "5": {
	                "qid": 5,
	                "questionText": "q5- checkbox",
	                "type": "checkbox",
	                "options": [{
	                    "text": "reason 1"
	                }, {
	                    "text": "reason 2"
	                }, {
	                    "text": "reason 3"
	                }, {
	                    "text": "reason 4"
	                }]
	            },

	            "6": {
	                "qid": 6,
	                "questionText": "q6 - checkbox",
	                "type": "checkbox",
	                "skipTo": 3,
	                "options": [{
	                    "text": "reason 1"
	                }, {
	                    "text": "reason 2"
	                }, {
	                    "text": "reason 3"
	                }, {
	                    "text": "reason 4"
	                }]
	            },
	            "7": {
	                "qid": 7,
	                "questionText": "qid 7",
	                "type": "rating",
	                "skipTo": 5,
	                "stars": [{
	                    "child": "3"
	                }, {
	                    "child": "3"
	                }, {
	                    "child": "3"
	                }, {
	                    "child": "3"
	                }, {
	                    "child": "3"
	                }]
	            },


	            "8": {
	                "qid": 8,
	                "questionText": "qid 8",
	                "type": "radioVersus",
	                "leftImgURL": "https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-statusupdate-bronze.png",
	                "rightImgURL": "https://s3-ap-southeast-1.amazonaws.com/hike-giscassets/nixy/trophy-statusupdate-bronze.png",
	                "skipTo": 5,
	                "options": [{
	                    "text": "reason 1",
	                    "child": "4"
	                }, {
	                    "text": "reason 2",
	                    "child": "3"
	                }, {
	                    "text": "reason 3",
	                    "child": "1"
	                }]
	            },

	            "1": {
	                "qid": 1,
	                "questionText": "qid 9",
	                "type": "radioSinglePic",
	                "imgURL": "http://s3-ap-southeast-1.amazonaws.com/hike-giscassets/capam.jpg",
	                "options": [{
	                    "text": "reason 1",
	                    "child": "3"
	                }, {
	                    "text": "reason 2"
	                }, {
	                    "text": "reason 3"
	                }, {
	                    "text": "reason 4"
	                }]
	            },

	            "2": {
	                "qid": 2,
	                "questionText": "qid 8",
	                "type": "radioVersus",
	                "leftImgURL": "http://s3-ap-southeast-1.amazonaws.com/hike-giscassets/capam.jpg",
	                "rightImgURL": "http://s3-ap-southeast-1.amazonaws.com/hike-giscassets/ironman.jpg",
	                "options": [{
	                    "text": "reason 1",
	                    "child": "3"
	                }, {
	                    "text": "reason 2"
	                }, {
	                    "text": "reason 3"
	                }, {
	                    "text": "Wanna trap in loop again?",
	                }]
	            }



	        };

	    var platSDK = {
	        "ftueDone": false,
	        "questions": dataQues,
	        "currentQuesNum": 1,
	        "currentQuesId": 0,
	        "surveyType": "sequential",
	        "surveyId": 123,
	        "quespath": [],
	        "userResponse": {

	        }
	    }


	    // Full Screen Loader
	    var loader = document.getElementById('loader');
	    var loadObject = events.subscribe('update.loader', function(params) {
	        loader.toggleClass('loading', params.show);
	    });


	    // Tap State Events :: Touch Start And Touch End

	    document.addEventListener('touchstart', function(e) {
	        e = e || window.event;
	        var target = e.target;
	        if (target.classList.contains('buttonTapWhite')) {
	            target.classList.add('tapStateWhite');
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
	        if (target.classList.contains('buttonTapWhite')) {
	            target.classList.remove('tapStateWhite');
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
	        this.questionController = new QuestionController();
	        this.surveyDoneController = new SurveyDoneController();



	        this.TxService = new TxService();
	        this.surveyServices = new SurveyServices(this.TxService); //communication layer
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




	        backPressTrigger: function() {

	            if (platformSdk.appData.helperData.currentQuesId == 0 || document.getElementsByClassName('surveyDoneCard').length > 0) {
	                console.log('closing view');
	                PlatformBridge.closeWebView();
	                return;
	            }

	            events.publish('back.press');



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




	        start: function() {

	            var self = this;
	            self.$el = $(this.container);
	            var logDataToSend = {};

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
	                // self.upPressTrigger();
	            });

	            // Home Screen Route
	            this.router.route('/', function(data) {
	                self.container.innerHTML = '';
	                self.workspaceController.render(self.container, self, data);
	                utils.toggleBackNavigation(false);
	            });

	            // Home Screen Route
	            this.router.route('/takeSurvey', function(data) {
	                self.container.innerHTML = '';
	                self.questionController.render(self.container, self, data);
	                utils.toggleBackNavigation(true);
	            });


	            this.router.route('/surveyDone', function(data) {
	                self.container.innerHTML = '';
	                self.surveyDoneController.render(self.container, self, data);
	                utils.toggleBackNavigation(false);
	            });

	            // Start of the flow
	            if (platformSdk.bridgeEnabled) {

	                if (!platformSdk.appData.helperData.ftueDone) {
	                    self.router.navigateTo('/');
	                    logDataToSend.uk = "optin_load";
	                    logDataToSend.c = "scrn_load";
	                    logDataToSend.o = "optin_load";
	                    self.surveyServices.logData(logDataToSend);

	                } else {
	                    self.router.navigateTo('/takeSurvey');
	                }

	            } else {

	                if (!platSDK.ftueDone) {
	                    self.router.navigateTo('/', platSDK);
	                    logDataToSend.uk = "optin_load";
	                    logDataToSend.c = "scrn_load";
	                    logDataToSend.o = "optin_load";
	                    self.surveyServices.logData(logDataToSend);

	                } else
	                    self.router.navigateTo('/takeSurvey', platSDK);

	            }




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
	        var logDataToSend = {};
	        var btn = document.getElementsByClassName('homeScreenBtn')[0];
	        var btmContainer = document.getElementsByClassName('bottomContainer')[0];
	        var bottomVal = (window.innerHeight - btn.offsetTop - btn.offsetHeight) / 2 - (btmContainer.offsetHeight / 2);
	        btmContainer.style.bottom = bottomVal + "px";


	        btn.addEventListener('click', function() {

	            logDataToSend.uk = "optin_clk";
	            logDataToSend.c = "click";
	            logDataToSend.o = "optin_clk";
	            App.surveyServices.logData(logDataToSend);

	            if (platformSdk.bridgeEnabled) {
	                platformSdk.appData.helperData.ftueDone = true;
	                platformSdk.appData.helperData.currentQuesNum = 1;
	                platformSdk.appData.helperData.currentQuesId = 0;
	                platformSdk.updateHelperData(platformSdk.appData.helperData);
	                App.router.navigateTo('/takeSurvey');
	            } else {
	                App.router.navigateTo('/takeSurvey', data);
	            }

	        });
	    };





	    WorkspaceController.prototype.render = function(ctr, App, data) {

	        var that = this;
	        var firstScreen;

	        if (platformSdk.bridgeEnabled)
	            firstScreen = platformSdk.appData.helperData.firstScreen;
	        else
	            firstScreen = {
	                "title": "Hike Survey",
	                "subtitle": "You’ve been an awesome hiker and we highly value your feedback.",
	                "CTAText": "COUNT ME IN",
	                "bottomTitle": "2-3 min"
	            };


	        that.el = document.createElement('div');
	        that.el.className = 'workSpaceContainer animation_fadein noselect';
	        that.el.innerHTML = Mustache.render(unescape(that.template), { firstScreen: firstScreen });
	        ctr.appendChild(that.el);
	        events.publish('update.loader', { show: false });
	        that.bind(App, data);
	    };

	    WorkspaceController.prototype.destroy = function() {

	    };

	    module.exports = WorkspaceController;


	})(window, platformSdk, platformSdk.events);

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = "<div class=\"workSpaceContainer\">\n    <div class=\"hikeSurveyIcon backgroundImageGeneric\"> </div>\n    <div class=\"title\"> {{firstScreen.title}} </div>\n    <div class=\"subTitle\"> {{firstScreen.subtitle}} </div>\n    <div class=\"homeScreenBtn\"> {{firstScreen.CTAText}}</div>\n    <div class=\"bottomContainer\">\n        <span class=\"timeIcon backgroundImageGeneric inlineBlock\"> </span> <span class=\"timeText\">{{firstScreen.bottomTitle}}</span>\n    </div>\n</div>"

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	(function(W, platformSdk, events) {
	    'use strict';

	    var utils = __webpack_require__(4),
	        Constants = __webpack_require__(5),

	        QuestionController = function(options) {
	            this.template = __webpack_require__(11);
	            this.checkFormatTemplate = __webpack_require__(12);
	            this.radioFormatTemplate = __webpack_require__(13);
	            this.radioVersusFormatTemplate = __webpack_require__(14);
	            this.radioSinglePicFormatTemplate = __webpack_require__(15);
	            this.textFormatTemplate = __webpack_require__(16);
	            this.ratingFormatTemplate = __webpack_require__(17);
	            this.imgOptions1FormatTemplate = __webpack_require__(18);
	        };

	    QuestionController.prototype.bind = function(App, data) {
	        var that = this;
	        var $el = $(this.el);

	        var QuestionsScope = (function() {

	            var api = {},
	                dataLocal = {},
	                cache = {
	                    "questionsCard": document.getElementsByClassName('questionsCard')[0],
	                    "nextLink": document.getElementsByClassName('nextLink')[0],
	                    "prevLink": document.getElementsByClassName('prevLink')[0],
	                    "currentQuesNum": document.getElementById('currentQuesNum'),
	                    "questionBar": document.getElementsByClassName('questionBar')[0],
	                    "initialH": 28,
	                    "nextLinkClicked": false,
	                    "prevLinkClicked": false,
	                    "noInternet": document.getElementById('nointernet'),
	                    "lastHeight": window.innerHeight,
	                    "intialCardH": '',
	                    "intervals": [],
	                    "quesContainer": document.getElementsByClassName('questionContainer')[0]





	                },
	                state = {};

	            var api = {

	                init: function() {
	                    var that = this;
	                    that.renderQuestion(data.currentQuesId, -1, true);
	                    that.bindHandlers();
	                    cache.intialCardH = parseInt(window.getComputedStyle(document.getElementsByClassName('card')[0]).height);
	                    events.subscribe('back.press', function() {
	                        that.prevLinkFunctionality();
	                    });
	                },


	                adjustTextHeight: function(card) {

	                    if (card.querySelectorAll('.textRow').length > 0) {
	                        var height = cache.nextLink.offsetTop - (card.querySelector('.question').offsetTop + card.querySelector('.question').clientHeight + 80);
	                        card.querySelector('.textInput').style.maxHeight = height + "px";


	                        if (parseInt(card.querySelector('.textInput').style.height) >= height) {
	                            card.querySelector('.question').style.paddingBottom = "0px";
	                            card.querySelector('.textRow').style.marginTop = "40px";
	                            card.querySelector('.textRow').style.marginBottom = "40px";
	                        } else {

	                            card.querySelector('.question').style.paddingBottom = "48px";
	                            card.querySelector('.textRow').style.marginTop = "60px";
	                            card.querySelector('.textRow').style.marginBottom = "60px";
	                        }

	                    }

	                },


	                loadImages: function() {


	                    var images = document.getElementsByClassName('topImg');
	                    var imageOptions = document.getElementsByClassName('imgRow');
	                    var image;

	                    for (var i = 0; i < images.length; i++) {
	                        images[i].style.backgroundImage = "url('" + images[i].getAttribute('data-url') + "')";
	                        image = document.createElement('img');
	                        image.src = images[i].getAttribute('data-url');


	                        image.onerror = function() {
	                            cache.noInternet.classList.add('no-internet-msg');
	                        };

	                    }


	                    for (var i = 0; i < imageOptions.length; i++) {
	                        if (imageOptions[i].getAttribute('data-emotionType') == 'positive') {
	                            imageOptions[i].classList.add("floatL");
	                            imageOptions[i].classList.add("positiveHollow");
	                        } else if (imageOptions[i].getAttribute('data-emotionType') == 'neutral') {
	                            imageOptions[i].classList.add('neutralHollow');
	                        } else if (imageOptions[i].getAttribute('data-emotionType') == 'negative') {
	                            imageOptions[i].classList.add("floatR");
	                            imageOptions[i].classList.add("negativeHollow");

	                        }
	                    }

	                },

	                bindHandlers: function() {

	                    var that = this;

	                    window.onresize = function() {

	                        window.setTimeout(function() {
	                            that.adjustWindow();
	                        }, 200);

	                    }

	                    document.querySelector('body').addEventListener('click', function(evt) {

	                        var parent = evt.target.parentNode;
	                        var qid;

	                        if (parent.classList.contains('checkRow')) {

	                            qid = parent.parentNode.parentNode.querySelector('.question').getAttribute('data-qid');

	                            var checkbox = parent.querySelector('.checkRec');
	                            var optionTxt = parent.querySelector('.optionTxt');
	                            var child = parent.getAttribute('data-child');

	                            if (checkbox.classList.contains('emptyRec')) {
	                                checkbox.classList.add('filledRec');
	                                checkbox.classList.remove('emptyRec');
	                                optionTxt.classList.add('selectedTextColor');

	                            } else if (checkbox.classList.contains('filledRec')) {
	                                checkbox.classList.remove('filledRec');
	                                checkbox.classList.add('emptyRec');
	                                optionTxt.classList.remove('selectedTextColor');
	                            }

	                            that.toggleNavigateLink(parent.parentNode, "checkbox", qid);

	                        } else if (parent.classList.contains('radioRow')) {


	                            qid = parent.parentNode.parentNode.querySelector('.question').getAttribute('data-qid');

	                            var radioBox = parent.querySelector('.radioCirc');
	                            var optionTxt = parent.querySelector('.optionTxt');
	                            var child = parent.getAttribute('data-child');

	                            if (radioBox.classList.contains('emptyCirc')) {

	                                radioBox.classList.add('filledCirc');
	                                radioBox.classList.remove('emptyCirc');
	                                optionTxt.classList.add('selectedTextColor');
	                                that.unselectRadioSublings(parent);
	                            }

	                            that.toggleNavigateLink(parent.parentNode, "radio", qid);

	                        } else if (evt.target.classList.contains('ratingRow')) {

	                            var card = parent.parentNode.parentNode.parentNode;
	                            qid = card.querySelector('.question').getAttribute('data-qid');
	                            var child = evt.target.getAttribute('data-child');
	                            that.fillStars(evt.target);
	                            that.toggleNavigateLink(parent, "rating", qid);

	                        } else if (parent.classList.contains('imgOption')) {

	                            qid = parent.parentNode.parentNode.parentNode.querySelector('.question').getAttribute('data-qid');
	                            var child = parent.getAttribute('data-child');
	                            var imgRow = parent.querySelector('.imgRow');

	                            if (imgRow.classList.contains('positiveHollow')) {
	                                imgRow.classList.add("opacity03");


	                                setTimeout(function() {
	                                    imgRow.classList.add("opacity05");
	                                    imgRow.classList.remove("opacity03");
	                                    imgRow.classList.add("positiveFilled");
	                                    imgRow.classList.remove('positiveHollow');

	                                }, 100)

	                                setTimeout(function() {
	                                    imgRow.classList.remove("opacity05");
	                                    imgRow.classList.add("filledEmo");
	                                    that.toggleNavigateLink(parent, "imageOption1", qid);

	                                }, 200)



	                                that.unselectImgOptions(parent);

	                            } else if (imgRow.classList.contains('negativeHollow')) {
	                                imgRow.classList.add("opacity03");

	                                setTimeout(function() {
	                                    imgRow.classList.add("opacity05");
	                                    imgRow.classList.remove("opacity03");
	                                    imgRow.classList.add("negativeFilled");
	                                    imgRow.classList.remove('negativeHollow');

	                                }, 100)

	                                setTimeout(function() {
	                                    imgRow.classList.remove("opacity05");
	                                    imgRow.classList.add("filledEmo");
	                                    that.toggleNavigateLink(parent, "imageOption1", qid);

	                                }, 200)



	                                that.unselectImgOptions(parent);


	                            } else if (imgRow.classList.contains('neutralHollow')) {
	                                imgRow.classList.add("opacity03");

	                                setTimeout(function() {
	                                    imgRow.classList.add("opacity05");
	                                    imgRow.classList.remove("opacity03");
	                                    imgRow.classList.add("neutralFilled");
	                                    imgRow.classList.remove('neutralHollow');

	                                }, 100)

	                                setTimeout(function() {
	                                    imgRow.classList.remove("opacity05");
	                                    imgRow.classList.add("filledEmo");
	                                    that.toggleNavigateLink(parent, "imageOption1", qid);

	                                }, 200)


	                                that.unselectImgOptions(parent);

	                            }


	                        }



	                    }, true);


	                    cache.nextLink.addEventListener('click', function() {

	                        if (cache.nextLinkClicked)
	                            return;

	                        cache.nextLinkClicked = true;
	                        var elems = cache.questionsCard.querySelectorAll('.card')
	                        var curr, currentQuesId = parseInt(data.currentQuesId),
	                            ques, foundFlag = 0,
	                            currCard, isSkip, childElem;

	                        //Getting the current card displayed on screen    
	                        for (var i = 0; i < elems.length; i++) {
	                            if (!elems[i].parentNode.classList.contains('hide'))
	                                currCard = elems[i];
	                        }

	                        //Check whether user has given any answer for the queston. If no , set skip attribute to 'true'
	                        if (!currCard.querySelectorAll('.filledEmo,.filledCirc,.filledRec').length &&
	                            !currCard.querySelectorAll('.filledStar').length &&
	                            (!currCard.querySelectorAll('.textInput').length || !currCard.querySelector('.textInput').value.trim().length)

	                        ) {
	                            this.setAttribute('data-skip', 'true');
	                            isSkip = 'true';
	                        } else {
	                            this.setAttribute('data-skip', 'false');
	                            isSkip = 'false';
	                        }

	                        /*
	                                Resetting the child so that when user clicks next, he should be navigated to the correct branch
	                                (This is the case where user has come to the question after clicking previous)         
	                        */
	                        if (isSkip == 'false' && data.surveyType == "branch") {

	                            if (currCard.querySelectorAll('.filledEmo,.filledCirc').length > 0) {
	                                this.setAttribute('data-child', currCard.querySelector('.filledEmo,.filledCirc').parentNode.getAttribute('data-child'));
	                                childElem = this.getAttribute('data-child');
	                            } else if (currCard.querySelectorAll('.filledStar').length) {
	                                var totStar = currCard.querySelectorAll('.filledStar').length - 1;
	                                this.setAttribute('data-child', currCard.querySelectorAll('.filledStar')[totStar].getAttribute('data-child'));
	                                childElem = this.getAttribute('data-child');
	                            }


	                        }

	                        //Log the response 
	                        that.collectLogForCurrent(data.questions[data.currentQuesId], data.currentQuesId, isSkip, false);


	                        // If survey type is branch and user skips the question , next question is specified in "SkipTo"
	                        if (data.surveyType == "branch" && isSkip == "true") {
	                            if (typeof data.questions[data.currentQuesId].skipTo != "undefined" || data.questions[data.currentQuesId].skipTo == null)
	                                dataLocal.nextQuesId = data.questions[data.currentQuesId].skipTo;
	                            else
	                                dataLocal.nextQuesId = null;

	                        }
	                        // If survey type is branch and there is no branch further , then end the survey
	                        else if (data.surveyType == "branch" && (childElem == "undefined" || typeof childElem == 'undefined' || childElem == null)) {
	                            App.router.navigateTo('/surveyDone');
	                        }

	                        // If user does not skip the question , rather answers the question
	                        else {
	                            if (data.surveyType == "branch")
	                                dataLocal.nextQuesId = this.getAttribute('data-child');
	                            else if (data.surveyType == "sequential") {
	                                if ((Object.keys(data.questions).length) == data.currentQuesNum)
	                                    dataLocal.nextQuesId = null;
	                                else
	                                    dataLocal.nextQuesId = parseInt(data.currentQuesId) + 1;
	                            }
	                        }

	                        dataLocal.nextQuesNum = parseInt(data.currentQuesNum) + 1;

	                        //Updating the helper data with next question id and number
	                        if (platformSdk.bridgeEnabled) {
	                            platformSdk.appData.helperData.currentQuesId = dataLocal.nextQuesId;
	                            platformSdk.appData.helperData.currentQuesNum = dataLocal.nextQuesNum;
	                            platformSdk.updateHelperData(platformSdk.appData.helperData);

	                        } else {
	                            data.currentQuesId = dataLocal.nextQuesId;
	                            data.currentQuesNum = dataLocal.nextQuesNum;
	                        }

	                        /*
	                            Case :  Next question id exists
	                                 -> Checking if the HTML template exists for the next question. If it does ,then hide other questions and show that question.
	                                    if the HTML template does not exist , then creating and rendering the Question template. 
	                                    

	                            Case : Next question id does not exists
	                                 ->  End the Survey
	                        */
	                        if (dataLocal.nextQuesId) {

	                            for (var i = 0; i < elems.length; i++) {

	                                ques = elems[i].querySelector('.question');
	                                if (!elems[i].parentNode.classList.contains('hide')) {
	                                    elems[i].parentNode.classList.add("animation_fadeout");
	                                    elems[i].parentNode.classList.add("hide");
	                                }

	                                if (parseInt(ques.getAttribute('data-qid')) == dataLocal.nextQuesId) {
	                                    elems[i].parentNode.classList.remove("animation_fadeout");
	                                    elems[i].parentNode.classList.remove("hide");
	                                    elems[i].querySelector('.question').setAttribute('data-parent', currentQuesId);
	                                    that.adjustTextHeight(elems[i]);
	                                    foundFlag = 1;
	                                }
	                            }
	                            if (!foundFlag) {
	                                if (!cache.prevLinkClicked) {

	                                    if (platformSdk.bridgeEnabled) {
	                                        if (platformSdk.appData.helperData.quespath[platformSdk.appData.helperData.quespath.length - 1] != parseInt(currentQuesId))
	                                            platformSdk.appData.helperData.quespath.push(parseInt(currentQuesId));
	                                        that.saveUserState(currentQuesId, isSkip);
	                                        platformSdk.updateHelperData(platformSdk.appData.helperData);

	                                    } else {
	                                        if (data.quespath[data.quespath.length - 1] != parseInt(currentQuesId))
	                                            data.quespath.push(parseInt(currentQuesId));
	                                        that.saveUserState(currentQuesId, isSkip);
	                                        console.log(data.quespath);
	                                        console.log(data.userResponse);
	                                    }
	                                }
	                                that.renderQuestion(dataLocal.nextQuesId, currentQuesId, false);

	                            } else {
	                                setTimeout(function() {
	                                    cache.nextLinkClicked = false;
	                                }, 500);

	                                if (dataLocal.nextQuesId > 0)
	                                    cache.prevLink.classList.add('animation_scale_1');
	                                else
	                                    cache.prevLink.classList.remove('animation_scale_1');


	                                if (!cache.prevLinkClicked) {

	                                    if (platformSdk.bridgeEnabled) {
	                                        if (platformSdk.appData.helperData.quespath[platformSdk.appData.helperData.quespath.length - 1] != parseInt(currentQuesId))
	                                            platformSdk.appData.helperData.quespath.push(parseInt(currentQuesId));

	                                        if (platformSdk.appData.helperData.quespath[platformSdk.appData.helperData.quespath.length - 1] != parseInt(dataLocal.nextQuesId))
	                                            platformSdk.appData.helperData.quespath.push(parseInt(dataLocal.nextQuesId));

	                                        that.saveUserState(currentQuesId, isSkip);
	                                        platformSdk.updateHelperData(platformSdk.appData.helperData);

	                                    } else {
	                                        if (data.quespath[data.quespath.length - 1] != parseInt(currentQuesId))
	                                            data.quespath.push(parseInt(currentQuesId));
	                                        else if (data.quespath[data.quespath.length - 1] != parseInt(dataLocal.nextQuesId))
	                                            data.quespath.push(parseInt(dataLocal.nextQuesId));
	                                        that.saveUserState(currentQuesId, isSkip);
	                                        console.log(data.quespath);
	                                        console.log(data.userResponse);
	                                    }
	                                }
	                            }
	                            if (data.surveyType == "sequential")
	                                that.updateBar(dataLocal.nextQuesNum);

	                        } else
	                            App.router.navigateTo('/surveyDone');



	                    });


	                    cache.prevLink.addEventListener('click', function() {
	                        that.prevLinkFunctionality();
	                    });


	                    document.querySelector('body').addEventListener('keyup', function(evt) {

	                        var parent = evt.target.parentNode;
	                        var elem = evt.target;
	                        var limitChar = elem.getAttribute('data-limit');

	                        if (parent.classList.contains('textRow')) {

	                            var qid = parent.parentNode.parentNode.querySelector('.question').getAttribute('data-qid');
	                            var card = parent.parentNode.parentNode;
	                            that.toggleNavigateLink(parent.parentNode, "text", qid);
	                            if (elem.value.length > parseInt(limitChar)) {
	                                elem.value = elem.value.substr(0, limitChar);
	                                elem.focus();
	                                var v = elem.value;
	                                elem.value = '';
	                                elem.value = v;
	                                card.querySelector('.textInput').scrollTop = card.querySelector('.textInput').scrollHeight;
	                            } else {
	                                var outerHeight = parseInt(window.getComputedStyle(elem).height, 10);
	                                var diff = outerHeight - elem.clientHeight;
	                                var txtContainer = parent.parentNode.parentNode;
	                                var offset;
	                                elem.style.height = 0;
	                                var code = (evt.keyCode ? evt.keyCode : evt.which);
	                                if (code == 13)
	                                    offset = cache.initialH - 14;
	                                else
	                                    offset = 0;

	                                elem.style.height = Math.max(cache.initialH, elem.scrollHeight + diff) + offset + 'px';
	                                txtContainer.scrollTop = parseInt(elem.style.height);

	                            }






	                        }

	                    }, true);

	                    document.querySelector('body').addEventListener('keypress', function(evt) {

	                        var parent = evt.target.parentNode;
	                        var elem = evt.target;
	                        var limitChar = elem.getAttribute('data-limit');

	                        if (parent.classList.contains('textRow')) {

	                            var qid = parent.parentNode.parentNode.querySelector('.question').getAttribute('data-qid');
	                            var card = parent.parentNode.parentNode;
	                            that.toggleNavigateLink(parent.parentNode, "text", qid);

	                            if (elem.value.length == parseInt(limitChar)) {
	                                evt.preventDefault();
	                            } else if (elem.value.length > parseInt(limitChar)) {
	                                elem.value = elem.value.substr(0, limitChar);
	                            } else {

	                                var outerHeight = parseInt(window.getComputedStyle(elem).height, 10);
	                                var diff = outerHeight - elem.clientHeight;
	                                var txtContainer = parent.parentNode.parentNode;
	                                var offset;
	                                elem.style.height = 0;
	                                var code = (evt.keyCode ? evt.keyCode : evt.which);
	                                if (code == 13)
	                                    offset = cache.initialH - 14;
	                                else
	                                    offset = 0;

	                                elem.style.height = Math.max(cache.initialH, elem.scrollHeight + diff) + offset + 'px';
	                                txtContainer.scrollTop = parseInt(elem.style.height);


	                            }

	                        }

	                    }, true);


	                    /* document.querySelector('body').addEventListener('keydown', function(evt) {

	                         var parent = evt.target.parentNode;
	                         var elem = evt.target;
	                         var txtContainer = parent.parentNode.parentNode;
	                         var limitChar = elem.getAttribute('data-limit');
	                         var offset;
	                         if (parent.classList.contains('textRow')) {
	                             var outerHeight = parseInt(window.getComputedStyle(elem).height, 10);
	                             var diff = outerHeight - elem.clientHeight;
	                             elem.style.height = 0;
	                             var code = (evt.keyCode ? evt.keyCode : evt.which);
	                             if (code == 13)
	                                 offset = cache.initialH - 14;
	                             else
	                                 offset = 0;

	                             elem.style.height = Math.max(cache.initialH, elem.scrollHeight + diff) + offset + 'px';
	                             txtContainer.scrollTop = parseInt(elem.style.height);


	                         }

	                     }, true);*/

	                },


	                prevLinkFunctionality: function() {

	                    var that = this;

	                    if (cache.prevLinkClicked)
	                        return;

	                    cache.prevLinkClicked = true;
	                    var elems = cache.questionsCard.querySelectorAll('.card'),
	                        curr, ques, foundFlag = 0,
	                        popElem, currentQuesId = parseInt(data.currentQuesId);


	                    if (platformSdk.bridgeEnabled) {
	                        var popElem = platformSdk.appData.helperData.quespath.pop();
	                        platformSdk.updateHelperData(platformSdk.appData.helperData);

	                    } else {
	                        var popElem = data.quespath.pop();
	                        console.log(data.quespath);
	                        console.log(data.userResponse);
	                    }


	                    // If survey type is sequential , then take user back to the previous question
	                    if (data.surveyType == "sequential") {
	                        dataLocal.nextQuesId = parseInt(data.currentQuesId) - 1;
	                        dataLocal.nextQuesNum = parseInt(data.currentQuesNum) - 1;


	                    } else {


	                        //   If survey type is branch , then take user back to the parent question
	                        for (var i = 0; i < elems.length; i++) {

	                            if (!elems[i].parentNode.classList.contains('hide'))
	                                dataLocal.nextQuesId = parseInt(elems[i].querySelector('.question').getAttribute('data-parent'));
	                        }

	                        if (dataLocal.nextQuesId == -1 && dataLocal.currentQuesNum != 1) {
	                            if (platformSdk.bridgeEnabled) {
	                                dataLocal.nextQuesId = platformSdk.appData.helperData.quespath[platformSdk.appData.helperData.quespath.length - 1]
	                                platformSdk.appData.helperData.quespath.pop();
	                                platformSdk.updateHelperData(platformSdk.appData.helperData);

	                            } else {
	                                dataLocal.nextQuesId = data.quespath[data.quespath.length - 1]
	                                data.quespath.pop();

	                            }


	                        }
	                        dataLocal.nextQuesNum = parseInt(data.currentQuesNum) - 1;
	                    }

	                    that.collectLogForCurrent(data.questions[data.currentQuesId], data.currentQuesId, "false", true);

	                    // Update helper data with the new question id and number

	                    if (platformSdk.bridgeEnabled) {
	                        platformSdk.appData.helperData.currentQuesId = dataLocal.nextQuesId;
	                        platformSdk.appData.helperData.currentQuesNum = dataLocal.nextQuesNum;
	                        platformSdk.updateHelperData(platformSdk.appData.helperData);

	                    } else {
	                        data.currentQuesId = dataLocal.nextQuesId;
	                        data.currentQuesNum = dataLocal.nextQuesNum;
	                    }

	                    /*
	                        Case :  Next question id is not null
	                             -> SHow the HTML template for the question and hide other questions. 
	                                

	                        Case : Next question id is null 
	                             ->  End the Survey
	                    */

	                    if (dataLocal.nextQuesId == parseInt(dataLocal.nextQuesId, 10)) {

	                        if (dataLocal.nextQuesId > 0)
	                            cache.prevLink.classList.add('animation_scale_1');
	                        else
	                            cache.prevLink.classList.remove('animation_scale_1');



	                        for (var i = 0; i < elems.length; i++) {

	                            ques = elems[i].querySelector('.question');
	                            if (!elems[i].parentNode.classList.contains('hide')) {
	                                elems[i].parentNode.classList.add("animation_fadeout");
	                                elems[i].parentNode.classList.add("hide");
	                            }

	                            if (parseInt(ques.getAttribute('data-qid')) == dataLocal.nextQuesId) {
	                                elems[i].parentNode.classList.remove("animation_fadeout");
	                                elems[i].parentNode.classList.remove("hide");
	                                that.adjustTextHeight(elems[i]);
	                                foundFlag = 1;
	                            }
	                        }

	                        if (!foundFlag) {

	                            that.renderQuestion(dataLocal.nextQuesId, -1, true);
	                        } else {
	                            setTimeout(function() {
	                                cache.prevLinkClicked = false;
	                            }, 500);

	                        }





	                        if (data.surveyType == "sequential")
	                            that.updateBar(dataLocal.nextQuesNum);

	                    } else
	                        App.router.navigateTo('/surveyDone');





	                },


	                getSiblings: function(container) {

	                    var result = [],
	                        node = container;

	                    while (node && node.nodeType === 1) {
	                        if (container != node)
	                            result.push(node);
	                        node = node.nextElementSibling || node.nextSibling;
	                    }

	                    node = container;

	                    while (node && node.nodeType === 1) {
	                        if (container != node)
	                            result.push(node);
	                        node = node.previousElementSibling || node.previousSibling;
	                    }

	                    return result;
	                },


	                unselectRadioSublings: function(container) {

	                    var result = this.getSiblings(container);
	                    for (var k = 0; k < result.length; k++) {
	                        result[k].querySelector('.radioCirc').classList.add('emptyCirc');
	                        result[k].querySelector('.radioCirc').classList.remove('filledCirc');
	                        result[k].querySelector('.optionTxt').classList.remove('selectedTextColor');
	                    }
	                },


	                unselectImgOptions: function(container) {

	                    var result = this.getSiblings(container);
	                    var imgRow, emoType;



	                    for (var k = 0; k < result.length; k++) {
	                        imgRow = result[k].querySelector('.imgRow');
	                        emoType = imgRow.getAttribute('data-emotionType');

	                        if (emoType == "positive") {
	                            imgRow.classList.remove("positiveFilled");
	                            imgRow.classList.remove("filledEmo");
	                            imgRow.classList.add("positiveHollow");

	                        } else if (emoType == "negative") {
	                            imgRow.classList.remove("negativeFilled");
	                            imgRow.classList.remove("filledEmo");
	                            imgRow.classList.add("negativeHollow");

	                        } else if (emoType == "neutral") {
	                            imgRow.classList.remove("neutralFilled");
	                            imgRow.classList.remove("filledEmo");
	                            imgRow.classList.add("neutralHollow");
	                        }
	                    }


	                },

	                fillStars: function(container) {

	                    var result = [],
	                        node = container;

	                    while (node && node.nodeType === 1) {

	                        node = node.nextElementSibling || node.nextSibling;

	                        if (node.nodeType === 1) {
	                            node.classList.remove('filledStar')
	                            node.classList.add('emptyStar');
	                        }
	                    }

	                    node = container;

	                    while (node && node.nodeType === 1) {
	                        if (node.nodeType === 1) {
	                            node.classList.add('filledStar')
	                            node.classList.remove('emptyStar');
	                        }
	                        node = node.previousElementSibling || node.previousSibling;
	                    }

	                },


	                toggleNavigateLink: function(container, type, qid) {

	                    if (type == 'checkbox') {
	                        if (container.querySelector('.filledRec'))
	                            this.saveUserState(qid, "false");
	                        else
	                            this.saveUserState(qid, "true");
	                    } else if (type == 'radio') {
	                        if (container.querySelector('.filledCirc'))
	                            this.saveUserState(qid, "false");
	                        else
	                            this.saveUserState(qid, "true");
	                    } else if (type == 'radioVersus') {
	                        if (container.querySelector('.filledCirc'))
	                            this.saveUserState(qid, "false");
	                        else
	                            this.saveUserState(qid, "true");
	                    } else if (type == 'radioSinglePic') {
	                        if (container.querySelector('.filledCirc'))
	                            this.saveUserState(qid, "false");
	                        else
	                            this.saveUserState(qid, "true");
	                    } else if (type == 'text') {
	                        if (container.querySelector('.textInput').value.trim().length > 0)
	                            this.saveUserState(qid, "false");
	                        else
	                            this.saveUserState(qid, "true");
	                    } else if (type == 'rating') {
	                        if (container.querySelector('.filledStar'))
	                            this.saveUserState(qid, "false");
	                        else
	                            this.saveUserState(qid, "true");
	                    } else if (type == 'imageOption1') {
	                        if (container.querySelector('.filledEmo'))
	                            this.saveUserState(qid, "false");
	                        else
	                            this.saveUserState(qid, "true");
	                    }



	                },

	                getTemplate: function(type) {
	                    if (type == 'checkbox')
	                        return that.checkFormatTemplate;
	                    else if (type == 'radio')
	                        return that.radioFormatTemplate;
	                    else if (type == 'radioVersus')
	                        return that.radioVersusFormatTemplate;
	                    else if (type == 'radioSinglePic')
	                        return that.radioSinglePicFormatTemplate;
	                    else if (type == 'text')
	                        return that.textFormatTemplate;
	                    else if (type == 'rating')
	                        return that.ratingFormatTemplate;
	                    else if (type == 'imageOption1')
	                        return that.imgOptions1FormatTemplate;
	                },

	                renderQuestion: function(questionId, parentId, restoreAnswer) {
	                    //Hide the previous card
	                    var that = this;
	                    var logDataToSend = {};
	                    var elems = cache.questionsCard.querySelectorAll('.card');
	                    var curr;


	                    //Getting the current card displayed on screen    
	                    for (var i = 0; i < elems.length; i++) {
	                        if (!elems[i].parentNode.classList.contains('hide'))
	                            curr = elems[i];
	                    }

	                    if (questionId > 0)
	                        cache.prevLink.classList.add('animation_scale_1');
	                    else
	                        cache.prevLink.classList.remove('animation_scale_1');

	                    if (curr) {
	                        curr.parentNode.classList.add("animation_fadeout");
	                        curr.parentNode.classList.add("hide");
	                    }



	                    if (data.questions[questionId]) {
	                        dataLocal.ques = data.questions[questionId];
	                        dataLocal.div = document.createElement('div');
	                        if (parentId != null)
	                            dataLocal.ques.parentId = parentId;


	                        if (platformSdk.bridgeEnabled) {

	                            if (platformSdk.appData.helperData.quespath[platformSdk.appData.helperData.quespath.length - 1] != questionId)
	                                platformSdk.appData.helperData.quespath.push(parseInt(questionId));

	                            platformSdk.updateHelperData(platformSdk.appData.helperData);

	                        } else {

	                            if (data.quespath[data.quespath.length - 1] != questionId)
	                                data.quespath.push(parseInt(questionId));
	                            console.log(data.quespath);
	                        }




	                        dataLocal.div.innerHTML = Mustache.render(unescape(this.getTemplate(dataLocal.ques.type)), dataLocal.ques);
	                        cache.questionsCard.appendChild(dataLocal.div);

	                        var totCards = cache.questionsCard.querySelectorAll('.card');
	                        var curr_card = totCards[totCards.length - 1];









	                        if (platformSdk.bridgeEnabled) {

	                            if (typeof platformSdk.appData.helperData.userResponse[dataLocal.ques.qid] != "undefined") {
	                                that.setAnswers(dataLocal.ques.qid, platformSdk.appData.helperData.userResponse);
	                            }
	                        } else {
	                            if (typeof data.userResponse[dataLocal.ques.qid] != "undefined")
	                                that.setAnswers(dataLocal.ques.qid, data.userResponse);
	                        }

	                        that.adjustTextHeight(curr_card);


	                        setTimeout(function() {
	                            cache.nextLinkClicked = false;
	                            cache.prevLinkClicked = false;
	                        }, 500);


	                        logDataToSend.uk = "scrn1_load";
	                        logDataToSend.c = "scrn_load";
	                        logDataToSend.o = "scrn" + data.currentQuesNum;
	                        logDataToSend.g = that.getFormatType(dataLocal.ques.type);
	                        logDataToSend.s = that.getImageType(dataLocal.ques.type);
	                        logDataToSend.v = dataLocal.ques.questionText;
	                        logDataToSend.f = that.getAnswerOptions(dataLocal.ques);
	                        if (dataLocal.ques.type == "rating")
	                            logDataToSend.b = dataLocal.ques.stars.length;
	                        App.surveyServices.logData(logDataToSend);

	                        this.loadImages();

	                    } else
	                        App.router.navigateTo('/surveyDone');


	                },

	                setAnswers: function(questionId, userResponse) {




	                    var elems = cache.questionsCard.querySelectorAll('.card');
	                    var card = elems[elems.length - 1];


	                    if (typeof userResponse[questionId] === "undefined")
	                        return;


	                    var type = userResponse[questionId].type;
	                    var response = userResponse[questionId].response;

	                    if (this.isEmpty(response)) {
	                        console.log("Question was skipped earlier. So resetting all options");
	                        return;
	                    }



	                    if (type == "radioVersus" || type == "radioSinglePic" || type == "radio") {

	                        response = response.split(',');



	                        for (var i = 0; i < response.length; i++) {

	                            if (response[i] == "1") {
	                                card.querySelectorAll('.radioCirc')[i].classList.remove('emptyCirc');
	                                card.querySelectorAll('.radioCirc')[i].classList.add('filledCirc');
	                                card.querySelectorAll('.radioCirc')[i].nextElementSibling.classList.add('selectedTextColor');
	                            }

	                        }


	                    } else if (type == "checkbox") {
	                        response = response.split(',');

	                        for (var i = 0; i < response.length; i++) {

	                            if (response[i] == "1") {
	                                card.querySelectorAll('.checkRec')[i].classList.add('emptyRec');
	                                card.querySelectorAll('.checkRec')[i].classList.add('filledRec');
	                                card.querySelectorAll('.checkRec')[i].nextElementSibling.classList.add('selectedTextColor');
	                            }
	                        }

	                    } else if (type == "rating") {

	                        var stars = card.querySelectorAll('.ratingRow');
	                        response = parseInt(response);

	                        for (var i = 0; i < response; i++) {
	                            stars[i].classList.remove('emptyStar');
	                            stars[i].classList.add('filledStar');
	                        }

	                    } else if (type == "text") {

	                        var elem = card.querySelector('.textInput');
	                        response = response.replace(/<br\/>/g, '\n');
	                        elem.value = response;


	                        var outerHeight = parseInt(window.getComputedStyle(elem).height, 10);
	                        var diff = outerHeight - elem.clientHeight;
	                        elem.style.height = 0;

	                        elem.style.height = Math.max(cache.initialH, elem.scrollHeight + diff) + 'px';
	                        card.scrollTop = parseInt(elem.style.height);



	                    } else if (type == "imageOption1") {

	                        response = response.split(',');
	                        var imgRows = card.querySelectorAll('.imgRow');

	                        for (var i = 0; i < imgRows.length; i++) {

	                            if (response[i] == "1") {
	                                imgRows[i].classList.add(imgRows[i].getAttribute('data-emotionType') + 'Filled');
	                                imgRows[i].classList.add('filledEmo');
	                            } else
	                                imgRows[i].classList.add(imgRows[i].getAttribute('data-emotionType') + 'Hollow');

	                        }
	                    }
	                },


	                saveUserState: function(questionId, skipVal) {

	                    console.log('save user');

	                    if (platformSdk.bridgeEnabled) {



	                        if (typeof platformSdk.appData.helperData.userResponse[questionId] == "undefined")
	                            platformSdk.appData.helperData.userResponse[questionId] = {};



	                        if (skipVal == "true") {
	                            platformSdk.appData.helperData.userResponse[questionId].type = data.questions[questionId].type;
	                            platformSdk.appData.helperData.userResponse[questionId].response = {};
	                        } else {
	                            platformSdk.appData.helperData.userResponse[questionId].type = data.questions[questionId].type;

	                            var answer = this.getuserAnswers(data.currentQuesNum, data.questions[questionId].type, questionId);

	                            if (data.questions[questionId].type == "text")
	                                answer = answer.replace(/\n/g, '<br/>');

	                            platformSdk.appData.helperData.userResponse[questionId].response = answer;

	                        }

	                        platformSdk.updateHelperData(platformSdk.appData.helperData);
	                    } else {

	                        if (typeof data.userResponse[questionId] == "undefined")
	                            data.userResponse[questionId] = {};

	                        if (skipVal == "true") {
	                            data.userResponse[questionId].type = data.questions[questionId].type;
	                            data.userResponse[questionId].response = {}
	                        } else {
	                            data.userResponse[questionId].type = data.questions[questionId].type;
	                            data.userResponse[questionId].response = this.getuserAnswers(data.currentQuesNum, data.questions[questionId].type, questionId);
	                        }

	                        console.log("User response");
	                        console.log(data.userResponse);

	                    }
	                },

	                updateBar: function(questionNum) {
	                    cache.currentQuesNum.innerHTML = questionNum;
	                    cache.questionBar.style.width = (100 / (Object.keys(data.questions).length)) * (questionNum) + '%';
	                },

	                getBgUrl: function(el) {
	                    var bg = "";
	                    if (el.currentStyle) { // IE
	                        bg = el.currentStyle.backgroundImage;
	                    } else if (document.defaultView && document.defaultView.getComputedStyle) { // Firefox
	                        bg = document.defaultView.getComputedStyle(el, "").backgroundImage;
	                    } else { // try and get inline style
	                        bg = el.style.backgroundImage;
	                    }
	                    return bg.replace(/url\(['"]?(.*?)['"]?\)/i, "$1");
	                },

	                getImageType: function(type) {

	                    if (type == "radioVersus")
	                        return "double";
	                    else if (type == "radioSinglePic")
	                        return "single";
	                    else
	                        return "none";
	                },

	                getFormatType: function(type) {


	                    if (type == "radioVersus" || type == "radioSinglePic" || type == "radio")
	                        return "radio_btn";
	                    else if (type == "checkbox")
	                        return "chk_box";
	                    else if (type == "rating" || type == "text")
	                        return type;
	                    else if (type == "imageOption1")
	                        return "emoticons";

	                },

	                isEmpty: function(obj) {
	                    for (var prop in obj) {
	                        if (obj.hasOwnProperty(prop))
	                            return false;
	                    }

	                    return true && JSON.stringify(obj) === JSON.stringify({});
	                },

	                getAnswerOptions: function(ques) {

	                    var result = [];
	                    var type = ques.type;

	                    if (type == "radioVersus" || type == "radioSinglePic" || type == "radio" ||
	                        type == "checkbox" || type == "imageOption1") {
	                        for (var i = 0; i < ques.options.length; i++)
	                            result.push(ques.options[i].text);
	                    } else if (type == "rating") {
	                        result.push("rate");

	                    } else if (type == "text") {
	                        result.push(ques.defaultMessage);

	                    }

	                    result = result.join();
	                    return result;


	                },

	                collectLogForCurrent: function(ques, questionId, skipVal, prevLink) {


	                    var logDataToSend = {};

	                    if (prevLink) {

	                        logDataToSend.uk = "scr_bk";
	                        logDataToSend.c = "back";
	                        logDataToSend.ra = this.getuserAnswers(data.currentQuesNum, ques.type, questionId);


	                    } else {

	                        if (skipVal == "true") {
	                            logDataToSend.c = "skip";
	                        } else {
	                            logDataToSend.c = "next";
	                            logDataToSend.ra = this.getuserAnswers(data.currentQuesNum, ques.type, questionId);
	                        }

	                        logDataToSend.uk = "scrn1_sbmt";
	                    }




	                    logDataToSend.f = this.getAnswerOptions(ques);
	                    logDataToSend.g = this.getFormatType(ques.type);
	                    logDataToSend.s = this.getImageType(ques.type);
	                    logDataToSend.v = ques.questionText;
	                    logDataToSend.o = "scrn" + data.currentQuesNum;

	                    if (ques.type == "rating")
	                        logDataToSend.b = ques.stars.length;

	                    App.surveyServices.logData(logDataToSend);

	                },

	                getuserAnswers: function(currenQues, type, questionId) {


	                    var elems = cache.questionsCard.querySelectorAll('.card');
	                    var card, ques;

	                    for (var i = 0; i < elems.length; i++) {

	                        ques = elems[i].querySelector('.question');

	                        if (parseInt(ques.getAttribute('data-qid')) == questionId) {
	                            card = elems[i];
	                        }
	                    }


	                    var answerRows = card.querySelectorAll('.answer > div');
	                    var result = [];


	                    if (type == "radioVersus" || type == "radioSinglePic" || type == "radio" ||
	                        type == "checkbox" || type == "imageOption1") {

	                        for (var i = 0; i < answerRows.length; i++) {

	                            if (answerRows[i].querySelectorAll('.filledEmo,.filledCirc,.filledRec').length > 0)
	                                result.push(1)
	                            else
	                                result.push(0);
	                        }

	                    } else if (type == "rating") {
	                        result.push(card.querySelectorAll('.filledStar').length)

	                    } else if (type == "text") {
	                        result.push(card.querySelector('textarea').value);

	                    }

	                    result = result.join();
	                    return result;



	                },

	                adjustWindow: function(val) {

	                    var elems = cache.questionsCard.querySelectorAll('.card');
	                    var card;
	                    var interValId;
	                    var that = this;


	                    for (var i = 0; i < elems.length; i++) {
	                        if (!elems[i].parentNode.classList.contains('hide'))
	                            card = elems[i];
	                    }

	                    if (window.innerHeight == cache.lastHeight) {



	                        console.log('height restored');
	                        card.style.height = cache.intialCardH + 'px';


	                        card.querySelector('.answer').classList.remove('centerVertical');
	                        card.querySelector('.textInput').classList.remove('maxHeight80');
	                        cache.nextLink.classList.remove('hide');
	                        cache.prevLink.classList.remove('hide');
	                        that.adjustTextHeight(card);

	                    } else {

	                        console.log('height changed');
	                        var newHeight = parseInt(window.getComputedStyle(cache.quesContainer).height) - (parseInt(window.getComputedStyle(card).paddingTop) * 2) - 32;
	                        var textInput = card.querySelector('.textInput');
	                        card.style.height = newHeight + 'px';
	                        card.querySelector('.textRow').style.marginTop = "0px";
	                        card.querySelector('.textRow').style.marginBottom = "0px";
	                        card.querySelector('.question').style.paddingBottom = "0px";
	                        card.querySelector('.answer').classList.add('centerVertical');
	                        textInput.classList.add('maxHeight80');
	                        cache.nextLink.classList.add('hide');
	                        cache.prevLink.classList.add('hide');
	                        card.scrollTop = parseInt(textInput.style.height);
	                        textInput.focus();
	                        var v = textInput.value;
	                        textInput.value = '';
	                        textInput.value = v;
	                        textInput.scrollTop = textInput.scrollHeight;

	                    }
	                }


	            };

	            return api;

	        })();

	        QuestionsScope.init();
	    };

	    QuestionController.prototype.render = function(ctr, App, data) {

	        var that = this;
	        if (platformSdk.bridgeEnabled)
	            data = platformSdk.appData.helperData;

	        if (data) {
	            var per = (100 / (Object.keys(data.questions).length)) * (data.currentQuesNum);
	            var isSequential = (data.surveyType == 'branch' ? false : true);
	        }

	        that.el = document.createElement('div');
	        that.el.className = 'questionContainer animation_fadein noselect';
	        that.el.innerHTML = Mustache.render(unescape(that.template), { total: Object.keys(data.questions).length, current: data.currentQuesNum, per: per, isSequential: isSequential });
	        ctr.appendChild(that.el);
	        events.publish('update.loader', { show: false });
	        that.bind(App, data);
	    };

	    QuestionController.prototype.destroy = function() {

	    };

	    module.exports = QuestionController;


	})(window, platformSdk, platformSdk.events);

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = "<div class=\"questionsCard\">\n    <div class=\"nextLink backgroundImageGeneric\" data-skip=\"true\"> </div>\n    <div class=\"prevLink backgroundImageGeneric\"> </div>\n</div>\n{{#isSequential}}\n<div class=\"progressFigure\">\n    <div class=\"questionProgress\">\n        <div class=\"questionBar\" style=\"width:{{per}}%;\"></div>\n    </div>\n</div>\n<div class=\"progressText\">\n    <span id=\"currentQuesNum\"> {{current}} </span> of <span> {{total}} </span>\n</div>\n{{/isSequential}}"

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = "<div class=\"checkFormatContainer card\">\n    <div class=\"question\" data-parent=\"{{parentId}}\" data-qid= \"{{qid}}\">\n        {{questionText}}\n    </div>\n    <div class=\"answer\">\n        {{#options}}\n        <div class=\"checkRow\" data-child=\"{{#child}}{{child}}{{/child}}\">\n            <span class=\"emptyRec checkRec backgroundImageGeneric\"> </span> <span class=\"optionTxt\"> {{text}} </span>\n        </div>\n        {{/options}}\n    </div>\n</div>"

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = "<div class=\"radioFormatContainer card\">\n    <div class=\"question\" data-parent=\"{{parentId}}\" data-qid=\"{{qid}}\">\n        {{questionText}}\n    </div>\n    <div class=\"answer\">\n        {{#options}}\n        <div class=\"radioRow\" data-child=\"{{#child}}{{child}}{{/child}}\">\n            <span class=\"emptyCirc radioCirc backgroundImageGeneric\"> </span> <span class=\"optionTxt\"> {{text}} </span>\n        </div>\n        {{/options}}\n    </div>\n</div>"

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = "<div class=\"radioFormatContainer card\">\n    <div class=\"radioVersusContainer\">\n        <div class=\"leftPic floatL backgroundImageGeneric topImg\" data-url=\"{{leftImgURL}}\"> </div>\n        <div class=\"rightPic floatR backgroundImageGeneric topImg\" data-url=\"{{rightImgURL}}\"> </div>\n        <div class=\"versusTag\"> vs </div>\n    </div>\n    <div class=\"question padB28\" data-parent=\"{{parentId}}\" data-qid=\"{{qid}}\">\n        {{questionText}}\n    </div>\n    <div class=\"answer\">\n        {{#options}}\n        <div class=\"radioRow\" data-child=\"{{#child}}{{child}}{{/child}}\">\n            <span class=\"emptyCirc radioCirc backgroundImageGeneric\"> </span> <span class=\"optionTxt\"> {{text}} </span>\n        </div>\n        {{/options}}\n    </div>\n</div>"

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = "<div class=\"radioFormatContainer card\">\n    <div class=\"radioSinglePicContainer\">\n        <div class=\"backgroundImageGeneric topImg\" data-url=\"{{imgURL}}\"> </div>\n    </div>\n    <div class=\"question padB28\" data-parent=\"{{parentId}}\" data-qid=\"{{qid}}\">\n        {{questionText}}\n    </div>\n    <div class=\"answer\">\n        {{#options}}\n        <div class=\"radioRow\" data-child=\"{{#child}}{{child}}{{/child}}\">\n            <span class=\"emptyCirc radioCirc backgroundImageGeneric\"> </span> <span class=\"optionTxt\"> {{text}} </span>\n        </div>\n        {{/options}}\n    </div>\n</div>"

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = "<div class=\"textFormatContainer card\">\n    <div class=\"question\" data-parent=\"{{parentId}}\" data-qid=\"{{qid}}\">\n        {{questionText}}\n    </div>\n    <div class=\"answer\">\n        <div class=\"textRow\">\n            <textarea class=\"textInput\" rows=\"1\" placeholder=\"{{defaultMessage}}\" data-limit=\"{{charLimit}}\"></textarea>\n        </div>\n    </div>\n</div>"

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ratingFormatContainer card\">\n    <div class=\"question padBZero\" data-parent=\"{{parentId}}\" data-qid=\"{{qid}}\">\n        {{questionText}}\n    </div>\n    <div class=\"parentAnswer\">\n        <div class=\"answer centreToScreenAnswer\">\n            {{#stars}}\n            <div class=\"ratingRow emptyStar backgroundImageGeneric\" data-child=\"{{#child}}{{child}}{{/child}}\">\n            </div>\n            {{/stars}}\n        </div>\n    </div>\n</div>"

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = "<div class=\"imageOption1Container card\">\n    <div class=\"question padBZero\" data-parent=\"{{parentId}}\" data-qid=\"{{qid}}\">\n        {{questionText}}\n    </div>\n    <div class=\"parentAnswer\">\n        <div class=\"answer centreToScreenAnswer\">\n            {{#options}}\n            <div class=\"imgOption overhid\" data-child=\"{{#child}}{{child}}{{/child}}\">\n                <div class=\"imgRow backgroundImageGeneric\" data-emotionType=\"{{type}}\"> </div>\n                <div class=\"emoText\"> {{text}} </div>\n            </div>\n            {{/options}}\n        </div>\n    </div>\n</div>"

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	(function(W, platformSdk, events) {
	    'use strict';

	    var utils = __webpack_require__(4),
	        Constants = __webpack_require__(5),

	        SurveyDoneController = function(options) {
	            this.template = __webpack_require__(20);
	        };

	    SurveyDoneController.prototype.bind = function(App, data) {
	        var $el = $(this.el);
	        var logDataToSend = {};
	        var btn = document.getElementsByClassName('surveyDoneBtn')[0];

	        logDataToSend.uk = "scrn_fnl_load";
	        logDataToSend.c = "scrn_load";
	        logDataToSend.o = "scrn_fnl";
	        logDataToSend.g = btn.innerHTML;
	        App.surveyServices.logData(logDataToSend);

	        btn.addEventListener('click', function() {

	            logDataToSend = {};
	            logDataToSend.uk = "scrn_fnl_sbmt";
	            logDataToSend.c = "click";
	            logDataToSend.o = "scrn_fnl";
	            logDataToSend.g = btn.innerHTML;
	            App.surveyServices.logData(logDataToSend);

	            if (platformSdk.bridgeEnabled)
	                PlatformBridge.deleteBotConversation()
	            else
	                console.log('closing App');

	        });


	    };





	    SurveyDoneController.prototype.render = function(ctr, App, data) {

	        var that = this;
	        var lastScreen;

	        if (platformSdk.bridgeEnabled)
	            lastScreen = platformSdk.appData.helperData.lastScreen;
	        else
	            lastScreen = {
	                "title": "Well done!",
	                "subtitle": "Thank you for making it this far.We’ llget back to your with some awesome stuff very soon.You have received 100 Rs.for performing this exemplary task.",
	                "CTAText": "GOT IT"

	            }

	        that.el = document.createElement('div');
	        that.el.className = 'surveyDoneContainer animation_fadein noselect';
	        that.el.innerHTML = Mustache.render(unescape(that.template), { lastScreen: lastScreen });
	        ctr.appendChild(that.el);
	        events.publish('update.loader', { show: false });
	        that.bind(App, data);
	    };

	    SurveyDoneController.prototype.destroy = function() {

	    };

	    module.exports = SurveyDoneController;


	})(window, platformSdk, platformSdk.events);

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = "<div class=\"surveyDoneCard\">\n    <div class=\"surveyDoneIcon backgroundImageGeneric\"></div>\n    <div class=\"title\"> {{lastScreen.title}} </div>\n    <div class=\"subTitle\"> {{lastScreen.subtitle}}</div>\n    <div class=\"surveyDoneBtn\"> {{lastScreen.CTAText}} </div>\n</div>"

/***/ },
/* 21 */
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
/* 22 */
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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	(function(W, platformSdk) {
	    'use strict';

	    var utils = __webpack_require__(4);
	    var checkTimeout = null;
	    var suffix = '?random=' + Math.round(Math.random() * 999999999);

	    var surveyServices = function(service) {
	        this.surveyServices = service;
	    };

	    var URL = {
	        location: appConfig.API_URL,
	        logUrl: appConfig.LOG_URL
	    };

	    var i = 1456;

	    surveyServices.prototype = {

	        logData: function(data) {


	            data.k = "act_exp";
	            data.p = "survey";


	            if (platformSdk.bridgeEnabled) {
	                data.fa = platformSdk.appData.helperData.surveyId;
	                data.vi = Object.keys(platformSdk.appData.helperData.questions).length;
	                data.src = platformSdk.appData.helperData.surveyType;
	                platformSdk.utils.logAnalytics("true", "click", data);

	            } else {
	                data.fa = 123;
	                data.vi = 9;
	                data.src = "sequential";


	                console.log(data);
	            }
	        }


	    };

	    module.exports = surveyServices;

	})(window, platformSdk);

/***/ }
/******/ ]);