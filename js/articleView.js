import articleTemplate from './templates/article-template.html';

class articleView {
   constructor(article) {
        this.view = this.parseArticleTemplate(this.articleTemplate);
        // addElementValues();
        //
        // function addElementValues() {
        //     let publishedDate = new Date(article.publishedAt);
        //
        //     NewsView.setElementValue(articleElement, this.articleElements.title, article.title);
        //     NewsView.setElementValue(articleElement, this.articleElements.description, article.description);
        //     NewsView.setElementValue(articleElement, this.articleElements.author, article.author);
        //     NewsView.setElementValue(articleElement, this.articleElements.publishDate, publishedDate.toLocaleDateString());
        // }
        //
        // function addAttributes() {
        //     NewsView.setElementAttribute(articleElement, this.articleElements.image, 'src', article.urlToImage);
        //     NewsView.setElementAttribute(articleElement, this.articleElements.sourceUrl, 'href', article.url);
        //     NewsView.setElementAttribute(articleElement, this.articleElements.publishDate, 'datetime', article.publishedAt);
        //
        //
        // }
   }


}
articleView.prototype.articleTemplate = articleTemplate;

articleView.prototype.parseArticleTemplate = function (markup) {
    let domParser = new DOMParser();
    return domParser.parseFromString(markup, 'text/html').querySelector('.news-article');
};

articleView.prototype.articleElements = {
    title: '.news-title',
    image: 'img',
    description: '.news-description',
    author: '.news-author',
    publishDate: '.news-publish-date',
    sourceUrl: '.news-url'
};