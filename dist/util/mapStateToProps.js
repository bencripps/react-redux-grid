'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mapStateToProps = undefined;

var _stateGetter = require('./stateGetter');

var mapStateToProps = exports.mapStateToProps = function mapStateToProps(state, props) {
    return {
        columnState: (0, _stateGetter.stateGetter)(state, props, 'grid', props.stateKey),
        gridData: (0, _stateGetter.stateGetter)(state, props, 'dataSource', props.stateKey),
        editorState: (0, _stateGetter.stateGetter)(state, props, 'editor', props.stateKey),
        pager: (0, _stateGetter.stateGetter)(state, props, 'pager', props.stateKey),
        selectedRows: (0, _stateGetter.stateGetter)(state, props, 'selection', props.stateKey),
        menuState: (0, _stateGetter.stateGetter)(state, props, 'menu', props.stateKey),
        loadingState: (0, _stateGetter.stateGetter)(state, props, 'loader', props.stateKey)
    };
};