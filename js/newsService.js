class NewsService {
    constructor(newsConfig) {
        this._newsConfig = newsConfig;
    }

    getNews(source, page) {
        let {baseUrl, apiKey} = this._newsConfig;
        let url = `${baseUrl}/everything?sources=${source}&page=${page}`;
        let request = new Request(url, {
            headers: new Headers({
                'X-Api-Key': apiKey
            })
        });

        return fetch(request)
            .then(resp => resp.json());
    }
}