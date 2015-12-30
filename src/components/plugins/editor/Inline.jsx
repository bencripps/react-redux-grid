import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { prefix } from '../../../util/prefix';
import { CLASS_NAMES, ROW_HEIGHT } from '../../../constants/GridConstants';

class Inline extends Component {

	static defaultProps = {
		cancelButtonText: 'Save',
        saveButtonText: 'Cancel',
        BUTTON_TYPES: {
            CANCEL: 'CANCEL',
            SAVE: 'SAVE'
        },
	}

	getButton(type) {

		const { BUTTON_TYPES, saveButtonText, cancelButtonText } = this.props;

		const buttonProps = {
			text: type === BUTTON_TYPES.SAVE ? saveButtonText : cancelButtonText,
			onClick: this.onButtonClick
		}

		return (
			<button { ...buttonProps } > { buttonProps.text } </button>
		);

	}

	onButtonClick() {
		
	}

    render() {

    	const { BUTTON_TYPES, columns, editorState } = this.props;
        let top = 0;

        if (editorState && editorState.row) {
            top = editorState.row.top;
        }

    	const inlineEditorProps = {
    		className: prefix(CLASS_NAMES.EDITOR.INLINE.CONTAINER),
            style: {
                top: `${top + ROW_HEIGHT}px`
            }
    	};

        const tableProps = {
            className: prefix(CLASS_NAMES.EDITOR.INLINE.TABLE)
        };

        return (
            <div { ...inlineEditorProps }>
            	{ this.getButton(BUTTON_TYPES.CANCEL) }
            	{ this.getButton(BUTTON_TYPES.SAVE) }
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