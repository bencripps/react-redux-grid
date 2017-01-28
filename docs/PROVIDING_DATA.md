
# Providing Grid Data

## Data can be provided to a grid in two ways.

1. As a Local Data Source (in memory)
2. As a Remote Data Source, via AJAX (by providing a route, or a function which returns a `Promise`)

### Local Data

####  If data is provided as a local variable it should be described as an array of objects, and declared using `data = [];`.

```javascript
const data = [
    {
        name: 'Michael Jordan',
        position: 'Shooting Guard'
    },
    {
        name: 'Charles Barkley',
        position: 'Power Forward'
    }, ...
];

const grid = <Grid data={ data } />
```

### Remote Data, using a Remote Resource

#### If data is provided as a request route, it should be described as a string and declared using `dataSource = path/to/data/source;`.

```javascript
const dataSource = 'route/to/your/data/source';
const grid = <Grid dataSource={ dataSource } />
```

### Remote Data, using a function

#### If data is provided as a function, it must return a `Promise`

```javascript
const dataSource = () => {

    return new Promise((success) =>{

        return $.get({
            method: 'GET',
            route: '/route/to/your/data',
        }).then((response) => {

            // important to note, that the grid expects a data attribute
            // on the response object!

            const gridResponse = {
                data: response.items
            };

            success(gridResponse);
        });

    });
};

const grid = <Grid dataSource= { dataSource } />
 ```
