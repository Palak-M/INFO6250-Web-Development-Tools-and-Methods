"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare( word, guess ) {  // DO NOT MODIFY

/* YOU MAY MODIFY THE LINES BELOW */

  let word1 = word.toLowerCase();
  let guess1 = guess.toLowerCase();

  let count = 0;
  const chars = guess1.split("");
  for(let s of word1){
      let str = (ch) => ch === s;
      let index = chars.findIndex(str);
      if(index >= 0){
        count++;
        chars.splice(index,1);
      }
  }

  return count; 
}
