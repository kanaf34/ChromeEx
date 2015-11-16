(function() {
  // chrome.runtime.onMessage.addListener(function(message) {
  //   if (message.type === 'setBadgeText') {
  //     return chrome.browserAction.setBadgeText({
  //       text: message.value
  //     });
  //   }
  // });

  // function funcActive(activeInfo) {
  //   return chrome.tabs.sendMessage(activeInfo.tabId, {
  //     type: 'onActivated'
  //   });
  // }

  // 사용자가 아이콘을 클릭했을 떄 일어나는 액션 아래는 단순히 팝업열기
  chrome.browserAction.onClicked.addListener(function(activeInfo) {


    chorme.windows.create({
      url:"popup.html",
      focused:true,
      type:"popup"
    })

  });

  // 로딩완료 혹은 새로고침 완료 시점에 이벤트를 발생시켜주는듯?
  // chrome.tabs.onActivated.addListener(function(activeInfo) {
  //   return chrome.tabs.sendMessage(activeInfo.tabId, {
  //     type: 'onActivated'
  //   });
  // });

  // chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) {
  //   if (changeInfo.status === 'complete') {
  //     return chrome.tabs.sendMessage(tabId, {
  //       type: 'onActivated'
  //     });
  //   }
  // });

}).call(this);