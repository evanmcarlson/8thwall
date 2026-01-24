// Copyright (c) 2022 8th Wall, Inc.

import './index.css'

import {sequenceComponent} from './components/sequence'
AFRAME.registerComponent('sequence', sequenceComponent)

import {tapPlaceCursorComponent} from './components/tap-place'
AFRAME.registerComponent('tap-place-cursor', tapPlaceCursorComponent)

import {overlayComponent} from './components/overlay'
AFRAME.registerComponent('overlay', overlayComponent)
