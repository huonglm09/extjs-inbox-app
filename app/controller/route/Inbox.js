(function() {
    'use strict';
    Ext.define('InboxManagement.controller.route.Inbox', {
        extend: 'Ext.app.Controller',
        routes: {
            'inbox': {
                action: 'onInboxListRender'
            },
            'inbox/:id': {
                before: 'beforeInboxDetail',
                action: 'onRenderDetailInbox',
                conditions: {
                    ':id': '([0-9]+)'
                }
            }
        },
        onInboxListRender: function() {
            var el = Ext.getCmp('inbox-content-panel');

            Ext.suspendLayouts();

            el.removeAll(true);
            el.add(
                    Ext.apply({
                        xtype: 'main-inbox-list'
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
                    var el = Ext.getCmp('inbox-content-panel');
                    if (el) {
                        Ext.suspendLayouts();
                        el.removeAll(true);
                        el.add(
                                Ext.apply({
                                    xtype: 'main-inbox-detail'
                                }, {
                                    record: record
                                })
                                );
                        Ext.resumeLayouts(true);
                        action.resume();
                    } else {
                        self.redirectTo('inbox');
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