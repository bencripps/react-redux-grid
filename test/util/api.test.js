import expect from 'expect';

import {
    setRequestHeaders,
    buildQueryString,
    Api
} from './../../src/util/api';

describe('The Api Utility', () => {

    it('Should return a promise', () => {
        const promise = Api({
            route: 'some/url',
            method: 'POST',
            data: {
                someData: 'hello'
            }
        });

        expect(promise.then).toBeTruthy();
    });

    it('Should return a promise with a GET', () => {
        const promise = Api({
            route: 'some/url',
            data: {
                someData: 'hello'
            }
        });

        expect(promise.then).toBeTruthy();
    });

});

describe('The Api setRequestHeaders function', () => {

    it('Should set request headers on a request object', () => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'some/route', true);

        const config = {
            headers: {
                someProp: true
            }
        };

        expect(
            () => setRequestHeaders(xhr, config)
        ).toNotThrow();

    });

    it('Should set content type', () => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'some/route', true);

        const config = {
            headers: {
                contentType: 'applicaton/json'
            }
        };

        expect(
            () => setRequestHeaders(xhr, config)
        ).toNotThrow();

    });

    it('Should set only content type', () => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'some/route', true);

        const config = {};

        expect(
            () => setRequestHeaders(xhr, config)
        ).toNotThrow();

    });

});

describe('The Api buildQueryString func', () => {

    it('Should build a URL with no query string', () => {
        const config = {
            route: 'some/url'
        };

        expect(
            buildQueryString(config).route
        ).toContain('some/url?_dc=');

    });

    it('Should build a URL with a query string', () => {
        const config = {
            route: 'some/url',
            queryStringParams: {
                newThing: true,
                item: 'hello'
            }
        };

        expect(
            buildQueryString(config).route
        ).toContain('&newThing=true&item=hello&');

    });

});

