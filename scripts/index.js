(function() {
	document.addEventListener('deviceready', onDeviceReady.bind(this), false);

	function onDeviceReady() {
		// alert('My device is ready');

		function read_contacts() {
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


		document.getElementById("geolocationbtn").addEventListener("click", function() {
			// navigator.geolocation.getCurrentPosition(onSuccess, onError, {
			// enableHighAccuracy : true
			// });

			navigator.contactsPhoneNumbers.list(function(contacts) {
				// console.log(contacts.length + ' contacts found');
				for (var i = 0; i < contacts.length; i++) {
					// console.log(contacts[i].id + " - " + contacts[i].displayName);
					for (var j = 0; j < contacts[i].phoneNumbers.length; j++) {
						var phone = contacts[i].phoneNumbers[j];
						// console.log("===> " + phone.type + "  " + phone.number + " (" + phone.normalizedNumber + ")");
						$("#displaycontact").html("===> " + phone.type + "  " + phone.number + " (" + phone.normalizedNumber + ")");
					}
				}
			}, function(error) {
				console.error(error);
			});

		});

		var watchID = navigator.geolocation.watchPosition(onWatchSuccess, onWatchError, {
			timeout : 30000
		});

		document.getElementById("clearWatchBtn").addEventListener("click", function() {
			navigator.geolocation.clearWatch(watchID);
		});

	};

	var onSuccess = function(position) {
		alert('Latitude: ' + position.coords.latitude + '\n' + 'Longitude: ' + position.coords.longitude + '\n');
	};

	function onError(error) {
		alert('code:' + error.code + '\n' + 'message' + error.message + '\n');
	};

	function onWatchSuccess(position) {
		var element = document.getElementById('geolocation');
		element.innerHTML = 'Latitude: ' + position.coords.latitude + '<br/' + 'Longitude:' + position.coords.longitude + '<br/' + '<hr />' + element.innerHTML;
	};

	function onWatchError(error) {
		alert('code:' + error.code + '\n' + 'message' + error.message + '\n');
	};

})();
