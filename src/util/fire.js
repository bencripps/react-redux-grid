export const fire = (name, events, scope, ...args) => {
    args = args.map(a => a && a.toJS ? a.toJS() : a);
    return events && name && typeof events[name] === 'function'
        ? events[name].apply(scope, args)
        : undefined;
};

export const fireEvent = (
    name,
    events,
    context = {},
    browserEvent
) => {

    if (!events || typeof events[name] !== 'function') {
        return;
    }

    const dynamicArgs = Object.keys(context)
        .reduce((prev, k) => {
            prev[k] = normalize(context[k]);
            return prev;
        }, {});

    // apply dynamic arguments
    // but these vals will always be represented
    return events[name]({
        ...dynamicArgs,
        editor: normalize(context.editor),
        events,
        isSelected: normalize(context.isSelected),
        row: normalize(context.row),
        rowId: normalize(context.rowId),
        rowIndex: normalize(context.rowIndex)
    }, browserEvent);

};

export const normalize = v => v && v.toJS
    ? v.toJS()
    : v;
