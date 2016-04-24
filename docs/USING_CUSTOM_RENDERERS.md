# Using Custom Renderers

Renders are defined on the `columns` object, and specify how cells that fall under their parent column will be rendered. By default, cells have the following HTML.

    <td>
        <span>
            { value }
        </span>
    </td>

However, this behavior can be overridden by providing the column definition a renderer.

    const columns = [
        {
            name: 'Avatar',
            dataIndex: 'avatarImageSrc',
            renderer: ({ column, value, row }) => { 

                const spanClass = value !== undefined
                    ? 'has-avatar'
                    : 'no-avatar';

                return (
                    <span { ...{ className: spanClass } }>
                        <img src= { value } />
                    </span>
                    );
            }
        },
        ...
    ];

Renderes are passed an object of values that will help you create dynamic cell values. Renderes must return a JSX object, or a string.

1. `column`, `obj`, the column object that describes the cell's parent column
2. `value`, `any`, the value for the corresponding cell
3. `row`, `obj`, the row object, including row values for the corresponding cell

Using this Renderer would return the following HTML

    <td>
        <span>
            <span class='has-avatar'>
                <img src='path/to/avatar/image' />
            </span>
        </span>
    </td>
