export function stateGetter(state, prop, entry) {
    return state
        && state[prop]
        && state[prop].get
        && state[prop].get(entry)
        ? state[prop].get(entry)
        : null;
}