'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash.random');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bubble = function () {
  function Bubble(ops) {
    _classCallCheck(this, Bubble);

    this.running = false;
    this.queue = [];

    this.config = {
      canvasId: ops.canvasId,
      canvasWidth: ops.canvasWidth,
      canvasHeight: ops.canvasHeight
    };
    this.canvasCtx = wx.createCanvasContext(this.config.canvasId);
  }

  _createClass(Bubble, [{
    key: 'animate',
    value: function animate() {
      var _this = this;

      if (!this.queue.length) {
        this.running = false;
        return;
      }
      this.running = true;

      this.queue.forEach(function (v) {
        _this.canvasCtx.save();
        var lifespan = (v.timestamp + v.duration - new Date()) / v.duration;
        if (lifespan >= 0) {
          var scale = v.getScale(lifespan);
          var rotate = v.getRotate(lifespan);
          var translateX = v.getTranslateX(lifespan);
          var translateY = v.getTranslateY(lifespan);
          _this.canvasCtx.translate(translateX, translateY);
          _this.canvasCtx.scale(scale, scale);
          _this.canvasCtx.rotate(rotate * Math.PI / 180);
          _this.canvasCtx.globalAlpha = v.getAlpha(lifespan);
          _this.canvasCtx.drawImage(v.url, -v.width / 2, -v.height / 2, v.width, v.height);
          _this.canvasCtx.restore();
        } else {
          v.endCb && v.endCb();
          v.show = false;
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
      var url = _ref.url,
          width = _ref.width,
          height = _ref.height,
          _ref$duration = _ref.duration,
          duration = _ref$duration === undefined ? (0, _lodash2.default)(2400, 3600) : _ref$duration,
          endCb = _ref.endCb;

      var offset = 10;
      var zoomInStage = (0, _lodash2.default)(70, 91) / 100;
      var zoomInRest = 1 - zoomInStage;
      var basicScale = ((0, _lodash2.default)(45, 60) + (0, _lodash2.default)(45, 60)) / 100;
      var basicRotate = (0, _lodash2.default)(-30, 30);
      var basicTranslateX = this.config.canvasWidth / 2 + (0, _lodash2.default)(-offset, offset);
      var amplitude = (this.config.canvasWidth - Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2))) / 2 - offset;
      var wave = (0, _lodash2.default)(amplitude * 0.8, amplitude) * ((0, _lodash2.default)(0, 1) ? 1 : -1);
      var frequency = (0, _lodash2.default)(250, 400);
      var fadeOutStage = (0, _lodash2.default)(14, 18) / 100;

      var self = this;

      var tmp = {
        show: true,
        url: url,
        width: width,
        height: height,
        timestamp: +new Date(),
        duration: duration,
        endCb: endCb,
        getScale: function getScale(lifespan) {
          if (lifespan > zoomInStage) {
            return Math.max(((1 - lifespan) / zoomInRest).toFixed(2), 0.1) * basicScale;
          }
          return basicScale;
        },
        getRotate: function getRotate(lifespan) {
          return basicRotate;
        },
        getTranslateX: function getTranslateX(lifespan) {
          if (lifespan > zoomInStage) {
            return basicTranslateX;
          }
          return basicTranslateX + wave * Math.sin(frequency * (zoomInStage - lifespan) * Math.PI / 180);
        },
        getTranslateY: function getTranslateY(lifespan) {
          return height / 2 + (self.config.canvasHeight - height / 2) * lifespan;
        },
        getAlpha: function getAlpha(lifespan) {
          if (lifespan > fadeOutStage) {
            return 1;
          }
          return 1 - ((fadeOutStage - lifespan) / fadeOutStage).toFixed(2);
        }
      };
      this.queue.push(tmp);
      !this.running && this.animate();
    }
  }]);

  return Bubble;
}();

exports.default = Bubble;