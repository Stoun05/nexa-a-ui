# Nexa A UI

**Nexa A UI** diňe `@astryxdesign/core` we `@astryxdesign/theme-neutral` komponentleri bilen gurlan türkmençe dolandyryş merkezidir.

## Repository

`nexa-a-ui`

## Maksat

Astryx-iň hiç bir daşarky UI kit ýa-da taýýar dashboard şablony bolmazdan nähili netije berýändigini görkezmek. Bu birinji görnüşde custom UI stili goşulmady.

## Ulanylan tehnologiýalar

- React + TypeScript + Vite
- `@astryxdesign/core` 0.1.5
- `@astryxdesign/theme-neutral` 0.1.5

## Astryx-den göni ulanylan komponentler

- AppShell, TopNav, SideNav
- Section, Grid, HStack, VStack
- Card, Badge, Banner, Divider
- Heading, Text, Icon, NavIcon
- Button, TextInput, Switch, SegmentedControl
- Table, Pagination, ProgressBar
- MetadataList, EmptyState
- Theme + Neutral theme

## Astryx-de taýýar bolmadyk, ýöne bu görnüşde nähili çözüldi

- **Statistika kartasy:** Astryx-de aýratyn `StatCard` komponenti ýok. Şonuň üçin diňe `Card + VStack + Text + Heading + Badge` komponentlerinden React kompozisiýasy düzüldi.
- **Hakyky grafik:** stable Astryx chart komponenti ýok. Custom chart ýazylmady; onuň ýerine resmi `ProgressBar` ulanyldy.
- **Routing:** bu görnüşde router goşulmady; sahypalar React state arkaly çalşyrylýar.
- **Backend:** maglumat bazasy we API bu frontend görnüşine goşulmady.
- **Astryx 0.1.5 production compatibility:** paketiň käbir distributiw faýllary `react/jsx-dev-runtime`-daky `jsxDEV` funksiýasyny çagyrýar. React 19 production runtime-da bu funksiýa elýeterli däl, şonuň üçin `src/astryx-jsx-dev-runtime-shim.ts` arkaly diňe tehniki compatibility gatlagy goşuldy. Bu UI komponenti ýa-da custom stil däl.

## Custom stil auditi

`src/index.css` faýlynda diňe Astryx-iň üç resmi CSS importy bar. Custom reňk, radius, kölege, grid ýa-da komponent CSS-i ýazylmady.

## Işletmek

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```
