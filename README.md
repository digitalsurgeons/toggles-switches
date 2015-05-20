# Toggles & Switches

**Toggles & Swicthes** were born out of [Gumby Framework](http://gumbyframework.com), a responsive [Sass](http://sass-lang.com/) framework built by [Digital Surgeons](http://www.digitalsurgeons.com/). Now a standalone library, **Toggles & Switches** aims to eliminate boilerplate UI code and provide a declarative syntax for applying CSS states and animations based on user interaction. Check out the [demo page](http://dsurgeons.github.io/Toggles-Switches/) for real world examples.

CSS is powerful and usually handles a good deal of UI state and animation alone. Because pseudo states only exist for :hover, :active, :focus and :visited, developers must rely on JavaScript to bind to other user interaction events and add or remove CSS classes accordingly.

Something like this look familiar?

	$('.my-btn').click(function() {
		$('.something').toggleClass('.active');
	});

This can get cumbersome and time-consuming and **Toggles & Switches** are here to help.

Using a declarative syntax, classes can be added, removed, toggled and replaced based on user interaction, without writing a single line of JavaScript.

## Installation ##

To get started, install the [Bower](http://bower.io/) package or directly download toggles-switches.js and include in your page or as part of a build process. And that's it! Everything else is expressed using data-attributes directly within your HTML, read on for more.

	# install package with Bower
	$ bower install --save toggles-switches

## Toggles

Here's a basic Toggle performing the same function as the above jQuery code.

	<button data-toggle=".something"></button>

When clicked, this button will toggle a class of active on the result of the selector specified in the data-toggle attribute. This is the same as the above jQuery code.

You can customize a toggle further.

	<button data-toggle=".something" data-toggle-class="random"></button>

This will toggle a class of random on the result of the selector specified in the data-toggle attribute. The full list of toggle options can be seen below.

## Switches

Switches behave in a similar way to toggles except that they will either add (switch on) or remove (switch off) a class on an element, as opposed to toggling back and forth.

	<button data-switch-on=".something"></button>
	<button data-switch-off=".something-else"></button>

When clicked, the first button will add a class of active to the result of the selector specified in the data-switch attribute. The second button will remove the active class from the result of the selector specified in the data-switch attribute.

You can customize a switch further.

	<button data-switch-on=".something"
			data-switch-class="random"
			data-switch-event="mouseover"></button>

This will add a class of random to the result of the selector specified in the data-switch attribute when the mouseover event is fired. The full list of switch options can be seen below.

## Replacers

Both Toggles and Switches can be replacers. A Switch Replacer will add one class to a given selector and remove another, a Toggle Replace will toggle back and forth on further interactions.

	<button data-switch-replace=".something"
			data-switch-add="active"
			data-switch-remove="inactive"></button>

	<button data-toggle-replace=".something"
			data-toggle-add="active"
			data-toggle-remove="inactive"></button>

## Composition ##

The building blocks covered above can be composed to create some pretty impressive UI's without having to write a single line of JavaScript.

Here's a more complex example

	<button data-toggle-replace=".something, .something-else > a"
			data-toggle-event="mouseover,mouseout"
			data-toggle-add="activated"
			data-toggle-remove="inactivated"

			data-switch-on=".this-thing"
			data-switch-off=".this-other-thing"></button>

Here's another using the change event on a `select` element

	<select data-toggle=".something"
			data-toggle-event="change"
			data-switch-off=".something-else"
			data-switch-event="mouseover">

			<option>Option 1</option>
			<option>Option 2</option>
	</select>

Here's one more using the keyup event on a text input

	<input type="text"
		   data-switch-on
		   data-switch-off=".something"
		   data-switch-event="keyup"
		   data-switch-class="typing"
		   data-stop-propagation />


## Events

Custom events are triggered on all **Toggles & Switches**, you can bind to these events to add extra functionality to your UI in places where JavaScript needs to take over. All events are namspaced as ToggleSwitch, full list of events below. It's important to remember that these events are toggled on the toggle or switch itself and not the target element.

	btn.addEventListener('ToggleSwitch.toggled', function() {
		console.log("Toggled!", this);
	});

	btn.addEventListener('ToggleSwitch.added', function() {
		console.log("Added!", this);
	});

	btn.addEventListener('ToggleSwitch.removed', function() {
		console.log("Removed!", this);
	});

	btn.addEventListener('ToggleSwitch.replaced', function() {
		console.log("Replaced!", this);
	});

## API Reference

Here is a complete list of the five **Toggles & Switches** components along with their various options.

### data-toggle ####

Toggle a class on a given selector.

| Attribute                      | Description
| ------------------------------ | ------------------------------------------------------
| **data-toggle**                | Initialize a toggle and specify the target selector, leave empty to target the element itself.
| data-toggle-class              | The class that should be toggled, default 'active'
| data-toggle-event              | The event the class should be toggled on
| data-toggle-self               | If set the class will also be applied to the element itself
| data-toggle-stop-propagation   | Call e.stopPropagation() after user interaction

### data-toggle-replace ####

Toggle between two classes on a given selector.

| Attribute                      | Description
| ------------------------------ | ------------------------------------------------------
| **data-toggle-replace**        | Initialize a replacer toggle and specify the target selector, leave empty to target the element itself.
| data-toggle-add                | The class to be added first, default 'active'
| data-toggle-remove             | The class to be removed first, default 'inactive'
| data-toggle-event              | The event the class should be toggled on
| data-toggle-self               | If set the class will also be applied to the element itself
| data-toggle-stop-propagation   | Call e.stopPropagation() after user interaction

### data-switch-on ####

Add a class to a given selector.

| Attribute                      | Description
| ------------------------------ | ------------------------------------------------------
| **data-switch-on**             | Initialize an on switch and specify the target selector, leave empty to target the element itself.
| data-switch-class              | The class to be added, default 'active'
| data-switch-event              | The event the class should be switched on
| data-switch-self               | If set the class will also be applied to the element itself
| data-switch-stop-propagation   | Call e.stopPropagation() after user interaction

### data-switch-off ####

Remove a class from a given selector.

| Attribute                      | Description
| ------------------------------ | ------------------------------------------------------
| **data-switch-off**            | Initialize an off switch and specify the target selector, leave empty to target the element itself.
| data-switch-class              | The class to be removed, default 'active'
| data-switch-event              | The event the class should be switched on
| data-switch-self               | If set the class will also be applied to the element itself
| data-switch-stop-propagation   | Call e.stopPropagation() after user interaction

### data-switch-replace ####

Add one class and remove another from an element.

| Attribute                      | Description
| ------------------------------ | ------------------------------------------------------
| **data-switch-replace**        | Initialize a replacer switch and specify the target selector, leave empty to target the element itself.
| data-switch-add                | The class to be added, default 'active'
| data-switch-remove             | The class to be removed, default 'inactive'
| data-switch-event              | The event the class should be switched on
| data-switch-self               | If set the class will also be applied to the element itself
| data-switch-stop-propagation   | Call e.stopPropagation() after user interaction

## Browser Support ##

**Toggles & Switches** supports all major browsers including IE 11/10. For IE9 support you will need to include a ClassList polyfill such as the one found in [Remy Sharp's HTML5 Polyfills project](https://github.com/remy/polyfills). Once classList is polyfilled, **Toggles & Switches** will run as expected in IE9.


**MIT License (MIT)**

Copyright (c) 2015 Digital Surgeons

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
