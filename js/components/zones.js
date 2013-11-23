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
        // Prepare view grid
        this.createZoneGridPanel();

        // Create main panel
        this.createPanel();
}

/**
 * Method used for creating the zone grid panel.
 * @function
 * @return {Object} Ext.grid.Panel object.
 */
zones.prototype.createZoneGridPanel = function() {
        // Create store
        // TODO: Add remote JSON store.
        // NOTE: Stub.
        this.zoneStore = Ext.create( 'Ext.data.Store', {
                fields: [ 'name', 'type', 'records' ]
                ,data: {
                        items: [
                               {
                                        'name': 'test.com'
                                        ,'type': 'master'
                                        ,'records': 1
                               }
                        ]
                }
                ,proxy: {
                       type: 'memory'
                       ,reader: {
                                type: 'json'
                                ,root: 'items'
                        }
                }
        } );

        // Create grid panel
        // TODO: Add remote sorting.
        this.zoneGridPanel = Ext.create('Ext.grid.Panel', {
                store: this.zoneStore
                ,columns: [
                        { text: 'Name',  dataIndex: 'name', flex: 1 }
                        ,{ text: 'Type', dataIndex: 'type' }
                        ,{ text: 'Records', dataIndex: 'records' }
                        // TODO: Add owner column.
                ]
                ,height: 200
                ,width: 400
        });

        return this.zoneGridPanel;
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
                ,tbar: this.createZonesToolbar()
                ,layout: 'fit'
                ,items: this.zoneGridPanel
        } );

        return this.panel;
}

/**
 * Method used for creating the zones top toolbar.
 * @function
 * @return {Object} Ext.toolbar.Toolbar object.
 */
zones.prototype.createZonesToolbar = function() {
        // Create toolbar
        // TODO: Add functionality
        this.zonesToolbar = Ext.create( 'Ext.toolbar.Toolbar', {
                items: [
                        {
                                text: 'View zone'
                        }
                        ,'-'
                        ,{
                                text: 'Add master zone'
                        }
                        ,{
                                text: 'Add slave zone'
                        }
                        ,'-'
                        ,{
                                text: 'Edit Zone'
                        }
                        ,'-'
                        ,{
                                text: 'Delete Zone'
                        }
                ]
        } );

        return this.zonesToolbar;
} 