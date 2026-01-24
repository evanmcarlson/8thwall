// Copyright (c) 2023 8th Wall, Inc.
//
// app.js is the main entry point for your 8th Wall app. Code here will execute after head.html
// is loaded, and before body.html is loaded.
import {faceTextureComponent} from './face-texture'
AFRAME.registerComponent('face-texture', faceTextureComponent)

AFRAME.registerComponent('custom-background', {
  init() {
    const imgPath = require('./assets/bg.jpg')
    const texture = new THREE.TextureLoader().load(imgPath)
    this.el.sceneEl.object3D.background = texture
  },
})
