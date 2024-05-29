import React from "react";
import Input from "./Input";
import BasicCheckbox from "./BasicCheckbox";
export default function BooleanInputs({ formValues, handleChange, handleOperatorChange, handleTypeChange, handleDeleteField, handleAddField, handleSubmit, handleClear, hiddenFields, checkValues }) {
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

          <p>Text Type</p>
          <BasicCheckbox checkValues={[{'name': 'Book', 'checked': true}, {'name': 'Thesis', 'checked': true}, {'name': 'Script', 'checked': true}, {'name': 'Screenplay', 'checked': true}]} checkHandler={()=>{}}/>
                  </div>
                 <br></br>
          <p>Year</p>
          <input type="number"></input> <p>-</p> <input type="number"></input>
          <br></br>
          {!hiddenFields['searcb'] && (   <button type="submit" className="submit-btn">
            Search
          </button>)}
         
      </form>
    </div>
  );
}