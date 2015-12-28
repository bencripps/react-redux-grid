import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import ActionColumn from '../plugins/gridactions/ActionColumn.jsx';
import DragAndDropManager from '../core/draganddrop/DragAndDropManager';
import { keyGenerator, keyFromObject } from '../../util/keygenerator';
import { prefix } from '../../util/prefix';
import { emptyFn } from '../../util/emptyFn';
import { CLASS_NAMES } from '../../constants/GridConstants';

class Header extends Component {

    static defaultProps = {
        columnManager: React.PropTypes.object.isRequired,
        columns: React.PropTypes.arrayOf(React.PropTypes.Object).isRequired,
        plugins: React.PropTypes.object,
        store: React.PropTypes.func
    }

    isColumnResizable(col, columnManager) {

        if (col.resizable !== undefined) {
            return col.resizable;
        }

        else if (columnManager.config.resizable !== undefined) {
             return columnManager.config.resizable;
        }

        else {
            return columnManager.config.defaultResizable;
        }
    }

    handleColumnClick(col, reactEvent) {

        if (col.HANDLE_CLICK) {
            col.HANDLE_CLICK.apply(this, arguments);
        }
    }

    getDragHandle(col, dragAndDropManager) {
        const handleProps = dragAndDropManager.initDragable({}, col);

        return (
            <span { ...handleProps } />
        );
    }

    getHeader(col, dragAndDropManager) {

        const { columnManager } = this.props;

        const isResizable = this.isColumnResizable(col, columnManager);

        let headerProps = {
            className: `${col.className} ${isResizable ? prefix("resizable") : ""}`,
            onClick: this.handleColumnClick.bind(this, col),
            style: {
                width: col.width || columnManager.config.defaultColumnWidth
            }
        };

        let dragHandle;

        if (isResizable) {
            dragHandle = this.getDragHandle(col, dragAndDropManager);
            //headerProps = dragAndDropManager.initDragable(headerProps, col);
        }

        const innerHTML = col.renderer ? col.renderer(col) : col.name;

        return (
            <th { ...headerProps } key={keyGenerator(col.name, col.value) }>
                { innerHTML }
                { dragHandle }
            </th>
        );
    }

    getAdditionalClasses() {

    }

    render() {

        const { columns, selectionModel, columnManager } = this.props;
        const dragAndDropManager = new DragAndDropManager();
        const headers = columns.map((col) => this.getHeader(col, dragAndDropManager));
        const headerProps = {
            className: prefix(CLASS_NAMES.HEADER)
        }

        selectionModel.updateCells(headers, columns);

        columnManager.addActionColumn(headers, 'header');

        return (
            <thead>
                <tr { ...headerProps }>
                    { headers }
                </tr>
            </thead>
        );
    }
}

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps)(Header);