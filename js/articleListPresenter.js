
class ArticleListPresenter {
    constructor(articleFactory, articleListView, articleList) {
        this._newsContainerElement = document.querySelector('#news-container');
        this._articleFactory = articleFactory;
        this._articleListView = articleListView;

        articleList.onArticleListChange(articles => this.buildArticles(articles));
    }

    buildArticle(article) {
        let createdArticleView = this._articleFactory.createArticleView(article);
        this._articleListView.addArticleView(createdArticleView.view);
    }

    buildArticles(articles) {
        this._articleListView.clearArticles();
        for(let article of articles) {
            this.buildArticle(article);
        }
    }
}

export default ArticleListPresenter;