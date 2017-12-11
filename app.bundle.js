webpackJsonp([0],{334:function(e,n,t){"use strict";function r(){function e(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;console.log("Upload news form News API"),t.getNews(e,n).then(function(e){var n=e.articles;r.clearNews(),r.buildArticles(n)}).catch(function(e){console.error("Oops. Error"),r.clearNews(),r.printError(e)})}console.log("App has started");var n={apiKey:"8578cf6cf7104f77a2b30b8259c14ea6",baseUrl:"https://newsapi.org/v2",sources:["abc-news","bbc-news","cnn","fox-news","the-new-york-times"]},t=new i.NewsService(n),r=new o.NewsView;!function(){console.log("App Initialization"),r.addSources(n.sources),r.Page=1}(),function(){console.log("Subscribe for events from View"),r.onSourceChange(function(n){r.Page=1,e(n)}),r.onPageChange(function(n){n<=0||e(r.CurrentSource,n)})}(),e(n.sources[0])}Object.defineProperty(n,"__esModule",{value:!0}),n.default=r;var o=t(335),i=t(337);t(338)},335:function(e,n,t){"use strict";function r(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0}),n.NewsView=void 0;var o=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}(),i=t(336),a=function(e){return e&&e.__esModule?e:{default:e}}(i),s=function(){function e(){r(this,e),console.log("Initialize DOM elements..."),this._sourceSelectControl=document.querySelector("#newsSources"),this._newsContainerElement=document.querySelector("#news-container"),this._pageInputControl=document.querySelector("#page-control")}return o(e,[{key:"onSourceChange",value:function(e){this._sourceSelectControl.addEventListener("change",function(n){return e(n.target.value)})}},{key:"onPageChange",value:function(e){this._pageInputControl.addEventListener("change",function(n){return e(n.target.value)})}},{key:"addSources",value:function(e){var n=!0,t=!1,r=void 0;try{for(var o,i=e[Symbol.iterator]();!(n=(o=i.next()).done);n=!0){var a=o.value,s=document.createElement("option");s.text=a,this._sourceSelectControl.add(s)}}catch(e){t=!0,r=e}finally{try{!n&&i.return&&i.return()}finally{if(t)throw r}}}},{key:"buildArticle",value:function(n){var t=new Date(n.publishedAt),r=new DOMParser,o=r.parseFromString(a.default,"text/html").querySelector(".news-article");e.setElementValue(o,".news-title",n.title),e.setElementValue(o,".news-description",n.description),e.setElementValue(o,".news-author",n.author),e.setElementValue(o,".news-publish-date",t.toLocaleDateString()),e.setElementAttribute(o,"img","src",n.urlToImage),e.setElementAttribute(o,".news-url","href",n.url),e.setElementAttribute(o,".news-publish-date","datetime",n.publishedAt),this._newsContainerElement.appendChild(o)}},{key:"buildArticles",value:function(e){var n=!0,t=!1,r=void 0;try{for(var o,i=e[Symbol.iterator]();!(n=(o=i.next()).done);n=!0){var a=o.value;this.buildArticle(a)}}catch(e){t=!0,r=e}finally{try{!n&&i.return&&i.return()}finally{if(t)throw r}}}},{key:"clearNews",value:function(){this._newsContainerElement.innerHTML=""}},{key:"printError",value:function(e){var n=this,t=document.createElement("p");t.classList.add("error"),t.innerHTML="Something went wrong. "+e+".",this._newsContainerElement.appendChild(t),setTimeout(function(){return n._newsContainerElement.removeChild(t)},1e4)}},{key:"Page",get:function(){return this._pageInputControl.value},set:function(e){Number.isInteger(e)&&(this._pageInputControl.value=e)}},{key:"CurrentSource",get:function(){return this._sourceSelectControl.value}}],[{key:"setElementValue",value:function(e,n,t){e.querySelector(n).innerHTML=t}},{key:"setElementAttribute",value:function(e,n,t,r){if(null!=r){e.querySelector(n).setAttribute(t,r)}}}]),e}();n.NewsView=s},336:function(e,n){e.exports='<article class="news-article">\r\n    <header>\r\n        <h1 class="news-title"></h1>\r\n    </header>\r\n    <section class="news-content">\r\n        <img class="news-image">\r\n        <p class="news-description"></p>\r\n        <a target="_blank" class="news-url">Read more</a>\r\n    </section>\r\n    <footer>\r\n        Published on\r\n        <time class="news-publish-date"></time>\r\n        by <span class="news-author"></span>.\r\n    </footer>\r\n</article>'},337:function(e,n,t){"use strict";function r(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var o=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}(),i=function(){function e(n){var t=n.apiKey,o=n.baseUrl;r(this,e),this._apiKey=t,this._baseUrl=o}return o(e,[{key:"getNews",value:function(n,t){var r=this._baseUrl+"/everything?sources="+n+"&page="+t,o=new Request(r,{headers:new Headers({"X-Api-Key":this._apiKey})});return fetch(o).then(e.handleErrors).then(function(e){return e.json()})}}],[{key:"handleErrors",value:function(e){if(console.log("checking http response status..."),!e.ok)throw Error(e.statusText);return e}}]),e}();n.NewsService=i},338:function(e,n,t){var r=t(339);"string"==typeof r&&(r=[[e.i,r,""]]);var o={hmr:!0};o.transform=void 0;t(125)(r,o);r.locals&&(e.exports=r.locals)},339:function(e,n,t){n=e.exports=t(124)(void 0),n.push([e.i,"body {\n  font-family: 'Roboto', sans-serif;\n  background-color: white; }\n\nmain {\n  margin: 5px 25px; }\n\n.copyright {\n  color: #fff; }\n\n#news-container {\n  display: flex;\n  flex-wrap: wrap;\n  margin-top: 30px; }\n\n.news-article {\n  width: 575px;\n  margin-right: auto;\n  margin-left: auto;\n  margin-bottom: 50px;\n  padding: 20px 25px;\n  font-size: 16px;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  border-radius: 5px;\n  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);\n  transition: 0.3s;\n  animation-name: news-article-added;\n  animation-duration: 0.7s; }\n  .news-article:hover {\n    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2); }\n  .news-article footer {\n    color: #737373; }\n\n.news-title {\n  font-size: 24px;\n  text-align: center;\n  font-weight: bold;\n  color: rgba(0, 0, 0, 0.77); }\n\n.news-image {\n  display: block;\n  width: 80%;\n  height: auto;\n  max-height: 300px;\n  margin: 20px auto;\n  border-radius: 5px; }\n\n.news-description {\n  margin-bottom: 5px; }\n\n.news-content {\n  margin-bottom: 20px; }\n\n.form-control:focus {\n  border-color: #ced4da;\n  box-shadow: initial; }\n\n.error {\n  color: red;\n  font-size: 16px; }\n\n@keyframes news-article-added {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@media screen and (max-width: 600px) {\n  main {\n    margin: 5px 10px; }\n  #news-container {\n    margin-top: 0; }\n  .news-article {\n    width: 98%;\n    margin-bottom: 15px;\n    padding: 10px 15px;\n    font-size: 18px;\n    border-radius: 2px; }\n  .news-image {\n    width: 95%;\n    height: auto;\n    margin: 10px auto;\n    border-radius: 2px; }\n  .news-title {\n    font-size: 26px; } }\n",""])}});