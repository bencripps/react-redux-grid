export const getCurrentRecords = (dataSource, pageIndex, pageSize) => {
    if (!dataSource) {
        return null;
    }

    const selectedRows = dataSource.data.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);

    return selectedRows;
};