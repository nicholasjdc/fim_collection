import React from "react";
import Input from "./Input";
import '../screens/Input.css'
export default function BooleanInputs({ formValues, handleChange, handleOperatorChange, handleTypeChange, handleDeleteField, handleAddField, handleSubmit, handleClear }) {
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
                  </div>

          <p></p>
          <button type="submit" className="submit-btn">
            Search
          </button>
          <p></p>
          <button className="clear-btn" onClick={handleClear}>
            Clear
          </button>
          <p></p>
          <button className="add-btn" onSubmit={(e) => "waoh"} onClick={handleAddField}>
            Add new
          </button>

      </form>
    </div>
  );
}