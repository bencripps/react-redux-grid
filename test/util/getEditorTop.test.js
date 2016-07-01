import expect from 'expect';
import {
    getEditorTop,
    OFFSET
} from './../../src/util/getEditorTop';

describe('getEditorTop utility function', () => {

    it('Should return null if no node is passed', () => {

        const rowElement = null;

        expect(getEditorTop(rowElement))
            .toEqual(null);

    });

    it('Should return top if a node is passed', () => {

        const rowElement = {
            offsetTop: 30,
            clientHeight: 100
        };

        expect(getEditorTop(rowElement))
            .toEqual(rowElement.offsetTop
                + rowElement.clientHeight
                + OFFSET
            );

    });

});
