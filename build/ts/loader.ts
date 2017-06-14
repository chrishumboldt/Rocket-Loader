/**
@author Chris Humboldt
**/

// Rocket module extension
Rocket.defaults.loader = {
   target: '',
   append: false,
   body: '',
   colour: 'grey-blue',
   delay: 0,
   size: 'normal',
   type: 'spinner'
};

// Module container
module RockMod_Loader {
   // Functions
   function applyLoader(elm: any, options: options) {
      let loader = createLoader(options);
      let elmDisplay = elm.style.display;

      // Functions
      function add() {
         setTimeout(() => {
            if (elm.getAttribute('data-rocket-loader') !== 'true') {
               elm.setAttribute('data-rocket-loader', 'true');

               if (options.append) {
                  elm.appendChild(loader);
               } else {
                  elm.style.display = 'none';
                  elm.parentNode.insertBefore(loader, elm);
               }
            }
         }, options.delay * 1000);
      }

      function remove(type: string) {
         setTimeout(() => {
            if (elm.getAttribute('data-rocket-loader') === 'true') {
               elm.removeAttribute('data-rocket-loader');

               if (Rocket.is.element(loader)) {
                  loader.parentNode.removeChild(loader);
               }
               if (Rocket.is.element(elm)) {
                  let showType = (Rocket.is.string(type)) ? type : (elmDisplay === '' || elmDisplay === 'none') ? '' : elmDisplay;
                  elm.style.display = showType;
               }
            }
         });
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
      const loaderInner = document.createElement('div');
      const loader = document.createElement('div');

      loaderContainer.className = 'rocket-loader _t-' + options.type + ' _c-' + options.colour + ' _s-' + options.size;
      loaderInner.className = 'rl-inner';
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
      loaderInner.appendChild(loader);

      // Loader text
      if (options.body.length > 0) {
         const textBody = document.createElement('div');
         textBody.className = 'rl-body';
         textBody.innerHTML = options.body;
         loaderInner.appendChild(textBody);
      }
      loaderContainer.appendChild(loaderInner);

      return loaderContainer;
   }

   // Initialiser
   export function init(uOptions: options) {
      // Catch
      if (!Rocket.is.object(uOptions) || (!Rocket.is.string(uOptions.target) && !Rocket.is.element(uOptions.target))) {
         return false;
      }

      // Continue
      const elm = (!Rocket.is.string(uOptions.target)) ? uOptions.target : document.querySelector(uOptions.target);

      // Catch
      if (!Rocket.is.element(elm)) {
         return false;
      }

      // Continue
      const options = {
         target: Rocket.helper.setDefault(uOptions.target, Rocket.defaults.loader.target),
         append: Rocket.helper.setDefault(uOptions.append, Rocket.defaults.loader.append),
         body: Rocket.helper.setDefault(uOptions.body, Rocket.defaults.loader.body),
         colour: Rocket.helper.setDefault(uOptions.colour, Rocket.defaults.loader.colour),
         delay: Rocket.helper.setDefault(uOptions.delay, Rocket.defaults.loader.delay),
         size: Rocket.helper.setDefault(uOptions.size, Rocket.defaults.loader.size),
         type: Rocket.helper.setDefault(uOptions.type, Rocket.defaults.loader.type),
      };

      return applyLoader(elm, options);
   };
}

// Bind to Rocket
Rocket.loader = RockMod_Loader.init;
