import {
    SET_COLUMNS
} from '../../constants/ActionTypes';

export const reorderColumn = ({
    draggedIndex, droppedIndex, columns, stateKey, stateful
}) => {

    const reorder = (cols, to, from) => {
        cols.splice(to, 0, cols.splice(from, 1)[0]);
        return cols;
    };

    const reorderedColumns = reorder(columns, droppedIndex, draggedIndex);

    return {
        type: SET_COLUMNS,
        columns: reorderedColumns,
        stateKey,
        stateful
    };
};
