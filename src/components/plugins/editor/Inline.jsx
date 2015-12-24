import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { prefix } from '../../../util/prefix';
import '../../../style/components/plugins/editor/inline.styl';
import { CLASS_NAMES } from '../../../constants/GridConstants';

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

    	const { BUTTON_TYPES } = this.props;

    	const inlineEditorProps = {
    		className: prefix(CLASS_NAMES.EDITOR.INLINE.CONTAINER)
    	};

        return (
            <div { ...inlineEditorProps }>
            	{ this.getButton(BUTTON_TYPES.CANCEL) },
            	{ this.getButton(BUTTON_TYPES.SAVE) }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        errorHandler: state.errorhandler.get('errorState')
    };
}

export default connect(mapStateToProps)(Inline);