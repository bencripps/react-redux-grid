import expect from 'expect';
import {
    bufferBottom,
    bufferTop
} from './../../src/util/buffer';

describe('The bufferTop utility for infinite scroll', () => {

    it('Should work when viewable index is greater than 0', () => {
        expect(bufferTop(
            40, 100, 20, 3
        )).toEqual(
            1600
        );
    });

    it('Should work when viewable index is 0', () => {
        expect(bufferTop(
            40, 0, 20, 3
        )).toEqual(0);
    });

});

describe('The bufferBottom utility for infinite scroll', () => {

    it('Should work when viewable index is greater than 0', () => {
        expect(bufferBottom(
            40, 100, 20, 3, 500
        )).toEqual(
            12800
        );
    });

    it('Should work when viewable index is 0', () => {
        expect(bufferBottom(
            40, 0, 20, 3, 500
        )).toEqual(16800);
    });

});
