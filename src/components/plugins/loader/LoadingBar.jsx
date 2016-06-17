import React, { PropTypes } from 'react';
import { prefix } from '../../../util/prefix';
import { isPluginEnabled } from '../../../util/isPluginEnabled';
import { CLASS_NAMES } from '../../../constants/GridConstants';

export const LoadingBar = ({ isLoading, plugins }) => {

    const showLoader = isPluginEnabled(plugins, 'LOADER')
        && isLoading;

    const loadingBarProps = {
        className: prefix(CLASS_NAMES.LOADING_BAR, showLoader ? 'active' : '')
    };

    return (
        <div { ...loadingBarProps } ></div>
    );
};

LoadingBar.propTypes = {
    isLoading: PropTypes.bool,
    plugins: PropTypes.object,
    store: PropTypes.object
};

LoadingBar.defaultProps = {};

export default LoadingBar;