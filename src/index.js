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

	// toggle constructor
	class Toggle {
		constructor(opts) {
			this.type = opts.type;
			this.element = opts.element;
			this.target = opts.target;
			this.className = opts.class || 'active';
			this.add = opts.add || 'active';
			this.remove = opts.remove || 'inactive';
			this.event = opts.event || 'click';
			this.self = opts.self || false;
			this.stopPropagation = opts.stopPropagation || false;
			this.events = {};

			// if target is empty default to element itself
			this.target = this.target ? document.querySelectorAll(this.target) : [this.element];

			// mark this element as initialised
			this.element.setAttribute('data-toggle-switch', 'toggle');

			// set up toggle custom events
			this._createCustomEvents.apply(this);

			// set up toggle event listeners
			this.bindEventListeners();
		}

		// initialize custom events
		// spotty support for CustomEvent :/
		_createCustomEvents() {
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
		_triggerEvent(event) {
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
		_bindEventListener(event) {
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

		// add class of className to target
		_addClass() {
			// could be single or multiple targets
			[].forEach.call(this.target, function(el) {
				if (el.classList.contains(this.className)) {
					return false;
				}

				el.classList.add(this.className);
				this._triggerEvent.apply(this, ['added']);
			}.bind(this));

			// optionally add class to element itself
			if (this.self) {
				this.element.classList.add(this.className);
			}
		}

		// remove class of className from target
		_removeClass() {
			// could be single or multiple targets
			[].forEach.call(this.target, function(el) {
				if (!el.classList.contains(this.className)) {
					return false;
				}

				el.classList.remove(this.className);
				this._triggerEvent.apply(this, ['removed']);
			}.bind(this));

			// optionally add class to element itself
			if (this.self) {
				this.element.classList.remove(this.className);
			}
		}

		// toggle class of className on target
		_toggleClass() {
			// could be single or multiple targets
			[].forEach.call(this.target, function(el) {
				el.classList.toggle(this.className);
				this._triggerEvent.apply(this, ['toggled']);
			}.bind(this));

			// optionally add class to element itself
			if (this.self) {
				this.element.classList.toggle(this.className);
			}
		}
	}

	// switch constructor
	class Switch extends Toggle {
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
	}

	// data attr API initializers
	var initializers = {
		toggles: (t) => {
			// required params
			let opts = {
				element: t,
				target: t.getAttribute('data-toggle')
			};

			// optional params
			if (t.hasAttribute('data-toggle-class')) {
				opts.class = t.getAttribute('data-toggle-class');
			}

			if (t.hasAttribute('data-toggle-event')) {
				opts.event = t.getAttribute('data-toggle-event');
			}

			if (t.hasAttribute('data-toggle-self')) {
				opts.self = true;
			}

			if (t.hasAttribute('data-toggle-stop-propagation')) {
				opts.stopPropagation = true;
			}

			new Toggle(opts);
		},

		togglesReplace: (t) => {
			// required params
			let opts = {
				type: 'replace',
				element: t,
				target: t.getAttribute('data-toggle-replace'),
				add: t.getAttribute('data-toggle-add'),
				remove: t.getAttribute('data-toggle-remove')
			};

			// optional params
			if (t.hasAttribute('data-toggle-stop-propagation')) {
				opts.stopPropagation = true;
			}

			if (t.hasAttribute('data-toggle-event')) {
				opts.event = t.getAttribute('data-toggle-event');
			}

			new Toggle(opts);
		},

		switchesOn: (s) => {
			// required params
			let opts = {
				type: 'on',
				element: s,
				target: s.getAttribute('data-switch-on')
			};

			// optional params
			if (s.hasAttribute('data-switch-class')) {
				opts.class = s.getAttribute('data-switch-class');
			}

			if (s.hasAttribute('data-switch-event')) {
				opts.event = s.getAttribute('data-switch-event');
			}

			if (s.hasAttribute('data-switch-on-event')) {
				opts.onEvent = s.getAttribute('data-switch-on-event');
			}

			if (s.hasAttribute('data-switch-self')) {
				opts.self = true;
			}

			if (s.hasAttribute('data-switch-stop-propagation')) {
				opts.stopPropagation = true;
			}

			new Switch(opts);
		},

		switchesOff: (s) => {
			// required params
			let opts = {
				type: 'off',
				element: s,
				target: s.getAttribute('data-switch-off')
			};

			// optional params
			if (s.hasAttribute('data-switch-class')) {
				opts.class = s.getAttribute('data-switch-class');
			}

			if (s.hasAttribute('data-switch-event')) {
				opts.event = s.getAttribute('data-switch-event');
			}

			if (s.hasAttribute('data-switch-off-event')) {
				opts.offEvent = s.getAttribute('data-switch-off-event');
			}

			if (s.hasAttribute('data-switch-self')) {
				opts.self = true;
			}

			if (s.hasAttribute('data-switch-stop-propagation')) {
				opts.stopPropagation = true;
			}

			new Switch(opts);
		},

		switchesReplace: (s) => {
			// required params
			let opts = {
				type: 'replace',
				element: s,
				target: s.getAttribute('data-switch-replace'),
				add: s.getAttribute('data-switch-add'),
				remove: s.getAttribute('data-switch-remove')
			};

			// optional params
			if (s.hasAttribute('data-switch-stop-propagation')) {
				opts.stopPropagation = true;
			}

			if (s.hasAttribute('data-switch-event')) {
				opts.event = s.getAttribute('data-switch-event');
			}

			new Switch(opts);
		}
	};

	// select all toggles & switches in provided node and initialize
	function initialize(containerNode) {
		let // use not selector to ensure initialized toggles & switches aren't touched
			notInitialized = ':not([data-toggle-switch])',
			toggles = containerNode.querySelectorAll('[data-toggle]' + notInitialized),
			togglesReplace = containerNode.querySelectorAll('[data-toggle-replace]' + notInitialized),
			switchesOn = containerNode.querySelectorAll('[data-switch-on]' + notInitialized),
			switchesOff = containerNode.querySelectorAll('[data-switch-off]' + notInitialized),
			switchesReplace = containerNode.querySelectorAll('[data-switch-replace]' + notInitialized);

		// set up toggles & switches
		[].forEach.call(toggles, initializers.toggles);
		[].forEach.call(togglesReplace, initializers.togglesReplace);
		[].forEach.call(switchesOn, initializers.switchesOn);
		[].forEach.call(switchesOff, initializers.switchesOff);
		[].forEach.call(switchesReplace, initializers.switchesReplace);
	}

	// create mutation observers for watchers
	(function() {
		// check for mutation observers before using, IE11 only
		if (window.MutationObserver === undefined) {
			return;
		}

		[].forEach.call(document.querySelectorAll('[data-toggle-switch-watch]'), (w) => {
			let observer = new MutationObserver(function(mutations) {
				// target will match between all mutations so just use first
				initialize(mutations[0].target);
			});

			observer.observe(w, {
				childList: true
			});
		});
	})();

	// initialize toggles & switches in entire document
	initialize(document);

})();
