Ext.define('InboxManagement.store.Users', {
    extend: 'Ext.data.Store',
    alias: 'store.users',
    fields: [
        'firstName', 'lastName', 'email'
    ],
    data: {items: [
            {firstName: 'Jean Luc', lastName: "jeanluc.picard@enterprise.com", email: "555-111-1111"},
            {firstName: 'Worf', lastName: "worf.moghsson@enterprise.com", email: "555-222-2222"},
            {firstName: 'Deanna', lastName: "deanna.troi@enterprise.com", email: "555-333-3333"},
            {firstName: 'Data', lastName: "mr.data@enterprise.com", email: "555-444-4444"}
        ]},
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
});
