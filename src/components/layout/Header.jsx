import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import { Column } from './header/Column.jsx';
import { EmptyHeader } from './header/EmptyHeader.jsx';

import DragAndDropManager from '../core/draganddrop/DragAndDropManager';
import { prefix } from '../../util/prefix';
import { stateGetter } from '../../util/stateGetter';
import { keyFromObject } from '../../util/keyGenerator';
import { CLASS_NAMES } from '../../constants/GridConstants';

const dragAndDropManager = new DragAndDropManager();

class Header extends Component {

    static propTypes = {
        columnManager: PropTypes.object.isRequired,
        columnState: PropTypes.object,
        columns: PropTypes.arrayOf(PropTypes.Object).isRequired,
        dataSource: PropTypes.object,
        pager: PropTypes.object,
        plugins: PropTypes.object,
        reducerKeys: PropTypes.object,
        selectionModel: PropTypes.object,
        store: PropTypes.object,
        visible: PropTypes.bool
    };

    constructor() {
        super();
        this.handleDrag = handleDrag;
    }

    render() {

        const {
            columns,
            columnManager,
            dataSource,
            selectionModel,
            reducerKeys,
            store,
            pager,
            plugins,
            visible
        } = this.props;

        const visibleColumns = columns.filter((col) => !col.hidden);
        const headers = visibleColumns.map((col, i) => {

            const colProps = {
                scope: this,
                col,
                columns,
                visibleColumns,
                columnManager,
                dataSource,
                dragAndDropManager,
                pager,
                store,
                index: i
            };

            return (
                <Column { ...colProps } />
                );
        });

        const classes = visible
            ? prefix(CLASS_NAMES.HEADER)
            : prefix(CLASS_NAMES.HEADER, CLASS_NAMES.HEADER_HIDDEN);

        const headerProps = {
            className: classes
        };

        if (selectionModel) {
            selectionModel.updateCells(headers, columns, 'header');
        }

        columnManager.addActionColumn(headers, 'header', keyFromObject(headers), reducerKeys);

        addEmptyInsert(headers, visibleColumns, plugins);

        return (
            <thead>
                <tr { ...headerProps }>
                    { headers }
                </tr>
            </thead>
        );
    }
}

export const addEmptyInsert = (headers, visibleColumns, plugins) => {

    if (!plugins) {
        return false;
    }

    const { GRID_ACTIONS } = plugins;

    if (visibleColumns.length === 0) {

        if (GRID_ACTIONS
            && GRID_ACTIONS.menu
            && GRID_ACTIONS.menu.length > 0) {

            headers.splice(1, 0, <EmptyHeader />);
        }

        else {
            headers.push(<EmptyHeader />);
        }
    }

};

export const handleDrag = () => {
    return false;
};

export const handleColumnClick = (col) => {
    if (col.HANDLE_CLICK) {
        col.HANDLE_CLICK.apply(this, arguments);
    }
};

function mapStateToProps(state, props) {
    return {
        columnState: stateGetter(state, props, 'grid', 'gridState'),
        dataSource: stateGetter(state, props, 'dataSource', 'gridData'),
        pager: stateGetter(state, props, 'pager', 'pagerState')
    };
}

const ConnectedHeader = connect(mapStateToProps)(Header);

export { Header, ConnectedHeader };

export default connect(mapStateToProps)(Header);