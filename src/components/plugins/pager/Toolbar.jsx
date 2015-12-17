import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { keyGenerator, keyFromObject } from '../../../util/keygenerator';
import { prefix } from '../../../util/prefix';
import { emptyFn } from '../../../util/emptyFn';
import '../../../style/components/plugins/pager/toolbar.styl';
import { CLASS_NAMES } from '../../../constants/GridConstants';

class PagerToolbar extends Component {

    static defaultProps = {
        store: React.PropTypes.func.isRequired,
        enablePaging: true,
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

    handleButtonClick(type) {
        alert(type);
    }

    getButton(type) {
        const { nextButtonText, lastButtonText, BUTTON_TYPES } = this.props;

        const buttonProps = {
            onClick: this.handleButtonClick.bind(this, type),
            children: type === BUTTON_TYPES.NEXT ? nextButtonText : lastButtonText
        }

        return (
            <button { ...buttonProps } />
        )
    }

    getPager() {

        const { startPage, endPage, pageSize, recordType, BUTTON_TYPES } = this.props;

        const toolbarProps = {
            className: prefix(CLASS_NAMES.PAGERTOOLBAR)
        }

        return (
            <tr {...toolbarProps }>
                <td colSpan="100%">
                    <div> 
                        <span>
                            { `${startPage * pageSize} of ${endPage * pageSize } ${recordType} Displayed` }
                        </span>
                        <span>
                           { this.getButton(BUTTON_TYPES.NEXT) }
                           { this.getButton(BUTTON_TYPES.LAST) }
                        </span>
                    </div>
                </td>
            </tr>
        );
    }

    render() {

        const { enablePaging } = this.props;

        const pager = enablePaging ? this.getPager() : null;

        return pager;
    }
}

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps)(PagerToolbar);