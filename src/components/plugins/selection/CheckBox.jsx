import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { prefix } from '../../../util/prefix';
import { stateGetter } from '../../../util/stateGetter';
import { CLASS_NAMES } from '../../../constants/GridConstants';
import { selectAll, deselectAll } from '../../../actions/plugins/selection/ModelActions';

class CheckBox extends Component {

    static propTypes = {
        dataSource: PropTypes.object,
        rowId: PropTypes.string,
        selectedRows: PropTypes.object,
        store: PropTypes.object,
        type: PropTypes.string
    };

    handleChange(type, reactEvent) {
        const { store, dataSource } = this.props;
        const target = reactEvent.target;
        if (type === 'header') {
            if (target.checked) {
                store.dispatch(selectAll(dataSource));
            }
            else {
                store.dispatch(deselectAll());
            }
        }

    }

    getHeader(checkBoxContainerProps, checkBoxProps) {
        return (
            <th { ...checkBoxContainerProps } >
                <input type="checkbox" { ...checkBoxProps } />
            </th>
        );

    }

    getColumn(checkBoxContainerProps, checkBoxProps) {
        return (
            <td { ...checkBoxContainerProps } >
                <input type="checkbox" { ...checkBoxProps } />
            </td>
        );

    }

    render() {

        const { rowId, selectedRows, type } = this.props;

        const checkBoxContainerProps = {
            className: prefix(CLASS_NAMES.SELECTION_MODEL.CHECKBOX_CONTAINER)
        };

        const checkBoxProps = {
            className: prefix(CLASS_NAMES.SELECTION_MODEL.CHECKBOX),
            checked: selectedRows ? selectedRows[rowId] : false,
            type: 'checkbox',
            onChange: this.handleChange.bind(this, type)
        };

        return type === 'header'
            ? this.getHeader(checkBoxContainerProps, checkBoxProps)
            : this.getColumn(checkBoxContainerProps, checkBoxProps);

    }
}

function mapStateToProps(state, props) {

    return {
        pager: stateGetter(state, props, 'pager', 'pagerState'),
        dataSource: stateGetter(state, props, 'dataSource', 'gridData'),
        selectedRows: stateGetter(state, props, 'selection', 'selectedRows')
    };
}

const ConnectedCheckBox = connect(mapStateToProps)(CheckBox);

export { CheckBox, ConnectedCheckBox };