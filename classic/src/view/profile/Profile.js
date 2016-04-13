Ext.define('InboxManagement.view.profile.Profile', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ext.layout.container.HBox',
        'InboxManagement.view.profile.ProfileController',
        'InboxManagement.view.profile.ProfileModel',
        'InboxManagement.view.profile.Users',
        'InboxManagement.store.Profile'
    ],
    xtype: 'profile',
    controller: 'profile',
    viewModel: {
        type: 'profile'
    },
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    bodyPadding: 10,
    defaults: {
        frame: true,
        bodyPadding: 10
    },
    height: 400,
    initComponent: function() {
        this.callParent();
    },
    listeners: {
        afterrender: function(view) {            
            //view.add({
            //    xtype: 'multiselect',
            //    scrollable: false,
            //    allowBlank: true,
            //    ddReorder: true,
            //    fieldLabel: 'Multiselect',
            //    store: view.getViewModel().getStore('profile'), 
            //    valueField: 'id',
            //    displayField: 'name'
            //});
        }  
    },
    items: [
        {
            title: 'Profile',
            flex: 2,
            margin: '0 10 0 0',
            xtype: 'form',
            defaultType: 'textfield',
            reference: 'profile-form',
            cls: 'profile-form',
            items: [{
                    xtype: 'hiddenfield',
                    name: 'id',
                    bind: '{profile.data.items.0.id}' 
                }, {
                    fieldLabel: 'Email',
                    width: '100%',
                    name: 'email',
                    bind: '{profile.data.items.0.email}'
                }, {
                    fieldLabel: 'First Name',
                    width: '100%',
                    name: 'firstName',
                    bind: '{profile.data.items.0.firstName}'
                }, {
                    fieldLabel: 'Last Name',
                    width: '100%',
                    name: 'lastName',
                    bind: '{profile.data.items.0.lastName}'                
                }, {
                    fieldLabel: 'Mode',
                    boxLabel: 'Allow change your password',
                    xtype: 'checkbox',                    
                    reference: 'changePassword'
                }, {
                    fieldLabel: 'Password',
                    width: '100%',
                    inputType: 'password',
                    name: 'password',
                    bind: {
                        disabled: '{!changePassword.checked}'
                    }
                }, {
                    fieldLabel: 'Retype',
                    width: '100%',
                    inputType: 'password',
                    name: 'retype',
                    bind: {
                        disabled: '{!changePassword.checked}'
                    }
                }, {
                    xtype: 'button',
                    cls: 'btn btn-save',
                    text: 'Save',
                    width: 100,
                    height: 35,
                    handler: 'onSaveProfile'
                }
            ]
        },
        {
            title: 'Users',
            flex: 4,
            margin: '0 10 0 0',
            cls: 'profile-form',
            items: [{
                    xtype: 'users'
                }]
        }
    ]
});

