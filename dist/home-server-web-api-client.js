/*
    (c) 2022 kanaaa224. All rights reserved.
*/

import WebAPIClient from 'https://cdn.jsdelivr.net/gh/kanaaa224/web-common@master/web-app-sources/web-api-client.js';

const DEFAULT_HOSTS_URL = 'https://cdn.jsdelivr.net/gh/kanaaa224/home-server-web-api@master/hosts.json';

class HomeServerWebAPIClient extends WebAPIClient {

    constructor(hostsURL = DEFAULT_HOSTS_URL, name = 'default', version = '') {
        super();

        this.hostsURL = hostsURL;
        this.name     = name;
        this.version  = version;

        this.hosts = null;
        this.host  = {};
    }

    async load(hostsURL = this.hostsURL) {
        const response = await fetch(hostsURL);
        const data     = await response.json();

        this.hostsURL = hostsURL;
        this.hosts    = data;
    }

    select(name = this.name, version = this.version) {
        this.host = this.hosts[`${name}${version !== '' ? `-${version}` : ''}`];

        this.defaultBaseURL = new URL(this.host.url);

        this.name    = name;
        this.version = version;
    }

    async prepare(hostsURL = this.hostsURL, name = this.name, version = this.version) {
        await this.load(hostsURL);

        this.select(name, version);
    }

}

export default HomeServerWebAPIClient;