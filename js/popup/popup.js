$(function() {

	// 팝업과 메인 페이지간의 데이터 전달은 Message를 통해 전달
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		// request : popup.js 에서 수행을 시작하기 위한 key 
		var request = {type : 'onActivated'};

	  // response : content-script.js 파일에서 파싱한 결과
	  chrome.tabs.sendMessage(tabs[0].id, request, function(response) {
	    // 화면에 response 가 정상적으로 도착하지 않은 경우, 알림과 함께 팝업창 종료
	  	if (!response) {
	  		alert("No book data, Please check page loading.")
	  		this.close();
	  	}

	  	// 결과 값 셋팅
			$('#title').val(response.title);
			$('#author').val(response.author);
			$('#price').val(response.price);
			$('#image').attr("src", response.imageUrl);
			
			// todo : id 검색 후 0번째 가져오는 거 체크 필요
			var elBookLang = $("#bookLanguage")[0];
		  elBookLang.select(response.bookLanguage);

		  var elPubType = $("#publishType")[0]; 
		  elPubType.select(response.publishType);

		  });
	});


	var getCurrentTime = function() {
		var date = new Date()
		  , m  = date.getMonth() + 1
		  , d  = date.getDate()
		  , y  = date.getFullYear()
		  , hh = date.getHours()
		  , mm = date.getMinutes()
		  , ss = date.getSeconds();

		m = m < 10 ? ('0'+m) : m;
		d = d < 10 ? ('0'+d) : d;

		return (y + "/" + m + "/" + d + " " + hh + ":" + mm + ":" + ss);
	}

	
	$('#btnSender').click(function() {
		alert('구글시트에 저장합니다.');

		var saveData = {};
		saveData['title'] = $('#title').val();
		saveData['author'] = $('#author').val();
		saveData['price']  = $('#price').val();

		var bookLang = $("#bookLanguage")[0];
		var pubType  = $("#publishType")[0]; 
		var purchaseSite = $("#purchaseSite")[0];
	  
		saveData['book_language'] = bookLang.selected.toUpperCase(); // jp / kr
		saveData['publish_type'] = pubType.selected; // ebook / paper
		saveData['purchase_site'] = purchaseSite.selectedItemLabel;
		saveData['volume'] = $('#volume').val();


		saveData['purchase_date'] = getCurrentTime();
		saveData['type'] = 'insert';


		$.ajax({
			url : 'https://script.google.com/macros/s/AKfycbx55h7YFkPU1lFrgFt_Z9N5hGx6yoXqrXWDlaOoB_o9WE-xaCk/exec',
			data : saveData, 
 		  type: "POST",
      success : function(result) {
        alert(result);
      }
		});

	});


})


