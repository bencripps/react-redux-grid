import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { keyGenerator, keyFromObject } from '../../../util/keygenerator';
import { prefix } from '../../../util/prefix';
import { emptyFn } from '../../../util/emptyFn';
import '../../../style/components/plugins/pager/toolbar.styl';
import '../../../style/components/button.styl';
import { CLASS_NAMES } from '../../../constants/GridConstants';
import { getCurrentRecords } from '../../../util/getCurrentRecords';
import { 
    setPage, 
    setPageAsync 
} from '../../../actions/plugins/pager/PagerActions';
import Request from '../ajax/Request';

class PagerToolbar extends Component {

    static defaultProps = {
        store: React.PropTypes.func.isRequired,
        plugins: React.PropTypes.object,
        pageSize: React.PropTypes.number.isRequired,
        recordType: 'Records',
        nextButtonText: 'Next',
        lastButtonText: 'Last',
        BUTTON_TYPES: {
            NEXT: 'NEXT',
            LAST: 'LAST'
        },
        toolbarRenderer: (pageIndex, pageSize, total, currentRecords, recordType) => {

            if (!currentRecords) {
                return `No ${recordType} Available`;
            }

            return `${pageIndex * pageSize} through ${pageIndex * pageSize + currentRecords} of ${total} ${recordType} Displayed`;
        }
    }

    getCurrentRecordTotal(dataSource, pageSize, pageIndex, plugins) {

        if (plugins.PAGER.pagingType === 'remote' && dataSource && dataSource.currentRecords) {
            return dataSource.currentRecords.length;
        }

        else if (plugins.PAGER.pagingType === 'local') {
            const records = getCurrentRecords(dataSource, pageIndex, pageSize);

            return records ? records.length : 0;
        }

    }

    handleButtonClick(type, pageIndex) {
        const { PAGER } = this.props.plugins;
        const { store, BUTTON_TYPES, pageSize } = this.props;

        let event;

        if (PAGER.pagingType === 'local') {
            store.dispatch(setPage(pageIndex, type, BUTTON_TYPES));
        }

        else if (PAGER.pagingType === 'remote' && PAGER.pagingSource) {
            store.dispatch(setPageAsync(pageIndex, pageSize, type, BUTTON_TYPES, PAGER.pagingSource));
        }

        else {
            console.warn('Please configure paging plugin pagingType to local if no pagingSource is provided');
        }
    }

    isButtonDisabled(type, pageIndex, pageSize, currentRecords, total, BUTTON_TYPES) {
        if (type === BUTTON_TYPES.LAST) {
            return pageIndex === 0;
        }
        else if (type === BUTTON_TYPES.NEXT) {
            return currentRecords < pageSize || (pageIndex * pageSize) + currentRecords === total;
        }
    }

    getButton(type, pageIndex, pageSize, currentRecords, total) {
        const { nextButtonText, lastButtonText, BUTTON_TYPES } = this.props;

        const buttonProps = {
            onClick: this.handleButtonClick.bind(this, type, pageIndex),
            children: type === BUTTON_TYPES.NEXT ? nextButtonText : lastButtonText,
            disabled: this.isButtonDisabled(type, pageIndex, pageSize, currentRecords, total, BUTTON_TYPES),
            className: prefix(CLASS_NAMES.BUTTONS.PAGER)
        }

        return (
            <button { ...buttonProps } />
        )
    }

    getTotal(dataSource, pagerDefaults) {

        if (!dataSource || !dataSource.data) {
            return 0;
        }

        if (pagerDefaults && pagerDefaults.pagingType === 'remote') {
            return dataSource.total;
        }

        else if (pagerDefaults && pagerDefaults.pagingType === 'local') {
            return dataSource.data.length;
        }

    }

    getPager(dataSource) {

        const { 
            pageSize, 
            recordType,
            BUTTON_TYPES,
            pager,
            plugins,
            gridState,
            toolbarRenderer
        } = this.props;

        const pageIndex = pager && pager.pageIndex || 0;

        const toolbarProps = {
            className: prefix(CLASS_NAMES.PAGERTOOLBAR)
        }

        const currentRecords = this.getCurrentRecordTotal(dataSource, pageSize, pageIndex, plugins);

        const total = this.getTotal(dataSource, plugins.PAGER);

        return (
            <tfoot>
                <tr {...toolbarProps }>
                    <td colSpan="100%">
                        <div> 
                            <span>
                                { toolbarRenderer(pageIndex, pageSize, total, currentRecords, recordType) }
                            </span>
                            <span>
                               { this.getButton(BUTTON_TYPES.NEXT, pageIndex, pageSize, currentRecords, total) }
                               { this.getButton(BUTTON_TYPES.LAST, pageIndex, pageSize, currentRecords, total) }
                            </span>
                        </div>
                    </td>
                </tr>
            </tfoot>
        );
    }

    render() {

        const { plugins, dataSource } = this.props;

        const pagerComponent = plugins 
                        && plugins.PAGER 
                        && plugins.PAGER.enabled ? this.getPager(dataSource) : <tfoot></tfoot>;

        return pagerComponent;
    }
}

function mapStateToProps(state) {
    
    return {
        pager: state.pager.get('pagerState'),
        dataSource: state.dataSource.get('gridData'),
        gridState: state.grid.get('gridState')
    };
}

export default connect(mapStateToProps)(PagerToolbar);