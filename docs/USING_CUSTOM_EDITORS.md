# Using Custom Editors

Editors are defined on the `columns` object, and specify how cells that fall under their parent column will be edited when the row is in editmode. By default, cells in editmode will be displayed as `<text />` inputs.

##### By default, cells have the following HTML:

````html
<td>
    <span>
        { value }
    </span>
</td>
````

##### The very same cell, when in editmode, will be displayed as:

````html
<td>
    <span>
        <input type="text" value={ value } />
    </span>
</td>
````

This behavior can be overridden by defining an editor on the `columns` object:


##### Example Dropdown Editor

**Definition**:

````js

import StateEditor from './editors/State';

const columns = [
    {
        name: 'State',
        dataIndex: 'state',
        editor: StateEditor
    }, //...
];
````

**Implementation**:

````js

import { Actions } from 'react-redux-grid';

import statesOptions from './../constants/stateDefinitions';

export default const stateEditor = ({
    column, columns, value, stateKey, store, rowId
}) => {

    const dropdownProps = {
        value: value,
        onChange: handleChange.bind(
            null, { store, stateKey, column, columns, rowId }
        )
    };

    return (
        <select { ...dropdownProps }>
            { stateOptions }
        </select>
    );

};

export const handleChange = ({
    store, stateKey, column, columns, rowId
}, event) => {

    const target = event.target;

    return store.dispatch(
        Actions.EditorActions.updateCellValue({
            column,
            columns,
            name: column.dataIndex,
            rowId,
            stateKey,
            value: target[target.options[target.selectedIndex]
        })
    );

};

````

When in editmode, this column will be rendered with the following HTML:


````html
<td>
    <span>
        <select value= { value }>
            <option>Texas</option>
            <!-- more states ... -->
        </select>
    </span>
</td>
````
