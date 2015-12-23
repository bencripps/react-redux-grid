import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { prefix } from '../../../util/prefix';
import '../../../style/components/plugins/errorhandler/message.styl';
import { CLASS_NAMES } from '../../../constants/GridConstants';
import { dismissError } from '../../../actions/plugins/errorhandler/ErrorHandlerActions';

class Message extends Component {

    static defaultProps = {
        store: React.PropTypes.func.isRequired,
        plugins: React.PropTypes.object.isRequired
    }
        
    getMessage(message) {

        const messageContainerProps = {
            className: prefix(CLASS_NAMES.ERROR_HANDLER.CONTAINER)
        }

        const messageProps = {
            className: prefix(CLASS_NAMES.ERROR_HANDLER.MESSAGE)
        }

        const buttonProps = {
            onClick: this.handleButtonClick.bind(this)
        }

        return (
            <div { ...messageContainerProps }> 
                <span { ...messageProps }> { message } </span>
                <button { ...buttonProps }>
                    { 'Close' }
                </button>
            </div>
        );
    }

    handleButtonClick() {
        
        const { store } = this.props;    
             
        store.dispatch(dismissError());
    }

    render() {

        const { errorHandler, plugins } = this.props;

        const defaultMessage = plugins 
            && plugins.ERROR_HANDLER 
            && plugins.ERROR_HANDLER.defaultErrorMessage ? plugins.ERROR_HANDLER.defaultErrorMessage : 'An Error Occurred';

        const showError = errorHandler && errorHandler.errorOccurred;

        const message = errorHandler && errorHandler.error ? errorHandler.error : defaultMessage;

        const errorMessage = showError ? this.getMessage(message) : null;

        return errorMessage
    }
}

function mapStateToProps(state) {
    return {
        errorHandler: state.errorhandler.get('errorState')
    };
}

export default connect(mapStateToProps)(Message);