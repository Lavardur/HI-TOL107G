# Vefforritun 1, 2024: Verkefni 3, CSS #1

## Markmið

- Tengja CSS við HTML.
- Aðlaganir á HTML fyrir CSS.
- Notkun á grunn CSS með box model; visual formatting model og; letri og litum.

## Verkefni 2–6

Í verkefnum 2–6 munum við vinna áfram með sama verkefni og byggja ofan á það:

- [Verkefni 2](https://github.com/vefforritun/vef1-2024-v2) skilgreinir grunn HTML og síður.
- [Verkefni 3](https://github.com/vefforritun/vef1-2024-v3) bætir við grunn viðmóti.
- [Verkefni 4](https://github.com/vefforritun/vef1-2024-v4) setur upp útlit (e. layout).
- [Verkefni 5](https://github.com/vefforritun/vef1-2024-v5) setur upp grind og gerir útlit skalanlegt (e. responsive).
- [Verkefni 6](https://github.com/vefforritun/vef1-2024-v6) setur upp tól til að hjálpa við skipulag og vinnu.

## Verkefnið

Verkefnið er framhald af [verkefni 2](https://github.com/vefforritun/vef1-2024-v2), nýtir það efni sem uppsett er í því, og fylgir þeirri verkefnalýsingu. Leyfilegt er að nota [sýnilausn að verkefni 2](https://github.com/vefforritun/vef1-2024-v2-synilausn), sem gefin verður út föstudaginn 6. september.

Nú skal bæta við einföldu útliti á efnið með CSS. Allt útlitið skal vera í `./styles.css` og **allar** HTML skrár skulu vísa í nákvæmlega þá skrá.

## Útlit

Fyrirmynd að útliti er í `fyrirmynd/` möppu. Öll skjáskot eru tekin í `1000px` breiðum Firefox vafra.

Bæta þarf við auka elementum við lausn/sýnilausn til að geta náð fram útliti.

Þar sem allt útlit skal útfæra í einni CSS skrá, skal huga að cascade og erfðum, þó er fullkomlega eðlilegt að endurtaka eigindi, en t.d. fyrir málsgreinar (`<p>`) þarf aðeins að taka fram einu sinni hvert margin þeirra er.

### Almennt

Gefið er `styles.css` skjal með grunn að lausn og athugasemdum.

Almennt skal gilda:

- Nota skal gefið „reset“ og `box-sizing` breytingu (merkt sérstaklega), það má ekki fjarlægja.
- Nota skal leturgerðirnar:
  - Matemasie frá Google fonts fyrir fyrirsagnir, eingöngu í _regular_.
  - Open Sans frá Google fonts fyrir allt annað, bæði _regular_ (þyngd `400`) og _bold_ (þyngd `700`).
  - Sækja skal leturgerðirnar (download) _ekki_ með vísun og nota `@font-face` í CSS.
- Gefin er stærð á letri sem `16px` (sem merkir að `1rem == 16px`), því skal ekki breyta. Í framhaldi af lýsingu er `eitt bil = 1rem`, `hálft bil = 0.5rem` o.s.fr.
- Gefin er hjálparklasi `.sr-only` sem skal setja á `Beint í efni` tengil.
- Aðeins skal nota `px` í grunnleturstærð og á `border` skilgreiningar, annars skal nota hlutfallslegar einingar (`em`, `rem`, eða `%`)
- Allt efni (málsgreinar, myndir, form element) skal hafa eitt bil fyrir neðan sig.
  - Á fyrirmyndum gæti þetta verið óljóst og þarf ekki að vera nákvæmlega eins og á fyrirmyndum.
- Allir litir: `#f3dd99`, `#cc99bb` `#eebbdd`, `#000000` og `#ffffff`.
- CSS skal vera án villna og **viðvarana** þegar keyrt í gegnum [CSS validator](https://jigsaw.w3.org/css-validator/), einnig hægt að keyra gegnum W3C Validator extension.

Allt sem gildir í verkefni 2 gildir áfram í þessu verkefni.

### Haus, valmynd, meginmál og fótur

Gefinn er `flexbox` skilgreining sem sett er utan um allt efni, sjá athugasemdir í `styles.css`. Setja þarf `<div class="wrapper">` eftir `<body>` og `</div>` fyrir neðan allt efni. Þetta mun sjá til þess að efni fylli nákvæmlega út í skjá, fótur sé alltaf neðst og efni taki allt auka pláss. Nánar um þetta í viku 4.

Annars gildir:

- Allt efni sé að hámarki `900px` breitt og sé miðjað í vafra.
- Haus notar bakgrunnslitinn `#cc99bb` sem teygir sig alveg út í alla breidd vafra, texti innan haus er miðjaður og eitt bil á alla kanta.
- Valmynd er beint fyrir neðan haus með eitt bil á alla kanta með bakgrunnslit `#eebbdd`. Fyrir neðan er `4px` border með litinn `#cc99bb`.
- Efni í valmynd flæði frá vinstri til hægri og sé miðjað með eitt bil á milli.
- Valin síða í valmynd á að vera feitletruð og ekki með undirlínu.
- Fótur (`<footer>`) hafi bakgrunnslitinn `#eebbdd` með `4px` border með litinn `#cc99bb` fyrir ofan.
- Að minnsta kosti eitt bil sé alltaf milli meginmáls og fóts.
- Efni í fóti sitji hlið við hlið með bilum milli fyrirsagnar og efnis.
- Myndir hafi `5px` border radíus á alla kanta.

### Forsíða

Efni sé birt vinstri jafnað, mynd sé fleytt til hægri með eitt bil til vinstri og fyrir neðan.

### Spil

Tafla sé með fyrirsagna röð og síðan aðra hvora röð með bakgrunnslitinn `#eebbdd`, þær raðir hafi fyrsta og seinasta reit með `5px` border radíus á þá kanta sem snúa út úr töflu (sjá fyrirmynd).

### Viðburðir

Viðburðir hafi mynd fleytt til vinstri og skráningar hlekki fyrir neðan mynd og efni.

### Skráning á viðburði

Hver hópur af reitum hafi fyrirsögn, takki hafi `5px` border radíus og bakgrunnslitinn `#eebbdd`.

### Takmarkanir

Aðeins skal nota eftirfarandi eigindi, og ef tekið fram, viðeigandi gildi:

- `background-color`
- `border` og nánari skilgreiningar
- `border-spacing: 0;`
- `box-sizing`
- `color`
- `float` og `clear`
- `display: block;`, `display: inline-block;`
- `font-family`
  - `src` til að vísa í skrár fyrir leturgerðir
- `font-style`
- `font-size`
- `font-weight`
- `list-style: none;`
- `margin` og nánari skilgreiningar
- `padding` og nánari skilgreiningar
- `width`, `min-width`, `max-width`, `min-height`
- `text-align`
- `text-decoration`
- `vertical-align: top;`, sjá athugasemd í `styles.css`
- `white-space: nowrap;` til að láta texta í töflu ekki fara í næstu línu
- Þau eigindi notuð í `.sr-only` og ekki tiltekin hér ætti ekki að nota í annað.
- `display: flex;`, `flex-direction` og `flex` (í `.wrapper`) ætti eingöngu að nota þar.

Ekki þarf að huga að skalanleika (síðan þarf ekki að líta vel út í undir `800px` skjá).

## Netlify

Setja skal upp verkefni á Netlify með því að hlaða upp skrám með „manual deploy“ _eða_ tengja GitHub repo.

## Mat

- 20% – Snyrtilega uppsett og gilt CSS.
- 20% – Aðeins leyfileg eigindi og gildi notuð.
- 15% – Almennt útlit, haus, valmynd, meginmál og fótur.
- 5% – Útlit forsíðu eftir forskrift.
- 15% – Útlit spilasíðu eftir forskrift.
- 10% – Útlit viðburðasíðu eftir forskrift.
- 15% – Útlit skráningarsíðu eftir forskrift.

## Sett fyrir

Verkefni sett fyrir í fyrirlestri mánudaginn 2. september 2024.

## Skil

Skila skal í Canvas, seinasta lagi fyrir lok dags fimmtudaginn 12. september 2024.

Skilaboð skulu innihalda:

- zip skrá með öllum skrám _eða_ hlekkur á almennt (e. public) GitHub.
- slóð á verkefni keyrandi á Netlify sem athugasemd („Add comment“ eða „Bæta við athugasemd“ á skilaskjá í Canvas).

Skila má eins oft og þið viljið þar til skilafrestur rennur út.

## Einkunn

Leyfilegt er að ræða, og vinna saman að verkefni en **skrifið ykkar eigin lausn**. Ef tvær eða fleiri lausnir eru mjög líkar þarf að færa rök fyrir því, annars munu allir hlutaðeigandi hugsanlega fá 0 fyrir verkefnið.

Ef stórt mállíkan (LLM, „gervigreind“, t.d. ChatGTP) er notað til að skrifa part af lausn skal taka það fram. [Sjá nánar á upplýsingasíða um gervigreind hjá HÍ](https://gervigreind.hi.is/).

Sett verða fyrir tíu minni verkefni þar sem átta bestu gilda 5% hvert, samtals 40% af lokaeinkunn.

Sett verða fyrir tvö hópverkefni þar sem hvort um sig gildir 10%, samtals 20% af lokaeinkunn.

> Útgáfa 0.1

---

| Útgáfa | Lýsing        |
| ------ | ------------- |
| 0.1    | Fyrsta útgáfa |
