import {
    SET_FILTER_VALUE,
    FILTER_DATA,
    CLEAR_FILTER
} from '../../../constants/ActionTypes';

import { getAsyncData } from '../../../actions/GridActions';

export function setFilter(value) {
    return { type: SET_FILTER_VALUE, value };
}

export function doLocalFilter(data) {
    return { type: FILTER_DATA, data };
}

export function clearFilter(dataSource) {
    return getAsyncData(dataSource);
}