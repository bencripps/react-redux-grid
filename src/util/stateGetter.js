/*
* central function to retrieve state from reducer
* used inside of mapStateToProps by grid and other plugins
* @returns {object} state

* will not return immutable object, only plain JS object

* if a dynamic reducerKey is passed, it will favor that key
* over the build in grid keys

*/

export function stateGetter(state, props, key, entry) {

    if (props
        && props.reducerKeys
        && Object.keys(props.reducerKeys).length > 0
        && props.reducerKeys[key]) {

        const dynamicKey = props.reducerKeys[key];

        const dynamicState = state
            && state[dynamicKey]
            && state[dynamicKey].get
            && state[dynamicKey].get(entry)
            ? state[dynamicKey].get(entry)
            : null;

        return dynamicState &&
            dynamicState.toJS
            ? dynamicState.toJS()
            : dynamicState;
    }

    const firstTry = state
        && state[key]
        && state[key].get
        && state[key].get(entry)
        ? state[key].get(entry)
        : null;

    if (firstTry) {
        return firstTry.toJS ? firstTry.toJS() : firstTry;
    }

    const keys = Object.keys(state);
    const normalizedKeys = keys
        .map((s) => s.toLowerCase());

    const keyIndex = normalizedKeys.indexOf(key.toLowerCase());

    if (keyIndex !== -1) {
        const secondTry = state
            && state[keys[keyIndex]]
            && state[keys[keyIndex]].get
            && state[keys[keyIndex]].get(entry)
            ? state[keys[keyIndex]].get(entry)
            : null;

        /* eslint-disable no-console */
        console.warn([
            'Case insensitivity for reducer keys will no longer',
            'be supported in the next major release.',
            'Please update your reducer keys',
            'to match the main exports.'
        ]);

        return secondTry && secondTry.toJS
            ? secondTry.toJS()
            : secondTry;
    }

    return null;
}
