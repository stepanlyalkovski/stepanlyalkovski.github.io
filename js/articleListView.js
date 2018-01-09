
class ArticleListView {
    constructor() {
        this._newsContainerElement = document.querySelector('#news-container');
    }

    addArticleView(articleView) {
        this._newsContainerElement.appendChild(articleView);
    }

    clearArticles() {
        this._newsContainerElement.innerHTML = '';
    }
}

export default ArticleListView;