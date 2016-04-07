Ext.define('InboxManagement.Application', {
    extend: 'Ext.app.Application',
    requires: [
        'InboxManagement.Global',
        'Ext.container.Viewport',
        'Ext.grid.column.Date',
        'Ext.ux.ajax.SimManager',
        'Ext.ux.ajax.Simlet',
        'Ext.data.proxy.Proxy',
        'Ext.data.proxy.Ajax',
        'Ext.layout.container.Fit',
        'Ext.grid.Panel',
        'Ext.data.Store',
        'Ext.data.reader.Json'
    ],
    name: 'InboxManagement',
    /*
     * The default hash for the router
     * */
    defaultToken: 'inbox',
    /*
     * Define the router controller
     * */
    controllers: [
        'Routes'
    ],
    stores: [],


    launch: function() {
        /*
         * Calling the registerVtypes method in the Global singleton to set up the vtypes to use in the application
         * */
        //InboxManagement.Global.registerVtypes();
        /*var data = [{
            id: 1,
            from_user_email: 'user1@gmail.com',
            to_user_email: 'user2@gmail.com',
            mail_subject: 'Demo email 1'
        }, {
            id: 2,
            from_user_email: 'user1@gmail.com',
            to_user_email: 'user2@gmail.com',
            mail_subject: 'Demo email 2'
        }, {
            id: 3,
            from_user_email: 'user2@gmail.com',
            to_user_email: 'user3@gmail.com',
            mail_subject: 'Demo email 3'
        }, {
            id: 4,
            from_user_email: 'user2@gmail.com',
            to_user_email: 'user1@gmail.com',
            mail_subject: 'Demo email 4'
        }, {
            id: 5,
            from_user_email: 'user3@gmail.com',
            to_user_email: 'user2@gmail.com',
            mail_subject: 'Demo email 5'
        }, {
            id: 6,
            from_user_email: 'user1@gmail.com',
            to_user_email: 'user3@gmail.com',
            mail_subject: 'Demo email 6'
        }, {
            id: 7,
            from_user_email: 'user2@gmail.com',
            to_user_email: 'user4@gmail.com',
            mail_subject: 'Demo email 7'
        }];
        Ext.ux.ajax.SimManager.init({
            delay: 500
        }).register({
            'api/inbox': {
                type: 'json', // use JsonSimlet (type is like xtype for components)
                status: 200,
                data: data
            }
        });*/

    }
});