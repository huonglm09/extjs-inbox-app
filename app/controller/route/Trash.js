(function() {
    'use strict';
    Ext.define('InboxManagement.controller.route.Trash', {
        extend: 'Ext.app.Controller',
        routes: {
            'trash': {
                action: 'onInboxListRender'
            },
            'trash/:id': {
                before: 'beforeInboxDetail',
                action: 'onRenderDetailInbox',
                conditions: {
                    ':id': '([0-9]+)'
                }
            }
        },
        onInboxListRender: function() {
            var el = Ext.getCmp('trash-content-panel');

            Ext.suspendLayouts();

            el.removeAll(true);
            el.add(
                Ext.apply({
                    xtype: 'main-trash-list'
                })
            );

            Ext.resumeLayouts(true);
        },
        beforeInboxDetail: function(id, action) {
            var self = this;
            InboxManagement.model.Email.load(id, {
                failure: function(record, operation) {
                    action.stop(true);
                },
                success: function(record, operation) {
                    var el = Ext.getCmp('trash-content-panel');
                    if (el) {
                        Ext.suspendLayouts();
                        el.removeAll(true);
                        el.add(
                            Ext.apply({
                                xtype: 'main-trash-detail'
                            }, {
                                record: record
                            })
                        );
                        Ext.resumeLayouts(true);
                        action.resume();
                    } else {
                        self.redirectTo('trash');
                        action.resume();
                    }

                },
                callback: function(record, operation, success) {
                    // do something whether the load succeeded or failed
                }
            });

        },
        onRenderDetailInbox: function(id) {


        }
    });
})();