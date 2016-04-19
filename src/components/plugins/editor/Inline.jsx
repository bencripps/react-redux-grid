import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Button } from './inline/Button.jsx';

import { prefix } from '../../../util/prefix';
import { stateGetter } from '../../../util/stateGetter';
import { CLASS_NAMES } from '../../../constants/GridConstants';

export class Inline extends Component {
    componentDidUpdate() {
        /*
        * lifecycle event used to focus on first available input
        */

        const { config, editorState } = this.props;

        if (!config.focusOnEdit) {
            return false;
        }

        if (isEditorShown(editorState) && this.editedRow !== editorState.row.rowIndex) {
            this.editedRow = editorState.row.rowIndex;
            focusFirstEditor();
        }

        else if (!isEditorShown(editorState)) {
            this.editedRow = null;
        }

    }

    render() {

        const { BUTTON_TYPES, editorState, events, store } = this.props;

        let top = -100;

        if (isEditorShown(editorState)) {
            top = editorState.row.top;
        }

        const inlineEditorProps = {
            className: prefix(CLASS_NAMES.EDITOR.INLINE.CONTAINER, editorState && editorState.row
                ? CLASS_NAMES.EDITOR.INLINE.SHOWN : CLASS_NAMES.EDITOR.INLINE.HIDDEN),
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
                    <Button { ...{ type: BUTTON_TYPES.SAVE, editorState, events, store } }/>
                    <Button { ...{ type: BUTTON_TYPES.CANCEL, editorState, events, store } }/>
                </span>
            </div>
        );
    }

}

export const focusFirstEditor = () => {
    const input = document.querySelector('.react-grid-edit .react-grid-editor-wrapper input:enabled');

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
        errorHandler: stateGetter(state, props, 'errorhandler', 'errorState'),
        editorState: stateGetter(state, props, 'editor', 'editorState')
    };
}

export default connect(mapStateToProps)(Inline);