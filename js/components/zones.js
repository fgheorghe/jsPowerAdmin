/**
 * 'Zones' component class.
 * @class Provides zone functionality, including listing, editing and removing.
 * @constructor
 */
var zones = function() {
        // Create components
        this.init();
}

/**
 * Method used for initialising this component.
 * @function
 */
zones.prototype.init = function() {
        // Create main panel
        this.createPanel();
}

/**
 * Method used for creating the main panel.
 * @function
 * @return {Object} Ext.Panel object.
 */
zones.prototype.createPanel = function() {
        // Create main panel
        this.panel = Ext.create( 'Ext.Panel', {
                title: 'Zones'
        } );

        return this.panel;
}