// Copyright (c) 2022 8th Wall, Inc.
//
// app.js is the main entry point for your 8th Wall app. Code here will execute after head.html
// is loaded, and before body.html is loaded.

// create a worker using an asset bundle
const worker = new Worker(require('./assets/worker.js'))
worker.postMessage('hello from asset bundle worker')

// create an inline worker
const blob = new Blob([
  `onmessage = function(e) {
        console.log(e.data);
    }`,
])
const blobURL = window.URL.createObjectURL(blob)
const myInlineWorker = new Worker(blobURL)
myInlineWorker.postMessage('hello from inline worker')
