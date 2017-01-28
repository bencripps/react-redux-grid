export const Api = (config) => {
    const promise = new Promise((resolve) => {

        if (!config.method) {
            config.method = 'GET';
        }

        if (config.data) {
            config.data = JSON.stringify(config.data);
        }

        const request = new XMLHttpRequest();

        config.route = buildQueryString(config).route;

        request.open(config.method, config.route, true);

        setRequestHeaders(request, config);

        addAjaxEvents(request, config, resolve);

        request.send(config.data || null);

    });

    return promise;
};

export const setRequestHeaders = (request = {}, config = {}) => {

    if (!config.headers || !config.headers.contentType) {
        request.setRequestHeader(
            'Content-Type', 'application/x-www-form-urlencoded'
        );
    }

    if (!config.headers) {
        return false;
    }

    for (const key of Object.keys(config.headers)) {
        request.setRequestHeader(key, config.headers[key]);
    }
};

export const addAjaxEvents = (request, config, resolver) => {

    const getResponse = () => {
        try {
            resolver(JSON.parse(request.responseText));
        }
        catch (e) {
            /* eslint-disable no-console */
            console.log(e);
            /* eslint-enable no-console */
        }
    };

    request.addEventListener(
        'load', getResponse.bind(config.onSuccess, config.onSuccess)
    );
};

export const buildQueryString = (config = {}) => {

    const ret = {
        route: config.route + '?' + '_dc=' + Date.now() + '&'
    };

    if (!config.queryStringParams) {
        return ret;
    }

    for (const key of Object.keys(config.queryStringParams)) {
        if (config.queryStringParams[key]) {
            ret.route += key + '=' + config.queryStringParams[key] + '&';
        }
    }

    return ret;
};

export default Api;
