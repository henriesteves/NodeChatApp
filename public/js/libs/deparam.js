deparam = function (uri) {
  if (uri === undefined) {
    uri = window.location.search;
  }
  var queryString = {};
  uri.replace(
    new RegExp(
      "([^?=&]+)(=([^&#]*))?", "g"),
    function ($0, $1, $2, $3) {
      queryString[$1] = decodeURIComponent($3.replace(/\+/g, '%20'));
    }
  );
  return queryString;
};

deparam2 = function (querystring = window.location.search) {
  // remove any preceding url and split
  querystring = querystring.substring(querystring.indexOf('?') + 1).split('&');
  var params = {}, pair, d = decodeURIComponent, i;
  // march and parse
  for (i = querystring.length; i > 0;) {
    pair = querystring[--i].split('=');
    params[d(pair[0])] = d(pair[1]);
  }

  return params;
};//--  fn  deparam

