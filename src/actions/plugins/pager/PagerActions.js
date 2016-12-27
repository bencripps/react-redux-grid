import {
    PAGE_LOCAL,
    PAGE_REMOTE,
    SET_DATA,
    ERROR_OCCURRED
} from '../../../constants/ActionTypes';

import { setLoaderState } from '../../../actions/plugins/loader/LoaderActions';

import { dismissEditor } from '../../../actions/plugins/editor/EditorActions';

import Api from '../../../util/api';

export const setPage = ({ index, type, BUTTON_TYPES }) => {
    const pageIndex = type === BUTTON_TYPES.NEXT ? index + 1 : index - 1;

    return { type: PAGE_LOCAL, pageIndex };
};

export const setPageIndexAsync = ({
    pageIndex,
    pageSize,
    dataSource,
    filterFields,
    sort,
    stateKey,
    afterAsyncFunc
}) => {

    if (typeof dataSource === 'function') {

        return (dispatch) => {

            dispatch(dismissEditor({ stateKey }));

            dispatch(
                setLoaderState({ state: true, stateKey })
            );

            dataSource(
                {pageIndex, pageSize}, filterFields, sort
            ).then((response) => {

                if (response && response.data) {

                    dispatch({
                        type: PAGE_REMOTE,
                        pageIndex: pageIndex,
                        stateKey
                    });

                    dispatch({
                        type: SET_DATA,
                        data: response.data,
                        total: response.total,
                        currentRecords: response.items,
                        success: true,
                        stateKey
                    });

                    if (afterAsyncFunc
                        && typeof afterAsyncFunc === 'function') {
                        afterAsyncFunc();
                    }
                }

                else {

                    if (response && !response.data) {
                        /* eslint-disable no-console */
                        console.warn([
                            'A response was recieved but',
                            'no data entry was found'
                        ].join(' '));
                        console.warn([
                            'Please see',
                            'https://github.com/bencripps/react-redux-grid',
                            'for documentation'
                        ].join(' '));
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
                    setLoaderState({ state: false, stateKey })
                );
            });
        };
    }
};

export const setPageAsync = ({
    index, pageSize, type, BUTTON_TYPES, dataSource, stateKey
}) => {

    const pageIndex = type === BUTTON_TYPES.NEXT ? index + 1 : index - 1;

    return (dispatch) => {

        dispatch(
            setLoaderState({ state: true, stateKey })
        );

        return Api({
            route: dataSource,
            method: 'GET',
            queryStringParams: {
                pageIndex: pageIndex,
                pageSize: pageSize
            }
        }).then((response) => {

            if (response && response.data) {

                dispatch({
                    type: PAGE_REMOTE,
                    pageIndex: pageIndex,
                    stateKey
                });

                dispatch({
                    type: SET_DATA,
                    data: response.data,
                    total: response.total,
                    currentRecords: response.data,
                    success: true,
                    stateKey
                });

                dispatch(
                    setLoaderState({ state: false, stateKey })
                );
            }

            else {
                dispatch({
                    type: ERROR_OCCURRED,
                    error: response,
                    errorOccurred: true,
                    stateKey
                });
            }

        });
    };
};
