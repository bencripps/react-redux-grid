import expect from 'expect';
import { elementContains } from './../../src/util/elementContains';

describe('elementContains utility function', () => {

    it('Should throw an error for invalid args', () => {
        expect(() => {
            elementContains();
        }).toThrow('Function requires a dom node and a classname');
    });

    it('Should return true, if element is found', () => {
        const parent = document.createElement('div');
        const node = document.createElement('div');
        parent.classList.add('test-class');

        parent.appendChild(node);
        document.body.appendChild(parent);

        expect(
            elementContains(parent, 'test-class')
        ).toEqual(true);
    });

    it('Should return undefined, if not element is found', () => {
        const parent = document.createElement('div');
        const node = document.createElement('div');
        parent.classList.add('nope');

        parent.appendChild(node);
        document.body.appendChild(parent);

        expect(
            elementContains(parent, 'test-class')
        ).toEqual(undefined);
    });

});

