import {
    RESIZE_COLUMN,
    SET_COLUMNS
} from '../../constants/ActionTypes';

export function reorderColumn(draggedIndex, droppedIndex, columns) {

    const reorder = (columns, to, from) => {
        columns.splice(to, 0, columns.splice(from, 1)[0]);
        return columns;
    };

    const reorderedColumns = reorder(columns, droppedIndex, draggedIndex);

    return {
        type: SET_COLUMNS,
        columns: reorderedColumns
    }
};

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

};


