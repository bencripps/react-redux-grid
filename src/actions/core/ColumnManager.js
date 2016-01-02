import {
    SET_COLUMNS
} from '../../constants/ActionTypes';

export function reorderColumn(draggedIndex, droppedIndex, columns) {

    const reorder = (cols, to, from) => {
        cols.splice(to, 0, cols.splice(from, 1)[0]);
        return cols;
    };

    const reorderedColumns = reorder(columns, droppedIndex, draggedIndex);

    return {
        type: SET_COLUMNS,
        columns: reorderedColumns
    };
}