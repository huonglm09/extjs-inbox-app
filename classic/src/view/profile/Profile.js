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
    store: {
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
    
    items: [
        {
            title: 'Profile',
            flex: 2,
            margin: '0 10 0 0',
            xtype: 'form',
            defaultType: 'textfield',
            items: [{
                    fieldLabel: 'First Name',
                    width: '100%',
                    bind: '{data.data.firstName}'                    
                }, {
                    fieldLabel: 'Last Name',
                    width: '100%',
                    bind: 'asdfasdf'
                }, {
                    fieldLabel: 'Email',
                    width: '100%',
                    bind: 'asdfasdf'                    
                }, {
                    xtype: 'button',
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
            items: [{
                xtype: 'users'
            }]
        }
    ]    
});

