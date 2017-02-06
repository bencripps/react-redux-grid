'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setPageAsync = exports.setPageIndexAsync = exports.setPage = undefined;

var _ActionTypes = require('../../../constants/ActionTypes');

var _LoaderActions = require('../../../actions/plugins/loader/LoaderActions');

var _EditorActions = require('../../../actions/plugins/editor/EditorActions');

var _api = require('../../../util/api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var setPage = exports.setPage = function setPage(_ref) {
    var index = _ref.index,
        type = _ref.type,
        BUTTON_TYPES = _ref.BUTTON_TYPES;

    var pageIndex = type === BUTTON_TYPES.NEXT ? index + 1 : index - 1;

    return { type: _ActionTypes.PAGE_LOCAL, pageIndex: pageIndex };
};

var setPageIndexAsync = exports.setPageIndexAsync = function setPageIndexAsync(_ref2) {
    var pageIndex = _ref2.pageIndex,
        pageSize = _ref2.pageSize,
        dataSource = _ref2.dataSource,
        filterFields = _ref2.filterFields,
        sort = _ref2.sort,
        stateKey = _ref2.stateKey,
        afterAsyncFunc = _ref2.afterAsyncFunc;


    if (typeof dataSource === 'function') {

        return function (dispatch) {

            dispatch((0, _EditorActions.dismissEditor)({ stateKey: stateKey }));

            dispatch((0, _LoaderActions.setLoaderState)({ state: true, stateKey: stateKey }));

            dataSource({ pageIndex: pageIndex, pageSize: pageSize }, filterFields, sort).then(function (response) {

                if (response && response.data) {

                    dispatch({
                        type: _ActionTypes.PAGE_REMOTE,
                        pageIndex: pageIndex,
                        stateKey: stateKey
                    });

                    dispatch({
                        type: _ActionTypes.SET_DATA,
                        data: response.data,
                        total: response.total,
                        currentRecords: response.items,
                        success: true,
                        stateKey: stateKey
                    });

                    if (afterAsyncFunc && typeof afterAsyncFunc === 'function') {
                        afterAsyncFunc();
                    }
                } else {

                    if (response && !response.data) {
                        /* eslint-disable no-console */
                        console.warn(['A response was recieved but', 'no data entry was found'].join(' '));
                        console.warn(['Please see', 'https://github.com/bencripps/react-redux-grid', 'for documentation'].join(' '));
                        /* eslint-enable no-console */
                    }

                    dispatch({
                        type: _ActionTypes.ERROR_OCCURRED,
                        error: 'Unable to Retrieve Grid Data',
                        errorOccurred: true,
                        stateKey: stateKey
                    });
                }

                dispatch((0, _LoaderActions.setLoaderState)({ state: false, stateKey: stateKey }));
            });
        };
    }
};

var setPageAsync = exports.setPageAsync = function setPageAsync(_ref3) {
    var index = _ref3.index,
        pageSize = _ref3.pageSize,
        type = _ref3.type,
        BUTTON_TYPES = _ref3.BUTTON_TYPES,
        dataSource = _ref3.dataSource,
        stateKey = _ref3.stateKey;


    var pageIndex = type === BUTTON_TYPES.NEXT ? index + 1 : index - 1;

    return function (dispatch) {

        dispatch((0, _LoaderActions.setLoaderState)({ state: true, stateKey: stateKey }));

        return (0, _api2.default)({
            route: dataSource,
            method: 'GET',
            queryStringParams: {
                pageIndex: pageIndex,
                pageSize: pageSize
            }
        }).then(function (response) {

            if (response && response.data) {

                dispatch({
                    type: _ActionTypes.PAGE_REMOTE,
                    pageIndex: pageIndex,
                    stateKey: stateKey
                });

                dispatch({
                    type: _ActionTypes.SET_DATA,
                    data: response.data,
                    total: response.total,
                    currentRecords: response.data,
                    success: true,
                    stateKey: stateKey
                });

                dispatch((0, _LoaderActions.setLoaderState)({ state: false, stateKey: stateKey }));
            } else {
                dispatch({
                    type: _ActionTypes.ERROR_OCCURRED,
                    error: response,
                    errorOccurred: true,
                    stateKey: stateKey
                });
            }
        });
    };
};