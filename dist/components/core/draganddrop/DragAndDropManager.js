'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GridConstants = require('../../../constants/GridConstants');

var _prefix = require('../../../util/prefix');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DragAndDropManager = function () {
    function DragAndDropManager() {
        _classCallCheck(this, DragAndDropManager);
    }

    _createClass(DragAndDropManager, [{
        key: 'initDragable',
        value: function initDragable() {
            var initialProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            var _gridConfig = (0, _GridConstants.gridConfig)(),
                CLASS_NAMES = _gridConfig.CLASS_NAMES;

            var defaults = {
                onDragStart: this.handleDragStart,
                onDrag: this.handleDrag,
                onDragOver: this.handleDragOver,
                onDragLeave: this.handleDragLeave,
                onDragEnd: this.handleDragEnd,
                onDrop: this.handleDrop,
                draggable: true,
                className: (0, _prefix.prefix)(CLASS_NAMES.DRAG_HANDLE)
            };

            var props = initialProps ? Object.assign({}, defaults, initialProps) : defaults;

            return props;
        }
    }, {
        key: 'handleDragStart',
        value: function handleDragStart(reactEvent) {
            reactEvent.dataTransfer.setData('Text', JSON.stringify({ preventBubble: true, validDrag: true }));
            /**
            * hiding the chrome default drag image -- go upvote this
            * 7680285/how-do-you-turn-off-setdragimage
            **/

            var dragIcon = document.createElement('img');
            dragIcon.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='; // eslint-disable-line max-len

            if (reactEvent.dataTransfer.setDragImage) {
                reactEvent.dataTransfer.setDragImage(dragIcon, -10, -10);
            }
        }
    }, {
        key: 'handleDragLeave',
        value: function handleDragLeave(reactEvent) {
            reactEvent.preventDefault();
        }
    }, {
        key: 'handleDragEnd',
        value: function handleDragEnd(reactEvent) {
            reactEvent.preventDefault();
        }
    }, {
        key: 'handleDrop',
        value: function handleDrop(reactEvent) {
            reactEvent.preventDefault();

            var eventType = JSON.parse(reactEvent.dataTransfer.getData('Text'));

            if (eventType && eventType.preventBubble) {
                reactEvent.stopPropagation();
            }
        }
    }]);

    return DragAndDropManager;
}();

exports.default = DragAndDropManager;