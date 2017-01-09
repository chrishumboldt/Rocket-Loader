/**
 * Author: Chris Humboldt
**/

import { options } from './interfaces';

// Rocket module extension
// NOTE: You do not need Rocket for this module to be used.
// This allows you to extend Rocket or use independently. Both will work.
var Rocket = (typeof Rocket === 'object') ? Rocket : {};
if (!Rocket.defaults) {
	Rocket.defaults = {};
}
Rocket.defaults.loader = {
   selector: '',
   append: false,
   body: '',
   colour: 'grey-blue',
   delay: 0,
   size: 'normal',
   type: 'spinner'
};

// Module
module RockMod_Loader {
   // Functions
   function applyLoader(elm: any, options: options) {
      let loader = createLoader(options);
      let elmDisplay = elm.style.display;

      // Functions
      function add() {
         setTimeout(function () {
            if (options.append) {
               elm.appendChild(loader);
            } else {
               elm.style.display = 'none';
               elm.parentNode.insertBefore(loader, elm);
            }
         }, options.delay * 1000);
         console.log(options.delay * 1000);
      }

      function remove(type: string) {
         if (isElement(loader)) {
            loader.parentNode.removeChild(loader);
         }
         if (isElement(elm)) {
            let showType = (typeof type === 'string') ? type : (elmDisplay === '') ? '' : elmDisplay;
            elm.style.display = showType;
         }
      };

      // Execute and return
      add();
      return {
         loader: elm,
         add: add,
         remove: remove
      }
   };

   function createLoader(options: options) {
      const loaderContainer = document.createElement('div');
      const loader = document.createElement('div');
      loaderContainer.className = 'rocket-loader _t-' + options.type + ' _c-' + options.colour + ' _s-' + options.size;
      loader.className = 'rl-loader';

      // Loader parts
      switch(options.type) {
         case 'dots':
            loader.innerHTML = '<div class="part-one"></div><div class="part-two"></div><div class="part-three"></div>';
            break;

         case 'pulse':
            loader.innerHTML = '<div class="part-one"></div><div class="part-two"></div>';
            break;

         default:
            loader.innerHTML = '<div class="part-one"></div>';
      }
      loaderContainer.appendChild(loader);

      // Loader text
      if (options.body.length > 0) {
         const textBody = document.createElement('div');
         textBody.className = 'rl-body';
         textBody.innerHTML = options.body;
         loaderContainer.appendChild(textBody);
      }
      return loaderContainer;
   }

   function isElement(elm: any) {
      return (elm.nodeType && elm.nodeType === 1) ? true : false;
   };

   function setDefault(setValue: any, defaultValue: any) {
      if (typeof setValue == 'undefined' && typeof defaultValue == 'undefined') {
         return false;
      } else if (typeof setValue != 'undefined' && typeof defaultValue == 'undefined') {
         return setValue;
      } else if (typeof setValue === typeof defaultValue) {
         return setValue;
      } else {
         return defaultValue;
      }
   };

   // Initialiser
   function initialiser(uOptions: options) {
      // Catch
      if (typeof uOptions !== 'object' || (typeof uOptions.selector !== 'string' && !isElement(uOptions.selector))) {
         return false;
      }
      // Continue
      const elm = (typeof uOptions.selector !== 'string') ? uOptions.selector : document.querySelector(uOptions.selector);
      // Catch
      if (!isElement) {
         return false;
      }
      // Continue
      const options = {
         selector: setDefault(uOptions.selector, Rocket.defaults.loader.selector),
         append: setDefault(uOptions.append, Rocket.defaults.loader.append),
         body: setDefault(uOptions.body, Rocket.defaults.loader.body),
         colour: setDefault(uOptions.colour, Rocket.defaults.loader.colour),
         delay: setDefault(uOptions.delay, Rocket.defaults.loader.delay),
         size: setDefault(uOptions.size, Rocket.defaults.loader.size),
         type: setDefault(uOptions.type, Rocket.defaults.loader.type),
      };

      return applyLoader(elm, options);
   };

   // Export
   export const init = initialiser;
}

// Bind to Rocket
Rocket.loader = RockMod_Loader.init;
