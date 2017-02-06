'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Store = undefined;

var _configureStore = require('./configureStore');

var _configureStore2 = _interopRequireDefault(_configureStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = (0, _configureStore2.default)();

exports.Store = store;
exports.default = store;