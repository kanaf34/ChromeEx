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
	alert(1)

	chrome.runtime.onMessage.addListener(function(message) {
		if (message.type === 'onActivated') {
			return chrome.runtime.sendMessage({
				type:'setBadgeText',
				value:'10'
			});
		}

	});

}).call(this);