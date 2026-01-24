import {TransformControls} from './TransformControls'

const transformComponent = {
  init() {
    this.control = new TransformControls(this.el.sceneEl.camera, this.el.sceneEl.renderer.domElement)

    this.control.attach(this.el.object3D)
    this.el.sceneEl.object3D.add(this.control)

    window.addEventListener('keydown', (event) => {
      switch (event.keyCode) {
        case 87:  // W
          this.control.setMode('translate')
          break

        case 69:  // E
          this.control.setMode('rotate')
          break

        case 82:  // R
          this.control.setMode('scale')
          break
      }
    })
  },
  remove() {
    this.control.detach(this.el.object3D)
    this.el.sceneEl.object3D.remove(this.control)
  },
}
export {transformComponent}
