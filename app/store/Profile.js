Ext.define('InboxManagement.store.Profile', {
    extend: 'Ext.data.Store',
    alias: 'store.profile',
    requires: [
        'InboxManagement.Global'
    ],
    model: 'InboxManagement.model.Profile',
    autoLoad: true,
//    proxy: {
//        type: 'ajax',
//        api: {
//            read: InboxManagement.Global.getApiUrl() + 'auth/profile'
//        },
//        reader: {
//            type: 'json',
//            rootProperty: 'data'
//        }
//    }
        
//        proxy: {
//		type: 'rest',
//		url: InboxManagement.Global.getApiUrl() + 'auth/profile',
//		reader: {
//			type: 'json',
//			rootProperty: 'data'
//		}
//	}
    
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
