import expect from 'expect';
import { isPluginEnabled } from './../../src/util/isPluginEnabled';

describe('isPluginEnabled utility function', () => {

    it('Should return enabled', () => {
        const plugins = {
            BULK_ACTIONS: {
                enabled: true
            }
        };

        expect(isPluginEnabled(
            plugins, 'BULK_ACTIONS'
        )).toEqual(
            true
        );
    });

    it('Should return not enabled', () => {
        const plugins = {
            BULK_ACTIONS: {
                enabled: false
            }
        };

        expect(isPluginEnabled(
            plugins, 'BULK_ACTIONS'
        )).toEqual(
            false
        );
    });

    it('Should return not enabled', () => {
        const plugins = {};

        expect(isPluginEnabled(
            plugins, 'BULK_ACTIONS'
        )).toEqual(
            false
        );
    });

    it('Should return not enabled', () => {
        expect(isPluginEnabled(
            null, 'BULK_ACTIONS'
        )).toEqual(
            false
        );
    });

    it('Should return not enabled', () => {
        expect(isPluginEnabled(
            false, 'BULK_ACTIONS'
        )).toEqual(
            false
        );
    });

    it('Should return not enabled', () => {
        expect(isPluginEnabled(
            false, 'BULK_ACTIS'
        )).toEqual(
            false
        );
    });

});
