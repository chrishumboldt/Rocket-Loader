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
var RockMod_Loader;
(function (RockMod_Loader) {
    // Functions
    function applyLoader(elm, options) {
        var loader = createLoader(options);
        var elmDisplay = elm.style.display;
        // Functions
        function add() {
            setTimeout(function () {
                if (elm.getAttribute('data-rocket-loader') !== 'true') {
                    elm.setAttribute('data-rocket-loader', 'true');
                    if (options.append) {
                        elm.appendChild(loader);
                    }
                    else {
                        elm.style.display = 'none';
                        elm.parentNode.insertBefore(loader, elm);
                    }
                }
            }, options.delay * 1000);
        }
        function remove(type) {
            setTimeout(function () {
                if (elm.getAttribute('data-rocket-loader') === 'true') {
                    elm.removeAttribute('data-rocket-loader');
                    if (Rocket.is.element(loader)) {
                        loader.parentNode.removeChild(loader);
                    }
                    if (Rocket.is.element(elm)) {
                        var showType = (Rocket.is.string(type)) ? type : (elmDisplay === '' || elmDisplay === 'none') ? '' : elmDisplay;
                        elm.style.display = showType;
                    }
                }
            });
        }
        ;
        // Execute and return
        add();
        return {
            loader: elm,
            add: add,
            remove: remove
        };
    }
    ;
    function createLoader(options) {
        var loaderContainer = document.createElement('div');
        var loaderInner = document.createElement('div');
        var loader = document.createElement('div');
        loaderContainer.className = 'rocket-loader _t-' + options.type + ' _c-' + options.colour + ' _s-' + options.size;
        loaderInner.className = 'rl-inner';
        loader.className = 'rl-loader';
        // Loader parts
        switch (options.type) {
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
            var textBody = document.createElement('div');
            textBody.className = 'rl-body';
            textBody.innerHTML = options.body;
            loaderInner.appendChild(textBody);
        }
        loaderContainer.appendChild(loaderInner);
        return loaderContainer;
    }
    // Initialiser
    function init(uOptions) {
        // Catch
        if (!Rocket.is.object(uOptions) || (!Rocket.is.string(uOptions.target) && !Rocket.is.element(uOptions.target))) {
            return false;
        }
        // Continue
        var elm = (!Rocket.is.string(uOptions.target)) ? uOptions.target : document.querySelector(uOptions.target);
        // Catch
        if (!Rocket.is.element(elm)) {
            return false;
        }
        // Continue
        var options = {
            target: Rocket.helper.setDefault(uOptions.target, Rocket.defaults.loader.target),
            append: Rocket.helper.setDefault(uOptions.append, Rocket.defaults.loader.append),
            body: Rocket.helper.setDefault(uOptions.body, Rocket.defaults.loader.body),
            colour: Rocket.helper.setDefault(uOptions.colour, Rocket.defaults.loader.colour),
            delay: Rocket.helper.setDefault(uOptions.delay, Rocket.defaults.loader.delay),
            size: Rocket.helper.setDefault(uOptions.size, Rocket.defaults.loader.size),
            type: Rocket.helper.setDefault(uOptions.type, Rocket.defaults.loader.type),
        };
        return applyLoader(elm, options);
    }
    RockMod_Loader.init = init;
    ;
})(RockMod_Loader || (RockMod_Loader = {}));
// Bind to Rocket
Rocket.loader = RockMod_Loader.init;
