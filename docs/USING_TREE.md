# Using Tree Grid

The default behavior for the grid component is to display a flat list of records. This behavior can be modified to show data as a hierarchy with a few config changes.

````js

import { Grid } from 'react-redux-grid';

const treeConfig = {
    stateKey: 'tree-grid-1',
    gridType: 'tree', // either `tree` or `grid`,
    showTreeRootNode: false, // dont display root node of tree
    columns: [
        {
            dataIndex: 'category',
            name: 'Category',
            expandable: true // this will be the column that shows the nested hierarchy
        },
        {
            dataIndex: 'categoryCode',
            name: 'Category Code',
            expandable: true // can be set on multiple columns
        },
        {
            dataIndex: 'editable',
            name: 'Editable',
            expandable: false // will be displayed as flat data
        }
    ],
};

const grid = <Grid { ...treeConfig } />;

````

### More Information about Tree

Apart from designating the `gridType` as `tree`, the data consumed by grid must be structured differently.

**Currently**, grid expects the following data structure.

````js
{
    root: {
        id: -1,
        parentId: null,
        children: [
            {
                id: 1,
                parentId: -1,
                name: 'Category 1',
                categoryCode: 'as-ffw-34neh-',
                editable: true,
                children: [
                    {
                        id: 12,
                        parentId: 1,
                        leaf: false // there are children for this record that haven't been fetched yet
                        // ... rest of data
                    },
                    {
                        id: 13,
                        parentId: 1
                        // ... rest of data
                    }
                ]
            }
        ]
    }
}
````

**Important Note**, is that `children` will specify child nodes and that `parentId` and `id` are required parameter for each record.

### Requesting Data Partials

If a partial data set is loaded into grid on initial render, and a node specifices `leaf: false`, upon expansion of this node (or a similar node), the `dataSource` function that has been passed in as a prop will be called with the argument of `{ parentId: 1 // the id of the clicked node }`. If the `dataSource` is a string, a request will be made with the addition of a querystring param.

For example, if your `dataSource` url is: `/route/to/tree/data`

the request will be made to `/route/to/tree/data?parentId=1`

### Loading Data Partials

After making a request for a data partial, with the `parentId`, the accompanying response will need to specify `partial: true`.

The data would like like this:

````js
const response = {
      data: [
        {
            id: 11,
            parentId: 1,
            name: 'Category 11',
            editable: false,
            leaf: true,
            categoryCode: '12jf-3h3h-11'
        }
      ],
      partial: true
};
