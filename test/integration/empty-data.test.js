/* eslint-enable describe it sinon */
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { ConnectedGrid } from './../../src/components/Grid.jsx';
import { Store as GridStore } from './../../src/store/store';

const props = {
    data: [],
    columns: [
        {
            name: 'Player',
            dataIndex: 'name',
            sortable: true
        },
        {
            name: 'Position',
            dataIndex: 'position'
        }
    ],
    stateKey: 'empty-grid',
    emptyDataMessage: 'Aint no data here',
    plugins: {},
    store: GridStore
};

describe('Empty data row', () => {

    const wrapper = mount(<ConnectedGrid { ...props } />);

    it('Should render a message based on props', (done) => {

        setTimeout(() => {

            const emptyRow = wrapper.find('.react-grid-empty-row');

            expect(
                emptyRow.html()
            ).toContain('Aint no data here');

            done();

        }, 200);

    });

});
