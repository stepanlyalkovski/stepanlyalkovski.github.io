'use strict';

document.addEventListener("DOMContentLoaded", runApp);

function runApp() {
    var config = {
        apiKey: '8578cf6cf7104f77a2b30b8259c14ea6',
        baseUrl: 'https://newsapi.org/v2',
        sources: ['abc-news', 'bbc-news', 'cnn', 'fox-news', 'the-new-york-times']
    };
    var newsService = new NewsService(config);
    var newsView = new NewsView();

    Init();
    subscribeForViewEvents();
    uploadNews(config.sources[0]);

    function Init() {
        newsView.addSources(config.sources);
        newsView.Page = 1;
    }

    function uploadNews(source) {
        var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

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
'use strict';

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
            if (!response.ok) {
                throw Error(response.statusText);
            }

            return response;
        }
    }]);

    return NewsService;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var articleMarkup = '\n    <article class="news-article">\n        <header>\n            <h1 class="news-title"></h1>\n        </header>\n        <section class="news-content">\n            <img class="news-image">\n            <p class="news-description"></p>\n            <a target="_blank" class="news-url">Read more</a>\n        </section>\n        <footer>\n            Published on\n            <time class="news-publish-date"></time>\n            by <span class="news-author"></span>.\n        </footer>\n    </article>\n'.trim();

var NewsView = function () {
    function NewsView() {
        _classCallCheck(this, NewsView);

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
            var articleElement = domParser.parseFromString(articleMarkup, 'text/html').querySelector('.news-article');

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

//# sourceMappingURL=app.js.map