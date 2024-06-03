import React from "react";
import Input from "./Input";
import BasicCheckbox from "./BasicCheckbox";
export default function BooleanInputs({ formValues, handleChange, handleOperatorChange, handleTypeChange, handleDeleteField, handleAddField, handleSubmit, handleClear, hiddenFields, checkValues, handleCheck, yearValues, handleYearChange }) {
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

          {!hiddenFields['add'] && (<button type="button"className="add-btn" onClick={handleAddField}>
            Add new
          </button>)}

          <p>Text Type</p>
          <BasicCheckbox checkValues={checkValues} checkHandler={handleCheck} />
          <br></br>
          <p>Published After(Year)</p>
          <input type="number" name="year_begin" min="0" max="9999"id="year_begin"value={yearValues.begin >0 &&yearValues.begin || ""} onChange={(e)=>handleYearChange(e, "begin")}></input>

          <p>Published Before (Year)</p>
          <input type="number" name="year_end" min="0" max="9999"id="year_end"value={yearValues.end>0 && yearValues.end || ""} onChange={(e)=>handleYearChange(e, "end")}></input>

          <br></br>
          {!hiddenFields['clear'] && (<button type="button"className="clear-btn" onClick={handleClear}>
            Clear
          </button>)}


          {!hiddenFields['searcb'] && (<button type="submit" className="submit-btn">
            Search
          </button>)}
        </div>

      </form>
    </div>
  );
}