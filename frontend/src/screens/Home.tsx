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
  const [formValues, setFormValues] = useState([{
    type: "keyword",
    op: "OR",
    value: "",
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
      if(val.value.length){
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
    console.log(createSearchParams(queryParams).toString())
    setSearch(createSearchParams(queryParams).toString());
  };
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
      type: "keyword",
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
      <div className="search">
        <form id="form" onSubmit={handleSubmit}>
        {<BooleanInputs formValues={formValues} handleChange={handleChange} handleOperatorChange={handleOperatorChange} handleTypeChange={handleTypeChange} handleDeleteField={handleDeleteField} handleAddField={handleAddField}/>}
        <button type="submit" className="submit-btn">
          Search
          </button>
          <button className="clear-btn" onClick={handleClear}>
            Clear
          </button>
        </form>
      </div>
      {<PageinatedBookList books={books} bookResultCount={bookResultCount}
        resultPageNumber={resultPageNumber}
        handlePageChange={handlePageChange}
        isPending={isPending}
        error={error} />
  }
      {/*
      {error && <div>{error}</div>}
      {isPending && <div>Searching...</div>}
a      
      {books && (
        <BookList
          books={books}
          title="Found Entries"
          bookCount={bookResultCount}
        />
      )}
      <p></p>
      <Pagination
        page={resultPageNumber}
        count={Math.ceil(bookResultCount / 25)}
        color="primary"
        onChange={handlePageChange}
      />
      */}
    </div>
  );
};

export default Home;
