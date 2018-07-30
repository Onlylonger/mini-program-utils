'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _qrcode = require('./libs/qrcode');

// support Chinese
var utf16to8 = function utf16to8(str) {
  var out = '';
  var len = str.length;
  for (var i = 0; i < len; i++) {
    var c = str.charCodeAt(i);
    if (c >= 0x0001 && c <= 0x007f) {
      out += str.charAt(i);
    } else if (c > 0x07ff) {
      out += String.fromCharCode(0xe0 | c >> 12 & 0x0f);
      out += String.fromCharCode(0x80 | c >> 6 & 0x3f);
      out += String.fromCharCode(0x80 | c >> 0 & 0x3f);
    } else {
      out += String.fromCharCode(0xc0 | c >> 6 & 0x1f);
      out += String.fromCharCode(0x80 | c >> 0 & 0x3f);
    }
  }
  return out;
};

function drawQrcode(options) {
  options = options || {};
  options = Object.assign({
    sx: 0,
    sy: 0,
    reserve: false,
    width: 256,
    height: 256,
    typeNumber: -1,
    correctLevel: _qrcode.QRErrorCorrectLevel.H,
    background: '#ffffff',
    foreground: '#000000'
  }, options);

  if (!options.canvasId) {
    console.warn('please you set canvasId!');
    return;
  }

  createCanvas();

  function createCanvas() {
    // create the qrcode itself
    var qrcode = new _qrcode.QRCode(options.typeNumber, options.correctLevel);
    qrcode.addData(utf16to8(options.text));
    qrcode.make();

    // get canvas context
    var ctx = options._this ? wx.createCanvasContext && wx.createCanvasContext(options.canvasId, options._this) : wx.createCanvasContext && wx.createCanvasContext(options.canvasId);
    // compute tileW/tileH based on options.width/options.height
    var tileW = options.width / qrcode.getModuleCount();
    var tileH = options.height / qrcode.getModuleCount();

    // draw in the canvas
    for (var row = 0; row < qrcode.getModuleCount(); row++) {
      for (var col = 0; col < qrcode.getModuleCount(); col++) {
        var style = qrcode.isDark(row, col) ? options.foreground : options.background;
        ctx.setFillStyle(style);
        var w = Math.ceil((col + 1) * tileW) - Math.floor(col * tileW);
        var h = Math.ceil((row + 1) * tileW) - Math.floor(row * tileW);
        ctx.fillRect(Math.round(options.sx + col * tileW), Math.round(options.sy + row * tileH), w, h);
      }
    }

    ctx.draw(options.reserve, function (e) {
      options.callback && options.callback(e);
    });
  }
}

exports.default = drawQrcode;