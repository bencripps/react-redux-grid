import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { prefix } from '../../../util/prefix';
import { stateGetter } from '../../../util/stateGetter';
import { CLASS_NAMES } from '../../../constants/GridConstants';

class LoadingBar extends Component {

    static propTypes = {
        isLoading: PropTypes.bool,
        plugins: PropTypes.object,
        store: PropTypes.object
    };

    render() {

        const { isLoading, plugins } = this.props;

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
    }
}

function mapStateToProps(state, props) {
    return {
        isLoading: stateGetter(state, props, 'loader', 'loaderState')
    };
}

export default connect(mapStateToProps)(LoadingBar);