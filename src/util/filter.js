class Filter {
    constructor() {

    }

    byKeyword(value, datasource) {
        return datasource.proxy.filter((obj) => {

            const keys = Object.keys(obj);

            for (let i = 0; i < keys.length; i++) {
                if (obj[keys[i]].toLowerCase().indexOf(value) !== -1) {
                    return true;
                }
            }

            return false;
        });
    }
}

export default new Filter();