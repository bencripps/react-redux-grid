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

    it('Should call a function with config options where leading is set to false', () => {
        const spy = sinon.spy();
        const options = {leading: false};
        const limit = 100;
        const func = throttle(spy, null, limit, options);

        func();

        expect(spy.called)
            .toEqual(false);
    });

    it('Should call a function with config options where trailing is set to true', () => {
        const spy = sinon.spy();
        const options = {trailing: true};
        const limit = 100;
        const func = throttle(spy, null, limit, options);

        func();

        expect(spy.called)
            .toEqual(true);
    });

    it('Should call a function with config options where trailing is set to true and leading is set to false', () => {
        const spy = sinon.spy();
        const options = {trailing: true, leading: false};
        const limit = 100;
        const func = throttle(spy, null, limit, options);

        func();

        expect(spy.called)
            .toEqual(false);
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

    it('Should call a function after timeout with immediate set to true', (done) => {
        const spy = sinon.spy();
        const immediate = true;
        const func = debounce(spy, 100, immediate);

        function run() {
            for (let i = 0; i < 10; i++) {
                func();
            }
        }

        run();

        expect(spy.called)
            .toEqual(true);

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
