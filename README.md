# Rya Cosmo Elite · Phuket & Full Moon Party brochure

PickYourVacay itinerary brochure, 22 to 26 Nov 2026. Same format as the Konnichiwa Japan brochure.

## Open in Antigravity
1. File → Open Folder → choose `rya-phuket-brochure`.
2. Open `index.html` and preview it (right-click → Open with Live Server / Open in Browser, or use the built-in browser preview).

## Where to edit what

| To change | Edit this file |
|---|---|
| Day-wise plan: timings, activities, meals, hotel per night | `js/data.js` |
| Cover, flights, hotels, food, inclusions, "good to know", footer text | `index.html` |
| Colours, fonts, spacing | `css/style.css` (colour tokens are at the top, in `:root`) |
| Postcard pictures for each day | `js/scenes.js` |
| Animations and page behaviour | `js/app.js` (normally leave as is) |

## Pending items
- **Rya logo:** save it as `assets/rya-logo.png` and swap the text block marked `RYA LOGO` in `index.html`.
- **Villa name / address:** in the "Where you'll sleep" section of `index.html`.
- **WhatsApp number / message:** top of `js/app.js` (`var WA=`) and the phone line near the end of `index.html`.

## Publish like the Japan brochure (GitHub Pages)
Create a repo such as `pickyourvacay/rya-phuket-brochure`, upload all files keeping the folders, then Settings → Pages → deploy from `main` branch, root. The link will be `https://pickyourvacay.github.io/rya-phuket-brochure/`.
