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
    var dataSource = _ref.dataSource;
    var events = _ref.events;
    var index = _ref.index;
    var isSelected = _ref.isSelected;
    var onSelect = _ref.onSelect;
    var rowData = _ref.rowData;
    var rowId = _ref.rowId;
    var selectedRows = _ref.selectedRows;
    var selectionModelConfig = _ref.selectionModelConfig;
    var stateKey = _ref.stateKey;
    var store = _ref.store;
    var type = _ref.type;


    var checkBoxContainerProps = {
        className: (0, _prefix.prefix)(_GridConstants.CLASS_NAMES.SELECTION_MODEL.CHECKBOX_CONTAINER, type === 'header' && selectionModelConfig.mode === _GridConstants.SELECTION_MODES.checkboxSingle ? 'hidden' : '')
    };

    var checkBoxProps = {
        className: (0, _prefix.prefix)(_GridConstants.CLASS_NAMES.SELECTION_MODEL.CHECKBOX),
        checked: selectedRows ? selectedRows[rowId] : false,
        type: 'checkbox',
        onChange: handleChange.bind(undefined, dataSource, store, type, stateKey, onSelect, rowId, index, rowData, selectionModelConfig, isSelected, events)
    };

    return type === 'header' ? getHeader(checkBoxContainerProps, checkBoxProps) : getColumn(checkBoxContainerProps, checkBoxProps);
};

var handleChange = exports.handleChange = function handleChange(dataSource, store, type, stateKey, onSelect, id, index, rowData, selectionModelConfig, isSelected, events, reactEvent) {

    var target = reactEvent.target;

    if (type === 'header') {

        if (target.checked) {
            store.dispatch((0, _ModelActions.selectAll)({ stateKey: stateKey, data: dataSource }));
            if (events.HANDLE_AFTER_SELECT_ALL) {
                events.HANDLE_AFTER_SELECT_ALL({ data: dataSource, store: store });
            }
        } else {
            store.dispatch((0, _ModelActions.deselectAll)({ stateKey: stateKey }));
            if (events.HANDLE_AFTER_DESELECT_ALL) {
                events.HANDLE_AFTER_DESELECT_ALL({ data: dataSource, store: store });
            }
        }
    } else if (selectionModelConfig.selectionEvent !== 'singleclick') {
        reactEvent.stopPropagation();
        onSelect({ id: id, index: index, data: rowData, selected: isSelected });
    }
};

var getHeader = exports.getHeader = function getHeader(checkBoxContainerProps, checkBoxProps) {

    return _react2.default.createElement(
        'th',
        checkBoxContainerProps,
        _react2.default.createElement('input', _extends({
            type: 'checkbox'
        }, checkBoxProps))
    );
};

var getColumn = exports.getColumn = function getColumn(checkBoxContainerProps, checkBoxProps) {
    return _react2.default.createElement(
        'td',
        checkBoxContainerProps,
        _react2.default.createElement('input', _extends({
            type: 'checkbox'
        }, checkBoxProps))
    );
};

CheckBox.propTypes = {
    dataSource: _react.PropTypes.object,
    index: _react.PropTypes.number,
    onSelect: _react.PropTypes.func,
    reducerKeys: _react.PropTypes.object,
    rowId: _react.PropTypes.any,
    selectedRows: _react.PropTypes.object,
    selectionModelConfig: _react.PropTypes.object,
    store: _react.PropTypes.object,
    type: _react.PropTypes.string
};

CheckBox.defaultProps = {
    selectionModelConfig: {}
};

function mapStateToProps(state, props) {
    return {
        pager: (0, _stateGetter.stateGetter)(state, props, 'pager', props.stateKey),
        dataSource: (0, _stateGetter.stateGetter)(state, props, 'dataSource', props.stateKey),
        selectedRows: (0, _stateGetter.stateGetter)(state, props, 'selection', props.stateKey)
    };
}

var ConnectedCheckBox = (0, _reactRedux.connect)(mapStateToProps)(CheckBox);

exports.ConnectedCheckBox = ConnectedCheckBox;