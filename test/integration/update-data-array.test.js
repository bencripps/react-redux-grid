/* eslint-enable describe it sinon */
import React from 'react';
import expect from 'expect';
import Grid from './../../src/components/Grid.jsx';
import { mountWithContext } from './../testUtils';

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

describe('Integration Test for updating data array prop', () => {

    const component = mountWithContext(<Grid { ...props } />);

    it('Should render the initial data', (done) => {

        expect(
            component.find('tr').length
        ).toEqual(6);

        done();

    });

    it('Should update the number of rows based on new dataArray', (done) => {

        component.setProps({
            data: [
                {name: 'Dude', position: 'some'},
                {name: 'Dude', position: 'some'}
            ]
        });

        component.update();

        setTimeout(() => {
            expect(
                component.find('tr').length
            ).toEqual(4);
            done();
        }, 100);

    });

});
