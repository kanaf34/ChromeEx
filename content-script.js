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

	// 메세지가 전달되어 온 경우
	chrome.runtime.onMessage.addListener(
	  function(request, sender, sendResponse) {
	    // console.log(sender.tab ?
	    //             "from a content script:" + sender.tab.url :
	    //             "from the extension");

		// 데이터 가져올 떄 amazon.jp 에서 : 그냥 책일 경우, 킨들책일 경우 구분해서 read

		// 그냥 책일 경우

		// 2015.10.30
		// amazon.jp 책 화면의 데이터를 추출, 메시지로 전달하기
		// var authorTag = document.getElementById('booksTitle').getElementsByClassName('author')[0];
		// var authorNm = authorTag.getElementsByClassName('contributorNameID')[0].textContent;

		var title = document.getElementById('productTitle').textContent;
		var imgUrl = document.getElementById('img-canvas').firstElementChild.getAttribute('src');
		var priceTag = document.getElementById('a-autoid-2-announce');
		var priceVal = (priceTag.getElementsByClassName('a-color-price')[0]).textContent.trim();

// {
// 	      	author : authorNm,
// 	      	title  : title,
// 	      	price  : priceVal,
// 	      	img    : imgUrl,
// 	      	owner  : 'Amazon.jp'
// 	      }


	    if (request.gretting == "hello")
	      sendResponse({
	      	title : title
	      });
	  });

}).call(this);