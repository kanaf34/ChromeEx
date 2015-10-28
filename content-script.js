// var injectScript;

// injectScript = function(file, node) {
// 	var s, th;
// 	th = document.getElementsByTagName(node)[0];
// 	s = document.createElement('script');
// 	s.setAttribute('type', 'text/javascript');
// 	s.setAttribute('src', file);

// 	return th.appendChild(s);
// };

// injectScript(chrome.extension.getURL('/embeded-script.js'), 'body');

// 화면 페이지에 직접적으로 주입이 가능한 자바스크립트

(function() {
	// chrome.runtime.onMessage.addListener(function(message) {
	// 	alert(1)
	// 	if (message.type === 'onActivated') {



	// 		return chrome.runtime.sendMessage({
	// 			type:'setBadgeText',
	// 			value:'10'
	// 		});
	// 	}

	// });

	chrome.runtime.onMessage.addListener(
	  function(request, sender, sendResponse) {
	    console.log(sender.tab ?
	                "from a content script:" + sender.tab.url :
	                "from the extension");
	    if (request.greeting == "hello")
	      sendResponse({farewell: "goodbye"});
	  });

}).call(this);