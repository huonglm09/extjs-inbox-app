Ext.define('InboxManagement.view.profile.ProfileMain', {
    extend: 'Ext.container.Container',
    xtype: 'main-profile',
    id: 'profileMainContainer',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [{
            xtype: 'container',
            itemId: 'profile-main',
            id: 'profile-main',
            flex: 1
        }]
});