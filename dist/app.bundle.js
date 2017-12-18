webpackJsonp([0],{

/***/ 335:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = runApp;

var _newsView = __webpack_require__(336);

var _newsService = __webpack_require__(338);

__webpack_require__(339);

function runApp() {
    console.log('App has started dumb');
    var config = {
        apiKey: '8578cf6cf7104f77a2b30b8259c14ea6',
        baseUrl: 'https://newsapi.org/v2',
        sources: ['abc-news', 'bbc-news', 'cnn', 'fox-news', 'the-new-york-times']
    };
    var newsService = new _newsService.NewsService(config);
    var newsView = new _newsView.NewsView();

    Init();
    subscribeForViewEvents();
    uploadNews(config.sources[0]);

    function Init() {
        console.log('App Initialization');
        newsView.addSources(config.sources);
        newsView.Page = 1;
    }

    function uploadNews(source) {
        var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

        console.log('Upload news form News API');
        newsService.getNews(source, page).then(function (_ref) {
            var articles = _ref.articles;

            newsView.clearNews();
            newsView.buildArticles(articles);
        }).catch(function (error) {
            console.error('Oops. Error');
            newsView.clearNews();
            newsView.printError(error);
        });
    }

    function subscribeForViewEvents() {
        console.log('Subscribe for events from View');
        newsView.onSourceChange(function (source) {
            newsView.Page = 1;
            uploadNews(source);
        });
        newsView.onPageChange(function (page) {
            if (page <= 0) {
                return;
            }

            uploadNews(newsView.CurrentSource, page);
        });
    }
}

/***/ }),

/***/ 336:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NewsView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _articleTemplate = __webpack_require__(337);

var _articleTemplate2 = _interopRequireDefault(_articleTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NewsView = function () {
    function NewsView() {
        _classCallCheck(this, NewsView);

        console.log('Initialize DOM elements...');
        this._sourceSelectControl = document.querySelector('#newsSources');
        this._newsContainerElement = document.querySelector('#news-container');
        this._pageInputControl = document.querySelector('#page-control');
    }

    _createClass(NewsView, [{
        key: 'onSourceChange',
        value: function onSourceChange(callback) {
            this._sourceSelectControl.addEventListener('change', function (event) {
                return callback(event.target.value);
            });
        }
    }, {
        key: 'onPageChange',
        value: function onPageChange(callback) {
            this._pageInputControl.addEventListener('change', function (event) {
                return callback(event.target.value);
            });
        }
    }, {
        key: 'addSources',
        value: function addSources(sources) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = sources[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var source = _step.value;

                    var option = document.createElement('option');
                    option.text = source;
                    this._sourceSelectControl.add(option);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: 'buildArticle',
        value: function buildArticle(article) {
            var publishedDate = new Date(article.publishedAt);
            var domParser = new DOMParser();
            var articleElement = domParser.parseFromString(_articleTemplate2.default, 'text/html').querySelector('.news-article');

            NewsView.setElementValue(articleElement, '.news-title', article.title);
            NewsView.setElementValue(articleElement, '.news-description', article.description);
            NewsView.setElementValue(articleElement, '.news-author', article.author);
            NewsView.setElementValue(articleElement, '.news-publish-date', publishedDate.toLocaleDateString());

            NewsView.setElementAttribute(articleElement, 'img', 'src', article.urlToImage);
            NewsView.setElementAttribute(articleElement, '.news-url', 'href', article.url);
            NewsView.setElementAttribute(articleElement, '.news-publish-date', 'datetime', article.publishedAt);

            this._newsContainerElement.appendChild(articleElement);
        }
    }, {
        key: 'buildArticles',
        value: function buildArticles(articles) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = articles[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var article = _step2.value;

                    this.buildArticle(article);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    }, {
        key: 'clearNews',
        value: function clearNews() {
            this._newsContainerElement.innerHTML = '';
        }
    }, {
        key: 'printError',
        value: function printError(errorMessage) {
            var _this = this;

            var errorElement = document.createElement("p");
            errorElement.classList.add('error');
            errorElement.innerHTML = 'Something went wrong. ' + errorMessage + '.';
            this._newsContainerElement.appendChild(errorElement);
            setTimeout(function () {
                return _this._newsContainerElement.removeChild(errorElement);
            }, 10000);
        }
    }, {
        key: 'Page',
        get: function get() {
            return this._pageInputControl.value;
        },
        set: function set(page) {
            if (!Number.isInteger(page)) {
                return;
            }

            this._pageInputControl.value = page;
        }
    }, {
        key: 'CurrentSource',
        get: function get() {
            return this._sourceSelectControl.value;
        }
    }], [{
        key: 'setElementValue',
        value: function setElementValue(baseElement, selector, value) {
            var element = baseElement.querySelector(selector);
            element.innerHTML = value;
        }
    }, {
        key: 'setElementAttribute',
        value: function setElementAttribute(baseElement, selector, attribute, value) {
            if (value == null) {
                return;
            }

            var element = baseElement.querySelector(selector);
            element.setAttribute(attribute, value);
        }
    }]);

    return NewsView;
}();

exports.NewsView = NewsView;

/***/ }),

/***/ 337:
/***/ (function(module, exports) {

module.exports = "<article class=\"news-article\">\r\n    <header>\r\n        <h1 class=\"news-title\"></h1>\r\n    </header>\r\n    <section class=\"news-content\">\r\n        <img class=\"news-image\">\r\n        <p class=\"news-description\"></p>\r\n        <a target=\"_blank\" class=\"news-url\">Read more</a>\r\n    </section>\r\n    <footer>\r\n        Published on\r\n        <time class=\"news-publish-date\"></time>\r\n        by <span class=\"news-author\"></span>.\r\n    </footer>\r\n</article>"

/***/ }),

/***/ 338:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NewsService = function () {
    function NewsService(_ref) {
        var apiKey = _ref.apiKey,
            baseUrl = _ref.baseUrl;

        _classCallCheck(this, NewsService);

        this._apiKey = apiKey;
        this._baseUrl = baseUrl;
    }

    _createClass(NewsService, [{
        key: 'getNews',
        value: function getNews(source, page) {
            var url = this._baseUrl + '/everything?sources=' + source + '&page=' + page;
            var request = new Request(url, {
                headers: new Headers({
                    'X-Api-Key': this._apiKey
                })
            });

            return fetch(request).then(NewsService.handleErrors).then(function (resp) {
                return resp.json();
            });
        }
    }], [{
        key: 'handleErrors',
        value: function handleErrors(response) {
            console.log('checking http response status...');
            if (!response.ok) {
                throw Error(response.statusText);
            }

            return response;
        }
    }]);

    return NewsService;
}();

exports.NewsService = NewsService;

/***/ }),

