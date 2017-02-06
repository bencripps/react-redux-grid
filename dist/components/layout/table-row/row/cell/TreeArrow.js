'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.handleArrowClick = exports.getClassName = exports.TreeArrow = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _prefix = require('./../../../../../util/prefix');

var _GridConstants = require('./../../../../../constants/GridConstants');

var _GridActions = require('./../../../../../actions/GridActions');

var _LocalStorageManager = require('./../../../../core/LocalStorageManager');

var _LocalStorageManager2 = _interopRequireDefault(_LocalStorageManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debouncedSetStateItem = _LocalStorageManager2.default.debouncedSetStateItem();

var TreeArrow = exports.TreeArrow = function TreeArrow(_ref) {
    var depth = _ref.depth,
        hasChildren = _ref.hasChildren,
        id = _ref.id,
        isEditable = _ref.isEditable,
        isExpandable = _ref.isExpandable,
        isExpanded = _ref.isExpanded,
        readFunc = _ref.readFunc,
        showTreeRootNode = _ref.showTreeRootNode,
        shouldNest = _ref.shouldNest,
        stateful = _ref.stateful,
        stateKey = _ref.stateKey,
        store = _ref.store;

    var _gridConfig = (0, _GridConstants.gridConfig)(),
        CLASS_NAMES = _gridConfig.CLASS_NAMES;

    var className = getClassName({
        CLASS_NAMES: CLASS_NAMES,
        isEditable: isEditable,
        isExpandable: isExpandable,
        shouldNest: shouldNest,
        isExpanded: isExpanded,
        depth: depth
    });
    var onClick = handleArrowClick.bind(null, {
        hasChildren: hasChildren,
        id: id,
        isExpanded: isExpanded,
        readFunc: readFunc,
        showTreeRootNode: showTreeRootNode,
        stateKey: stateKey,
        stateful: stateful,
        store: store
    });

    return _react2.default.createElement('span', {
        className: className,
        onClick: onClick
    });
};

var getClassName = exports.getClassName = function getClassName(_ref2) {
    var CLASS_NAMES = _ref2.CLASS_NAMES,
        isEditable = _ref2.isEditable,
        isExpandable = _ref2.isExpandable,
        shouldNest = _ref2.shouldNest,
        isExpanded = _ref2.isExpanded,
        depth = _ref2.depth;
    return (0, _prefix.prefix)(CLASS_NAMES.CELL_TREE_ARROW, isEditable ? 'edit' : '', isExpandable ? 'expand' : '', shouldNest ? 'tree-nested' : '', depth !== undefined ? 'tree-node-depth-' + depth : '', isExpanded ? 'node-expanded' : 'node-unexpanded');
};

var handleArrowClick = exports.handleArrowClick = function handleArrowClick(_ref3, e) {
    var hasChildren = _ref3.hasChildren,
        id = _ref3.id,
        isExpanded = _ref3.isExpanded,
        readFunc = _ref3.readFunc,
        showTreeRootNode = _ref3.showTreeRootNode,
        stateKey = _ref3.stateKey,
        stateful = _ref3.stateful,
        store = _ref3.store;

    e.stopPropagation();

    if (!hasChildren) {
        readFunc({
            parentId: id
        });
    } else {
        store.dispatch((0, _GridActions.setTreeNodeVisibility)({
            stateKey: stateKey,
            id: id,
            showTreeRootNode: showTreeRootNode
        }));
    }

    if (stateful) {
        // if stateful
        // save which node ids have been expanded
        var expandedColumns = _LocalStorageManager2.default.getStateItem({
            stateKey: stateKey,
            property: 'expandedNodes',
            shouldSave: false
        }) || {};

        expandedColumns[id] = !isExpanded;

        debouncedSetStateItem({
            stateKey: stateKey,
            property: 'expandedNodes',
            value: expandedColumns
        });
    }
};

var any = _react.PropTypes.any,
    bool = _react.PropTypes.bool,
    func = _react.PropTypes.func,
    object = _react.PropTypes.object,
    oneOfType = _react.PropTypes.oneOfType,
    number = _react.PropTypes.number,
    string = _react.PropTypes.string;


TreeArrow.propTypes = {
    depth: number,
    gridType: oneOfType(['grid', 'tree']),
    hasChildren: bool,
    id: any,
    isEditable: bool,
    isExpandable: bool,
    isExpanded: bool,
    readFunc: func,
    shouldNest: bool,
    showTreeRootNode: bool,
    stateKey: string,
    stateful: bool,
    store: object
};

TreeArrow.defaultProps = {};

exports.default = TreeArrow;