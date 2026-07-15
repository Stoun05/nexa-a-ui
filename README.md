# Nexa A UI

**Nexa A UI** — diňe `@astryxdesign/core` we `@astryxdesign/theme-neutral` komponentleri bilen gurlan türkmençe dolandyryş merkezi.

Häzirki wersiýa: **v0.2.0**

## Maksat

Astryx-iň daşarky UI kit, taýýar dashboard şablony ýa-da custom komponent stili bolmazdan professional admin-panelde nähili netije berýändigini görkezmek.

## v0.2.0-da goşulan mümkinçilikler

- **Global gözleg:** Astryx `CommandPalette` arkaly sahypalary, sargytlary we müşderileri gözlemek.
- **Sargyt maglumat penjiresi:** `Dialog + TabList + DropdownMenu` bilen jemleme, müşderi we taryh bölümleri.
- **Müşderi profili:** profil, sargytlar we bellikler üçin aýratyn Tabs.
- **LocalStorage:** sargytlar, müşderiler, tema, tablisa görnüşi we iş taryhy brauzerde saklanýar.
- **Habarnamalar merkezi:** täze we okalan habarlary aýratyn penjiräniň içinde görmek.
- **Işleriň taryhy:** maglumat goşmak, pozmak we status üýtgetmek hereketleriniň audit demosyny görmek.
- **Tabs we Dropdown Menu:** sargyt hem müşderi maglumatlaryny amatly dolandyrmak.
- **Sene aralygy hasabaty:** `DateRangeInput` bilen döwür saýlamak we CSV eksport demo.

## Häzirki işleýän bölümler

- dolandyryş paneli;
- sargyt gözlegi, status filteri we hakyky pagination;
- dialog arkaly täze sargyt goşmak;
- sargydyň aýratyn maglumat penjiresi;
- müşderi sanawy, gözleg, pagination we pozmazdan öň tassyklama;
- müşderiniň aýratyn profili we sargyt taryhy;
- global gözleg;
- habarnamalar merkezi;
- işleriň taryhy;
- hasabatlar we sene aralygy;
- CSV eksport demo;
- garaňky/ýagty režim we ykjam tablisa görnüşi.

## Astryx-den göni ulanylan komponentler

- AppShell, TopNav, SideNav
- Section, Grid, HStack, VStack, Layout
- Card, Badge, Banner
- Heading, Text, Icon, NavIcon, Avatar
- Button, TextInput, Switch, SegmentedControl
- Table, Pagination, ProgressBar
- Dialog, AlertDialog, Toast
- CommandPalette
- DropdownMenu
- TabList, Tab
- DateRangeInput
- FormLayout
- MetadataList, EmptyState
- Theme + Neutral theme

## Astryx-de ýok bolup, özümiziň ýazan logikamyz

- React state arkaly sahypa çalşygy;
- gözleg we status filteri;
- maglumatlary sahypalara bölýän pagination logikasy;
- täze demo sargydy we müşderini goşmak;
- müşderini pozmak;
- LocalStorage-da maglumat saklamak;
- iş taryhyny döretmek;
- habarnamalary okalan etmek;
- CSV faýly döretmek;
- runtime source böleklerini build wagtynda birleşdirmek we SHA-256 bitewiligini barlamak.

Bular UI komponentleri ýa-da custom dizaýn däl. Görünýän interfeýs bölekleriniň hemmesi Astryx-den gelýär.

## Häzir goşulmadyk zatlar

- backend we maglumat bazasy;
- hakyky autentifikasiýa;
- birnäçe enjamyň arasynda maglumat sinhronizasiýasy;
- hakyky PDF eksport;
- taýýar chart kitaphanasy;
- e-poçta ýa-da SMS bildirişleri.

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
