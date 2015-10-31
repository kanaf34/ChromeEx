$(function() {
	// 팝업과 메인 페이지간의 데이터 전달은 Message를 통해서
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  chrome.tabs.sendMessage(tabs[0].id, {type : 'onActivated'}, function(response) {
	    
	  	if (!response) {
	  		alert("No book data, Please check page loading.")
	  		this.close();
	  	}

		$('#rsltObj').val(response);
		
		$('#owner').val(response.owner);
		$('#title').val(response.title);
		$('#author').val(response.author);
		$('#price').val(response.price);
		$('#image').attr("src", response.imgUrl);
		response.isOrigin ? $("#originY").attr("checked", "checked") 
		                  : $("#originN").attr("checked", "checked"); 
		response.isKindle ? $("#kindleY").attr("checked", "checked") 
		                  : $("#kindleN").attr("checked", "checked"); 

	    
	  });
	});
	// tabs 에 있는 메소드
	// chrome.tabs.getSelected(null, function(tab) {
	// 	$('#title').text(tab.title);
	// 	$('#url').text(tab.url);
	// })
})