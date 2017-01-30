/* eslint-enable describe it sinon */
/* eslint-disable no-unused-vars */
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { fromJS, Map } from 'immutable';
import Grid from './../../../src/components/Grid.jsx';
import { Editor } from './../../../src/records';
import store from './../../../src/store/store';

import {
    gridColumns,
    localGridData,
    stateKey
} from '../../testUtils/data';

import { mountWithContext } from '../../testUtils';

import {
    resetLastUpdate
} from './../../../src/util/lastUpdate';

const props = {
    data: localGridData,
    columns: gridColumns,
    stateKey,
    plugins: {}
};

describe('Integration Test for Inline Editor', () => {
    beforeEach(() => resetLastUpdate());
    const editorProps = {
        ...props,
        plugins: {
            EDITOR: {
                enabled: true,
                type: 'inline'
            },
            SELECTION_MODEL: {
                editEvent: 'singleclick'
            }
        }
    };

    const component = mountWithContext(<Grid { ...editorProps } />);

    it('Should render with the correct number of rows', () => {
        expect(
            component.find('.react-grid-row').length
        ).toEqual(2);
    });

    it('Should dispatch the inline editor on click of cell', (done) => {

        const cell = component.find('.react-grid-row')
            .find('.react-grid-cell').first();

        cell.simulate('click');

        setTimeout(() => {
            const editor = component.find('.react-grid-inline-editor');

            expect(
                editor.props().className
            ).toContain('react-grid-shown');
            done();
        }, 100);

    });

    it('Should should not set editor state on init', (done) => {

        const editorStateProps = {
            ...editorProps,
            stateKey: 'grid-type-inline'
        };

        const cmp = mountWithContext(<Grid { ...editorStateProps } />);

        setTimeout(() => {
            expect(store
                    .getState()
                    .editor
                    .get('grid-type-inline')
                ).toEqual(undefined);

            done();
        }, 100);

    });

    it(['Should should set editor state on',
        'init if editor type is grid'].join(' '), (done) => {

        const editorTypeGrid = {
            ...editorProps,
            plugins: {
                EDITOR: {
                    enabled: true,
                    type: 'grid'
                },
                SELECTION_MODEL: {
                    editEvent: 'singleclick'
                }
            },
            stateKey: 'grid-type-grid'
        };

        const cmp = mountWithContext(<Grid { ...editorTypeGrid } />);

        setTimeout(() => {
            expect(cmp.context('store').getState().editor.get('grid-type-grid'))
                .toEqual(fromJS({
                    lastUpdate: 3,
                    'row-0': new Editor({
                        key: 'row-0',
                        values: Map({
                            name: 'Michael Jordan',
                            position: 'Shooting Guard',
                            _key: 'row-0'
                        }),
                        rowIndex: 0,
                        top: null,
                        valid: null,
                        isCreate: false,
                        overrides: Map()
                    }),
                    'row-1': new Editor({
                        key: 'row-1',
                        values: new Map({
                            name: 'Charles Barkley',
                            position: 'Power Forward',
                            _key: 'row-1'
                        }),
                        rowIndex: 1,
                        top: null,
                        valid: null,
                        isCreate: false,
                        overrides: Map()
                    })
                }));

            done();
        }, 100);

    });

    // it('Should dismiss editor on click of cancel button', (done) => {
    //     const editor = component.find('.react-grid-inline-editor');
    //     const cancelButton = editor
    //         .find('.react-grid-cancel-button');

    //     cancelButton.simulate('click');

    //     setTimeout(() => {
    //         debugger;
    //         expect(
    //             editor.props().className
    //         ).toNotContain('react-grid-shown');

    //         done();

    //     }, 100);

    // });

});

describe('Integration Test for a grid without Inline Editor', () => {

    const editorProps = {
        ...props,
        plugins: {
            EDITOR: {
                enabled: false,
                type: 'inline'
            },
            SELECTION_MODEL: {
                editEvent: 'singleclick'
            }
        }
    };

    const component = mountWithContext(<Grid { ...editorProps } />);

    it('Should render with the correct number of rows', () => {
        expect(
            component.find('.react-grid-row').length
        ).toEqual(2);
    });

    it('Should dispatch the inline editor on click of cell', (done) => {

        const cell = component.find('.react-grid-row')
            .find('.react-grid-cell').first();

        cell.simulate('click');

        setTimeout(() => {
            const editor = component.find('.react-grid-inline-editor');
            expect(
                editor.length
            ).toEqual(0);
            done();
        }, 100);

    });

});
