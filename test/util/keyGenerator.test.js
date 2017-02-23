import expect from 'expect';
import { keyGenerator, keyFromObject } from './../../src/util/keyGenerator';

describe('keyGenerator utility function', () => {
    it('Should work with regular utf-8 strings', () => {
        const keywords1 = ['keyword', 'keywordA', 'keywordB'];
        const keywords2 = ['react', 'redux', 'grid', 'test'];

        expect(keyGenerator(keywords1))
            .toEqual('a2V5d29yZCxrZXl3b3JkQSxrZXl3b3JkQg==');
        expect(keyGenerator(keywords2))
            .toEqual('cmVhY3QscmVkdXgsZ3JpZCx0ZXN0');
    });

    it('Should work with irregular strings', () => {
        expect(keyGenerator('😫', 'haha'))
            .toEqual('8J+Yq2hhaGE=');
    });
});

describe('keyFromObject utility function', () => {
    it('Should work wirh utf-8 string', () => {
        const keywords1 = {
            someKey: 'someKey',
            anotherKey: 'anotherKey'
        };

        const keywords2 = {
            react: 'react',
            redux: 'redux',
            grid: 'grid',
            test: 'test'
        };

        expect(keyFromObject(keywords1))
            .toEqual('c29tZUtleWFub3RoZXJLZXk=');
        expect(keyFromObject(keywords2))
            .toEqual('cmVhY3RyZWR1eGdyaWR0ZXN0');
    });

    it('Should work with irregular strings', () => {
        const irregular = {
            someKey: '😫'
        };

        expect(keyFromObject(irregular))
            .toEqual('8J+Yqw==');
    });

    it('Should work with irregular strings, with additional', () => {
        const irregular = {
            someKey: '😫'
        };

        expect(keyFromObject(irregular, ['banana']))
            .toEqual('YmFuYW5h8J+Yqw==');
    });

});
