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
                fields: [ 'id', 'name', 'type', 'records' ]
                ,autoLoad: true
                ,autoSync: true
                ,proxy: {
                        type: 'rest'
                        ,url: '/zones'
                        ,reader: {
                                type: 'json'
                                ,root: 'data'
                        }
                }
        } );

        // Create grid panel
        // TODO: Add remote sorting.
        this.zoneGridPanel = Ext.create( 'Ext.grid.Panel', {
                store: this.zoneStore
                ,columns: [
                        { text: 'Name',  dataIndex: 'name', flex: 1 }
                        ,{ text: 'Type', dataIndex: 'type' }
                        ,{ text: 'Records', dataIndex: 'records' }
                        // TODO: Add owner column.
                ]
        } );

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
 * Method used for creating the zone record grid.
 * @function
 * @return {Object} Ext.grid.Panel object.
 */
zones.prototype.createZoneRecordGrid = function() {
        // Create store
        // TODO: Add remote JSON store.
        // NOTE: Stub.
        this.zoneRecordStore = Ext.create( 'Ext.data.Store', {
                fields: [
                        { name: 'name', type: 'string' }
                        ,{ name: 'type', type: 'string' }
                        ,{ name: 'content', type: 'string' }
                        ,{ name: 'priority', type: 'int' }
                        ,{ name: 'ttl', type: 'int' }
                ]
                ,data: {
                        items: [
                               {
                                        'name': 'www.test.com'
                                        ,'type': 'A'
                                        ,'content': '127.0.0.1'
                                        ,'priority': 1
                                        ,'ttl': 86400
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

        // Prepare row editing plugin
        this.zoneRecordEditingPlugin = Ext.create( 'Ext.grid.plugin.RowEditing', {
                clicksToEdit: 1
        } );

        // Create record type store
        this.recordTypeStore = Ext.create( 'Ext.data.Store', {
                fields: [ 'type' ]
                // TODO: Add numeric identifiers for each type
                ,data: [
                        { type: "A" }
                        ,{ type: "AAAA" }
                        ,{ type: "CNAME" }
                        ,{ type: "HINFO" }
                        ,{ type: "MX" }
                        ,{ type: "NAPTR" }
                        ,{ type: "NS" }
                        ,{ type: "PTR" }
                        ,{ type: "SOA" }
                        ,{ type: "SPF" }
                        ,{ type: "SRV" }
                        ,{ type: "SSHFP" }
                        ,{ type: "TXT" }
                        ,{ type: "RP" }
                ]
        } );

        // Create record type combo
        this.recordTypeCombo = Ext.create( 'Ext.form.ComboBox', {
                store: this.recordTypeStore
                ,queryMode: 'local'
                ,displayField: 'type'
                ,valueField: 'type'
                ,editable: false
        } );

        // Create grid panel
        // TODO: Add remote sorting.
        this.zoneRecordGridPanel = Ext.create( 'Ext.grid.Panel', {
                store: this.zoneRecordStore
                ,plugins: [ this.zoneRecordEditingPlugin ]
                ,tbar: this.createZoneRecordsToolbar()
                ,columns: [
                        { text: 'Name',  dataIndex: 'name', editor: 'textfield' }
                        ,{ text: 'Type', dataIndex: 'type', editor: this.recordTypeCombo }
                        ,{ text: 'Content', dataIndex: 'content', flex: 1, editor: 'textfield' }
                        ,{ text: 'Priority', dataIndex: 'priority', editor: {
                                        xtype: 'numberfield'
                                        ,allowBlank: false
                                        ,minValue: 1
                                        ,maxValue: 86400
                                }
                        }
                        ,{ text: 'TTL', dataIndex: 'ttl', editor: {
                                        xtype: 'numberfield'
                                        ,allowBlank: false
                                        ,minValue: 1
                                        ,maxValue: 86400
                                }
                        }
                ]
        } );

        return this.zoneRecordGridPanel;
}

/**
 * Method used for creating the edit / view zone window.
 * @function
 * @return {Object} Ext.window.Window object.
 */
zones.prototype.createZoneWindow = function() {
        // Prepare grid panel
        this.createZoneRecordGrid();

        // Create window
        this.zoneWindow = Ext.create( 'Ext.window.Window', {
                title: 'Edit zone: [zone name]'
                ,maximized: true
                ,layout: 'fit'
                ,modal: true
                ,maximizable: true
                ,closeAction: 'destroy'
                ,resizable: true
                ,height: 400
                ,width: 600
                ,items: this.zoneRecordGridPanel
                ,bbar: Ext.create( 'Ext.toolbar.Toolbar', {
                        items: [
                                '->'
                                ,{
                                        text: 'Commit'
                                }
                                ,{
                                        text: 'Close'
                                }
                        ]
                } )
        } );

        return this.zoneWindow;
}

/**
 * Method used for creating the zone records top toolbar.
 * @function
 * @return {Object} Ext.toolbar.Toolbar object.
 */
zones.prototype.createZoneRecordsToolbar = function() {
        // Create toolbar
        // TODO: Add functionality
        this.zoneRecordsToolbar = Ext.create( 'Ext.toolbar.Toolbar', {
                items: [
                        ,{
                                text: 'Add record'
                        }
                        ,{
                                text: 'Delete record'
                        }
                ]
        } );

        return this.zoneRecordsToolbar;
}

/**
 * Method used for creating the add master zone window.
 * @function
 * @return {Object} Ext.window.Window object.
 */
zones.prototype.createAddMasterZoneWindow = function() {
        // Create zone type store
        this.masterZoneTypeStore = Ext.create( 'Ext.data.Store', {
                fields: [ 'type', 'typeId' ]
                ,data: [
                        // TODO: Use proper numeric ids
                        { type: "master", typeId: "0" }
                        ,{ type: "native", typeId: "1" }
                ]
        } );

        // Create zone type combo
        this.masterZoneTypeCombo = Ext.create( 'Ext.form.ComboBox', {
                store: this.masterZoneTypeStore
                ,fieldLabel: 'Type'
                ,queryMode: 'local'
                ,displayField: 'type'
                ,valueField: 'typeId'
                ,editable: false
                ,labelAlign: 'right'
        } );

        // Add master zone form
        this.addMasterZoneForm = Ext.create( 'Ext.form.Panel', {
                defaultType: 'textfield'
                ,labelAlign: 'right'
                ,border: false
                ,items: [
                        {
                                fieldLabel: 'Zone Name'
                                ,name: 'name'
                                ,labelAlign: 'right'
                                ,allowBlank: false
                        }
                        ,this.masterZoneTypeCombo
                        // TODO: Add owner, and template
                ]
        } );

        // Create window
        this.addMasterZoneWindow = Ext.create( 'Ext.window.Window', {
                title: 'Add master zone'
                ,layout: 'fit'
                ,modal: true
                ,closeAction: 'destroy'
                ,resizable: false
                ,height: 110
                ,width: 300
                ,items: this.addMasterZoneForm
                ,bbar: Ext.create( 'Ext.toolbar.Toolbar', {
                        items: [
                                '->'
                                ,{
                                        text: 'Create'
                                }
                                ,{
                                        text: 'Close'
                                }
                        ]
                } )
        } );

        return this.addMasterZoneWindow;
}

/**
 * Method used for creating the add slave zone window.
 * @function
 * @return {Object} Ext.window.Window object.
 */
zones.prototype.createAddSlaveZoneWindow = function() {
        // Add master zone form
        this.addSlaveZoneForm = Ext.create( 'Ext.form.Panel', {
                defaultType: 'textfield'
                ,labelAlign: 'right'
                ,border: false
                ,items: [
                        {
                                fieldLabel: 'Zone Name'
                                ,name: 'name'
                                ,labelAlign: 'right'
                                ,allowBlank: false
                                ,labelWidth: 160
                        }
                        ,{
                                fieldLabel: 'IP address of master NS'
                                ,name: 'ip'
                                ,labelAlign: 'right'
                                ,allowBlank: false
                                ,labelWidth: 160
                        }
                        // TODO: Add owner
                ]
        } );

        // Create window
        this.addSlaveZoneWindow = Ext.create( 'Ext.window.Window', {
                title: 'Add slave zone'
                ,layout: 'fit'
                ,modal: true
                ,closeAction: 'destroy'
                ,resizable: false
                ,height: 110
                ,width: 400
                ,items: [
                       this.addSlaveZoneForm
                ]
                ,bbar: Ext.create( 'Ext.toolbar.Toolbar', {
                        items: [
                                '->'
                                ,{
                                        text: 'Create'
                                }
                                ,{
                                        text: 'Close'
                                }
                        ]
                } )
        } );

        return this.addSlaveZoneWindow;
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
                                // TODO: Enable if grid record is selected
                                text: 'Edit zone'
                                ,handler: function() {
                                        // Create window
                                        this.createZoneWindow();

                                        // Display
                                        this.zoneWindow.show();
                                }.bind( this )
                        }
                        ,'-'
                        ,{
                                text: 'Add master zone'
                                ,handler: function() {
                                        // Create window
                                        this.createAddMasterZoneWindow();

                                        // Display
                                        this.addMasterZoneWindow.show();
                                }.bind( this )
                        }
                        ,{
                                text: 'Add slave zone'
                                ,handler: function() {
                                        // Create window
                                        this.createAddSlaveZoneWindow();

                                        // Display
                                        this.addSlaveZoneWindow.show();
                                }.bind( this )
                        }
                        ,'-'
                        ,{
                                text: 'Delete Zone'
                        }
                ]
        } );

        return this.zonesToolbar;
} 