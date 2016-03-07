import React from 'react';

import { prefix } from './../../../../util/prefix';
import { CLASS_NAMES } from './../../../../constants/GridConstants';

export const SearchButton = () => {

    const buttonProps = {
        className: prefix(CLASS_NAMES.FILTER_CONTAINER.SEARCH_BUTTON)
    };

    return (
        <i { ...buttonProps } />
        );

};

SearchButton.propTypes = {};

SearchButton.defaultProps = {};
