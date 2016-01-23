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

    handleDragStart() {

    }

    handleDrag() {

    }

    handleDragOver(reactEvent) {
        reactEvent.preventDefault();
    }

    handleDragLeave() {

    }

    handleDragEnd() {

    }

    handleDrop() {

    }
}