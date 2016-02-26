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

    return state
        && state[key]
        && state[key].get
        && state[key].get(entry)
        ? state[key].get(entry)
        : null;
}