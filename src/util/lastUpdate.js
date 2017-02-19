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

    if (typeof reducerKeys === 'string') {
        return updateGetter(
            store.getState()[reducerKeys],
            Object.keys(REDUCER_KEYS),
            REDUCER_KEYS,
            key
        );
    }

    return updateGetter(
        store.getState(),
        REDUCER_KEYS,
        Object.keys(REDUCER_KEYS),
        key
    );
};

export const updateGetter = (state, reducerKeys, keys, key) =>
    keys.reduce((prev, reducerAccessor) => {
        const reducerKey = reducerKeys[reducerAccessor];
        const stateMap = (typeof state.get === 'function')
            ? state.get(reducerKey)
            : state[reducerKey];
        if (stateMap && stateMap.toJS) {
            prev[reducerKey] = stateMap.getIn([key, 'lastUpdate']);
        }
        return prev;
    }, {});
