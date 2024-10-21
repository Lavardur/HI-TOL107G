# Vefforritun 1, 2024: Verkefni 8, JS #1

- [Vefforritun 1, 2024, fyrirlestur 9.4: Verkefni 8](https://www.youtube.com/watch?v=2Sfcm0KfSaM)

## Markmið

- Skipta JavaScript forriti upp í einingar.
- Forrita á móti DOM, _Document Object Model_.
- Setja upp `eslint`.

## Grunnur

Gefinn er grunnur að verkefni, byggður á verkefni 7. Í grunni eru:

- `package.json` með:
  - skilgreindum dependency-ium: `browser-sync`, `concurrently` og `cpy-cli`.
  - NPM scripts sem keyra upp „dev“ og „build“.
- `package-lock.json` skrá sem skilgreinir nákvæmlega hvaða dependency eru notuð _fyrir_ dependency-in okkar
- `index.html` með útliti úr sýnilausn og tengingu við `scripts.js` sem `JavaScript` module.
- `.gitignore` sem passar upp á að `node_modules` mappan sé ekki geymd í git.
- `scripts.js` með grunni að forriti, athugasemdir og tillögur að útfærslum eru í skjalinu.
- `styles.css` með útliti fyrir verkefnið.

Skjölun notar [`jsdoc`](https://jsdoc.app/).

### NPM

Hægt er að vinna útfrá eigin lausn á verkefni 7, sýnilausn á verkefni 7 eða gefnum grunni hér.

Til að nota þennan grunn sem gefinn er hér þarf að sækja það frá GitHub og keyra NPM:

```bash
# Inni í möppu sem á að geyma verkefnið
git clone https://github.com/vefforritun/vef1-2024-v8.git
# eða
git clone git@github.com:vefforritun/vef1-2024-v8.git

# Förum inn í möppu
cd vef1-2024-v8

# Sækjum öll dependency með NPM
npm install

# Keyrum NPM script fyrir development
npm run dev
```

Áður en skilað er þarf að breyta remote í þitt eigið repo:

```bash
git remote remove origin
git remote add origin <slóð á þitt GitHub repo>
```

## Virkni

Setja upp virkni sem greinir strengi og gefur ýmsar upplýsingar um þá í gegnum vefviðmót. Nota skal sömu föll og í verkefni 7: `longest(str)`, `shortest(str)`, `reverse(str)`, `vowels(str)`, `consonants(str)` og `palindrome(str)`. Sjá [nánar í verkefni 7](https://github.com/vefforritun/vef1-2024-v7?tab=readme-ov-file#virkni).

Í `scripts.js` er smá grunnur til að byrja á, unnið verður áfram í fyrirlestrum 9 og 10.

Fyrir inntak og til að birta notendum gögn skal nota vef viðmót með DOM aðgerðum. `console` hlutinn má nota til að birta villur með `console.error()`.

### Skipta upp í módúla

Skipta skal upp í módúla, einnig skal skipta upp í föll sem hægt er að endurnota. Hver módúll skal innihalda aðeins eitt fall og viðeigandi hjálparföll.

Gefin er `helpers.js` skrá sem inniheldur föll sem hægt er að endurnota í öllum módúlum (sambærilegt og í verkefni 7).

### Útfærsla á viðmóti

Útfæra skal virkni þannig að gefið viðmót í `index.html` virki:

- `textarea` til að skrifa texta í og þegar smellt er á `Greina` takka skal greina texta og birta niðurstöður í viðeigandi elementi/elementum.
- Greining uppfærir sig þegar texti breytist í `textarea`, við hvern slátt á lyklaborðið.
- Hægt að endursetja með `Hreinsa` takka.

## eslint

Setja skal upp `eslint` með því að keyra:

```bash
npx eslint --init
```

Fylgið ferlinu og veljið viðeigandi, þið ættuð að enda með `eslint.config.mjs` skrá sem inniheldur:

```javascript
import pluginJs from '@eslint/js';
import globals from 'globals';

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
];
```

## Netlify

Skila skal verkefninu keyrandi á Netlify (eða sambærilegri hýsingu). Gefin er sama `build` script í `package.json` en uppfæra þarf hana m.v. það sem er í `lib/` möppu og CSS skrá.

## Mat

- 15% Verkefni sett upp GitHub og á Netlify og `build` scripta uppfærð.
- 15% Skipta upp í módúla.
- 30% Texti greindur þegar smellt á `Greina` takka.
- 10% Greining uppfærist þegar texti breytist.
- 10% Hægt að endursetja með `Hreinsa` takka.
- 20% eslint uppsett og engar villur.

## Sett fyrir

Verkefni sett fyrir mánudaginn 14. október 2024.

## Skil

Skila skal í Canvas, seinasta lagi fyrir lok dags fimmtudaginn 24. október 2024.

Skilaboð skulu innihalda:

- Slóð á verkefnið keyrandi í hýsingu
- Slóð á GitHub repo fyrir verkefni. Dæmatímakennurum skal hafa verið boðið í repo. Notendanöfn þeirra eru:
  - `digitalsigga`
  - `ofurtumi`
  - `osk`
  - `polarparsnip`
  - `reynirjr`

Skila má eins oft og þið viljið þar til skilafrestur rennur út.

## Einkunn

Leyfilegt er að ræða, og vinna saman að verkefni en **skrifið ykkar eigin lausn**. Ef tvær eða fleiri lausnir eru mjög líkar þarf að færa rök fyrir því, annars munu allir hlutaðeigandi hugsanlega fá 0 fyrir verkefnið.

Ef stórt mállíkan (LLM, „gervigreind“, t.d. ChatGTP) er notað til að skrifa part af lausn skal taka það fram. [Sjá nánar á upplýsingasíða um gervigreind hjá HÍ](https://gervigreind.hi.is/).

Sett verða fyrir tíu minni verkefni þar sem átta bestu gilda 5% hvert, samtals 40% af lokaeinkunn.

Sett verða fyrir tvö hópverkefni þar sem hvort um sig gildir 10%, samtals 20% af lokaeinkunn.

> Útgáfa 0.1
