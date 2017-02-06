'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Api = exports.Api = function Api(config) {
    var promise = new Promise(function (resolve) {

        if (!config.method) {
            config.method = 'GET';
        }

        if (config.data) {
            config.data = JSON.stringify(config.data);
        }

        var request = new XMLHttpRequest();

        config.route = buildQueryString(config).route;

        request.open(config.method, config.route, true);

        setRequestHeaders(request, config);

        addAjaxEvents(request, config, resolve);

        request.send(config.data || null);
    });

    return promise;
};

var setRequestHeaders = exports.setRequestHeaders = function setRequestHeaders() {
    var request = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


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

            request.setRequestHeader(key, config.headers[key]);
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
};

var addAjaxEvents = exports.addAjaxEvents = function addAjaxEvents(request, config, resolver) {

    var getResponse = function getResponse() {
        try {
            resolver(JSON.parse(request.responseText));
        } catch (e) {
            /* eslint-disable no-console */
            console.log(e);
            /* eslint-enable no-console */
        }
    };

    request.addEventListener('load', getResponse.bind(config.onSuccess, config.onSuccess));
};

var buildQueryString = exports.buildQueryString = function buildQueryString() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


    var ret = {
        route: config.route + '?_dc=' + Date.now() + '&'
    };

    if (!config.queryStringParams) {
        return ret;
    }

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = Object.keys(config.queryStringParams)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var key = _step2.value;

            if (config.queryStringParams[key]) {
                ret.route += key + '=' + config.queryStringParams[key] + '&';
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

    return ret;
};

exports.default = Api;