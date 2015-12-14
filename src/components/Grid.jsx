import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import store from '../store/store';
import Header from './layout/Header.jsx';
import Row from './layout/Row.jsx';
import '../style/components/grid.styl';
import { prefix } from '../util/prefix';
import { CLASS_NAMES } from '../constants/GridConstants';

class Grid extends Component {

    static defaultProps = {
        columns: React.PropTypes.arrayOf(React.PropTypes.Object).isRequired,
        data: React.PropTypes.arrayOf(React.PropTypes.Object),
        dataSource: React.PropTypes.string
    }

    render() {

        const { columns, data, handleCellClick, handleCellDblClick } = this.props;

        const HeaderProps = {
            columns
        };

        const RowProps = {
            columns,
            data,
            handleCellClick,
            handleCellDblClick
        };

        const tableProps = {
            className: prefix(CLASS_NAMES.TABLE),
            cellSpacing: 0
        }

        return (
            <div>
                <table { ...tableProps }>
                    <thead>
                        <Header { ...HeaderProps } />
                    </thead>
                    <Row { ...RowProps } />
                </table>
            </div>
        );
    }
}

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps)(Grid);