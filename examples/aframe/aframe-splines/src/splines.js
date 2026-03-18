const splinePipelineModule = (scene, renderer) => {
  const N = 20  // number of vertices in a line
  const L = 200  // number of lines
  const lines = []
  let zero

  const v = new THREE.Vector3()
  function path(buf, t, i, rnd, r = 2) {
    t += 10 * rnd
    let a = (0.1 + 3 * rnd) * Math.sin(t + 13 * rnd) + 0.2 * rnd * Math.cos(13.2 * t + 3)
    const b = (3 - 3 * rnd) * Math.cos(t) + 2 * rnd * Math.cos(4.5 * t - 17 * rnd)

    a = 0.7 * a + Math.PI / 2
    v.setFromSphericalCoords(r, a, b)
    buf.setXYZ(i, v.x, v.y, v.z)
  }

  const initSplines = () => {
    const colors = []
    const color = new THREE.Color()
    const colors2 = []
    for (var i = 0; i < N; i++) {
      color.setHSL(0.6, 1, 1 - Math.abs((2 * i / (N - 1) - 1)) + 0.05)
      if (i % 19 == 0) color.setHSL(0.6, 1, 1)
      colors.push(color.r, color.g, color.b)
      colors2.push(color.r, 0, 0)
    }

    const material = new THREE.LineBasicMaterial({
      vertexColors: true,
    })

    let geometry; let line
    for (var i = 0; i < L; i++) {
      geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(colors, 3))
      geometry.setAttribute('color', new THREE.Float32BufferAttribute(i % 15 ? colors : colors2, 3))

      line = new THREE.Line(geometry, material)
      line.pos = geometry.getAttribute('position')
      line.rnd = 0.2 + 1.2 * Math.random()

      lines.push(line)
    }
    scene.add(...lines)
  }

  // Return a camera pipeline module that adds animated splines to the scene
  return {
    name: 'splines',
    onStart: ({canvas}) => {
      zero = performance.now()
      initSplines()
    },
    onUpdate: () => {
      const t = (performance.now() - zero)
      for (let j = 0; j < L; j++) {
        const line = lines[j]
        for (let i = 0; i < N; i++) path(line.pos, t / 5000 - i / 70, i, line.rnd, j % 15 ? 2 : 4 * Math.sin(i / 10))
        line.pos.needsUpdate = true
        line.rotation.set(t / 13000 + line.rnd, t / 12200 - 10 * line.rnd, t / 11700)
      }
    },
  }
}
export {splinePipelineModule}
