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
export const createKeywordsGranular = (key:String) => {
    const arrChar:Set<String> = new Set([]);
    let curName = '';
    key.split('').forEach(letter => {
      curName += letter;
      arrChar.add(curName);
      arrChar.add(letter);
    });
    
    return arrChar;
  }

export const createKeywordsByWord = (key:String) => {
  //Make more thorough
  key.toLowerCase();
    const setWord:Set<String> = new Set([]);
    setWord.add('');
    setWord.add(' ');
    key.split(' ').forEach((word:String) => {
        
        setWord.add(word);
    })

    let arrWord = Array.from(setWord);
    for(let i=0; i<arrWord.length;i++){
      var compoundWord:String = arrWord[i];
      for(let j=i+1; j<arrWord.length;j++){
        compoundWord+=(' ' + arrWord[j]);
        setWord.add(compoundWord);
      }
    }
    return setWord
}


  const generateKeywordsGranular = (names: String[] )=> {
    const [first, middle, last, sfx] = names;
    const suffix = sfx.length > 0 ? ` ${sfx}.` : '';
    const keywordNameWidthoutMiddleName = createKeywordsGranular(`${first} ${last}${suffix}`);
    const keywordFullName = createKeywordsGranular(`${first} ${middle} ${last}${suffix}`);
    const keywordLastNameFirst = createKeywordsGranular(`${last}, ${first} ${middle}${suffix}`);
    
    const middleInitial = middle.length > 0 ? ` ${middle[0]}.` : '';
    const keywordFullNameMiddleInitial = createKeywordsGranular(`${first}${middleInitial} ${last}${suffix}`);
    const keywordLastNameFirstMiddleInitial = createKeywordsGranular(`${last}, ${first}${middleInitial}${suffix}`);
    return [
      ...new Set([
        '',
        ...keywordFullName,
        ...keywordLastNameFirst,
        ...keywordFullNameMiddleInitial,
        ...keywordLastNameFirstMiddleInitial,
        ...keywordNameWidthoutMiddleName
      ])
    ];
  }