/**
 * File: loaderplate.js
 * Type: Javascript component
 * Author: Chris Humboldt
 */

// Table of contents
// ---------------------------------------------------------------------------------------
// Variables
// Options
// Tools
// Check

var loaderplate = function($userOptions) {
   // Variables
   var $self = this;
   var $loader, $element, $loaderTimeout;

   // Options
   $userOptions = $userOptions || false;
   $self.options = {
      body: $userOptions.body || false,
      colour: $userOptions.colour || 'blue',
      delay: ($userOptions.delay >= 0) ? $userOptions.delay : 400,
      path: $userOptions.path || './loaders/',
      selector: $userOptions.selector || false,
      size: $userOptions.size || 'normal',
      type: $userOptions.type || 'puff'
   }

   // Tools
   var tool = function(document, $options) {
      // HTML
      var $loaderHTML = document.createElement('div');
      var $loaderImg = document.createElement('img');
      $loaderHTML.className = 'loaderplate ' + $options.colour + ' ' + $options.size;
      $loaderImg.setAttribute('src', $options.path + 'svg-loaders-' + $options.colour + '/' + $options.type + '.svg');
      $loaderHTML.appendChild($loaderImg);
      if ($options.body !== false) {
         var $loaderBody = document.createElement('div');
         $loaderBody.innerHTML = $options.body;
         $loaderHTML.appendChild($loaderBody);
      }

      var $toolHtml = {
         loader: $loaderHTML
      };

      // Elements
      var $toolEl = {
         body: document.getElementsByTagName('body')[0],
         html: document.getElementsByTagName('html')[0]
      };

      // Functions
      var classAdd = function($element, $class) {
         var $crtClass = $element.className;
         if ($crtClass.match(new RegExp('\\b' + $class + '\\b', 'g')) === null) {
            $element.className = $crtClass === '' ? $class : $crtClass + ' ' + $class;
         }
      };
      var classClear = function($element) {
         $element.removeAttribute('class');
      };
      var classRemove = function($element, $class) {
         if ($element.className.indexOf($class) > -1) {
            $element.className = $element.className.split(' ').filter(function($val) {
               return $val != $class;
            }).toString().replace(/,/g, ' ');
            if ($element.className === '') {
               classClear($element);
            }
         }
      };
      var exists = function($element) {
         if ($element === null || typeof($element) === undefined) {
            return false;
         } else {
            return true;
         }
      };
      var isTouch = function() {
         return 'ontouchstart' in window || 'onmsgesturechange' in window;
      };

      // Return
      return {
         classAdd: classAdd,
         classClear: classClear,
         classRemove: classRemove,
         element: $toolEl,
         exists: exists,
         html: $toolHtml,
         isTouch: isTouch
      }
   }(document, $self.options);

   // Public functions
   $self.add = function() {
      if ($self.options.selector !== false) {
         $element = document.querySelector($self.options.selector);
         $loader = tool.html.loader;
         if (tool.exists($element)) {
            $loaderTimeout = setTimeout(function() {
               tool.classAdd($element, 'loaderplate-element-hide');
               $element.parentNode.insertBefore($loader, $element);
            }, $self.options.delay);
         }
      }
   };
   $self.remove = function() {
      if (tool.exists($loader.parentNode)) {
         $loader.parentNode.removeChild($loader);
         tool.classRemove($element, 'loaderplate-element-hide');
      } else {
         clearTimeout($loaderTimeout);
      }
   };

   // Calls
   $self.add();
};
