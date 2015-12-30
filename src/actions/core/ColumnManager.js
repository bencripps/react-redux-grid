import {
    RESIZE_COLUMN
} from '../../constants/ActionTypes';

export function resizeColumn(width, id, nextColumn, lastColumn) {

    if (!lastColumn) {
        return { 
            type: RESIZE_COLUMN, 
            width, 
            id,
            nextColumn: {
                id: nextColumn.id,
                width: nextColumn.width
            }
        };
    }

    else {
        return {
            type: RESIZE_COLUMN,
            width,
            id,
            nextColumn: {
                id: nextColumn.id,
                width: nextColumn.width
            },
            lastColumn: {
                id: lastColumn.id,
                width: lastColumn.width
            }
        }
    }

}
