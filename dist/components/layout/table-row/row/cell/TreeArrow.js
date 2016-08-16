'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.handleArrowClick = exports.TreeArrow = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _prefix = require('./../../../../../util/prefix');

var _GridConstants = require('./../../../../../constants/GridConstants');

var _GridActions = require('./../../../../../actions/GridActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TreeArrow = exports.TreeArrow = function TreeArrow(_ref) {
    var depth = _ref.depth;
    var hasChildren = _ref.hasChildren;
    var id = _ref.id;
    var isEditable = _ref.isEditable;
    var isExpandable = _ref.isExpandable;
    var isExpanded = _ref.isExpanded;
    var readFunc = _ref.readFunc;
    var showTreeRootNode = _ref.showTreeRootNode;
    var shouldNest = _ref.shouldNest;
    var stateKey = _ref.stateKey;
    var store = _ref.store;


    var arrowProps = {
        className: (0, _prefix.prefix)(_GridConstants.CLASS_NAMES.CELL_TREE_ARROW, isEditable ? 'edit' : '', isExpandable ? 'expand' : '', shouldNest ? 'tree-nested' : '', depth !== undefined ? 'tree-node-depth-' + depth : '', isExpanded ? 'node-expanded' : 'node-unexpanded'),
        onClick: handleArrowClick.bind(null, {
            store: store, stateKey: stateKey, showTreeRootNode: showTreeRootNode, hasChildren: hasChildren, id: id, readFunc: readFunc
        })
    };

    return _react2.default.createElement('span', arrowProps);
};

var handleArrowClick = exports.handleArrowClick = function handleArrowClick(_ref2, e) {
    var showTreeRootNode = _ref2.showTreeRootNode;
    var store = _ref2.store;
    var stateKey = _ref2.stateKey;
    var hasChildren = _ref2.hasChildren;
    var id = _ref2.id;
    var readFunc = _ref2.readFunc;

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
};

var any = _react.PropTypes.any;
var bool = _react.PropTypes.bool;
var func = _react.PropTypes.func;
var object = _react.PropTypes.object;
var oneOfType = _react.PropTypes.oneOfType;
var number = _react.PropTypes.number;
var string = _react.PropTypes.string;


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
    store: object
};

TreeArrow.defaultProps = {};

exports.default = TreeArrow;