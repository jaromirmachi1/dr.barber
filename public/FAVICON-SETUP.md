# Favicon & app icon setup — Doktor Barber

Place all generated files in the **`public/`** folder (same level as this file). Vite serves them from the site root (`/favicon.ico`, etc.).

Source file for designers: **`public/icon-source.png`** (your script logo). Replace with a **1024×1024 px** master if you export new artwork.

---

## Files you need (checklist)

| File | Size | Used by |
|------|------|---------|
| `favicon.ico` | multi-size (16, 32, 48) | Chrome, Edge, Firefox tabs, Google Search results |
| `favicon.svg` | vector | Modern browsers (scalable tab icon) |
| `favicon-16x16.png` | 16×16 | Legacy / some crawlers |
| `favicon-32x32.png` | 32×32 | Browser tabs (standard) |
| `apple-touch-icon.png` | **180×180** | iOS Safari home screen, iPad |
| `android-chrome-192x192.png` | 192×192 | Android Chrome, PWA |
| `android-chrome-512x512.png` | 512×512 | Android splash / PWA install |
| `og-image.png` | **1200×630** | Facebook, LinkedIn, Google Discover, Twitter/X cards |

`index.html` and `site.webmanifest` already reference these paths.

---

## Recommended workflow (fastest)

### Option A — [RealFaviconGenerator](https://realfavicongenerator.net/) (recommended)

1. Upload **`icon-source.png`** (or a square 1024×1024 export of `curves-logo.png` on dark `#030303` background).
2. **iOS** — use a **solid background** (#030303 or #f5f0e8); avoid transparency for Apple touch icon.
3. **Android** — theme color `#030303`, name “Doktor Barber”.
4. **Favicon for desktop** — enable SVG if your logo is simple; otherwise PNG + ICO.
5. Download the package and copy every file into **`public/`** (overwrite `favicon.svg` if included).
6. Run `npm run dev` and hard-refresh (Cmd+Shift+R).

### Option B — Figma / Photoshop manual export

1. Artboard **1024×1024**, logo centered with ~12% padding.
2. Export PNGs at each size above.
3. Build `.ico` with [favicon.io/favicon-converter](https://favicon.io/favicon-converter/) from `favicon-32x32.png`.
4. For **SVG**: trace or export from Illustrator; keep paths simple, single color or flat fills.

---

## Platform notes

### Google Search

- Uses **`favicon.ico`** or **`favicon-32x32.png`** from your homepage (must be crawlable, not blocked by `robots.txt`).
- Minimum **48×48** display; source file should be crisp at 48px+.
- Allow time (days–weeks) after deploy for Search Console to refresh.

### Chrome / Edge / Firefox (desktop)

- Prefer **`favicon.svg`** + **`favicon.ico`** fallback.
- Tab icon: 16×16 or 32×32 from ICO/PNG.

### Safari (macOS)

- Tab: `favicon.ico` / `favicon.svg`.
- **Pinned tabs**: optional `safari-pinned-tab.svg` (monochrome single path) — add to `index.html` if you create one:
  ```html
  <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#c8a96e" />
  ```

### Safari (iOS) / “Add to Home Screen”

- **`apple-touch-icon.png`** exactly **180×180**, **no transparency** (iOS fills with black if alpha).

### Android / Chrome mobile

- **`site.webmanifest`** → `android-chrome-192x192.png` and `512x512.png`.
- Theme color `#030303` (already set in manifest + meta).

### Social / Open Graph

- **`og-image.png`** at **1200×630** (1.91:1). Current file is a placeholder salon image; swap for branded crop (logo + interior photo + short tagline) for best shares.

---

## Design tips for Doktor Barber

- **Dark icon** (`#030303`) with **gold** (`#c8a96e`) or **cream** (`#f5f0e8`) logo reads best in browser chrome.
- Keep the mark **simple** — fine script details disappear at 16×16.
- Test at **16×16** in the browser tab before shipping.

---

## Verify after deploy

1. [Google Rich Results Test](https://search.google.com/test/rich-results) — Barbershop schema  
2. [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) — `og-image.png`  
3. [Twitter Card Validator](https://cards-dev.twitter.com/validator) (if available)  
4. Chrome DevTools → Application → Manifest  
5. `https://doktorbarber.cz/favicon.ico` opens in browser  

Update **`VITE_SITE_URL`** in production `.env` if the live domain differs from `https://doktorbarber.cz`.
