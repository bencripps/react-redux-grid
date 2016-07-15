import expect from 'expect';
import { emptyFn } from './../../src/util/emptyFn';

describe('emptyFn utility function', () => {

    it('Should be a function', () => {
        expect(emptyFn).toBeA('function');
    });

    it('Should return undefined', () => {
        expect(emptyFn()).toEqual(undefined);
    });

});

