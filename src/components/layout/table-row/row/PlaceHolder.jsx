import React, { PropTypes } from 'react';

import { prefix } from '../../../../util/prefix';
import { CLASS_NAMES } from '../../../../constants/GridConstants';

export const PlaceHolder = (message) => {

    const rowProps = {
        className: prefix(CLASS_NAMES.ROW)
    };

    const tdProps = {
        className: prefix(CLASS_NAMES.ROW, CLASS_NAMES.EMPTY_ROW)
    };

    return (
        <tr { ...rowProps }>
            <td colSpan="100%" { ...tdProps }>
                { message.emptyDataMessage }
            </td>
        </tr>
    );
};

PlaceHolder.propTypes = {
    message: PropTypes.object
};

PropTypes.defaultProps = {
    message: {
        emptyDataMessage: ''
    }
};