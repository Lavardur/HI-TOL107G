/**
 * Sýnilausn á verkefni 8 í Vefforritun 1, 2024.
 * Byggir á sýnilausn á verkefni 7.
 * Notar jsdoc til að skrifa lýsingu á föllum, inntaki og úttaki.
 * Kveikið á `Check JS` í Visual Studio Code til að sjá mögulegar villur.
 * Notar `console.assert` til að athuga hvort föll virki rétt.
 */

import { isString, splitOnWhitespace } from './lib/helpers.js';
import {countGivenCharactersInString, vowels, consonants } from './lib/countGivenCharactersInString.js';
import {longest} from './lib/longest.js';
import {reverse, palindrome} from './lib/reverse.js';
import {shortest} from './lib/shortest.js';


const test = isString('hæ');
console.log('test er strengur?', test);

const stringWithWhitespace = `halló
\theimur
hæ`;
const split = splitOnWhitespace(stringWithWhitespace);
console.log(split);

const textarea = document.querySelector('.textarea');



textarea.addEventListener('input', () => {
  console.log('textarea inniheldur:', textarea.value);
});

const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      console.log('Form sent með gögnum');

      for (const pair of data.entries()) {
        console.log(`${pair[0]}, ${pair[1]}`);
      }
});