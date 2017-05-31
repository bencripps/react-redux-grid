import PropTypes from 'prop-types';
import React from 'react';
import { prefix } from '../../../util/prefix';
import { isPluginEnabled } from '../../../util/isPluginEnabled';
import { gridConfig } from '../../../constants/GridConstants';

export const LoadingBar = ({ isLoading, plugins }) => {
    const { CLASS_NAMES } = gridConfig();

    const showLoader = isPluginEnabled(plugins, 'LOADER')
        && isLoading;

    return (
        <div
            className={
                prefix(CLASS_NAMES.LOADING_BAR, showLoader ? 'active' : '')
            }
        />
    );
};

const { bool, object } = PropTypes;

LoadingBar.propTypes = {
    isLoading: bool,
    plugins: object
};

LoadingBar.defaultProps = {
    isLoading: false
};

export default LoadingBar;
