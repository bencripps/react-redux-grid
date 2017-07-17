import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { prefix } from '../../../util/prefix';
import { fireEvent } from '../../../util/fire';
import { stateGetter } from '../../../util/stateGetter';
import {
    gridConfig, SELECTION_MODES
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

    const { CLASS_NAMES } = gridConfig();

    const checkBoxContainerProps = {
        className: prefix(CLASS_NAMES.SELECTION_MODEL.CHECKBOX_CONTAINER,
            type === 'header'
                && selectionModelConfig.mode === SELECTION_MODES.checkboxSingle
                ? 'hidden'
                : ''
        )
    };

    let checked = selectedRows
        && selectedRows.get
        && selectedRows.get(rowId) !== undefined
        ? selectedRows.get(rowId)
        : false;

    if (type === 'header') {
        // check to see if all rows are selected
        // lastUpdate && the header checkbox itself
        checked = selectedRows
            && selectedRows.count
            && selectedRows.every(s => s)
            ? selectedRows.count() - 2 === dataSource.currentRecords.count()
            : false;
    }

    const checkBoxProps = {
        className: prefix(CLASS_NAMES.SELECTION_MODEL.CHECKBOX),
        checked,
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

            fireEvent(
                'HANDLE_AFTER_SELECT_ALL',
                events,
                {
                    data: dataSource,
                    store
                },
                reactEvent
            );
        }

        else {
            store.dispatch(deselectAll({ stateKey }));

            fireEvent(
                'HANDLE_AFTER_DESELECT_ALL',
                events,
                {
                    data: dataSource,
                    store
                },
                reactEvent
            );
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

const { any, func, number, object, string, oneOfType } = PropTypes;

CheckBox.propTypes = {
    dataSource: object,
    index: number,
    onSelect: func,
    reducerKeys: oneOfType([object, string]),
    rowId: any,
    selectedRows: object,
    selectionModelConfig: object,
    store: object,
    type: string
};

CheckBox.defaultProps = {
    selectionModelConfig: {}
};

function mapStateToProps(state, props) {
    return {
        dataSource: stateGetter(state, props, 'dataSource', props.stateKey),
        selectedRows: stateGetter(state, props, 'selection', props.stateKey)
    };
}

const ConnectedCheckBox = connect(mapStateToProps)(CheckBox);

export { ConnectedCheckBox };
