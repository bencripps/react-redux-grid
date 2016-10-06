import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { prefix } from '../../../util/prefix';
import { stateGetter } from '../../../util/stateGetter';
import { CLASS_NAMES } from '../../../constants/GridConstants';
import { selectAll, deselectAll } from '../../../actions/plugins/selection/ModelActions';

export const CheckBox = ({
    reducerKeys, dataSource, rowId, selectedRows, store, stateKey, type
}) => {

    const checkBoxContainerProps = {
        className: prefix(CLASS_NAMES.SELECTION_MODEL.CHECKBOX_CONTAINER)
    };

    const checkBoxProps = {
        className: prefix(CLASS_NAMES.SELECTION_MODEL.CHECKBOX),
        checked: selectedRows ? selectedRows[rowId] : false,
        type: 'checkbox',
        onChange: handleChange.bind(this, dataSource, store, type, stateKey)
    };

    return type === 'header'
        ? getHeader(checkBoxContainerProps, checkBoxProps)
        : getColumn(checkBoxContainerProps, checkBoxProps);
};

export const handleChange = (dataSource, store, type, stateKey, reactEvent) => {
    const target = reactEvent.target;

    if (type === 'header') {
        if (target.checked) {
            store.dispatch(selectAll({ stateKey, data: dataSource }));
        }
        else {
            store.dispatch(deselectAll({ stateKey }));
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
    reducerKeys: PropTypes.object,
    rowId: PropTypes.any,
    selectedRows: PropTypes.object,
    store: PropTypes.object,
    type: PropTypes.string
};

CheckBox.defaultProps = {};

function mapStateToProps(state, props) {
    return {
        pager: stateGetter(state, props, 'pager', props.stateKey),
        dataSource: stateGetter(state, props, 'dataSource', props.stateKey),
        selectedRows: stateGetter(state, props, 'selection', props.stateKey)
    };
}

const ConnectedCheckBox = connect(mapStateToProps)(CheckBox);

export { ConnectedCheckBox };
