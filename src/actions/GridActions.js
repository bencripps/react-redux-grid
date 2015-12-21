import {
    SET_DATA
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

            if (response) {

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
                    type: SET_DATA,
                    data: [],
                    success: false
                });
            }

            dispatch(setLoaderState(false));
        });

    };
}

export function setData(data) {
    return { type: SET_DATA, data };
}
