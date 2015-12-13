import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import store from '../../store/store';
import { keyGenerator } from '../../util/keygenerator';

class Header extends Component {

    static defaultProps = {
        columns: React.PropTypes.arrayOf(React.PropTypes.Object).isRequired
    }

    getHeader(col) {
        return (
            <th key={keyGenerator(col.name, col.value) }>{ col.name }</th>
        );
    }

    render() {

        const { columns } = this.props;
        const headers = columns.map((col) => this.getHeader(col));

        return (
            <tr>
                { headers }
            </tr>
        );
    }
}

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps)(Header);