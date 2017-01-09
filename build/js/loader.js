var Rocket = (typeof Rocket === 'object') ? Rocket : {};
if (!Rocket.defaults) {
    Rocket.defaults = {};
}
Rocket.defaults.loader = {
    body: '',
    colour: 'grey-blue',
    delay: 0,
    size: 'normal',
    type: 'puff'
};
