Ext.define('InboxManagement.view.sent.SentController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sent-sent',
    requires: [
        'Ext.util.History'
    ],
    init: function () {

        this.setCurrentView('main-sent-list');
    },
    onBackBtnClick: function () {
        this.setCurrentView('main-sent-list');
    },
    onItemSelected: function (view, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        this.setCurrentView('main-sent-detail', {
            record: record
        });
    },
    beforeDetailsRender: function (view) {
        var record = view.record ? view.record : {};
        
        view.down('#mailBody').setHtml(record.get('id'));
    },
    setCurrentView: function (view, params) {
        var contentPanel = this.getView().down('#contentPanel');

        //We skip rendering for the following scenarios:
        // * There is no contentPanel
        // * view xtype is not specified
        // * current view is the same
        if (!contentPanel || view === '' || (contentPanel.down() && contentPanel.down().xtype === view)) {
            return false;
        }


        Ext.suspendLayouts();

        contentPanel.removeAll(true);
        contentPanel.add(
                Ext.apply({
                    xtype: view
                }, params)
                );

        Ext.resumeLayouts(true);

    }
});