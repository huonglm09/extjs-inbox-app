Ext.define('InboxManagement.view.inbox.InboxController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.inbox-inbox',
	onItemSelected: function() {
		this.setCurrentView('main-inbox-detail');
		/*this.redirectTo('inbox/1');*/
		/*InboxManagement.Global.setCurrentView('main-inbox-detail');*/
		//Ext.Msg.confirm('Confirm', 'Are you ok?', 'onConfirm', this);
	},

	onConfirm: function(choice) {
		if (choice === 'yes') {
			//
		}
	},

	routes: {
		'inbox/:id': {
			before: 'onBeforeInboxSelect',
			action: 'onInboxSelect',
			conditions: {
				':id': '([0-9]+)'
			}
		}
	},

	onBeforeInboxSelect: function(id, action) {
		var me = this;
		var main = me.getView();
		/*var Inbox = Ext.data.schema.Schema.lookupEntity('Inbox');
		Inbox.load(1, {
			success: function(poi) {
				console.log(poi);
			}
		});*/
		/*Ext.Ajax.request({
			url: '/api/inbox/' + id,
			nosim: true, // ignored by normal Ajax request
			success: function() {
				action.resume();
			}
		});*/
	},
	onInboxSelect: function(id) {
		/*this.setCurrentView('main-inbox-detail');*/

		this.getFilmsGrid().fireEvent('selectInbox', id);

	},

	setCurrentView: function(view, params) {
		var contentPanel = this.getView();

		//We skip rendering for the following scenarios:
		// * There is no contentPanel
		// * view xtype is not specified
		// * current view is the same
		if (!contentPanel || view === '' || (contentPanel.down() && contentPanel.down().xtype === view)) {
			return false;
		}

		Ext.suspendLayouts();

		contentPanel.removeAll(true);
		contentPanel.add(
			Ext.apply({
				xtype: view
			}, params)
		);

		Ext.resumeLayouts(true);

	},
});