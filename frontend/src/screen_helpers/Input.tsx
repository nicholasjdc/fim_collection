import React, { useState } from "react";
export default function Input({ objValue, onChange, onTypeChange, onOperatorChange, index, deleteField }) {
  const { type, value } = objValue;
  const typeValues = ['subject', 'author', 'title', 'publication']
  return (
    <div className="input-group">
        
      <div className="input">
      <select onChange={(e) =>onOperatorChange(e, index)}>
              <option value="OR">OR</option>
              <option value="AND">AND</option>
              <option value="NOT">NOT</option>
            </select>
        <input
          type={type || "text"}
          value={value || ""}
          onChange={(e) => onChange(e, index)}
        />
        <select onChange = {(e) =>onTypeChange(e, index)}>
        <option value="titleAgg">Title</option>
              <option value="subjects">Subject</option>
              <option value="authorAgg">Author</option>
              <option value="publication">Publication</option>
              <option value="entryNumber">Entry Number</option>

              <option value="pageCount">Page Count</option>
              <option value="seriesTitle">Series Title</option>
              <option value="pageCount">Page Count</option>
              <option value="note">Note</option>
              <option value="resource">Resource</option>



            </select>
        {/* Add this */}
        <div onClick={(e) => deleteField(e, index)}>X</div>
      </div>
    </div>
  );
}