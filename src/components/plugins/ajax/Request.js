function api(config) {
    const promise = new Promise((resolve) => {

        if (!config.method) {
            config.method = 'GET';
        }

        if (config.data) {
            config.data = JSON.stringify(config.data);
        }

        const request = new XMLHttpRequest();

        request.open(config.method, config.route, true);

        buildQueryString(config);

        setRequestHeaders(request, config);

        addAjaxEvents(request, config, resolve);

        request.send(config.data || null);

    });

    return promise;
}

function setRequestHeaders(request, config) {

    if (!config.headers || !config.headers.contentType) {
        request.setRequestHeader(
            'Content-Type', 'application/x-www-form-urlencoded'
        );
    }

    if (!config.headers) {
        return false;
    }

    for (const key of Object.keys(config.headers)) {
        request.setRequestHeader(key, config.additionalHeaders[key]);
    }
}

function addAjaxEvents(request, config, resolver) {

    const getResponse = () => {
        try {
            resolver(JSON.parse(request.responseText));
        }

        catch (e) {
            console.log(e);
        }
    };

    request.addEventListener(
        'load', getResponse.bind(config.onSuccess, config.onSuccess)
    );
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
