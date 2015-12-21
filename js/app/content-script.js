(function() {

  // - 화면 페이지에 직접적으로 주입이 가능한 자바스크립트
  // - var 로 함수 정의해두는 것과 그냥 함수 적어놓는 것의 차이는 무엇?
  // - manifest.json 에 jquey.min.js 를 추가하면서 jquery 사용가능

  // 메세지가 전달되어 온 경우
  chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {

      // message.type 은 popup.js 에서 보낸 값으로 확인합니다. 
      if (message.type == 'onActivated') {
        var rsltObj = bookshelfParser.parseBookInfo(document.URL);
        sendResponse(rsltObj);
      }
    });

}).call(this);
