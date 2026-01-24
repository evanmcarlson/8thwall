const sequenceComponent = {
  schema: {
  },
  init() {
    const card = document.getElementById('introCard')
    const beginBtn = document.getElementById('begin')

    const recenterBtn = document.getElementById('recenterBtn')
    const instructions = document.getElementById('instructions')

    const model = document.getElementById('model')

    const pivot = document.getElementById('pivot')
    const model1 = document.getElementById('model1')
    const model2 = document.getElementById('model2')
    const model3 = document.getElementById('model3')
    const box1 = document.getElementById('box1')
    const box2 = document.getElementById('box2')
    const box3 = document.getElementById('box3')

    const startSelection = () => {
      instructions.firstElementChild.textContent = 'Pick a box!'
      instructions.style.opacity = 1

      // glow
      model1.lastElementChild.setAttribute('animation__pulse', 'property: opacity; from: 0; to: 1; loop: true; dir: alternate; easing: easeOutQuad')
      model2.lastElementChild.setAttribute('animation__pulse', 'property: opacity; from: 0; to: 1; loop: true; dir: alternate; easing: easeOutQuad')
      model3.lastElementChild.setAttribute('animation__pulse', 'property: opacity; from: 0; to: 1; loop: true; dir: alternate; easing: easeOutQuad')

      const select1 = () => {
        model1.removeEventListener('click', select1)
        model1.lastElementChild.removeAttribute('animation__pulse')
        model1.lastElementChild.setAttribute('opacity', 0)
        instructions.style.opacity = 0
      }

      const select2 = () => {
        model2.removeEventListener('click', select2)
        model2.lastElementChild.removeAttribute('animation__pulse')
        model2.lastElementChild.setAttribute('opacity', 0)
        instructions.style.opacity = 0
      }

      const select3 = () => {
        model3.removeEventListener('click', select3)
        model3.lastElementChild.removeAttribute('animation__pulse')
        model3.lastElementChild.setAttribute('opacity', 0)
        instructions.style.opacity = 0
      }

      box1.addEventListener('click', select1)
      box2.addEventListener('click', select2)
      box3.addEventListener('click', select3)
    }

    const startContent = () => {
      this.el.removeEventListener('placed', startContent)

      const handleShuffle = () => {
        // make two entities children of empty parent
        pivot.setAttribute('position', '1 0 0')
        pivot.object3D.add(model2.object3D)
        pivot.object3D.add(model3.object3D)
        model2.setAttribute('position', '-1 0 0')
        model3.setAttribute('position', '1 0 0')

        pivot.setAttribute('animation__one', 'property: rotation; to: 0 180 0; easing: easeInOutQuad; dur: 1500')
        model2.setAttribute('animation__rot', 'property: rotation; to: 0 -180 0; easing: easeInOutQuad; dur: 1500')
        model3.setAttribute('animation__rot', 'property: rotation; to: 0 -180 0; easing: easeInOutQuad; dur: 1500')

        const reset1 = () => {
          // remove
          pivot.removeEventListener('animationcomplete__one', reset1)
          pivot.removeAttribute('animation__one')
          model2.removeAttribute('animation__rot')
          model3.removeAttribute('animation__rot')
          // reset
          model2.setAttribute('rotation', '0 0 0')
          model3.setAttribute('rotation', '0 0 0')
          // adjust
          model.object3D.add(model2.object3D)
          model.object3D.add(model3.object3D)
          model3.setAttribute('position', '0 0 0')
          model2.setAttribute('position', '2 0 0')
          pivot.setAttribute('position', '-1 0 0')
          pivot.setAttribute('rotation', '0 0 0')
          pivot.object3D.add(model1.object3D)
          pivot.object3D.add(model3.object3D)
          model1.setAttribute('position', '-1 0 0')
          model3.setAttribute('position', '1 0 0')
          // animation two
          pivot.setAttribute('animation__two', 'property: rotation; to: 0 -180 0; easing: easeInOutQuad; dur: 1500')
          model1.setAttribute('animation__rot', 'property: rotation; to: 0 180 0; easing: easeInOutQuad; dur: 1500')
          model3.setAttribute('animation__rot', 'property: rotation; to: 0 180 0; easing: easeInOutQuad; dur: 1500')

          const endShuffle = () => {
            // remove
            pivot.removeAttribute('animation__two')
            model1.removeAttribute('animation__rot')
            model3.removeAttribute('animation__rot')
            // reset
            model1.setAttribute('rotation', '0 0 0')
            model3.setAttribute('rotation', '0 0 0')
            model.object3D.add(model1.object3D)
            model.object3D.add(model3.object3D)
            model3.setAttribute('position', '-2 0 0')
            model1.setAttribute('position', '0 0 0')
            startSelection()
          }

          pivot.addEventListener('animationcomplete__two', endShuffle)
        }

        // ungroup
        pivot.addEventListener('animationcomplete__one', reset1)
      }

      this.el.addEventListener('shuffle', handleShuffle)
      this.el.emit('shuffle')
    }

    beginBtn.addEventListener('click', () => {
      // remove intro card
      card.classList.add('slideDown')
      setTimeout(() => {
        card.classList.remove('slideDown')
        card.style.display = 'none'
      }, 200)

      // display ui elements
      recenterBtn.style.opacity = 1
      recenterBtn.addEventListener('click', () => {
        this.el.emit('recenter')
        this.el.camera.setAttribute('position', '0 0 0')
        this.el.camera.setAttribute('rotation', '0 0 0')
      })

      this.el.sceneEl.emit('recenter')

      this.el.addEventListener('placed', startContent)
    })
  },
}

export {sequenceComponent}
