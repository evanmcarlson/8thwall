### AR Pride Shirt

Made with Photoshop, Premeire Pro, and A-Frame.

![](https://i.giphy.com/media/j7MP9e5tobXWmwiWbK/giphy-downsized-large.gif)

### Make it your own

Make this experience in 5 steps, or, watch the video tutorial (start at 28 minutes).

[video tutorial](https://www.youtube.com/watch?v=rQf8bSVY3QQ)

1. First, take a photo of someone wearing a shirt with a design and crop the image to a perfect square.

![](https://static.8thwall.app/assets/logo-j79d75u2rb.jpg)

2. Removed everything except for the logo using Adobe Photoshop or similar.

![](https://static.8thwall.app/assets/logo-em79qic258.png)

3. Use the logo as a mask over a video of a rainbow gradient (also exported as a perfect square).

todo: make a tutorial

![](https://static.8thwall.app/assets/Sequence%2001-tlak5hi32g.mp4)

4. Finally, upload the image target (the square from step 1)

![](https://cdn.8thwall.com/image-target/evan/713a5d55-1fb2-4046-8dfa-eaf604396a2d)

5. Add the video as a child of the `<named-image-target>` to a square plane in `body.html`. Use the chromakey shader to remove the black background.

```
  <xrextras-named-image-target name="shirt">
    <a-plane id="videoEl" material="shader: chromakey; src: #video; color: 0 0 0; opacity: 0"></a-plane>
  </xrextras-named-image-target>
```

### Try the experience yourself

![](<https://static.8thwall.app/assets/IMG_5829%20(1)-t9dk57i3zg.jpg>)
