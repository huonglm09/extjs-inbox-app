/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('InboxManagement.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main',
    data: {
        name: 'InboxManagement',
        loremIpsum: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }

    //TODO - add data, formulas and/or methods to support your view
});


//Ext.define('InboxManagement.view.main.MainModel', {
//    extend: 'Ext.app.ViewModel',
//
//    alias: 'viewmodel.tree-list',
//
//    formulas: {
//        selectionText: function(get) {
//            var selection = get('treelist.selection'),
//                path;
//            if (selection) {
//                path = selection.getPath('text');
//                path = path.replace(/^\/Root/, '');
//                return 'Selected: ' + path;
//            } else {
//                return 'No node selected';
//            }
//        }
//    },
//
//    stores: {
//        navItems: {
//            type: 'tree',              
//            root: {                
//                expanded: true,
//                children: [{
//                    text: 'Write',
//                    iconCls: 'x-fa fa-edit',
//                    leaf: true
//                },{
//                    text: 'Inbox',
//                    iconCls: 'x-fa fa-inbox',
//                    leaf: true
//                },{
//                    text: 'Sent',
//                    iconCls: 'x-fa fa-send',
//                    leaf: true
//                },{
//                    text: 'Trash',
//                    iconCls: 'x-fa fa-trash-o',
//                    leaf: true
//                }]
//            }
//        }
//    }
//});