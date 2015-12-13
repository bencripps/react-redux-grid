import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import store from '../../store/store';
import { keyGenerator, keyFromObject } from '../../util/keygenerator';
import Cell from './Cell.jsx';

class Row extends Component {

    static defaultProps = {
        columns: React.PropTypes.arrayOf(React.PropTypes.Object).isRequired,
        data: React.PropTypes.arrayOf(React.PropTypes.Object)
    }

    getRows(row) {

        const cells = Object.keys(row).map(
            (k) => <Cell cellData={ row[k] } key= { keyGenerator(k) } />
        );

        const rowProps = {
            key: keyFromObject(row)
        };

        return (
            <tr { ...rowProps }>
                { cells }
            </tr>
        );
    }

    render() {

        const { columns, data } = this.props;
        const rows = data.map((row) => this.getRows(row));

        return (
            <tbody>
                { rows }
            </tbody>
        );
    }
}

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps)(Row);