import {
    SET_DATA,
    ERROR_OCCURRED,
    SET_COLUMNS,
    RESIZE_COLUMNS,
    SET_SORT_DIRECTION
} from '../constants/ActionTypes';

import { SORT_DIRECTIONS } from '../constants/GridConstants';

import { setLoaderState } from '../actions/plugins/loader/LoaderActions';

import { keyFromObject } from '../util/keygenerator';

import Request from '../components/plugins/ajax/Request';

export function getAsyncData(datasource) {

    return (dispatch) => {

        dispatch(setLoaderState(true));

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

    };
}

export function setColumns(cols) {

    let columns = cols;

    if (!columns[0].id) {
        columns = cols.map((col) => {
            col.id = keyFromObject(col.name, col.value);
            return col;
        });
    }

    return { type: SET_COLUMNS, columns };
}

export function setSortDirection(cols, id, sortDirection) {

    const newDirection = sortDirection === SORT_DIRECTIONS.ASCEND
        ? SORT_DIRECTIONS.DESCEND : SORT_DIRECTIONS.ASCEND;

    let columns = cols;

    columns = cols.map((col) => {

        if (col.id === id) {
            col.sortDirection = newDirection;
        }

        return col;
    });

    return { type: SET_SORT_DIRECTION, columns };
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