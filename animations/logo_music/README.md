# Logo Music Animation

This folder is the editable source for:

- `../../icons/logo_music_animated.gif`

## Edit

Adjust the animation in:

- `render.html`

The easiest values to tweak are near the top in `window.ANIMATION_CONFIG`.

## Build

```bash
cd /Users/emildellert/Desktop/work/CODING/Assets/assets/animations/logo_music
npm install
npm run build
```

The build script renders the frames with headless Chrome and writes the final GIF back to:

- `../../icons/logo_music_animated.gif`

## Notes

- The GIF itself is not the editable source.
- For motion changes, always update `render.html` and rebuild.
