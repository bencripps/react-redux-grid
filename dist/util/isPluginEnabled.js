"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var isPluginEnabled = exports.isPluginEnabled = function isPluginEnabled() {
    var plugins = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var name = arguments[1];

    var enabled = plugins && plugins[name] && plugins[name].enabled;

    return !!enabled;
};