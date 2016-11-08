# Using the `applyGridConfig` function to update Grid Constants

The CSS prefix and the CSS classes for the Grid Component can be dynamically updated. By updating the prefix, or the accompanying classes, you will lose any default CSS but the grid should still function as expected.

## Exampla

````js
import { Grid, applyGridConfig } from 'react-redux-grid';

applyGridConfig({
    CLASS_NAMES: {
        TABLE: 'table-class'
    },
    CSS_PREFIX: 'custom-prefix'
});

const grid = <Grid />;

````
