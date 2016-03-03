import React, { PropTypes } from 'react';

export const DragHandle = ({ col, dragAndDropManager }) => {

    const handleProps = dragAndDropManager.initDragable();

    return (
        <span { ...handleProps } />
    );
};

DragHandle.propTypes = {
    col: PropTypes.object,
    dragAndDropManager: PropTypes.object
};