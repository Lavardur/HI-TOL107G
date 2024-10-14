/**
 * Verkefni 7 í Vefforritun 1, 2024.
 * Notar jsdoc til að skrifa lýsingu á föllum, inntaki og úttaki.
 * Kveikið á `Check JS` í Visual Studio Code til að sjá mögulegar villur.
 * Notar `console.assert` til að athuga hvort föll virki rétt.
 */

//------------------------------------------------------------------------------
// Fastar

/** Íslenskir sérhljóðar */
const VOWELS = 'aeiouyáéýúíóöæ'.split('');

/** Íslenskir samhljóðar */
const CONSONANTS = 'bcdfghjklmnpqrstvwxzþð'.split('');

//------------------------------------------------------------------------------
// Hjálparföll

/**
 * Athuga hvort óþekkt gildi sé strengur eða ekki.
 * @param {unknown} str Óþekkt gildi sem athuga á hvort sé strengur.
 * @returns {boolean} `true` ef `str` er strengur, annars `false`.
 */
const isString = (str) => typeof str === 'string';

// Prófum fallið
console.assert(isString('hi') === true, 'isString: skilar `true` fyrir streng');
console.assert(isString(42) === false, 'isString: skilar `false` fyrir tölu');
console.assert(isString(null) === false, 'isString: skilar `false` fyrir null');

/**
 * Öruggt fall sem skilar fylki af strengjum úr gefnum streng, skipt upp með
 * gefnum afmarkara (separator).
 * @param {string} str Strengur sem á að skipta.
 * @param {string} separator Tákn sem afmarkar strenginn (sjálfgefið bil).
 * @returns {string[]} Fylki af strengjum, tómt fylki ef str er ekki strengur.
 */
function split(str, separator = ' ') {
  if (!isString(str)) {
    return [];
  }
  return str.split(separator);
}

//------------------------------------------------------------------------------
// Grunnföll sem skilgreina á

/**
 * Finnur lengsta orðið í streng.
 * @param {string} str Strengur sem inniheldur orð.
 * @returns {string|null} Lengsta orðið í strengnum, eða null ef inntak er ógilt.
 */
function longest(str) {
  if (!isString(str)) return null;  // Bæta við athugun fyrir ólöglegt inntak
  const words = split(str);
  if (words.length === 0) return '';
  return words.reduce((a, b) => (b.length > a.length ? b : a), words[0]);
}

/**
 * Finnur stysta orðið í streng.
 * @param {string} str Strengur sem inniheldur orð.
 * @returns {string|null} Stysta orðið í strengnum, eða null ef inntak er ógilt.
 */
function shortest(str) {
  if (!isString(str)) return null;  // Bæta við athugun fyrir ólöglegt inntak
  const words = split(str);
  if (words.length === 0) return '';
  return words.reduce((a, b) => (b.length < a.length ? b : a), words[0]);
}


/**
 * Snýr streng við.
 * @param {string} str Strengur sem á að snúa við.
 * @returns {string|null} Strengurinn snúinn við, eða null ef inntak er ógilt.
 */
function reverse(str) {
  if (!isString(str)) return null;
  if (str.length === 0) return '';
  return str.split('').reverse().join('');
}

/**
 * Athugar hvort strengur sé samhverfa (palindrome).
 * @param {string} str Strengur sem á að athuga.
 * @returns {boolean} `true` ef strengurinn er samhverfa, annars `false`.
 */
function palindrome(str) {
  if (!isString(str) || str.length === 0) return false;
  const cleanStr = str.toLowerCase();
  return cleanStr === cleanStr.split('').reverse().join('');
}

/**
 * Telur fjölda sérhljóða í streng.
 * @param {string} str Strengur sem á að telja sérhljóða úr.
 * @returns {number} Fjöldi sérhljóða, 0 ef engir eða str er ógilt.
 */
function vowels(str) {
  if (!isString(str)) return 0;
  return [...str.toLowerCase()].filter(char => VOWELS.includes(char)).length;
}

