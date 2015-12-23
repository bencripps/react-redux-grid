import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { prefix } from '../../../util/prefix';
import '../../../style/components/plugins/errorhandler/message.styl';
import { CLASS_NAMES } from '../../../constants/GridConstants';

class Inline extends Component {

    render() {

        return (
            <div>Inline Editor</div>
        )
    }
}

function mapStateToProps(state) {
    return {
        errorHandler: state.errorhandler.get('errorState')
    };
}

export default connect(mapStateToProps)(Inline);