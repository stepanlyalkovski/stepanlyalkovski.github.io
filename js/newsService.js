class NewsService {
    constructor({apiKey, baseUrl}) {
        this._apiKey = apiKey;
        this._baseUrl = baseUrl
    }

    getNews(source, page) {
        let url = `${this._baseUrl}/everything?sources=${source}&page=${page}`;
        let request = new Request(url, {
            headers: new Headers({
                'X-Api-Key': this._apiKey
            })
        });

        return fetch(request)
            .then(NewsService.handleErrors)
            .then(resp => resp.json());
    }

    static handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }

        return response;
    }
}
