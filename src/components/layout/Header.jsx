import React, { PropTypes, Component } from 'react';

import { Column } from './header/Column';
import { EmptyHeader } from './header/EmptyHeader';

import DragAndDropManager from '../core/draganddrop/DragAndDropManager';
import { prefix } from '../../util/prefix';
import { stateGetter } from '../../util/stateGetter';
import { keyFromObject } from '../../util/keyGenerator';
import { CLASS_NAMES } from '../../constants/GridConstants';

const dragAndDropManager = new DragAndDropManager();

class Header extends Component {

    render() {

        const {
            columns,
            columnManager,
            dataSource,
            selectionModel,
            reducerKeys,
            store,
            stateKey,
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
                key: `header-${i}`,
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
            selectionModel.updateCells(headers, columns, 'header', stateKey);
        }

        columnManager.addActionColumn({
            cells: headers,
            type: 'header',
            id: keyFromObject(headers),
            reducerKeys,
            stateKey
        });

        addEmptyInsert(headers, visibleColumns, plugins);

        return (
            <thead>
                <tr { ...headerProps }>
                    { headers }
                </tr>
            </thead>
        );
    }

    constructor() {
        super();
        this.handleDrag = handleDrag;
    }

    static propTypes = {
        columnManager: PropTypes.object.isRequired,
        columnState: PropTypes.object,
        columns: PropTypes.arrayOf(PropTypes.object).isRequired,
        dataSource: PropTypes.object,
        pager: PropTypes.object,
        plugins: PropTypes.object,
        reducerKeys: PropTypes.object,
        selectionModel: PropTypes.object,
        stateKey: PropTypes.string,
        store: PropTypes.object,
        visible: PropTypes.bool
    };
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

            headers.splice(1, 0, <EmptyHeader key="empty-header" />);
        }

        else {
            headers.push(<EmptyHeader key="empty-header" />);
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

export default Header;