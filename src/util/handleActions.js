const TYPE_ERROR = 'handleActions: Action Types should be not be undefined';
const ACTION_ERROR = 'handleActions: action object should be not be undefined';

export const handleActions = (map, initialState) => {
    Object.keys(map).forEach(key => {
        if (key === 'undefined') {
            throw new Error(TYPE_ERROR);
        }
    });

    return (state = initialState, action) => {
        if (!action) {
            throw new Error(ACTION_ERROR);
        }

        if (action.type === undefined) {
            throw new Error(TYPE_ERROR);
        }

        const reducerSubFunction = map[action.type];

        if (typeof reducerSubFunction === 'function') {
            return reducerSubFunction(state, action);
        }

        return state;
    };
};

export default handleActions;
