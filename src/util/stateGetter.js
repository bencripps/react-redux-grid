/*
* central function to retrieve state from reducer
* used inside of mapStateToProps by grid and other plugins
* @returns {object} state

* will not return immutable object, only plain JS object

* if a dynamic reducerKey is passed, it will favor that key
* over the build in grid keys

*/

export const stateGetter = (state, props, key, entry) => {

    if (props
        && props.reducerKeys
        && Object.keys(props.reducerKeys).length > 0
        && props.reducerKeys[key]) {

        const dynamicKey = props.reducerKeys[key];
        const dynamicState = get(state, dynamicKey, entry);

        return dynamicState && dynamicState.toJS
            ? dynamicState.toJS()
            : dynamicState;
    }

    const val = get(state, key, entry);

    if (val) {
        return val.toJS ? val.toJS() : val;
    }

    return null;
};

export const get = (state, key, entry) => state
    && state[key]
    && state[key].get
    && state[key].get(entry)
        ? state[key].get(entry)
        : null;
