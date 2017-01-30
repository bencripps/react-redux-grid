import expect from 'expect';
import { keyGenerator, keyFromObject } from './../../src/util/keyGenerator';

describe('keyGenerator utility function', () => {
    const keywords1 = ['keyword', 'keywordA', 'keywordB'];
    const keywords2 = ['react', 'redux', 'grid', 'test'];

    expect(keyGenerator(keywords1))
        .toEqual('a2V5d29yZCxrZXl3b3JkQSxrZXl3b3JkQg==');
    expect(keyGenerator(keywords2))
        .toEqual('cmVhY3QscmVkdXgsZ3JpZCx0ZXN0');
});

describe('keyFromObject utility function', () => {
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
