import random from 'lodash.random'

export default class Danmu {
  running = false
  queue = []
  speed = 1

  constructor(ops) {
    this.config = {
      canvasId: ops.canvasId,
      canvasWidth: ops.canvasWidth,
      canvasHeight: ops.canvasHeight
    }
    this.canvasCtx = wx.createCanvasContext(this.config.canvasId)
    this.canvasCtx.textBaseline = 'top'
    this.canvasCtx.textAlign = 'left'
  }

  animate() {
    if (!this.queue.length) {
      this.running = false
      return
    }
    this.running = true
    this.canvasCtx.clearRect(
      0,
      0,
      this.config.canvasWidth,
      this.config.canvasHeight
    )
    this.queue.forEach(v => {
      if (v.sx > this.config.canvasWidth + v.width) {
        v.show = false
      } else {
        v.render(this.canvasCtx, v)
        v.sx += v.speed || this.speed
      }
    })
    this.canvasCtx.draw()
    this.queue = this.queue.filter(v => v.show)
    setTimeout(() => {
      this.animate()
    }, 20)
  }

  setEntity({ render, getEntityInfo }) {
    const tmp = {
      sx: 0,
      sy: 0,
      show: true,
      render
    }
    const entityInfo = getEntityInfo(this.canvasCtx)
    Object.assign(tmp, entityInfo, {
      sy: random(0, this.config.canvasHeight - entityInfo.height)
    })
    this.queue.push(tmp)
    console.log(this.queue)
    !this.running && this.animate()
  }
}
