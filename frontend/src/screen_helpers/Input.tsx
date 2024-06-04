import React, { useState } from "react";
import { useTranslation } from "react-i18next";
export default function Input({ objValue, onChange, onTypeChange, onOperatorChange, index, deleteField }) {
  const { type, value, op } = objValue;
  let hiddenVals = {}
  if(objValue['hidden']){
    hiddenVals = objValue['hidden']
  }
  const {t} = useTranslation()
  const typeValues = ['subject', 'author', 'title', 'publication']
  return (
    <div className="input-group">
        
      <div className="input">
       {!hiddenVals['op'] &&(
      <select onChange={(e) =>onOperatorChange(e, index)}>
              <option value="OR">{t("or")}</option>
              <option value="AND">{t("and")}</option>
              <option value="NOT">{t("not")}</option>
            </select>)
}
      <input
          type={type || "text"}
          value={value || ""}
          onChange={(e) => onChange(e, index)}
        />
        <select onChange = {(e) =>onTypeChange(e, index)}>
        <option value="keyword">{t("keyword")}</option>
        <option value="titleAgg">{t("title")}</option>
              <option value="ISBN">{t("isbn")}</option>
              <option value="subjects">{t("subject")}</option>
              <option value="authorAgg">{t("author")}</option>
              <option value="publication">{t("publication")}</option>
              <option value="entryNumber">{t("entry-number")}</option>

              <option value="pageCount">{t("page-count")}</option>
              <option value="seriesTitle">{t("series-title")}</option>
              <option value="note">{t("note")}</option>
              <option value="resource">{t("resource")}</option>



            </select>
        {!hiddenVals['del'] &&
        <div onClick={(e) => deleteField(e, index)}>X</div>
}
      </div>
    </div>
  );
}