
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

export const dataSource = function getData({
    pageIndex, pageSize
}) {
    return new Promise((resolve) => {
        const request = new XMLHttpRequest();

        const config = {
            method: 'GET',
            route: 'http://react-redux-grid.herokuapp.com/getfakeData'
        };

        if (pageIndex) {
            config.route = `${config.route}?pageIndex=${pageIndex}&pageSize=${pageSize}`; // eslint-disable-line max-len
        }

        request.open(config.method, config.route, true);

        request.addEventListener(
            'load', (res) => {
                const response = JSON.parse(res.target.responseText);

                // if you have more data than is being shown
                // ensure you return a total, so the pager knows
                // what paging actions are possible

                resolve({
                    data: response.data,
                    total: response.total
                });
            }
        );

        request.send(config.data || null);
    });
};

const grid = <Grid dataSource={dataSource} />
 ```
