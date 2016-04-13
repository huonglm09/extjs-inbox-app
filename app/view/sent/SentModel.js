Ext.define('InboxManagement.view.sent.SentModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main-sent',
    data: {
        name: 'InboxManagement'
    },
    formulas: {       
        user: function (get) {            
            return InboxManagement.Global.getUser();
        }
    }
});