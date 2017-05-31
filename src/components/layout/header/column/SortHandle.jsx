import PropTypes from 'prop-types';
import React from 'react';

import { prefix } from './../../../../util/prefix';
import { gridConfig } from './../../../../constants/GridConstants';

export const SortHandle = ({ direction, sortHandleCls }) => (
    <span
        className={
            prefix(
                gridConfig().CLASS_NAMES.SORT_HANDLE,
                direction.toLowerCase(),
                sortHandleCls
            )
        }
    />
);

const { string } = PropTypes;

SortHandle.propTypes = {
    direction: string,
    sortHandleCls: string
};
