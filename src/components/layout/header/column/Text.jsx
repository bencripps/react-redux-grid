import PropTypes from 'prop-types';
import React from 'react';

import { prefix } from './../../../../util/prefix';
import { keyFromObject } from './../../../../util/keyGenerator';
import { gridConfig } from './../../../../constants/GridConstants';

export const Text = ({
    actualIndex, col, columnManager, dragAndDropManager, sortHandle
}) => {

    const { CLASS_NAMES } = gridConfig();
    const innerHTML = col.name;
    const draggable = col.moveable !== undefined
        ? col.moveable
        : columnManager.config.moveable;

    const spanProps = dragAndDropManager.initDragable({
        draggable: draggable,
        className: draggable
            ? prefix(CLASS_NAMES.DRAGGABLE_COLUMN, CLASS_NAMES.COLUMN)
            : prefix(CLASS_NAMES.COLUMN),
        onDrag: () => {},
        onDragStart: (reactEvent) => {
            const data = {
                key: keyFromObject(col),
                index: actualIndex
            };
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
    actualIndex: PropTypes.number,
    col: PropTypes.object,
    columnManager: PropTypes.object,
    dragAndDropManager: PropTypes.object,
    index: PropTypes.number,
    sortHandle: PropTypes.element
};
