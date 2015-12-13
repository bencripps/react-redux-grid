import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import store from '../../store/store';
import { keyGenerator } from '../../util/keygenerator';

class Cell extends Component {

    static defaultProps = {
        data: React.PropTypes.String
    }

    render() {

        const { cellData } = this.props;

        return (
            <td>
                { cellData }
            </td>
        );
    }
}

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps)(Cell);