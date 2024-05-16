import React from "react";
import Input from "./Input";
import '../screens/Input.css'
export default function BooleanInputs({ formValues, handleChange, handleOperatorChange, handleTypeChange, handleDeleteField, handleAddField, handleSubmit }) {
  return (
    <div className="center">
      <form onSubmit={handleSubmit}>
        <div className="BooleanInputs">
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
          <p></p>
          <button type="submit" className="submit-btn">
            Search
          </button>
          <p></p>
          <button className="add-btn" onSubmit={(e) => "waoh"} onClick={handleAddField}>
            Add new
          </button>

        </div>
      </form>
    </div>
  );
}