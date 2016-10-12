import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { prefix } from '../../../util/prefix';
import { stateGetter } from '../../../util/stateGetter';
import {
    CLASS_NAMES, SELECTION_MODES
 } from '../../../constants/GridConstants';
import {
    selectAll, deselectAll
} from '../../../actions/plugins/selection/ModelActions';

export const CheckBox = ({
    dataSource,
    events,
    index,
    isSelected,
    onSelect,
    rowData,
    rowId,
    selectedRows,
    selectionModelConfig,
    stateKey,
    store,
    type
}) => {

    const checkBoxContainerProps = {
        className: prefix(CLASS_NAMES.SELECTION_MODEL.CHECKBOX_CONTAINER,
            type === 'header'
                && selectionModelConfig.mode === SELECTION_MODES.checkboxSingle
                ? 'hidden'
                : ''
        )
    };

    const checkBoxProps = {
        className: prefix(CLASS_NAMES.SELECTION_MODEL.CHECKBOX),
        checked: selectedRows ? selectedRows[rowId] : false,
        type: 'checkbox',
        onChange: handleChange.bind(
            this,
            dataSource,
            store,
            type,
            stateKey,
            onSelect,
            rowId,
            index,
            rowData,
            selectionModelConfig,
            isSelected,
            events
        )
    };

    return type === 'header'
        ? getHeader(checkBoxContainerProps, checkBoxProps)
        : getColumn(checkBoxContainerProps, checkBoxProps);
};

export const handleChange = (
    dataSource,
    store,
    type,
    stateKey,
    onSelect,
    id,
    index,
    rowData,
    selectionModelConfig,
    isSelected,
    events,
    reactEvent
) => {

    const target = reactEvent.target;

    if (type === 'header') {

        if (target.checked) {
            store.dispatch(selectAll({ stateKey, data: dataSource }));
            if (events.HANDLE_AFTER_SELECT_ALL) {
                events.HANDLE_AFTER_SELECT_ALL({ data: dataSource, store });
            }
        }
        else {
            store.dispatch(deselectAll({ stateKey }));
            if (events.HANDLE_AFTER_DESELECT_ALL) {
                events.HANDLE_AFTER_DESELECT_ALL({ data: dataSource, store });
            }
        }
    }

    else if (selectionModelConfig.selectionEvent !== 'singleclick') {
        reactEvent.stopPropagation();
        onSelect({ id, index, data: rowData, selected: isSelected });
    }
};

export const getHeader = (checkBoxContainerProps, checkBoxProps) => {

    return (
        <th { ...checkBoxContainerProps } >
            <input
                type="checkbox"
                { ...checkBoxProps }
            />
        </th>
    );

};

export const getColumn = (checkBoxContainerProps, checkBoxProps) => {
    return (
        <td { ...checkBoxContainerProps } >
            <input
                type="checkbox"
                { ...checkBoxProps }
            />
        </td>
    );

};

CheckBox.propTypes = {
    dataSource: PropTypes.object,
    index: PropTypes.number,
    onSelect: PropTypes.func,
    reducerKeys: PropTypes.object,
    rowId: PropTypes.any,
    selectedRows: PropTypes.object,
    selectionModelConfig: PropTypes.object,
    store: PropTypes.object,
    type: PropTypes.string
};

CheckBox.defaultProps = {
    selectionModelConfig: {}
};

function mapStateToProps(state, props) {
    return {
        pager: stateGetter(state, props, 'pager', props.stateKey),
        dataSource: stateGetter(state, props, 'dataSource', props.stateKey),
        selectedRows: stateGetter(state, props, 'selection', props.stateKey)
    };
}

const ConnectedCheckBox = connect(mapStateToProps)(CheckBox);

export { ConnectedCheckBox };
