Ext.define('InboxManagement.Application', {
    extend: 'Ext.app.Application',
    requires: [
        'InboxManagement.Global',
        'Ext.grid.column.Date',
        'Ext.ux.ajax.SimManager',
        'Ext.ux.ajax.Simlet',
        'Ext.data.proxy.Proxy',
        'Ext.data.proxy.Ajax',
        'Ext.data.Store',
        'Ext.data.reader.Json',
        'InboxManagement.interceptor.Authenticate'
    ],
    name: 'InboxManagement',
    /*
     * The default hash for the router
     * */
    defaultToken: 'dashboard',
    /*
     * Define the router controller
     * */
    controllers: [
        'Routes',
        'route.Inbox',
        'route.Sent',
        'route.Trash'
    ],
    launch: function() {
        InboxManagement.interceptor.Authenticate.init();
        Ext.create('Ext.container.Viewport', {
            /*items: [{
             xtype: 'panel',
             html: '<center><div id="fblogin" class="fb-login-button">Login with Facebook</div></center>'
             }],*/
            listeners: {
                render: function(obj, eOpts) {
                    window.fbAsyncInit = Ext.bind(this.onFacebookInit, this);
                    (function(d) {
                        var js, id = 'facebook-jssdk',
                                ref = d.getElementsByTagName('script')[0];
                        if (d.getElementById(id)) {
                            return;
                        }
                        js = d.createElement('script');
                        js.id = id;
                        js.async = true;
                        js.src = "//connect.facebook.net/en_US/all.js";
                        ref.parentNode.insertBefore(js, ref);
                    }(document));
                }
            },
            onFacebookInit: function() {
                var me = this;
                FB.init({
                    appId: '223670991356420',
                    status: true,
                    xfbml: true,
                    version: 'v2.6'
                });
                FB.Event.subscribe('auth.authResponseChange', Ext.bind(me.onFacebookAuthResponseChange, me));
            },
            onFacebookAuthResponseChange: function(response) {
                this.down('panel').setVisible(false);
            }
        });
    }
});