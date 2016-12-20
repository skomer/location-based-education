var miscHelper = {
  getLastUrlElement: function() {
    var lastSlashIndex = window.location.href.lastIndexOf( '/' );
    return window.location.href.substr( lastSlashIndex + 1 );
  }
};

module.exports = miscHelper;
