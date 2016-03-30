import { editRow } from './../actions/plugins/editor/EditorActions';

export const handleEditClick = (editor, store, rowId, rowData, rowIndex, data) => {
    const row = closestRow(data.reactEvent.target);
    const rowPosition = row.getBoundingClientRect();
    const height = parseInt(window.getComputedStyle(row).height, 10);
    const top = rowPosition.top + window.scrollY + height;

    if (editor.config.type === editor.editModes.inline) {
        store.dispatch(editRow(rowId, top, rowData, rowIndex));
    }
};

export const closestRow = (target) => {
    let el = target;

    while (el && el !== document.body) {
        if (el && el.classList && el.classList.contains('react-grid-row')) {
            return el;
        }
        el = el.parentNode;
    }
};