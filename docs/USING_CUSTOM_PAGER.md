# Using a Custom Pager

You can pass a `JSX` element to replace the pager entirely. This can be either a connected or unconnected component. To dispatch paging events, you can use the `Actions.PagerActions.setPageIndexAsync` or `Actions.PagerActions.setPage` that are exposed from the main export.

Example:
```javascript
// my custom actionHandler that my custom component uses

export const setPageIndex = (pageIndex, pageSize, dataSource) => {
    return (dispatch) => {
        // dispatch an event that the grid is listening for, which updates the current records
        dispatch(
            Actions.PagerActions
                .setPageIndexAsync(pageIndex, pageSize, dataSource)
        );

        // dispatch an event that my custom toolbar is listening for
        // to update the current pageIndex
        dispatch({
            type: SET_PAGE_INDEX,
            pageIndex
        });

    };
};
```
