import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Column } from './header/Column';
import { EmptyHeader } from './header/EmptyHeader';

import DragAndDropManager from '../core/draganddrop/DragAndDropManager';
import { shouldHeaderUpdate } from '../../util/shouldComponentUpdate';
import { prefix } from '../../util/prefix';
import { debounce, throttle } from '../../util/throttle';
import { isPluginEnabled } from '../../util/isPluginEnabled';
import { gridConfig } from '../../constants/GridConstants';
import { resizeColumns } from '../../actions/GridActions';

const { arrayOf, bool, number, object, string, oneOfType } = PropTypes;

const dragAndDropManager = new DragAndDropManager();

class FixedHeader extends Component {

    render() {
        const { CLASS_NAMES } = gridConfig();
        const {
            columns,
            columnManager,
            dataSource,
            filterFields,
            headerHidden,
            reducerKeys,
            selectionModel,
            stateKey,
            stateful,
            store,
            pageSize,
            pager,
            plugins,
            menuState
        } = this.props;

        const {
            bottom,
            classes,
            headerOffset,
            stuck,
            stuckToBottom,
            width
        } = this.state;

        const visibleColumns = columns.filter((col) => !col.hidden);
        const headers = visibleColumns.map((col, i) => (
            <Column
                actualIndex={
                    columns
                        .findIndex(c => col.dataIndex === c.dataIndex)
                }
                col={col}
                columnManager={columnManager}
                columns={columns}
                dataSource={dataSource}
                dragAndDropManager={dragAndDropManager}
                filterFields={filterFields}
                index={i}
                key={`fixed-header-${i}`}
                pageSize = {pageSize}
                pager={pager}
                scope={this}
                stateKey={stateKey}
                stateful={stateful}
                store={store}
                visibleColumns={visibleColumns}
            />
        ));

        const tableStyle = {};
        let tableClassName = prefix(
            CLASS_NAMES.TABLE,
            CLASS_NAMES.HEADER_FIXED,
            stuck ? CLASS_NAMES.HEADER_STUCK : '',
            stuckToBottom ? CLASS_NAMES.HEADER_STUCK_BOTTOM : ''
        );

        if (classes.length > 0) {
            classes.forEach(cls => {
                tableClassName += ` ${cls}`;
            });
        }

        else {
            tableClassName = prefix(
                CLASS_NAMES.TABLE,
                CLASS_NAMES.HEADER_FIXED,
                stuck ? CLASS_NAMES.HEADER_STUCK : '',
                stuckToBottom ? CLASS_NAMES.HEADER_STUCK_BOTTOM : ''
            );
        }

        const fillerCmp = stuck || stuckToBottom
            ? (<div
                style={{ height: `${(this.HEADER_HEIGHT || 25)}px` }}
               />)
            : null;

        if (stuck || stuckToBottom) {
            tableStyle.width = `${width}px`;
            tableStyle.bottom = `${bottom}px`;
        }

        const theadClassName = prefix(
            CLASS_NAMES.THEADER, headerOffset > 0
                ? 'adjusted'
                : ''
        );

        if (selectionModel) {
            selectionModel.updateCells({
                cells: headers,
                rowId: 'fixedHeader',
                type: 'header',
                index: 0,
                reducerKeys,
                stateKey,
                rowData: {},
                isSelected: null
            });
        }

        columnManager.addActionColumn({
            columns,
            cells: headers,
            type: 'header',
            id: 'header-row',
            reducerKeys,
            stateKey,
            stateful,
            menuState
        });

        addEmptyInsert(headers, visibleColumns, plugins, headerOffset);

        const containerClassName = prefix(
                CLASS_NAMES.HEADER_FIXED_CONTAINER,
                headerHidden ? 'hidden' : ''
        );

        return (
            <div className={containerClassName}>
                { fillerCmp }
                <table
                    cellSpacing={0}
                    className={tableClassName}
                    style={tableStyle}
                >
                    <thead className={theadClassName}>
                        <tr className={prefix(CLASS_NAMES.HEADER)}>
                            { headers }
                        </tr>
                    </thead>
                    <tbody />
                </table>
            </div>
        );
    }

    componentDidMount() {

        const { plugins } = this.props;

        const isSticky = isPluginEnabled(plugins, 'STICKY_HEADER');

        const headerDOM = ReactDOM.findDOMNode(this);
        const tableHeight = headerDOM.parentNode.clientHeight;

        this.HEADER_HEIGHT = headerDOM.clientHeight;

        if (isSticky && !this._scrollListener) {
            this.createScrollListener(
                plugins.STICKY_HEADER, headerDOM, tableHeight
            );
        }
    }

    componentDidUpdate() {

        if (!this.updateFunc) {
            this.updateFunc = debounce(this.getScrollWidth, 200);
        }

        this.updateFunc();
    }

    componentWillUnmount() {
        if (this.scrollTarget) {
            this.scrollTarget.removeEventListener(
                'scroll', this._scrollListener
            );
        }

        if (this._scrollListener) {
            delete this._scrollListener;
        }
    }

    constructor() {
        super();
        this.state = {
            stuck: false,
            headerOffset: 0,
            classes: []
        };
        this.handleDrag = throttle(handleDrag, this, 5);
        this.shouldComponentUpdate = shouldHeaderUpdate.bind(this);
    }

