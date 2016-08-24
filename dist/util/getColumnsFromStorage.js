'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getColumnsFromStorage = undefined;

var _getData = require('./getData');

// properties to map from state
// order is an implicit prop
var mappableProps = ['hidden', 'width'];

var getColumnsFromStorage = exports.getColumnsFromStorage = function getColumnsFromStorage(fromStorage, columns) {

    var ret = [];
    var foundValues = [];

    fromStorage.forEach(function (col) {

        var dataIndex = (0, _getData.nameFromDataIndex)(col);
        var colFromProp = columns.find(function (c) {
            return (0, _getData.nameFromDataIndex)(c) === dataIndex;
        });

        if (!colFromProp) {
            return;
        }

        foundValues.push(dataIndex);

        mappableProps.forEach(function (prop) {

            if (col[prop] !== undefined) {
                colFromProp[prop] = col[prop];
            }
        });

        ret.push(colFromProp);
    });

    if (foundValues.length !== columns.length) {
        var unused = columns.filter(function (c) {
            return foundValues.indexOf((0, _getData.nameFromDataIndex)(c)) === -1;
        });
        ret.unshift.apply(ret, unused);
    }

    return ret;
};