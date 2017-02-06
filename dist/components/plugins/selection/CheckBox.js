'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ConnectedCheckBox = exports.getColumn = exports.getHeader = exports.handleChange = exports.CheckBox = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _prefix = require('../../../util/prefix');

var _fire = require('../../../util/fire');

var _stateGetter = require('../../../util/stateGetter');

var _GridConstants = require('../../../constants/GridConstants');

var _ModelActions = require('../../../actions/plugins/selection/ModelActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CheckBox = exports.CheckBox = function CheckBox(_ref) {
    var dataSource = _ref.dataSource,
        events = _ref.events,
        index = _ref.index,
        isSelected = _ref.isSelected,
        onSelect = _ref.onSelect,
        rowData = _ref.rowData,
        rowId = _ref.rowId,
        selectedRows = _ref.selectedRows,
        selectionModelConfig = _ref.selectionModelConfig,
        stateKey = _ref.stateKey,
        store = _ref.store,
        type = _ref.type;

    var _gridConfig = (0, _GridConstants.gridConfig)(),
        CLASS_NAMES = _gridConfig.CLASS_NAMES;

    var checkBoxContainerProps = {
        className: (0, _prefix.prefix)(CLASS_NAMES.SELECTION_MODEL.CHECKBOX_CONTAINER, type === 'header' && selectionModelConfig.mode === _GridConstants.SELECTION_MODES.checkboxSingle ? 'hidden' : '')
    };

    var checked = selectedRows && selectedRows.get && selectedRows.get(rowId) !== undefined ? selectedRows.get(rowId) : false;

    if (type === 'header') {
        // check to see if all rows are selected - lastUpdate
        checked = selectedRows && selectedRows.count ? selectedRows.count() - 1 === dataSource.currentRecords.count() : false;
    }

    var checkBoxProps = {
        className: (0, _prefix.prefix)(CLASS_NAMES.SELECTION_MODEL.CHECKBOX),
        checked: checked,
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

            (0, _fire.fireEvent)('HANDLE_AFTER_SELECT_ALL', events, {
                data: dataSource,
                store: store
            }, reactEvent);
        } else {
            store.dispatch((0, _ModelActions.deselectAll)({ stateKey: stateKey }));

            (0, _fire.fireEvent)('HANDLE_AFTER_DESELECT_ALL', events, {
                data: dataSource,
                store: store
            }, reactEvent);
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
        _react2.default.createElement('input', Object.assign({
            type: 'checkbox'
        }, checkBoxProps))
    );
};

var getColumn = exports.getColumn = function getColumn(checkBoxContainerProps, checkBoxProps) {
    return _react2.default.createElement(
        'td',
        checkBoxContainerProps,
        _react2.default.createElement('input', Object.assign({
            type: 'checkbox'
        }, checkBoxProps))
    );
};

var any = _react.PropTypes.any,
    func = _react.PropTypes.func,
    number = _react.PropTypes.number,
    object = _react.PropTypes.object,
    string = _react.PropTypes.string;


CheckBox.propTypes = {
    dataSource: object,
    index: number,
    onSelect: func,
    reducerKeys: object,
    rowId: any,
    selectedRows: object,
    selectionModelConfig: object,
    store: object,
    type: string
};

CheckBox.defaultProps = {
    selectionModelConfig: {}
};

function mapStateToProps(state, props) {
    return {
        dataSource: (0, _stateGetter.stateGetter)(state, props, 'dataSource', props.stateKey),
        selectedRows: (0, _stateGetter.stateGetter)(state, props, 'selection', props.stateKey)
    };
}

var ConnectedCheckBox = (0, _reactRedux.connect)(mapStateToProps)(CheckBox);

exports.ConnectedCheckBox = ConnectedCheckBox;