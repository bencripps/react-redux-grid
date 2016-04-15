import React, { PropTypes } from 'react';

import { prefix } from './../../../../util/prefix';
import { keyFromObject } from './../../../../util/keyGenerator';
import { CLASS_NAMES } from './../../../../constants/GridConstants';

export const Text = ({ col, index, columnManager, dragAndDropManager, sortHandle }) => {

    const innerHTML = col.name;
    const draggable = col.moveable !== undefined ? col.moveable : columnManager.config.moveable;

    const spanProps = dragAndDropManager.initDragable({
        draggable: draggable,
        className: draggable ? prefix(CLASS_NAMES.DRAGGABLE_COLUMN, CLASS_NAMES.COLUMN) : prefix(CLASS_NAMES.COLUMN),
        onDrag: (reactEvent) => {},
        onDragStart: (reactEvent) => {
            const data = {
                key: keyFromObject(col),
                index: index
            };
            console.log(data);
            reactEvent.dataTransfer.setData('Text', JSON.stringify(data));
        }
    });

    return (
        <span { ...spanProps } >
            { innerHTML }
            { sortHandle }
        </span>
    );
};

Text.propTypes = {
    col: PropTypes.object,
    columnManager: PropTypes.object,
    dragAndDropManager: PropTypes.object,
    index: PropTypes.number,
    sortHandle: PropTypes.element
};