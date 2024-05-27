# NO LONGER SUPPORTED

# Rocket Loader
An animated loader graphic module.

* [Getting Started](#getting-started)
* [Basic Example](#basic-example)
* [Javascript Options](#javascript-options)
	* [Defaults](#defaults)
* [Rebuilding Files](#rebuilding-files)

## Getting Started
Install via NPM.

```
npm install rocket-loader
```

**NOTE** that this module has a dependency [Rocket Tools (28kb)](https://github.com/chrishumboldt/Rocket-Tools) which will automatically be installed as well.

Start by including the necessary files.
```html
<head>
   <link href="rocket-loader/css/loader.min.css" rel="stylesheet" type="text/css">
</head>
<body>
   <!-- Your content goes here -->
   <script src="rocket-tools/js/tools.min.js"></script>
   <script src="rocket-loader/js/loader.min.js"></script>
</body>
```

## Basic Example
Below is an example of executing the module complete with required HTML and Javascript.
```html
<div id="example"></div>
<button id="remove">Remove Loader</button>

<!-- Scripts -->
<script>
const loader = Rocket.loader({
   target: '#example',
   body: 'Loading Something'
});

Rocket.event.add('#remove', 'click', () => { loader.remove(); });
</script>
```

## Javascript Options
See the different options you have available on module call.

Name | Default | Options | Description
---- | ---- | ---- | ----
`target` | | | Set the HTML target. Can also be an element.
`append` | `false` | `true` `false` | Append the loader to the `target` element as opposed to hiding.
`body` | | | **NOTE** that an empty value will display no text.
`colour` | `grey-blue` | `aqua` `black` `blue` `green` `grey-blue` `grey-blue-dark` `orange` `pink` `purple` `red` `white` `yellow` | Set the loader colour.
`delay` | 0 | | Set a delay (in seconds) on the loader showing.
`size` | `normal` | `small` `normal` `large` | Set the size of the loader and its padding.
`type` | `spinner` | `dots` `pulse` `spinner` | Set the loader type.

#### Defaults
You can also overwrite the options globally by altering the Rocket defaults. To do so reference the defaults object property, for example:

```javascript
Rocket.defaults.loader.body = 'Loading';
Rocket.defaults.loader.type = 'dots';
```

## Rebuilding Files
In order to rebuild production files you will first need to install the [Rocket Command Line Tool](https://github.com/chrishumboldt/Rocket-Command). To do so run the following npm command in your terminal. **NOTE** that this package is installed globally and can take a while as it has quite a few dependencies.

```
npm install rocket-command -g
```

Once installed navigate to the Rocket Loader root and run the following command:

```
rocket build
```

The relevant minified CSS and JS will now be rebuilt.

## Author
Created and maintained by Chris Humboldt<br>
Website: <a href="http://chrishumboldt.com/">chrishumboldt.com</a><br>
GitHub <a href="https://github.com/chrishumboldt">github.com/chrishumboldt</a><br>

## Copyright and License
Copyright 2018 Rocket Project

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
