import expect from 'expect';
import StorageShim from 'node-storage-shim';
import
    localStorageManager
from './../../../src/components/core/LocalStorageManager';

// set spy for browswer local storage

if (!window.localStorage) {
    window.localStorage = new StorageShim();
}

describe('The grid local storage manager', () => {

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

    it('Should set and return an item from local storage', () => {

        localStorageManager.setStateItem({
            stateKey: 'some-grid-1',
            property: 'height',
            value: 40
        });

        expect(
            localStorageManager.getStateItem({
                stateKey: 'some-grid-1',
                property: 'height'
            })
        ).toEqual('40');

    });

    it('Should should debounce the setItem func', (done) => {
        localStorageManager.setStateItem = sinon.spy();

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
                localStorageManager.setStateItem.callCount
            ).toEqual(1);
            done();
        }, 600);

    });

    it('Should save an item if it doesnt exist in storage', () => {

        expect(
            localStorageManager.getStateItem({
                stateKey: 'no-value',
                property: 'height',
                value: 100
            })
        ).toEqual(100);

        setTimeout(() => {
            expect(
                localStorageManager.getStateItem({
                    stateKey: 'no-value',
                    property: 'height'
                })
            ).toEqual(100);
        }, 100);

    });

    it('Shouldnt save an item if explicity declared', () => {

        expect(
            localStorageManager.getStateItem({
                stateKey: 'dont-save',
                property: 'height',
                value: 100,
                shouldSave: false
            })
        ).toEqual(100);

        setTimeout(() => {
            expect(
                localStorageManager.getStateItem({
                    stateKey: 'dont-save',
                    property: 'height'
                })
            ).toEqual(undefined);
        }, 100);

    });

});
