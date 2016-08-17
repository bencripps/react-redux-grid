'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getAsyncData = getAsyncData;
exports.setColumns = setColumns;
exports.setSortDirection = setSortDirection;
exports.doLocalSort = doLocalSort;
exports.doRemoteSort = doRemoteSort;
exports.setColumnVisibility = setColumnVisibility;
exports.resizeColumns = resizeColumns;
exports.setData = setData;
exports.setTreeData = setTreeData;
exports.setTreeNodeVisibility = setTreeNodeVisibility;
exports.setHeaderVisibility = setHeaderVisibility;

var _ActionTypes = require('../constants/ActionTypes');

var _LoaderActions = require('../actions/plugins/loader/LoaderActions');

var _EditorActions = require('../actions/plugins/editor/EditorActions');

var _keyGenerator = require('../util/keyGenerator');

var _treeToFlatList = require('../util/treeToFlatList');

var _Request = require('../components/plugins/ajax/Request');

var _Request2 = _interopRequireDefault(_Request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getAsyncData(_ref) {
    var stateKey = _ref.stateKey;
    var dataSource = _ref.dataSource;
    var type = _ref.type;
    var showTreeRootNode = _ref.showTreeRootNode;
    var _ref$extraParams = _ref.extraParams;
    var extraParams = _ref$extraParams === undefined ? {} : _ref$extraParams;


    return function (dispatch) {

        dispatch((0, _EditorActions.dismissEditor)({ stateKey: stateKey }));

        dispatch((0, _LoaderActions.setLoaderState)({ state: true, stateKey: stateKey }));

        if (typeof dataSource === 'function') {

            // passing extraParams.parentId
            // to custom func so they can do partial
            // loading
            dataSource(extraParams).then(function (response) {

                if (response && response.data) {

                    dispatch((0, _LoaderActions.setLoaderState)({ state: false, stateKey: stateKey }));

                    if (type !== 'tree') {

                        dispatch({
                            type: _ActionTypes.SET_DATA,
                            data: response.data,
                            total: response.total,
                            currentRecords: response.data,
                            success: true,
                            stateKey: stateKey
                        });
                    } else {
                        // upon the return of read
                        // response needs to clarify
                        // whether this is a partial update
                        dispatch(setTreeData({
                            data: response.data,
                            stateKey: stateKey,
                            showTreeRootNode: showTreeRootNode,
                            parentId: extraParams.parentId,
                            partial: response.partial
                        }));
                    }

                    return;
                }

                if (response && !response.data) {
                    /* eslint-disable no-console */
                    console.warn('A response was recieved\n                         but no data entry was found');
                    console.warn('Please see\n                         https://github.com/bencripps/react-redux-grid\n                         for documentation');
                    /* eslint-enable no-console */
                }

                dispatch((0, _LoaderActions.setLoaderState)({ state: false, stateKey: stateKey }));

                dispatch({
                    type: _ActionTypes.ERROR_OCCURRED,
                    error: 'Unable to Retrieve Grid Data',
                    errorOccurred: true,
                    stateKey: stateKey
                });
            });
        } else if (typeof dataSource === 'string') {

            if (type !== 'tree') {

                return _Request2.default.api({
                    route: dataSource,
                    method: 'GET'
                }).then(function (response) {

                    if (response && response.data) {

                        dispatch({
                            type: _ActionTypes.SET_DATA,
                            data: response.data,
                            total: response.total,
                            currentRecords: response.data,
                            success: true,
                            stateKey: stateKey
                        });
                    } else {
                        dispatch({
                            type: _ActionTypes.ERROR_OCCURRED,
                            error: 'Unable to Retrieve Grid Data',
                            errorOccurred: true,
                            stateKey: stateKey
                        });
                    }

                    dispatch((0, _LoaderActions.setLoaderState)({ state: false, stateKey: stateKey }));
                });
            } else {

                return _Request2.default.api({
                    route: dataSource,
                    method: 'GET',
                    queryStringParams: {
                        parentId: extraParams.parentId
                    }
                }).then(function (response) {

                    if (response && response.data) {

                        // response needs to specify
                        // whether this is full or partial update
                        dispatch(setTreeData({
                            data: response.data,
                            stateKey: stateKey,
                            showTreeRootNode: showTreeRootNode,
                            partial: response.partial,
                            parentId: extraParams.parentId
                        }));
                    } else {
                        dispatch({
                            type: _ActionTypes.ERROR_OCCURRED,
                            error: 'Unable to Retrieve Grid Data',
                            errorOccurred: true,
                            stateKey: stateKey
                        });
                    }

                    dispatch((0, _LoaderActions.setLoaderState)({ state: false, stateKey: stateKey }));
                });
            }
        }
    };
}

function setColumns(_ref2) {
    var columns = _ref2.columns;
    var stateKey = _ref2.stateKey;
    var stateful = _ref2.stateful;


    var cols = columns;

    if (!cols[0].id) {
        cols = columns.map(function (col) {
            col.id = (0, _keyGenerator.keyGenerator)(col.name, 'grid-column');
            return col;
        });
    }

    return { type: _ActionTypes.SET_COLUMNS, columns: cols, stateKey: stateKey, stateful: stateful };
}

function setSortDirection(_ref3) {
    var columns = _ref3.columns;
    var id = _ref3.id;
    var sortDirection = _ref3.sortDirection;
    var stateKey = _ref3.stateKey;


    var cols = columns;

    cols = columns.map(function (col) {

        if (col.id === id) {
            col.sortDirection = sortDirection;
        } else {
            // to do: remove this if we want to build
            // up the sorts
            col.sortDirection = null;
        }

        return col;
    });

    return { type: _ActionTypes.SET_SORT_DIRECTION, columns: cols, stateKey: stateKey };
}

function doLocalSort(_ref4) {
    var data = _ref4.data;
    var stateKey = _ref4.stateKey;

    return { type: _ActionTypes.SORT_DATA, data: data, stateKey: stateKey };
}

function doRemoteSort(_ref5) {
    var dataSource = _ref5.dataSource;
    var pageIndex = _ref5.pageIndex;
    var pageSize = _ref5.pageSize;
    var sortParams = _ref5.sortParams;
    var stateKey = _ref5.stateKey;


    return function (dispatch) {

        dispatch((0, _LoaderActions.setLoaderState)({ state: true, stateKey: stateKey }));

        if (typeof dataSource === 'function') {
            return dataSource({}, {}, sortParams).then(function (response) {

                if (response && response.data) {

                    dispatch({
                        type: _ActionTypes.SET_DATA,
                        data: response.data,
                        total: response.total,
                        currentRecords: response.data,
                        success: true,
                        stateKey: stateKey
                    });
                } else {

                    if (response && !response.data) {
                        /* eslint-disable no-console */
                        console.warn('A response was recieved but no data\n                             entry was found');
                        console.warn('Please see\n                             https://github.com/bencripps/react-redux-grid\n                             for documentation');
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
        }

        return _Request2.default.api({
            route: dataSource,
            method: 'POST',
            data: {
                pageIndex: pageIndex,
                pageSize: pageSize,
                sort: sortParams.sort
            }
        }).then(function (response) {

            if (response && response.data) {

                dispatch({
                    type: _ActionTypes.SET_DATA,
                    data: response.data,
                    total: response.total,
                    currentRecords: response.data,
                    success: true
                });
            } else {
                dispatch({
                    type: _ActionTypes.ERROR_OCCURRED,
                    error: 'Unable to Retrieve Grid Data',
                    errorOccurred: true
                });
            }

            dispatch((0, _LoaderActions.setLoaderState)({ state: false, stateKey: stateKey }));
        });
    };
}

function setColumnVisibility(_ref6) {
    var columns = _ref6.columns;
    var column = _ref6.column;
    var isHidden = _ref6.isHidden;
    var stateKey = _ref6.stateKey;
    var stateful = _ref6.stateful;

    var hidden = !isHidden;

    var columnsArr = columns.map(function (col) {
        if (col.name === column.name) {
            col.hidden = hidden;
        }

        return col;
    });

    return { type: _ActionTypes.SET_COLUMNS, columns: columnsArr, stateKey: stateKey, stateful: stateful };
}

function resizeColumns(_ref7) {
    var width = _ref7.width;
    var id = _ref7.id;
    var nextColumn = _ref7.nextColumn;
    var columns = _ref7.columns;
    var stateKey = _ref7.stateKey;
    var stateful = _ref7.stateful;


    var cols = columns.map(function (col) {

        if (col.id === id) {
            col.width = width + '%';
        } else if (col.id === nextColumn.id) {
            col.width = nextColumn.width + '%';
        }

        return col;
    });

    return {
        type: _ActionTypes.RESIZE_COLUMNS,
        stateKey: stateKey,
        columns: cols,
        stateful: stateful
    };
}

function setData(_ref8) {
    var data = _ref8.data;
    var stateKey = _ref8.stateKey;

    return { type: _ActionTypes.SET_DATA, data: data, stateKey: stateKey };
}

function setTreeData(_ref9) {
    var data = _ref9.data;
    var stateKey = _ref9.stateKey;
    var showTreeRootNode = _ref9.showTreeRootNode;
    var partial = _ref9.partial;
    var parentId = _ref9.parentId;


    // if this is a partial update to
    // a tree grid, dispatch separate action;
    if (partial) {
        return {
            type: _ActionTypes.SET_TREE_DATA_PARTIAL,
            data: data,
            stateKey: stateKey,
            gridType: 'tree',
            showTreeRootNode: showTreeRootNode,
            parentId: parentId
        };
    }

    var flat = (0, _treeToFlatList.treeToFlatList)(data);

    if (!showTreeRootNode) {
        flat.shift();
    }

    // remove root node

    return {
        type: _ActionTypes.SET_DATA,
        data: flat,
        stateKey: stateKey,
        gridType: 'tree',
        treeData: data
    };
}

function setTreeNodeVisibility(_ref10) {
    var id = _ref10.id;
    var visible = _ref10.visible;
    var stateKey = _ref10.stateKey;
    var showTreeRootNode = _ref10.showTreeRootNode;

    return {
        type: _ActionTypes.SET_TREE_NODE_VISIBILITY,
        id: id,
        visible: visible,
        stateKey: stateKey,
        showTreeRootNode: showTreeRootNode
    };
}

function setHeaderVisibility(_ref11) {
    var hidden = _ref11.hidden;
    var stateKey = _ref11.stateKey;

    return { type: _ActionTypes.HIDE_HEADER, headerHidden: hidden, stateKey: stateKey };
}