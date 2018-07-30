'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash.random');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Danmu = function () {
  function Danmu(ops) {
    _classCallCheck(this, Danmu);

    this.running = false;
    this.queue = [];
    this.speed = 1;

    this.config = {
      canvasId: ops.canvasId,
      canvasWidth: ops.canvasWidth,
      canvasHeight: ops.canvasHeight
    };
    this.canvasCtx = wx.createCanvasContext(this.config.canvasId);
    this.canvasCtx.textBaseline = 'top';
    this.canvasCtx.textAlign = 'left';
  }

  _createClass(Danmu, [{
    key: 'animate',
    value: function animate() {
      var _this = this;

      if (!this.queue.length) {
        this.running = false;
        return;
      }
      this.running = true;
      this.canvasCtx.clearRect(0, 0, this.config.canvasWidth, this.config.canvasHeight);
      this.queue.forEach(function (v) {
        if (v.sx > _this.config.canvasWidth + v.width) {
          v.show = false;
        } else {
          v.render(_this.canvasCtx, v);
          v.sx += v.speed || _this.speed;
        }
      });
      this.canvasCtx.draw();
      this.queue = this.queue.filter(function (v) {
        return v.show;
      });
      setTimeout(function () {
        _this.animate();
      }, 20);
    }
  }, {
    key: 'setEntity',
    value: function setEntity(_ref) {
      var render = _ref.render,
          getEntityInfo = _ref.getEntityInfo;

      var tmp = {
        sx: 0,
        sy: 0,
        show: true,
        render: render
      };
      var entityInfo = getEntityInfo(this.canvasCtx);
      Object.assign(tmp, entityInfo, {
        sy: (0, _lodash2.default)(0, this.config.canvasHeight - entityInfo.height)
      });
      this.queue.push(tmp);
      console.log(this.queue);
      !this.running && this.animate();
    }
  }]);

  return Danmu;
}();

exports.default = Danmu;