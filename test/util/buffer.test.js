import expect from 'expect';
import {
    scrollIndex,
    bufferBottom,
    bufferTop
} from './../../src/util/buffer';

xdescribe('buffer utils - scrollIndex utility function', () => {

    it('Should return scrollIndex when scroll top is 0', () => {

        expect(scrollIndex(40, 4000)).toEqual(
            1
        );

    });

});

xdescribe('buffer utils - bufferBottom utility function', () => {

    it('Should return buffer bottom when scroll top is 0', () => {

        expect(bufferBottom(
            1000, 200, 0, 40
        )).toEqual(
            32000
        );

    });

    it('Should return buffer bottom when scroll top is 4000', () => {

        expect(bufferBottom(
            1000, 200, (40 * 100), 40
        )).toEqual(
            30000
        );

    });

});

xdescribe('buffer utils - bufferTop utility function', () => {

    it('Should return buffer top when scroll top is 0', () => {

        expect(bufferTop(
            1000, 200, 0, 40
        )).toEqual(
            0
        );

    });

    it('Should return buffer bottom when scroll top is 4000', () => {

        expect(bufferTop(
            1000, 200, (40 * 100), 40
        )).toEqual(
            600
        );

    });

    // it('Should return buffer bottom when scroll top is 204', () => {

    //     expect(bufferTop(
    //         1000, 200, 3800, 40
    //     )).toEqual(
    //         4000
    //     );

    // });

});

