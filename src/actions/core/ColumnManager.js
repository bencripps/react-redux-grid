import {
    RESIZE_COLUMN
} from '../../constants/ActionTypes';

export function resizeColumn(width, id, nextColumn) {

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
