/*
Keywords by Category:
    - Entry Number: Exact search
    - Author: First, middle, last **
        -etc. for chinese and pinyin
    - title: each word demarcated **
        -etc. for chinese and pinyin
    - publication: exact
    - pageCount: exact
    - ISBN: exact
    - seriesTitle: exact
    - note: each word demarcated (NOT IMPORTANT)
    - resource: exact
    - language Code: each code demarcated
    - instantiatedAt: invalid
*/
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
        setChar.add(compoundWord);
      }
    }
    return setChar;
  }

export const createKeywordsByWord = (key:string) => {
  //Make more thorough
  key.toLowerCase();
    const setWord:Set<string> = new Set([]);
    setWord.add('');
    setWord.add(' ');
    key.split(' ').forEach((word:string) => {
        
        setWord.add(word);
    })

    let arrWord = Array.from(setWord);
    for(let i=0; i<arrWord.length;i++){
      var compoundWord:string = arrWord[i];
      for(let j=i+1; j<arrWord.length;j++){
        compoundWord+=(' ' + arrWord[j]);
        setWord.add(compoundWord);
      }
    }
    return setWord
}