    static propTypes = {
        columnManager: object.isRequired,
        columns: arrayOf(object).isRequired,
        dataSource: object,
        filterFields: object,
        headerHidden: bool,
        menuState: object,
        pageSize: number,
        pager: object,
        plugins: object,
        reducerKeys: oneOfType([object, string]),
        selectionModel: object,
        stateKey: string,
        stateful: bool,
        store: object
    };

    setWidthResetListener(headerDOM) {

        const scope = this;

        window.addEventListener('resize', () => {

            const { stuck, stuckToBottom } = this.state;

            if (stuck || stuckToBottom) {
                scope.setState({
                    width: headerDOM.parentNode.getBoundingClientRect().width
                });
            }

        });

    }

    createScrollListener(config, headerDOM) {

        const scope = this;
        let target = config.scrollTarget
            ? document.querySelector(config.scrollTarget)
            : document;

        target = target || document;

        this.setWidthResetListener(headerDOM);

        const defaultListener = () => {
            const { stuck, stuckToBottom } = scope.state;
            const { top } = headerDOM.getBoundingClientRect();
            const tableHeight = headerDOM.parentNode.clientHeight;
            const shouldStop = top + tableHeight - (headerDOM.clientHeight * 2);

            if (shouldStop < 0 && stuckToBottom) {
                return false;
            }

            if (stuck && shouldStop < 0) {
                return scope.setState({
                    stuck: false,
                    stuckToBottom: true,
                    width: headerDOM.clientWidth,
                    bottom: headerDOM.clientHeight
                });
            }

            if (top < 0 && !stuck) {
                return scope.setState({
                    stuck: true,
                    stuckToBottom: false,
                    width: headerDOM.clientWidth
                });
            }

            else if (top > 0 && stuck) {
                return scope.setState({
                    stuck: false,
                    stuckToBottom: false,
                    width: null
                });
            }

            if (stuck && shouldStop < 0) {
                return scope.setState({
                    stuck: false,
                    stuckToBottom: false,
                    width: null
                });
            }
        };

        this._scrollListener = config.listener
            ? config.listener.bind(this, {
                headerDOM
            }) : defaultListener;

        this.scrollTarget = target;

        this.scrollTarget.addEventListener('scroll', this._scrollListener);
    }

    getScrollWidth() {
        const { CLASS_NAMES } = gridConfig();
        const header = ReactDOM.findDOMNode(this);
        const { headerOffset } = this.state;

        const fixed = header
            .querySelector(`.${prefix(CLASS_NAMES.HEADER_FIXED)}`);
        const hidden = header.parentNode
            .querySelector(`.${prefix(CLASS_NAMES.HEADER_HIDDEN)}`);

        if (!fixed || !hidden) {
            return;
        }

        const offset = fixed.offsetWidth - hidden.offsetWidth;

        if (offset !== undefined && offset !== headerOffset) {
            /* eslint-disable react/no-set-state */
            this.setState({
                headerOffset: offset
            });
            /* eslint-enable react/no-set-state */
        }
    }

}

export const addEmptyInsert = (
    headers, visibleColumns, plugins, headerOffset
) => {
    if (!plugins) {
        return false;
    }

    const { GRID_ACTIONS } = plugins;

    if (visibleColumns.length === 0) {

        if (GRID_ACTIONS
            && GRID_ACTIONS.menu
            && GRID_ACTIONS.menu.length > 0) {

            headers.unshift(<EmptyHeader key="empty-header" />);
        }

        else {
            headers.push(<EmptyHeader key="empty-header" />);
        }
    }

    if (headerOffset !== undefined) {
        headers.push(
            <th
                key="colum-adjuster"
                style= { { width: `${headerOffset}px` }}
            />
            );
    }

};

export const handleDrag = (
    scope,
    columns,
    id,
    columnManager,
    store,
    nextColumnKey,
    stateKey,
    stateful,
    reactEvent
) => {

    const header = reactEvent.target.parentElement.parentElement;
    const columnNode = reactEvent.target.parentElement;
    const headerNextElementSibling = columnNode.nextElementSibling;
    const columnOffsetLeft = columnNode.getBoundingClientRect().left;
    const headerWidth = parseFloat(window.getComputedStyle(header).width, 10);

    const xCoord = reactEvent.clientX || window.reactGridXcoord;
    const computedWidth = (xCoord - columnOffsetLeft) / headerWidth;
    const totalWidth = parseFloat(columnNode.style.width, 10)
        + parseFloat(headerNextElementSibling.style.width, 10);

    let width = computedWidth * 100;
    let nextColWidth = Math.abs(width - totalWidth);

    const isInvalidDrag = width + nextColWidth > totalWidth;

    if (nextColWidth < 0 || width < 0) {
        return false;
    }

    if (nextColWidth < columnManager.config.minColumnWidth) {
        nextColWidth = columnManager.config.minColumnWidth;
        width = totalWidth - columnManager.config.minColumnWidth;
    }

    else if (width < columnManager.config.minColumnWidth) {
        width = columnManager.config.minColumnWidth;
        nextColWidth = totalWidth - columnManager.config.minColumnWidth;
    }

    else if (isInvalidDrag) {
        return false;
    }

    store.dispatch(resizeColumns({
        width,
        id,
        nextColumn: {
            id: nextColumnKey,
            width: nextColWidth
        },
        columns,
        stateKey,
        stateful
    }));

};

export default FixedHeader;
