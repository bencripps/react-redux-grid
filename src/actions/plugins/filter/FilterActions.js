import {
    SET_FILTER_VALUE,
    FILTER_DATA,
    CLEAR_FILTER_REMOTE,
    CLEAR_FILTER_LOCAL

} from '../../../constants/ActionTypes';

import { getAsyncData } from '../../../actions/GridActions';

export function setFilter(value) {
    return { type: SET_FILTER_VALUE, value };
}

export function doLocalFilter(data) {
    return { type: FILTER_DATA, data };
}

export function clearFilterRemote(dataSource) {
    return getAsyncData(dataSource);
}

export function clearFilterLocal() {
    return { type: CLEAR_FILTER_LOCAL };
}