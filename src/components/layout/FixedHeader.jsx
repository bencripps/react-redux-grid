import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { Column } from './header/Column.jsx';
import { EmptyHeader } from './header/EmptyHeader.jsx';

import DragAndDropManager from '../core/draganddrop/DragAndDropManager';
import { prefix } from '../../util/prefix';
import { keyFromObject } from '../../util/keyGenerator';
import { throttle } from '../../util/throttle';
import { stateGetter } from '../../util/stateGetter';
import { CLASS_NAMES } from '../../constants/GridConstants';
import { resizeColumns } from '../../actions/GridActions';

const dragAndDropManager = new DragAndDropManager();

class FixedHeader extends Component {

    render() {

        const {
            columns,
            columnManager,
            dataSource,
            reducerKeys,
            selectionModel,
            stateKey,
            store,
            pager,
            plugins
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
        const headers = visibleColumns.map((col, i) => {

            const colProps = {
                scope: this,
                col,
                columns,
                columnManager,
                dataSource,
                dragAndDropManager,
                index: i,
                pager,
                store,
                stateKey,
                visibleColumns,
                key: `fixed-header-${i}`
            };

            return (
                <Column { ...colProps } />
                );
        });

        const tableProps = {
            className: prefix(
                CLASS_NAMES.TABLE,
                CLASS_NAMES.HEADER_FIXED,
                stuck ? CLASS_NAMES.HEADER_STUCK : '',
                stuckToBottom ? CLASS_NAMES.HEADER_STUCK_BOTTOM : ''
            ),
            cellSpacing: 0
        };

        if (classes.length > 0) {
            classes.forEach(cls => {
                tableProps.className += ` ${cls}`;
            });
        }

        else {
            tableProps.className = prefix(
                CLASS_NAMES.TABLE,
                CLASS_NAMES.HEADER_FIXED,
                stuck ? CLASS_NAMES.HEADER_STUCK : '',
                stuckToBottom ? CLASS_NAMES.HEADER_STUCK_BOTTOM : ''
            );
        }

        const fillerProps = {
            style: {
                height: `${(this.HEADER_HEIGHT || 25)}px`
            }
        };

        const fillerCmp = stuck || stuckToBottom ?
            <div { ...fillerProps } /> : null;

        if (stuck || stuckToBottom) {
            tableProps.style = {};
            tableProps.style.width = `${width}px`;
            tableProps.style.bottom = `${bottom}px`;
        }

        else {
            tableProps.style = {};
        }

        const headerProps = {
            className: prefix(CLASS_NAMES.HEADER)
        };

        if (selectionModel) {
            selectionModel.updateCells(
                headers, columns, 'header', null, stateKey
            );
        }

        columnManager.addActionColumn({
            cells: headers,
            type: 'header',
            id: keyFromObject(headers),
            reducerKeys,
            stateKey
        });

        addEmptyInsert(headers, visibleColumns, plugins, headerOffset);

        return (
            <div>
             { fillerCmp }
                <table { ...tableProps }>
                    <thead>
                        <tr { ...headerProps }>
                            { headers }
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        );
    }

    componentDidMount() {

        const { plugins } = this.props;

        const isSticky = plugins.STICKY_HEADER
            ? plugins.STICKY_HEADER.enabled
            : false;

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
        this.getScrollWidth();
    }

    constructor() {
        super();
        this.state = {
            stuck: false,
            headerOffset: 0,
            classes: []
        };
        this.handleDrag = throttle(handleDrag, this, 5);
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
        store: PropTypes.object
    };

    setWidthResetListener(headerDOM) {

        const scope = this;

        window.addEventListener('resize', () => {

            const { stuck } = this.state;

            if (stuck) {
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

        target.addEventListener('scroll',
            config.listener
                ? config.listener.bind(this, {
                    headerDOM
                }) : defaultListener
        );
    }

    getScrollWidth() {
        const header = ReactDOM.findDOMNode(this);
        const { headerOffset } = this.state;

        const fixed = header.querySelector('.react-grid-header-fixed');
        const hidden = header
            .parentNode.querySelector('.react-grid-header-hidden');

        if (!fixed || !hidden) {
            return;
        }

        const offset = fixed.offsetWidth - hidden.offsetWidth;

        if (offset && offset !== headerOffset) {
            this.setState({
                headerOffset: offset
            });
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

    store.dispatch(resizeColumns(width, id, {
        id: nextColumnKey,
        width: nextColWidth
    }, columns, stateKey));

};

export const handleColumnClick = (col) => {
    if (col.HANDLE_CLICK) {
        col.HANDLE_CLICK.apply(this, arguments);
    }
};

function mapStateToProps(state, props) {
    return {
        columnState: stateGetter(state, props, 'grid', props.stateKey),
        dataSource: stateGetter(state, props, 'dataSource', props.stateKey),
        pager: stateGetter(state, props, 'pager', props.stateKey)
    };
}

const ConnectedFixedHeader = connect(mapStateToProps)(FixedHeader);

export { FixedHeader, ConnectedFixedHeader };

export default connect(mapStateToProps)(FixedHeader);