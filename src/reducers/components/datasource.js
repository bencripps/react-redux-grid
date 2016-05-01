import { fromJS } from 'immutable';
import { SET_DATA,
    ADD_NEW_ROW,
    CLEAR_FILTER_LOCAL,
    DISMISS_EDITOR,
    FILTER_DATA,
    REMOVE_ROW,
    SAVE_ROW,
    SORT_DATA
} from '../../constants/ActionTypes';

const initialState = fromJS({});

export default function dataSource(state = initialState, action) {
    switch (action.type) {

    case SET_DATA:
        return state.setIn([action.stateKey], {
            data: action.data,
            proxy: action.data,
            total: action.total || action.data.length,
            currentRecords: action.currentRecords || action.data
        });

    case DISMISS_EDITOR:
        if (state.get(action.stateKey)) {
            return state.updateIn([action.stateKey], (values) => ({
                data: values.proxy,
                proxy: values.proxy,
                currentRecords: values.proxy,
                total: values.total,
                isEditing: false
            }));
        }

        return state;

    case REMOVE_ROW:
        const remainingRows = [...state.get(action.stateKey).data];
        remainingRows.splice(action.rowIndex || 0, 1);

        return state.updateIn([action.stateKey], (values) => ({
            data: remainingRows,
            proxy: remainingRows,
            total: values.total,
            currentRecords: values.currentRecords
        }));

    case ADD_NEW_ROW:

        const existingData = state.get(action.stateKey);

        if (existingData && existingData.isEditing) {
            return state;
        }

        const rowModel = existingData
            && existingData.data
            && existingData.data.length > 0
            && existingData.data[0]
            ? existingData.data[0]
            : {};

        const newRow = {};

        Object.keys(rowModel).forEach((k) => newRow[k] = '');

        return state.updateIn([action.stateKey], (values) => ({
            ...values,
            data: [newRow, ...values.data],
            proxy: values.data,
            isEditing: true
        }));

    case SAVE_ROW:
        const gridData = state.get(action.stateKey).data;
        gridData[action.rowIndex] = action.values;

        return state.updateIn([action.stateKey], (values) => ({
            data: gridData,
            proxy: gridData,
            total: values.total,
            currentRecords: gridData
        }));

    case SORT_DATA:
        return state.mergeIn([action.stateKey], {
            data: action.data
        });

    case CLEAR_FILTER_LOCAL:

        const existing = state.get(action.stateKey);
        const recs = existing.proxy || existing.currentRecords;

        return state.mergeIn([action.stateKey], {
            data: recs,
            proxy: recs
        });

    case FILTER_DATA:
        return state.mergeIn([action.stateKey], {
            data: action.data
        });

    default:

        return state;
    }
}