import React, { PropTypes } from 'react';

import { prefix } from './../../../../util/prefix';
import { CLASS_NAMES } from './../../../../constants/GridConstants';

import { showFilterMenu } from './../../../../actions/plugins/filter/FilterActions';

export const FilterButton = ({ filter, filterMenuShown, store, stateKey }) => {

    const buttonProps = {
        className: prefix(CLASS_NAMES.FILTER_CONTAINER.MENU_BUTTON,
            filterMenuShown ? CLASS_NAMES.ACTIVE_CLASS : ''),
        onClick: handleFilterMenuButtonClick.bind(this, filter, stateKey, store)
    };

    return (
        <i { ...buttonProps } />
        );

};

export const handleFilterMenuButtonClick = (filter, stateKey, store) => {
    const shown = filter ? filter.filterMenuShown : false;
    store.dispatch(showFilterMenu({ value: shown, stateKey}));
};

FilterButton.propTypes = {
    filter: PropTypes.object,
    filterMenuShown: PropTypes.bool,
    store: PropTypes.object
};

FilterButton.defaultProps = {};
