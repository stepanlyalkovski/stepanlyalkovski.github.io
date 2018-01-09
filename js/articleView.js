import articleTemplate from './templates/article-template.html';
import View from './ViewDecorator';

@View
class ArticleView {
   constructor() {
        this.view = this.parseArticleTemplate(this.articleTemplate);
   }

   setTitle(title) {
       ArticleView.setElementValue(this.view, this.articleElements.title, title);
   }

   setImage(imageUrl) {
       ArticleView.setElementAttribute(this.view, this.articleElements.image, 'src', imageUrl);
   }

   setDescription(text) {
       ArticleView.setElementValue(this.view, this.articleElements.description, text);
   }

   setAuthor(author) {
       ArticleView.setElementValue(this.view, this.articleElements.author, author);
   }

   setPublishDate(publishDate, localDate) {
       ArticleView.setElementValue(this.view, this.articleElements.publishDate, localDate);
       ArticleView.setElementAttribute(this.view, this.articleElements.publishDate, 'datetime', publishDate);
   }

   setSource(sourceUrl) {
       ArticleView.setElementAttribute(this.view, this.articleElements.sourceUrl, 'href', sourceUrl)
   }
}

ArticleView.prototype.articleTemplate = articleTemplate;

ArticleView.prototype.parseArticleTemplate = function (markup) {
    let domParser = new DOMParser();
    return domParser.parseFromString(markup, 'text/html').querySelector('.news-article');
};

ArticleView.prototype.articleElements = {
    title: '.news-title',
    image: 'img',
    description: '.news-description',
    author: '.news-author',
    publishDate: '.news-publish-date',
    sourceUrl: '.news-url'
};

export default ArticleView;