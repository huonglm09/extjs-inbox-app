Ext.define('InboxManagement.controller.Routes', {
    extend: 'Ext.app.Controller',
    requires: [
        'Ext.util.History',
        'InboxManagement.Global'
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
        this.redirectTo('profile', false);
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
        localStorage.removeItem("LoggedIn");
        InboxManagement.Global.setUser(null);
        this.getView().destroy();
        this.redirectTo('login');
    },
    /*
     * Change view when change tab
     * */
    changeTab: function(tab) {

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
        args = Ext.Array.slice(arguments), 
        action = args.pop(); 
        Ext.Ajax.request({
            url: InboxManagement.Global.getApiUrl() + 'auth/loggedin',
            method:'GET',                
            success:function(response){
                var res = Ext.decode(response.responseText);
                InboxManagement.Global.setUser(res.data);
                action.resume();
            },                
            failure:function() {
                me.redirectTo('login');
            }
        });           
    },
    beforeLogin: function() {
        var me = this,
        args = Ext.Array.slice(arguments), 
        action = args.pop(); 
        Ext.Ajax.request({
            url: InboxManagement.Global.getApiUrl() + 'auth/loggedin',
            method: 'GET',                
            success:function(response){
                var res = Ext.decode(response.responseText);
                InboxManagement.Global.setUser(res.data);
                me.redirectTo('profile', false);
            },                
            failure:function() {
                action.resume();
            }
        });
    },
    /*
     * StartToken method.  Updates the global startToken var with the current hash
     * */
    startToken:function() {
        InboxManagement.Global.setStartToken(Ext.util.History.getToken());
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