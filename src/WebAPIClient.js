// --------------------------------------------------
//  WebAPI クライアント
//  (c) 2025 kanaaa224. All rights reserved.
// --------------------------------------------------

class WebAPIClient {
    constructor(endpoints_url = '', specify_api = 'v1') {
        this.endpoints_url = endpoints_url;
        this.specified_api = specify_api;

        this.endpoints      = null;
        this.called_history = [];

        this.endpoint = {};
        this.name     = '';
        this.url      = '';
    }

    async connect(endpoints_url = this.endpoints_url, specify_api = this.specified_api) {
        const response = await fetch(endpoints_url);
        const body     = await response.json();

        this.endpoints = body;

        this.endpoints_url = endpoints_url;
        this.specified_api = specify_api;

        this.endpoint = this.endpoints[this.specified_api];
        this.name     = this.endpoint.name;
        this.url      = this.endpoint.url;
    }

    async call(requestBody = {}, queries = {}) {
        if(!this.endpoints) throw new Error(`api-not-connected`);

        const url = new URL(this.endpoints[this.specified_api].url);

        for(const [ key, value ] of Object.entries(queries)) url.searchParams.set(key, value);

        const response = await fetch(url.toString(), { method: 'POST', body: JSON.stringify(requestBody) });
        const body     = await response.json();

        if(!body.status) throw new Error(`api-bad-status`);

        if(body.data.result != 'success') throw new Error(`api-call-result: failed - ${body.data.value}`);

        this.called_history.push({ called_at: new Date(), requestBody: requestBody, url: url });

        return body.data.value;
    }
}