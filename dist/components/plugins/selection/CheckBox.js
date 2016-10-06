'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ConnectedCheckBox = exports.getColumn = exports.getHeader = exports.handleChange = exports.CheckBox = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _prefix = require('../../../util/prefix');

var _stateGetter = require('../../../util/stateGetter');

var _GridConstants = require('../../../constants/GridConstants');

var _ModelActions = require('../../../actions/plugins/selection/ModelActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CheckBox = exports.CheckBox = function CheckBox(_ref) {
    var reducerKeys = _ref.reducerKeys;
    var dataSource = _ref.dataSource;
    var rowId = _ref.rowId;
    var selectedRows = _ref.selectedRows;
    var store = _ref.store;
    var stateKey = _ref.stateKey;
    var type = _ref.type;


    var checkBoxContainerProps = {
        className: (0, _prefix.prefix)(_GridConstants.CLASS_NAMES.SELECTION_MODEL.CHECKBOX_CONTAINER)
    };

    var checkBoxProps = {
        className: (0, _prefix.prefix)(_GridConstants.CLASS_NAMES.SELECTION_MODEL.CHECKBOX),
        checked: selectedRows ? selectedRows[rowId] : false,
        type: 'checkbox',
        onChange: handleChange.bind(undefined, dataSource, store, type, stateKey)
    };

    return type === 'header' ? getHeader(checkBoxContainerProps, checkBoxProps) : getColumn(checkBoxContainerProps, checkBoxProps);
};

var handleChange = exports.handleChange = function handleChange(dataSource, store, type, stateKey, reactEvent) {
    var target = reactEvent.target;

    if (type === 'header') {
        if (target.checked) {
            store.dispatch((0, _ModelActions.selectAll)({ stateKey: stateKey, data: dataSource }));
        } else {
            store.dispatch((0, _ModelActions.deselectAll)({ stateKey: stateKey }));
        }
    }
};

var getHeader = exports.getHeader = function getHeader(checkBoxContainerProps, checkBoxProps) {

    return _react2.default.createElement(
        'th',
        checkBoxContainerProps,
        _react2.default.createElement('input', _extends({ type: 'checkbox' }, checkBoxProps))
    );
};

var getColumn = exports.getColumn = function getColumn(checkBoxContainerProps, checkBoxProps) {
    return _react2.default.createElement(
        'td',
        checkBoxContainerProps,
        _react2.default.createElement('input', _extends({ type: 'checkbox' }, checkBoxProps))
    );
};

CheckBox.propTypes = {
    dataSource: _react.PropTypes.object,
    reducerKeys: _react.PropTypes.object,
    rowId: _react.PropTypes.any,
    selectedRows: _react.PropTypes.object,
    store: _react.PropTypes.object,
    type: _react.PropTypes.string
};

CheckBox.defaultProps = {};

function mapStateToProps(state, props) {
    return {
        pager: (0, _stateGetter.stateGetter)(state, props, 'pager', props.stateKey),
        dataSource: (0, _stateGetter.stateGetter)(state, props, 'dataSource', props.stateKey),
        selectedRows: (0, _stateGetter.stateGetter)(state, props, 'selection', props.stateKey)
    };
}

var ConnectedCheckBox = (0, _reactRedux.connect)(mapStateToProps)(CheckBox);

exports.ConnectedCheckBox = ConnectedCheckBox;