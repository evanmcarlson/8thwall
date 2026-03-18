// This is a component file. You can use this file to define a custom component for your project.
// This component will appear as a custom component in the editor.

import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'delete-on-reality-ready',
  stateMachine: ({world, eid}) => {
    ecs.defineState('default').initial().onEvent('realityready', 'ready', {
      target: world.events.globalId,
    })

    ecs.defineState('ready')
      .onEnter(() => {
        console.log('ready')
      })
      .wait(1500, 'fading')

    ecs.defineState('fading').wait(500, 'done')
      .onEnter(() => {
        ecs.CustomPropertyAnimation.set(world, eid, {
          from: 1,
          to: 0,
          duration: 500,
          attribute: 'ui',
          property: 'opacity',
        })
      })

    ecs.defineState('done').onEnter(() => {
      world.deleteEntity(eid)
    })
  },
})
