export const bufferTop = (
    rowHeight, viewableIndex, viewableCount, bufferMultiplier, totalCount
) => {
    const spacerCount = Math.max(
        viewableIndex - viewableCount * bufferMultiplier,
        0
    );

    // spacerCount can never be greater than (
    // totalCount - viewableCount * rowHeight)
    return Math.max(
        spacerCount * rowHeight,
        totalCount - viewableCount * rowHeight
    );
};

export const bufferBottom = (
    rowHeight, viewableIndex, viewableCount, bufferMultiplier, totalCount
) => {
    const spacerCount = Math.max(
        totalCount - viewableIndex - viewableCount * (bufferMultiplier + 1),
        0
    );

    return spacerCount * rowHeight;
};
