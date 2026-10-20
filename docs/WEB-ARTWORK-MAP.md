# Web Artwork Map

The repository JPEGs were inspected during the web deployment workflow with ImageMagick and Tesseract.

| Source | OCR / visual meaning | Web use |
| --- | --- | --- |
| IMG_1505.jpeg | Low-quality retired fingerprint/script concept from the predecessor brand | Retained source only; not used as primary identity |
| IMG_1506.jpeg | MUSIC + TRANSACTIONS » COMMUNITY | Transactions / community artwork; retained as source artwork |
| IMG_1507.jpeg | FOOD » DELIVERY » COMMUNITY | BeatFood |
| IMG_1508.jpeg | ACCOMMODATION HOSPITALITY » COMMUNITY | BeatBnB |
| IMG_1509.jpeg | CONNECT + EMPOWER » GENERATION | BeatGenzi |
| IMG_1510.jpeg | BeatHealth name and medical symbol | BeatHealth service artwork |

All six source JPEGs remain untouched. GitHub Pages derives PNGs at deployment time; the original files are never overwritten. IMG_1505 remains only for compatibility with the existing prepared-art pipeline.

No service identity is inferred where the image text is insufficient. IMG_1506 is presented with its observed wording rather than being silently relabeled. The first-party `web/royal-city-wordmark.svg` and `web/royal-city-emblem.svg` are the source of truth for the platform identity and app icon.
