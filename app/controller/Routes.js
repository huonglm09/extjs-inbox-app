Ext.define('InboxManagement.controller.Routes', {
    extend: 'Ext.app.Controller',
    requires: [
        'Ext.util.History',
        'InboxManagement.Global',
        'InboxManagement.view.auth.Login'
    ],
    /*
     * Listen for unmatched route
     * */
    listen: {
        controller: {
            '#': {
                unmatchedroute: 'onUnmatchedRoute'
            }
        }
    },
    /*
     * Route list
     * */
    config: {
        control: {
            '#main-tabs': {
                tabchange: 'onTabChange'
            }
        },
        refs: {
            tabPanel: '#main-tabs'
        },
        routes: {
            // Login route
            'login': {
                before: 'beforeLogin',
                action: 'onLogin'
            },
            // Inbox route
            'inbox': {
                before: 'loggedIn',
                action: 'onInbox'
            },
            // Write route
            'write': {
                before: 'loggedIn',
                action: 'onWrite'
            },
            // Sent route
            'sent': {
                before: 'loggedIn',
                action: 'onSent'
            },
            // Trash route
            'trash': {
                before: 'loggedIn',
                action: 'onTrash'
            },
            // Trash route
            'profile': {
                before: 'loggedIn',
                action: 'onProfile'
            },
            // Trash route
            'logout': {
                before: 'loggedIn',
                action: 'onLogout'
            }
        }
    },
    onTabChange: function(tabPanel, newItem) {
        var tab = newItem.getId();
        this.redirectTo(tab);
    },
    /*
     * Unmatched route method.  On any unmatched route it redirects to the home route
     * */
    onUnmatchedRoute: function() {
        this.redirectTo('inbox', false);
    },
    /*
     * Login route method.  Loads the login form
     * */
    onLogin: function() {
        Ext.widget('auth_login');
        InboxManagement.Global.setCurrentView('auth_login');
    },
    /*
     * Inbox route method
     * */
    onInbox: function() {
        this.changeTab('inbox');
    },
    /*
     * Write route method
     * */
    onWrite: function() {
        this.changeTab('write');
    },
    /*
     * Sent route method
     * */
    onSent: function() {
        this.changeTab('sent');
    },
    /*
     * Trash route method
     * */
    onTrash: function() {
        this.changeTab('trash');
    },
    /*
     * Profile route method
     * */
    onProfile: function() {
        this.changeTab('profile');
    },
    /*
     * Logout route method
     * */
    onLogout: function() {
        this.changeTab('logout');
    },
    /*
     * Change view when change tab
     * */
    changeTab: function(tab) {
        console.log(tab);
        if (InboxManagement.Global.getCurrentView() !== 'app-main') {
            Ext.widget('app-main');
            InboxManagement.Global.setCurrentView('app-main');
        }
        var tabPanel = this.getTabPanel(),
            child;
        if (typeof tabPanel !== "undefined") {
            child = tabPanel.getComponent(tab);
            tabPanel.setActiveTab(child);
        }
    },
    /*
     * LoggedIn method.  Checks if the user has a valid logon session
     * */
    loggedIn: function() {
        var me = this,
            // Get a reference to the route action
            args = Ext.Array.slice(arguments),
            // Get a reference to the route action
            action = args.pop();
        //        me.startToken(); // Set the start token to the current hash
        //        Ext.Ajax.request({
        //            url: InboxManagement.Global.getApiUrl() + '/auth/login',
        //            method: 'GET',
        //            // If successful continue loading the route
        //            success: function(response) {
        //                var res = Ext.decode(response.responseText);
        //                InboxManagement.Global.setUser(res.user); // Update the global user var
        var loggedIn = localStorage.getItem("LoggedIn");
        if (loggedIn) {
            action.resume();
        } else {
            this.redirectTo('login', false);
        }
        //            },
        //            // If not logged in redirect to the login route
        //            failure: function() {
        ////                me.redirectTo('login', false);
        //            }
        //        });
    },
    beforeLogin: function() {
        var me = this,
            // Get a reference to the route action
            args = Ext.Array.slice(arguments),
            // Get a reference to the route action
            action = args.pop();
        var loggedIn = localStorage.getItem("LoggedIn");
        if (!loggedIn) {
            action.resume();
        } else {
            this.redirectTo('inbox', false);
        }
    },
    /*
     * StartToken method.  Updates the global startToken var with the current hash
     * */
    startToken: function() {
        //InboxManagement.Global.setStartToken(Ext.util.History.getToken());
    },
    /*
     * Close windows method will close any open windows between routes
     * */
    closeWindows: function() {
        var args = Ext.Array.slice(arguments), // Get a reference to the route action
            action = args.pop(); // Get a reference to the route action
        Ext.WindowMgr.each(
            function(win) {
                if (win.isVisible()) {
                    win.close(true);
                }
            }
        );
        action.resume();
    }
});