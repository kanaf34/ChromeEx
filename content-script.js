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
function funcAmazonJP() {
	// 데이터 가져올 떄 amazon.jp 에서 : 그냥 책일 경우, 킨들책일 경우 구분해서 read
	// bookTitle div element
	var elBook = document.getElementById("booksTitle") || false; 
	if (elBook)	// PaperBook 일 경우 Pasing
		return funcParsingAmazonBook(elBook);

	// kindle 일 경우 파싱
	return funcParsingAmazonKindle();
}

function funcParsingAmazonKindle() {

	var elTemp = document.getElementsByClassName('parseasinTitle');

	var elAuthor = elTemp ? elTemp[0].nextElementSibling : '';	// 작가는 대표 한사람만.
	var elTitle  = document.getElementById('btAsinTitle');
	var elPrice  = document.getElementsByName('displayedPrice'); 
	var elImg    = document.getElementById('main-image');
	//var elASIN   = document.getElementById("ASIN.0");  // Amazon 고유번호, kindle은 ISBN과 다름

	var elPriceCode  = document.getElementsByName('displayedPriceCurrencyCode'); 

	return {
	    title  : (elTitle  ? elTitle.innerText : '')
	  , author : (elAuthor ? elAuthor.innerText  : '')
	  , imgUrl : (elImg ? elImg.getAttribute('src') : '')
	  , price  : (elPrice ? elPrice[0].value : '')
	  , ISBN   : ''
	  // 하단은 직접 작성
	  , owner  : 'Amazon.jp'
	  , isKindle : true
	  , isOrigin : true
	  , currencyCode : (elPriceCode ? elPriceCode[0].value : '')
	}
}


function funcParsingAmazonBook(elBook) {

	// 2015.10.30
	// amazon.jp 책 화면의 데이터를 추출, 메시지로 전달하기
	var elAuthor = elBook.getElementsByClassName('a-link-normal');	// 작가는 대표 한사람만.
	var elTitle  = document.getElementById('productTitle');
	var elPrice  = document.getElementsByClassName('offer-price'); 
	var elImg    = document.getElementById('img-canvas').firstElementChild;
	var elASIN   = document.getElementById("ASIN");  // Amazon 고유번호, 책일 경우 ISBN 과 동일

	return {
	    title  : (elTitle  ? elTitle.innerText : '')
	  , author : (elAuthor ? elAuthor[0].innerText  : '')
	  , imgUrl : (elImg ? elImg.getAttribute('src') : '')
	  , price  : (elPrice ? (elPrice[0].innerText).substring(2) : '')
	  , ISBN   : (elASIN  ? elASIN.value : '')
	  // 하단은 직접 작성
	  , owner  : 'Amazon.jp'
	  , isKindle : false
	  , isOrigin : true
	  , currencyCode : 'JPY'
	}

	// 팝업창에 라디오버튼으로 킨들/일반책 구분
	// 타이틀, 권수, 구입처, 구입일, 가격, 태그
	// 가격은..음 일단 보이는 그대로의 데이터로 작성
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
	    	   	rsltObj = funcAmazonJP();

	      	sendResponse(rsltObj);
	    }
	  });

}).call(this);