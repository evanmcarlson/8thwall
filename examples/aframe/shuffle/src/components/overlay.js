const overlayComponent = {
  init() {
    const beginBtn = document.getElementById('begin')
    const instructions = document.getElementById('instructions')
    const models = document.getElementById('models')

    const handleBegin = () => {
      console.log('begin1')
      // cleanup
      beginBtn.removeEventListener('click', handleBegin)
      this.el.sceneEl.emit('begin')
      this.el.sceneEl.emit('recenter')

      // show models
      models.setAttribute('visible', true)
      models.setAttribute('tap-place-cursor', 'yOffset: 0.5')

      instructions.style.opacity = 1
    }

    beginBtn.addEventListener('click', handleBegin)
  },
}
export {overlayComponent}
