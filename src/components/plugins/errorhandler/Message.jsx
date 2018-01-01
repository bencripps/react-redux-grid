import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { prefix } from '../../../util/prefix';
import { stateGetter } from '../../../util/stateGetter';
import { gridConfig } from '../../../constants/GridConstants';
import {
    dismissError
} from '../../../actions/plugins/errorhandler/ErrorHandlerActions';

export const Message = ({ errorHandler, plugins, store, stateKey }) => {

    const defaultMessage = plugins
        && plugins.ERROR_HANDLER
        && plugins.ERROR_HANDLER.defaultErrorMessage
        ? plugins.ERROR_HANDLER.defaultErrorMessage
        : 'An Error Occurred';

    const showError = errorHandler && errorHandler.errorOccurred;

    const message = errorHandler && errorHandler.error
        ? errorHandler.error : defaultMessage;

    const errorMessage = getMessage(message, showError, store, stateKey);

    return errorMessage;
};

export const handleButtonClick = (store, stateKey) => {
    store.dispatch(dismissError({ stateKey }));
};

export const getMessage = (message, isShown, store, stateKey) => {

    const { CLASS_NAMES } = gridConfig();

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
        onClick: handleButtonClick.bind(this, store, stateKey)
    };

    return (
        <div { ...messageContainerProps }>
            <span { ...messageProps }>
                { message }
            </span>
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
        errorHandler: stateGetter(state, props, 'errorHandler', props.stateKey)
    };
}

export default connect(mapStateToProps)(Message);
