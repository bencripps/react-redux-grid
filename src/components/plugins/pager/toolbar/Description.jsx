import React, { PropTypes } from 'react';

export const Description = ({ toolbarRenderer, pageIndex, pageSize, total, currentRecords, recordType }) => {

    return (
        <span>
            { toolbarRenderer(pageIndex, pageSize, total, currentRecords, recordType) }
        </span>
        );
};

Description.propTypes = {
    toolbarRenderer: PropTypes.func
};

Description.defaultProps = {
    toolbarRenderer: (pageIndex, pageSize, total, currentRecords, recordType) => {
        if (!currentRecords) {
            return `No ${recordType} Available`;
        }

        return `${pageIndex * pageSize}
            through ${pageIndex * pageSize + currentRecords}
            of ${total} ${recordType} Displayed`;
    }
};