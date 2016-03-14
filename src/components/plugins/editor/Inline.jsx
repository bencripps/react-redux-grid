import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { Button } from './inline/Button.jsx';

import { prefix } from '../../../util/prefix';
import { stateGetter } from '../../../util/stateGetter';
import { CLASS_NAMES, ROW_HEIGHT } from '../../../constants/GridConstants';

export const Inline = ({ BUTTON_TYPES,
    editorState, events, reducerKeys, store}) => {

    let top = -100;

    if (editorState && editorState.row) {
        top = editorState.row.top;
    }

    const inlineEditorProps = {
        className: prefix(CLASS_NAMES.EDITOR.INLINE.CONTAINER, editorState && editorState.row
            ? CLASS_NAMES.EDITOR.INLINE.SHOWN : CLASS_NAMES.EDITOR.INLINE.HIDDEN),
        style: {
            top: `${top + (ROW_HEIGHT / 2)}px`
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
};

Inline.propTypes = {
    BUTTON_TYPES: PropTypes.object,
    columns: PropTypes.array,
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