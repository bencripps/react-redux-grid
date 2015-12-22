import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { keyGenerator, keyFromObject } from '../../../util/keygenerator';
import { prefix } from '../../../util/prefix';
import '../../../style/components/plugins/loader/loadingbar.styl';
import { CLASS_NAMES } from '../../../constants/GridConstants';

class LoadingBar extends Component {

    static defaultProps = {
        store: React.PropTypes.func.isRequired,
        plugins: React.PropTypes.object.isRequired
    }
   
    render() {

        const { isLoading, plugins } = this.props;

        const showLoader = plugins 
                            && plugins.LOADER
                            && plugins.LOADER.enabled
                            && isLoading;

        const loadingBarProps = {
            className: prefix(CLASS_NAMES.LOADING_BAR, showLoader ? 'active' : '')
        }

        return (
            <div { ...loadingBarProps } ></div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isLoading: state.loader.get('loaderState')
    };
}

export default connect(mapStateToProps)(LoadingBar);