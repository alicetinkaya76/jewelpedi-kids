/**
 * Simplified world map SVG paths.
 *
 * These are deliberately low-poly silhouettes of the 7 continents plus the
 * UK and Madagascar, sized to fit an equirectangular projection with bbox
 * lng [-180, 180], lat [-60, 75] rendered inside viewBox 0 0 1000 500.
 *
 * Each path is a hand-simplified polygon — enough to be recognizable
 * (continent shape + rough coast), small enough to embed inline (<3 KB
 * total). Not a GIS-accurate source; it's a pedagogical backdrop, not an
 * atlas. For playable accuracy we don't actually need pixel-perfect
 * coasts — the scoring is done on real lat/lng via Haversine, and the
 * continent shapes just give the user orientation for where to click.
 */

export const MAP_WIDTH  = 1000;
export const MAP_HEIGHT = 500;

/* Each path is an M-L polyline approximating a continent outline. */
export const CONTINENTS = [
  {
    id: 'north-america',
    name: { tr: 'Kuzey Amerika', en: 'North America', ar: 'أمريكا الشمالية' },
    d: 'M 60 60 L 90 50 L 130 55 L 170 45 L 220 50 L 240 65 L 260 80 L 255 110 L 245 130 L 240 160 L 265 180 L 280 200 L 290 230 L 285 260 L 265 280 L 240 290 L 215 285 L 195 275 L 180 255 L 160 235 L 145 210 L 130 185 L 115 165 L 100 145 L 85 120 L 70 95 Z M 260 290 L 280 300 L 295 315 L 290 330 L 275 335 L 260 325 Z',
  },
  {
    id: 'south-america',
    name: { tr: 'Güney Amerika', en: 'South America', ar: 'أمريكا الجنوبية' },
    d: 'M 260 325 L 280 330 L 300 340 L 310 360 L 315 385 L 320 415 L 310 445 L 295 465 L 280 470 L 265 460 L 255 435 L 248 410 L 245 385 L 248 360 L 253 340 Z',
  },
  {
    id: 'europe',
    name: { tr: 'Avrupa', en: 'Europe', ar: 'أوروبا' },
    d: 'M 450 90 L 490 85 L 520 95 L 540 110 L 560 115 L 580 125 L 590 145 L 580 160 L 555 170 L 530 165 L 505 160 L 485 150 L 470 135 L 455 115 Z M 445 115 L 460 125 L 455 135 L 445 130 Z',
  },
  {
    id: 'africa',
    name: { tr: 'Afrika', en: 'Africa', ar: 'أفريقيا' },
    d: 'M 475 170 L 510 165 L 555 175 L 585 180 L 600 195 L 610 215 L 615 245 L 605 280 L 590 305 L 575 330 L 555 355 L 535 375 L 520 385 L 500 380 L 485 365 L 475 345 L 470 320 L 468 295 L 472 270 L 478 245 L 480 220 L 478 200 Z',
  },
  {
    id: 'asia',
    name: { tr: 'Asya', en: 'Asia', ar: 'آسيا' },
    d: 'M 590 70 L 640 60 L 700 55 L 760 60 L 820 70 L 870 85 L 905 105 L 920 130 L 915 160 L 895 180 L 870 195 L 835 200 L 795 205 L 750 210 L 720 230 L 705 245 L 690 265 L 680 285 L 670 270 L 660 250 L 650 225 L 640 200 L 630 175 L 620 150 L 610 125 L 600 100 Z M 870 210 L 895 220 L 910 240 L 900 260 L 880 265 L 865 250 L 860 230 Z',
  },
  {
    id: 'oceania',
    name: { tr: 'Okyanusya', en: 'Oceania', ar: 'أوقيانوسيا' },
    d: 'M 810 330 L 855 325 L 890 335 L 910 350 L 915 375 L 900 395 L 870 400 L 835 395 L 815 380 L 805 360 Z M 920 400 L 935 405 L 940 420 L 925 425 L 915 415 Z',
  },
  {
    id: 'uk',
    name: { tr: 'Britanya Adaları', en: 'British Isles', ar: 'الجزر البريطانية' },
    d: 'M 470 95 L 480 85 L 488 100 L 482 115 L 472 110 Z',
  },
  {
    id: 'madagascar',
    name: { tr: 'Madagaskar', en: 'Madagascar', ar: 'مدغشقر' },
    d: 'M 635 330 L 642 340 L 648 360 L 643 378 L 637 385 L 630 370 L 627 350 Z',
  },
];
