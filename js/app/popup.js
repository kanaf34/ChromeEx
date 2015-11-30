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

	$('#btnSender').click(function() {
		alert('구글시트에 저장합니다.');

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
		
		$.ajax({
			url : 'https://script.google.com/macros/s/AKfycbxTbj0C1UIWPSzCKG3S6NLs0DYe5gAdk_cZDiCxGKq4yhuUOgk/exec',
			data : saveData,
			type : 'POST'
		});
	});


})


