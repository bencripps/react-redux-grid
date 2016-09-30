import React, { PropTypes, Component } from 'react';

import { Column } from './header/Column';
import { EmptyHeader } from './header/EmptyHeader';

import DragAndDropManager from '../core/draganddrop/DragAndDropManager';
import { prefix } from '../../util/prefix';
import { shouldHeaderUpdate } from '../../util/shouldComponentUpdate';
import { keyFromObject } from '../../util/keyGenerator';
import { CLASS_NAMES } from '../../constants/GridConstants';

const { arrayOf, bool, object, string } = PropTypes;

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

            return <Column { ...colProps } />;
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
        this.shouldComponentUpdate = shouldHeaderUpdate.bind(this);
    }

    static propTypes = {
        columnManager: object.isRequired,
        columnState: object,
        columns: arrayOf(object).isRequired,
        dataSource: object,
        pager: object,
        plugins: object,
        reducerKeys: object,
        selectionModel: object,
        stateKey: string,
        store: object,
        visible: bool
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
