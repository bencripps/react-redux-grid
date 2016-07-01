class FilterUtils {
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

    byMenu(filterObj, datasource) {

        if (!filterObj) {
            return datasource.proxy;
        }

        return datasource.proxy.filter((obj) => {

            const keys = Object.keys(obj);

            for (let i = 0; i < keys.length; i++) {

                const key = keys[i].toLowerCase();
                const value = filterObj[key]
                    ? filterObj[key].toLowerCase()
                    : null;

                if (filterObj[key]) {
                    if (obj[keys[i]].toLowerCase().indexOf(value) === -1) {

                        return false;
                    }
                }

            }

            return true;
        });
    }
}

export default new FilterUtils();
