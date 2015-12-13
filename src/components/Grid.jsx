import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import store from '../store/store';
import Header from './layout/Header.jsx';
import Row from './layout/Row.jsx';

class Grid extends Component {

    static defaultProps = {
        columns: React.PropTypes.arrayOf(React.PropTypes.Object).isRequired,
        data: React.PropTypes.arrayOf(React.PropTypes.Object),
        dataSource: React.PropTypes.string
    }

    render() {

        const { columns, data } = this.props;

        const HeaderProps = {
            columns: columns
        };

        const RowProps = {
            columns: columns,
            data: data
        };

        return (
            <div>
                <table>
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