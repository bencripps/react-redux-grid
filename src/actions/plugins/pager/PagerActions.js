import {
    PAGE_LOCAL,
    PAGE_REMOTE,
    SET_DATA,
    ERROR_OCCURRED
} from '../../../constants/ActionTypes';

import { setLoaderState } from '../../../actions/plugins/loader/LoaderActions';

import Request from '../../../components/plugins/ajax/Request';

export function setPage(index, type, BUTTON_TYPES) {

    const pageIndex = type === BUTTON_TYPES.NEXT ? index + 1 : index - 1;

    return { type: PAGE_LOCAL, pageIndex };
}

export function setPageIndexAsync(pageIndex, pageSize, datasource, afterAsyncFunc) {

    if (typeof datasource === 'function') {

        return (dispatch) => {

            dispatch(setLoaderState(true));

            datasource({pageIndex, pageSize}).then((response) => {

                if (response && response.data) {

                    dispatch({
                        type: SET_DATA,
                        data: response.data,
                        total: response.total,
                        currentRecords: response.items,
                        success: true
                    });

                    if (afterAsyncFunc && typeof afterAsyncFunc === 'function') {
                        afterAsyncFunc();
                    }
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
        };
    }
}

export function setPageAsync(index, pageSize, type, BUTTON_TYPES, datasource) {

    const pageIndex = type === BUTTON_TYPES.NEXT ? index + 1 : index - 1;

    return (dispatch) => {

        dispatch(setLoaderState(true));

        return Request.api({
            route: datasource,
            method: 'POST',
            data: {
                pageIndex: pageIndex,
                pageSize: pageSize
            }
        }).then((response) => {

            if (response && response.data) {

                dispatch({
                    type: PAGE_REMOTE,
                    pageIndex: pageIndex
                });

                dispatch({
                    type: SET_DATA,
                    data: response.data,
                    total: response.total,
                    currentRecords: response.data,
                    success: true
                });

                dispatch(setLoaderState(false));
            }

            else {
                dispatch({
                    type: ERROR_OCCURRED,
                    error: response,
                    errorOccurred: true
                });
            }

        });
    };
}