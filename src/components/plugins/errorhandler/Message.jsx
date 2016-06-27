import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { prefix } from '../../../util/prefix';
import { stateGetter } from '../../../util/stateGetter';
import { CLASS_NAMES } from '../../../constants/GridConstants';
import {
    dismissError
} from '../../../actions/plugins/errorhandler/ErrorHandlerActions';

export const Message = ({ errorHandler, plugins, store }) => {

    const defaultMessage = plugins
        && plugins.ERROR_HANDLER
        && plugins.ERROR_HANDLER.defaultErrorMessage
        ? plugins.ERROR_HANDLER.defaultErrorMessage
        : 'An Error Occurred';

    const showError = errorHandler && errorHandler.errorOccurred;

    const message = errorHandler && errorHandler.error
        ? errorHandler.error : defaultMessage;

    const errorMessage = getMessage(message, showError, store);

    return errorMessage;
};

export const handleButtonClick = (store) => {
    store.dispatch(dismissError());
};

export const getMessage = (message, isShown, store) => {

    const messageContainerProps = {
        className: prefix(
            CLASS_NAMES.ERROR_HANDLER.CONTAINER,
            isShown ? 'shown' : null
        )
    };

    const messageProps = {
        className: prefix(CLASS_NAMES.ERROR_HANDLER.MESSAGE)
    };

    const buttonProps = {
        onClick: handleButtonClick.bind(this, store)
    };

    return (
        <div { ...messageContainerProps }>
            <span { ...messageProps }> { message } </span>
            <button { ...buttonProps }>
                { 'Close' }
            </button>
        </div>
    );
};

Message.propTypes = {
    errorHandler: PropTypes.object,
    plugins: PropTypes.object,
    store: PropTypes.object
};

Message.defaultProps = {};

function mapStateToProps(state, props) {
    return {
        errorHandler: stateGetter(state, props, 'errorhandler', 'errorState')
    };
}

export default connect(mapStateToProps)(Message);
