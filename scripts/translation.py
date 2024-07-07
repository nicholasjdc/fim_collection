from googletrans import Translator, LANGUAGES
import json
translator = Translator()
t = translator.translate('hello', dest='zh-cn')
translationDictionaryFileLocs= {}
sourceFolder = "../frontend/public/locales"
sourceJSONDest = "../frontend/public/locales/en/translation.json"
languageList = ['en', 'fr', 'ja', 'ko', 'zh-CN', 'zh-TW']
for l in languageList:
    translationDictionaryFileLocs[l] = sourceFolder + '/' + l + '/translation.json'
with open(translationDictionaryFileLocs['en']) as subjects_file:
    en_file_contents = subjects_file.read()

parsed_dic = json.loads(en_file_contents)
for l in languageList:
    if l =='en':
        continue
    translated_dic ={}
    for e in parsed_dic:
        translated_dic[e] = (translator.translate(parsed_dic[e], dest=l)).text
    with open(translationDictionaryFileLocs[l], 'w', encoding='utf-8') as file:
        json.dump(translated_dic, file, ensure_ascii=False, indent=4)
