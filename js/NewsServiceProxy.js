import {NewsService} from './NewsService';

class NewsServiceProxy extends NewsService {
    constructor(config) {
        super(config);
        this.cache = {};
        this.cacheRequrestCountLimit = 5;
    }

    getNews(source, page) {
        this.checkIfCacheExpired();
        if (page !== 1 && this.cache.source === source && this.cache.page === page) {
            this.cache.useCount++;
            return Promise.resolve(this.cache.data);
        }

        return super.getNews(source, page).then(data => {
            if (page !== 1 && !this.cache.source) {
                this.cache.source = source;
                this.cache.page = page;
                this.cache.data = data;
                this.cache.useCount = 0;
            }

            return data;
        })
    }

    checkIfCacheExpired() {
        if(this.cache.useCount === undefined || this.cache.useCount < this.cacheRequrestCountLimit) {
            return;
        }

        this.cache = {};
    }
}

export default NewsServiceProxy;