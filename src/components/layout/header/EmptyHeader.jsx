import React, { PropTypes } from 'react';

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

EmptyHeader.propTypes = {
    props: PropTypes.object
};