/**
 * Telur fjölda samhljóða í streng.
 * @param {string} str Strengur sem á að telja samhljóða úr.
 * @returns {number} Fjöldi samhljóða, 0 ef engir eða str er ógilt.
 */
function consonants(str) {
  if (!isString(str)) return 0;
  return [...str.toLowerCase()].filter(char => CONSONANTS.includes(char)).length;
}


//------------------------------------------------------------------------------
// Leiðbeint ferli

/**
 * Byrjar leiðbeint ferli fyrir vinnslu strengs með mismunandi aðgerðum.
 * Spyr notanda um inntaksstreng og prentar niðurstöður úr útfærðum föllum.
 * 
 * @returns {null} Skilar engu, prentar niðurstöður í console.
 */
function start() {
  // Birta leiðbeiningar
  alert("Leiðbeint ferli: Sláðu inn streng til að fá upplýsingar um hann.");

  // Fá inntaksstreng
  const str = prompt("Sláðu inn streng til að greina:");

  // Athuga hvort inntakið sé gilt
  if (!isString(str) || str.trim() === '') {
    console.error("Ógilt inntak. Vinsamlegast sláðu inn gildan streng.");
    return;
  }

  // Keyra föllin og safna niðurstöðum
  const results = [
    `Lengsta orðið: ${longest(str)}`,
    `Stysta orðið: ${shortest(str)}`,
    `Strengurinn öfugur: ${reverse(str)}`,
    `Fjöldi sérhljóða: ${vowels(str)}`,
    `Fjöldi samhljóða: ${consonants(str)}`,
    `Er samhverfa? (palindrome?): ${palindrome(str) ? 'Já' : 'Nei'}`
  ];

  // Birta niðurstöður
  alert(results.join("\n"));

  // Spyrja hvort notandi vilji keyra aftur
  if (confirm("Viltu reyna aftur?")) {
    start(); // Keyra aftur
  } else {
    alert("Leiðbeinda ferlinu er lokið");
  }
}

//------------------------------------------------------------------------------
// Prófanir

// Prófanir fyrir longest
console.assert(longest('halló heimur!') === 'heimur!', 'Próf: longest - villa: átti að skila "heimur!"');
console.assert(longest('') === '', 'Próf: longest - villa: átti að skila tómum streng');
console.assert(longest(12345) === null, 'Próf: longest - villa: átti að skila null fyrir ógilt inntak');

// Prófanir fyrir shortest
console.assert(shortest('halló heimur!') === 'halló', 'Próf: shortest - villa: átti að skila "halló"');
console.assert(shortest('') === '', 'Próf: shortest - villa: átti að skila tómum streng');
console.assert(shortest(12345) === null, 'Próf: shortest - villa: átti að skila null fyrir ógilt inntak');

// Prófanir fyrir reverse
console.assert(reverse('halló') === 'óllah', 'Próf: reverse - villa: átti að skila "óllah"');
console.assert(reverse('') === '', 'Próf: reverse - villa: átti að skila tómum streng');
console.assert(reverse(12345) === null, 'Próf: reverse - villa: átti að skila null fyrir ógilt inntak');

// Prófanir fyrir palindrome
console.assert(palindrome('abba') === true, 'Próf: palindrome - villa: "abba" er samhverfa');
console.assert(palindrome('halló') === false, 'Próf: palindrome - villa: "halló" er ekki samhverfa');
console.assert(palindrome('') === false, 'Próf: palindrome - villa: tómur strengur er ekki samhverfa');

// Prófanir fyrir vowels
console.assert(vowels('halló') === 2, 'Próf: vowels - 2 sérhljóðar');
console.assert(vowels('') === 0, 'Próf: vowels - tómt strengur');

// Prófanir fyrir consonants
console.assert(consonants('halló') === 3, 'Próf: consonants - 3 samhljóðar');
console.assert(consonants('') === 0, 'Próf: consonants - tómt strengur');
