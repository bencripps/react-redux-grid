import {
    SET_DATA,
    ERROR_OCCURRED
} from '../constants/ActionTypes';

import { setLoaderState } from '../actions/plugins/loader/LoaderActions';

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

export function setData(data) {
    return { type: SET_DATA, data };
}
