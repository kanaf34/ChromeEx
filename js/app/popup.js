$(function() {
	// 팝업과 메인 페이지간의 데이터 전달은 Message를 통해서
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  chrome.tabs.sendMessage(tabs[0].id, {type : 'onActivated'}, function(response) {
	    
	  	if (!response) {
	  		alert("No book data, Please check page loading.")
	  		this.close();
	  	}

		$('#rsltObj').data('isEbook', response.isKindle ? '전자책' : '종이책');
		$('#rsltObj').data('isOrigin', response.isOrigin ? '원서' : '정발');
		
		$('#owner').val(response.owner);
		$('#title').val(response.title);
		$('#author').val(response.author);
		$('#price').val(response.currencyCode + ' ' + response.price);
		$('#image').attr("src", response.imgUrl);
		response.isOrigin ? $("input[name='isOrigin']")[0].checked = true 
		                  : $("input[name='isOrigin']")[1].checked = true; 
		response.isKindle ? $("input[name='isEbook']")[0].checked = true
		                  : $("input[name='isEbook']")[1].checked = true;

	    
	  });
	});


	function checkAuthorization(token) {

  		// Use the token.
  		debugger;
  		var saveData = {};
  		saveData['도서명'] = $('#title').val();
  		saveData['작가명'] = $('#author').val();
  		saveData['가격']  = $('#price').val();
  		saveData['원서여부'] = $('#rsltObj').data('isOrigin');
  		saveData['eBook여부'] = $('#rsltObj').data('isEbook');
  		saveData['구입처'] = $('#owner').val();
  		saveData['dataMngType'] = 'insert';

    	// gas - 프로젝트속성 - 프로젝트키
		var scriptId = "";
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

		// $.ajax({
		// 	url : 'https://script.google.com/macros/s/AKfycbxTbj0C1UIWPSzCKG3S6NLs0DYe5gAdk_cZDiCxGKq4yhuUOgk/exec',
		// 	data : saveData,
		// 	type : 'POST'
		// });

		var CLIENT_ID = ''
		var SCOPES = [
			  'https://www.googleapis.com/auth/script.storage' 
			, 'https://www.googleapis.com/auth/spreadsheets'
		];

		gapi.auth.authorize({
	        'client_id': CLIENT_ID,
	        'scope': SCOPES.join(' '),
	        'immediate': true
	    }, checkAuthorization);

	});


})


