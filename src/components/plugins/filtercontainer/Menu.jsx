import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { Button } from './menu/Button.jsx';
import { Input } from './menu/Input.jsx';

import { prefix } from '../../../util/prefix';
import { stateGetter } from '../../../util/stateGetter';
import { CLASS_NAMES, FILTER_METHODS } from '../../../constants/GridConstants';

export const FilterMenu = ({ buttonText, buttonTypes, dataSource, menuTitle, filter, plugins, pager, stateKey, store }) => {

    const menuContainerProps = {
        className: prefix(CLASS_NAMES.FILTER_CONTAINER.MENU.CONTAINER)
    };

    const menuTitleProps = {
        text: menuTitle,
        className: prefix(CLASS_NAMES.FILTER_CONTAINER.MENU.TITLE)
    };

    const buttonContainerProps = {
        className: prefix(CLASS_NAMES.FILTER_CONTAINER.MENU.BUTTON_CONTAINER)
    };

    const inputs = plugins.FILTER_CONTAINER.fields
        && plugins.FILTER_CONTAINER.fields.length > 0
        ? plugins.FILTER_CONTAINER.fields.map(
                (field) => <Input { ...{ field, filter, stateKey, store } }/>
            )
        : null; 

    const buttonProps = {
        buttonText,
        buttonTypes,
        dataSource,
        filter,
        plugins,
        pager,
        store
    };

    return (
        <div { ...menuContainerProps } >
            <span { ...menuTitleProps } >
                { menuTitleProps.text }
            </span>
            <div>
                { inputs }
            </div>
            <div { ...buttonContainerProps }>
                <Button { ...buttonProps } { ...{ stateKey, type: buttonTypes.CANCEL } } />
                <Button { ...buttonProps } { ...{ stateKey, type: buttonTypes.SUBMIT } } />
            </div>
        </div>
        );
};

FilterMenu.propTypes = {
    buttonText: PropTypes.object,
    buttonTypes: PropTypes.object,
    dataSource: PropTypes.object,
    filter: PropTypes.string,
    menuTitle: PropTypes.string.isRequired,
    pager: PropTypes.object,
    plugins: PropTypes.object.isRequired,
    stateKey: PropTypes.string,
    store: PropTypes.object.isRequired
};

FilterMenu.defaultProps = {
    buttonTypes: {
        SUBMIT: 'SUBMIT',
        CANCEL: 'CANCEL'
    },
    buttonText: {
        SUBMIT: 'Submit',
        CANCEL: 'Cancel'
    },
    defaultSortMethod: FILTER_METHODS.LOCAL,
    menuTitle: 'Advanced Filter Menu',
    placeHolderText: 'Search',
    plugins: React.PropTypes.object.isRequired,
    selectionModel: React.PropTypes.object.isRequired
};

function mapStateToProps(state, props) {

    return {
        dataSource: stateGetter(state, props, 'dataSource', props.stateKey),
        selectedRows: stateGetter(state, props, 'selection', props.stateKey),
        filter: stateGetter(state, props, 'filter', props.stateKey),
        pager: stateGetter(state, props, 'pager', props.stateKey)
    };
}

export default connect(mapStateToProps)(FilterMenu);