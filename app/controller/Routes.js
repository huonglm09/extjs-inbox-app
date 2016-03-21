Ext.define('InboxManagement.controller.Routes', {
    extend: 'Ext.app.Controller',
    requires: [
        'Ext.util.History',
        'InboxManagement.view.auth.Login',
        'InboxManagement.view.auth.Password',
        'InboxManagement.view.auth.Register'
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
    routes: {
        // Register route
        'register': {
            before: 'closeWindows',
            action: 'onRegister'
        },
        // Login route
        'login': {
            before: 'closeWindows',
            action: 'onLogin'
        },
        // Logout route
        'logout': {
            before: 'closeWindows',
            action: 'onLogout'
        },
        // Password route
        'password': {
            before: 'closeWindows',
            action: 'onRecoverPassword'
        },
        // Home route
        'home': {
            before: 'loggedIn',
            action: 'onHome'
        }
    },
    /*
     * Unmatched route method.  On any unmatched route it redirects to the home route
     * */
    onUnmatchedRoute: function() {
        this.redirectTo('home', false);
    },
    /*
     * Login route method.  Loads the login form
     * */
    onLogin: function() {
        Ext.widget('auth_login');
    },
    /*
     * Register route method. Loads the register form
     * */
    onRegister: function() {
        Ext.widget('auth_register');
    },
    /*
     * Lougout route method.  Loads the login form
     * */
    onLogout: function() {
        var me = this;
        Ext.Ajax.request({
            url: InboxManagement.Global.getApiUrl() + '/auth/logout',
            method: 'GET',
            // If successful continue loading the route
            success: function() {
                InboxManagement.Global.setUser(null); // Set user to null in Global singleton
                me.redirectTo('login', false); // Redirect to login route
            }
        });
    },
    /*
     * Recover password route
     * */
    onRecoverPassword: function() {
        Ext.widget('auth_password');
    },
    /*
     * Home route method
     * */
    onHome: function() {
        alert('Welcome home, ' + InboxManagement.Global.getUser().name);
    },
    /*
     * LoggedIn method.  Checks if the user has a valid logon session
     * */
    loggedIn: function() {
        var me = this,
                args = Ext.Array.slice(arguments), // Get a reference to the route action
                action = args.pop(); // Get a reference to the route action
        me.startToken(); // Set the start token to the current hash
        Ext.Ajax.request({
            url: InboxManagement.Global.getApiUrl() + '/auth/login',
            method: 'GET',
            // If successful continue loading the route
            success: function(response) {
                var res = Ext.decode(response.responseText);
                InboxManagement.Global.setUser(res.user); // Update the global user var
                action.resume();
            },
            // If not logged in redirect to the login route
            failure: function() {
                me.redirectTo('login', false);
            }
        });
    },
    /*
     * StartToken method.  Updates the global startToken var with the current hash
     * */
    startToken: function() {
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
