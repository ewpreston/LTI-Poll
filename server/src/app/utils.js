// Generated by CoffeeScript 1.10.0
(function() {
  exports.special_encode = function(string) {
    return encodeURIComponent(string)
      .replace(/[!'()]/g, escape)
      .replace(/\*/g, "%2A");
  };
}.call(this));
