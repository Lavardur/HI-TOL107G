import { isString, split} from './helpers.js';

//------------------------------------------------------------------------------
// Fastar

/** Íslenskir sérhljóðar */
const CONSONANTS = 'bcdfghjklmnpqrstvwxz'.split('');

/** Íslenskir samhljóðar */
const VOWELS = 'aeiouyáéýúíóöæ'.split('');

//------------------------------------------------------------------------------

/**
 * Telur fjölda stafa í streng sem eru í characters fylki.
 * @param {string} str Strengur til að telja stafi í
 * @param {string[]} characters Fylki af stöfum sem á að telja
 * @returns {number} Fjöldi stafa í streng sem eru í characters
 */
export function countGivenCharactersInString(str, characters) {
  if (!isString(str)) {
    return 0;
  }

  const splitStr = split(str, "");

  let count = 0;

  for (const char of splitStr) {
    if (characters.includes(char)) {
      count += 1;
    }
  }

  return count;
}

console.assert(
  countGivenCharactersInString("", []) === 0,
  "countGivenCharactersInString: skilar 0 ef tómi strengur"
);
console.assert(
  countGivenCharactersInString("asdf", []) === 0,
  "countGivenCharactersInString: skilar 0 ef tóma fylkið"
);
console.assert(
  countGivenCharactersInString("halló", ["a", "l"]) === 3,
  "countGivenCharactersInString: skilar fjölda stafa í streng"
);

export function consonants(str) {
    return countGivenCharactersInString(str, CONSONANTS);
  }
  console.assert(
    consonants('halló') === 3,
    'consonants: skilar fjölda samhljóða í streng',
  );
  console.assert(consonants('') === 0, 'consonants: skilar 0 ef tómur strengur');
  console.assert(
    consonants(null) === 0,
    'consonants: skilar 0 ef ekki er gefinn strengur',
  );

  export function vowels(str) {
    return countGivenCharactersInString(str, VOWELS);
  }
  console.assert(
    vowels('halló') === 2,
    'vowels: skilar fjölda sérhljóða í streng',
  );
  console.assert(vowels('') === 0, 'vowels: skilar 0 ef tómur strengur');
  console.assert(
    vowels(null) === 0,
    'vowels: skilar 0 ef ekki er gefinn strengur',
  );

