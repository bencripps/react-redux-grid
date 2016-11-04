import React, { PropTypes } from 'react';
import { list } from 'react-immutable-proptypes';

export const Description = ({
    toolbarRenderer, pageIndex, pageSize, total, currentRecords, recordType
}) => {

    return (
        <span>
            {
                toolbarRenderer(
                    pageIndex, pageSize, total, currentRecords, recordType
                )
            }
        </span>
        );
};

const { func, number, string } = PropTypes;

Description.propTypes = {
    currentRecords: list,
    pageIndex: number,
    pageSize: number,
    recordType: string,
    toolbarRenderer: func,
    total: number
};

Description.defaultProps = {
    toolbarRenderer: (
        pageIndex, pageSize, total, currentRecords, recordType
    ) => {
        if (!currentRecords) {
            return `No ${recordType} Available`;
        }

        const firstIndex = (pageIndex * pageSize) + 1;

        return `${firstIndex}
            through ${pageIndex * pageSize + currentRecords}
            of ${total} ${recordType} Displayed`;
    }
};
