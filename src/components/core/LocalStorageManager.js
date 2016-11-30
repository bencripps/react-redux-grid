import { debounce } from './../../util/throttle';

export class LocalStorageManager {

    setStateItem({ stateKey, property, value }) {
        const json = JSON.stringify(value);

        if (!window.localStorage) {
            return value;
        }

        window.localStorage.setItem(
            this.getKey({ stateKey, property }), json
        );
    }

    debouncedSetStateItem() {
        return debounce(this.setStateItem.bind(this), 500, false);
    }

    getStateItem({ stateKey, property, value, shouldSave = true }) {

        if (!window.localStorage) {
            return value;
        }

        const item = window.localStorage.getItem(
            this.getKey({ stateKey, property })
        );

        if (item) {
            return JSON.parse(item);
        }

        if (value && shouldSave) {
            this.setStateItem({ stateKey, property, value });
        }

        return value;
    }

    getKey({ stateKey, property }) {

        if (!stateKey || !property) {
            throw new Error('stateKey and property are required params');
        }

        return `react-grid-${stateKey}-${property}`;
    }

}

export default new LocalStorageManager();
