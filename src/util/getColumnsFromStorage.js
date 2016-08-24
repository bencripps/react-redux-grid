import { nameFromDataIndex } from './getData';

// properties to map from state
// order is an implicit prop
const mappableProps = ['hidden', 'width'];

export const getColumnsFromStorage = (fromStorage, columns) => {

    const ret = [];
    const foundValues = [];

    fromStorage.forEach(col => {

        const dataIndex = nameFromDataIndex(col);
        const colFromProp = columns
            .find(c => nameFromDataIndex(c) === dataIndex);

        if (!colFromProp) {
            return;
        }

        foundValues.push(dataIndex);

        mappableProps.forEach(prop => {

            if (col[prop] !== undefined) {
                colFromProp[prop] = col[prop];
            }
        });

        ret.push(colFromProp);
    });

    if (foundValues.length !== columns.length) {
        const unused = columns
            .filter(c => foundValues.indexOf(nameFromDataIndex(c)) === -1);
        ret.unshift.apply(ret, unused);
    }

    return ret;
};
