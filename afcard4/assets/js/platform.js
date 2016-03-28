;(function(window) {

	var msgClasses = {
		bridgeClass0: {

			//Platform Bridge Version 0 calling this function will generate logs for testing at the android IDE.
			logFromJS: function(tag, data) {
				if (PlatformBridge.logFromJS) {
					PlatformBridge.logFromJS(tag, data);
				} else {
					if (console) console.log("function not available");
				}
			},
			//Platform Bridge Version 0 This function is called whenever the onLoadFinished of the html is called.
			onLoadFinished: function(height) {
				if (PlatformBridge.onLoadFinished) {
					PlatformBridge.onLoadFinished(height);
				} else {
					if (console) console.log("function not available");
				}
			},
			//Platform Bridge Version 0 Whenever the content's height is changed, the html will call this function to resize the height of the Android Webview.
			onResize: function(height) {
				if (PlatformBridge.onResize) {
					PlatformBridge.onResize(height);
				} else {
					if (console) console.log("function not available");
				}
			},
			//Platform bridge Version 0 Call this function to open a full page webView within hike.
			openFullPage: function(title, url) {
				if (PlatformBridge.openFullPage) {
					PlatformBridge.openFullPage(title, url);
				} else {
					if (console) console.log("function not available");
				}
			},
			//Platform Bridge Version 0 call this function with parameter as true to enable the debugging for javascript.
			setDebuggableEnabled: function(setEnabled) {
				if (PlatformBridge.setDebuggableEnabled) {
					PlatformBridge.setDebuggableEnabled(setEnabled);
				} else {
					if (console) console.log("function not available");
				}
			},
			//Platform Bridge Version 0 calling this function will share the screenshot of the webView along with the text at the top and a caption text to all social
			share: function(text, caption) {
				if (PlatformBridge.share) {
					if (arguments.length)
						PlatformBridge.share(text, caption);
					else
						PlatformBridge.share();
				} else {
					if (console) console.log("function not available");
				}
			},
			//Platform Bridge Version 0 call this function to Show toast for the string that is sent by the javascript.
			showToast: function(toast) {
				if (PlatformBridge.showToast) {
					PlatformBridge.showToast(toast);
				} else {
					if (console) console.log("function not available");
				}
			},
			//Platform Bridge Version 0 This function can be used to start a hike native contact chooser/picker which will show all hike contacts to user and user
			startContactChooser: function() {
				if (PlatformBridge.startContactChooser) {
					PlatformBridge.startContactChooser();
				} else {
					if (console) console.log("function not available");
				}
			},
			//Platform Bridge Version 0 Call this function to vibrate the device.
			vibrate: function(msecs) {
				if (PlatformBridge.vibrate) {
					PlatformBridge.vibrate(msecs);
				} else {
					if (console) console.log("function not available");
				}
			},

			//Platform Bridge Version 0 calling this method will forcefully block the chat thread.
			blockChatThread: function() {
				if (PlatformBridge.blockChatThread) {
					PlatformBridge.blockChatThread();
				} else {
					if (console) console.log("function not available");
				}
			},

			//Platform bridge Version 0 calling this function will delete the alarm associated with this javascript.
			deleteAlarm: function() {
				if (PlatformBridge.deleteAlarm) {
					PlatformBridge.deleteAlarm();
				} else {
					if (console) console.log("function not available");
				}
			},

			//Platform Bridge Version 0 call this function to delete the message.
			deleteMessage: function() {
				if (PlatformBridge.deleteMessage) {
					PlatformBridge.deleteMessage();
				} else {
					if (console) console.log("function not available");
				}
			},

			//Platform Bridge Version 0.
			forwardToChat: function(data) {
				if (PlatformBridge.forwardToChat) {
					PlatformBridge.forwardToChat(data);
				} else {
					if (console) console.log("function not available");
				}
			},

			//Platform Bridge Version 0.
			logAnalytics: function(isUI, subType, data) {
				if (PlatformBridge.logAnalytics) {
					PlatformBridge.logAnalytics(isUI, subType, data);
				} else {
					if (console) console.log("function not available");
				}
			},

			//Platform Bridge Version 0 calling this method will forcefully mute the chat thread.
			muteChatThread: function() {
				if (PlatformBridge.muteChatThread) {
					PlatformBridge.muteChatThread();
				} else {
					if (console) console.log("function not available");
				}
			},

			//Platform Bridge Version 0 Call this function to set the alarm at certain time that is defined by the second parameter.
			setAlarm: function(data, timeInMills) {
				if (PlatformBridge.setAlarm) {
					PlatformBridge.setAlarm(data, timeInMills);
				} else {
					if (console) console.log("function not available");
				}
			},

			//Platform Bridge Version 0 this function will update the helper data.
			updateHelperData: function(data) {
				if (PlatformBridge.updateHelperData) {
					PlatformBridge.updateHelperData(data);
				} else {
					if (console) console.log("function not available");
				}
			},

			//Platform Bridge Version 0 Calling this function will update the metadata.
			updateMetadata: function(data, notifyScreen) {
				if (PlatformBridge.updateMetadata) {
					PlatformBridge.updateMetadata(data, notifyScreen);
				} else {
					if (console) console.log("function not available");
				}
			},

		},

		bridgeClass1: {

			//Platform Bridge Version 1 this function will call the js back when the javascript demands some value back from the native.
			callbackToJS: function(id, value) {
				if (PlatformBridge.callbackToJS) {
					PlatformBridge.callbackToJS(id, value);
				} else {
					if (console) console.log("function not available");
				}
			},

			//Platform Bridge Version 1 This method will be called when you need to get the Connection type on the device.
			checkConnection: function(id) {
				if (PlatformBridge.checkConnection) {
					PlatformBridge.checkConnection(id);
				} else {
					if (console) console.log("function not available");
				}
			},

			//Platform Bridge Version 1 call this function to open a web page in the default browser.
			openPageInBrowser: function(url) {
				if (PlatformBridge.openPageInBrowser) {
					PlatformBridge.openPageInBrowser(url);
				} else {
					if (console) console.log("function not available");
				}
			},

			//Platform Bridge Version 1 calling this function will delete the alarm associated with this javascript.
			deleteAlarm: function() {
				if (PlatformBridge.deleteAlarm) {
					PlatformBridge.deleteAlarm(messageId);
				} else {
					if (console) console.log("function not available");
				}
			},

			//Platform Bridge Version 1 call this function to delete the message.
			deleteMessage: function() {
				if (PlatformBridge.deleteMessage) {
					PlatformBridge.deleteMessage(messageId);
				} else {
					if (console) console.log("function not available");
				}
			},

			//Platform Bridge Version 1 Calling this function will initiate forward of the message to a friend or group.
			forwardToChat: function( data) {
				if (PlatformBridge.forwardToChat) {
					PlatformBridge.forwardToChat(messageId, data);
				} else {
					if (console) console.log("function not available");
				}
			},

			//Platform Bridge Version 1 call this function to get the data from the native memory
			getFromCache: function( id, key) {
				if (PlatformBridge.getFromCache) {
					PlatformBridge.getFromCache(messageId, id, key);
				} else {
					if (console) console.log("function not available");
				}
			},

			//Platform Bridge Version 1 Call this function to get the bulk large data from the native memory
			getLargeDataFromCache: function( id) {
				if (PlatformBridge.getLargeDataFromCache) {
					PlatformBridge.getLargeDataFromCache(messageId, id);
				} else {
					if (console) console.log("function not available");
				}
			},

			//Platform Bridge Version 1 Call this function to log analytics events.
			logAnalytics: function( isUI, subType, data) {
				if (PlatformBridge.logAnalytics) {
					PlatformBridge.logAnalytics(messageId, isUI, subType, data);
				} else {
					if (console) console.log("function not available");
				}
			},

			//Platform Bridge Version 1 This function is called whenever the onLoadFinished of the html is called.
			onLoadFinished: function( height) {
				if (PlatformBridge.onLoadFinished) {
					PlatformBridge.onLoadFinished(messageId, height);
				} else {
					if (console) console.log("function not available");
				}
			},


			//Platform Bridge Version 1 Whenever the content's height is changed, the html will call this function to resize the height of the Android Webview.
			onResize: function( height) {
				if (PlatformBridge.onResize) {
					PlatformBridge.onResize(messageId, height);
				} else {
					if (console) console.log("function not available");
				}
			},

			//Platform Bridge Version 1 Call this method to put data in cache.
			putInCache: function(key, value) {
				if (PlatformBridge.putInCache) {
					PlatformBridge.putInCache(key, value);
				} else {
					if (console) console.log("function not available");
				}
			},

			//Platform Bridge Version 1 Call this method to put bulk large data in cache.
			putLargeDataInCache: function(value) {
				if (PlatformBridge.putLargeDataInCache) {
					PlatformBridge.putLargeDataInCache(value);
				} else {
					if (console) console.log("function not available");
				}
			},

			//Platform Bridge Version 1 Call this function to set the alarm at certain time that is defined by the second parameter.
			setAlarm: function( data, timeInMills) {
				if (PlatformBridge.setAlarm) {
					PlatformBridge.setAlarm(messageId, data, timeInMills);
				} else {
					if (console) console.log("function not available");
				}
			},

			//Platform Bridge Version 1 calling this function will share the screenshot of the webView along with the text at the top and a caption text to all social network platforms by calling the system's intent.
			share: function( text, caption) {
				if (PlatformBridge.share) {
					if (arguments.length > 1)
						PlatformBridge.share(messageId, text, caption);
					else
						PlatformBridge.share(messageId);
				} else {
					if (console) console.log("function not available");
				}
			},

			//Platform Bridge Version 1 this function will update the helper data.
			updateHelperData: function( data) {
				if (PlatformBridge.updateHelperData) {
					PlatformBridge.updateHelperData(messageId, data);
				} else {
					if (console) console.log("function not available");
				}
			},

			//Platform Bridge Version 1
			updateMetadata: function( data, notifyScreen) {
				if (PlatformBridge.updateMetadata) {
					PlatformBridge.updateMetadata(messageId, data, notifyScreen);
				} else {
					if (console) console.log("function not available");
				}
			},

		}
	}

	var nonMsgClasses = {
		bridgeClass1: {

			//Platform Bridge Version 1 Call this function to allow the back Press.
			allowBackPress: function(allowBack) {
				if (PlatformBridge.allowBackPress) {
					PlatformBridge.allowBackPress(allowBack);
				} else {
					if (console) console.log("function not available");
				}
			},

			//Platform Bridge Version 1 calling this method will forcefully block the full screen bot.
			blockChatThread: function(isBlocked) {
				if (PlatformBridge.blockChatThread) {
					PlatformBridge.blockChatThread(isBlocked);
				} else {
					if (console) console.log("function not available");
				}
			},

			//Platform Bridge Version 1 call this function to delete the entire notif data of the microApp.
			deleteAllNotifData: function() {
				if (PlatformBridge.deleteAllNotifData) {
					PlatformBridge.deleteAllNotifData();
				} else {
					if (console) console.log("function not available");
				}
			},

			//Platform Bridge Version 1 Call this function to delete partial notif data pertaining to a microApp.
			deletePartialNotifData: function(key) {
				if (PlatformBridge.deletePartialNotifData) {
					PlatformBridge.deletePartialNotifData(key);
				} else {
					if (console) console.log("function not available");
				}
			},

			//Platform Bridge Version 1 Utility method to call finish of the current activity
			finish: function() {
				if (PlatformBridge.finish) {
					PlatformBridge.finish();
				} else {
					if (console) console.log("function not available");
				}
			},

			//Platform Bridge Version 1 Calling this function will initiate forward of the message to a friend or group.
			forwardToChat: function(json, hikeMessage) {
				if (PlatformBridge.forwardToChat) {
					PlatformBridge.forwardToChat(json, hikeMessage);
				} else {
					if (console) console.log("function not available");
				}
			},

			//Platform Bridge Version 1 call this function to get the data from the native memory
			getFromCache: function(id, key) {
				if (PlatformBridge.getFromCache) {
					PlatformBridge.getFromCache(id, key);
				} else {
					if (console) console.log("function not available");
				}
			},

			//Platform Bridge Version 1 Call this function to get the bulk large data from the native memory
			getLargeDataFromCache: function(id) {
				if (PlatformBridge.getLargeDataFromCache) {
					PlatformBridge.getLargeDataFromCache(id);
				} else {
					if (console) console.log("function not available");
				}
			},

			//Platform Bridge Version 1 call this function to get the notif data pertaining to the microApp.
			getNotifData: function(id) {
				if (PlatformBridge.getNotifData) {
					PlatformBridge.getNotifData(id);
				} else {
					if (console) console.log("function not available");
				}
			},

			//Platform Bridge Version 1 calling this method will forcefully mute the full screen bot.
			muteChatThread: function() {
				if (PlatformBridge.muteChatThread) {
					PlatformBridge.muteChatThread();
				} else {
					if (console) console.log("function not available");
				}
			},

			//Platform Bridge Version 1 Utility method to indicate change in orientation of the device. 1 indicates PORTRAIT and 2 indicates LANDSCAPE
			orientationChanged: function(orientation) {
				if (PlatformBridge.orientationChanged) {
					PlatformBridge.orientationChanged(orientation);
				} else {
					if (console) console.log("function not available");
				}
			},

			//Platform Bridge Version 1 Call this method to put data in cache.
			putInCache: function(key, value) {
				if (PlatformBridge.putInCache) {
					PlatformBridge.putInCache(key, value);
				} else {
					if (console) console.log("function not available");
				}
			},

			//Platform Bridge Version 1 Call this method to put bulk large data in cache.
			putLargeDataInCache: function(value) {
				if (PlatformBridge.putLargeDataInCache) {
					PlatformBridge.putLargeDataInCache(value);
				} else {
					if (console) console.log("function not available");
				}
			},

			//Platform Bridge Version 1 Utility method to remove a menu from the list of menu options for a bot
			removeMenu: function(id) {
				if (PlatformBridge.removeMenu) {
					PlatformBridge.removeMenu(id);
				} else {
					if (console) console.log("function not available");
				}
			},

			//Platform Bridge Version 1 Utility method to fetch the overflowMenu from the MicroApp.
			replaceOverflowMenu: function(newMenuString) {
				if (PlatformBridge.replaceOverflowMenu) {
					PlatformBridge.replaceOverflowMenu(newMenuString);
				} else {
					if (console) console.log("function not available");
				}
			},

			//Platform Bridge Version 1 this function will update the helper data.
			updateHelperData: function(json) {
				if (PlatformBridge.updateHelperData) {
					PlatformBridge.updateHelperData(json);
				} else {
					if (console) console.log("function not available");
				}
			},

			//Platform Bridge Version 1 Call this function to update the overflow menu items.
			updateOverflowMenu: function(id, newMenuJSON) {
				if (PlatformBridge.updateOverflowMenu) {
					PlatformBridge.updateOverflowMenu(id, newMenuJSON);
				} else {
					if (console) console.log("function not available");
				}
			},

		}
	}

	var messageId;

	window.initiateBridge = function(platformVersion, appType, appMessageId) {
		if(appMessageId) messageId = appMessageId;
		var bridgeObj = msgClasses.bridgeClass0;
		for (var i = 1; i <= parseInt(platformVersion); i++) {
			bridgeObj = Object.create(bridgeObj);
			var tempBridgeObj = eval("msgClasses.bridgeClass" + i);
			console.log("msg", tempBridgeObj);
			for (var key in tempBridgeObj) {
				if (tempBridgeObj.hasOwnProperty(key)) {
					bridgeObj[key] = tempBridgeObj[key];
				}
			}

			if (appType === "NM") {
				var tempBridgeObj = eval("nonMsgClasses.bridgeClass" + i);
				console.log("Nonmsg", tempBridgeObj);
				for (var key in tempBridgeObj) {
					if (tempBridgeObj.hasOwnProperty(key)) {
						bridgeObj[key] = tempBridgeObj[key];
					}
				}
			}
		}
		return bridgeObj;
	};

})(window)

