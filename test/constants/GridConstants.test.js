import expect from 'expect';
import {
    applyGridConfig,
    CLASS_NAMES,
    CSS_PREFIX
} from './../../src/constants/GridConstants';

describe('The applyGridConfig export', () => {

    it('Should have the constants set to the defaults', () => {
        expect(CSS_PREFIX)
            .toEqual(
                'react-grid',
                'The default CSS Prefix is wrong'
            );

        expect(CLASS_NAMES.TABLE).toEqual(
            'table',
            'the default table class is wrong'
        );
    });

    it('Should overwrite the constants', () => {
        afterEach(() => {
            applyGridConfig({
                CSS_PREFIX: 'react-grid',
                CLASS_NAMES: {
                    TABLE: 'table'
                }
            });
        });

        applyGridConfig({
            CSS_PREFIX: 'some new prefix',
            CLASS_NAMES: {
                TABLE: 'banana-table'
            }
        });

        expect(CSS_PREFIX)
            .toEqual(
                'some new prefix',
                'The applied CSS Prefix is wrong'
            );

        expect(CLASS_NAMES.TABLE).toEqual(
            'banana-table',
            'the override table class is wrong'
        );
    });

});
