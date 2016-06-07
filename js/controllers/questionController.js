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