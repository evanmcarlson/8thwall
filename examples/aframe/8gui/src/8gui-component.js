const guiComponent = {
  schema: {
    'target': {type: 'string'},
  },
  init() {
    require('./8gui-standalone')

    if (this.data.target) {
      document.inspect(document.getElementById(this.data.target).object3D)
    } else {
      document.inspect(document.querySelector('a-scene').object3D)
    }
  },
}

export {guiComponent}
