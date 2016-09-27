'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.treeToFlatList = undefined;

var _arrayFrom = require('array-from');

var _arrayFrom2 = _interopRequireDefault(_arrayFrom);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return (0, _arrayFrom2.default)(arr); } }

var treeToFlatList = exports.treeToFlatList = function treeToFlatList(data) {
    var rootIdentifier = arguments.length <= 1 || arguments[1] === undefined ? 'root' : arguments[1];
    var childIdentifier = arguments.length <= 2 || arguments[2] === undefined ? 'children' : arguments[2];


    if (!data) {
        throw new Error('Expected data to be defined');
    }

    var result = [];

    var stack = [];

    var cfg = { flatIndex: 0 };

    if (data[rootIdentifier]) {
        data = data[rootIdentifier];

        stack.push(toItem([], childIdentifier, cfg)(data));
    } else {
        stack = data[childIdentifier].map(toItem([-1], [0], childIdentifier));
    }

    while (stack.length) {

        var item = stack.shift();
        var children = item[childIdentifier];


        if (Array.isArray(children) && !item._hideChildren) {
            stack = children.map(toItem([].concat(_toConsumableArray(item._path), [item._id]), childIdentifier, cfg, item, children)).concat(stack);
        }

        result.push(item);

        // removing erroneous data since grid uses internal values
        delete item[childIdentifier];
        delete item.parentId;
        delete item.id;
    }

    return result;
};

var toItem = function toItem(path, childIdentifier, cfg, parent) {
    var siblings = arguments.length <= 4 || arguments[4] === undefined ? [] : arguments[4];
    return function (node) {
        var index = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];


        var previousSibling = siblings[index - 1] !== undefined ? siblings[index - 1] : undefined;

        var previousSiblingTotalChilden = previousSibling && previousSibling.children ? previousSibling.children.length : 0;

        return _extends({}, node, {
            _id: node.id,
            _parentId: node.parentId === undefined ? 'root' : node.parentId,
            _parentIndex: parent ? parent._index : 0,
            _depth: path.length,
            _hideChildren: node._hideChildren,
            _hasChildren: node[childIdentifier] && node[childIdentifier].length > 0,
            _index: index,
            _flatIndex: cfg.flatIndex++,
            _isFirstChild: index === 0,
            _isLastChild: index === siblings.length - 1,
            _previousSiblingId: previousSibling ? previousSibling.id : undefined,
            _previousSiblingTotalChilden: previousSiblingTotalChilden,
            _key: 'tree-item-' + node.id,
            _isExpanded: node[childIdentifier] && node[childIdentifier].length > 0 && !node._hideChildren,
            _leaf: !(node[childIdentifier] && node[childIdentifier].length > 0 || node.leaf !== undefined && node.leaf === false),
            _path: path
        });
    };
};