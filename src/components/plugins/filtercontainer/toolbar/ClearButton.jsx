import React from 'react';

import { prefix } from './../../../../util/prefix';
import { CLASS_NAMES, FILTER_METHODS } from './../../../../constants/GridConstants';

import { setFilter,
    clearFilterRemote,
    clearFilterLocal
} from './../../../../actions/plugins/filter/FilterActions';

export const ClearButton = ({ dataUri, method, store }) => {

    const buttonProps = {
        className: prefix(CLASS_NAMES.FILTER_CONTAINER.CLEAR_BUTTON),
        onClick: clearFilter.bind(this, dataUri, method, store)
    };

    return (
        <i { ...buttonProps } />
        );

};

export const clearFilter = (dataSource, method, store) => {

    if (method === FILTER_METHODS.LOCAL) {
        store.dispatch(clearFilterLocal());
    }

    else if (method === FILTER_METHODS.REMOTE) {
        store.dispatch(clearFilterRemote(dataSource));
    }

    store.dispatch(setFilter(''));
};

ClearButton.propTypes = {};

ClearButton.defaultProps = {};
