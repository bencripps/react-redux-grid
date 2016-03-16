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

const initialState = fromJS({
    gridData: fromJS.Map
});

export default function dataSource(state = initialState, action) {
    switch (action.type) {

    case SET_DATA:
        return state.set('gridData', Object.assign({}, state.get('gridData'),
            {
                data: action.data,
                proxy: action.data,
                total: action.total || action.data.length,
                currentRecords: action.currentRecords || action.data
            }
        ));

    case DISMISS_EDITOR:
        return state.set('gridData', Object.assign({}, state.get('gridData'),
            {
                data: state.get('gridData').proxy,
                currentRecords: state.get('gridData').proxy,
                total: state.get('gridData').proxy.length
            }
        ));

    case REMOVE_ROW:
        const remainingRows = [...state.get('gridData').data];
        remainingRows.shift();

        return state.set('gridData', Object.assign({}, state.get('gridData'),
            {
                data: remainingRows,
                proxy: remainingRows
            }
        ));

    case ADD_NEW_ROW:
        const existingData = state.get('gridData');

        const rowModel = gridData
            && existingData.data
            && existingData.data.length > 0
            && existingData.data[0]
            ? existingData.data[0]
            : {};

        Object.keys(rowModel).forEach((k) => rowModel[k] = '');

        const data = [rowModel, ...state.get('gridData').data];

        return state.set('gridData', Object.assign({}, state.get('gridData'),
            {
                data: data,
                proxy: state.get('gridData').proxy,
                total: data.length,
                currentRecords: data
            }
        ));

    case SAVE_ROW:
        const gridData = state.get('gridData').data;
        gridData[action.rowIndex] = action.values;

        return state.set('gridData', Object.assign({}, state.get('gridData'),
            {
                data: gridData,
                proxy: gridData
            }
        ));

    case SORT_DATA:
        return state.set('gridData', Object.assign({}, state.get('gridData'),
            {
                data: action.data
            }
        ));

    case CLEAR_FILTER_LOCAL:
        return state.set('gridData', Object.assign({}, state.get('gridData'),
            {
                data: state.get('gridData').proxy
            }
        ));

    case FILTER_DATA:
        return state.set('gridData', Object.assign({}, state.get('gridData'),
            {
                data: action.data
            }
        ));
    default:

        return state;
    }
}