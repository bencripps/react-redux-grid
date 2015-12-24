import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { prefix } from '../../../util/prefix';
import { CLASS_NAMES } from '../../../constants/GridConstants';
import { keyGenerator, keyFromObject } from '../../../util/keygenerator';
import '../../../style/components/plugins/gridactions/actioncolumn.styl';

class ActionColumn extends Component {

    static defaultProps = {
        store: React.PropTypes.func,
        iconCls: 'grid-action-icon'
    }

    getHeader(containerProps, iconProps) {
        return (
            <th { ...containerProps }>
                <span { ...iconProps }></span>
            </th>
        );
    }

    getColumn(containerProps, iconProps) {
        return (
            <td { ...containerProps }>
                <span { ...iconProps }></span>
            </td>
        );
    }

    handleActionClick() {
        console.log(arguments);
    }

    render() {

        const { iconCls, type, actions } = this.props;

        const containerProps = {
            className: prefix(CLASS_NAMES.GRID_ACTIONS.CONTAINER)
        };

        const iconProps = {
            className: actions.iconCls || iconCls,
            onClick: this.handleActionClick
        };

        return type === 'header'
         ? this.getHeader(containerProps, iconProps) 
         : this.getColumn(containerProps, iconProps);
    }
}

function mapStateToProps(state) {
    
    return {
        pager: state.pager.get('pagerState'),
        dataSource: state.dataSource.get('gridData'),
        selectedRows: state.selection.get('selectedRows')
    };
}

export default connect(mapStateToProps)(ActionColumn);