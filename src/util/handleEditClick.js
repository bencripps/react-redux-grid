import { editRow } from './../actions/plugins/editor/EditorActions';
import { prefix } from './../util/prefix';
import { fireEvent } from './../util/fire';
import { gridConfig } from './../constants/GridConstants';

export const handleEditClick = (
    editor,
    store,
    rowId,
    rowData,
    rowIndex,
    columns,
    stateKey,
    events = {},
    data,
) => {

    const result = fireEvent(
        'HANDLE_BEFORE_EDIT',
        events,
        {
            rowId,
            store,
            row: rowData
        },
        null
    );

    // if HANDLE_BEFORE_EDIT event returns false
    // do not trigger edit
    if (result === false) {
        return;
    }

    const row = closestRow(data.reactEvent.target);
    const offset = 7;
    const top = row ?
        (row.offsetTop + row.clientHeight + offset)
        : 0;

    // if (editor.config.type === editor.editModes.inline) {
    store.dispatch(
        editRow({
            rowId,
            top,
            rowData,
            rowIndex,
            columns,
            stateKey,
            editMode: editor.config.type
        })
    );
    // }
};

export const closestRow = (target) => {
    const { CLASS_NAMES } = gridConfig();
    let el = target;

    while (el && el !== document.body) {
        if (el
            && el.classList
            && el.classList.contains(prefix(CLASS_NAMES.ROW))) {
            return el;
        }
        el = el.parentNode;
    }
};
