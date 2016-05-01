export function stateGetter(state, props, key, entry) {

    if (props
        && props.reducerKeys
        && Object.keys(props.reducerKeys).length > 0
        && props.reducerKeys[key]) {

        const dynamicKey = props.reducerKeys[key];

        return state
            && state[dynamicKey]
            && state[dynamicKey].get
            && state[dynamicKey].get(entry)
            ? state[dynamicKey].get(entry)
            : null;
    }

    const firstTry = state
        && state[key]
        && state[key].get
        && state[key].get(entry)
        ? state[key].get(entry)
        : null;

    if (firstTry) {
        return firstTry;
    }

    const keys = Object.keys(state);
    const normalizedKeys = keys
        .map((s) => s.toLowerCase());

    const keyIndex = normalizedKeys.indexOf(key.toLowerCase());

    if (keyIndex !== -1) {
        return state
            && state[keys[keyIndex]]
            && state[keys[keyIndex]].get
            && state[keys[keyIndex]].get(entry)
            ? state[keys[keyIndex]].get(entry)
            : null;
    }

    return null;
}