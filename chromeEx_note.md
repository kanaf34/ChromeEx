
### chrome extension 에 대한 기본정보
- Chromeの機能拡張を作成して、ブラウザで読み込み、デバックする方法
  http://oxynotes.com/?p=8856
- Chromeのオリジナル拡張機能を開発しよう（ソースコードあり）
  http://liginc.co.jp/web/tool/browser/163575

### chrome extension Message
- https://developer.chrome.com/extensions/messaging
- GCM(Google Cloud Messaging)とChrome extensionでデスクトップへプッシュする仕組みを作る 
  http://qiita.com/khirose/items/cc76e8aa47283f8b181b
- Chrome Extension: browserAction.onClicked.addListener() not being called
  http://stackoverflow.com/questions/12706649/chrome-extension-browseraction-onclicked-addlistener-not-being-called

### 구글 스프레드 시트 DB 화
- 구글 스프레드시트를 데이터베이스로 이용하기 - 1. ajax POST를 통한 기록 편
  http://nubiz.tistory.com/538

### 구글 Authorization
- Google Apps Script (2) 
  http://asunhs.github.io/4/
- chrome.identity and YouTube v3 API?
  http://stackoverflow.com/questions/19075016/chrome-identity-and-youtube-v3-api
- How to use the Gmail API in a Chrome extension
  http://developer.streak.com/2014/10/how-to-use-gmail-api-in-chrome-extension.html

### 프로젝트
 1. 원클릭 도서정보 저장 프로그램
 2. 손 안의 책관리 프로그램
 책 관리를 편하게 하고 싶소ㅇㅅㅇ

#### 생각하게 된 계기? 
- 문제1 : 책을 사는 곳이 여기저기 분산되어있다. (종이책은 교보, 예스24, 알라딘.. eBook은 리디, 아마존재팬 등등..)
- 문제2 : eBook 은 그렇다치고.. 종이책은 소유하고 있는 정보가 정리가 전혀! 안되어있음.
- 문제3 : 종이책, eBook, 일본원서, 정발본. 4가지의 경우를 얼기설기 겹쳐서 사는..나의 구매취향. 
        (부지런하지도 않아서..관리가 전혀 안됨=ㅂ= 허허) 

결론은. 함께 관리하고 싶어. [[편하게]]

#### 해결방안? 
- 타이핑 : 미쳤니...저 많은걸 이제와서 언제 일일이 치겠나이까. 
- ISBN 검색 : 미쳤니...2222222222222
- 각 사이트에서 제공하는 엑셀파일 
  제공하는 엑셀파일을 찾는데 조금 고생은 했지만 어쨌든 이용하는 국내사이트에서는 얻을 수 있어보임.
  각자의 제공내역도 다르기때문에 2차가공은 필요하지만, 구매한 초기 데이터를 얻을 수 있다는 점에서는 효과적.
  아마존은 이 방법이 안되는 듯.
- 로그인해서 각 사이트가 제공하는 구매목록을 파싱하기
  어쨌든 컴과출신이니까요(..) 프로그래머의 욕구를 높여 도전! 하려 했으나, 세션 유지때문에 많은 어려움을 겪음.
  파이썬의 BeautifulSoup 이나 JS 의 Cheerio 를 통해서 리디는 성공했었음.
  그러나 아마존에서 못 하다가 지쳐나감. 
- 크롬 Extension 이용하기 <- 현재(2015.11월 기준) 여기.
  클릭 한번으로 데이터 추출, 저장 요청까지 가능한 상황. 

