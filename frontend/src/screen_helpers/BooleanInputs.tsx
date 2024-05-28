import React from "react";
import Input from "./Input";
export default function BooleanInputs({ formValues, handleChange, handleOperatorChange, handleTypeChange, handleDeleteField, handleAddField, handleSubmit, handleClear, hiddenFields }) {
  return (
    <div className="booleanInput">
      <form onSubmit={handleSubmit}>
      <div className="center">

          {formValues.map((obj, index) => (
            <Input
              key={index}
              objValue={obj}
              onChange={handleChange}
              onOperatorChange={handleOperatorChange}
              onTypeChange={handleTypeChange}
              index={index}
              // Add this
              deleteField={handleDeleteField}
            />
          ))}
          {!hiddenFields['add'] && ( <button className="add-btn"  onClick={handleAddField} onSubmit={handleSubmit}>
            Add new
          </button>)}
          {!hiddenFields['clear'] && ( <button className="clear-btn" onClick={handleClear}>
            Clear
          </button>)}
          {!hiddenFields['searcb'] && (   <button type="submit" className="submit-btn">
            Search
          </button>)}
          
          <p>{hiddenFields['add']}</p>
          
                  </div>
                 
          

      </form>
    </div>
  );
}