const OFFSET = 7;

export const getEditorTop = (rowElement) => {

    if (!rowElement) {
        return null;
    }

    return rowElement.offsetTop + rowElement.clientHeight + OFFSET;
};
