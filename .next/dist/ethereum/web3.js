'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _web = require('web3');

var _web2 = _interopRequireDefault(_web);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//This will give our web3 connected to the provider i.e metamask
var web3 = void 0;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  // we are in the browser and metamask is running
  web3 = new _web2.default(window.web3.currentProvider);
} else {
  //we are on the server or the user is not running meta mask
  var provider = new _web2.default.providers.HttpProvider('https://rinkeby.infura.io/v3/e7018385c9fe4497aab82d4efd7a8806');
  web3 = new _web2.default(provider);
}

exports.default = web3;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV0aGVyZXVtL3dlYjMuanMiXSwibmFtZXMiOlsiV2ViMyIsIndlYjMiLCJ3aW5kb3ciLCJjdXJyZW50UHJvdmlkZXIiLCJwcm92aWRlciIsInByb3ZpZGVycyIsIkh0dHBQcm92aWRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsQUFBTyxBQUFQOzs7Ozs7QUFFQTtBQUNBLElBQUksWUFBSjs7QUFFQSxJQUFHLE9BQU8sQUFBUCxXQUFrQixBQUFsQixlQUFpQyxPQUFPLE9BQU8sQUFBZCxTQUF1QixBQUEzRCxhQUF1RSxBQUNyRTtBQUNBO1NBQU8sQUFBSSxBQUFKLGtCQUFTLE9BQU8sQUFBUCxLQUFZLEFBQXJCLEFBQVAsQUFDRDtBQUhELE9BR0ssQUFDSDtBQUNGO01BQU0sV0FBVyxJQUFJLGNBQUssQUFBTCxVQUFlLEFBQW5CLGFBQ2QsQUFEYyxBQUFqQixBQUdFO1NBQU8sQUFBSSxBQUFKLGtCQUFTLEFBQVQsQUFBUCxBQUNEO0FBS0Q7O2tCQUFlLEFBQWYiLCJmaWxlIjoid2ViMy5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvaGFyc2gxdHNhMW4xL0Rlc2t0b3Ava2lja3N0YXJ0In0=