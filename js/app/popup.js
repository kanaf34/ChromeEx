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
	// tabs 에 있는 메소드
	// chrome.tabs.getSelected(null, function(tab) {
	// 	$('#title').text(tab.title);
	// 	$('#url').text(tab.url);
	// })

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

    	// gas - 프로젝트속성 - 프로젝트키
		var scriptId = "M_cX6owyMGCTPR01mkLVJmsR47BC2nz7y";
		var request = {};
		request['function']   = "handleResponse";
		request['parameters'] = [saveData];
		request['devMode']    = true;

		// gapi.auth.setToken(token);

		// var op = gapi.client.request({
		//     'root': 'https://script.googleapis.com',
		//     'path': 'v1/scripts/' + scriptId + ':run',
		//     'method': 'POST',
		//     'body': request
		// })

		// op.execute(function(resp) {
		// 	debugger;
		// 	alert(resp);
		// })

		// 400에러 뭘까요.  Invalid JSON 형식 뭐?
		var root = 'https://script.googleapis.com/v1/scripts/' + scriptId + ':run';
		var method = 'POST';

		$.ajax({
			url  : root,
			type : 'POST',
			dataType    : 'json',     
			contentType : "application/json; charset=utf-8",
			data: JSON.stringify(request),
			beforeSend: function (xhr) {
			    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
			},
			success: function () {
				debugger;
				alert('success');
			},
			error: function (error) { 
				debugger;
				alert(error);
			},
		});
	}


	function loadCallback() {
		debugger;
		if (this.status == 401) {
			alert('auth failed');
		} else {
			alert('hello');
		}
	}
	
	$('#btnSender').click(function() {
		alert('구글시트에 저장합니다.');

		// $.ajax({
		// 	url : 'https://script.google.com/macros/s/AKfycbxTbj0C1UIWPSzCKG3S6NLs0DYe5gAdk_cZDiCxGKq4yhuUOgk/exec',
		// 	data : saveData,
		// 	type : 'POST'
		// });

		// var CLIENT_ID = '602327710223-98eii8350qnemi6n8driovgjm11966c3.apps.googleusercontent.com'
		// var SCOPES = [
		// 	  'https://www.googleapis.com/auth/script.storage' 
		// 	, 'https://www.googleapis.com/auth/spreadsheets'
		// ];

		// gapi.auth.authorize({
	 //        'client_id': CLIENT_ID,
	 //        'scope': SCOPES.join(' '),
	 //        'immediate': true
	 //    }, checkAuthorization);


		chrome.identity.getAuthToken({ 'interactive': true }, checkAuthorization);

	});


})


