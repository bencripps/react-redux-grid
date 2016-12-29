import { gridConfig } from '../../../constants/GridConstants';
import { prefix } from '../../../util/prefix';

export default class DragAndDropManager {
    initDragable(initialProps = {}) {
        const { CLASS_NAMES } = gridConfig();

        const defaults = {
            onDragStart: this.handleDragStart,
            onDrag: this.handleDrag,
            onDragOver: this.handleDragOver,
            onDragLeave: this.handleDragLeave,
            onDragEnd: this.handleDragEnd,
            onDrop: this.handleDrop,
            draggable: true,
            className: prefix(CLASS_NAMES.DRAG_HANDLE)
        };

        const props = initialProps
            ? Object.assign({}, defaults, initialProps) : defaults;

        return props;
    }

    handleDragStart(reactEvent) {
        reactEvent.dataTransfer.setData('Text',
            JSON.stringify({ preventBubble: true, validDrag: true })
        );
        /**
        * hiding the chrome default drag image -- go upvote this
        * 7680285/how-do-you-turn-off-setdragimage
        **/

        const dragIcon = document.createElement('img');
        dragIcon.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='; // eslint-disable-line max-len

        if (reactEvent.dataTransfer.setDragImage) {
            reactEvent.dataTransfer.setDragImage(dragIcon, -10, -10);
        }
    }

    handleDragLeave(reactEvent) {
        reactEvent.preventDefault();
    }

    handleDragEnd(reactEvent) {
        reactEvent.preventDefault();
    }

    handleDrop(reactEvent) {
        reactEvent.preventDefault();

        const eventType = JSON.parse(reactEvent.dataTransfer.getData('Text'));

        if (eventType && eventType.preventBubble) {
            reactEvent.stopPropagation();
        }
    }
}
