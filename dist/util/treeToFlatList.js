'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var treeToFlatList = exports.treeToFlatList = function treeToFlatList(data) {
    var rootIdentifier = arguments.length <= 1 || arguments[1] === undefined ? 'root' : arguments[1];
    var childIdentifier = arguments.length <= 2 || arguments[2] === undefined ? 'children' : arguments[2];
    var list = arguments.length <= 3 || arguments[3] === undefined ? [] : arguments[3];
    var currentDepth = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];


    if (!data) {
        throw new Error('Expected data to be defined');
    }

    if (data[rootIdentifier]) {
        list.push(getItem(data[rootIdentifier], childIdentifier, currentDepth));
        if (data[rootIdentifier][childIdentifier]) {
            treeToFlatList(data[rootIdentifier][childIdentifier], rootIdentifier, childIdentifier, list);
        }
    } else {

        if (currentDepth === 0) {
            currentDepth = 1;
        }

        data.forEach(function (node) {

            list.push(getItem(node, childIdentifier, currentDepth));

            if (node[childIdentifier] && !node._hideChildren && node[childIdentifier].length > 0) {
                currentDepth++;
                treeToFlatList(node[childIdentifier], rootIdentifier, childIdentifier, list, currentDepth);
                currentDepth--;
            }
        });
    }

    return list;
};

var getItem = function getItem(node, childIdentifier, depth) {
    var _extends2;

    var child = _extends({}, node, (_extends2 = {}, _defineProperty(_extends2, childIdentifier, null), _defineProperty(_extends2, '_id', node.id), _defineProperty(_extends2, '_parentId', node.parentId === undefined ? 'root' : node.parentId), _defineProperty(_extends2, '_depth', depth), _defineProperty(_extends2, '_hideChildren', node._hideChildren), _defineProperty(_extends2, '_hasChildren', node[childIdentifier] && node[childIdentifier].length > 0), _defineProperty(_extends2, '_isExpanded', node[childIdentifier] && node[childIdentifier].length > 0 && !node._hideChildren), _defineProperty(_extends2, '_leaf', !(node[childIdentifier] && node[childIdentifier].length > 0 || node.leaf !== undefined && node.leaf === false)), _extends2));

    // removing erroneous data since grid uses internal values

    delete child[childIdentifier];
    delete child.parentId;
    delete child.id;

    return child;
};