import {
    SET_FILTER_VALUE,
    FILTER_DATA,
    CLEAR_FILTER_REMOTE,
    CLEAR_FILTER_LOCAL,
    ERROR_OCCURRED,
    SHOW_FILTER_MENU,
    SET_DATA,
    SET_FILTER_MENU_VALUES
} from '../../../constants/ActionTypes';

import Request from '../../../components/plugins/ajax/Request';

import { setLoaderState } from '../../../actions/plugins/loader/LoaderActions';

import { getAsyncData } from '../../../actions/GridActions';

export function setFilter(value) {

    const metaData = {
        filterMenuShown: false,
        filterMenuValues: {},
        filterValue: ''
    };

    if (value || value.length > 0) {
        return { type: SET_FILTER_VALUE, value };
    }

    else {
        return { type: SHOW_FILTER_MENU, metaData };
    }

}

export function doLocalFilter(data) {
    return { type: FILTER_DATA, data };
}

export function doRemoteFilter(filterParams, pageIndex, pageSize, datasource) {

    return (dispatch) => {

        dispatch(setLoaderState(true));

        return Request.api({
            route: datasource,
            method: 'POST',
            data: {
                pageIndex: pageIndex,
                pageSize: pageSize,
                filterParams: filterParams
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

    };
}

export function setFilterMenuValues(filter) {
    return { type: SET_FILTER_MENU_VALUES, filter };
}

export function clearFilterRemote(dataSource) {
    return getAsyncData(dataSource);
}

export function clearFilterLocal() {
    return { type: CLEAR_FILTER_LOCAL };
}

export function showFilterMenu(value, removeFilters) {
    const isShown = !value;

    const metaData = {
        filterMenuShown: isShown
    };

    if (removeFilters) {
        metaData.filterMenuValues = {};
    }

    return { type: SHOW_FILTER_MENU, metaData };
}