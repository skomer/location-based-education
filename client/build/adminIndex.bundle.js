/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var quizServer = __webpack_require__(1);
	
	window.onload = function() {
	  var allQuizzes;
	
	  quizServer.getAllQuizzes( function( data ) {
	    allQuizzes = data;
	    var allQuizzesList = document.getElementById( 'all-quizzes-list' );
	    allQuizzes.forEach( function( quiz ) {
	      var li = document.createElement( 'li' );
	      li.innerText = quiz.title;
	      allQuizzesList.appendChild( li );
	    });
	  });
	}


/***/ },
/* 1 */
/***/ function(module, exports) {

	var quizServer = {
	  getAllQuizzes: function( callback ) {
	    var request = new XMLHttpRequest();
	    var url = "http://localhost:3000/quizzes";
	    request.open( 'GET', url );
	    request.onload = function() {
	      if ( this.status === 200 ) {
	        var allQuizzes = JSON.parse( this.responseText );
	        callback( allQuizzes );
	      }
	      else {
	        console.error( "GET request to", url, "failed with status", this.status );
	      }
	    }
	    request.send();
	  }
	};
	
	module.exports = quizServer;


/***/ }
/******/ ]);
//# sourceMappingURL=adminIndex.bundle.js.map