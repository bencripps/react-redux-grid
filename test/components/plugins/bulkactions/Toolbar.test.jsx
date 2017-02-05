import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import
    store
from './../../../../src/store/store';

import
    BulkActionToolbar
from './../../../../src/components/plugins/bulkactions/Toolbar';

describe('The Bulk ActionToolbar Plugin', () => {

    it('Shouldnt render when disabled', () => {

        const props = {
            plugins: {},
            store
        };

        const cmp = mount(<BulkActionToolbar { ...props } />);

        expect(cmp.html())
            .toEqual('<div></div>');
    });

    it('Shouldnt render when enabled with 1 button', () => {

        const props = {
            plugins: {
                BULK_ACTIONS: {
                    enabled: true,
                    actions: [
                        {
                            text: 'Action 1',
                            key: 'action1'
                        }
                    ]
                }
            },
            store
        };

        const cmp = mount(<BulkActionToolbar { ...props } />);

        expect(cmp.find('.react-grid-bulkaction-container').length)
            .toEqual(1);

        expect(cmp.find('button').length)
        .toEqual(1);

    });

});
