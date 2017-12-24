import React from 'react';
import { Cell } from './Cell';

export const EmptyCell = (props) => {

    const cellProps = {
        style: {
            width: '100%'
        },
        ...props
    };

    return (
        <Cell { ...cellProps } />
    );
};
