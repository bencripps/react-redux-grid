import { CSS_PREFIX, CLASS_NAMES } from '../../../constants/GridConstants';
import { setSelection } from '../../../actions/plugins/selection/ModelActions';

export default class Model {

	constructor(plugins, store) {

		const eventTypes = {
			singleclick: 'singleclick',
			doubleclick: 'doubleclick'
		};

		const defaults = {
			mode: 'single',
			enabled: true,
			allowDeselect: true,
        	activeCls: 'active-cls',
        	selectionEvent: eventTypes.singleclick,
        	store: store
		}

		const config = plugins.SELECTION_MODEL 
			? Object.assign(defaults, plugins.SELECTION_MODEL) : defaults;

		this.defaults = config;
		this.eventTypes = eventTypes;
		this.store = config.store;
	}

	handleSelectionEvent(selectionEvent) {

		this.store.dispatch(setSelection(selectionEvent.id, this.defaults));

	}
}