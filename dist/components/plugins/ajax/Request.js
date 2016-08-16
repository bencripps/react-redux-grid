'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
function api(config) {
    var promise = new Promise(function (resolve) {

        if (!config.method) {
            config.method = 'GET';
        }

        if (config.data) {
            config.data = JSON.stringify(config.data);
        }

        var request = new XMLHttpRequest();

        buildQueryString(config);

        request.open(config.method, config.route, true);

        setRequestHeaders(request, config);

        addAjaxEvents(request, config, resolve);

        request.send(config.data || null);
    });

    return promise;
}

function setRequestHeaders(request, config) {

    if (!config.headers || !config.headers.contentType) {
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }

    if (!config.headers) {
        return false;
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = Object.keys(config.headers)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;

            request.setRequestHeader(key, config.additionalHeaders[key]);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
}

function addAjaxEvents(request, config, resolver) {

    var getResponse = function getResponse() {
        try {
            resolver(JSON.parse(request.responseText));
        } catch (e) {
            console.log(e);
        }
    };

    request.addEventListener('load', getResponse.bind(config.onSuccess, config.onSuccess));
}

function buildQueryString(config) {

    var builtUrl = config.route + '?' + '_dc=' + Date.now() + '&';

    if (!config.queryStringParams) {
        return config;
    }

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = Object.keys(config.queryStringParams)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var key = _step2.value;

            if (config.queryStringParams[key]) {
                builtUrl += key + '=' + config.queryStringParams[key] + '&';
            }
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    config.route = builtUrl;
}

var Request = {
    api: api
};

exports.default = Request;