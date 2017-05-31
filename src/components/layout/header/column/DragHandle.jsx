import PropTypes from 'prop-types';
import React from 'react';

export const DragHandle = ({ dragAndDropManager, handleDrag }) => (
    <span
        draggable
        {
            ...dragAndDropManager.initDragable({
                onDrag: handleDrag,
                draggable: true
            })
        }
    />
);

const { object, func } = PropTypes;

DragHandle.propTypes = {
    col: object,
    dragAndDropManager: object,
    handleDrag: func
};
