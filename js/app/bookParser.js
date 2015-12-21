var bookshelfParser = (function($) {
  /* Amazon Japan 의 일반 종이책 정보를 추출한다. 
   * @return Object 
     - 제목
     - 작가
     - 가격 (숫자)
     - ISBN 
     - 이미지 URL
     - 언어 (JP / KR)
     - 가격단위
     - 전자책/종이책 구분
     - 추출한 사이트
   */
  var parseAmazonPaperBookInfo = function () {

    // 작가 정보는 대표 한사람만 추출한다. (2015.12 초기 버젼)
    var elAuthor = $("#booksTitle .contributorNameID").first(); 
    var elTitle  = $("#productTitle");
    var elPrice  = $("#buyNewSection .offer-price"); 
    var elImg    = $("#imgBlkFront");
    var elISBN   = $("#ASIN");  // Amazon 고유번호, 책일 경우 ISBN 과 동일
    var valLang = 'JP';

    return {
        title  : (elTitle  ? elTitle.text() : '')
      , author : (elAuthor ? elAuthor.text()  : '')
      , price  : (elPrice ? elPrice.text().substring(2) : '')
      , ISBN   : (elISBN  ? elISBN.val() : '')
      , imageUrl : (elImg ? elImg.attr("src") : '')
      , bookLanguage : valLang
      , bookCurrency : bookProp.getCurrency(valLang)
      , publishType  : bookProp.getPublishType(0)
      , purchaseSite : bookProp.getPurchaseSite(0)
    }
  };


  /* Amazon Japan 의 Kindle (전자책) 정보를 추출한다. 
   * @return Object 
     - 제목
     - 작가
     - 가격 (숫자)
     - ISBN 
     - 이미지 URL
     - 언어 (JP / KR)
     - 가격단위
     - 전자책/종이책 구분
     - 추출한 사이트
   */
  var parseAmazonKindleInfo = function () {

    debugger;

    // 작가 정보는 대표 한사람만 추출한다. (2015.12 초기 버젼)
    var elAuthor = $(".parseasinTitle").next(); 
    var elTitle  = $("#btAsinTitle");
    var elPrice  = $("#kicsBuyBoxForm input[name='displayedPrice']");
    var elImg    = $("#main-image");
    //var elISBN   = document.getElementById("ASIN.0");  // Amazon 고유번호, kindle은 ISBN과 다름

    var elISBN = $("#other_meta_binding_winner .bucketBorderTop").attr('id');
    var valLang = 'JP';

    return {
        title  : (elTitle  ? elTitle.text() : '')
      , author : (elAuthor ? elAuthor.text()  : '')
      , price  : (elPrice ? elPrice.val() : '')
      , ISBN   : (elISBN  ? elISBN.substring(4): '')
      , imageUrl : (elImg ? elImg.attr("src") : '')
      , bookLanguage : valLang
      , bookCurrency : bookProp.getCurrency(valLang)
      , publishType  : bookProp.getPublishType(1)
      , purchaseSite : bookProp.getPurchaseSite(1)
    };
  };

  /* RIDI Books의 전자책 정보를 추출한다. 
   * @return Object 
     - 제목
     - 작가
     - 가격 (숫자)
     - ISBN 
     - 이미지 URL
     - 언어 (JP / KR)
     - 가격단위
     - 전자책/종이책 구분
     - 추출한 사이트
   */
  var parseRidibooksInfo = function () {

    var elBookInfo  = $("#books_contents .detail_header .header_info_wrap");
    var elAuthor = elBookInfo.find(".metadata_writer").children().first();
    var elPrice  = elBookInfo.find(".info_price_wrap .selling_price_row .book_price");
    var strPrice = (elPrice ? elPrice.text().trim().replace(',','') : '');

    // var elTitle = elBookInfo.find(".info_title_wrap");
    // var elImg   = $("#books_contents .detail_header .header_thumbnail_wrap .thumbnail");
 
    var elTitle = $("meta[property='og:title']").attr('content'); 
    var elImg   = $("meta[property='og:image']").attr('content'); 
    var elISBN  = $("meta[property='books:isbn']").attr('content'); 

    var valLang = 'KR';

    return {
        title  : (elTitle  ? elTitle : '')
      , author : (elAuthor ? elAuthor.text()  : '')
      , price  : strPrice.substring(0, strPrice.length-1)
      , ISBN   : (elISBN  ? elISBN : '')
      , imageUrl : (elImg ? elImg : '')
      , bookLanguage : valLang
      , bookCurrency : bookProp.getCurrency(valLang)
      , publishType  : bookProp.getPublishType(1)  // ebook
      , purchaseSite : bookProp.getPurchaseSite(2) // ridi
    };
  };

  /* url 를 확인하여, parsing 방법에 따라 분기한다. 
   * @return Object 
   */
  var parseBookInfo = function(url) {

      // amazon, ridi 등을 구분..
      if (url.search('amazon') > -1)  {
        var keywords = $("meta[name='keywords']").attr('content');
        if (keywords.search('ebook') > -1) {
          return parseAmazonKindleInfo();
        } else {
          return parseAmazonPaperBookInfo();
        }
      }
      else if (url.search('ridi') > -1) {
        return parseRidibooksInfo();
      }

  }

  return {
    parseBookInfo : parseBookInfo
  }
})($);