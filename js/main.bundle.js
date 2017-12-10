/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_getTS__ = __webpack_require__(1);
/* global CoinHive */


const App = { stats: {}, miner: {} };
const logInterval = 5000;

function log(obj) {
  const ts = Object(__WEBPACK_IMPORTED_MODULE_0__modules_getTS__["a" /* default */])();
  App.$console.prepend(`${ts} - ${JSON.stringify(obj)} \n`);
}

function updateStats() {
  App.stats.hashesPerSecond = App.miner.getHashesPerSecond();
  App.stats.totalHashes = App.miner.getTotalHashes();
  App.stats.acceptedHashes = App.miner.getAcceptedHashes();
  App.stats.rate = `${App.stats.hashesPerSecond.toFixed(1)}/sec`;
  App.$totals.html(`H/s: ${Math.round(App.stats.hashesPerSecond)}, Total: ${App.stats.totalHashes}`);
}

function initApp() {
  const opts = { threads: 1, throttle: 0.9 };
  App.$options = $('#options');
  App.$totals = $('#totals');
  App.$console = $('#console');
  App.$options.html(`Threads: ${opts.threads}, Throttle: ${opts.throttle * 100}%`);
  const CH = CoinHive;
  App.miner = new CH.Anonymous('s0N1th4I4ElExw1U3JlqGVTjZR428Nyq', opts);
  App.miner.start();
  App.miner.on('error', function (ev) {
    log({ error: ev });
  });
  App.miner.on('found', function (ev) {
    log({ found: ev.hashes });
  });
  App.miner.on('accepted', function (ev) {
    log({ accepted: ev.hashes });
  });

  updateStats();
  log({ started: true });
}

$(function () {
  initApp();

  setInterval(() => {
    updateStats();
    const { rate } = App.stats;
    log({ rate });
  }, logInterval);
});

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getTS;

function getTS() {
  const dd = new Date();
  const hour = (dd.getHours() < 10 ? '0' : '') + dd.getHours();
  const min = (dd.getMinutes() < 10 ? '0' : '') + dd.getMinutes();
  const sec = (dd.getSeconds() < 10 ? '0' : '') + dd.getSeconds();
  return `${hour}:${min}:${sec}`;
}

/***/ })
/******/ ]);