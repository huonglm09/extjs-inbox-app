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
    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',
        'InboxManagement.view.main.MainController',
        'InboxManagement.view.main.MainModel',
        'InboxManagement.view.main.List'
    ],
    controller: 'main',
    viewModel: 'main',
    ui: 'navigation',
    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,
    header: {        
        items: [{
                xtype: 'button',                
                text: 'My Account',
                menu: [{
                        text: 'Profile',
                        iconCls: 'x-fa fa-user',
                        handler: 'onToggleConfig',
                        config: 'expanderOnly',
                        width: 300
                    }, {
                        text: 'Logout',
                        iconCls: 'x-fa fa-sign-out',
                        handler: 'onToggleConfig',
                        config: 'singleExpand',
                        width: 300
                    }]
            }],
        layout: {
            align: 'stretchmax'
        },
        title: {
            bind: {
                text: '{name}'
            },
            flex: 0
        },
        iconCls: 'fa-th-list'
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
                    textAlign: 'center',
                    width: 120
                }
            }
        }
    },
    items: [{
            title: 'Write',
            iconCls: 'fa-edit',
            items: [{
                    xtype: 'mainlist'
                }]
        }, {
            title: 'Inbox',
            iconCls: 'fa-inbox',
            bind: {
                html: '{loremIpsum}'
            }
        }, {
            title: 'Sent',
            iconCls: 'fa-send',
            bind: {
                html: '{loremIpsum}'
            }
        }, {
            title: 'Trash',
            iconCls: 'fa-trash-o',
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