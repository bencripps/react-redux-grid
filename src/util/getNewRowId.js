let val = 0;

export const getNewRowId = () => --val;

export const resetRowId = () => {
    val = 0;
};
