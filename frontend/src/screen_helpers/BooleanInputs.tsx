import React from "react";
import Input from "./Input";
import '../screens/Input.css'
export default function BooleanInputs({ formValues,handleChange, handleOperatorChange, handleTypeChange, handleDeleteField, handleAddField}) {
  return (
    <div className="center">

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

          <button className="add-btn" onClick={handleAddField}>
            Add new
          </button>
        </div>
        </div>
  );
}