(function(W, platformSdk, events) {
    'use strict';

    var utils = require('../util/utils'),
        Constants = require('../../constants.js'),

        QuestionController = function(options) {
            this.template = require('raw!../../templates/questions.html');
            this.checkFormatTemplate = require('raw!../../templates/checkFormat.html');
            this.radioFormatTemplate = require('raw!../../templates/radioFormat.html');
            this.radioVersusFormatTemplate = require('raw!../../templates/radioVersusFormat.html');
            this.radioSinglePicFormatTemplate = require('raw!../../templates/radioSinglePicFormat.html');
            this.textFormatTemplate = require('raw!../../templates/textFormat.html');
            this.ratingFormatTemplate = require('raw!../../templates/ratingFormat.html');
            this.imgOptions1FormatTemplate = require('raw!../../templates/imageOptionFormat1.html');
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
                    "currentQuesNum": document.getElementById('currentQuesNum'),
                    "questionBar": document.getElementsByClassName('questionBar')[0],
                    "initialH": 28,
                    "nextLinkClicked": false,
                    "noInternet": document.getElementById('nointernet')

                },
                state = {};

            var api = {

                init: function() {
                    this.renderQuestion(data.currentQuesId);
                    this.bindHandlers();
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

                    document.querySelector('body').addEventListener('click', function(evt) {

                        var parent = evt.target.parentNode;
                        if (parent.classList.contains('checkRow')) {

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

                            that.toggleNavigateLink(parent.parentNode, "checkbox", child);

                        } else if (parent.classList.contains('radioRow')) {

                            var radioBox = parent.querySelector('.radioCirc');
                            var optionTxt = parent.querySelector('.optionTxt');
                            var child = parent.getAttribute('data-child');

                            if (radioBox.classList.contains('emptyCirc')) {
                                radioBox.classList.add('filledCirc');
                                radioBox.classList.remove('emptyCirc');
                                optionTxt.classList.add('selectedTextColor');
                                that.unselectRadioSublings(parent);
                            }

                            that.toggleNavigateLink(parent.parentNode, "radio", child);

                        } else if (evt.target.classList.contains('ratingRow')) {

                            var child = evt.target.getAttribute('data-child');
                            that.fillStars(evt.target);
                            that.toggleNavigateLink(parent, "rating", child);

                        } else if (parent.classList.contains('imgOption')) {

                            var child = parent.getAttribute('data-child');
                            var imgRow = parent.querySelector('.imgRow');

                            if (imgRow.classList.contains('positiveHollow')) {
                                imgRow.classList.remove('positiveHollow');
                                imgRow.classList.add("filledEmo");
                                imgRow.classList.add("positiveFilled");
                                that.unselectImgOptions(parent);

                            } else if (imgRow.classList.contains('negativeHollow')) {
                                imgRow.classList.remove('negativeHollow');
                                imgRow.classList.add("negativeFilled");
                                imgRow.classList.add("filledEmo");
                                that.unselectImgOptions(parent);

                            } else if (imgRow.classList.contains('neutralHollow')) {
                                imgRow.classList.remove('neutralHollow');
                                imgRow.classList.add("neutralFilled");
                                imgRow.classList.add("filledEmo");
                                that.unselectImgOptions(parent);

                            }

                            that.toggleNavigateLink(parent, "imageOption1", child);
                        }



                    }, true);


                    cache.nextLink.addEventListener('click', function() {

                        if (cache.nextLinkClicked)
                            return;

                        cache.nextLinkClicked = true;

                        var childElem = this.getAttribute('data-child');

                        that.collectLogForCurrent(data.questions[data.currentQuesId]);

                        if (data.surveyType == "branch" && (childElem == "undefined" || typeof childElem == 'undefined' || childElem == null)) {
                            App.router.navigateTo('/surveyDone');
                        } else {
                            if (data.surveyType == "branch")
                                dataLocal.nextQuesId = this.getAttribute('data-child');
                            else if (data.surveyType == "sequential") {
                                if ((Object.keys(data.questions).length) == data.currentQuesNum)
                                    dataLocal.nextQuesId = null;
                                else
                                    dataLocal.nextQuesId = parseInt(data.currentQuesId) + 1;
                            }

                            dataLocal.nextQuesNum = parseInt(data.currentQuesNum) + 1;

                            if (platformSdk.bridgeEnabled) {
                                platformSdk.appData.helperData.currentQuesId = dataLocal.nextQuesId;
                                platformSdk.appData.helperData.currentQuesNum = dataLocal.nextQuesNum;
                                platformSdk.updateHelperData(platformSdk.appData.helperData);

                            } else {
                                data.currentQuesId = dataLocal.nextQuesId;
                                data.currentQuesNum = dataLocal.nextQuesNum;
                            }

                            if (dataLocal.nextQuesId) {
                                that.renderQuestion(dataLocal.nextQuesId);

                                if (data.surveyType == "sequential")
                                    that.updateBar(dataLocal.nextQuesNum);

                            } else
                                App.router.navigateTo('/surveyDone');


                        }



                    });


                    document.querySelector('body').addEventListener('keyup', function(evt) {

                        var parent = evt.target.parentNode;
                        var elem = evt.target;
                        var limitChar = elem.getAttribute('data-limit');
                        if (parent.classList.contains('textRow')) {

                            that.toggleNavigateLink(parent.parentNode, "text");
                            if (elem.value.length > limitChar)
                                elem.value = elem.value.substr(0, limitChar);

                        }

                    }, true);


                    document.querySelector('body').addEventListener('keydown', function(evt) {

                        var parent = evt.target.parentNode;
                        var elem = evt.target;
                        var txtContainer = document.getElementsByClassName('textFormatContainer')[0];
                        var limitChar = elem.getAttribute('data-limit');
                        if (parent.classList.contains('textRow')) {
                            var outerHeight = parseInt(window.getComputedStyle(elem).height, 10);
                            var diff = outerHeight - elem.clientHeight;
                            elem.style.height = 0;
                            elem.style.height = Math.max(cache.initialH, elem.scrollHeight + diff) + 'px';
                            txtContainer.scrollTop = parseInt(elem.style.height);

                        }

                    }, true);

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


                toggleNavigateLink: function(container, type, child) {

                    if (type == 'checkbox') {
                        if (container.querySelector('.filledRec'))
                            cache.nextLink.classList.add('animation_scale_1')
                        else
                            cache.nextLink.classList.remove('animation_scale_1')
                    } else if (type == 'radio') {
                        if (container.querySelector('.filledCirc'))
                            cache.nextLink.classList.add('animation_scale_1')
                        else
                            cache.nextLink.classList.remove('animation_scale_1')
                    } else if (type == 'radioVersus') {
                        if (container.querySelector('.filledCirc'))
                            cache.nextLink.classList.add('animation_scale_1')
                        else
                            cache.nextLink.classList.remove('animation_scale_1')
                    } else if (type == 'radioSinglePic') {
                        if (container.querySelector('.filledCirc'))
                            cache.nextLink.classList.add('animation_scale_1')
                        else
                            cache.nextLink.classList.remove('animation_scale_1')
                    } else if (type == 'text') {
                        if (container.querySelector('.textInput').value.trim().length > 0)
                            cache.nextLink.classList.add('animation_scale_1')
                        else
                            cache.nextLink.classList.remove('animation_scale_1')
                    } else if (type == 'rating') {
                        if (container.querySelector('.filledStar'))
                            cache.nextLink.classList.add('animation_scale_1')
                        else
                            cache.nextLink.classList.remove('animation_scale_1')
                    } else if (type == 'imageOption1') {
                        if (container.querySelector('.filledEmo'))
                            cache.nextLink.classList.add('animation_scale_1')
                        else
                            cache.nextLink.classList.remove('animation_scale_1')
                    }


                    cache.nextLink.setAttribute('data-child', child)
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

                renderQuestion: function(questionId) {
                    //Hide the previous card
                    var that = this;
                    var logDataToSend = {};
                    var elems = cache.questionsCard.querySelectorAll('.card')
                    var curr = elems[elems.length - 1];
                    if (curr) {
                        curr.parentNode.classList.add("animation_fadeout");
                        curr.parentNode.classList.add("hide");
                    }

                    if (data.questions[questionId]) {
                        dataLocal.ques = data.questions[questionId];
                        dataLocal.div = document.createElement('div');
                        dataLocal.div.innerHTML = Mustache.render(unescape(this.getTemplate(dataLocal.ques.type)), dataLocal.ques);
                        cache.questionsCard.appendChild(dataLocal.div);
                        cache.nextLink.classList.remove('animation_scale_1')

                        setTimeout(function() {
                            cache.nextLinkClicked = false;
                        }, 500);


                        logDataToSend.uk = "scrn" + data.currentQuesNum + "_load";
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

                collectLogForCurrent: function(ques) {
                    var logDataToSend = {};
                    logDataToSend.uk = "scrn" + data.currentQuesNum + "_sbmt";
                    logDataToSend.c = "click";
                    logDataToSend.o = "scrn" + data.currentQuesNum;
                    logDataToSend.g = this.getFormatType(ques.type);
                    logDataToSend.s = this.getImageType(ques.type);
                    logDataToSend.v = ques.questionText;
                    logDataToSend.f = this.getAnswerOptions(ques);
                    logDataToSend.ra = this.getuserAnswers(data.currentQuesNum, ques.type);
                    if (ques.type == "rating")
                        logDataToSend.b = ques.stars.length;
                    App.surveyServices.logData(logDataToSend);


                },

                getuserAnswers: function(currenQues, type) {

                    var elemNum = parseInt(currenQues) - 1;
                    var card = document.getElementsByClassName('card')[elemNum];
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