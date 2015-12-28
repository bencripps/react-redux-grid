import {
    RESIZE_COLUMN
} from '../../constants/ActionTypes';

export function resizeColumn(width, id) {
    return { type: RESIZE_COLUMN, width, id };
}
