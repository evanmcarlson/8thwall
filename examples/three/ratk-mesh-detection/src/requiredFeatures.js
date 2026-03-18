const requiredFeaturesPipelineModule = {
  name: 'add-mesh-detection',
  onCameraStatusChange: (event) => {
    if (event.status === 'requestingWebXr') {
      event.sessionInit.requiredFeatures.push('mesh-detection')
      event.sessionInit.optionalFeatures.push('depth-sensing')
    }
  },
}

export {requiredFeaturesPipelineModule}
