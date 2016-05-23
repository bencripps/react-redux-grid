import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { Button } from './toolbar/Button.jsx';
import { Description } from './toolbar/Description.jsx';

import { prefix } from '../../../util/prefix';
import { stateGetter } from '../../../util/stateGetter';
import { CLASS_NAMES } from '../../../constants/GridConstants';
import { getCurrentRecords } from '../../../util/getCurrentRecords';

export const PagerToolbar = ({
    BUTTON_TYPES, dataSource,
    pageSize, pager, pagerState, plugins,
    recordType, stateKey, store, toolbarRenderer}) => {

    const pagerDataSource = getPagingSource(plugins, dataSource);

    const customComponent = getCustomComponent(plugins, {
        dataSource,
        pageSize,
        pager,
        ...{ gridData: pagerState },
        plugins,
        recordType,
        store
    });

    if (customComponent) {
        return customComponent;
    }

    const component = plugins
                    && plugins.PAGER
                    && plugins.PAGER.enabled
                    ? getPager(
                        pagerDataSource,
                        pageSize,
                        recordType,
                        BUTTON_TYPES,
                        pager,
                        plugins,
                        pagerState,
                        pagerDataSource,
                        toolbarRenderer,
                        stateKey,
                        store)
                    : <div />;

    return component;

};

PagerToolbar.propTypes = {
    BUTTON_TYPES: PropTypes.object,
    dataSource: PropTypes.any,
    gridState: PropTypes.object,
    nextButtonText: PropTypes.string,
    pageSize: PropTypes.number.isRequired,
    pager: PropTypes.object,
    pagerState: PropTypes.object,
    plugins: PropTypes.object,
    recordType: PropTypes.string,
    store: PropTypes.object.isRequired,
    toolbarRenderer: PropTypes.func
};

PagerToolbar.defaultProps = {
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

export const getCustomComponent = (plugins, props) => {
    return plugins
        && plugins.PAGER
        && plugins.PAGER.pagerComponent
        ? plugins.PAGER.pagerComponent
        : false;
};

export const getCurrentRecordTotal = (
    pagerState, pageSize, pageIndex, plugins
) => {

    if (plugins.PAGER.pagingType === 'remote'
        && pagerState
        && pagerState.currentRecords) {
        return pagerState.currentRecords.length;
    }

    else if (plugins.PAGER.pagingType === 'local') {
        const records = getCurrentRecords(pagerState, pageIndex, pageSize);
        return records ? records.length : 0;
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
        return dataSource.data.length;
    }

};

export const getPager = (dataSource, pageSize,
                        recordType,
                        BUTTON_TYPES,
                        pager,
                        plugins,
                        pagerState,
                        pagerDataSource,
                        toolbarRenderer,
                        stateKey,
                        store) => {

    const pageIndex = pager && pager.pageIndex || 0;

    const toolbarProps = {
        className: prefix(CLASS_NAMES.PAGERTOOLBAR)
    };

    const currentRecords = getCurrentRecordTotal(
        pagerState, pageSize, pageIndex, plugins, dataSource
    );

    const total = getTotal(pagerState, plugins.PAGER);

    const descriptionProps = {
        pageIndex,
        pageSize,
        total,
        currentRecords,
        recordType
    };

    return (
        <div { ...toolbarProps }>
            <span>
                <Button { ...{
                    BUTTON_TYPES,
                    type: BUTTON_TYPES.BACK,
                    pageIndex,
                    pageSize,
                    plugins,
                    currentRecords,
                    total,
                    dataSource,
                    stateKey,
                    store }
                    }
                />
                <Button { ...{
                    BUTTON_TYPES,
                    type: BUTTON_TYPES.NEXT,
                    pageIndex,
                    pageSize,
                    plugins,
                    currentRecords,
                    total,
                    dataSource,
                    stateKey,
                    store }
                    }
                />
            </span>
            <Description { ...descriptionProps } />
        </div>
    );
};

export const getPagingSource = (plugins, dataSource) => {
    if (plugins
        && plugins.PAGER
        && plugins.PAGER.pagingSource) {
        return plugins.PAGER.pagingSource;
    }

    return dataSource;
};

function mapStateToProps(state, props) {

    return {
        pager: stateGetter(state, props, 'pager', props.stateKey),
        pagerState: stateGetter(state, props, 'dataSource', props.stateKey),
        gridState: stateGetter(state, props, 'grid', props.stateKey)
    };
}

const ConnectedPagerToolbar = connect(mapStateToProps)(PagerToolbar);

export { PagerToolbar, ConnectedPagerToolbar };