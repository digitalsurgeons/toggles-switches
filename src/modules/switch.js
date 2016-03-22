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
			this.bindEventListener.apply(this, [event]);
		}.bind(this));
	}

	// fire switch
	fire() {
		// this is a replace switch so replace
		if (this.type === 'replace') {

			this.replaceClass();

		// class not applied this is an on switch so add
		} else if (this.type === 'on') {

			this.addClass.apply(this);

		// class applied this is an off switch so remove
		} else if (this.type === 'off') {

			this.removeClass.apply(this);
		}
	}

	// add class of className to target
	addClass() {
		// could be single or multiple targets
		[].forEach.call(this.target, function(el, index) {

			if (Array.isArray(this.className)) {
				if (el.length) {
					[].forEach.call(el, (el1) => {
						el1.classList.add(this.className[index]);
					});
				} else {
					el.classList.add(this.className[index]);
				}
			} else {
				el.classList.add(this.className);
			}

			this.triggerEvent.apply(this, ['added']);
		}.bind(this));

		// optionally add class to element itself
		if (this.self) {
			this.element.classList.add(this.className);
		}
	}

	// remove class of className from target
	removeClass() {
		// could be single or multiple targets
		[].forEach.call(this.target, function(el, index) {

			if (Array.isArray(this.className)) {
				if (el.length) {
					[].forEach.call(el, (el1) => {
						el1.classList.remove(this.className[index]);
					});
				} else {
					el.classList.remove(this.className[index]);
				}
			} else {
				el.classList.remove(this.className);
			}

			this.triggerEvent.apply(this, ['removed']);
		}.bind(this));

		// optionally add class to element itself
		if (this.self) {
			this.element.classList.remove(this.className);
		}
	}

	// switch specific replace class logic
	replaceClass() {
		[].forEach.call(this.target, function(el) {
			el.classList.remove(this.remove);
			el.classList.add(this.add);
			this.triggerEvent.apply(this, ['replaced']);
		}.bind(this));
	}
};
