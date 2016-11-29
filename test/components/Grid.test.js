/* eslint-enable describe it */
import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import Grid from './../../src/components/Grid.jsx';
import { Store as GridStore } from './../../src/store/store';
import { mockStore } from './../testUtils/index';

import { gridColumns,
    localGridData,
    gridActions,
    stateKey
} from '../testUtils/data';

const props = {
    data: localGridData,
    columns: gridColumns,
    stateKey,
    plugins: {},
    store: mockStore({}, ...gridActions)
};

props.store.subscribe = () => {};

describe('A fully mounted simple grid with invalid props', () => {

    const invalidDataProps = {
        ...props,
        store: GridStore,
        data: null,
        dataSource: null
    };

    const invalidColProps = {
        ...props,
        store: GridStore,
        columns: null
    };

    const invalidStateKeyProps = {
        ...props,
        stateKey: null
    };

    const invalidData = () => {
        return mount(<Grid { ...invalidDataProps } />);
    };

    const invalidCol = () => {
        return mount(<Grid { ...invalidColProps } />);
    };

    const invalidStore = () => {
        const invalidStoreProps = {
            ...props,
            stateKey: 'banana',
            store: {}
        };

        return mount(<Grid { ...invalidStoreProps } />);
    };

    const invalidStateKey = () => {
        return mount(<Grid { ...invalidStateKeyProps } />);
    };

    it('Should throw an error', () => {
        expect(invalidData)
            .toThrow('A data source, or a static data set is required');
    });

    it('Should throw the column error', () => {
        expect(invalidCol)
            .toThrow('A columns array is required');
    });

    // it('Should throw the store error', () => {
    //     expect(invalidStore)
    //         .toThrow('Component must be intialized with a valid store');
    // });

    it('Should throw the stateKey error', () => {
        expect(invalidStateKey)
            .toThrow('A stateKey is required to intialize the grid');
    });

});

describe('A fully mounted simple grid', () => {

    const simpleProps = {
        ...props,
        store: GridStore
    };

    const component = mount(<Grid { ...simpleProps } />);

    it('Should render with the correct number of rows', () => {
        expect(
            component.find('.react-grid-row').length
        ).toEqual(2);
    });

    it('Should render 2 headers, only 1 visible', () => {
        expect(
            component.find('.react-grid-header').length
        ).toEqual(2);

        expect(
            component.find('.react-grid-header.react-grid-header-hidden').length
        ).toEqual(1);
    });

    it('Shouldn\'t render a pager', () => {
        expect(
            component.find('.react-grid-pager-toolbar').length
        ).toEqual(0);
    });

    it('Shouldn\'t render 5 headers, 2 visible', () => {
        // 5th header is a spacer for icon alignment
        expect(
            component.find('.react-grid-header').find('th').length
        ).toEqual(5);

        expect(
            component
                .find('.react-grid-header.react-grid-header-hidden')
                .find('th').length
        ).toEqual(2);
    });

    it('Shouldn\'t render the bulk action plugin', () => {
        expect(
            component.find('.react-grid-bulkaction-container').length
        ).toEqual(0);
    });

    it('Should render the correct cells', () => {
        expect(
            component.find('td').node.innerHTML
        ).toContain('Michael Jordan');
    });

    it('Should render the correct number of cells', () => {
        expect(
            component.find('td').nodes.length
        ).toEqual(4);
    });
});

describe('A fully mounted grid with a custom pager', () => {

    const customPagerProps = {
        ...props,
        store: GridStore,
        plugins: {
            PAGER: {
                enabled: true,
                pagerComponent: (
                    <span className = { 'custom-pager' } >
                        { 'Custom Pager' }
                    </span>
                    )
            }
        }
    };

    const component = mount(<Grid { ...customPagerProps } />);

    it('Should have a pager', () => {
        expect(
            component.find('.custom-pager').length
        ).toEqual(1);
    });

});

describe('A fully mounted grid with pager', () => {

    const pagerProps = {
        ...props,
        store: GridStore,
        plugins: {
            PAGER: {
                enabled: true,
                pagingType: 'local'
            }
        }
    };

    const component = mount(<Grid { ...pagerProps } />);

    beforeEach((done) => {
        component.update();

        setTimeout(() => {
            done();
        }, 100);
    });

    it('Should have a pager', () => {
        expect(
            component.find('.react-grid-pager-toolbar').length
        ).toEqual(1);
    });

    it('Should have the right pager message', () => {
        expect(
           component
            .find('.react-grid-pager-toolbar').text()
            .replace(/ +?|\n/g, '')
        ).toContain('1through2of2RecordsDisplayed');
    });

});
