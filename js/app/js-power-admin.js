/**
 * Main application class.
 * @class Provides main user interface, and instantiates application components.
 * @constructor
 */
var jsPowerAdmin = function() {
        // Create components
        this.init();
}

/**
 * Method used for initialising the application.
 * @function
 */
jsPowerAdmin.prototype.init = function() {
        // Prepare main user interface
        this.createMainView();
}

/**
 * Method used for creating the main viewport.
 * @function
 */
jsPowerAdmin.prototype.createMainView = function() {
        // Create viewport
        this.viewPort = Ext.create( 'Ext.container.Viewport', {
                layout: 'border'
                ,items: [
                        this.createCenterPanel()
                        ,this.createMenuPanel()
                ]
        } );
}

/**
 * Method used for creating the center panel.
 * @function
 * @return {Object} Ext.Panel object.
 */
jsPowerAdmin.prototype.createCenterPanel = function() {
        // Create panel
        this.centerPanel = Ext.create( 'Ext.Panel', {
                region: 'center'
        } );

        return this.centerPanel;
}

/**
 * Method used for creating the menu panel.
 * @function
 * @return {Object} Ext.Panel object.
 */
jsPowerAdmin.prototype.createMenuPanel = function() {
        // Create panel
        this.menuPanel = Ext.create( 'Ext.Panel', {
                region: 'west'
                ,title: 'Menu'
                ,width: 150
        } );

        return this.menuPanel;
}

// Instantiate application, once ExtJS is ready
Ext.onReady( function() {
        new jsPowerAdmin();
} );