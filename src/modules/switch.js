const Toggle = require('./toggle');

module.exports = class Switch extends Toggle {
	constructor(opts) {
		super(opts);
		this.onEvent = opts.onEvent || false;
		this.offEvent = opts.offEvent || false;

		// mark this element as initialised
		this.element.setAttribute('data-toggle-switch', 'switch');
	}

	bindEventListeners() {
		let events;

		// custom on switch events
		if (this.type === 'on' && this.onEvent) {

			events = this.onEvent.split(',');

		// custom off switch events
		} else if (this.type === 'off' && this.offEvent) {

			events = this.offEvent.split(',');

		// shared on/off events
		} else {
			events = this.event.split(',');
		}

		// will be array of length 1 if single event
		events.forEach(function(event) {
			this._bindEventListener.apply(this, [event]);
		}.bind(this));
	}

	// fire switch
	fire() {
		// this is a replace switch so replace
		if (this.type === 'replace') {

			this.replaceClass();

		// class not applied this is an on switch so add
		} else if (this.type === 'on') {

			this._addClass.apply(this);

		// class applied this is an off switch so remove
		} else if (this.type === 'off') {

			this._removeClass.apply(this);
		}
	}

	// switch specific replace class logic
	replaceClass() {
		[].forEach.call(this.target, function(el) {
			el.classList.remove(this.remove);
			el.classList.add(this.add);
			this._triggerEvent.apply(this, ['replaced']);
		}.bind(this));
	}
};
