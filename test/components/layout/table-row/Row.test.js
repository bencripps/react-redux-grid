import React from 'react';
import { fromJS } from 'immutable';
import expect from 'expect';
import { mount } from 'enzyme';

import { keyGenerator } from '../../../../src/util/keyGenerator';
import { getSelModel, getColumnManager } from './../../../testUtils/';
import store from './../../../../src/store/store';
import {
    Row
} from './../../../../src/components/layout/table-row/Row.jsx';

describe('The Grid Row Component', () => {

    const props = {
        columns: [
            {
                name: 'Player',
                dataIndex: 'name'
            },
            {
                name: 'Position',
                dataIndex: 'position'
            }
        ],
        columnManager: getColumnManager(),
        editor: {
            config: {
                type: 'inline',
                enabled: true
            },
            editModes: {
                inline: 'inline'
            }
        },
        editorState: {},
        events: {},
        menuState: {},
        reducerKeys: {},
        selectedRows: {},
        row: {
            name: 'Michael Jordan',
            position: 'Shooting Guard'
        },
        plugins: {},
        index: 0,
        stateKey: 'test-grid',
        selectionModel: getSelModel(),
        store
    };

    it('Should render a row with correct cells', () => {

        const component = mount(<Row { ...props } />);

        expect(
            component.find('span').first().html()
        ).toEqual('<span>Michael Jordan</span>');

        expect(
            component.find('span').at(1).html()
        ).toEqual('<span>Shooting Guard</span>');

    });

    it('Should only render two cells when two vals are passed', () => {

        const component = mount(<Row { ...props } />);

        expect(
            component.find('span').length
        ).toEqual(2);

    });

    it('Should only render two cells when more vals are passed', () => {

        const moreValProps = {
            ...props,
            row: {
                name: 'Michael Jordan',
                position: 'Shooting Gaurd',
                sponsor: 'Nike'
            }
        };

        const component = mount(<Row { ...moreValProps } />);

        expect(
            component.find('span').length
        ).toEqual(2);

    });

    it('Should render two cells when too few vals are passed', () => {

        const lessValProps = {
            ...props,
            row: {
                name: 'Michael Jordan'
            }
        };

        const component = mount(<Row { ...lessValProps } />);

        expect(
            component.find('span').length
        ).toEqual(2);

    });

    it('Should render a hidden cell if a col is hidden', () => {

        const hiddenProps = {
            ...props,
            columns: [
                {
                    name: 'Player',
                    dataIndex: 'name',
                    hidden: true
                },
                {
                    name: 'Position',
                    dataIndex: 'position'
                }
            ]
        };

        const component = mount(<Row { ...hiddenProps } />);

        expect(
            component.find('span').length
        ).toEqual(2);

        expect(
            component.find('.react-grid-cell').first().html()
        ).toContain('display: none;');

        expect(
            component.find('.react-grid-cell').at(1).html()
        ).toNotContain('display: none;');

    });

    it('Should render a selected row', () => {

        const selectedProps = {
            ...props,
            selectedRows: {
                [keyGenerator('row', 0)]: true
            }
        };

        const component = mount(<Row { ...selectedProps } />);

        expect(
            component.find('tr').props().className
        ).toContain('react-grid-active');

    });

    it('Should render a selected row with variable selected-class', () => {

        const modifiedSelModel = getSelModel();

        modifiedSelModel.defaults.activeCls = 'custom-active-class';

        const dynamicSelectedProps = {
            ...props,
            selectionModel: modifiedSelModel,
            selectedRows: {
                [keyGenerator('row', 0)]: true
            }
        };

        const component = mount(<Row { ...dynamicSelectedProps } />);

        expect(
            component.find('tr').props().className
        ).toContain('react-grid-custom-active-class');

    });

    it('Should render a selected row with variable edit-class', () => {

        const modifiedSelModel = getSelModel();

        modifiedSelModel.defaults.editCls = 'custom-edit-class';

        const dynamicEditProps = {
            ...props,
            selectionModel: modifiedSelModel,
            selectedRows: {
                [keyGenerator('row', 0)]: true
            },
            editorState: {
                row: {
                    key: keyGenerator('row', 0)
                }
            }
        };

        const component = mount(<Row { ...dynamicEditProps } />);

        expect(
            component.find('tr').props().className
        ).toContain('react-grid-custom-edit-class');

    });

    it('Should render a row in edit mode', () => {

        const dynamicEditProps = {
            ...props,
            selectedRows: {
                [keyGenerator('row', 0)]: true
            },
            editorState: {
                row: {
                    key: keyGenerator('row', 0)
                }
            }
        };

        const component = mount(<Row { ...dynamicEditProps } />);

        expect(
            component.find('input').length
        ).toEqual(2);

    });

    it('Should render a row with a custom renderer', () => {

        const dynamicEditProps = {
            ...props,
            columns: [
                {
                    name: 'Player',
                    dataIndex: 'name',
                    renderer: ({ value }) => {
                        return (
                            <div>
                                <span>{'Name:'}</span>
                                <span>{ value }</span>
                            </div>
                        );
                    }
                },
                {
                    name: 'Position',
                    dataIndex: 'position'
                }
            ]
        };

        const component = mount(<Row { ...dynamicEditProps } />);

        expect(
            component.first('td').find('div').html()
        ).toEqual(
            '<div><span>Name:</span><span>Michael Jordan</span></div>'
        );

    });
});
