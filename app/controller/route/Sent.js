(function () {
    'use strict';
    Ext.define('InboxManagement.controller.route.Sent', {
        extend: 'Ext.app.Controller',
        routes: {
            'sent': {
                action: 'onSentListRender'
            },
            'email-detail/:id': {
                before: 'beforeSentDetail',
                action: 'onRenderDetailSent',
                conditions: {
                    ':id': '([0-9]+)'
                }
            }
        },
        onSentListRender: function () {
            var el = Ext.getCmp('sent-content-panel');
            Ext.suspendLayouts();
            
            el.removeAll(true);
            el.add(
                    Ext.apply({
                        xtype: 'main-sent-list'
                    })
                    );

            Ext.resumeLayouts(true);
        },
        beforeSentDetail: function (id, action) {
            InboxManagement.model.Sent.load(id, {
                failure: function (record, operation) {
                    action.stop(true);
                },
                success: function (record, operation) {
                    var el = Ext.getCmp('sent-content-panel');
                    Ext.suspendLayouts();

                    el.removeAll(true);
                    el.add(
                            Ext.apply({
                                xtype: 'main-sent-detail'
                            }, {
                                record: record
                            })
                            );

                    Ext.resumeLayouts(true);
                    action.resume();
                },
                callback: function (record, operation, success) {
                    // do something whether the load succeeded or failed
                }
            });

        },
        onRenderDetailSent: function (id) {


        }
    });
})();