window.platformSdk = function(window, undefined) {
	"use strict";

	//classlist hack for android 2.3 and below
	if (!("classList" in document.documentElement) && Object.defineProperty && typeof HTMLElement !== "undefined") {
		Object.defineProperty(HTMLElement.prototype, "classList", {
			get: function() {
				function t(t) {
					return function(n) {
						var r = e.className.split(/\s+/),
							i = r.indexOf(n);
						t(r, i, n);
						e.className = r.join(" ");
					};
				}
				var e = this;
				var n = {
					add: t(function(e, t, n) {
						~t || e.push(n);
					}),
					remove: t(function(e, t) {
						~t && e.splice(t, 1);
					}),
					toggle: t(function(e, t, n) {
						~t ? e.splice(t, 1) : e.push(n);
					}),
					contains: function(t) {
						return !!~e.className.split(/\s+/).indexOf(t);
					},
					item: function(t) {
						return e.className.split(/\s+/)[t] || null;
					}
				};
				Object.defineProperty(n, "length", {
					get: function() {
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

	//var platformBridge = window.PlatformBridge;
	var fireAppInit = function() {
		var cardHeight = document.body.offsetHeight;
		if (platformBridge) platformSdk.ui.onLoadFinished(cardHeight + "");

		setTimeout(function() {
			cardHeight = document.body.offsetHeight;

			if (Math.abs(window.innerHeight - cardHeight) > 5)
				platformSdk.ui.resize(cardHeight);
			if (platformBridge) platformSdk.events.publish('onnativeready');
			else platformSdk.events.publish('webview/data/loaded');
		}, 100);
	};

	if (platformBridge) platformBridge.setDebuggableEnabled(true);
	window.onload = fireAppInit;

	var setData = function(msisdn, helperData, isSent, uid, appVersion) {
		// platformSdk.utils.log("inSetData");
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

	var setAppData = function(appData) {

		if (appInitialized) return;
		else appInitialized = true;

		if (typeof appData === 'string') {
			appData = decodeURIComponent(appData);
			appData = JSON.parse(appData);
		}

		if (appData.hd) {
			appData.helperData = appData.hd;
			delete appData.hd;
		}

		// platformSdk.utils.log("init");

		if (!appData.msisdn) {
			// platformSdk.utils.log("msisdn is null");
		} else {
			// platformSdk.utils.log("msisdn: " + appData.msisdn);
			platformSdk.appData = appData;

			for (var key in appData) {
				platformSdk[key] = appData[key];
			}

			if (appData.helperData) {
				if (appData.helperData.debug) {
					platformSdk.logger.logLoadTimeInfo();
					platformBridge.setDebuggableEnabled(true);
				}
			} else platformSdk.helperData = {};
		}

		platformSdk.events.publish('webview/data/loaded');
		if(platformSdk.helperData.cardExpireTime){
			PlatformBridge.setAlarm('{"alarm_data": {"isAlarmSet": 0},  "conv_msisdn" :"'+platformSdk.msisdn+'", "inc_unread": "0", "delete_card": true}', platformSdk.helperData.cardExpireTime.toString());
		}
	}

	window.setData = setData;
	window.onResume = function() {
		platformSdk.events.publish('app/onresume');
	};
	window.onPause = function() {
		platformSdk.events.publish('app/onbeforeunload');
	};
	window.init = setAppData;

	return {
		VERSION: '0.0.1',
		card: '',
		msisdn: null,
		bridgeEnabled: false,
		platformVersion: platformVersion,
		appType: appType,
		messageId: messageId,
		bridge: platformBridge,

		ready: function(fn) {
			var that = this;
			var start = platformSdk.events.subscribe('webview/data/loaded', function() {
				that.bridgeEnabled = that.checkBridge();
				if (typeof fn === "function") fn();
				start.remove();
			});
		},
		checkBridge: function() {
			return typeof PlatformBridge === "undefined" ? false : true;
		},
		blockChatThread: function() {
			platformBridge.blockChatThread("true");
		},
		unblockChatThread: function() {
			platformBridge.blockChatThread("false");
		},
		deleteMessage: function() {
			platformBridge.deleteMessage();
		},
		updateMetadata: function(data, flag) {
			platformBridge.updateMetadata(platformSdk.utils.validateStringifyJson(data), flag);
		},
		openFullPage: function(title, href) {
			platformBridge.openFullPage(title, href);
		},
		muteChatThread: function() {
			platformBridge.muteChatThread();
		},
		deleteAlarm: function() {
			platformBridge.deleteAlarm();
		},
		updateHelperData: function(data) {
			platformBridge.updateHelperData(platformSdk.utils.validateStringifyJson(data));
		},
		getBlob: function() {
			var obj = platformBridge.getLargeDataFromCache();
		},
		setBlob: function(obj) {
			var str = platformSdk.utils.validateStringifyJson(obj);
			platformBridge.putLargeDataInCache(str);
		},
		setAlarm: function(alarmData, nextPollIt) {
			if (typeof alarmData !== 'string')
				alarmData = platformSdk.utils.validateStringifyJson(alarmData);

			platformBridge.setAlarm(alarmData, nextPollIt);
		}
	};
}(window);

platformSdk.utils = function(window, platformSdk) {

	var platformBridge = platformSdk.bridge;

	(function(){
	  	var cache = {};
	  	this.tmpl = function tmpl(str, data){
	    	var fn = !/\W/.test(str) ? cache[str] = cache[str] || tmpl(document.getElementById(str).innerHTML) : new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};" + "with(obj){p.push('" + str.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');");
	    	return data ? fn( data ) : fn;
	  	};
	})();

	return {
		log: function(msg, caption) {
			if (platformSdk.bridgeEnabled) platformBridge.logFromJS("platform-js-sdk", msg);
			if (console) {
				if (caption)
				 	console.log(caption + ":");
				console.log(msg);
			}
		},

		debug: function(object) {
			if (platformSdk.bridgeEnabled) platformBridge.logFromJS("platform-js-sdk", this.validateStringifyJson(object));
		},

		logAnalytics: function(isUI, type, analyticEvents) {
			analyticEvents = this.validateStringifyJson(analyticEvents);
			this.log("analytic with isui = " + isUI + " type = " + type + " analyticEvents = " + analyticEvents);
			if (platformSdk.bridgeEnabled) PlatformBridge.logAnalytics(isUI, type, analyticEvents);
		},

		validateStringifyJson: function(json) {
			//HACK to handle the helperdata bug. we cannot have \" or ' in the str.
			var jsonString = JSON.stringify(json);
			jsonString = jsonString.replace(/\\"/g, "&quot;");
			jsonString = jsonString.replace(/'/g, "&#39;");
			jsonString = jsonString.replace(/\\n/g," ");
			return jsonString;
		},

		merge: function(array, key) { // merges 2 arrays and de-duplicates.
			var a = array.concat();
			for (var i = 0; i < a.length; ++i) {
				for (var j = i + 1; j < a.length; ++j) {
					if (a[i][key] === a[j][key])
						a.splice(j--, 1);
				}
			}
			return a;
		},

		sort: function(array, key, type) {
			return array.sort(function(a, b) {
				var x = a[key];
				var y = b[key];
				if (type === "asc") return ((x < y) ? -1 : ((x > y) ? 1 : 0));
				else return ((x > y) ? -1 : ((x < y) ? 1 : 0));
			});
		},

		isEmpty: function(obj) {
			for (var prop in obj) {
				if (obj.hasOwnProperty(prop))
					return false;
			}

			return true;
		},

		addEventListenerList: function(list, event, fn) {
			for (var i = 0, len = list.length; i < len; i++) {
				list[i].addEventListener(event, fn, false);
			}
		},

		removeEventListenerList: function(list, event, fn) {
			for (var i = 0, len = list.length; i < len; i++) {
				list[i].removeEventListener(event, fn, false);
			}
		},

		siblings: function(n) {
			function getChildren(n, skipMe) {
				var r = [];
				var elem = null;
				for (; n; n = n.nextSibling)
					if (n.nodeType == 1 && n != skipMe)
						r.push(n);
				return r;
			}

			return getChildren(n.parentNode.firstChild, n);
		},

		scrollTo: function(elem, Y, duration, easingFunction, callback) {

			if (typeof elem == "undefined")
				elem = document.documentElement.scrollTop ? document.documentElement : document.body;
			var start = Date.now();
			var from = elem.scrollTop;

			if (from === Y) {
				if (callback) callback();
				return; /* Prevent scrolling to the Y point if already there */
			}

			function min(a, b) {
				return a < b ? a : b;
			}

			function scroll(timestamp) {

				var currentTime = Date.now(),
					time = min(1, ((currentTime - start) / duration)),
					easedT = easingFunction(time);

				elem.scrollTop = (easedT * (Y - from)) + from;

				if (time < 1) requestAnimationFrame(scroll);
				else
				if (callback) callback();
			}

			requestAnimationFrame(scroll);
		},

		easing: {
			// no easing, no acceleration
			linear: function(t) {
				return t;
			},

			// accelerating from zero velocity
			easeInQuad: function(t) {
				return t * t;
			},

			// decelerating to zero velocity
			easeOutQuad: function(t) {
				return t * (2 - t);
			},

			// acceleration until halfway, then deceleration
			easeInOutQuad: function(t) {
				return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
			},

			// accelerating from zero velocity
			easeInCubic: function(t) {
				return t * t * t;
			},

			// decelerating to zero velocity
			easeOutCubic: function(t) {
				return (--t) * t * t + 1;
			},

			// acceleration until halfway, then deceleration
			easeInOutCubic: function(t) {
				return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
			},

			// accelerating from zero velocity
			easeInQuart: function(t) {
				return t * t * t * t;
			},

			// decelerating to zero velocity
			easeOutQuart: function(t) {
				return 1 - (--t) * t * t * t;
			},

			// acceleration until halfway, then deceleration
			easeInOutQuart: function(t) {
				return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
			},

			// accelerating from zero velocity
			easeInQuint: function(t) {
				return t * t * t * t * t;
			},

			// decelerating to zero velocity
			easeOutQuint: function(t) {
				return 1 + (--t) * t * t * t * t;
			},

			// acceleration until halfway, then deceleration
			easeInOutQuint: function(t) {
				return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
			}
		},

		getHeight: function(el) {
			var children = el.children;
			var len = children.length;
			var height = 0;

			for (var i = 0; i < len; i++) {
				height = height + parseInt(children[i].offsetHeight);
			}
			return height;
		},
		closest: function(el, tag) {
		  	tag = tag.toUpperCase();
		  	do {
		    	if (el.nodeName === tag) return el;
		  	} while (el = el.parentNode);

		  	return null;
		}
	};

}(window, window.platformSdk);


platformSdk.events = function(window, platformSdk) {
	var topics = {};
	var hOP = topics.hasOwnProperty;
	var platformBridge = platformSdk.bridge;

	return {
		subscribe: function(topic, listener) {
			if (!hOP.call(topics, topic)) topics[topic] = [];
			var index = topics[topic].push(listener) - 1;
			return {
				remove: function() {
					delete topics[topic][index];
				}
			};
		},
		publish: function(topic, info) {
			if (!hOP.call(topics, topic)) return;
			topics[topic].forEach(function(item) {
				item(info != undefined ? info : {});
			});
		}
	};

}(window, window.platformSdk);


(function(window, platformSdk) {
	var callbacks = {};
	var eventsObject = {};

	function getNewId() {
		var cbId = Math.round(Math.random() * 999999999);
		while (cbId in callbacks) {
			cbId = Math.round(Math.random() * 999999999);
		}
		return cbId;
	}

	window.callbackFromNative = function(id, params) {

		var args, cbItem = callbacks[id];
		if (cbItem && typeof(cbItem.callback) === 'function') {
			cbItem.callback.call(cbItem.context, params);
		}

		delete callbacks[id];
	};

	platformSdk.nativeReq = function(param) {

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

	platformSdk.setOverflowMenu = function(omList) {
		for (var i = 0; i < omList.length; i++){
			var omItem = omList[i];
			var eventId = getNewId();
			callbacks[eventId] = omItem;
			omItem.id = eventId;
		}

		omListObject = omList;

		if (platformSdk.bridgeEnabled) PlatformBridge.replaceOverflowMenu(platformSdk.utils.validateStringifyJson(omList));
	};

	platformSdk.onMenuItemClicked = function(id) {
		platformSdk.events.publish(callbacks[id].eventName, id);
	};

	platformSdk.updateOverflowMenu = function(id, c){
		var obj = callbacks[id];
		for (var key in c){
			obj[key] = c[key];
		}

		console.log('updateOverflowMenu object: ', id, obj);
		if (platformSdk.bridgeEnabled) PlatformBridge.updateOverflowMenu(id, platformSdk.utils.validateStringifyJson(obj));
	};

	platformSdk.retrieveId = function(eventname){
		for (var i = 0; i < omListObject.length; i++){
			var omItem = omListObject[i];
			if (omItem.eventName === eventname) return omItem.id;
		}
	};

})(window, window.platformSdk);

platformSdk.device = function(window, platformSdk) {

	"use strict";

	var platformBridge = platformSdk.bridge;

	return {};

}(window, window.platformSdk);

platformSdk.network = function(window, platformSdk) {

	"use strict";

	var platformBridge = platformSdk.bridge;

	return {};

}(window, window.platformSdk);

platformSdk.user = function(window, platformSdk) {

	"use strict";
	var platformBridge = platformSdk.bridge;

	return {};

}(window, window.platformSdk);

platformSdk.ui = function(window, platformSdk) {

	var platformBridge = platformSdk.bridge;

	var shareMessage;
	var captionText;

	platformSdk.events.subscribe('refresh/startAnimation/', function(ele) {
		ele.classList.add('play');
	});

	platformSdk.events.subscribe('refresh/stopAnimation/', function(ele) {
		ele.classList.remove('play');
	});

	if (!platformSdk.checkBridge) return false;
	return {
		onLoadFinished: function(height) {
			platformBridge.onLoadFinished(height + "");
		},
		resize: function(height) {
			height = height || document.body.offsetHeight;
			platformBridge.onResize(height + "");
		},
		showToast: function(msg) {
			platformBridge.showToast(msg);
		},
		shareCard: function(e) {
			e.preventDefault();
			e.stopPropagation();

			platformSdk.utils.log("share calling");

			if (platformSdk.helperData != null && platformSdk.helperData.share_text) {
				shareMessage = platformSdk.helperData.share_text;
			} else {
				//shareMessage = "World Cup 2015 Live scores only on hike!";
				shareMessage = "hike up your life only on hike!";
			}
			if (platformSdk.helperData != null && platformSdk.helperData.caption_text) {
				captionText = platformSdk.helperData.caption_text;
			} else {
				captionText = "";
			}

			platformBridge.share(shareMessage, captionText);
			platformSdk.utils.log("share called");

			return false;
		},
		forwardCard: function(e) {
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


platformSdk.ajax = function(window, platformSdk) {

	var platformBridge = platformSdk.bridge;

	var ajaxSuccess = function(xhr, callback) {
		if (callback && typeof callback === 'function')
			callback(xhr.responseText);
	};

	var ajaxError = function(xhr, callback, errorMsg) {
		if (callback && typeof callback === 'function')
			callback(xhr.responseText);
		if (errorMsg)
			platformBridge.showToast(errorMsg);
	};

	var checkConnection = function(fn){
		platformSdk.nativeReq({
			fn: 'checkConnection',
			ctx: this,
			data: "",
			success: function(response){
				if (response != "-1" && response != "0") {
					if (typeof fn === "function") fn();
				} else platformSdk.events.publish('app/offline');
			}
		});
	};

	var fire = function(obj){
		var url = obj.url,
			headers = obj.headers,
			data = obj.data,
			errorMsg = obj.errorMessage,
			callbackSucess = obj.success,
			callbackFailure = obj.error,
			type = obj.type.toUpperCase();

		var xhr = new XMLHttpRequest();

		platformSdk.utils.log("ajax call started on " + url);
		if (xhr) {
			xhr.onreadystatechange = function() {
				if (4 == xhr.readyState && 200 == xhr.status) {
					if (platformSdk.helperData && platformSdk.helperData.debug)
						platformSdk.logger.endMarker('xhrCall');
					ajaxSuccess(xhr, callbackSucess);
				}
				if (4 == xhr.readyState && 200 != xhr.status) {
					if (platformSdk.helperData && platformSdk.helperData.debug)
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

			if (platformSdk.helperData && platformSdk.helperData.debug)
				platformSdk.logger.setMarker('xhrCall');

			xhr.send(data);
		}
	}

	return function(obj) {

		if (platformSdk.bridgeEnabled) {
			checkConnection(function(){
				fire(obj);
			});
		} else fire(obj);

	};

}(window, window.platformSdk);


platformSdk.logger = function(window, platformSdk) {

	"use strict";

	var platformBridge = platformSdk.bridge;

	var markers = {};

	var latencyData = {
		html: {}
	};

	var drawDebugInfoOverlay = function(name, dataObj) {
		var debugInfoOverlay = document.getElementById("debug-info-overlay");

		if (debugInfoOverlay) {
			debugInfoOverlay.remove();
		}

		setTimeout(function() {
			var htmlStr = name;
			var body = document.body;
			var listStr = '<ul>';
			var link = document.getElementsByTagName('link');
			var basePath = link[0].getAttribute('href').split('assets')[0];
			for (var key in dataObj) {
				listStr += '<li><b>' + key + '</b></li>';
				var keyData = dataObj[key];

				for (var key in keyData) {
					listStr += '<li>' + key + ' : ' + keyData[key] + '</li>';
				}
			}
			listStr += '</ul>';
			htmlStr = listStr + '<span class="icon-close tappingEffect" id="close-icon"><img width="14" src="' + basePath + 'assets/images/cross.png"></span>';

			var debugInfoOverlayDiv = document.createElement("div");
			debugInfoOverlayDiv.setAttribute('id', "debug-info-overlay");
			debugInfoOverlayDiv.innerHTML = htmlStr;

			body.appendChild(debugInfoOverlayDiv);

			//var closeIconDiv = document.getElementById('debug-info-overlay');
			var closeIcon = debugInfoOverlayDiv.getElementsByClassName('icon-close')[0];
			closeIcon.addEventListener('click', function() {
				debugInfoOverlayDiv.remove();
			});

		}, 15);
	};

	return {
		logLoadTimeInfo: function() {
			setTimeout(function() {
				var timingAPI;
				if (!platformSdk.helperData.debug)
					return;

				if (window.performance) {
					timingAPI = performance.timing;
				} else {
					platformSdk.utils.log("timing API not supported by the webView");
					return;
				}
				latencyData.html.networkLatency = timingAPI.responseEnd - timingAPI.fetchStart;
				latencyData.html.domReadiness = timingAPI.loadEventEnd - timingAPI.responseEnd;

				if (platformSdk.time) {
					//latencyData.native = platformSdk.time;
				}

				drawDebugInfoOverlay('DOM load', latencyData);

				platformSdk.utils.log(latencyData, 'latencyData');

			}, 100);
		},
		setMarker: function(name) {
			if (window.performance)
				window.performance.mark(name + "_marker_start");
		},
		endMarker: function(name, clearFlag) {
			if (window.performance) {
				window.performance.mark(name + "_marker_end");
				this.measureMarker(name, clearFlag);
			}
		},
		measureMarker: function(name, clearFlag) {
			var measureName = name + '_measure';
			if (!window.performance) return;

			window.performance.measure(measureName, name + '_marker_start', name + '_marker_end');
			var measures = window.performance.getEntriesByName(name + '_measure');


			platformSdk.utils.log('name: ' + measures[0].name + ', duration: ' + measures[0].duration);

			this.clearMarker(name);
			this.clearMeasure(name);

			drawDebugInfoOverlay(name, measures[0]);
		},
		clearMarker: function(name) {
			if (window.performance) {
				window.performance.clearMarks(name + "_marker_start");
				window.performance.clearMarks(name + "_marker_end");
			}
		},
		clearMeasure: function(name) {
			if (window.performance) {
				window.performance.clearMeasures(name + "_measure");
			}
		},
		clearAllMarker: function(name) {
			if (window.performance) {
				window.performance.clearMarks();
			}
		}
	};

}(window, window.platformSdk);