import {
    SET_DATA,
    ERROR_OCCURRED,
    SET_COLUMNS,
    SET_TREE_NODE_VISIBILITY,
    SORT_DATA,
    RESIZE_COLUMNS,
    SET_SORT_DIRECTION,
    HIDE_HEADER,
    SET_TREE_DATA_PARTIAL
} from '../constants/ActionTypes';

import { setLoaderState } from '../actions/plugins/loader/LoaderActions';

import { dismissEditor } from '../actions/plugins/editor/EditorActions';

import { keyGenerator } from '../util/keyGenerator';

import { treeToFlatList } from '../util/treeToFlatList';

import Request from '../components/plugins/ajax/Request';

export function getAsyncData({
    stateKey, dataSource, type, showTreeRootNode, extraParams = {}
}) {

    return (dispatch) => {

        dispatch(dismissEditor({ stateKey }));

        dispatch(
            setLoaderState({state: true, stateKey })
        );

        if (typeof dataSource === 'function') {

            // passing extraParams.parentId
            // to custom func so they can do partial
            // loading
            dataSource(extraParams).then((response) => {

                if (response && response.data) {

                    dispatch(
                        setLoaderState({ state: false, stateKey })
                    );

                    if (type !== 'tree') {

                        dispatch({
                            type: SET_DATA,
                            data: response.data,
                            total: response.total,
                            currentRecords: response.data,
                            success: true,
                            stateKey
                        });
                    }

                    else {
                        // upon the return of read
                        // response needs to clarify
                        // whether this is a partial update
                        dispatch(setTreeData({
                            data: response.data,
                            stateKey,
                            showTreeRootNode,
                            parentId: extraParams.parentId,
                            partial: response.partial
                        }));
                    }

                    return;
                }

                if (response && !response.data) {
                    /* eslint-disable no-console */
                    console.warn(
                        `A response was recieved
                         but no data entry was found`
                    );
                    console.warn(
                        `Please see
                         https://github.com/bencripps/react-redux-grid
                         for documentation`
                    );
                    /* eslint-enable no-console */
                }

                dispatch(
                    setLoaderState({ state: false, stateKey })
                );

                dispatch({
                    type: ERROR_OCCURRED,
                    error: 'Unable to Retrieve Grid Data',
                    errorOccurred: true,
                    stateKey
                });

            });
        }

        else if (typeof dataSource === 'string') {

            if (type !== 'tree') {

                return Request.api({
                    route: dataSource,
                    method: 'GET'
                }).then((response) => {

                    if (response && response.data) {

                        dispatch({
                            type: SET_DATA,
                            data: response.data,
                            total: response.total,
                            currentRecords: response.data,
                            success: true,
                            stateKey
                        });

                    }

                    else {
                        dispatch({
                            type: ERROR_OCCURRED,
                            error: 'Unable to Retrieve Grid Data',
                            errorOccurred: true,
                            stateKey
                        });
                    }

                    dispatch(
                        setLoaderState({state: false, stateKey })
                    );
                });

            }

            else {

                return Request.api({
                    route: dataSource,
                    method: 'GET',
                    queryStringParams: {
                        parentId: extraParams.parentId
                    }
                }).then((response) => {

                    if (response && response.data) {

                        // response needs to specify
                        // whether this is full or partial update
                        dispatch(setTreeData({
                            data: response.data,
                            stateKey,
                            showTreeRootNode,
                            partial: response.partial,
                            parentId: extraParams.parentId
                        }));

                    }

                    else {
                        dispatch({
                            type: ERROR_OCCURRED,
                            error: 'Unable to Retrieve Grid Data',
                            errorOccurred: true,
                            stateKey
                        });
                    }

                    dispatch(
                        setLoaderState({state: false, stateKey })
                    );
                });
            }
        }

    };
}

export function setColumns({ columns, stateKey, stateful }) {

    let cols = columns;

    if (!cols[0].id) {
        cols = columns.map((col) => {
            col.id = keyGenerator(col.name, 'grid-column');
            return col;
        });
    }

    return { type: SET_COLUMNS, columns: cols, stateKey, stateful };
}

