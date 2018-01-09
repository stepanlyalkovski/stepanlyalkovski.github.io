import ArticleView from './articleView';

function ArticleViewFactory() {}

ArticleViewFactory.prototype.createArticleView = function (article) {
  let articleView = new ArticleView();
  let publishedDate = new Date(article.publishedAt);

  articleView.setTitle(article.title);
  articleView.setDescription(article.description);
  articleView.setImage(article.urlToImage);
  articleView.setAuthor(article.author);
  articleView.setPublishDate(publishedDate, publishedDate.toLocaleDateString());
  articleView.setSource(article.url);

  return articleView;
};

export default ArticleViewFactory;