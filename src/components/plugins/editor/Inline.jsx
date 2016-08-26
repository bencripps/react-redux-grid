import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { Button } from './inline/Button';

import { prefix } from '../../../util/prefix';
import { stateGetter } from '../../../util/stateGetter';
import { getEditorTop } from '../../../util/getEditorTop';
import { getRowBoundingRect } from '../../../util/getRowBoundingRect';
import { CLASS_NAMES } from '../../../constants/GridConstants';
import {
    repositionEditor
} from '../../../actions/plugins/editor/EditorActions';

const INPUT_SELECTOR = [
    '.react-grid-edit .react-grid-editor-wrapper input:enabled,',
    '.react-grid-edit .react-grid-editor-wrapper select:enabled'
].join(' ');

export class Inline extends Component {

    render() {

        const {
            BUTTON_TYPES,
            editorState,
            events,
            stateKey,
            store
        } = this.props;

        const { position } = this.state;

        let top = -100;

        if (isEditorShown(editorState)) {
            top = editorState.row.top;
        }

        const inlineEditorProps = {
            className: prefix(
                CLASS_NAMES.EDITOR.INLINE.CONTAINER,
                editorState && editorState.row
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
                    <Button { ...{
                        type: BUTTON_TYPES.CANCEL,
                        editorState,
                        events,
                        stateKey,
                        store
                    } }/>
                    <Button { ...{
                        type: BUTTON_TYPES.SAVE,
                        editorState,
                        events,
                        stateKey,
                        store }
                    }/>
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
        const { position } = this.state;

        resetEditorPosition.call(
            this, editorState, store, stateKey, dom, position
        );

        if (!config.focusOnEdit) {
            return false;
        }

        if (isEditorShown(editorState)
            && this.editedRow !== editorState.row.rowIndex) {

            this.editedRow = editorState.row.rowIndex;
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

    while (inputEl !== null && inputEl.classList) {
        if (inputEl.classList.contains('react-grid-row')) {
            return inputEl;
        }

        inputEl = inputEl.parentNode;
    }

    return null;

};

export function resetEditorPosition(
    editorState, store, stateKey, dom, position
) {
    const input = dom.parentNode.querySelector(INPUT_SELECTOR);

    if (input) {
        const row = getRowFromInput(input);
        const { spaceBottom } = getRowBoundingRect(row);

        const moveToTop = spaceBottom < row.clientHeight * 2;

        if (row
            && editorState
            && editorState.row
            && editorState.row.top) {

            const top = getEditorTop(row, moveToTop, dom);

            if (top !== editorState.row.top) {
                store.dispatch(repositionEditor({
                    stateKey,
                    top
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

export const focusFirstEditor = (dom) => {
    const input = dom.parentNode.querySelector(INPUT_SELECTOR);

    if (input && input.focus) {
        input.focus();
    }
};

export const isEditorShown = (editorState) => {
    return editorState && editorState.row;
};

Inline.propTypes = {
    BUTTON_TYPES: PropTypes.object,
    columns: PropTypes.array,
    config: PropTypes.object.isRequired,
    editorState: PropTypes.object,
    events: PropTypes.object,
    reducerKeys: PropTypes.object,
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
        errorHandler: stateGetter(state, props, 'errorhandler', props.stateKey),
        editorState: stateGetter(state, props, 'editor', props.stateKey)
    };
}

export default connect(mapStateToProps)(Inline);
