export const fire = (name, events, scope, ...args) => (
    events && name && typeof events[name] === 'function'
        ? events[name].apply(scope, args)
        : undefined
);
