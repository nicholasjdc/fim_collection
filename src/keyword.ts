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
const createKeywordsGranular = key => {
    const arrName = [];
    let curName = '';
    key.split('').forEach(letter => {
      curName += letter;
      arrName.push(curName);
    });
    return arrName;
  }

export const createKeywordsByWord = key => {
  //Make more thorough
    const arrWord:Set<String> = new Set([]);
    var longerWord:String = "";
    arrWord.add('');
    arrWord.add(' ');
    key.split(' ').forEach(word => {
        longerWord +=word;
        arrWord.add(longerWord)
        arrWord.add(word);
    })
    arrWord
    arrWord.forEach(word =>{

    });
    return arrWord
}


  const generateKeywordsGranular = names => {
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