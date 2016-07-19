import { editRow } from './../actions/plugins/editor/EditorActions';

export const handleEditClick = (
    editor, store, rowId, rowData, rowIndex, columns, stateKey, data
) => {
    const row = closestRow(data.reactEvent.target);
    const offset = 7;
    const top = row ?
        (row.offsetTop + row.clientHeight + offset)
        : 0;

    if (editor.config.type === editor.editModes.inline) {
        store.dispatch(
            editRow({
                rowId, top, rowData, rowIndex, columns, stateKey
            })
        );
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
