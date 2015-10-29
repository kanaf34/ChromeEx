$(function() {

	// alert(2) : 

	// 팝업과 메인 페이지간의 데이터 전달은 Message를 통해서
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
	    alert(response.farewell);
	  });
	});
	// tabs 에 있는 메소드
	// chrome.tabs.getSelected(null, function(tab) {
	// 	$('#title').text(tab.title);
	// 	$('#url').text(tab.url);
	// })
})