/* eslint-enable describe it sinon */

import expect from 'expect';
import React from 'react';
import { OrderedMap, fromJS, Map } from 'immutable';
import { shallow, mount } from 'enzyme';

import { CLASS_NAMES } from './../../../../../src/constants/GridConstants';

import {
    editRow
} from './../../../../../src/actions/plugins/editor/EditorActions';

import store from './../../../../../src/store/store';

import {
    Button
} from './../../../../../src/components/plugins/editor/inline/Button.jsx';
import {
    Editor
} from './../../../../../src/records';

const BUTTON_TYPES = {
    CANCEL: 'CANCEL',
    SAVE: 'SAVE'
};

describe('The inline editor cancel button', () => {

    const props = {
        BUTTON_TYPES,
        saveText: 'Save',
        cancelText: 'Cancel',
        editorState: new OrderedMap({
            'some-id': new Editor({
                key: 'some-id',
                values: Map()
            })
        }),
        editedRowKey: 'some-id',
        events: {},
        stateKey: 'test-grid',
        store,
        type: BUTTON_TYPES.CANCEL
    };

    it('Should render a cancel button', () => {

        const button = shallow(<Button { ...props } />);

        expect(
            button.props().children
        ).toEqual('Cancel');

    });

    it('Should render a cancel button with passed in text', () => {

        const modifiedTextProps = {
            ...props,
            cancelText: 'Probably Cancel?'
        };

        const button = shallow(<Button { ...modifiedTextProps } />);

        expect(
            button.props().children
        ).toEqual('Probably Cancel?');

    });

    it('Should fire dismiss event', (done) => {

        const modifiedTextProps = {
            ...props,
            cancelText: 'Probably Cancel?',
            stateKey: 'test-cancel-button'
        };

        const button = mount(<Button { ...modifiedTextProps } />);

        store.dispatch(editRow({
            rowId: 'some-id',
            top: 40,
            values: fromJS({
                name: 'Scottie Pippen',
                position: 'Power Forward',
                key: 'some-id'
            }),
            rowIndex: 0,
            columns: [
                {
                    dataIndex: 'name'
                },
                {
                    dataIndex: 'position'
                }
            ],
            isCreate: false,
            stateKey: 'test-cancel-button'
        }));

        const editorState = store
            .getState()
            .editor.getIn(['test-cancel-button']);

        expect(
            editorState
        ).toBeTruthy();

        button.simulate('click');

        setTimeout(() => {
            const newEditorState = store
                .getState()
                .editor
                .getIn(['test-cancel-button', 'row-0']);

            expect(newEditorState)
                .toEqual(undefined);

            done();
        }, 100);

    });
});

describe('The inline editor save button', () => {

    const props = {
        BUTTON_TYPES,
        saveText: 'Save',
        cancelText: 'Cancel',
        editorState: new OrderedMap(),
        events: {},
        editedRowKey: 'row-0',
        stateKey: 'test-grid',
        store,
        type: BUTTON_TYPES.SAVE
    };

    it('Should render an enabled save button', () => {

        const button = shallow(<Button { ...props } />);

        expect(button.props().disabled)
            .toEqual(undefined);

    });

    it('Should render a disabled save button class', () => {
        const button = shallow(<Button { ...props } />);

        expect(button.props().className)
            .toContain(CLASS_NAMES.EDITOR.INLINE.SAVE_BUTTON);
    });

    it('Should render a disabled save button', () => {

        const disabledProps = {
            ...props,
            editorState: new fromJS({
                ['row-0']: new Editor({
                    valid: false
                })
            })
        };

        const button = shallow(<Button { ...disabledProps } />);

        expect(button.props().disabled)
            .toEqual(true);

    });

    it('Should render a save button with passed in text', () => {
        const modifiedTextProps = {
            ...props,
            saveText: 'test save text',
            editorState: Map()
        };
        const button = shallow(<Button { ...modifiedTextProps } />);

        expect(button.props().children)
            .toEqual('test save text');
    });

    it('Should update the dataSource entry in store', () => {
        const eventProps = {
            ...props,
            events: {
                HANDLE_BEFORE_INLINE_EDITOR_SAVE: sinon.spy(),
                HANDLE_AFTER_INLINE_EDITOR_SAVE: sinon.spy()
            },
            stateKey: 'test-stateKey',
            editorState: new OrderedMap({
                'row-0': new Editor({
                    values: Map({
                        name: 'Scottie Pippen',
                        position: 'Power Forward'
                    }),
                    key: 'row-0',
                    valid: true,
                    rowIndex: 0
                })
            })
        };

        const eventButton = mount(<Button { ...eventProps } />);

        eventButton.simulate('click');

        const updatedRow = store.getState()
            .dataSource
            .getIn(['test-stateKey', 'data'])
            .first()
            .toJS();

        expect(updatedRow)
            .toEqual({
                name: 'Scottie Pippen',
                position: 'Power Forward',
                _key: 'row-0'
            });
    });

    it('Should fire the passed in save events', () => {
        const eventProps = {
            ...props,
            events: {
                HANDLE_BEFORE_INLINE_EDITOR_SAVE: sinon.spy(),
                HANDLE_AFTER_INLINE_EDITOR_SAVE: sinon.spy()
            },
            stateKey: 'test-stateKey',
            editorState: new OrderedMap({
                ['row-0']: new Editor({
                    values: Map({
                        name: 'Scottie Pippen',
                        position: 'Power Forward'
                    }),
                    valid: true,
                    rowIndex: 0
                })
            })
        };

        const eventButton = mount(<Button { ...eventProps } />);

        eventButton.simulate('click');

        expect(
            eventProps.events.HANDLE_BEFORE_INLINE_EDITOR_SAVE.called
        ).toEqual(true);

        expect(
            eventProps.events.HANDLE_AFTER_INLINE_EDITOR_SAVE.called
        ).toEqual(true);

    });

    it('Should stop the after event if before returns false', () => {
        const eventProps = {
            ...props,
            events: {
                HANDLE_BEFORE_INLINE_EDITOR_SAVE: () => {
                    return false;
                },
                HANDLE_AFTER_INLINE_EDITOR_SAVE: sinon.spy()
            },
            stateKey: 'test-stateKey',
            editorState: new OrderedMap({
                ['row-0']: new Editor({
                    values: Map({
                        name: 'Scottie Pippen',
                        position: 'Power Forward'
                    }),
                    valid: true,
                    rowIndex: 0
                })
            })
        };

        const eventButton = mount(<Button { ...eventProps } />);

        eventButton.simulate('click');

        expect(
            eventProps.events.HANDLE_AFTER_INLINE_EDITOR_SAVE.called
        ).toEqual(false);

    });

});
