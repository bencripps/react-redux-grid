let num = 0;

const REDUCER_KEYS = {
    BulkActions: 'bulkaction',
    DataSource: 'dataSource',
    Editor: 'editor',
    ErrorHandler: 'errorhandler',
    Grid: 'grid',
    Loader: 'loader',
    Menu: 'menu',
    Pager: 'pager',
    Selection: 'selection'
};

export const generateLastUpdate = () => ++num;

export const resetLastUpdate = () => { num = 0; };

export const getLastUpdate = (store, key, reducerKeys = REDUCER_KEYS) => {
    let state = store.getState();
    let keys;

    if (typeof reducerKeys === 'string') {
        state = state[reducerKeys];
        keys = Object.keys(REDUCER_KEYS);
        reducerKeys = REDUCER_KEYS;
    }
    else {
        keys = Object.keys(reducerKeys);
        if (!keys.length) {
            reducerKeys = REDUCER_KEYS;
            keys = Object.keys(REDUCER_KEYS);
        }
    }

    return keys.reduce((prev, reducerAccessor) => {
        const reducerKey = reducerKeys[reducerAccessor];
        const stateMap = (typeof state.get === 'function')
            ? state.get(reducerKey)
            : state[reducerKey];
        if (stateMap && stateMap.toJS) {
            prev[reducerKey] = stateMap.getIn([key, 'lastUpdate']);
        }
        return prev;
    }, {});
};
