module.exports = class Toggle {
	constructor(opts) {
		this.type = opts.type;
		this.element = opts.element;
		this.target = this.checkIsArray(opts.target);
		this.className = this.checkIsArray(opts.class) || 'active';
		this.add = opts.add || 'active';
		this.remove = opts.remove || 'inactive';
		this.event = opts.event || 'click';
		this.self = opts.self || false;
		this.stopPropagation = opts.stopPropagation || false;
		this.events = {};

		// if target is empty default to element itself
		// TODO: check if first and last chars are brackets
		// if so create an array with each node
		if (Array.isArray(this.target)) {
			// loop through and create nodes
			this.target.forEach(function(el, index) {
				this.target[index] = document.querySelector(el);
			});

		} else {
			this.target = this.target ? document.querySelectorAll(this.target) : [this.element];
		}

		// mark this element as initialised
		this.element.setAttribute('data-toggle-switch', 'toggle');

		// set up toggle custom events
		this._createCustomEvents.apply(this);

		// set up toggle event listeners
		this.bindEventListeners();
	}

	// initialize custom events
	// spotty support for CustomEvent :/
	createCustomEvents() {
		// create 4 types of event
		this.events = {
			'toggled': document.createEvent('Event'),
			'added': document.createEvent('Event'),
			'removed': document.createEvent('Event'),
			'replaced': document.createEvent('Event')
		};

		this.events.toggled.initEvent('ToggleSwitch.toggled', true, true);
		this.events.added.initEvent('ToggleSwitch.added', true, true);
		this.events.removed.initEvent('ToggleSwitch.removed', true, true);
		this.events.replaced.initEvent('ToggleSwitch.replaced', true, true);
	}

	// cross browser event trigger
	triggerEvent(event) {
		// no event name supplied or invalid
		// instance has no element
		if (!event || typeof event !== 'string' || !this.element) {
			return false;
		}

		// check event exists
		let evt = this.events[event];
		if (!evt) {
			return false;
		}

		// trigger event
		this.element.dispatchEvent(evt);
	}

	bindEventListeners() {
		let events = this.event.split(',');

		// will be array of length 1 if single event
		events.forEach(function(event) {
			this._bindEventListener.apply(this, [event]);
		}.bind(this));
	}

	// bind a single event listener
	bindEventListener(event) {
		this.element.addEventListener(event, function(e) {
			e.preventDefault();

			// optional propagation halt
			if (this.stopPropagation) {
				e.stopPropagation();
			}

			this.fire();
		}.bind(this));
	}

	// fire toggle
	fire() {
		if (this.type === 'replace') {
			this.replaceClass();
		} else {
			this._toggleClass.apply(this);
		}
	}

	// toggle specific replace class logic
	replaceClass() {
		[].forEach.call(this.target, function(el) {
			// element contains neither class
			// or element contains class that should be removed
			if ((!el.classList.contains(this.remove) && !el.classList.contains(this.add)) ||
				el.classList.contains(this.remove)) {

				el.classList.remove(this.remove);
				el.classList.add(this.add);

			// element contains that was added so reverse logic
			} else if (el.classList.contains(this.add)) {
				el.classList.add(this.remove);
				el.classList.remove(this.add);
			}

			this._triggerEvent.apply(this, ['replaced']);
		}.bind(this));
	}

	// toggle class of className on target
	toggleClass() {
		// could be single or multiple targets
		[].forEach.call(this.target, function(el, index) {

			if (Array.isArray(this.className)) {
				el.classList.toggle(this.className[index]);
			} else {
				el.classList.toggle(this.className);
			}

			this._triggerEvent.apply(this, ['toggled']);
		}.bind(this));

		// optionally add class to element itself
		if (this.self) {

			// if class name is an array then just use active for self
			if (Array.isArray(this.className)) {
				this.element.classList.toggle('active');
			} else {
				this.element.classList.toggle(this.className);
			}

		}
	}
};
