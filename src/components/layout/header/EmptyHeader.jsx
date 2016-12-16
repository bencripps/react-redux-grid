import React, { PropTypes } from 'react';

export const EmptyHeader = props => {

    const headerProps = {
        style: {
            width: '100%'
        },
        key: 'react-grid-empty-header',
        ...props
    };

    return (
        <th { ...headerProps } />
    );
};

const { object } = PropTypes;

EmptyHeader.propTypes = {
    props: object
};

