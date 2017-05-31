import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { prefix } from './../../../../util/prefix';
import { fireEvent } from './../../../../util/fire';
import {
    gridConfig,
    KEYBOARD_MAP
} from './../../../../constants/GridConstants';

import {
    dismissEditor
} from './../../../../actions/plugins/editor/EditorActions';
import { saveRow } from './../../../../actions/plugins/editor/EditorActions';

export class Button extends Component {

    render() {
        const {
            BUTTON_TYPES,
            saveText,
            cancelText,
            editorState,
            editedRowKey,
            type
        } = this.props;

        const { CLASS_NAMES } = gridConfig();

        const text = type === BUTTON_TYPES.SAVE ? saveText : cancelText;

        const buttonProps = {
            onClick: this.handleButtonClick,
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

    }

    componentDidMount() {
        const {
            type,
            BUTTON_TYPES
        } = this.props;

        if (!this._EVENT_LISTENER) {
            this._EVENT_LISTENER = type === BUTTON_TYPES.SAVE
                ? this.listenForEnter
                : this.listenForCancel;

            document.addEventListener('keydown', this._EVENT_LISTENER);
        }
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this._EVENT_LISTENER);
        delete this._EVENT_LISTENER;
    }

    static propTypes = {
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

    static defaultProps = {
        BUTTON_TYPES: {
            CANCEL: 'CANCEL',
            SAVE: 'SAVE'
        },
        cancelText: 'Cancel',
        editorState: {},
        saveText: 'Save'
    };

    listenForEnter = e => {
        if (e.keyCode === KEYBOARD_MAP.ENTER) {
            this.handleButtonClick();
        }
    };

    listenForCancel = e => {
        if (e.keyCode === KEYBOARD_MAP.ESCAPE) {
            this.handleButtonClick();
        }
    };

    handleButtonClick = () => {

        const {
            BUTTON_TYPES,
            editorState,
            events,
            type,
            stateKey,
            editedRowKey,
            store
        } = this.props;

        let values = editorState.get(editedRowKey).values;

        if (!values._key) {
            values = values.set('_key', editedRowKey);
        }

        if (type === BUTTON_TYPES.SAVE) {

            const result = fireEvent(
                'HANDLE_BEFORE_INLINE_EDITOR_SAVE',
                events,
                {
                    values,
                    editor: editorState
                },
                null
            );

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

            fireEvent(
                'HANDLE_AFTER_INLINE_EDITOR_SAVE',
                events,
                {
                    values,
                    editor: editorState
                },
                null
            );

            store.dispatch(dismissEditor({ stateKey }));
        }
    };
}
