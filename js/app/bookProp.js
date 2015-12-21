var bookProp = (function() {

  var purchaseSiteArr = [
    'Amazon Japan'
  , 'Amazon Japan(kindle)'
  , '리디북스'
  , '알라딘'
  ];

  var bookLangObj = {
    'KR' : '한글판'
  , 'JP' : '일판'
  };

  var currencyObj = {
    'KR' : '￦'
  , 'JP' : '￥'
  };

  var publishTypeArr = [
    'paper' 
  , 'ebook' 
  ];

  var getPurchaseSite = function(idx) {

    if (!idx) {
      console.error('Please input the index value. (ex: 0,1 ..)');
      return;
    }

    return purchaseSiteArr[idx];
  }

  var getBookLangType = function(lang) {

    if (!lang) {
      console.error('Please input the language value. (ex: kr, jp ..)');
      return;
    }

    return bookLangObj[lang.toUpperCase()];
  }

  var getCurrency = function(lang) {

    if (!lang) {
      console.error('Please input the language value. (ex: kr, jp ..)');
      return;
    }

    return currencyObj[lang.toUpperCase()];
  }

  var getPublishType = function(idx) {

    if (!idx) {
      console.error('Please input the index value. (ex: 0,1 ..)');
      return;
    }

    return publishTypeArr[idx];
  }

  return {
    getPurchaseSite : getPurchaseSite,
    getPublishType  : getPublishType,
    getBookLangType : getBookLangType,
    getCurrency : getCurrency
  }
})();
