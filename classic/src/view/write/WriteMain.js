Ext.define('InboxManagement.view.write.WriteMain', {
    extend: 'Ext.container.Container',
    xtype: 'main-write',
    id: 'writeMainContainer',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [{
            xtype: 'container',
            itemId: 'write-main',
            id: 'write-main',
            flex: 1
        }]
});