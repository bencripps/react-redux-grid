import {
    Record
} from 'immutable';

const ErrorHandler = Record({
    error: '',
    errorOccurred: false,
    lastUpdate: 0
});

export default ErrorHandler;
