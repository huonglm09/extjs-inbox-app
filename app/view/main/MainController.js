/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('InboxManagement.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',
    onItemSelected: function(sender, record) {

    },
    onConfirm: function(choice) {

    },
    onChangeTab: function(tabPanel, newCard, oldCard, eOpts) {
        if (newCard.title === 'Logout') {
            var me = this;
            Ext.Ajax.request({
                url: InboxManagement.Global.getApiUrl() + 'auth/logout',
                method: 'GET',
                success: function(response) {
                    me.getView().destroy();
                    me.redirectTo('login');
                }, failure: function() {
                    me.redirectTo('profile');
                }
            });
        }
    },
    onAxisLabelRender: function(axis, label, layoutContext) {
        return Ext.util.Format.number(layoutContext.renderer(label) / 1, '0,000');
    },
    onSeriesLabelRender: function(v) {
        return Ext.util.Format.number(v / 1, '0,000');
    },
    onSeriesTooltipRenderSent: function(tooltip, record, item) {
        var formatString = '0,000 (Total sent)';
        tooltip.setHtml(record.get('to_user_email') + ': ' +
                Ext.util.Format.number(record.get('total'), formatString));
    },
    onSeriesTooltipRenderInbox: function(tooltip, record, item) {
        var formatString = '0,000 (Total received)';
        tooltip.setHtml(record.get('from_user_email') + ': ' +
                Ext.util.Format.number(record.get('total'), formatString));
    },
    onCompareSeriesTooltipRender: function(tooltip, record, item) {
        tooltip.setHtml(record.get('name') + ': ' + ((record.get('value') / record.get('total')) * 100) + '%');
    }
});
