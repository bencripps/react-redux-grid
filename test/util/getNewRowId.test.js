import expect from 'expect';
import {
    getNewRowId,
    resetRowId
} from './../../src/util/getNewRowId';

describe('The getNewRowId utility', () => {
    beforeEach(() => resetRowId());
    it('Should return correct new Ids', () => {
        expect(getNewRowId()).toEqual(-1);
        expect(getNewRowId()).toEqual(-2);
        expect(getNewRowId()).toEqual(-3);
        expect(getNewRowId()).toEqual(-4);
    });
});
