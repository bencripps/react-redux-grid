'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EmptyHeader = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EmptyHeader = exports.EmptyHeader = function EmptyHeader(props) {

    var headerProps = Object.assign({
        style: {
            width: '100%'
        },
        key: 'react-grid-empty-header'
    }, props);

    return _react2.default.createElement('th', headerProps);
};

var object = _react.PropTypes.object;


EmptyHeader.propTypes = {
    props: object
};