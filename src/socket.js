export default class Socket {
  ws = null
  num = 0
  url = ''
  maxAttempts = 0

  constructor(url, opts) {
    this.url = url
    this.opts = opts
    this.timeout = opts.timeout || 1e3
    this.maxAttempts = opts.maxAttempts || Infinity
    this.open()
  }

  open() {
    this.ws = wx.connectSocket({
      url: this.url
    })
    this.ws.onMessage(data => {
      this.opts.onMessage && this.opts.onMessage(data)
    })
    this.ws.onClose(e => {
      e.code !== 1e3 && e.code !== 1005 && this.reconnect(e)
      this.opts.onClose && this.opts.onClose(e)
    })
    this.ws.onError(e => {
      e && e.code === 'ECONNREFUSED'
        ? this.reconnect(e)
        : this.opts.onError && this.opts.onError(e)
    })
    this.ws.onOpen(e => {
      this.num = 0
      this.opts.onOpen && this.opts.onOpen(e)
    })
  }
  reconnect(e) {
    this.num++ < this.maxAttempts
      ? setTimeout(() => {
          this.opts.onReconnect && this.opts.onReconnect(e)
          this.open()
        }, this.timeout)
      : this.opts.onMaximum && this.opts.onMaximum(e)
  }
  send(data) {
    if (typeof data === 'string') {
      this.wx.send({ data })
    } else {
      this.ws.send({ data: JSON.stringify(data) })
    }
  }
  close(code = 1000, reason = '前端正常关闭') {
    this.ws.close({ code, reason })
  }
}
