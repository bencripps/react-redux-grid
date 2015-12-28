import React, { PropTypes, Component } from 'react';
import { CLASS_NAMES } from '../../../constants/GridConstants';
import { prefix } from '../../../util/prefix';

export default class DragAndDropManager {
    constructor(plugins, store, events, columns) {

       
    }

    initDragable(initialProps, column) {

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
            ? Object.assign(initialProps, defaults) : defaults;

        return props;
    }


    handleDragStart() {
        
    }

    handleDrag() {

    }

    handleDragOver() {

    }
    
    handleDragLeave() {

    }

    handleDragEnd() {

    }


    handleDrop() {

    }
}