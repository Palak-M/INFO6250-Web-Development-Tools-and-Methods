const compare = function(word, guess){
    word = word.toLowerCase().split('').sort().join('');
    guess = guess.toLowerCase().split('').sort().join('');

    let wordIdx = 0;
    let guessIdx = 0;
    let count = 0;
    while(wordIdx < word.length && guessIdx < guess.length){
        if(word[wordIdx] === guess[guessIdx]){
            count++;
            wordIdx++;
            guessIdx++;
        }else if(word[wordIdx] < guess[guessIdx]){
            wordIdx++;
        }else{
            guessIdx++;
        }
    }
    return count;
};

module.exports = compare;