import NewsView from './newsView';
import NewsServiceProxy from './NewsServiceProxy';
import NewsPresenter from './NewsPresenter';
import ArticleListPresenter from './ArticleListPresenter';
import ArticleList from './ArticleList';
import ArticleListView from './ArticleListView';
import ArticleViewFactory from './ArticleViewFactory';
import '../css/style.scss'

export default function runApp() {
    debugger;
    console.log('App has started');
    const config = {
        apiKey: '8578cf6cf7104f77a2b30b8259c14ea6',
        baseUrl:'https://newsapi.org/v2',
        sources: ['abc-news', 'bbc-news', 'cnn', 'fox-news', 'the-new-york-times']
    };
    let newsService = new NewsServiceProxy(config);
    let articleList = new ArticleList();
    let articleFactory = new ArticleViewFactory();

    let newsView = new NewsView();
    let articleListView = new ArticleListView();

    let articleListPresenter = new ArticleListPresenter(articleFactory, articleListView, articleList);
    let newsPresenter = new NewsPresenter(config, newsService, newsView, articleList);
}
