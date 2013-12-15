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
        // Prepare variables
        this.selectedZoneId = null;
        this.selectedZoneName = null;

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
        // TODO: Add sorting and field data typing (perhaps all other database fields?).
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

        // Item single click listener
        this.zoneGridPanelItemClickListener = function( grid, record, item, index, e, eOpts ) {
                // Set selected zone variables
                this.selectedZoneId = record.data.id;
                this.selectedZoneName = record.data.name;

                // Enable edit and delete zone buttons
                this.editZoneButton.setDisabled( false );
                this.deleteZoneButton.setDisabled( false );
        }

        // Item double click listener
        this.zoneGridPanelItemDblClickListener = function( grid, record, item, index, e, eOpts ) {
                // Create window
                this.createZoneWindow();

                // Display
                this.zoneWindow.show();
        }

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
                ,listeners: {
                        itemclick: this.zoneGridPanelItemClickListener.bind( this )
                        ,itemdblclick: this.zoneGridPanelItemDblClickListener.bind( this )
                }
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
        // Define a record model
        Ext.define( 'Record', {
                extend: 'Ext.data.Model'
                ,fields: [
                        { name: 'id', type: 'int' }
                        ,{ name: 'name', type: 'string' }
                        ,{ name: 'type', type: 'string' }
                        ,{ name: 'content', type: 'string' }
                        ,{ name: 'prio', type: 'int' }
                        ,{ name: 'ttl', type: 'int' }
                ]
        } );

        // Create store
        // TODO: Add sorting and editing (perhaps all other database fields?).
        // NOTE: Stub.
        this.zoneRecordStore = Ext.create( 'Ext.data.Store', {
                model: 'Record'
                ,autoLoad: true
                ,autoSync: true
                ,proxy: {
                        type: 'rest'
                        ,url: '/records/' + this.selectedZoneId
                        ,reader: {
                                type: 'json'
                                ,root: 'data'
                        }
                        ,writer: {
                                // Custom write function!
                                write: function( request ) {
                                        // Get selected record.
                                        var record = this.zoneRecordGridPanel.getSelectionModel().getSelection()[0].data;

                                        // Set parameters.
                                        request.params = {
                                                name: record.name
                                                ,type: record.type
                                                ,content: record.content
                                                ,prio: record.prio
                                                ,ttl: record.ttl
                                        };

                                        // "Fix" URL, by replacing records with record.
                                        var url = request.url.split( "/" );
                                        url[1] = "record";
                                        request.url = url.join( "/" );

                                        // Return the configured request object.
                                        return request;
                                }.bind( this )
                        }
                }
        } );

        // Prepare row editing plugin
        this.zoneRecordEditingPlugin = Ext.create( 'Ext.grid.plugin.RowEditing', {
                clicksToEdit: 1
        } );

        // Create record type store
        this.recordTypeStore = Ext.create( 'Ext.data.Store', {
                fields: [ 'type', 'id' ]
                ,data: config.record_types
        } );

        // Create record type combo
        this.recordTypeCombo = Ext.create( 'Ext.form.ComboBox', {
                store: this.recordTypeStore
                ,queryMode: 'local'
                ,displayField: 'type'
                ,valueField: 'type'
                ,editable: false
                ,triggerAction: 'all'
        } );

        // Prepare listener
        this.zoneRecordGridPanelItemClickListener = function() {
                // Enable delete button.
                this.deleteZoneRecordButton.setDisabled( false );
        }

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
                        ,{ text: 'Priority', dataIndex: 'prio', editor: {
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
                ,listeners: {
                        itemclick: this.zoneRecordGridPanelItemClickListener.bind( this )
                }
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
                title: 'Edit zone: ' + this.selectedZoneName
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
                                        text: 'Close'
                                        ,handler: function() {
                                                this.zoneWindow.close();
                                        }.bind( this )
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
        // Create delete record button
        this.deleteZoneRecordButton = Ext.create( 'Ext.button.Button', {
                text: 'Delete record'
                ,disabled: true
                ,handler: function() {
                        var record = this.zoneRecordGridPanel.getSelectionModel().getSelection()[0].data;
                        // Create confirm dialog.
                        Ext.Msg.show( {
                               title: 'Delete record?'
                               ,msg: 'Delete record \'' + record.name + '\'?'
                               ,buttons: Ext.Msg.YESNO
                               ,icon: Ext.Msg.QUESTION
                               ,fn: function( btn ) {
                                       if ( btn === "yes" ) {
                                               // Trigger request
                                               Ext.Ajax.request( {
                                                       url: '/record/' + this.selectedZoneId + '/' + record.id
                                                       ,method: 'DELETE'
                                                        // TODO: Add proper error handling.
                                                       ,success: function() {
                                                              // Reload grid data
                                                              this.zoneRecordGridPanel.getStore().load();

                                                              // Disable button.
                                                              this.deleteZoneRecordButton.setDisabled( true );
                                                       }.bind( this )
                                               } );
                                       }
                                }.bind( this )
                        } );
                }.bind( this )
        } );

        // Create toolbar
        // TODO: Add functionality
        this.zoneRecordsToolbar = Ext.create( 'Ext.toolbar.Toolbar', {
                items: [
                        ,{
                                text: 'Add record'
                                ,handler: function() {
                                        // Create record name field
                                        var recordName = Ext.create( 'Ext.form.field.Text', {
                                                fieldLabel: 'Name'
                                                ,labelAlign: 'right'
                                        } )
                                        // Create priority field
                                        // TODO: Add proper minValue for both Prio and TTL?
                                        ,recordPriority = Ext.create( 'Ext.form.field.Number', {
                                                minValue: 0
                                                ,fieldLabel: 'Priority'
                                                ,labelAlign: 'right'
                                                ,value: config.record_defaults.prio
                                        } )
                                        // Create ttl field
                                        ,recordTtl = Ext.create( 'Ext.form.field.Number', {
                                                minValue: 0
                                                ,fieldLabel: 'TTL'
                                                ,labelAlign: 'right'
                                                ,value: config.record_defaults.ttl
                                        } )
                                        // Create content field
                                        ,recordContent = Ext.create( 'Ext.form.field.Text', {
                                                fieldLabel: 'Content'
                                                ,labelAlign: 'right'
                                        } )
                                        // Create record type combo
                                        ,recordTypeCombo = Ext.create( 'Ext.form.ComboBox', {
                                                store:  Ext.create( 'Ext.data.Store', {
                                                        fields: [ 'type', 'id' ]
                                                        ,data: config.record_types
                                                } )
                                                ,queryMode: 'local'
                                                ,displayField: 'type'
                                                ,valueField: 'type'
                                                ,editable: false
                                                ,labelAlign: 'right'
                                                ,fieldLabel: 'Type'
                                        } )
                                        // Create a window, to populate record with data.
                                        ,addRecordWindow = Ext.create( 'Ext.Window', {
                                                modal: true
                                                ,title: 'Add record, zone: ' + this.selectedZoneName
                                                ,width: 300
                                                ,height: 200
                                                ,closable: true
                                                ,resizable: false
                                                ,closeAction: 'destroy'
                                                ,layout: 'fit'
                                                ,items: [ Ext.create( 'Ext.form.Panel', {
                                                       items: [
                                                                recordName
                                                                ,recordTypeCombo
                                                                ,recordContent
                                                                ,recordPriority
                                                                ,recordTtl
                                                       ]
                                                } ) ]
                                                ,bbar: Ext.create( 'Ext.toolbar.Toolbar', {
                                                        items: [
                                                                '->'
                                                                ,{
                                                                        text: 'Create'
                                                                        ,handler: function() {
                                                                              // TODO: Validate form data!
                                                                              // Create POST request, and create the record
                                                                              Ext.Ajax.request( {
                                                                                      method: 'POST'
                                                                                      ,params: {
                                                                                              name: recordName.getValue()
                                                                                              ,type: recordTypeCombo.getValue()
                                                                                              ,content: recordContent.getValue()
                                                                                              ,prio: recordPriority.getValue()
                                                                                              ,ttl: recordTtl.getValue()
                                                                                      }
                                                                                      ,url: '/records/' + this.selectedZoneId
                                                                                      ,success: function() {
                                                                                              // Reload grid.
                                                                                              this.zoneRecordGridPanel.getStore().load();

                                                                                              // Close the window.
                                                                                              addRecordWindow.close();
                                                                                      }.bind( this )
                                                                                      // TODO: Add error handling!
                                                                              } );
                                                                        }.bind( this )
                                                                }
                                                                ,{
                                                                        text: 'Close'
                                                                        ,handler: function() {
                                                                                // Close the window.
                                                                                addRecordWindow.close();
                                                                        }.bind( this )
                                                                }
                                                        ]
                                                } )
                                        } );

                                        // Display window.
                                        addRecordWindow.show();
                                }.bind( this )
                        }
                        ,this.deleteZoneRecordButton
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
                ,data: config.master_zone_types
        } );

        // Create zone type combo
        this.masterZoneTypeCombo = Ext.create( 'Ext.form.ComboBox', {
                store: this.masterZoneTypeStore
                ,fieldLabel: 'Type'
                ,queryMode: 'local'
                ,displayField: 'type'
                ,valueField: 'type'
                ,editable: false
                ,labelAlign: 'right'
        } );

        // Create zone name text field
        this.masterZoneNameTextField = Ext.create( 'Ext.form.field.Text', {
                fieldLabel: 'Zone Name'
                ,name: 'name'
                ,labelAlign: 'right'
                ,allowBlank: false
        } );

        // Add master zone form
        this.addMasterZoneForm = Ext.create( 'Ext.form.Panel', {
                defaultType: 'textfield'
                ,labelAlign: 'right'
                ,border: false
                ,items: [
                        ,this.masterZoneNameTextField
                        ,this.masterZoneTypeCombo
                        // TODO: Add owner, and template
                ]
        } );

        // Create master zone button handler
        this.createMasterZoneButtonHandler = function() {
                // Create zone
                Ext.Ajax.request( {
                        url: '/zones'
                        ,method: 'POST'
                        ,params: {
                                name: this.masterZoneNameTextField.getValue()
                                ,type: this.masterZoneTypeCombo.getValue()
                        }
                        // TODO: Add proper error handling.
                        ,success: function( response ) {
                                // Close window.
                                this.closeMasterZoneButtonHandler();

                                // Reload grid data
                                this.zoneGridPanel.getStore().load();
                        }.bind( this )
                } );
        }

        // Close master zone window button handler
        this.closeMasterZoneButtonHandler = function() {
                this.addMasterZoneWindow.close();
        }

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
                                        ,handler: this.createMasterZoneButtonHandler.bind( this )
                                }
                                ,{
                                        text: 'Close'
                                        ,handler: this.closeMasterZoneButtonHandler.bind( this )
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
                                        ,handler: function() {
                                                // Close window
                                                this.addSlaveZoneWindow.close();
                                        }.bind( this )
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
        // Edit zone button
        this.editZoneButton = Ext.create( 'Ext.button.Button', {
                text: 'Edit zone'
                ,disabled: true
                ,handler: function() {
                        // Create window
                        this.createZoneWindow();

                        // Display
                        this.zoneWindow.show();
                }.bind( this )
        } );

        // Delete zone button
        this.deleteZoneButton = Ext.create( 'Ext.button.Button', {
                text: 'Delete Zone'
                ,disabled: true
                ,handler: function() {
                        // Create confirm dialog.
                        Ext.Msg.show( {
                               title: 'Delete zone?'
                               ,msg: 'Delete zone \'' + this.selectedZoneName + '\' and all related data?'
                               ,buttons: Ext.Msg.YESNO
                               ,icon: Ext.Msg.QUESTION
                               ,fn: function( btn ) {
                                       if ( btn === "yes" ) {
                                               // Trigger request
                                               Ext.Ajax.request( {
                                                       url: '/zone/' + this.selectedZoneId
                                                       ,method: 'DELETE'
                                                        // TODO: Add proper error handling.
                                                       ,success: function() {
                                                              // Reload grid data
                                                              this.zoneGridPanel.getStore().load();

                                                              // Disable buttons and reset variables.
                                                              this.editZoneButton.setDisabled( true );
                                                              this.deleteZoneButton.setDisabled( true );
                                                              this.selectedZoneId = null;
                                                              this.selectedZoneName = null;
                                                       }.bind( this )
                                               } );
                                       }
                                }.bind( this )
                        } );
                }.bind( this )
        } );

        // Create toolbar
        // TODO: Add functionality
        this.zonesToolbar = Ext.create( 'Ext.toolbar.Toolbar', {
                items: [
                        this.editZoneButton
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
                        ,this.deleteZoneButton
                ]
        } );

        return this.zonesToolbar;
} 