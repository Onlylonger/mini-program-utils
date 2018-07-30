import random from 'lodash.random'

export default class Bubble {
  running = false
  queue = []

  constructor(ops) {
    this.config = {
      canvasId: ops.canvasId,
      canvasWidth: ops.canvasWidth,
      canvasHeight: ops.canvasHeight
    }
    this.canvasCtx = wx.createCanvasContext(this.config.canvasId)
  }

  animate() {
    if (!this.queue.length) {
      this.running = false
      return
    }
    this.running = true

    this.queue.forEach(v => {
      this.canvasCtx.save()
      const lifespan = (v.timestamp + v.duration - new Date()) / v.duration
      if (lifespan >= 0) {
        const scale = v.getScale(lifespan)
        const rotate = v.getRotate(lifespan)
        const translateX = v.getTranslateX(lifespan)
        const translateY = v.getTranslateY(lifespan)
        this.canvasCtx.translate(translateX, translateY)
        this.canvasCtx.scale(scale, scale)
        this.canvasCtx.rotate((rotate * Math.PI) / 180)
        this.canvasCtx.globalAlpha = v.getAlpha(lifespan)
        this.canvasCtx.drawImage(
          v.url,
          -v.width / 2,
          -v.height / 2,
          v.width,
          v.height
        )
        this.canvasCtx.restore()
      } else {
        v.endCb && v.endCb()
        v.show = false
      }
    })
    this.canvasCtx.draw()
    this.queue = this.queue.filter(v => v.show)
    setTimeout(() => {
      this.animate()
    }, 20)
  }

  setEntity({ url, width, height, duration = random(2400, 3600), endCb }) {
    const offset = 10
    const zoomInStage = random(70, 91) / 100
    const zoomInRest = 1 - zoomInStage
    const basicScale = (random(45, 60) + random(45, 60)) / 100
    const basicRotate = random(-30, 30)
    const basicTranslateX =
      this.config.canvasWidth / 2 + random(-offset, offset)
    const amplitude =
      (this.config.canvasWidth -
        Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2))) /
        2 -
      offset
    const wave = random(amplitude * 0.8, amplitude) * (random(0, 1) ? 1 : -1)
    const frequency = random(250, 400)
    const fadeOutStage = random(14, 18) / 100

    const self = this

    const tmp = {
      show: true,
      url,
      width,
      height,
      timestamp: +new Date(),
      duration,
      endCb,
      getScale(lifespan) {
        if (lifespan > zoomInStage) {
          return (
            Math.max(((1 - lifespan) / zoomInRest).toFixed(2), 0.1) * basicScale
          )
        }
        return basicScale
      },
      getRotate(lifespan) {
        return basicRotate
      },
      getTranslateX(lifespan) {
        if (lifespan > zoomInStage) {
          return basicTranslateX
        }
        return (
          basicTranslateX +
          wave *
            Math.sin((frequency * (zoomInStage - lifespan) * Math.PI) / 180)
        )
      },
      getTranslateY(lifespan) {
        return height / 2 + (self.config.canvasHeight - height / 2) * lifespan
      },
      getAlpha(lifespan) {
        if (lifespan > fadeOutStage) {
          return 1
        }
        return 1 - ((fadeOutStage - lifespan) / fadeOutStage).toFixed(2)
      }
    }
    this.queue.push(tmp)
    !this.running && this.animate()
  }
}
