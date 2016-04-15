import React, { PropTypes } from 'react';

export const DragHandle = ({ col, dragAndDropManager, handleDrag }) => {

    const handleProps = dragAndDropManager.initDragable({
        onDrag: handleDrag,
        draggable: true
    });

    return (
        <span { ...handleProps } />
    );
};

DragHandle.propTypes = {
    col: PropTypes.object,
    dragAndDropManager: PropTypes.object
};