import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Button } from './toolbar/Button';
import { Description } from './toolbar/Description';
import { shouldPagerUpdate } from '../../../util/shouldComponentUpdate';
import { prefix } from '../../../util/prefix';
import { isPluginEnabled } from '../../../util/isPluginEnabled';
import { gridConfig } from '../../../constants/GridConstants';
import { getCurrentRecords } from '../../../util/getCurrentRecords';

export class PagerToolbar extends Component {

    render() {

        const {
            dataSource,
            BUTTON_TYPES,
            gridData,
            pageSize,
            pagerState,
            plugins,
            recordType,
            stateKey,
            store,
            toolbarRenderer
        } = this.props;

        const pagerDataSource = getPagingSource(plugins, gridData);

        const { stuck, stuckBottom, width, top } = this.state;

        const customComponent = getCustomComponent(plugins, {
            gridData,
            pageSize,
            pagerState,
            plugins,
            recordType,
            store
        });

        if (customComponent) {
            return customComponent;
        }

        const component = isPluginEnabled(plugins, 'PAGER')
                        ? getPager(
                            dataSource,
                            pageSize,
                            recordType,
                            BUTTON_TYPES,
                            pagerState,
                            plugins,
                            gridData,
                            pagerDataSource,
                            toolbarRenderer,
                            stateKey,
                            stuck,
                            stuckBottom,
                            store,
                            top,
                            width)
                        : <div />;

        return component;
    }

    componentDidMount() {

        const { plugins } = this.props;

        const isSticky = plugins.STICKY_FOOTER
            ? plugins.STICKY_FOOTER.enabled
            : false;

        const footerDOM = ReactDOM.findDOMNode(this);

        this.FOOTER_HEIGHT = footerDOM.clientHeight;

        if (isSticky && !this._scrollListener) {
            this.createScrollListener(
                plugins.STICKY_FOOTER, footerDOM
            );
        }
    }

    componentWillUnmount() {
        if (this._scrollTarget) {
            this._scrollTarget
                .removeEventListener('scroll', this._scrollListener);
        }

        delete this._scrollListener;
    }

    constructor(props) {
        super(props);

        this.shouldComponentUpdate = shouldPagerUpdate.bind(this);

        this.state = {
            stuck: false,
            stuckBottom: false,
            classes: [],
            top: false
        };
    }

    static propTypes = {
        BUTTON_TYPES: PropTypes.object,
        dataSource: PropTypes.any,
        gridData: PropTypes.object,
        nextButtonText: PropTypes.string,
        pageSize: PropTypes.number.isRequired,
        pagerState: PropTypes.object,
        plugins: PropTypes.object,
        recordType: PropTypes.string,
        stateKey: PropTypes.string,
        store: PropTypes.object.isRequired,
        toolbarRenderer: PropTypes.func
    };

    static defaultProps = {
        recordType: 'Records',
        BUTTON_TYPES: {
            NEXT: 'NEXT',
            BACK: 'BACK'
        },
        toolbarRenderer: (
            pageIndex, pageSize, total, currentRecords, recordType
        ) => {
            if (!currentRecords) {
                return `No ${recordType} Available`;
            }

            return `${pageIndex * pageSize}
                through ${pageIndex * pageSize + currentRecords}
                of ${total} ${recordType} Displayed`;
        }
    };

