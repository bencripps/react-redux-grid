"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var getTreePathFromId = exports.getTreePathFromId = function getTreePathFromId(flatData, id) {
    var res = [];
    var node = flatData.find(function (n) {
        return n._id === id;
    });

    var lastParentId = node._id;

    while (lastParentId !== undefined) {
        var parent = flatData.find(function (n) {
            return n._id === lastParentId;
        });

        if (parent) {
            res.push(parent._id);
            lastParentId = parent._parentId;
        } else {
            lastParentId = undefined;
        }
    }

    return res.reverse();
};