import { useState } from "react";
import Input from "../screen_helpers/Input";
import './Input.css'
import { createSearchParams, useSearchParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
function BooleanSearch() {
  const {user} = useAuthContext()
    const [search, setSearch] = useSearchParams();
  const [formValues, setFormValues] = useState([{
    type: "Subject",
    op: "OR",
    value: "",
  }]);


  const handleChange = (e, index) => {
    const values = [...formValues];
    values[index].value = e.target.value;
    setFormValues(values);
  };

  const handleAddField = (e) => {
    e.preventDefault();
    const values = [...formValues];
    values.push({
      type: "Subject",
      op: "OR",
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
    values[index].op = e.target.value;
    setFormValues(values);

  }
  const handleTypeChange = (e, index)=>{
    e.preventDefault()
    const values = [...formValues];
    values[index].type = e.target.value;
    setFormValues(values);

  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const queryParams = {}
    formValues.map((val) => {
        let opKey= `${val.op}$!${val.type}`
        console.log(opKey)

        queryParams[opKey] = val.value
      })
    setSearch(createSearchParams(queryParams).toString())
    
  };
  return (
    <div className="BooleanSearch">
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
      {search}
    </div>
  );
}
export default BooleanSearch;