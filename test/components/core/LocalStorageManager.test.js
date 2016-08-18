import expect from 'expect';

import
    localStorageManager
from './../../../src/components/core/LocalStorageManager';

// set spy for browswer local storage
if (!window.localStorage) {
    window.localStorage = {};
    window.localStorage.setItem = sinon.spy();

    describe('The gtid local storage manager', () => {

        it('Should return the appropriate storage key', () => {

            expect(
                localStorageManager.getKey({
                    stateKey: 'some-grid',
                    property: 'columns'
                })
            ).toEqual('react-grid-some-grid-columns');

        });

        it('Should throw an error if stateKey is not passed', () => {
            expect(() => {
                localStorageManager.getKey({
                    stateKey: '',
                    property: 'columns'
                });
            }).toThrow('stateKey and property are required params');
        });

        it('Should throw an error if property is not passed', () => {
            expect(() => {
                localStorageManager.getKey({
                    stateKey: 'some-grid',
                    property: null
                });
            }).toThrow('stateKey and property are required params');
        });

        it('Should set an item in local storage', () => {

            localStorageManager.setStateItem({
                stateKey: 'some-grid',
                property: 'columns',
                value: [
                    {
                        dataIndex: 1
                    },
                    {
                        dataIndex: 2
                    }
                ]
            });

            expect(
                window.localStorage.setItem.called
            ).toEqual(true);

        });

        it('Should return an item from local storage', () => {

            window.localStorage.getItem = (key) => {
                const storage = {
                    'react-grid-some-grid-height': '40'
                };

                return storage[key];
            };

            expect(
                localStorageManager.getStateItem({
                    stateKey: 'some-grid',
                    property: 'height'
                })
            ).toEqual('40');

        });

        it('Should should debounce the setItem func', (done) => {

            window.localStorage.setItem = sinon.spy();

            const debounced = localStorageManager.debouncedSetStateItem();

            const func = () => {
                debounced({
                    stateKey: 'debounced-grid',
                    property: 'columns',
                    value: []
                });
            };

            for (let i = 0; i < 10; i++) {
                func();
            }

            setTimeout(() => {
                expect(
                    window.localStorage.setItem.callCount
                ).toEqual(1);
                done();
            }, 600);

        });

        it('Should save an item if it doesnt exist in storage', () => {

            let storage;

            window.localStorage.getItem = (key) => {
                storage = {
                    'react-grid-some-grid-height': '40'
                };

                return storage[key];
            };

            window.localStorage.setItem = (key, value) => {
                storage[key] = value;
            };

            expect(
                localStorageManager.getStateItem({
                    stateKey: 'some-grid',
                    property: 'somenumber',
                    value: 1
                })
            ).toEqual(1);

            expect(storage['react-grid-some-grid-somenumber']).toEqual('1');

        });

        it(['Shouldnt save an item if it doesnt exist in storage',
            'and flag is passed'].join(' '), () => {

            let storage;

            window.localStorage.getItem = (key) => {
                storage = {
                    'react-grid-some-grid-height': '40'
                };

                return storage[key];
            };

            window.localStorage.setItem = (key, value) => {
                storage[key] = value;
            };

            expect(
                localStorageManager.getStateItem({
                    stateKey: 'some-grid',
                    property: 'somenumber',
                    value: 1,
                    shouldSave: false
                })
            ).toEqual(1);

            expect(
                storage['react-grid-some-grid-somenumber']
            ).toEqual(undefined);

        });

    });

}
