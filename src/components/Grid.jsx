import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Header from './layout/Header.jsx';
import Row from './layout/Row.jsx';
import PagerToolbar from './plugins/pager/Toolbar.jsx';
import '../style/components/grid.styl';
import { prefix } from '../util/prefix';
import { CLASS_NAMES } from '../constants/GridConstants';
import { getAsyncData, setData } from '../actions/GridActions';

class Grid extends Component {

    static defaultProps = {
        columns: React.PropTypes.arrayOf(React.PropTypes.Object).isRequired,
        data: React.PropTypes.arrayOf(React.PropTypes.Object),
        dataSource: React.PropTypes.string,
        store: React.PropTypes.Func,
        pageSize: 25,
        events: React.PropTypes.Object,
        plugins: React.PropTypes.Object
    }

    componentWillMount() {
        const { dataSource, data, store } = this.props;  
        
        if (dataSource !== React.PropTypes.string) {
            store.dispatch(getAsyncData(dataSource));
        }

        else if (data) {
            store.dispatch(setData(data));
        }

        else {
            console.warn('A data source, or a static data set is required');
        }
    }

    render() {

        const { 
            columns, 
            data, 
            pageSize,
            plugins,
            events,
            store
        } = this.props;

        const HeaderProps = {
            columns,
            store
        };

        const rowProps = {
            columns,
            events,
            pageSize,
            plugins,
            store
        };

        const tableProps = {
            className: prefix(CLASS_NAMES.TABLE),
            cellSpacing: 0,
            store
        };

        const pagerProps = {
            pageSize,
            plugins,
            store
        };

        return (
            <div>
                <table { ...tableProps }>
                    <Header { ...HeaderProps } />
                    <Row { ...rowProps } />
                    <PagerToolbar { ...pagerProps } />
                </table>
            </div>
        );
    }
}

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps)(Grid);