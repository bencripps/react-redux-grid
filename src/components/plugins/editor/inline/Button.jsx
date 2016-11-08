import React, { PropTypes } from 'react';

import { prefix } from './../../../../util/prefix';
import { gridConfig } from './../../../../constants/GridConstants';
import {
    dismissEditor
} from './../../../../actions/plugins/editor/EditorActions';
import { saveRow } from './../../../../actions/plugins/editor/EditorActions';

export const Button = ({
    BUTTON_TYPES,
    saveText,
    cancelText,
    editorState,
    editedRowKey,
    events,
    stateKey,
    store,
    type
}) => {

    const { CLASS_NAMES } = gridConfig();

    const text = type === BUTTON_TYPES.SAVE ? saveText : cancelText;

    const buttonProps = {
        onClick: onButtonClick.bind(
            null,
            BUTTON_TYPES,
            editorState,
            events,
            type,
            stateKey,
            editedRowKey,
            store
        ),
        className: type === BUTTON_TYPES.SAVE
            ? prefix(CLASS_NAMES.EDITOR.INLINE.SAVE_BUTTON)
            : prefix(CLASS_NAMES.EDITOR.INLINE.CANCEL_BUTTON)
    };

    if (type === BUTTON_TYPES.SAVE
            && editorState
            && editorState.get(editedRowKey)
            && !editorState.get(editedRowKey).valid) {
        buttonProps.disabled = true;
    }

    return (
        <button { ...buttonProps } >
            { text }
        </button>
    );
};

Button.propTypes = {
    BUTTON_TYPES: PropTypes.object,
    cancelText: PropTypes.string,
    editedRowKey: PropTypes.string,
    editorState: PropTypes.object,
    events: PropTypes.object,
    saveText: PropTypes.string,
    stateKey: PropTypes.string,
    store: PropTypes.object,
    type: PropTypes.string
};

Button.defaultProps = {
    BUTTON_TYPES: {
        CANCEL: 'CANCEL',
        SAVE: 'SAVE'
    },
    cancelText: 'Cancel',
    editorState: {},
    saveText: 'Save'
};

export const onButtonClick = (
    BUTTON_TYPES, editorState, events, type, stateKey, editedRowKey, store
) => {

    let values = editorState.get(editedRowKey).values;

    if (!values._key) {
        values = values.set('_key', editedRowKey);
    }

    if (type === BUTTON_TYPES.SAVE
        && events.HANDLE_BEFORE_INLINE_EDITOR_SAVE) {

        const result = events.HANDLE_BEFORE_INLINE_EDITOR_SAVE({
            values, editorState
        });

        // early exit if custom event returns false
        // dont do save or dismiss editor
        if (result === false) {
            return;
        }
    }

    if (type === BUTTON_TYPES.CANCEL) {
        store.dispatch(dismissEditor({ stateKey }));
    }

    else if (type === BUTTON_TYPES.SAVE) {

        store.dispatch(
            saveRow({
                values,
                rowIndex: editorState.get(editedRowKey).rowIndex,
                stateKey
            })
        );

        if (events.HANDLE_AFTER_INLINE_EDITOR_SAVE) {
            events.HANDLE_AFTER_INLINE_EDITOR_SAVE({
                values, editorState
            });
        }

        store.dispatch(dismissEditor({ stateKey }));
    }
};
