export const fire = (name, events, scope, ...args) => {
    args = args.map(a => a && a.toJS ? a.toJS() : a);
    return events && name && typeof events[name] === 'function'
        ? events[name].apply(scope, args)
        : undefined;
};

