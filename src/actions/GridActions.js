import {
    SET_DATA,
    ERROR_OCCURRED,
    SET_COLUMNS,
    SORT_DATA,
    RESIZE_COLUMNS,
    SET_SORT_DIRECTION
} from '../constants/ActionTypes';

import { setLoaderState } from '../actions/plugins/loader/LoaderActions';

import { dismissEditor } from '../actions/plugins/editor/EditorActions';

import { keyGenerator } from '../util/keyGenerator';

import Request from '../components/plugins/ajax/Request';

export function getAsyncData({ stateKey, dataSource }) {

    return (dispatch) => {

        dispatch(dismissEditor({ stateKey }));

        dispatch(
            setLoaderState({state: true, stateKey })
        );

        if (typeof dataSource === 'function') {

            dataSource().then((response) => {

                if (response && response.data) {

                    dispatch(
                        setLoaderState({ state: false, stateKey })
                    );

                    dispatch({
                        type: SET_DATA,
                        data: response.data,
                        total: response.total,
                        currentRecords: response.data,
                        success: true,
                        stateKey
                    });

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

                dispatch({
                    type: ERROR_OCCURRED,
                    error: 'Unable to Retrieve Grid Data',
                    errorOccurred: true,
                    stateKey
                });

                dispatch(
                    setLoaderState({ state: false, stateKey })
                );
            });
        }

        else if (typeof dataSource === 'string') {

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

    };
}

export function setColumns({ columns, stateKey }) {

    let cols = columns;

    if (!cols[0].id) {
        cols = columns.map((col) => {
            col.id = keyGenerator(col.name, 'grid-column');
            return col;
        });
    }

    return { type: SET_COLUMNS, columns: cols, stateKey };
}

export function setSortDirection(cols, id, sortDirection) {

    let columns = cols;

    columns = cols.map((col) => {

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

    return { type: SET_SORT_DIRECTION, columns };
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
                        currentRecords: response.items,
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

export function setColumnVisibility({ columns, column, isHidden, stateKey }) {
    const hidden = !isHidden;

    const columnsArr = columns.map((col) => {
        if (col.name === column.name) {
            col.hidden = hidden;
        }

        return col;
    });

    return { type: SET_COLUMNS, columns: columnsArr, stateKey };
}

export function resizeColumns(width, id, nextColumn, cols, stateKey) {

    const columns = cols.map((col) => {

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
        columns
    };

}

export function setData({ data, stateKey }) {
    return { type: SET_DATA, data, stateKey };
}