    isElementInViewport(el) {

        const rect = el.getBoundingClientRect();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <=
                (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <=
                (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    shouldStick(footerDOM) {

        const { CLASS_NAMES } = gridConfig();

        const isTableVisible = this.isElementInViewport(
            footerDOM.parentNode.querySelector(
                `.${prefix(CLASS_NAMES.HEADER_FIXED)}`
            )
        );

        const isFooterVisible = (
            footerDOM.parentNode.getBoundingClientRect().bottom
            < window.innerHeight
        );

        return isTableVisible && !isFooterVisible;

    }

    setWidthResetListener(footerDOM) {

        const scope = this;

        window.addEventListener('resize', () => {

            const { stuck, stuckBottom } = this.state;

            if (stuck || stuckBottom) {
                scope.setState({
                    width: footerDOM.parentNode.getBoundingClientRect().width
                });
            }

        });

    }

    createScrollListener(config, footerDOM) {

        const scope = this;
        const BUFFER = 52;
        let target = config.scrollTarget
            ? document.querySelector(config.scrollTarget)
            : document;

        target = target || document;

        this.setWidthResetListener(footerDOM);

        const defaultListener = () => {

            const { stuck } = scope.state;
            const shouldStick = this.shouldStick(footerDOM);
            const shouldStop = (
                footerDOM.parentNode.getBoundingClientRect().top
                + BUFFER > window.innerHeight
            );

            if (shouldStop) {
                return scope.setState({
                    stuckBottom: true,
                    stuck: false,
                    width: null,
                    top: 25
                });
            }

            if (shouldStick && !stuck) {
                scope.setState({
                    stuckBottom: false,
                    stuck: true,
                    width: footerDOM.clientWidth,
                    top: null
                });
            }

            else if (!shouldStick && stuck) {
                scope.setState({
                    stuckBottom: false,
                    stuck: false,
                    width: null,
                    top: null
                });
            }
        };

        this._scrollListener = config.listener
                ? config.listener.bind(this, {
                    footerDOM
                }) : defaultListener;

        this._scrollTarget = target;

        this._scrollTarget.addEventListener('scroll', this._scrollListener);
    }
}

export const getCustomComponent = (plugins) => {
    return plugins
        && plugins.PAGER
        && plugins.PAGER.pagerComponent
        ? plugins.PAGER.pagerComponent
        : false;
};

export const getCurrentRecordTotal = (
    gridData, pageSize, pageIndex, plugins
) => {

    if (plugins.PAGER.pagingType === 'remote'
        && gridData
        && gridData.currentRecords) {
        return gridData.currentRecords.count();
    }

    else if (plugins.PAGER.pagingType === 'local') {
        const records = getCurrentRecords(gridData, pageIndex, pageSize);
        return records && records.data ? records.data.count() : 0;
    }

};

export const getTotal = (dataSource, pagerDefaults) => {

    if (!dataSource || !dataSource.data) {
        return 0;
    }

    if (pagerDefaults && pagerDefaults.pagingType === 'remote') {
        return dataSource.total;
    }

    else if (pagerDefaults && pagerDefaults.pagingType === 'local') {
        return dataSource.data.count();
    }

};

export const getPager = (
    dataSource,
    pageSize,
    recordType,
    BUTTON_TYPES,
    pager,
    plugins,
    gridData,
    pagerDataSource,
    toolbarRenderer,
    stateKey,
    stuck,
    stuckBottom,
    store,
    top,
    width
) => {

    const { CLASS_NAMES } = gridConfig();

    const pageIndex = pager
        && pager.get('pageIndex')
        ? pager.get('pageIndex')
        : 0;

    const toolbarProps = {
        className: prefix(
            CLASS_NAMES.PAGERTOOLBAR,
            stuck ? 'is-stuck' : '',
            stuckBottom ? 'is-stuck-bottom' : ''
        )
    };

    if (width) {
        toolbarProps.style = {};
        toolbarProps.style.width = `${width}px`;
    }

    if (top) {
        toolbarProps.style = toolbarProps.style || {};
        toolbarProps.style.top = `${top}px`;
    }

    const currentRecords = getCurrentRecordTotal(
        gridData, pageSize, pageIndex, plugins, gridData
    );

    const total = getTotal(gridData, plugins.PAGER);

    const descriptionProps = {
        pageIndex,
        pageSize,
        total,
        currentRecords,
        recordType
    };

    const spacerProps = {
        style: {
            height: '33px'
        }
    };

    const spacer = stuck || stuckBottom
        ? <div { ...spacerProps }/>
        : null;

    return (
        <div>
            { spacer }
            <div { ...toolbarProps }>
                <span>
                    <Button { ...{
                        dataSource,
                        BUTTON_TYPES,
                        type: BUTTON_TYPES.BACK,
                        pageIndex,
                        pageSize,
                        plugins,
                        currentRecords,
                        total,
                        gridData,
                        stateKey,
                        store }
                        }
                    />
                    <Button { ...{
                        dataSource,
                        BUTTON_TYPES,
                        type: BUTTON_TYPES.NEXT,
                        pageIndex,
                        pageSize,
                        plugins,
                        currentRecords,
                        total,
                        gridData,
                        stateKey,
                        store }
                        }
                    />
                </span>
                <Description { ...descriptionProps } />
            </div>
        </div>
    );
};

export const getPagingSource = (plugins, gridData) => {
    if (plugins
        && plugins.PAGER
        && plugins.PAGER.pagingSource) {
        return plugins.PAGER.pagingSource;
    }

    return gridData;
};

export default PagerToolbar;
