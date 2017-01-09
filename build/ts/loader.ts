/**
 * Author: Chris Humboldt
**/

// Rocket module extension
// NOTE: You do not need Rocket for this module to be used.
// This allows you to extend Rocket or use independently. Both will work.
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

// Module
module RockMod_Loader {}
