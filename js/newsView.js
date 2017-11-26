const articleMarkup = `
    <article class="news-article">
        <header>
            <h1 class="news-title"></h1>
        </header>
        <section class="news-content">
            <img class="news-image">
            <p class="news-description"></p>
            <a target="_blank" class="news-url">Read more</a>
        </section>
        <footer>
            Published on
            <time class="news-publish-date"></time>
            by <span class="news-author"></span>.
        </footer>
    </article>
`.trim();

class NewsView {
    constructor() {
        this._sourceSelectControl = document.querySelector('#newsSources');
        this._newsContainerElement = document.querySelector('#news-container');
        this._pageInputControl = document.querySelector('#page-control');
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
        this._sourceSelectControl.addEventListener('change', event => callback(event.target.value));
    }

    onPageChange(callback) {
        this._pageInputControl.addEventListener('change', event => callback(event.target.value));
    }

    addSources(sources) {
        for(let source of sources) {
            let option = document.createElement('option');
            option.text = source;
            this._sourceSelectControl.add(option);
        }
    }

    builtArticle(article) {
        let publishedDate = new Date(article.publishedAt)
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

    builtArticles(articles) {
        for(let article of articles) {
            this.builtArticle(article);
        }
    }

    clearNews() {
        this._newsContainerElement.innerHTML = '';
    }

    static setElementValue(baseElement, selector, value) {
        let element = baseElement.querySelector(selector);
        element.innerHTML = value;
    }

    static setElementAttribute(baseElement, selector, attribute, value) {
        if (value == null) {
            return;
        }

        let element = baseElement.querySelector(selector);
        element.setAttribute(attribute, value); 
    }
}