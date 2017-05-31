import PropTypes from 'prop-types';
import React from 'react';

import { prefix } from '../../../util/prefix';
import { gridConfig } from '../../../constants/GridConstants';

export const PlaceHolder = (message) => {

    const { CLASS_NAMES } = gridConfig();

    return (
        <tr
            className={prefix(CLASS_NAMES.ROW)}
        >
            <td
                className={prefix(CLASS_NAMES.ROW, CLASS_NAMES.EMPTY_ROW)}
                colSpan="100%"
            >
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
