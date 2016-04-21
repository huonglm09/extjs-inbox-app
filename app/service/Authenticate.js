(function() {
    'use strict';
    Ext.define('InboxManagement.service.Authenticate', {
        singleton: true,
        setCurrentUser: function(user) {
            localStorage.setItem('user', Ext.encode(user));
        },
        getCurrentUser: function() {
            if (localStorage.getItem('user')) {
                return Ext.decode(localStorage.getItem('user'));
            } else {
                return false;
            }
        },
        remove: function() {
            localStorage.clear();
        }
    });
})();