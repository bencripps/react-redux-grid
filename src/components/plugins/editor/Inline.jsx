import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { Button } from './inline/Button';

import { prefix } from '../../../util/prefix';
import { stateGetter } from '../../../util/stateGetter';
import { getEditorTop } from '../../../util/getEditorTop';
import { getRowBoundingRect } from '../../../util/getRowBoundingRect';
import { gridConfig } from '../../../constants/GridConstants';
import {
    repositionEditor
} from '../../../actions/plugins/editor/EditorActions';

export class Inline extends Component {

    render() {

        const { CLASS_NAMES } = gridConfig();

        const {
            BUTTON_TYPES,
            editorState,
            events,
            stateKey,
            store
        } = this.props;

        const { position } = this.state;
        const editedRowKey = getEditedRowKey(editorState);

        if (!editedRowKey) {
            return null;
        }

        let top = -100;

        if (isEditorShown(editorState)) {
            top = editorState.get(editedRowKey).top;
        }

        const inlineEditorProps = {
            className: prefix(
                CLASS_NAMES.EDITOR.INLINE.CONTAINER,
                editorState && editorState.get(editedRowKey)
                    ? CLASS_NAMES.EDITOR.INLINE.SHOWN
                    : CLASS_NAMES.EDITOR.INLINE.HIDDEN,
                position
            ),
            style: {
                top: `${top}px`
            }
        };

        const buttonContainerProps = {
            className: prefix(CLASS_NAMES.EDITOR.INLINE.BUTTON_CONTAINER)
        };

        return (
            <div { ...inlineEditorProps }>
                <span { ...buttonContainerProps }>
                    <Button
                        editedRowKey={editedRowKey}
                        editorState={editorState}
                        events={events}
                        stateKey={stateKey}
                        store={store}
                        type={BUTTON_TYPES.CANCEL}
                    />
                    <Button
                        editedRowKey={editedRowKey}
                        editorState={editorState}
                        events={events}
                        stateKey={stateKey}
                        store={store}
                        type={BUTTON_TYPES.SAVE}
                    />
                </span>
            </div>
        );
    }

    componentDidUpdate() {
        /*
        * lifecycle event used to focus on first available input
        * and to reposition editor
        */
        const dom = ReactDOM.findDOMNode(this);
        const { config, editorState, store, stateKey } = this.props;
        const editedRowKey = getEditedRowKey(editorState);
        const { position } = this.state;

        resetEditorPosition.call(
            this, editorState, store, stateKey, dom, position, editedRowKey
        );

        if (!config.focusOnEdit) {
            return false;
        }

        if (isEditorShown(editorState)
            && this.editedRow !== editorState.get(editedRowKey).rowIndex) {

            this.editedRow = editorState.get(editedRowKey).rowIndex;
            focusFirstEditor(dom);
        }

        else if (!isEditorShown(editorState)) {
            this.editedRow = null;
        }

    }

    constructor(props) {
        super(props);
        this.state = {};
    }

}

export const getRowFromInput = (inputEl) => {

    const { CLASS_NAMES } = gridConfig();

    while (inputEl !== null && inputEl.classList) {
        if (inputEl.classList.contains(prefix(CLASS_NAMES.ROW))) {
            return inputEl;
        }

        inputEl = inputEl.parentNode;
    }

    return null;

};

export function resetEditorPosition(
    editorState, store, stateKey, dom, position, rowId
) {

    if (!dom) {
        return;
    }

    const input = dom.parentNode.querySelector(getInputSelector());

    if (input) {
        const row = getRowFromInput(input);
        const { spaceBottom } = getRowBoundingRect(row);
        const editedRowKey = getEditedRowKey(editorState);

        const moveToTop = spaceBottom < row.clientHeight * 2;

        if (row
            && editorState
            && editorState.get(editedRowKey)
            && editorState.get(editedRowKey).top) {

            const top = getEditorTop(row, moveToTop, dom);

            if (top !== editorState.get(editedRowKey).top) {
                store.dispatch(repositionEditor({
                    stateKey,
                    top,
                    rowId
                }));
            }

            if (position === 'top' && !moveToTop
                || moveToTop && !position) {
                this.setState({
                    position: 'bottom'
                });
            }

            else if (position === 'bottom' && moveToTop
                || !moveToTop && !position) {
                this.setState({
                    position: 'top'
                });
            }

        }
    }

}

/* eslint-disable max-len */
export const getInputSelector = () => {
    const { CLASS_NAMES } = gridConfig();
    return [
        `.${prefix(CLASS_NAMES.EDITED_CELL)} .${prefix(CLASS_NAMES.EDITOR.INLINE.INPUT_WRAPPER)} input:enabled,`,
        `.${prefix(CLASS_NAMES.EDITED_CELL)} .${prefix(CLASS_NAMES.EDITOR.INLINE.INPUT_WRAPPER)} select:enabled`
    ].join(' ');
};
/* eslint-enable max-len */

export const getEditedRowKey = editorState => {

    if (!editorState) {
        return null;
    }

    const p = editorState.find(k => k !== 'lastUpdate');

    if (!p || !p.get) {
        return null;
    }

    return p.get('key');

};

export const focusFirstEditor = (dom) => {
    const input = dom.parentNode.querySelector(getInputSelector());

    if (input && input.focus) {
        input.focus();
    }
};

export const isEditorShown = (editorState) => {
    const editedRowKey = getEditedRowKey(editorState);
    return editorState && editorState.get(editedRowKey);
};

Inline.propTypes = {
    BUTTON_TYPES: PropTypes.object,
    columns: PropTypes.array,
    config: PropTypes.object.isRequired,
    editorState: PropTypes.object,
    events: PropTypes.object,
    reducerKeys: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    stateKey: PropTypes.string,
    store: PropTypes.object
};

Inline.defaultProps = {
    BUTTON_TYPES: {
        CANCEL: 'CANCEL',
        SAVE: 'SAVE'
    }
};

function mapStateToProps(state, props) {
    return {
        editorState: stateGetter(state, props, 'editor', props.stateKey)
    };
}

export default connect(mapStateToProps)(Inline);
