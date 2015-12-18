import {
    PAGE_LOCAL_NEXT,
    PAGE_LOCAL_LAST
} from '../../../constants/ActionTypes';

export function setPageNext(index) {
    const pageIndex = index + 1;
    return { type: PAGE_LOCAL_NEXT, pageIndex };
}

export function setPageLast(index) {
    const pageIndex = index - 1;
    return { type: PAGE_LOCAL_LAST, pageIndex };
}