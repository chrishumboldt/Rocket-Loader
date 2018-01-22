/**
@author Chris Humboldt
**/

// Set the defaults
Rocket.defaults.loader = {
   target: '',
   append: false,
   body: '',
   colour: 'grey-blue',
   delay: 0,
   size: 'normal',
   type: 'spinner'
};

Rocket.loader = ({
   target = Rocket.defaults.loader.target,
   append = Rocket.defaults.loader.append,
   body = Rocket.defaults.loader.body,
   colour = Rocket.defaults.loader.colour,
   delay = Rocket.defaults.loader.delay,
   size = Rocket.defaults.loader.size,
   type = Rocket.defaults.loader.type
}) => {
   let loader;
   let hideTarget;

   // Methods
   const action = {
      add() {
         setTimeout(() => {
            hideTarget = Rocket.dom.element(target);
            if (!Rocket.is.element(hideTarget)) { return; }

            if (!Rocket.has.class(hideTarget, 'is-loading')) {
               Rocket.classes.add(hideTarget, 'is-loading');

               if (append) {
                  hideTarget.appendChild(loader);
               } else {
                  hideTarget.style.display = 'none';
                  hideTarget.parentNode.insertBefore(loader, hideTarget);
               }
            }
         }, delay * 1000);
      },
      changeBody(text = '') {
         if (!Rocket.is.element(loader)) { return; }

         const loaderBody = loader.querySelector('.mod-loader-body');
         if (Rocket.is.element(loaderBody) && Rocket.is.string(text)) {
            /*
            Remove child text nodes first.
            Future proof in case the text field becomes more complex.
            */
            const childNodes = loaderBody.childNodes;
            for (let i = 0, len = childNodes.length; i < len; i++) { childNodes[i].parentNode.removeChild(childNodes[i]); }

            // Add new text node
            loaderBody.appendChild(document.createTextNode(text));
         }
      },
      remove(type = '') {
         hideTarget = Rocket.dom.element(target);
         if (!Rocket.is.element(hideTarget)) { return; }

         setTimeout(() => {
            Rocket.classes.remove(hideTarget, 'is-loading');
            hideTarget.style.display = (Rocket.is.string(type)) ? type : '';
            if (Rocket.is.element(loader)) { Rocket.dom.remove(loader); }
         }, 0);
      }
   };

   function createLoader() {
      const loaderContainer = document.createElement('div');
      const loaderInner = document.createElement('div');
      const loaderElement = document.createElement('div');
      let loaderPartsCount = 1;

      loaderContainer.className = `mod-loader _mod-type-${type}`;
      if (colour !== 'grey-blue') { loaderContainer.className += ` _mod-colour-${colour}` }
      if (size !== 'normal') { loaderContainer.className += ` _mod-size-${size}` }
      loaderInner.className = 'mod-loader-inner';
      loaderElement.className = 'mod-loader-element';

      // Loader parts
      switch(type) {
         case 'dots':
            loaderPartsCount = 3;
            break;

         case 'pulse':
            loaderPartsCount = 2;
            break;
      }
      for (let i = 1, len = loaderPartsCount; i <= len; i++) {
         const newPart = document.createElement('div');
         newPart.className = `mod-loader-part-${i}`;
         loaderElement.appendChild(newPart);
      }

      loaderInner.appendChild(loaderElement);

      // Loader text
      if (body.length > 0) {
         const textBody = document.createElement('div');
         textBody.className = 'mod-loader-body';
         textBody.appendChild(document.createTextNode(body));
         loaderInner.appendChild(textBody);
      }

      loaderContainer.appendChild(loaderInner);

      return loaderContainer;
   };

   // Execute
   loader = createLoader();
   action.add();
   return {loader, changeBody: action.changeBody, add: action.add, remove: action.remove};
};
