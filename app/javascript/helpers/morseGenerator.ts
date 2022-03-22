const alphabet = {
  'a': '.-', 'b': '-...', 'c': '-.-.', 'd': '-..',
  'e': '.', 'f': '..-.', 'g': '--.', 'h': '....',
  'i': '..', 'j': '.---', 'k': '-.-', 'l': '.-..',
  'm': '--', 'n': '-.', 'o': '---', 'p': '.--.',
  'q': '--.-', 'r': '.-.', 's': '...', 't': '-',
  'u': '..-', 'v': '...-', 'w': '.--', 'x': '-..-',
  'y': '-.--', 'z': '--..', ' ': '/',
  '1': '.----', '2': '..---', '3': '...--', '4': '....-',
  '5': '.....', '6': '-....', '7': '--...', '8': '---..',
  '9': '----.', '0': '-----',
}

export const generateCode = (word: string) => {
  let phrase = word.toLowerCase().replace(/[^a-z]/g, '')
  return phrase
    .split('')            // Transform the string into an array: ['T', 'h', 'i', 's'...
    .map(function (e) {     // Replace each character with a morse "letter"
      return alphabet[e.toLowerCase()] || '' // Lowercase only, ignore unknown characters.
    })
    .join(' ')
}
