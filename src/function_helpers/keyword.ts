export const createKeywordsGranular = (key:string) => {
    const setChar:Set<string> = new Set([]);

    key.split('').forEach(letter => {
      setChar.add(letter);
    });
    let arrWord = Array.from(setChar);
    for(let i=0; i<arrWord.length;i++){
      var compoundWord:string = arrWord[i];
      for(let j=i+1; j<arrWord.length;j++){
        compoundWord+=('' + arrWord[j]);
        setChar.add(compoundWord.trim());
      }
    }
    return setChar;
  }

export const createKeywordsByWord = (key:string) => {
    key.toLowerCase();
    const setWord:Set<string> = new Set([]);
    setWord.add('');
    setWord.add(' ');
    key.split(' ').forEach((word:string) => {
        
        setWord.add(word.trim().toLocaleLowerCase());
    })

    let arrWord = Array.from(setWord);
    for(let i=0; i<arrWord.length;i++){
      var compoundWord:string = arrWord[i];
      for(let j=i+1; j<arrWord.length;j++){
        compoundWord+=(' ' + arrWord[j]);
        setWord.add(compoundWord.trim().toLocaleLowerCase());
      }
    }
    return setWord
}