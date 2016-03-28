Ext.define('InboxManagement.view.inbox.InboxController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.inbox-inbox',
	onItemSelected: function() {
		Ext.Msg.confirm('Confirm', 'Are you ok?', 'onConfirm', this);
	},

	onConfirm: function(choice) {
		if (choice === 'yes') {
			//
		}
	}

});