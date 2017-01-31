/* global sinon */
import expect from 'expect';
import React from 'react';
import {
    Button
} from './../../../../../src/components/plugins/pager/toolbar/Button.jsx';
import
    * as ButtonUtils
from './../../../../../src/components/plugins/pager/toolbar/Button.jsx';

import { localGridData } from './../../../../testUtils/data';

import {
    shallowWithContext,
    initializedStore
} from './../../../../testUtils';

const stateKey = 'stateKey';

const props = {
    store: initializedStore,
    pageSize: 25,
    dataSource: localGridData,
    ref: 'pagertoolbar',
    plugins: {
        PAGER: {
            enabled: true
        }
    }
};

describe('A Pager Toolbar Next Button', () => {

    const nextButtonProps = Object.assign(props, { type: 'NEXT' });

    const component = shallowWithContext(<Button { ...nextButtonProps } />);

    it('Should button to be a Next Button', () => {
        expect(component.text()).toEqual('Next');
    });

    it('Should have the right class', () => {
        expect(component.props().className)
            .toEqual('react-grid-page-buttons react-grid-next');
    });

    it('Shouldn\'t be diabled', () => {
        expect(component.props().disabled).toEqual(false);
    });
});

describe('handleButtonClick function with local paging', () => {
    const type = 'NEXT';
    const pageIndex = 0;
    const pageSize = 25;
    const dataSource = 'url/to/dataSource';
    const plugins = {
        PAGER: {
            pagingType: 'local'
        }
    };
    const BUTTON_TYPES = {
        NEXT: 'NEXT',
        BACK: 'BACK'
    };
    const localPagedStore = initializedStore;

    it('The action should reflect the next page when clicked', () => {
        expect(
            ButtonUtils.handleButtonClick(
                type,
                pageIndex,
                pageSize,
                dataSource,
                BUTTON_TYPES,
                plugins,
                stateKey,
                localPagedStore
            )
        ).toEqual(undefined);
    });
});

describe('handleButtonClick function with remote paging', () => {
    const type = 'NEXT';
    const pageIndex = 0;
    const pageSize = 25;
    const dataSource = 'url/to/dataSource';
    const plugins = {
        PAGER: {
            pagingType: 'remote'
        }
    };
    const BUTTON_TYPES = {
        NEXT: 'NEXT',
        BACK: 'BACK'
    };
    const localPagedStore = initializedStore;

    it('Action reflects loading state, clicking next, remote pager', () => {
        expect(
            () => ButtonUtils.handleButtonClick(
                type,
                pageIndex,
                pageSize,
                dataSource,
                BUTTON_TYPES,
                plugins,
                stateKey,
                localPagedStore
            )
        ).toNotThrow();
    });

    it('Should fire setPageIndexAsync when a promise exists', () => {
        expect(
            () => ButtonUtils.handleButtonClick(
                type,
                pageIndex,
                pageSize,
                () => new Promise(resolve => resolve()),
                BUTTON_TYPES,
                plugins,
                stateKey,
                localPagedStore
            )
        ).toNotThrow();
    });
});

describe('handleButtonClick function without a pagingType specified', () => {
    const type = 'NEXT';
    const pageIndex = 0;
    const pageSize = 25;
    const dataSource = 'url/to/dataSource';
    const plugins = {
        PAGER: {}
    };
    const BUTTON_TYPES = {
        NEXT: 'NEXT',
        BACK: 'BACK'
    };
    const uncalledStore = {
        dispatch: sinon.spy()
    };

    it('Should not dispatch an action', () => {
        expect(
            ButtonUtils.handleButtonClick(
                type,
                pageIndex,
                pageSize,
                dataSource,
                BUTTON_TYPES,
                plugins,
                stateKey,
                uncalledStore
            )
        ).toEqual(undefined);
    });

    it('Should not have fired a store event', () => {
        expect(
            uncalledStore.dispatch.called
        ).toBe(false);
    });
});

describe('isButtonDisabled function', () => {

    const type = 'NEXT';
    const pageIndex = 0;
    const pageSize = 25;
    const currentRecords = 1000;
    const total = 100;
    const BUTTON_TYPES = {
        NEXT: 'NEXT',
        BACK: 'BACK'
    };

    it('Should be disabled if more visible records than the total', () => {
        expect(
            ButtonUtils.isButtonDisabled(type, pageIndex, pageSize,
                currentRecords, total, BUTTON_TYPES)
        ).toEqual(false);
    });

    it('Should be disabled if equal number of visible records to total', () => {
        expect(
            ButtonUtils.isButtonDisabled(type, 1, 100,
                100, total, BUTTON_TYPES)
        ).toEqual(false);
    });

    it('Back button should be disabled if were on page index 0', () => {
        expect(
            ButtonUtils.isButtonDisabled('BACK', pageIndex, pageSize,
                currentRecords, total, BUTTON_TYPES)
        ).toEqual(true);
    });

    it('Back button should be enabled if were on page index 1', () => {
        expect(
            ButtonUtils.isButtonDisabled('BACK', 1, pageSize,
                currentRecords, total, BUTTON_TYPES)
        ).toEqual(false);
    });
});
