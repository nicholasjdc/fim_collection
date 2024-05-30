import { useEffect, useState } from "react";
import { BookEntry } from "../screen_helpers/BookEntry";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { getEntries } from "../function_helpers/sqlFunctions";
import { API_URL } from "../function_helpers/handyVariables";
import { useAuthContext } from "../hooks/useAuthContext";
import searchbutton from "../assets/searchbutton.svg";
import PageinatedBookList from "../screen_helpers/PageinatedBookList";
import BooleanInputs from "../screen_helpers/BooleanInputs";
const Home = () => {
  const navigate = useNavigate();

  const [books, setBooks] = useState<BookEntry[] | null>(null);
  const [bookResultCount, setBookResultCount] = useState(null);
  const [isPending, setIsPending] = useState<boolean | null>(null);
  const [error, setError] = useState(null);
  const [resultPageNumber, setResultPageNumber] = useState(1);
  const [search, setSearch] = useSearchParams(); 
  const [checkValues, setCheckValues] = useState([{ 'name': 'book', 'checked': true }, { 'name': 'thesis', 'checked': true }, { 'name': 'script', 'checked': true }, { 'name': 'screenplay', 'checked': true }])
  const [yearValues, setYearValues] = useState({ 'begin': -1, 'end': -1})
  
  const [formValues, setFormValues] = useState([{
    type: "keyword",
    op: "OR",
    value: "",
    hidden: { 'op': true, 'del': true }
  }, {
    type: "keyword",
    op: "OR",
    value: "",
    hidden: { 'del': true }
  }, {
    type: "keyword",
    op: "OR",
    value: "",
    hidden: { 'del': true }
  }]);
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setResultPageNumber(value);
    const tempSearch = search;
    tempSearch.set("resultPageNumber", value.toString());
    setSearch(tempSearch);
  };
  const { user } = useAuthContext();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const queryParams = {};
    queryParams["resultPageNumber"] = 1;
    formValues.map((val) => {
      if (val.value.length) {
        let opKey = `${val.op}$!${val.type}`
        if (queryParams[opKey]) {
          queryParams[opKey] = queryParams[opKey] + ',' + val.value

        } else {
          queryParams[opKey] = val.value

        }
      } else {
        ;
      }
    })
    checkValues.map((val)=>{
      const opKey = 'OR$!type'
      if(val.checked){
        if(queryParams[opKey]){
        queryParams[opKey] = queryParams[opKey] +',' + val.name
        }else{
          queryParams[opKey] = val.name
        }
      }
    })
    if(yearValues.begin >0){

    }
    if(yearValues.end >0){

    }
    setResultPageNumber(1);
    console.log(createSearchParams(queryParams).toString())
    setSearch(createSearchParams(queryParams).toString());
  };
  const handleYearChange = (e, name) =>{
    const yValues = {...yearValues}
    yValues[name] = e.target.value 
    setYearValues(yValues)

  }
  const handleClear = (e) => {
    e.preventDefault();
    const values = [...formValues]
    values.map((val) => {
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
      type: "keyword",
      op: "OR",
      value: "",
      hidden: { 'del': true }
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
    setFormValues(values);

  }
  const handleChecked = (e, index) => {
    const values = [...checkValues]
    values[index].checked = e.currentTarget.checked

    setCheckValues(values)
    
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
    <div className="home">

      {<BooleanInputs handleYearChange={handleYearChange}handleCheck={handleChecked}checkValues={checkValues}hiddenFields={{ 'add': true }} handleClear={handleClear} handleSubmit={handleSubmit} formValues={formValues} handleChange={handleChange} handleOperatorChange={handleOperatorChange} handleTypeChange={handleTypeChange} handleDeleteField={handleDeleteField} handleAddField={handleAddField} yearValues={yearValues}/>}

      {<PageinatedBookList books={books} bookResultCount={bookResultCount}
        resultPageNumber={resultPageNumber}
        handlePageChange={handlePageChange}
        isPending={isPending}
        error={error} />
      }
    </div>
  );
};

export default Home;
