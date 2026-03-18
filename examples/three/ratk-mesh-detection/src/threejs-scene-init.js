// Define an 8th Wall XR Camera Pipeline Module that adds a cube to a threejs scene on startup.

export const initScenePipelineModule = () => {
  let ratk

  const setupRoom = ({scene, renderer}) => {
    ratk = new window.RealityAccelerator(renderer.xr)
    ratk.onPlaneAdded = (plane) => {
      const mesh = plane.planeMesh
      mesh.material = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0.5,
        color: Math.random() * 0xffffff,
        side: THREE.DoubleSide,
      })
    }
    ratk.onMeshAdded = (mesh) => {
      const {meshMesh} = mesh
      meshMesh.material = new THREE.MeshBasicMaterial({
        wireframe: true,
        color: Math.random() * 0xffffff,
      })
    }
    scene.add(ratk.root)
  }

  // Populates a cube into an XR scene and sets the initial camera position.
  async function initXrScene({scene, camera, renderer}) {
    // Enable shadows in the renderer.
    renderer.shadowMap.enabled = true

    // Set the initial camera position relative to the scene we just laid out. This must be at a
    // height greater than y=0.
    setTimeout(() => {
      camera.position.set(0, 2, 2)
    }, 100)

    setupRoom({scene, renderer})
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
    onUpdate: ({frameStartResult}) => {
      ratk.update()
    },
  }
}
