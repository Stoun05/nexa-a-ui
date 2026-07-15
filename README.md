# Nexa A UI

**Nexa A UI** diňe `@astryxdesign/core` we `@astryxdesign/theme-neutral` komponentleri bilen gurlan türkmençe dolandyryş merkezidir.

## Maksat

Astryx-iň daşarky UI kit, taýýar dashboard şablony ýa-da custom komponent stili bolmazdan nähili netije berýändigini görkezmek.

## Ulanylan tehnologiýalar

- React + TypeScript + Vite
- `@astryxdesign/core` 0.1.5
- `@astryxdesign/theme-neutral` 0.1.5

## Häzirki işleýän bölümler

- dolandyryş paneli;
- sargyt gözlegi, status filteri we hakyky pagination;
- dialog arkaly täze sargyt goşmak;
- müşderi sanawy, gözleg, pagination we pozmazdan öň tassyklama;
- hyzmat katalogy;
- ulanyjylar we habarlaşyk;
- hasabatlar;
- profil we frontend login barlagy;
- garaňky/ýagty režim we ykjam tablisa görnüşi;
- Astryx komponent laboratoriýasy.

## Astryx-den göni ulanylan komponentler

- AppShell, TopNav, SideNav
- Section, Grid, HStack, VStack, Layout
- Card, Badge, Banner, Divider
- Heading, Text, Icon, NavIcon, Avatar
- Button, TextInput, Switch, SegmentedControl
- Table, Pagination, ProgressBar
- Dialog, AlertDialog, Toast
- Chat, FormLayout
- Calendar, DateInput, FileInput
- Skeleton, Spinner, EmptyState, MetadataList
- Theme + Neutral theme

## Astryx-de ýok bolup, özümiziň ýazan logikamyz

- React state arkaly sahypa çalşygy;
- gözleg we status filteri;
- maglumatlary sahypalara bölýän pagination logikasy;
- täze demo sargydy we müşderini state-e goşmak;
- müşderini pozmak;
- login formasynyň frontend barlagy;
- Vite build wagtynda runtime böleklerini birleşdirmek we SHA-256 bitewiligini barlamak.

Bular UI komponentleri ýa-da custom dizaýn däl. Interfeýs bölekleriniň hemmesi Astryx-den gelýär.

## Häzir goşulmadyk zatlar

- backend we maglumat bazasy;
- hakyky autentifikasiýa;
- maglumatlaryň brauzer täzelenenden soň saklanmagy;
- hakyky CSV/PDF eksport;
- taýýar chart kitaphanasy.

## Custom stil auditi

`src/index.css` faýlynda diňe Astryx-iň resmi CSS importlary bar. Custom reňk, radius, kölege, grid ýa-da komponent CSS-i ýazylmady.

## Işletmek

```bash
npm install
npm run dev
```

Production barlagy:

```bash
npm run lint
npm run build
npm run preview
```
