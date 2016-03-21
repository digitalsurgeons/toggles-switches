/**
* Toggles & Switches
* ------------------
* A declarative pattern for applying CSS states
* and animations based on user interaction
*
* @author Digital Surgeons
*/

(function() {

	'use strict';

	const Toggle = require('./modules/toggle');
	const Switch = require('./modules/switch');
	const DataAttr = require('./modules/data-attr');

	DataAttr(Toggle, Switch);
})();
