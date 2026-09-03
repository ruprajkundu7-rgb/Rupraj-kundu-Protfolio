# Rupraj Kundu — device portfolio

A portfolio that runs *inside* a device. Visitors pick a phone or a laptop, watch
it power on, and the portfolio appears on the screen with the frame still around it.
The two modes are genuinely different layouts, not one page resized.

```
index.html          markup, meta tags, JSON-LD, icon sprite, device chrome
css/style.css       everything visual
js/data.js          ← YOUR CONTENT LIVES HERE
js/main.js          renders both experiences and runs the device behaviour
```

No build step, no framework, no dependencies. Open `index.html` and it works.

## Making it yours

Open `js/data.js`. Every piece of text on the site comes from the single
`PORTFOLIO` object at the top of that file, and both experiences read from it, so
you only write each thing once. The placeholders you need to replace:

| Where | What to change |
| --- | --- |
| `identity` | intro copy, location, `resume` path (leave `""` to hide the button) |
| `education` | `Your College Name`, `Your School Name` |
| `projects` | `your-username` in every GitHub URL, and the `demo` URLs |
| `experience` | `Company Name` in both internships |
| `contact` | `rupraj.kundu@example.com`, the LinkedIn and GitHub URLs |
| `index.html` | `<link rel="canonical">` and `og:image` once you have a domain |

### Your photo

`identity.photo` is `""`, so a generated monogram avatar is used. Put your image
in an `assets/` folder and point at it:

```js
photo: "assets/profile.jpg"
```

A square image around 600×600 is plenty. The avatar is masked to a circle.

### Skill meters

`level` runs 1–5 and drives the little five-notch meter. Add or remove skills
freely — add a whole new `group` and both layouts pick it up.

### Project icons

`icon` picks a glyph from the sprite in `index.html`. Available: `shield`, `lock`,
`campus`, `graph`, `radar`, `quiz`, and `grid` (the fallback, used if the name
doesn't match). To add your own, drop a new
`<symbol id="i-yourname" viewBox="0 0 24 24">` into the sprite and reference it as
`icon: "yourname"`.

## The contact form

It validates, then opens the visitor's mail client with the message prefilled —
which means it works with no server. If you'd rather receive submissions directly,
sign up for a form service and change two lines in `js/main.js`, inside
`wireForms()`: give the `<form>` an `action` and let it submit normally instead of
building a `mailto:` link. Formspree, Basin and Netlify Forms all work this way.

## Deploying

Any static host. Push the folder to a GitHub repo and turn on GitHub Pages
(Settings → Pages → deploy from `main`, root), or drag the folder onto Netlify.
There is nothing to compile.

## How the device experience works

**Choosing.** `body[data-stage]` moves between `choose`, `leaving` and `device`.
The chooser fades and scales out, the device rises in.

**Phone.** Backlight flicker, monogram drawn with an SVG dash offset, then a lock
screen with the real time. Swipe up on the pull bar, tap, or press Enter — or wait
and it opens itself. Every navigation gives a small haptic nudge, and a real
vibration on Android.

**Laptop.** The lid rotates open on an X axis, the backlight ramps, a boot log
types out, then the desktop page fades in. Click the screen at any point to skip.

**Sizing.** `--fit` is a scale factor recalculated on resize so the device always
fits the window without a scrollbar. Below roughly 880px the laptop frame slims
down to a thin bezel instead of scaling to an unreadable 30% — the desktop layout
then responds using container queries against the *screen*, not the browser
window.

**Switching.** The button in the phone's app bar and in the laptop's top nav both
return to the chooser, as does Escape and the pill at the top of the screen.

Reduced motion is respected throughout: the boot sequences collapse to near-zero
and scroll reveals start visible.

## Browser support

Chrome, Edge, Safari and Firefox, current versions. Container queries are used for
the desktop layout inside the laptop screen, so a browser older than about 2023
will show the widest desktop layout at all sizes — everything stays usable.

## Author & Ownership

- **Author / Owner**: Rupraj Kundu
- **GitHub Profile**: [@ruprajkundu7-rgb](https://github.com/ruprajkundu7-rgb)
- **LinkedIn**: [Rupraj Kundu](https://www.linkedin.com/in/rupraj-kundu-4b4b26311/)
- **Email**: [ruprajkundu7@gmail.com](mailto:ruprajkundu7@gmail.com)

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.
Created and maintained by **Rupraj Kundu**.

