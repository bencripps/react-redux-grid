function api(config) {
    const promise = new Promise((resolve) => {

        if (!config.method) {
            config.method = 'GET';
        }

        if (!config.contentType) {
            config.contentType = 'application/jsonp';
        }

        if (config.data) {
            config.data = JSON.stringify(config.data);
        }

        if (config.header) {
            setRequestHeaders(request, config);
        }

        buildQueryString(config);

        const request = new XMLHttpRequest();

        request.open(config.method, config.route, true);

        addAjaxEvents(request, config, resolve);

        request.send(config.data || null);

    });

    return promise;
}

function setRequestHeaders(request, context, config) {

    for (const key of Object.keys(config.headers)) {
        request.setRequestHeader(key, config.additionalHeaders[key]);
    }
}

function addAjaxEvents(request, config, resolver) {

    const getResponse = () => {
        resolver(JSON.parse(request.responseText));
    };

    request.addEventListener('load', getResponse.bind(config.onSuccess, config.onSuccess));
}

function buildQueryString(config) {

    let builtUrl = config.route + '?' + '_dc=' + Date.now() + '&';

    if (!config.queryStringParams) {
        return config;
    }

    for (const key of Object.keys(config.queryStringParams)) {
        builtUrl += key + '=' + config.queryStringParams[key] + '&';
    }

    config.route = builtUrl;
}

const Request = {
    api: api
};

export default Request;
