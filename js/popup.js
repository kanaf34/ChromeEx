$(function() {

	//alert(2)
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