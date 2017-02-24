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
        const state = store.getState().get
            ? store.getState().get(reducerKeys)
            : store.getState()[reducerKeys];

        return updateGetter(
            state,
            REDUCER_KEYS,
            Object.keys(REDUCER_KEYS),
            key
        );
    }

    const dynamicReducerKeys = typeof reducerKeys === 'object'
        && Object.keys(reducerKeys).length > 0
        ? reducerKeys
        : REDUCER_KEYS;

    return updateGetter(
        store.getState(),
        dynamicReducerKeys,
        Object.keys(dynamicReducerKeys),
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
        else if (typeof stateMap === 'object' && stateMap[key]) {
            prev[reducerKey] = stateMap[key].lastUpdate;
        }
        return prev;
    }, {});
