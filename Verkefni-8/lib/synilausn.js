/**
 * Sýnilausn á verkefni 7 í Vefforritun 1, 2024.
 * Notar jsdoc til að skrifa lýsingu á föllum, inntaki og úttaki.
 * Kveikið á `Check JS` í Visual Studio Code til að sjá mögulegar villur.
 * Notar `console.assert` til að athuga hvort föll virki rétt.
 */


// Hjálparföll

/**
 * Athuga hvort óþekkt gildi sé strengur eða ekki.
 * @param {unknown} str Óþekkt gildi sem athuga á hvort sé strengur.
 * @returns `true` ef `str` er strengur, annars `false`.
 */
// Skilgreinum anonymous fall og bindum við breytuna `isString`
const isString = (str) => typeof str === 'string';

// Prófum fallið
console.assert(isString('hi') === true, 'isString: skilar `true` fyrir streng');
console.assert(isString(42) === false, 'isString: skilar `false` fyrir tölu');
console.assert(isString(null) === false, 'isString: skilar `false` fyrir null');



//------------------------------------------------------------------------------
// Grunnföll sem skilgreina á















//------------------------------------------------------------------------------
// Leiðbeint ferli

function start() {
  // Birta leiðbeiningar
  const instructions = `Sláðu inn streng með nokkrum orðum til að fá upplýsingar um:
- Lengsta orðið.
- Stysta orðið.
- Strenginn snúið við.
- Fjölda sérhljóða í streng.
- Fjölda samhljóða í streng.
- Hvort strengurinn sé samhverfur.`;
  alert(instructions);

  do {
    // Biðja um streng
    const str = prompt('Sláðu inn streng með nokkrum orðum');

    // Ýtt á cancel eða tómi strengur? Bjóða að keyra aftur.
    if (str === null || str === '') {
      continue;
    }

    // Birta upplýsingar
    const longestWord = longest(str);
    const shortestWord = shortest(str);
    const reversed = reverse(str);
    const vowelCount = vowels(str);
    const consonantCount = consonants(str);
    const isPalindrom = palindrome(str);

    const result = `Lengsta orðið er: ${longestWord}
Stysta orðið er: ${shortestWord}
Strengurinn snúinn við: ${reversed}
Fjöldi sérhljóða í streng: ${vowelCount}
Fjöldi samhljóða í streng: ${consonantCount}
Strengurinn ${isPalindrom ? 'er' : 'er ekki'} samhverfur.`;

    alert(result);

    // Spyrja hvort notandi vilji prófa aftur
  } while (confirm('Viltu prófa aftur?'));
}