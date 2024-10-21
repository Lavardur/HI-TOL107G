import { isString, split} from './helpers.js';

export function reverse(str) {
    if (!isString(str)) {
      return null;
    }
  
    return str.split('').reverse().join('');
  }
  console.assert(
    reverse(null) === null,
    'reverse: skilar tómum streng ef ekki er gefinn strengur',
  );
  console.assert(
    reverse('') === '',
    'reverse: snúinn tómi strengurinn er tómi strengurinn',
  );
  console.assert(reverse('hello') === 'olleh', 'reverse: snýr við streng');

  export function palindrome(str) {
    if (!isString(str)) {
      return false;
    }
  
    if (str === '') {
      return false;
    }
  
    const reversed = reverse(str);
  
    // Hér lendum við í því að þar sem `reverse` *getur* skilað `null` þá ættum
    // við að athuga það líka þó svo að við vitum að við sendum inn streng.
    // Ef kveikt er á „JS Check“ í VSCode þá kemur villumelding ef við gerum ekki.
    if (!isString(reversed)) {
      return false;
    }
  
    return str.toLocaleLowerCase() === reversed.toLocaleLowerCase();
  }
  console.assert(
    palindrome('heh') === true,
    'palindrome: skilar `true` ef `str` er samhverfur',
  );
  console.assert(
    palindrome('halló') === false,
    'palindrome: skilar `false` ef `str` er ekki samhverfur',
  );
  console.assert(
    palindrome(null) === false,
    'palindrome: skilar `false` ef `str` er ekki strengur (null)',
  );
  console.assert(
    palindrome('heh HEH') === true,
    'palindrome: ekki skiptir máli hvort stafir séu hástafir eða lágstafir.',
  );
  console.assert(
    palindrome('heh HEH!') === false,
    'palindrome: ekki þarf að fjarlægja bil, tölustafi eða önnur tákn.',
  );
  console.assert(
    palindrome('') === false,
    'palindrome: tómur strengur er ekki samhverfur.',
  );