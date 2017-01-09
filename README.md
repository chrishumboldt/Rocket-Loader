# Rocket Loader
A simple Javascript loading module.

## Getting Started
You can either download a copy of the source files or install Rocket Loader via NPM.
```
npm install rocket-loader
```

Start by including the necessary files.
```html
<head>
   <link href="rocket-loader/css/loader.min.css" rel="stylesheet" type="text/css">
</head>
<body>
   /* Your content goes here */
   <script src="rocket-loader/js/loader.min.js"></script>
</body>
```

## Basic Example
Below is an example of executing the module complete with required HTML and Javascript.
```html
<div id="example"></div>
<button id="remove">Remove Loader</button>

<script>
var loader = Rocket.loader({
   selector: '#example',
   type: 'pulse'
});
document.getElementById('remove').onclick = function() {
   loader.remove();
};
</script>
```

## Javascript Options
See the different options you have available on module call.

Name | Default | Options | Description
---- | ---- | ---- | ----
`selector` | | | Set the HTML selector. Can also be an element.
`append` | `false` | `true` `false` | Append the loader to the `selector` element.
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

## Rocket Tools
If you are using this module in conjunction with [Rocket Tools](https://github.com/chrishumboldt/Rocket-Tools), then **always** load the Rocket Tools library first. This module extends that library when detected.

## Loaderplate Deprecated
The original library, Loaderplate, has been deprecated. The entire Webplate project is being refactored and rebranded with a new development philosophy. Loaderplate will be maintained only with bug fixes under the **Loaderplate** branch.

## Author
Created and maintained by Chris Humboldt<br>
Website: <a href="http://chrishumboldt.com/">chrishumboldt.com</a><br>
Twitter: <a href="https://twitter.com/chrishumboldt">twitter.com/chrishumboldt</a><br>
GitHub <a href="https://github.com/chrishumboldt">github.com/chrishumboldt</a><br>

## Copyright and License
Copyright 2016 Rocket Project

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
