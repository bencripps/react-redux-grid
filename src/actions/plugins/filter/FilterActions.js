import {
    SET_FILTER_VALUE,
    FILTER_DATA,
    CLEAR_FILTER_REMOTE,
    CLEAR_FILTER_LOCAL,
    ERROR_OCCURRED,
    SHOW_FILTER_MENU,
    SET_DATA

} from '../../../constants/ActionTypes';

import Request from '../../../components/plugins/ajax/Request';

import { setLoaderState } from '../../../actions/plugins/loader/LoaderActions';

import { getAsyncData } from '../../../actions/GridActions';

export function setFilter(value) {
    return { type: SET_FILTER_VALUE, value };
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

export function clearFilterRemote(dataSource) {
    return getAsyncData(dataSource);
}

export function clearFilterLocal() {
    return { type: CLEAR_FILTER_LOCAL };
}

export function showFilterMenu(value) {
    const shown = !value;

    return { type: SHOW_FILTER_MENU, shown };
}