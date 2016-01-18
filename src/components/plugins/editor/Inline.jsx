import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { prefix } from '../../../util/prefix';
import { CLASS_NAMES, ROW_HEIGHT } from '../../../constants/GridConstants';
import { dismissEditor } from '../../../actions/plugins/editor/EditorActions';

class Inline extends Component {

	static defaultProps = {
		cancelButtonText: 'Cancel',
        saveButtonText: 'Save',
        BUTTON_TYPES: {
            CANCEL: 'CANCEL',
            SAVE: 'SAVE'
        },
	}

	getButton(type) {

		const { BUTTON_TYPES, saveButtonText, cancelButtonText } = this.props;

        const text = type === BUTTON_TYPES.SAVE ? saveButtonText : cancelButtonText

		const buttonProps = {
			onClick: this.onButtonClick.bind(this, type),
            className: type === BUTTON_TYPES.SAVE 
                ? prefix(CLASS_NAMES.EDITOR.INLINE.SAVE_BUTTON) : prefix(CLASS_NAMES.EDITOR.INLINE.CANCEL_BUTTON)
		}

		return (
			<button { ...buttonProps } > { text } </button>
		);

	}

	onButtonClick(type) {
		const { store, BUTTON_TYPES, events } = this.props;

        if (type === BUTTON_TYPES.CANCEL) {
            store.dispatch(dismissEditor());
        }

        else if (type === BUTTON_TYPES.SAVE) {

            if (events.HANDLE_AFTER_INLINE_EDITOR_SAVE) {
                events.HANDLE_AFTER_INLINE_EDITOR_SAVE.apply(this, arguments);
            }

            store.dispatch(dismissEditor());
        }
	}

    render() {

    	const { BUTTON_TYPES, columns, editorState } = this.props;
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

        const tableProps = {
            className: prefix(CLASS_NAMES.EDITOR.INLINE.TABLE)
        };

        const buttonContainerProps = {
          className: prefix(CLASS_NAMES.EDITOR.INLINE.BUTTON_CONTAINER)  
        };

        return (
            <div { ...inlineEditorProps }>
                <span { ...buttonContainerProps }>
                	{ this.getButton(BUTTON_TYPES.SAVE) }
                    { this.getButton(BUTTON_TYPES.CANCEL) }
                </span>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        errorHandler: state.errorhandler.get('errorState'),
        editorState: state.editor.get('editorState')
    };
}

export default connect(mapStateToProps)(Inline);