import React, { PropTypes } from 'react';

export const EmptyHeader = (props) => {

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

EmptyHeader.propTypes = {
    props: PropTypes.object
};

