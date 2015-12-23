import React, { PropTypes, Component } from 'react';
import Inline from './Inline.jsx';
import { CSS_PREFIX, CLASS_NAMES } from '../../../constants/GridConstants';
import { keyGenerator, keyFromObject } from '../../../util/keygenerator';
import { setSelection } from '../../../actions/plugins/selection/ModelActions';

export default class Manager {

	constructor(plugins, store, events) {

		const defaults = {
			type: 'inline',
			enabled: false
		}

		const config = plugins.EDITOR 
			? Object.assign(defaults, plugins.EDITOR) : defaults;

		this.defaults = config;
		
	}

	getComponent() {

		if (this.defaults.enabled) {
			return <Inline />
		} 
		
		else {
			return null;
		}
	}

}