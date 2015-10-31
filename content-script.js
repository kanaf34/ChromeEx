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


// var 로 함수 정의해두는 것과 그냥 함수 적어놓는 것의 차이는 무엇?
function funcAmzon() {
	// 데이터 가져올 떄 amazon.jp 에서 : 그냥 책일 경우, 킨들책일 경우 구분해서 read
	// bookTitle div element
	var elBook = document.getElementById("booksTitle") || false; 
	if (elBook)	// PaperBook 일 경우 Pasing
		return funcParsingBook(elBook);

	// kindle 일 경우 파싱
	return funcParsingEBook();
}

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
	  function(message, sender, sendResponse) {
	    // console.log(sender.tab ?
	    //             "from a content script:" + sender.tab.url :
	    //             "from the extension");
	    if (message.type == 'onActivated') {
	    	var url = document.URL; 
	    	var rsltObj;
	    	debugger;
	    	if (url.search('amazon') > 0) 
	    	   	rsltObj = funcAmzon();

	      	sendResponse(rsltObj);
	    }
	  });

}).call(this);