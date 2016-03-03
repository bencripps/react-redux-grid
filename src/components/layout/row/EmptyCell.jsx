import React from 'react';
import { ConnectedCell as Cell } from './../Cell.jsx';

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