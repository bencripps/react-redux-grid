/* eslint-enable describe it sinon */

import expect from 'expect';
import {
    throttle, debounce
} from './../../src/util/throttle';

describe('throttle utility function', () => {

    it('Should call a function', () => {
        const spy = sinon.spy();
        const func = throttle(spy, null);

        func();

        expect(spy.called)
            .toEqual(true);
    });

    it('Should call a function only once', () => {
        const spy = sinon.spy();
        const func = throttle(spy, null);

        for (let i = 0; i < 10; i++) {
            func();
        }

        expect(spy.callCount)
            .toEqual(1);
    });
});

describe('debounce utility function', () => {

    it('Should call a function after timeout', (done) => {
        const spy = sinon.spy();
        const func = debounce(spy, 100);

        function run() {
            for (let i = 0; i < 10; i++) {
                func();
            }
        }

        run();

        expect(spy.called)
            .toEqual(false);

        setTimeout(() => {
            expect(spy.callCount)
                .toEqual(1);


            run();
        }, 111);

        setTimeout(() => {
            expect(spy.callCount)
                .toEqual(2);

            done();
        }, 250);
    });

});
