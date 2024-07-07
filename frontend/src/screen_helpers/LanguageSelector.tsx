import React from "react"
import { useTranslation } from "react-i18next"

const languages = [
    {
        code:'en', lang:"English"
    },
    {code: 'zh-cn', lang: '中文(简体)'},
    {code: 'zh-tw', lang:'中文(繁體)'},
    {code: 'fr', lang: 'français'},
    {code: 'ja', lang: '日本語'},
    {code: 'ko', lang: '한국인'},

]

const LanguageSelector = () =>{
    const {i18n} =useTranslation()
    const changeLanguage = (lng) =>{
        i18n.changeLanguage(lng)
    }

    return <div className="btn-container">
        {languages.map((lng)=>{
            return(
            <button key={lng.code} onClick={()=>changeLanguage(lng.code)}>
                {lng.lang}
            </button>
            )
        })}
    </div>
}
export default LanguageSelector;