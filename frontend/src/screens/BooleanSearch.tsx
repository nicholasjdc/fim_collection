import { useEffect, useState } from "react";
import Input from "../screen_helpers/Input";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import PageinatedBookList from "../screen_helpers/PageinatedBookList";
import { BookEntry } from "../screen_helpers/BookEntry";
import { getEntries } from "../function_helpers/sqlFunctions";
import { API_URL } from "../function_helpers/handyVariables";
import BooleanInputs from "../screen_helpers/BooleanInputs";
function BooleanSearch() {
  const { user } = useAuthContext()
  const [books, setBooks] = useState<BookEntry[] | null>(null);
  const [bookResultCount, setBookResultCount] = useState(null);
  const [isPending, setIsPending] = useState<boolean | null>(null);
  const [error, setError] = useState(null);
  const [resultPageNumber, setResultPageNumber] = useState(1);
  const [search, setSearch] = useSearchParams();
  const [formValues, setFormValues] = useState([{
    type: "titleAgg",
    op: "OR",
    value: "",
  }]);
  const handleClear = (e) =>{
    e.preventDefault();
    const values = [...formValues]
    values.map((val)=>{
      val.value = ""
    })
    setFormValues(values)


  }
 
  const handleChange = (e, index) => {
    const values = [...formValues];
    values[index].value = e.target.value;
    setFormValues(values);
  };

  const handleAddField = (e) => {
    e.preventDefault();
    const values = [...formValues];
    values.push({
      type: "titleAgg",
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

  const handleOperatorChange = (e, index) => {
    e.preventDefault()
    const values = [...formValues];
    values[index].op = e.target.value;
    setFormValues(values);

  }
  const handleTypeChange = (e, index) => {
    e.preventDefault()
    const values = [...formValues];
    values[index].type = e.target.value;
    console.log(e.target.value)
    setFormValues(values);

  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const queryParams = {}
    formValues.map((val) => {

      if (val.value.length){

      let opKey = `${val.op}$!${val.type}`
      if(queryParams[opKey]){
        queryParams[opKey] = queryParams[opKey] +','+val.value

      }else{
        queryParams[opKey] = val.value

      }
    }else{
      ;
    }
    })
    setResultPageNumber(1);
    setSearch(createSearchParams(queryParams).toString())

  };
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setResultPageNumber(value);
    const tempSearch = search;
    tempSearch.set("resultPageNumber", value.toString());
    setSearch(tempSearch);
  };
  useEffect(() => {
    setIsPending(true);

    if (search.get("resultPageNumber")) {
      setResultPageNumber(parseInt(search.get("resultPageNumber")));
    }
    if (user) {
      getEntries(API_URL + "film-entries?" + search, user.token)
        .then((result) => {
          var entries = result['entries'];
          setBookResultCount(result['count']);
          setBooks(entries as BookEntry[]);
          setError(null);
        })
        .catch((err) => {
          setIsPending(false);
          setError(err.message);
        });
    }
    setIsPending(false);
  }, [search, user]);
  return (
    <div className="BooleanSearch">
        {<BooleanInputs hiddenFields={{}} handleClear={handleClear}formValues={formValues} handleChange={handleChange} handleOperatorChange={handleOperatorChange} handleTypeChange={handleTypeChange} handleDeleteField={handleDeleteField} handleAddField={handleAddField} handleSubmit={handleSubmit}/>}
       
      {<PageinatedBookList books={books} bookResultCount={bookResultCount} error={error} isPending={isPending} handlePageChange={handlePageChange} resultPageNumber={resultPageNumber} />}
    </div>
  );
}
export default BooleanSearch;