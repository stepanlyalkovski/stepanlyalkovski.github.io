import EventObserver from './EventObservable';

class ArticleList {
    constructor() {
        this.data = [];
        this._dataChangedObservable = new EventObserver();
    }

    setArticles(articles) {
        this.data = articles;
        this._dataChangedObservable.broadcast(this.data);
    }

    onArticleListChange(callback) {
        return this._dataChangedObservable.subscribe(callback);
    }
}

export default ArticleList;