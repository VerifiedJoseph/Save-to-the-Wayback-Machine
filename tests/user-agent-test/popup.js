var requestedBy = 'Save to the Wayback Machine (https://verifiedjoseph.com/wayback)';
var request = new XMLHttpRequest();
request.open('GET', 'https://archive.org/wayback/available?url=http://example.com/', true);
request.setRequestHeader('x-requested-by', requestedBy); // Will work
request.setRequestHeader("User-Agent", requestedBy); // Will fail in Google chrome and opera as user-agent header can not be changed without using the api webRequest (https://developer.chrome.com/extensions/webRequest) 

request.onload = function () {
	if (this.status >= 200 && this.status < 400) { // Check HTTP status codes

		var data = JSON.parse(this.response);
		
		console.log(this);
		console.log(data);
		
	} else { // Server-side error
		
		console.log('Server-side error');

	}
};

request.onerror = function () { // Connection error
	console.log('Connection error');

};

request.send();