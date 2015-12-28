import {
    RESIZE_COLUMN
} from '../../constants/ActionTypes';

export function resizeColumn(width, id, offset) {

    if (!offset) {
        return { type: RESIZE_COLUMN, width, id };
    }

    else {
        return {
            type: RESIZE_COLUMN,
            width,
            id,
            lastColumn: {
                id: offset.id,
                width: offset.width
            }
        }
    }

}
