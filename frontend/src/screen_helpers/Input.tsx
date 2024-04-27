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
              <option value="subject">Subject</option>
              <option value="author">Author</option>
              <option value="title">Title</option>
              <option value="publication">Publication</option>
            </select>
        {/* Add this */}
        <div onClick={(e) => deleteField(e, index)}>X</div>
      </div>
    </div>
  );
}