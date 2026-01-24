# AR Pins

I made AR Pins for my friends' birthday - happy birthday Chanel & Diana!

### Make it your own

1. Create a design or logo digitally.
2. Upload the design as an image target.

![image target design cropped on both edges](https://cdn.8thwall.com/image-target/evan/57cb4a48-c694-4fb5-a975-2bfd08c96a9e)

3. Create a transparent version of the design.

![transparent image target design](https://static.8thwall.app/assets/trans-nokfzk064d.png)

4. Use the transparent image as a texture on `<a-plane>`.

```

```

5. Animate the plane's rotation, apply a holographic shader.

`head.html`

```
<script src="https://unpkg.com/aframe-hologram-shader"></script>
```

`body.html`

```
<xrextras-named-image-target name="image">
  <!-- black circle to cover up the real pin -->
  <a-circle color="black" radius="0.46"></a-circle>

  <!-- transparent design -->
  <a-plane src="#img"
    material="transparent: true; shader: hologram; numGlitchBars: 20"
    position="0 0 0.5"
    animation__spin="property: rotation; from: 0 0 0; to: 0 0 360; loop: true; easing: linear; dur: 10000"
  ></a-plane>
</xrextras-named-image-target>
```

### Try the experience yourself

![image target design](https://static.8thwall.app/assets/chanel%20x%20diana-9vg69pu4w5.png)

## What I learned

- pins should be matte, the reflections caused issues with tracking
- use black on white, the contrast of the green was not enough
- "it worked once and that was enough"
