import { CLASS_NAMES } from '../../../constants/GridConstants';
import { prefix } from '../../../util/prefix';

export default class DragAndDropManager {
    initDragable(initialProps) {

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
            ? Object.assign(defaults, initialProps) : defaults;

        return props;
    }

    handleDragStart(reactEvent) {
        reactEvent.dataTransfer.setData('Text',
            JSON.stringify({ preventBubble: true, validDrag: true })
        );
        /**
        * hiding the chrome default drag image -- go upvote this
        * http://stackoverflow.com/questions/7680285/how-do-you-turn-off-setdragimage
        **/

        const dragIcon = document.createElement('img');
        dragIcon.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

        if (reactEvent.dataTransfer.setDragImage) {
            reactEvent.dataTransfer.setDragImage(dragIcon, -10, -10);
        }
    }

    handleDrag() {}

    handleDragOver(reactEvent) {
        // due to a bug in firefox, we need to set a global to
        // preserve the x coords
        // http://stackoverflow.com/questions/11656061/event-clientx-showing-as-0-in-firefox-for-dragend-event  
        window.coords = {
            x: reactEvent.clientX
        };

        reactEvent.preventDefault();
    }

    handleDragLeave(reactEvent) {
        reactEvent.preventDefault();
    }

    handleDragEnd(reactEvent) {
        reactEvent.preventDefault();
    }

    handleDrop(reactEvent) {
        console.log('hi!')
        reactEvent.preventDefault();

        const eventType = JSON.parse(reactEvent.dataTransfer.getData('Text'));

        if (eventType && eventType.preventBubble) {
            reactEvent.stopPropagation();
        }
    }
}