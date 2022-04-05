"use strict";

function compare(word, guess){
    if(!word || !guess){
        return null;
    }

    if(word.length !== guess.length){
        return null;
    }

    const wlc = word.toLowerCase();
    let glc = guess.toLowerCase();

    let count=0;

    for(let i in wlc){
        let index = glc.indexOf(wlc[i]);
        if(index !== -1){
            count++;
            glc = glc.substring(0,index) + glc.substring(index+1);
        } 
    }
    return count;
}

module.exports = compare;