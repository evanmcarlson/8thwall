// Copyright (c) 2022 8th Wall, Inc.
//
// app.js is the main entry point for your 8th Wall app. Code here will execute after head.html
// is loaded, and before body.html is loaded.
import {chromaKeyShader} from './chromakey'
AFRAME.registerShader('chromakey', chromaKeyShader)

AFRAME.registerComponent('play-video', {
  init() {
    const playVideo = () => {
      const el = document.getElementById('videoEl')
      el.setAttribute('animation', 'property: material.opacity; from: 0; to: 1; dur: 1000')
      document.getElementById('video').play()
      this.el.sceneEl.removeEventListener('xrimagefound', playVideo)
    }

    this.el.sceneEl.addEventListener('xrimagefound', playVideo)
  },
})
