(function() {
    'use strict';
    Ext.define('InboxManagement.service.Authenticate', {
        singleton: true,
        setCurrentUser: function(user) {
            localStorage.setItem('user', JSON.stringify(user));
        },
        getCurrentUser: function() {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'));
            } else {
                return false;
            }
        },
        remove: function() {
            localStorage.clear();
        }
    });
})();