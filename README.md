# Assets

Public asset repository for brand icons and other shared media used in HTML email footers and related web snippets.

## Structure

```text
icons/
  brands/
    svg/
    png/
```

- Put source vector icons in `icons/brands/svg/`
- Put email-safe delivery files in `icons/brands/png/`
- Use lowercase, hyphenated file names such as `linkedin.svg` and `instagram.png`

## Recommended Icon Standard

- For email footers, use PNG as the primary delivered asset
- Keep one master SVG per brand when available
- Export transparent PNGs at `48x48`
- In email HTML, render icons at `20px` to `24px`

## Public URL Patterns

Once the files are committed and pushed, you can use one of these URL styles:

GitHub Pages:

```text
https://emildellert.github.io/assets/icons/brands/png/linkedin.png
https://emildellert.github.io/assets/icons/brands/svg/linkedin.svg
```

jsDelivr CDN:

```text
https://cdn.jsdelivr.net/gh/emildellert/assets@main/icons/brands/png/linkedin.png
https://cdn.jsdelivr.net/gh/emildellert/assets@main/icons/brands/svg/linkedin.svg
```

## Notes For Email Footers

- PNG is the safer format for broad email client compatibility
- SVG files are useful as editable source assets
- If you use SVG directly in email HTML, test across your target clients first
