/**
 * This view is an example list of people.
 */
Ext.define('InboxManagement.view.profile.Users', {
    extend: 'Ext.grid.Panel',
    xtype: 'users',
    requires: [
        'InboxManagement.store.Users'
    ],
    controller: 'users',
    store: {
        type: 'users'
    },
    columns: [
        {text: 'STT', dataIndex: 'id'},
        {text: 'First Name', dataIndex: 'firstName', flex: 1},
        {text: 'Last Name', dataIndex: 'lastName', flex: 1},
        {text: 'Email', dataIndex: 'email', flex: 1.5},
        {text: 'Create At', dataIndex: 'created_at', flex: 1},
        {text: 'Update At', dataIndex: 'updated_at', flex: 1}
    ],
    listeners: {
        select: 'onItemSelected'
    }
});

