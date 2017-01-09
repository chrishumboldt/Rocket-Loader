"use strict";
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
var RockMod_Loader;
(function (RockMod_Loader) {
    function applyLoader(elm, options) {
        var loader = createLoader(options);
        var elmDisplay = elm.style.display;
        function add() {
            setTimeout(function () {
                if (options.append) {
                    elm.appendChild(loader);
                }
                else {
                    elm.style.display = 'none';
                    elm.parentNode.insertBefore(loader, elm);
                }
            }, options.delay * 1000);
            console.log(options.delay * 1000);
        }
        function remove(type) {
            if (isElement(loader)) {
                loader.parentNode.removeChild(loader);
            }
            if (isElement(elm)) {
                var showType = (typeof type === 'string') ? type : (elmDisplay === '' || elmDisplay === 'none') ? '' : elmDisplay;
                elm.style.display = showType;
            }
        }
        ;
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
        var loader = document.createElement('div');
        loaderContainer.className = 'rocket-loader _t-' + options.type + ' _c-' + options.colour + ' _s-' + options.size;
        loader.className = 'rl-loader';
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
        loaderContainer.appendChild(loader);
        if (options.body.length > 0) {
            var textBody = document.createElement('div');
            textBody.className = 'rl-body';
            textBody.innerHTML = options.body;
            loaderContainer.appendChild(textBody);
        }
        return loaderContainer;
    }
    function isElement(elm) {
        return (elm.nodeType && elm.nodeType === 1) ? true : false;
    }
    ;
    function setDefault(setValue, defaultValue) {
        if (typeof setValue == 'undefined' && typeof defaultValue == 'undefined') {
            return false;
        }
        else if (typeof setValue != 'undefined' && typeof defaultValue == 'undefined') {
            return setValue;
        }
        else if (typeof setValue === typeof defaultValue) {
            return setValue;
        }
        else {
            return defaultValue;
        }
    }
    ;
    function initialiser(uOptions) {
        if (typeof uOptions !== 'object' || (typeof uOptions.selector !== 'string' && !isElement(uOptions.selector))) {
            return false;
        }
        var elm = (typeof uOptions.selector !== 'string') ? uOptions.selector : document.querySelector(uOptions.selector);
        if (!isElement) {
            return false;
        }
        var options = {
            selector: setDefault(uOptions.selector, Rocket.defaults.loader.selector),
            append: setDefault(uOptions.append, Rocket.defaults.loader.append),
            body: setDefault(uOptions.body, Rocket.defaults.loader.body),
            colour: setDefault(uOptions.colour, Rocket.defaults.loader.colour),
            delay: setDefault(uOptions.delay, Rocket.defaults.loader.delay),
            size: setDefault(uOptions.size, Rocket.defaults.loader.size),
            type: setDefault(uOptions.type, Rocket.defaults.loader.type),
        };
        return applyLoader(elm, options);
    }
    ;
    RockMod_Loader.init = initialiser;
})(RockMod_Loader || (RockMod_Loader = {}));
Rocket.loader = RockMod_Loader.init;
