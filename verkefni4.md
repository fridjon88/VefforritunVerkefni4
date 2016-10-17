
# Verkefni 4

## Lýsing

Útfæra skal síðu sem sýnir komur og brottfarir með gögnum frá apis.is

Sækja skal gögn frá apis.is, http://docs.apis.is/#endpoint-flight með _Ajax_ aðgerð og birta á síðu í töflu. Takkar skulu vera til staðar sem skipta á milli komu og brottfara upplýsinga og milli ensku og íslensku.

Gefin er grunnur að lausn þar sem `.eslintrc`, `.stylelintrc`, `.babelrc` og `gulpfile.js` eru til staðar. Einnig eru tvö skjöl innan í `/src` möppu:

* `main.js` sem er með grunn að ES2015 kóða með villum sem `eslint` mun grípa þegar rétt sett upp
* `styles.scss` sem er með grunn að Sass kóða með villum sem `stylelint` mun grípa þegar rétt sett upp

`/src` (source) mappa inniheldur source skjölin okkar og `/dist` mun innihalda _þýddu_ skjölin okkar, í `index.html` vísum við því í skrárnar í `/dist`, _ekki_ í `/src`.

Gulp skal hafa a.m.k. eftirfarandi aðgerðir:
* `serve` - keyrir upp statískan vefþjón á vél sem birtir síðu með BrowserSync
* `lint-scss` - keyrir `stylelint` á viðeigandi skrár í `/src` möppu og skilar villum ef einhverjar
* `lint-javascript` - keyrir `eslint` á viðeigandi skrár í `/src` möppu og skilar villum ef einhverjar
* `lint` - keyrir bæði `lint-scss` og `lint-javascript`
* `sass` - breytir `.scss` skrám í `/src` möppu í `.css` skrár í `/dist`
* `babel` - breytir `.js` skrám í `/src` möppu í `.js` (ES5) skrár í `/dist`
* `default` - keyrir `lint`, `sass`, `babel` og `serve` í röð

Öll dependency skal skilgreina í `package.json`. **Ekki** skal skila `/node_modules` með í lausn.


## Mat

* 20% - HTML og SCSS/CSS snyrtilegt, gilt og engar lint villur
* 20% - JavaScript snyrtilegt og engar lint villur
* 10% - Uppsetning á verkefni, `package.json` og `gulpfile.js`
* 50% - Virkni útfærð skv. lýsingu

## Sett fyrir

Verkefni sett fyrir á Uglu 10. október 2016.

## Skil

Senda skal tölvupóst til dæmatímakennara með fyrirsögn "Vefforritun - Verkefni 4" fyrir lok dags 22. október 2016. Póstur skal innihalda:

* Zip skjal með lausn sem heitir `notendanafn.zip`

Ekki skal skila `/node_modules` möppu. Verkefni verða opnuð í möppu og þar skrifað:
```
npm install
gulp
```

## Einkunn

Sett verða fyrir sex verkefni þar sem fimm bestu gilda 6% hvert, samtals 30%.