/***/ 339:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(340);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(125)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./style.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./style.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 340:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(124)(undefined);
// imports


// module
exports.push([module.i, "body {\n  font-family: 'Roboto', sans-serif;\n  background-color: white; }\n\nmain {\n  margin: 5px 25px; }\n\n.copyright {\n  color: #fff; }\n\n#news-container {\n  display: flex;\n  flex-wrap: wrap;\n  margin-top: 30px; }\n\n.news-article {\n  width: 575px;\n  margin-right: auto;\n  margin-left: auto;\n  margin-bottom: 50px;\n  padding: 20px 25px;\n  font-size: 16px;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  border-radius: 5px;\n  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);\n  transition: 0.3s;\n  animation-name: news-article-added;\n  animation-duration: 0.7s; }\n  .news-article:hover {\n    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2); }\n  .news-article footer {\n    color: #737373; }\n\n.news-title {\n  font-size: 24px;\n  text-align: center;\n  font-weight: bold;\n  color: rgba(0, 0, 0, 0.77); }\n\n.news-image {\n  display: block;\n  width: 80%;\n  height: auto;\n  max-height: 300px;\n  margin: 20px auto;\n  border-radius: 5px; }\n\n.news-description {\n  margin-bottom: 5px; }\n\n.news-content {\n  margin-bottom: 20px; }\n\n.form-control:focus {\n  border-color: #ced4da;\n  box-shadow: initial; }\n\n.error {\n  color: red;\n  font-size: 16px; }\n\n@keyframes news-article-added {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@media screen and (max-width: 600px) {\n  main {\n    margin: 5px 10px; }\n  #news-container {\n    margin-top: 0; }\n  .news-article {\n    width: 98%;\n    margin-bottom: 15px;\n    padding: 10px 15px;\n    font-size: 18px;\n    border-radius: 2px; }\n  .news-image {\n    width: 95%;\n    height: auto;\n    margin: 10px auto;\n    border-radius: 2px; }\n  .news-title {\n    font-size: 26px; } }\n", ""]);

// exports


/***/ })

});