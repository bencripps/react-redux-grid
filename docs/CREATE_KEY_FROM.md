# `createKeyFrom` Property on Column Definition

There is a lot to talk about when we're talking about performance, especially when it comes to the React API. To fully understand the use and purpose of `createKeyFrom`, I think it's important to have an understanding of one of React's core tenets:

### Reconciliation

And rather than fumble over the concept myself, I will simply link to React's own documentation https://facebook.github.io/react/docs/reconciliation.html

This snippet, taken from the React documentation explains why the grid column definition allows for a single `createKeyFrom`:

>
Keys should be stable, predictable, and unique. Unstable keys (like those produced by Math.random()) will cause many nodes to be unnecessarily re-created, which can cause performance degradation and lost state in child components.
>

When you set a column as `createKeyFrom`, you will be setting the `key` of the `Row` component, as the value at this `dataIndex`. Take the following HTML rendered by the grid component, with the following column definition:

````js
const columns = [
    {
        name: 'Name',
        dataIndex: 'name',
        createKeyFrom: true
    },
    {
        name: 'Email',
        dataIndex: 'email'
    }
];

````

````html
<tbody>
    <tr class="react-grid-row">
        <td class="react-grid-cell">
            <td class="react-grid-cell"><span>Michael</span></td>
            <td class="react-grid-cell"><span>michael@gmail.com</span></td>
        </td>
    </tr>
    <tr class="react-grid-row">
        <td class="react-grid-cell">
            <td class="react-grid-cell"><span>Allen</span></td>
            <td class="react-grid-cell"><span>allen@gmail.com</span></td>
        </td>
    </tr>
</tbody>
````
When the preceding rows get rendered with the above column definition, the resulting keys will look like:

````js
const keys = ['Michael', 'Allen'];
````

Provided **that these keys will be unique**, this will allow for the React reconciliation step will be optimized for performance. This is especially helpful when dealing with big data sets (> ~1000 rows).

### Take Aways

1. Only set a column as `createKeyFrom` if you can guarantee that the value for each row will be unique.
2. You can only set one column as `createKeyFrom`.
3. If you do not set a column as `createKeyFrom`, the row `index` will be used as the `key`.

