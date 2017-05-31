import PropTypes from 'prop-types';
import React from 'react';

import { prefix } from './../../../../../util/prefix';
import { gridConfig } from './../../../../../constants/GridConstants';

export const DragHandle = () => {
    const { CLASS_NAMES } = gridConfig();
    return (
        <span
            className={prefix(CLASS_NAMES.ROW_DRAG_HANDLE)}
        />
    );
};

const { object } = PropTypes;

DragHandle.propTypes = {
    store: object
};

DragHandle.defaultProps = {};

export default DragHandle;
