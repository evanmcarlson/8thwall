const tapPlaceCursorComponent = {
  schema: {
    yOffset: {type: 'number', default: 0},
  },
  init() {
    this.raycaster = new THREE.Raycaster()
    this.camera = document.getElementById('camera')
    this.threeCamera = this.camera.getObject3D('camera')
    this.ground = document.getElementById('ground')
    this.rayOrigin = new THREE.Vector2(0, 0)
    this.cursorLocation = new THREE.Vector3(0, 0, 0)

    const model = document.getElementById('models')
    const instructions = document.getElementById('instructions')

    const placeModel = () => {
      this.el.sceneEl.removeEventListener('touchstart', placeModel)
      instructions.style.opacity = 0

      model.setAttribute('position', this.el.object3D.position)
      model.setAttribute('visible', 'true')

      this.el.sceneEl.emit('placed')
    }

    instructions.style.opacity = 1

    // add tap event listener
    this.el.sceneEl.addEventListener('touchstart', placeModel)
  },
  tick() {
    // Raycast from camera to ground
    this.raycaster.setFromCamera(this.rayOrigin, this.threeCamera)
    const intersects = this.raycaster.intersectObject(this.ground.object3D, true)
    if (intersects.length > 0) {
      const [intersect] = intersects
      this.cursorLocation = intersect.point
    }
    this.el.object3D.position.y = this.data.yOffset
    this.el.object3D.position.lerp(this.cursorLocation, 0.4)
    this.el.object3D.rotation.y = this.threeCamera.rotation.y
  },
}
export {tapPlaceCursorComponent}
