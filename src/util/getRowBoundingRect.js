export const getRowBoundingRect = (row, container = null) => {

    if (!container) {
        container = row && row.offsetParent
            ? row.offsetParent.offsetParent
            : null;
    }

    if (!container) {
        return {};
    }

    const rowBCR = row.getBoundingClientRect();
    const containerBCR = container.getBoundingClientRect();

    const spaceBottom = containerBCR.bottom - rowBCR.bottom;
    const spaceTop = rowBCR.top - containerBCR.top;

    const maxHeight = Math.max(spaceBottom, spaceTop);
    const position = spaceTop > spaceBottom
        ? 'top'
        : 'bottom';

    return {
        maxHeight,
        position,
        spaceTop,
        spaceBottom
    };
};
