'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setHeaderVisibility = exports.moveNode = exports.setTreeNodeVisibility = exports.setTreeData = exports.setData = exports.resizeColumns = exports.setColumnVisibility = exports.doRemoteSort = exports.doLocalSort = exports.setSortDirection = exports.setColumns = exports.getAsyncData = undefined;

var _ActionTypes = require('../constants/ActionTypes');

var _LoaderActions = require('../actions/plugins/loader/LoaderActions');

var _EditorActions = require('../actions/plugins/editor/EditorActions');

var _keyGenerator = require('../util/keyGenerator');

var _treeToFlatList = require('../util/treeToFlatList');

var _Request = require('../components/plugins/ajax/Request');

var _Request2 = _interopRequireDefault(_Request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getAsyncData = exports.getAsyncData = function getAsyncData(_ref) {
    var stateKey = _ref.stateKey,
        dataSource = _ref.dataSource,
        type = _ref.type,
        showTreeRootNode = _ref.showTreeRootNode,
        _ref$extraParams = _ref.extraParams,
        extraParams = _ref$extraParams === undefined ? {} : _ref$extraParams;


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
                            stateKey: stateKey,
                            editMode: extraParams.editMode
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
                            partial: response.partial,
                            editMode: extraParams.editMode
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
                            stateKey: stateKey,
                            editMode: extraParams.editMode
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
            }

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
    };
};

var setColumns = exports.setColumns = function setColumns(_ref2) {
    var columns = _ref2.columns,
        stateKey = _ref2.stateKey,
        stateful = _ref2.stateful;


    var cols = columns;

    if (!cols[0].id) {
        cols = columns.map(function (col) {
            col.id = (0, _keyGenerator.keyGenerator)(col.name, 'grid-column');
            return col;
        });
    }

    return { type: _ActionTypes.SET_COLUMNS, columns: cols, stateKey: stateKey, stateful: stateful };
};

var setSortDirection = exports.setSortDirection = function setSortDirection(_ref3) {
    var columns = _ref3.columns,
        id = _ref3.id,
        sortDirection = _ref3.sortDirection,
        stateKey = _ref3.stateKey;


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
};

var doLocalSort = exports.doLocalSort = function doLocalSort(_ref4) {
    var data = _ref4.data,
        stateKey = _ref4.stateKey;
    return {
        type: _ActionTypes.SORT_DATA, data: data, stateKey: stateKey
    };
};

var doRemoteSort = exports.doRemoteSort = function doRemoteSort(_ref5) {
    var dataSource = _ref5.dataSource,
        pageIndex = _ref5.pageIndex,
        pageSize = _ref5.pageSize,
        sortParams = _ref5.sortParams,
        stateKey = _ref5.stateKey;


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
};

var setColumnVisibility = exports.setColumnVisibility = function setColumnVisibility(_ref6) {
    var columns = _ref6.columns,
        column = _ref6.column,
        isHidden = _ref6.isHidden,
        stateKey = _ref6.stateKey,
        stateful = _ref6.stateful;

    var hidden = !isHidden;

    var columnsArr = columns.map(function (col) {
        if (col.name === column.name) {
            col.hidden = hidden;
        }

        return col;
    });

    return { type: _ActionTypes.SET_COLUMNS, columns: columnsArr, stateKey: stateKey, stateful: stateful };
};

var resizeColumns = exports.resizeColumns = function resizeColumns(_ref7) {
    var width = _ref7.width,
        id = _ref7.id,
        nextColumn = _ref7.nextColumn,
        columns = _ref7.columns,
        stateKey = _ref7.stateKey,
        stateful = _ref7.stateful;


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
};

var setData = exports.setData = function setData(_ref8) {
    var data = _ref8.data,
        stateKey = _ref8.stateKey,
        editMode = _ref8.editMode;
    return {
        type: _ActionTypes.SET_DATA, data: data, stateKey: stateKey, editMode: editMode
    };
};

var setTreeData = exports.setTreeData = function setTreeData(_ref9) {
    var data = _ref9.data,
        stateKey = _ref9.stateKey,
        showTreeRootNode = _ref9.showTreeRootNode,
        partial = _ref9.partial,
        parentId = _ref9.parentId,
        editMode = _ref9.editMode;


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

    // remove root node
    if (!showTreeRootNode) {
        flat = flat.shift();
    }

    return {
        type: _ActionTypes.SET_DATA,
        data: flat,
        stateKey: stateKey,
        gridType: 'tree',
        treeData: data,
        editMode: editMode
    };
};

var setTreeNodeVisibility = exports.setTreeNodeVisibility = function setTreeNodeVisibility(_ref10) {
    var id = _ref10.id,
        visible = _ref10.visible,
        stateKey = _ref10.stateKey,
        showTreeRootNode = _ref10.showTreeRootNode;
    return {
        type: _ActionTypes.SET_TREE_NODE_VISIBILITY,
        id: id,
        visible: visible,
        stateKey: stateKey,
        showTreeRootNode: showTreeRootNode
    };
};

var moveNode = exports.moveNode = function moveNode(_ref11) {
    var stateKey = _ref11.stateKey,
        current = _ref11.current,
        next = _ref11.next,
        showTreeRootNode = _ref11.showTreeRootNode;
    return {
        type: _ActionTypes.MOVE_NODE,
        stateKey: stateKey,
        current: current,
        next: next,
        showTreeRootNode: showTreeRootNode
    };
};

var setHeaderVisibility = exports.setHeaderVisibility = function setHeaderVisibility(_ref12) {
    var hidden = _ref12.hidden,
        stateKey = _ref12.stateKey;
    return {
        type: _ActionTypes.HIDE_HEADER, headerHidden: hidden, stateKey: stateKey
    };
};