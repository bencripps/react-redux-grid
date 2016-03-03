import React from 'react';

export const EmptyHeader = (props) => {

    const headerProps = {
        style: {
            width: '100%'
        },
        ...props
    };

    return (
        <th { ...headerProps } />
    );
};