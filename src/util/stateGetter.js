/*
* central function to retrieve state from reducer
* used inside of mapStateToProps by grid and other plugins
* @returns {object} state

* if a dynamic reducerKey is passed, it will favor that key
* over the build in grid keys

*/

export const stateGetter = (state, props, key, entry) => {

    if (props && props.reducerKeys) {
        if (typeof props.reducerKeys === 'string') {
            return get(state[props.reducerKeys], key, entry);
        }
        else if (typeof props.reducerKeys === 'object' &&
          Object.keys(props.reducerKeys).length > 0 &&
          props.reducerKeys[key]) {

            const dynamicKey = props.reducerKeys[key];
            const dynamicState = get(state, dynamicKey, entry);

            return dynamicState;
        }
    }

    const val = get(state, key, entry);

    if (val) {
        return val;
    }

    return null;
};

export const get = (state, key, entry) => {

    if (!state) {
        return null;
    }

    const isImmutable = typeof state.get === 'function';
    const stateItem = isImmutable
        ? state.get(key)
        : state[key];

    if (!stateItem) {
        return null;
    }

    return stateItem.get(entry);
};
