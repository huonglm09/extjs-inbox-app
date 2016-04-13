Ext.define('InboxManagement.view.sent.SentController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.sent-sent',
	requires: [
		'Ext.util.History'
	],

	onBackBtnClick: function() {
		this.redirectTo('sent');
	},

	onItemSelected: function(view, td, cellIndex, record, tr, rowIndex, e, eOpts) {

		this.redirectTo('email-detail/' + record.get('id'));
	},


	beforeDetailsRender: function(view) {
		/*console.log(view);*/
		var record = view.record ? view.record : {};
		view.down('#mailBody').setHtml(record.get('mail_content'));
	}
});