document.addEventListener("DOMContentLoaded", runApp);

function runApp() {
    const config = new NewsConfig({
        apiKey: '8578cf6cf7104f77a2b30b8259c14ea6',
        baseUrl:'https://newsapi.org/v2'
    });
    let sources = ['abc-news', 'bbc-news', 'cnn', 'fox-news', 'the-new-york-times'];
    let newsService = new NewsService(config);
    let newsView = new NewsView();

    Init();
    subscribeForViewEvents();    
    uploadNews(sources[0]);


    function Init() {
        newsView.addSources(sources);
        newsView.Page = 1;
    }

    function uploadNews(source, page = 1) {
        newsService.getNews(source, page)
            .then(({articles, status}) => {
                newsView.clearNews();
                newsView.builtArticles(articles);
            });
    }

    function subscribeForViewEvents() {
        newsView.onSourceChange(source => {
            newsView.Page = 1;
            uploadNews(source);
        });
        newsView.onPageChange(page => uploadNews(newsView.CurrentSource, page));
    }
}
