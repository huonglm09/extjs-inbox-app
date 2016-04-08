/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('InboxManagement.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',
    id: 'main-tabs',
    itemId: 'main-tabs',
    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',
        'InboxManagement.view.main.MainController',
        'InboxManagement.view.main.MainModel',
        'InboxManagement.view.main.Write'
    ],
    controller: 'main',
    viewModel: 'main',
    plugins: 'viewport',
    ui: 'navigation',
    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,
    header: {
        //        items: [{
        //                xtype: 'button',
        //                text: 'My Account',
        //                menu: [{
        //                        text: 'Profile',
        //                        iconCls: 'x-fa fa-user',
        //                        width: 220
        //                    }, {
        //                        text: 'Logout',
        //                        iconCls: 'x-fa fa-sign-out',
        //                        handler: 'onLogout',
        //                        width: 220
        //                    }]
        //            }],
        layout: {
            align: 'stretchmax'
        },
        title: {
            width: 198,
            height: 33,
            bind: {
                html: '<img class="logo" src="resources/images/logo/logo.png"/>'
            },
            flex: 0
        }
    },
    tabBar: {
        flex: 1,
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
    },
    responsiveConfig: {
        tall: {
            headerPosition: 'top'
        },
        wide: {
            headerPosition: 'left'
        }
    },
    defaults: {
        bodyPadding: 20,
        tabConfig: {
            plugins: 'responsive',
            responsiveConfig: {
                wide: {
                    iconAlign: 'left',
                    textAlign: 'left'
                },
                tall: {
                    iconAlign: 'top',
                    textAlign: 'center'
                }
            }
        }
    },
    items: [{
        title: 'Profile',
        id: 'profile',
        iconCls: 'fa-user',
        bind: {
            html: '{loremIpsum}'
        }
    }, {
        title: 'Inbox',
        id: 'inbox',
        iconCls: 'fa-inbox',
        /*viewType: 'main-inbox',*/
        items: [{
            xtype: 'main-inbox'
        }]
    }, {
        title: 'Write',
        id: 'write',
        iconCls: 'fa-edit',
        items: [{
            xtype: 'write'
        }]
    }, {
        title: 'Sent',
        id: 'sent',
        iconCls: 'fa-send',
        items: [{
            xtype: 'main-sent'
        }]
    }, {
        title: 'Trash',
        id: 'trash',
        iconCls: 'fa-trash-o',
        bind: {
            html: '{loremIpsum}'
        }
    }, {
        title: 'Logout',
        id: 'logout',
        iconCls: 'fa-sign-out',
        bind: {
            html: '{loremIpsum}'
        }
    }]
});



/**
 * This example demonstrates the treelist widget.
 */
//Ext.define('InboxManagement.view.main.Main', {
//    extend: 'Ext.panel.Panel',
//    xtype: 'tree-list',
//    title: 'Inbox Management',
//    controller: 'tree-list',
//    iconCls: 'x-fa fa-envelope',
//    layout: 'border',
//    viewModel: {
//        type: 'tree-list'
//    },
//    header: {
//        items: [{
//                xtype: 'button',
//                text: 'My Account',
//                menu: [{
//                        text: 'Profile',                  
//                        iconCls: 'x-fa fa-user',
//                        handler: 'onToggleConfig',
//                        config: 'expanderOnly'
//                    }, {
//                        text: 'Logout',             
//                        iconCls: 'x-fa fa-sign-out',
//                        handler: 'onToggleConfig',
//                        config: 'singleExpand'
//                    }]
//            }]
//    },
//    items: [{
//            region: 'west',
//            width: 250,
//            split: true,
//            reference: 'treelistContainer',
//            layout: {
//                type: 'vbox',
//                align: 'stretch'
//            },
//            border: false,
//            scrollable: 'y',
//            items: [{
//                    xtype: 'button',
//                    text: 'Nav',
//                    enableToggle: true,
//                    reference: 'navBtn',
//                    toggleHandler: 'onToggleNav'                    
//                }, {
//                    xtype: 'button',
//                    text: 'Micro',
//                    enableToggle: true,
//                    toggleHandler: 'onToggleMicro'
//                }, {
//                    xtype: 'treelist',
//                    reference: 'treelist',
//                    bind: '{navItems}'
//                }]
//        }, {
//            region: 'center',
//            bodyPadding: 10,
//            bind: {
//                html: '{selectionText}'
//            }
//        }]
//});