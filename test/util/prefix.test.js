import expect from 'expect';
import { prefix } from './../../src/util/prefix';
import { applyGridConfig } from './../../src';

describe('prefix utility function', () => {
    afterEach(() => {
        applyGridConfig({
            CSS_PREFIX: 'react-grid'
        });
    });

    it('Should work with a destructured array of classes', () => {
        const classes = ['react', 'redux', 'grid', 'test'];

        expect(
            prefix(...classes)
        ).toEqual(
            'react-grid-react react-grid-redux react-grid-grid react-grid-test'
        );
    });

    it('Should work with a single class', () => {
        const cls = 'test-class';

        expect(prefix(cls)).toEqual('react-grid-test-class');
    });

    it('Should ignore falsy classes', () => {
        const classes = ['test-class', null, 'truthy', undefined, ''];

        expect(
            prefix(...classes)
        ).toEqual(
            'react-grid-test-class react-grid-truthy',
            'prefix didnt ignore null or undefined'
        );
    });

    it('Should remove delimiter if CSS_PREFIX is falsy', () => {

        applyGridConfig({
            CSS_PREFIX: ''
        });

        const classes = ['test-class', null, 'truthy', undefined, ''];

        expect(
            prefix(...classes)
        ).toEqual(
            'test-class truthy',
            'delitmer wasnt removed when prefix was falsy'
        );
    });

});
