import expect from 'expect';
import { prefix } from './../../src/util/prefix';

describe('prefix utility function', () => {

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

});