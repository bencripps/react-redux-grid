/* eslint-enable describe it sinon */
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
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
        ).toEqual(localGridData.length);
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

    it('Should dismiss editor on click of cancel button', (done) => {
        const editor = component.find('.react-grid-inline-editor');
        const cancelButton = editor
            .find('.react-grid-cancel-button');

        cancelButton.simulate('click');

        expect(
            editor.props().className
        ).toNotContain('react-grid-shown');

        done();

    });

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
        ).toEqual(localGridData.length);
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