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
    height: 450,
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
    items: [{
        title: {
            bind: {
                html: '<i class="mark-color"></i><div class="title-panel">Profile</div>'
            }
        },
        flex: 2,
        margin: '0 10 0 0',
        xtype: 'form',
        defaultType: 'textfield',
        reference: 'profile-form',
        cls: 'profile-form',
        items: [{
            xtype: 'hiddenfield',
            name: 'email',
            bind: '{profile.data.items.0.email}'
        }, {
            fieldLabel: 'Email',
            width: '100%',
            name: 'email',
            bind: '{profile.data.items.0.email}',
            disabled: true
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
            xtype: 'filefield',
            name: 'photo',
            fieldLabel: 'Photo',
            width: '100%',
            msgTarget: 'side',
            allowBlank: false,
            anchor: '100%',
            buttonText: 'Select Photo...',
            listeners: {
                change: function(self, value) {
                    console.log(self.getData());
                    console.log(value);
                }
            }
        }, {
            xtype: 'button',
            cls: 'btn btn-save',
            text: 'Save',
            width: 100,
            height: 35,
            handler: 'onSaveProfile',
            iconCls: 'x-fa fa-check'
        }]
    }, {
        title: {
            bind: {
                html: '<i class="mark-color"></i><div class="title-panel">Users</div>'
            }
        },
        flex: 4,
        margin: '0 10 0 0',
        cls: 'profile-form',
        items: [{
            xtype: 'users'
        }]
    }]
});