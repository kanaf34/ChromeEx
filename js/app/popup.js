$(function() {

	// 팝업과 메인 페이지간의 데이터 전달은 Message를 통해서
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  chrome.tabs.sendMessage(tabs[0].id, {type : 'onActivated'}, function(response) {
	    
	  	if (!response) {
	  		alert("No book data, Please check page loading.")
	  		this.close();
	  	}

		$('#title').val(response.title);
		$('#author').val(response.author);
		//response.currencyCode + ' ' + 
		$('#price').val(response.price);
		$('#image').attr("src", response.imgUrl);
		
		// todo : id 검색 후 0번째 가져오는 거 체크 필요
		var bookLang = $("#bookLanguage")[0];
	  bookLang.select( response.isOrigin ? 'jp' : 'kr' );

	  var pubType = $("#publishType")[0]; 
	  pubType.select( response.isKindle ? 'ebook' : 'paper');

	  });
	});


	function checkAuthorization(token) {

		// Use the token.
		debugger;
		var saveData = {};
		saveData['도서명'] = $('#title').val();
		saveData['작가명'] = $('#author').val();
		saveData['가격']  = $('#price').val();

		var bookLang = $("#bookLanguage")[0];
		var pubType  = $("#publishType")[0]; 
		var purchaseSite = $("#purchaseSite")[0];
	  
		saveData['원서여부'] = bookLang.selected; // jp / kr
		saveData['eBook여부'] = pubType.selected; // ebook / paper
		saveData['구입처'] = purchaseSite.selectedItemLabel;
		saveData['권수'] = $('#volume').val();
		saveData['dataMngType'] = 'insert';

    	// gas - 프로젝트속성 - 프로젝트키
		var scriptId = "M_cX6owyMGCTPR01mkLVJmsR47BC2nz7y";
		var request = {};
		request['function']   = "handleResponse";
		request['parameters'] = [saveData];
		request['devMode']    = true;

		// gapi.auth.setToken(token);

		var op = gapi.client.request({
		    'root': 'https://script.googleapis.com',
		    'path': 'v1/scripts/' + scriptId + ':run',
		    'method': 'POST',
		    'body': request
		})

		op.execute(function(resp) {
			debugger;
			alert(resp);
		})
	}

	
	$('#btnSender').click(function() {
		alert('구글시트에 저장합니다.');

		$.ajax({
			url : 'https://script.google.com/macros/s/AKfycbxTbj0C1UIWPSzCKG3S6NLs0DYe5gAdk_cZDiCxGKq4yhuUOgk/exec',
			data : saveData,
			type : 'POST'
		});

		// var CLIENT_ID = '602327710223-7g6m5cot6arlr39sdosa599o02pff81u.apps.googleusercontent.com'
		// var SCOPES = [
		// 	  'https://www.googleapis.com/auth/script.storage' 
		// 	, 'https://www.googleapis.com/auth/spreadsheets'
		// ];

		// gapi.auth.authorize({
	 //        'client_id': CLIENT_ID,
	 //        'scope': SCOPES.join(' '),
	 //        'immediate': true
	 //    }, checkAuthorization);

	});


})


