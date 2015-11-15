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
	    	if (url.search('amazon') > 0) 
	    	   	rsltObj = funcAmazonJP();

	      	sendResponse(rsltObj);
	    }
	  });


	// 화면 페이지에 직접적으로 주입이 가능한 자바스크립트
	// var 로 함수 정의해두는 것과 그냥 함수 적어놓는 것의 차이는 무엇?
	function funcAmazonJP() {
		// 데이터 가져올 떄 amazon.jp 에서 : 그냥 책일 경우, 킨들책일 경우 구분해서 read
		// bookTitle div element / manifest.json 에 jquery 를 넣으면서 jquery 사용 가능
		// var elBook = document.getElementById("booksTitle") || false; 
		if ($("#booksTitle").length > 0)	// PaperBook 일 경우 Pasing
			return funcParsingAmazonBook();

		// kindle 일 경우 파싱
		return funcParsingAmazonKindle();
	}

	function funcParsingAmazonKindle() {

		var elAuthor = $(".parseasinTitle").next();	// 작가는 대표 한사람만.
		var elTitle  = $("#btAsinTitle");
		var elPrice  = $("#kicsBuyBoxForm input[name='displayedPrice']");
		var elImg    = $("#main-image");
		//var elASIN   = document.getElementById("ASIN.0");  // Amazon 고유번호, kindle은 ISBN과 다름

		var elPriceCode  = $("#kicsBuyBoxForm input[name='displayedPriceCurrencyCode']"); 

		return {
		    title  : (elTitle  ? elTitle.text() : '')
		  , author : (elAuthor ? elAuthor.text()  : '')
		  , imgUrl : (elImg ? elImg.attr('src') : '')
		  , price  : (elPrice ? elPrice.val() : '')
		  , ISBN   : ''
		  // 하단은 직접 작성
		  , owner  : 'Amazon.jp/kindle'
		  , isKindle : true
		  , isOrigin : true
		  , currencyCode : (elPriceCode ? elPriceCode.val() : 'JPY')
		}
	}


	function funcParsingAmazonBook() {
		// manifest.json 에 jquey.min.js 를 추가하면서 jquery 사용가능

		// amazon.jp 책 화면의 데이터를 추출, 메시지로 전달하기
		var elAuthor = $("#booksTitle .contributorNameID").first();	// 작가는 대표 한사람만.
		var elTitle  = $("#productTitle");
		var elPrice  = $("#buyNewSection .offer-price"); 
		var elImg    = $("#imgBlkFront");
		var elASIN   = $("#ASIN");  // Amazon 고유번호, 책일 경우 ISBN 과 동일

		return {
		    title  : (elTitle  ? elTitle.text() : '')
		  , author : (elAuthor ? elAuthor.text()  : '')
		  , imgUrl : (elImg ? elImg.attr("src") : '')
		  , price  : (elPrice ? elPrice.text().substring(2) : '')
		  , ISBN   : (elASIN  ? elASIN.val() : '')
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

}).call(this);
