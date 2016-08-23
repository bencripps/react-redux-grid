/* eslint-enable describe it sinon */
import expect from 'expect';

import {
    setTreeValue
} from './../../src/util/setTreeValue';

describe('the setTreeValue utility', () => {

    it('Should navigate a tree and update an individual property', () => {

        const data = {
            root: {
                id: -1,
                children: [
                    {
                        id: 1,
                        parentId: -1,
                        children: [
                            {
                                id: 11,
                                parentId: 1
                            },
                            {
                                id: 12,
                                parentId: 1,
                                children: [
                                    {
                                        id: 121,
                                        parentId: 12,
                                        children: [
                                            {
                                                id: 1211,
                                                parentId: 121
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: 2,
                        parentId: -1,
                        children: [
                            {
                                id: 21,
                                parentId: 2
                            }
                        ]
                    }
                ]
            }
        };

        expect(
            setTreeValue(data, [-1, 1, 12, 121], { _hideChildren: true })
        ).toEqual({
            root: {
                id: -1,
                children: [
                    {
                        id: 1,
                        parentId: -1,
                        children: [
                            {
                                id: 11,
                                parentId: 1
                            },
                            {
                                id: 12,
                                parentId: 1,
                                children: [
                                    {
                                        id: 121,
                                        _hideChildren: true,
                                        parentId: 12,
                                        children: [
                                            {
                                                id: 1211,
                                                parentId: 121
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: 2,
                        parentId: -1,
                        children: [
                            {
                                id: 21,
                                parentId: 2
                            }
                        ]
                    }
                ]
            }
        });
    });

});
