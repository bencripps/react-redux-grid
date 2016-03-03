import React from 'react';

export const DragHandle = ({ col, dragAndDropManager }) => {

    const handleProps = dragAndDropManager.initDragable();

    return (
        <span { ...handleProps } />
    );
};