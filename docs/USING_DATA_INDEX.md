# Using the Column `dataIndex` Property

The `dataIndex` property on a column definition states how the column should grab data from the array of data objects passed to grid. This data can be a one level object where data is accessed by a single key, or it can be a nested object where data must be retrieved deeper than the first level.

Example:

```javascript
const data = {
    topLevel: 1,
    outer: {
        middle: {
            inner: 'rowValue'
        }
    }
};

const columns = [
    {
        name: 'Nested Value',
        dataIndex: ['outer', 'middle', 'inner']
    },
    {
        name: 'Top Level Value',
        dataIndex: 'topLevel'
    }
]
```
