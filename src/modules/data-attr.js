module.exports = function(Toggle, Switch) {

	// data attr API initializers
	const initializers = {
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
		},

		switchesOnGroup: (s) => {
			let opts = {
				type: 'on',
				element: s,
				target: s.getAttribute('data-switch-on-group')
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

		switchesOffGroup: (s) => {
			// required params
			let opts = {
				type: 'off',
				element: s,
				target: s.getAttribute('data-switch-off-group')
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

		toggleGroup: (t) => {
			// required params
			let opts = {
				element: t,
				target: t.getAttribute('data-toggle-group')
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
			switchesReplace = containerNode.querySelectorAll('[data-switch-replace]' + notInitialized),
			switchesOnGroup = containerNode.querySelectorAll('[data-switch-on-group]' + notInitialized),
			switchesOffGroup = containerNode.querySelectorAll('[data-switch-off-group]' + notInitialized),
			switchesToggleGroup = containerNode.querySelectorAll('[data-toggle-group]' + notInitialized);

		// set up toggles & switches
		[].forEach.call(toggles, initializers.toggles);
		[].forEach.call(togglesReplace, initializers.togglesReplace);
		[].forEach.call(switchesOn, initializers.switchesOn);
		[].forEach.call(switchesOff, initializers.switchesOff);
		[].forEach.call(switchesReplace, initializers.switchesReplace);
		[].forEach.call(switchesOnGroup, initializers.switchesOnGroup);
		[].forEach.call(switchesOffGroup, initializers.switchesOffGroup);
		[].forEach.call(switchesToggleGroup, initializers.switchesToggleGroup);
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
};
