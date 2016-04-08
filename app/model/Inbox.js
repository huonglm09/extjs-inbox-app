Ext.define('InboxManagement.model.Inbox', {
	extend: 'InboxManagement.model.Base',

	fields: [{
		name: 'id',
		type: 'integer',
	}, {
		name: 'from_user_email',
		type: 'string',
		reference: 'User'
	}, {
		name: 'to_user_email',
		type: 'string',
		reference: 'User'
	}, {
		name: 'mail_subject',
		type: 'string'
	}, {
		name: 'created_at',
		type: 'date'
	}]
});