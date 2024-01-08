export const createKeywordsGranular = (key:string) => {
    const setChar:Set<string> = new Set([]);
    const letterArr = []
    const keyLower = key.toLocaleLowerCase();
    keyLower.split('').forEach(letter => {
      setChar.add(letter);
      letterArr.push(letter);
    });
    for(let i=0; i<letterArr.length;i++){
      var compoundWord:string = letterArr[i];
      for(let j=i+1; j<letterArr.length;j++){
        compoundWord+=('' + letterArr[j]);
        setChar.add(compoundWord.trim());
      }
    }
    return setChar;
  }
export const createSimpleKeyWordsGranular = (key:string) =>{
  const setChar:Set<string> = new Set([]);
  const lowerKey = key.toLowerCase();
  key.split('').forEach(letter => {
    setChar.add(letter);
  });
  let compoundWord = ''
  for(let i=0; i<lowerKey.length;i++){
    compoundWord+=lowerKey[i]
    setChar.add(compoundWord)
  }
  return setChar;
}
export const createKeywordsByWord = (key:string) => {
    key.toLowerCase();
    const setWord:Set<string> = new Set([]);
    const wordArr = []
    setWord.add('');
    setWord.add(' ');
    key.split(' ').forEach((word:string) => {
        
        setWord.add(word.trim().toLocaleLowerCase());
        wordArr.push(word.trim().toLocaleLowerCase())
    })

    for(let i=0; i<wordArr.length;i++){
      var compoundWord:string = wordArr[i];
      for(let j=i+1; j<wordArr.length;j++){
        compoundWord+=(' ' + wordArr[j]);
        setWord.add(compoundWord.trim().toLocaleLowerCase());
      }
    }
    return setWord
}