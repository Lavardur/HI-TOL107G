# Vefforritun 1, 2024: Verkefni 6, CSS #4

## Markmið

- Setja upp Node.js og NPM og nota til að sækja pakka.
- Nota tól fengin af NPM.
- Keyra tól í vinnuflæði með `package.json`.

Vinna má út frá [sýnilausn á verkefni 5](https://github.com/vefforritun/vef1-2024-v5-synilausn).

## Verkefni 2–6

Í verkefnum 2–6 munum við vinna áfram með sama verkefni og byggja ofan á það:

- [Verkefni 2](https://github.com/vefforritun/vef1-2024-v2) skilgreinir grunn HTML og síður.
- [Verkefni 3](https://github.com/vefforritun/vef1-2024-v3) bætir við grunn viðmóti.
- [Verkefni 4](https://github.com/vefforritun/vef1-2024-v4) setur upp útlit (e. layout).
- [Verkefni 5](https://github.com/vefforritun/vef1-2024-v5) setur upp grind og gerir útlit skalanlegt (e. responsive).
- [Verkefni 6](https://github.com/vefforritun/vef1-2024-v6) setur upp tól til að hjálpa við skipulag og vinnu.

## Útlit

Sama gildir um útlit og í verkefni 5, útlit ætti að haldast alveg það sama, eina sem breytist er hvernig verkefnið er uppsett.

## Tæki og tól

Til þess að geta notað þessi tól þarf að [setja upp Node.js, sækið „Recommended For Most Users“](https://nodejs.org/en/). Eftir að þið hafið keyrt uppsetningar forrit getið þið opnað Command prompt/terminal/skel og keyrt:

```bash
> node -v
v20.17.0 # eða sú útgáfa sem þið sóttuð
> npm -v
10.8.2 # eða álíka
```

Ef þið fáið þetta ekki upp, prófið að endurræsa. Annars fá aðstoð í dæmatímum, í fyrirlestri, tölvupósti eða á slack.

Setja skal upp `sass`, `browser-sync`, `stylelint` og `concurrently` til að nýta Sass og geta gert breytingar sem sjást strax í vafra.

Fyrst þarf að búa til `package.json` með því að keyra `npm init` í verkefnamöppu.

Síðan þarf að sækja hvert tól með `npm install --save-dev <nafn á tóli>`.

### Sass

Skipta skal CSS upp í mismunandi skrár undir `styles/`.

Í `styles/config.scss` skal geyma allar stillingar fyrir verkefni og nota þær á viðeigandi stöðum.

### Browser sync & concurrently

Þegar skipunin `npm run dev` er keyrð skal verkefnið keyra upp vefþjón með `browser-sync`, þýða sass skrár og fylgjast með breytingum á HTML og Sass.

### Linting

Setja skal upp stylelint með `stylelint-config-standard`, `stylelint-config-sass-guidelines`, `.stylelintrc` ætti að innihalda:

```json
{
  "extends": ["stylelint-config-standard", "stylelint-config-sass-guidelines"],
  "rules": {
    "import-notation": null,
    "selector-no-qualifying-type": null
  }
}
```

Þegar skipunin `npm run lint -s` er keyrð skal keyra stylelint með þessum reglum og ættu engar villur að koma fram.

### GitHub & Netlify

Setja skal upp verkefnið á GitHub og skila með slóð á repo. Tengja skal Netlify við GitHub repo.

## Mat

- 30% – CSS flutt yfir í Sass
- 30% – stylelint uppsett og engar villur
- 20% – Verkefni sett upp með git, repo á GitHub og tengt þaðan við Netlify
- 20% – Verkefni sett upp með `package.json` og viðeigandi scriptum

## Sett fyrir

Verkefni sett fyrir mánudaginn 30. september 2024.

## Skil

Skila skal í Canvas, seinasta lagi fyrir lok dags fimmtudaginn 3. október 2024.

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
