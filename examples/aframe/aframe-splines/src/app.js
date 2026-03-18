// Copyright (c) 2022 8th Wall, Inc.
//
// app.js is the main entry point for your 8th Wall app. Code here will execute after head.html
// is loaded, and before body.html is loaded.
import {splinePipelineModule} from './splines'

AFRAME.registerComponent('splines', {
  init() {
    const scene = this.el.sceneEl.object3D
    const {renderer} = this.el.sceneEl

    const onxrloaded = () => {
      XR8.addCameraPipelineModule(splinePipelineModule(scene, renderer))
    }
    window.XR8 ? onxrloaded() : window.addEventListener('xrloaded', onxrloaded)
  },
})
