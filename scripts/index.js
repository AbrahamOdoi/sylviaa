(function() {
	document.addEventListener('deviceready', onDeviceReady.bind(this), false);

	function onDeviceReady() {
		// alert('My device is ready');

		function read_contacts() {
			alert('sdas');
			var options = new ContactFindOptions();
			options.filter = "";
			options.filter = "";
			options.multiple = true;
			var fields = ["*"];
			//"*" will return all contact fields
			navigator.contacts.find(fields, onSuccess, onError, options);
		}

		// display the address information for all contacts
		function onSuccess(contacts) {
			//console.log(JSON.stringify(contacts))
			var li = '';
			$.each(contacts, function(key, value) {
				if (value.name) {
					$.each(value.name, function(key, value) {
						if (key == 'formatted') {
							name = value;
						}
					});
				}
				if (value.phoneNumbers) {
					$.each(value.phoneNumbers, function(key, value) {
						phone = value.value;
					});
				}
				li += '<li style="text-decoration:none;">' + name + ' ' + phone + '</li>';
			});

			$("#contact").html(li);
		}

		function onError(contactError) {
			alert('onError!');
		}

	}

})();
