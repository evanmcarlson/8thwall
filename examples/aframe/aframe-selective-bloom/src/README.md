# About this project

Based on "[aframe: camera + scene postprocessing](https://www.8thwall.com/evan/aframe-camera-scene-pp)",  
I have created a sample that applies Unreal Bloom to a specific entity in an A-Frame.  
Personally, I would like to use this feature frequently, so if anyone needs it, please feel free to use it.

## How to use

In body.html, add the data attribute data-bloom to the entity.  
If `data-bloom="bloom"`, it will emit light.
If `data-bloom="non-bloom"`, the entity will maintain a back-and-forth relationship with the emitting object without emitting light.
