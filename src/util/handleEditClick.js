import { editRow } from './../actions/plugins/editor/EditorActions';

export const handleEditClick = (editor, store, rowId, rowData, rowIndex, data) => {
    const rowPosition = data.reactEvent.target.getBoundingClientRect();
    const top = rowPosition.top + window.scrollY;

    if (editor.config.type === editor.editModes.inline) {
        store.dispatch(editRow(rowId, top, rowData, rowIndex));
    }
};