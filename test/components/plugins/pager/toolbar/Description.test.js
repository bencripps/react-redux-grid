/* global sinon */
import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import {
    Description
} from './../../../../../src/components/plugins/pager/toolbar/Description.jsx';

const props = {
    pageIndex: 0,
    pageSize: 25,
    total: 100,
    currentRecords: 25,
    recordType: 'Records'
};

describe('The Pager Description Component', () => {

    it('Should show 1 through 25 records', () => {
        const component = shallow(<Description { ...props } />);
        expect(component.text())
            .toEqual('1 through 25\n            of 100 Records Displayed');
    });

    it('Should show 26 through 50 records', () => {
        const page2Props = Object.assign(props, {
            pageIndex: 1
        });
        const component = shallow(<Description { ...page2Props } />);

        expect(component.text())
            .toEqual('26 through 50\n            of 100 Records Displayed');
    });

    it('Should show 61 through 90 records of 200', () => {
        const page2Props = Object.assign(props, {
            pageIndex: 2,
            pageSize: 30,
            currentRecords: 30,
            total: 200
        });
        const component = shallow(<Description { ...page2Props } />);

        expect(component.text())
            .toEqual('61 through 90\n            of 200 Records Displayed');
    });

    it('Should use bananas instead of records', () => {
        const page2Props = Object.assign(props, {
            pageIndex: 2,
            pageSize: 30,
            currentRecords: 30,
            total: 200,
            recordType: 'Bananas'
        });
        const component = shallow(<Description { ...page2Props } />);

        expect(component.text())
            .toEqual('61 through 90\n            of 200 Bananas Displayed');
    });

    it('Should use a custom renderer function', () => {
        const page2Props = Object.assign(props, {
            pageIndex: 2,
            pageSize: 30,
            currentRecords: 30,
            total: 200,
            recordType: 'Bananas',
            toolbarRenderer: (
                pageIndex,
                pageSize,
                total,
                currentRecords,
                recordType) => {
                return pageIndex * pageSize * 100 + currentRecords + recordType;
            }
        });
        const component = shallow(<Description { ...page2Props } />);

        expect(component.text()).toEqual('6030Bananas');
    });

});
