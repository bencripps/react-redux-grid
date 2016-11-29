/* eslint-enable describe it sinon */
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import Grid from './../../src/components/Grid.jsx';
import { Store as GridStore } from './../../src/store/store';

const sortSpy = sinon.spy();

const props = {
    data: [
        {
            name: 'Michael Jordan',
            position: 'Shooting Guard'
        },
        {
            name: 'Charles Barkley',
            position: 'Power Forward'
        },
        {
            name: 'Scottie Pippen',
            position: 'Power Forward'
        },
        {
            name: 'Stevie Wonder',
            position: 'Singer'
        }
    ],
    columns: [
        {
            name: 'Player',
            dataIndex: 'name',
            sortable: true,
            sortFn: sortSpy
        },
        {
            name: 'Position',
            dataIndex: 'position'
        }
    ],
    stateKey: 'column-grid',
    plugins: {}
};

describe('Integration Test for Column custom sort fn', () => {

    const editorProps = {
        ...props,
        store: GridStore
    };

    const component = mount(<Grid { ...editorProps } />);

    it('Should dismiss editor on click of cancel button', (done) => {

        const column = component
            .find('.react-grid-header-fixed th')
            .first();

        column.simulate('click');

        expect(
            sortSpy.called
        ).toEqual(true);

        done();

    });

});
