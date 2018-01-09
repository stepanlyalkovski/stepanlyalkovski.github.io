
class NewsPresenter {
    constructor(config, newsService, newsView, articleList) {
        this.newsService =newsService;
        this.newsView = newsView;
        this.articleList = articleList;
        this.newsView.addSources(config.sources);
        this.newsView.Page = 1;

        this.subscribeForViewEvents();
        this.uploadNews(config.sources[0]);
    }

    uploadNews(source, page = 1) {
        console.log('Upload news form News API');
        this.newsService.getNews(source, page)
            .then(({articles}) => {
                this.articleList.setArticles(articles);
                // this.newsView.clearNews();
                // this.newsView.buildArticles(articles);
            })
            .catch(error => {
                console.error('Oops. Error');
                //this.newsView.clearNews();
                //this.newsView.printError(error);
            });
    }

    subscribeForViewEvents() {
        console.log('Subscribe for events from View');
        this.newsView.onSourceChange(source => {
            this.newsView.Page = 1;
            this.uploadNews(source);
        });
        this.newsView.onPageChange(page => {
            if (page <= 0) {
                return;
            }

            this.uploadNews(this.newsView.CurrentSource, page);
        });
    }
}

export default NewsPresenter;