export function setSortDirection({
    columns, id, sortDirection, stateKey
}) {

    let cols = columns;

    cols = columns.map((col) => {

        if (col.id === id) {
            col.sortDirection = sortDirection;
        }

        else {
            // to do: remove this if we want to build
            // up the sorts
            col.sortDirection = null;
        }

        return col;
    });

    return { type: SET_SORT_DIRECTION, columns: cols, stateKey };
}

export function doLocalSort({ data, stateKey }) {
    return { type: SORT_DATA, data, stateKey };
}

export function doRemoteSort(
    { dataSource, pageIndex, pageSize, sortParams, stateKey }
) {

    return (dispatch) => {

        dispatch(
            setLoaderState({state: true, stateKey })
        );

        if (typeof dataSource === 'function') {
            return dataSource({}, {}, sortParams).then((response) => {

                if (response && response.data) {

                    dispatch({
                        type: SET_DATA,
                        data: response.data,
                        total: response.total,
                        currentRecords: response.data,
                        success: true,
                        stateKey
                    });

                }

                else {

                    if (response && !response.data) {
                        /* eslint-disable no-console */
                        console.warn(
                            `A response was recieved but no data
                             entry was found`
                        );
                        console.warn(
                            `Please see
                             https://github.com/bencripps/react-redux-grid
                             for documentation`
                        );
                        /* eslint-enable no-console */
                    }

                    dispatch({
                        type: ERROR_OCCURRED,
                        error: 'Unable to Retrieve Grid Data',
                        errorOccurred: true,
                        stateKey
                    });
                }

                dispatch(
                    setLoaderState({state: false, stateKey })
                );
            });

        }

        return Request.api({
            route: dataSource,
            method: 'POST',
            data: {
                pageIndex: pageIndex,
                pageSize: pageSize,
                sort: sortParams.sort
            }
        }).then((response) => {

            if (response && response.data) {

                dispatch({
                    type: SET_DATA,
                    data: response.data,
                    total: response.total,
                    currentRecords: response.data,
                    success: true
                });

            }

            else {
                dispatch({
                    type: ERROR_OCCURRED,
                    error: 'Unable to Retrieve Grid Data',
                    errorOccurred: true
                });
            }

            dispatch(
                setLoaderState({state: false, stateKey })
            );
        });

    };
}

export function setColumnVisibility({
 columns, column, isHidden, stateKey, stateful
}) {
    const hidden = !isHidden;

    const columnsArr = columns.map((col) => {
        if (col.name === column.name) {
            col.hidden = hidden;
        }

        return col;
    });

    return { type: SET_COLUMNS, columns: columnsArr, stateKey, stateful };
}

export function resizeColumns({
    width, id, nextColumn, columns, stateKey, stateful
}) {

    const cols = columns.map((col) => {

        if (col.id === id) {
            col.width = `${width}%`;
        }

        else if (col.id === nextColumn.id) {
            col.width = `${nextColumn.width}%`;
        }

        return col;

    });

    return {
        type: RESIZE_COLUMNS,
        stateKey,
        columns: cols,
        stateful
    };

}

export function setData({ data, stateKey }) {
    return { type: SET_DATA, data, stateKey };
}

export function setTreeData({
    data, stateKey, showTreeRootNode, partial, parentId
}) {

    // if this is a partial update to
    // a tree grid, dispatch separate action;
    if (partial) {
        return {
            type: SET_TREE_DATA_PARTIAL,
            data: data,
            stateKey,
            gridType: 'tree',
            showTreeRootNode,
            parentId
        };
    }

    const flat = treeToFlatList(data);

    if (!showTreeRootNode) {
        flat.shift();
    }

    // remove root node

    return {
        type: SET_DATA,
        data: flat,
        stateKey,
        gridType: 'tree',
        treeData: data
    };
}

export function setTreeNodeVisibility({
    id, visible, stateKey, showTreeRootNode
}) {
    return {
        type: SET_TREE_NODE_VISIBILITY,
        id,
        visible,
        stateKey,
        showTreeRootNode
    };
}

export function setHeaderVisibility({ hidden, stateKey }) {
    return { type: HIDE_HEADER, headerHidden: hidden, stateKey };
}
