'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Socket = function () {
  function Socket(url, opts) {
    _classCallCheck(this, Socket);

    this.ws = null;
    this.num = 0;
    this.url = '';
    this.maxAttempts = 0;

    this.url = url;
    this.opts = opts;
    this.timeout = opts.timeout || 1e3;
    this.maxAttempts = opts.maxAttempts || Infinity;
    this.open();
  }

  _createClass(Socket, [{
    key: 'open',
    value: function open() {
      var _this = this;

      this.ws = wx.connectSocket({
        url: this.url
      });
      this.ws.onMessage(function (data) {
        _this.opts.onMessage && _this.opts.onMessage(data);
      });
      this.ws.onClose(function (e) {
        e.code !== 1e3 && e.code !== 1005 && _this.reconnect(e);
        _this.opts.onClose && _this.opts.onClose(e);
      });
      this.ws.onError(function (e) {
        e && e.code === 'ECONNREFUSED' ? _this.reconnect(e) : _this.opts.onError && _this.opts.onError(e);
      });
      this.ws.onOpen(function (e) {
        _this.num = 0;
        _this.opts.onOpen && _this.opts.onOpen(e);
      });
    }
  }, {
    key: 'reconnect',
    value: function reconnect(e) {
      var _this2 = this;

      this.num++ < this.maxAttempts ? setTimeout(function () {
        _this2.opts.onReconnect && _this2.opts.onReconnect(e);
        _this2.open();
      }, this.timeout) : this.opts.onMaximum && this.opts.onMaximum(e);
    }
  }, {
    key: 'send',
    value: function send(data) {
      if (typeof data === 'string') {
        this.wx.send({ data: data });
      } else {
        this.ws.send({ data: JSON.stringify(data) });
      }
    }
  }, {
    key: 'close',
    value: function close() {
      var code = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
      var reason = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '前端正常关闭';

      this.ws.close({ code: code, reason: reason });
    }
  }]);

  return Socket;
}();

exports.default = Socket;