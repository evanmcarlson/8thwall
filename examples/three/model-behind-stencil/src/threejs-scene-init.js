// test
export const initScenePipelineModule = () => {
  let model

  const loader = new THREE.GLTFLoader()
  const modelFile = require('./assets/combined-ocean.glb')

  const cube = new THREE.Group()

  const initXrScene = ({scene, camera, renderer}) => {
    // Enable shadows in the rednerer.
    renderer.shadowMap.enabled = true

    // Add some light to the scene.
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    directionalLight.position.set(5, 10, 7)
    directionalLight.castShadow = true
    scene.add(directionalLight)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    function initCube() {
      const addStencilPlane = (stencilRef, planePos, planeRot) => {
        // CUBE FACE
        const planeGeom = new THREE.PlaneGeometry()
        const stencilMat = new THREE.MeshPhongMaterial()
        stencilMat.colorWrite = false
        stencilMat.depthWrite = false
        stencilMat.stencilWrite = true
        stencilMat.stencilRef = stencilRef
        stencilMat.stencilFunc = THREE.AlwaysStencilFunc
        stencilMat.stencilZPass = THREE.ReplaceStencilOp
        const stencilMesh = new THREE.Mesh(planeGeom, stencilMat)
        stencilMesh.position.copy(planePos)
        stencilMesh.rotation.x = planeRot.x
        stencilMesh.rotation.y = planeRot.y
        stencilMesh.rotation.z = planeRot.z
        stencilMesh.scale.multiplyScalar(0.9)
        cube.add(stencilMesh)

        // object(s) behind stencil plane
        loader.load(modelFile, (gltf) => {
          model = gltf.scene
          model.castShadow = true
          model.traverse((o) => {
            if (o.isMesh) {
              console.log('mesh')
              o.material.stencilWrite = true
              o.material.stencilRef = stencilRef
              o.material.stencilFunc = THREE.EqualStencilFunc
            }
          })
          // model.renderOrder = 3
          cube.add(model)
        })
      }

      addStencilPlane(1, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0))

      cube.position.set(0, 1, -2)
      scene.add(cube)
    }

    initCube()

    // Add a plane that can receive shadows.
    const planeGeometry = new THREE.PlaneGeometry(2000, 2000)
    planeGeometry.rotateX(-Math.PI / 2)

    const planeMaterial = new THREE.ShadowMaterial()
    planeMaterial.opacity = 0.67

    const plane = new THREE.Mesh(planeGeometry, planeMaterial)
    plane.receiveShadow = true
    scene.add(plane)

    // Set the initial camera position relative to the scene we just laid out. This must be at a
    // height greater than y=0.
    camera.position.set(0, 2, 2)
  }

  // Return a camera pipeline module that adds scene elements on start.
  return {
    // Camera pipeline modules need a name. It can be whatever you want but must be unique within
    // your app.
    name: 'threejsinitscene',

    // onStart is called once when the camera feed begins. In this case, we need to wait for the
    // XR8.Threejs scene to be ready before we can access it to add content. It was created in
    // XR8.Threejs.pipelineModule()'s onStart method.
    onStart: ({canvas}) => {
      const {scene, camera, renderer} = XR8.Threejs.xrScene()  // Get the 3js scene from XR8.Threejs

      initXrScene({scene, camera, renderer})  // Add objects set the starting camera position.

      // prevent scroll/pinch gestures on canvas
      canvas.addEventListener('touchmove', (event) => {
        event.preventDefault()
      })

      // Sync the xr controller's 6DoF position and camera paremeters with our scene.
      XR8.XrController.updateCameraProjectionMatrix(
        {origin: camera.position, facing: camera.quaternion}
      )
    },
    onRender: () => {
      const {renderer} = XR8.Threejs.xrScene()  // Get the 3js scene from XR8.Threejs
      renderer.clearStencil()
    },
  }
}
