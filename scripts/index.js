(function() {
	document.addEventListener('deviceready', onDeviceReady.bind(this), false);

	function onDeviceReady() {
		// alert('My device is ready');

		document.getElementById("geolocationbtn").addEventListener("click", function() {
			alert('sdas');
			var options = new ContactFindOptions();
			options.filter = "";
			//Can i pass something here to pick only contacts with phone number
			options.multiple = true;
			var fields = ["displayName", "phoneNumbers"];
			navigator.contacts.find(fields, onSuccess, onError, options);

		});

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
			alert('sdj');
			alert(li);
			$("#contact").html(li);
		}

		function onError(contactError) {
			alert('onError!');
		}

	}

})();
