# Using Custom Row Renderers

RowRenders are defined on the `grid` object, and specify how rows will be rendered. By default, rows have the following HTML.

    <tr >
        { cells }
    </tr>

However, this behavior can be overridden by providing the row definition a renderer.

    const rowRenderer = ({row, rowProps, cells}) => {
      if(row.get('header')){
        rowProps.className = `${rowProps.className} HeaderRowClass`
        return (
            <tr { ...rowProps }>
                { cells }
            </tr>
          );
      }else{
        return (
              <tr { ...rowProps}>
                  { cells }
              </tr>
          );
      }
    };

Renderes are passed an object of values that will help you create dynamic row values. Renderes must return a JSX object, or a string.

1. `row`, `obj`, the map containing all the row data
2. `rowProps`, `any`, the properties applied to the table row
3. `cells`, `obj`, the cells rendered by the column renderer
