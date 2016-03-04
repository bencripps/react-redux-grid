import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { prefix } from '../../../util/prefix';
import { stateGetter } from '../../../util/stateGetter';
import { CLASS_NAMES } from '../../../constants/GridConstants';
import { selectAll, deselectAll } from '../../../actions/plugins/selection/ModelActions';

export const CheckBox = ({dataSource, rowId, selectedRows, store, type}) => {

    const checkBoxContainerProps = {
        className: prefix(CLASS_NAMES.SELECTION_MODEL.CHECKBOX_CONTAINER)
    };

    const checkBoxProps = {
        className: prefix(CLASS_NAMES.SELECTION_MODEL.CHECKBOX),
        checked: selectedRows ? selectedRows[rowId] : false,
        type: 'checkbox',
        onChange: handleChange.bind(this, dataSource, store, type)
    };

    return type === 'header'
        ? getHeader(checkBoxContainerProps, checkBoxProps)
        : getColumn(checkBoxContainerProps, checkBoxProps);
};

export const handleChange = (dataSource, store, type, reactEvent) => {
    const target = reactEvent.target;

    if (type === 'header') {
        if (target.checked) {
            store.dispatch(selectAll(dataSource));
        }
        else {
            store.dispatch(deselectAll());
        }
    }
};

export const getHeader = (checkBoxContainerProps, checkBoxProps) => {
    return (
        <th { ...checkBoxContainerProps } >
            <input type="checkbox" { ...checkBoxProps } />
        </th>
    );

};

export const getColumn = (checkBoxContainerProps, checkBoxProps) => {
    return (
        <td { ...checkBoxContainerProps } >
            <input type="checkbox" { ...checkBoxProps } />
        </td>
    );

};

CheckBox.propTypes = {
    dataSource: PropTypes.object,
    rowId: PropTypes.any,
    selectedRows: PropTypes.object,
    store: PropTypes.object,
    type: PropTypes.string
};

CheckBox.defaultProps = {};

function mapStateToProps(state, props) {

    return {
        pager: stateGetter(state, props, 'pager', 'pagerState'),
        dataSource: stateGetter(state, props, 'dataSource', 'gridData'),
        selectedRows: stateGetter(state, props, 'selection', 'selectedRows')
    };
}

const ConnectedCheckBox = connect(mapStateToProps)(CheckBox);

export { CheckBox, ConnectedCheckBox };