(function() {
  // 메세지가 전달되어 온 경우
  chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
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
    // TODO 이렇게 다이렉트 말고 다른 방법 생각해보기
    if ($("#booksTitle").length > 0)  // PaperBook 일 경우 Pasing
      return funcParsingAmazonBook();

    return funcParsingAmazonKindle();
  }

}).call(this);
