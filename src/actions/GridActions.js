import {
    SET_DATA,
    ERROR_OCCURRED,
    SET_COLUMNS,
    SORT_DATA,
    RESIZE_COLUMNS,
    SET_SORT_DIRECTION
} from '../constants/ActionTypes';

import { SORT_DIRECTIONS } from '../constants/GridConstants';

import { setLoaderState } from '../actions/plugins/loader/LoaderActions';

import { dismissEditor } from '../actions/plugins/editor/EditorActions';

import { keyGenerator } from '../util/keyGenerator';

import Request from '../components/plugins/ajax/Request';

export function getAsyncData(datasource) {

    return (dispatch) => {

        dispatch(dismissEditor());

        dispatch(setLoaderState(true));

        if (typeof datasource === 'function') {

            datasource().then((response) => {

                if (response && response.data) {

                    dispatch({
                        type: SET_DATA,
                        data: response.data,
                        total: response.total,
                        currentRecords: response.items,
                        success: true
                    });

                }

                else {

                    if (response && !response.data) {
                        console.warn('A response was recieved but no data entry was found');
                        console.warn('Please see https://github.com/bencripps/react-redux-grid for documentation');
                    }

                    dispatch({
                        type: ERROR_OCCURRED,
                        error: 'Unable to Retrieve Grid Data',
                        errorOccurred: true
                    });
                }

                dispatch(setLoaderState(false));
            });
        }

        else if (typeof datasource === 'string') {

            return Request.api({
                route: datasource,
                method: 'GET'
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

                dispatch(setLoaderState(false));
            });

        }


    };
}

export function setColumns(cols) {

    let columns = cols;

    if (!columns[0].id) {
        columns = cols.map((col) => {
            col.id = keyGenerator(col.name, 'grid-column');
            return col;
        });
    }

    return { type: SET_COLUMNS, columns };
}

export function setSortDirection(cols, id, sortDirection) {

    let columns = cols;

    columns = cols.map((col) => {

        if (col.id === id) {
            col.sortDirection = sortDirection;
        }

        return col;
    });

    return { type: SET_SORT_DIRECTION, columns };
}

export function doLocalSort(data) {
    return { type: SORT_DATA, data };
}

export function doRemoteSort(datasource, pageIndex, pageSize, sortParams) {
    return (dispatch) => {

        dispatch(setLoaderState(true));

        if (typeof datasource === 'function') {
            return datasource({}, {}, sortParams).then((response) => {

                if (response && response.data) {

                    dispatch({
                        type: SET_DATA,
                        data: response.data,
                        total: response.total,
                        currentRecords: response.items,
                        success: true
                    });

                }

                else {

                    if (response && !response.data) {
                        console.warn('A response was recieved but no data entry was found');
                        console.warn('Please see https://github.com/bencripps/react-redux-grid for documentation');
                    }

                    dispatch({
                        type: ERROR_OCCURRED,
                        error: 'Unable to Retrieve Grid Data',
                        errorOccurred: true
                    });
                }

                dispatch(setLoaderState(false));
            });

        }

        else {
            return Request.api({
                route: datasource,
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

                dispatch(setLoaderState(false));
            });
        }

    };
}

export function setColumnVisibility(columnsArr, column, isHidden) {
    const hidden = !isHidden;

    const columns = columnsArr.map((col) => {
        if (col.name === column.name) {
            col.hidden = hidden;
        }

        return col;
    });

    return { type: SET_COLUMNS, columns };
}

export function resizeColumns(width, id, nextColumn, cols) {

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
        columns
    };

}

export function setData(data) {
    return { type: SET_DATA, data };
}