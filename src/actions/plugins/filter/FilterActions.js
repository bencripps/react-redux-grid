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

export function setFilter({ value, stateKey }) {

    const metaData = {
        filterMenuShown: false,
        filterMenuValues: {},
        filterValue: ''
    };

    if (value || value.length > 0) {
        return { type: SET_FILTER_VALUE, value, stateKey };
    }

    return { type: SHOW_FILTER_MENU, metaData, stateKey };

}

export function doLocalFilter({ data, stateKey }) {
    return { type: FILTER_DATA, data, stateKey };
}

export function doRemoteFilter(
    { filterParams, pageIndex, pageSize, dataSource, stateKey }
) {

    return (dispatch) => {

        dispatch(
            setLoaderState({ state: true, stateKey })
        );

        return Request.api({
            route: dataSource,
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

            dispatch(
                setLoaderState({ state: false, stateKey })
            );

        });

    };
}

export function setFilterMenuValues({ filter, stateKey }) {
    return { type: SET_FILTER_MENU_VALUES, filter, stateKey };
}

export function clearFilterRemote({ dataSource, stateKey }) {
    return getAsyncData({ dataSource, stateKey });
}

export function clearFilterLocal({ stateKey }) {
    return { type: CLEAR_FILTER_LOCAL, stateKey };
}

export function showFilterMenu({ value, removeFilters, stateKey }) {
    const isShown = !value;

    const metaData = {
        filterMenuShown: isShown
    };

    if (removeFilters) {
        metaData.filterMenuValues = {};
    }

    return { type: SHOW_FILTER_MENU, metaData, stateKey };
}