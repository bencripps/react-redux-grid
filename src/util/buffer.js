export const bufferTop = (
    rowHeight, viewableIndex, viewableCount, bufferMultiplier
) => {
    const spacerCount = Math.max(
        viewableIndex - viewableCount * bufferMultiplier,
        0
    );

    return spacerCount * rowHeight;
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
