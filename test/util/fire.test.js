/* eslint-enable describe it sinon */
import expect from 'expect';

import { fire } from './../../src/util/fire';

describe('the fire utility', () => {
    const listener = sinon.spy();
    const events = {
        HANDLE_CLICK: listener,
        HANDLE_BEFORE_CLICK: val => val === 'a',
        NOT_A_FUNCTION: {a: 1}
    };

    it('should call the event listener with the correct arguments', () => {
        fire(
            'HANDLE_CLICK', events,
            null, 'a', {a: 1}
        );

        expect(
            listener.calledOnce
        ).toBe(true);

        expect(
            listener.args[0]
        ).toEqual(
            ['a', {a: 1}]
        );
    });

    it('should return value of listener', () => {
        expect(
            fire(
                'HANDLE_BEFORE_CLICK', events,
                null, 'a'
            )
        ).toBe(true);

        expect(
            fire(
                'HANDLE_BEFORE_CLICK', events,
                null, 'b'
            )
        ).toBe(false);
    });

    it('should return `undefined` when not a valid event', () => {
        expect(
            fire('NOT_A_FUNCTION', events)
        ).toBe(undefined);

        expect(
            fire('', events)
        ).toBe(undefined);

        expect(
            fire('HANDLE_BEFORE_CLICK', undefined)
        ).toBe(undefined);
    });
});
