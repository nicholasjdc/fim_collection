import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import globe from "/globe.svg"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"

const LanguageSelector = () =>{
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
    const {i18n} =useTranslation()
    const [currentLanguage, setCurrentLanguage]=  useState(languages[i18n.language])

    const changeLanguage = (e) =>{
        i18n.changeLanguage(e.target.value)
        setCurrentLanguage(languages[e.target.value])
    }

    return <div className="btn-container">
       <select name="languageS" id="languages" onChange={changeLanguage}>
       {languages.map((lng)=>{
            return(
    <option value={lng.code}>{lng.lang}</option>

 
            )
        })}
       </select>
     
    </div>
}
export default LanguageSelector;