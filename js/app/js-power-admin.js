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
        // Prepare the 'Zones' component
        this.zones = new zones();

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
 * @return {Object} Ext.tab.Panel object.
 */
jsPowerAdmin.prototype.createCenterPanel = function() {
        // Create panel
        this.centerPanel = Ext.create( 'Ext.tab.Panel', {
                region: 'center'
                ,layout: 'accordion'
                ,items: [
                        this.zones.panel
                ]
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
                ,layout: 'fit'
                ,title: 'Menu'
                ,width: 150
                ,split: true
                ,collapsible: true
                ,items: this.createMenuTree()
        } );

        return this.menuPanel;
}

/**
 * Method used for handling menu item click events.
 * @function
 */
jsPowerAdmin.prototype.menuItemClick = function( menuTreePanel, record, item, index, e, eOpts ) {
        // TODO: Implement.
}

/**
 * Method used for creating the menu tree panel.
 * @function
 * @return {Object} Ext.tree.Panel object.
 */
jsPowerAdmin.prototype.createMenuTree = function() {
        // Create menu store
        this.menuStore = Ext.create( 'Ext.data.TreeStore', {
                root: {
                        expanded: true
                        ,children: [
                                {
                                        text: "View Zones"
                                        ,leaf: true
                                        ,component: this.zones
                                }
                        ]
                }
        } );

        // Create the panel
        this.menuTreePanel = Ext.create( 'Ext.tree.Panel', {
                store: this.menuStore
                ,border: false
                ,frame: false
                ,rootVisible: false
                ,listeners: {
                        itemclick: this.menuItemClick.bind( this )
                }
        } );

        return this.menuTreePanel;
}

// Instantiate application, once ExtJS is ready
Ext.onReady( function() {
        new jsPowerAdmin();
} );