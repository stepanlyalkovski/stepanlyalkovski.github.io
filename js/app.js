document.addEventListener("DOMContentLoaded", runApp);

function runApp() {
    const config = {
        apiKey: '8578cf6cf7104f77a2b30b8259c14ea6',
        baseUrl:'https://newsapi.org/v2',
        sources: ['abc-news', 'bbc-news', 'cnn', 'fox-news', 'the-new-york-times']
    };
    let newsService = new NewsService(config);
    let newsView = new NewsView();

    Init();
    subscribeForViewEvents();    
    uploadNews(config.sources[0]);


    function Init() {
        newsView.addSources(config.sources);
        newsView.Page = 1;
    }

    function uploadNews(source, page = 1) {
        newsService.getNews(source, page)
            .then(({articles}) => {
                newsView.clearNews();
                newsView.buildArticles(articles);
            })
            .catch(error => {
                newsView.clearNews();
                newsView.printError(error);
            });
    }

    function subscribeForViewEvents() {
        newsView.onSourceChange(source => {
            newsView.Page = 1;
            uploadNews(source);
        });
        newsView.onPageChange(page => {
            if (page <= 0) {
                return;
            }

            uploadNews(newsView.CurrentSource, page);
        });
    }
}
