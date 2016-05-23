import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { prefix } from '../../../util/prefix';
import { stateGetter } from '../../../util/stateGetter';
import { CLASS_NAMES } from '../../../constants/GridConstants';

export const LoadingBar = ({ isLoading, plugins }) => {

    const showLoader = plugins
                        && plugins.LOADER
                        && plugins.LOADER.enabled
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

function mapStateToProps(state, props) {
    return {
        isLoading: stateGetter(state, props, 'loader', props.stateKey)
    };
}

export default connect(mapStateToProps)(LoadingBar);