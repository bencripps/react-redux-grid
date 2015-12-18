import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { keyGenerator, keyFromObject } from '../../../util/keygenerator';
import { prefix } from '../../../util/prefix';
import { emptyFn } from '../../../util/emptyFn';
import '../../../style/components/plugins/pager/toolbar.styl';
import { CLASS_NAMES } from '../../../constants/GridConstants';
import { setPageNext, setPageLast } from '../../../actions/plugins/pager/PagerActions';

class PagerToolbar extends Component {

    static defaultProps = {
        store: React.PropTypes.func.isRequired,
        plugins: React.PropTypes.object,
        startPage: React.PropTypes.number.isRequired,
        endPage: React.PropTypes.number.isRequired,
        pageSize: React.PropTypes.number.isRequired,
        recordType: 'Records',
        nextButtonText: 'Next',
        lastButtonText: 'Last',
        BUTTON_TYPES: {
            NEXT: 'NEXT',
            LAST: 'LAST'
        }
    }

    handleButtonClick(type, pageIndex) {
        const { PAGER } = this.props.plugins;
        const { store, BUTTON_TYPES } = this.props;
        const event = type === BUTTON_TYPES.NEXT ? setPageNext : setPageLast

        if (PAGER.pagingType === 'local') {
            store.dispatch(event(pageIndex));
        }
    }

    getButton(type, pageIndex) {
        const { nextButtonText, lastButtonText, BUTTON_TYPES } = this.props;

        const buttonProps = {
            onClick: this.handleButtonClick.bind(this, type, pageIndex),
            children: type === BUTTON_TYPES.NEXT ? nextButtonText : lastButtonText
        }

        return (
            <button { ...buttonProps } />
        )
    }

    getPager() {

        const { 
            pageSize, 
            recordType,
            BUTTON_TYPES,
            pager 
        } = this.props;

        const pageIndex = pager && pager.pageIndex || 0;

        const toolbarProps = {
            className: prefix(CLASS_NAMES.PAGERTOOLBAR)
        }

        return (
            <tr {...toolbarProps }>
                <td colSpan="100%">
                    <div> 
                        <span>
                            { `${pageIndex * pageSize} of ${pageIndex * pageSize } ${recordType} Displayed` }
                        </span>
                        <span>
                           { this.getButton(BUTTON_TYPES.NEXT, pageIndex) }
                           { this.getButton(BUTTON_TYPES.LAST, pageIndex) }
                        </span>
                    </div>
                </td>
            </tr>
        );
    }

    render() {

        const { plugins } = this.props;

        const pager = plugins 
                        && plugins.PAGER 
                        && plugins.PAGER.enabled ? this.getPager() : null;

        return pager;
    }
}

function mapStateToProps(state) {
    return {
        pager: state.pager.get('pagerState')
    };
}

export default connect(mapStateToProps)(PagerToolbar);