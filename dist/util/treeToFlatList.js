'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.treeToFlatList = undefined;

var _immutable = require('immutable');

var treeToFlatList = exports.treeToFlatList = function treeToFlatList(data) {
    var rootIdentifier = arguments.length <= 1 || arguments[1] === undefined ? 'root' : arguments[1];
    var childIdentifier = arguments.length <= 2 || arguments[2] === undefined ? 'children' : arguments[2];


    if (!data) {
        throw new Error('Expected data to be defined');
    }

    var result = [];

    var stack = (0, _immutable.List)();

    var cfg = { flatIndex: 0 };

    if (!_immutable.Map.isMap(data)) {
        data = (0, _immutable.fromJS)(data);
    }

    if (data.get(rootIdentifier)) {
        data = data.get(rootIdentifier);

        stack = stack.push(toItem((0, _immutable.List)(), childIdentifier, cfg)(data));
    } else {
        stack = data.get(childIdentifier).map(toItem((0, _immutable.List)([-1]), (0, _immutable.List)([0]), childIdentifier));
    }

    while (stack.count()) {

        var item = stack.first();

        stack = stack.shift();
        var children = item.get(childIdentifier);
        // console.log(item.get('id'), (children || List()).map(i => i.get('id')).toJS(), stack.map(i => i.get('id')).toJS());

        if (_immutable.List.isList(children) && !item.get('_hideChildren')) {
            stack = children.map(toItem(item.get('_path').push(item.get('_id')), childIdentifier, cfg, item, children)).concat(stack);
        }

        // removing erroneous data since grid uses internal values
        result.push(item.delete(childIdentifier).delete('parentId').delete('id'));
    }

    return (0, _immutable.List)(result);
};

var toItem = function toItem(path, childIdentifier, cfg, parent) {
    var siblings = arguments.length <= 4 || arguments[4] === undefined ? (0, _immutable.List)() : arguments[4];
    return function (node) {
        var index = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];


        var previousSibling = index - 1 > -1 ? siblings.get(index - 1) : undefined;

        var previousSiblingTotalChilden = previousSibling && previousSibling.get(childIdentifier) ? previousSibling.get(childIdentifier).count() : 0;

        return node.merge({
            _id: node.get('id'),
            _parentId: node.get('parentId', 'root'),
            _parentIndex: parent ? parent.get('_index') : 0,
            _depth: path.count(),
            _hideChildren: node.get('_hideChildren'),
            _hasChildren: node.get(childIdentifier) && node.get(childIdentifier).count() > 0,
            _index: index,
            _flatIndex: cfg.flatIndex++,
            _isFirstChild: index === 0,
            _isLastChild: index === siblings.count() - 1,
            _previousSiblingId: previousSibling ? previousSibling.get('id') : undefined,
            _previousSiblingTotalChilden: previousSiblingTotalChilden,
            _key: 'tree-item-' + node.get('id'),
            _isExpanded: node.get(childIdentifier) && node.get(childIdentifier).count() > 0 && !node.get('_hideChildren'),
            _leaf: !(node.get(childIdentifier) && node.get(childIdentifier).count() > 0 || node.get('leaf') !== undefined && node.get('leaf') === false),
            _path: path
        });
    };
};