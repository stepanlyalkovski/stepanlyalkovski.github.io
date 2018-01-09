import articleMarkup from './templates/article-template.html';
import EventObserver from './EventObservable';
import View from './ViewDecorator';

@View
class NewsView {
    constructor() {
        console.log('Initialize DOM elements...');
        this._sourceSelectControl = document.querySelector('#newsSources');
        this._newsContainerElement = document.querySelector('#news-container');
        this._pageInputControl = document.querySelector('#page-control');
        this._sourceChangeObservable = new EventObserver();
        this._pageChangeObservable = new EventObserver();


        this._sourceSelectControl.addEventListener('change', event => this._sourceChangeObservable.broadcast(event.target.value));
        this._pageInputControl.addEventListener('change', event => this._pageChangeObservable.broadcast(event.target.value));
    }

    get Page() {
        return this._pageInputControl.value;
    }

    set Page(page) {
        if (!Number.isInteger(page)) {
            return;
        }

        this._pageInputControl.value = page;
    }

    get CurrentSource() {
        return this._sourceSelectControl.value;
    }

    onSourceChange(callback) {
        this._sourceChangeObservable.subscribe(callback);
    }

    onPageChange(callback) {
        this._pageChangeObservable.subscribe(callback);
    }

    addSources(sources) {
        for(let source of sources) {
            let option = document.createElement('option');
            option.text = source;
            this._sourceSelectControl.add(option);
        }
    }

    buildArticle(article) {
        let publishedDate = new Date(article.publishedAt);
        let domParser = new DOMParser();
        let articleElement = domParser.parseFromString(articleMarkup, 'text/html').querySelector('.news-article');

        NewsView.setElementValue(articleElement, '.news-title', article.title);
        NewsView.setElementValue(articleElement, '.news-description', article.description);
        NewsView.setElementValue(articleElement, '.news-author', article.author);
        NewsView.setElementValue(articleElement, '.news-publish-date', publishedDate.toLocaleDateString());

        NewsView.setElementAttribute(articleElement, 'img', 'src', article.urlToImage);
        NewsView.setElementAttribute(articleElement, '.news-url', 'href', article.url);
        NewsView.setElementAttribute(articleElement, '.news-publish-date', 'datetime', article.publishedAt);

        this._newsContainerElement.appendChild(articleElement);
    }

    buildArticles(articles) {
        for(let article of articles) {
            this.buildArticle(article);
        }
    }

    clearNews() {
        this._newsContainerElement.innerHTML = '';
    }

    printError(errorMessage) {
        let errorElement = document.createElement("p");
        errorElement.classList.add('error');
        errorElement.innerHTML = `Something went wrong. ${errorMessage}.`;
        this._newsContainerElement.appendChild(errorElement);
        setTimeout(() => this._newsContainerElement.removeChild(errorElement), 10000);
    }
}

export default NewsView;