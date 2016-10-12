/* eslint-enable describe it sinon */
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import { ConnectedGrid } from './../../../src/components/Grid.jsx';
import { Store as GridStore } from './../../../src/store/store';

import {
    gridColumns,
    localGridData,
    stateKey
} from '../../testUtils/data';

const props = {
    data: localGridData,
    columns: gridColumns,
    stateKey,
    plugins: {}
};

describe('Integration Test for Inline Editor', () => {

    const editorProps = {
        ...props,
        store: GridStore,
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

    const component = mount(<ConnectedGrid { ...editorProps } />);

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

        const cmp = mount(<ConnectedGrid { ...editorStateProps } />);

        setTimeout(() => {

            expect(editorStateProps.store.getState().editor.get('grid-type-inline'))
                .toEqual(undefined);

            done();
        }, 100);


    });

    it('Should should set editor state on init if editor type is grid', (done) => {

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

        const cmp = mount(<ConnectedGrid { ...editorTypeGrid } />);

        setTimeout(() => {

            expect(editorTypeGrid.store.getState().editor.get('grid-type-grid'))
                .toEqual(fromJS({
                    lastUpdate: 55,
                    'row-1': {
                        key: 'row-1',
                        values: {
                            name: 'Charles Barkley',
                            position: 'Power Forward',
                            _key: 'row-1'
                        },
                        rowIndex: 0,
                        top: null,
                        valid: null,
                        isCreate: false,
                        overrides: {}
                    },
                    'row-0': {
                        key: 'row-0',
                        values: {
                            name: 'Michael Jordan',
                            position: 'Shooting Guard',
                            _key: 'row-0'
                        },
                        rowIndex: 1,
                        top: null,
                        valid: null,
                        isCreate: false,
                        overrides: {}
                    }
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
        store: GridStore,
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

    const component = mount(<ConnectedGrid { ...editorProps } />);

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
