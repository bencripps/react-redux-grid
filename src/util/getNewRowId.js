let val = 0;

export const getNewRowId = () => {
    val--;
    return val;
};

export const resetRowId = () => {
    val = 0;
};
