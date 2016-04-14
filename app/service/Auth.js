(function() {
	'use strict';
	Ext.define('InboxManagement.service.Auth', {
		singleton: true,
		url: InboxManagement.Global.getApiUrl() + 'auth/facebook',
		login: function(data) {
			var self = this;

			return new Ext.Promise(function(resolve, reject) {
				Ext.Ajax.request({
					url: self.url,

					method: 'POST',

					params: data,

					success: function(response) {
						// Use the provided "resolve" method to deliver the result.		
						var obj = Ext.decode(response.responseText);
						resolve(obj);
					},

					failure: function(response) {
						// Use the provided "reject" method to deliver error message.						
						var obj = Ext.decode(response.responseText);
						reject(obj);
					}
				});
			});
		}

	});
})();