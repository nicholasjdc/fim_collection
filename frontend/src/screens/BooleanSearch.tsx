import { useState, useRef } from "react";
import Input from "../screen_helpers/Input";
import './Input.css'
function BooleanSearch() {
  const [formValues, setFormValues] = useState([]);

  
  const inputRef = useRef();
  const selectRef = useRef();

  const handleChange = (e, index) => {
    const values = [...formValues];
    values[index].value = e.target.value;
    setFormValues(values);
  };

  const handleAddField = (e) => {
    e.preventDefault();
    const values = [...formValues];
    values.push({
      label: "label",
      type: "text",
      value: "",
    });
    setFormValues(values);
  };

  const handleDeleteField = (e, index) => {
    const values = [...formValues];
    values.splice(index, 1);
    setFormValues(values);
    
  };

  const handleOperatorChange = (e, index)=>{
    e.preventDefault()
    const values = [...formValues];
    values[index].type = e.target.value;
    setFormValues(values);

  }
  const handleTypeChange = (e, index)=>{
    e.preventDefault()
    const values = [...formValues];
    values[index].op = e.target.value;
    setFormValues(values);

  }
  const addBtnClick = (e) => {
    e.preventDefault();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues)
    
  };
  return (
    <div className="App">
      <form onSubmit ={handleSubmit}>
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
        
          <div className="center">
            <button className="add-btn" onClick={handleAddField}>
              Add new
            </button>
          </div>
        
        <button type="submit" className="submit-btn">
          Search
        </button>
      </form>
    </div>
  );
}
export default BooleanSearch;