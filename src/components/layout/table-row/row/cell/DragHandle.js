import React, { PropTypes } from 'react';

import { prefix } from './../../../../../util/prefix';
import { CLASS_NAMES } from './../../../../../constants/GridConstants';

export const DragHandle = ({
    store
}) => {

    const handleProps = {
        className: prefix(CLASS_NAMES.ROW_DRAG_HANDLE),
        onClick: () => {
            console.log('Travis add func');
        }
    };

    return <span { ...handleProps } />;
};

const { object } = PropTypes;

DragHandle.propTypes = {
    store: object
};

DragHandle.defaultProps = {};

export default DragHandle;
