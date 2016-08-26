export const OFFSET = 7;
export const TOP_OFFSET = 5;

export const getEditorTop = (rowElement, moveToTop, editorDom) => {

    if (!rowElement) {
        return null;
    }

    if (moveToTop) {
        return rowElement.offsetTop - (editorDom.clientHeight - TOP_OFFSET);
    }

    return rowElement.offsetTop + rowElement.clientHeight + OFFSET;
};
