import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BookEntry } from "../screen_helpers/BookEntry";
import { deleteEntry, getEntry, patchEntry, postEntry } from "../function_helpers/sqlFunctions";
import { API_URL, allLC, allSubjects } from "../function_helpers/handyVariables";
import { useAuthContext } from "../hooks/useAuthContext";
const Edit = () => {
  const { id } = useParams(); //Grab route parameters from current route

  const [title, setTitle] = useState("");
  const [titlec, setTitlec] = useState("");
  const [titlep, setTitlep] = useState("");
  const [subjects, setSubjects] = useState(new Set([]));
  const [curSubject, setCurSubject] = useState("");
  const [author, setAuthor] = useState("");
  const [authorc, setAuthorc] = useState("");
  const [authorp, setAuthorp] = useState("");

  const [entryNumber, setEntryNumber] = useState("");
  const [note, setNote] = useState("");
  const [ISBN, setISBN] = useState("");
  const [publication, setPublication] = useState("");
  const [pageCount, setPageCount] = useState("");
  const [seriesTitle, setSeriesTitle] = useState("");
  const [languageCode, setLanguageCode] = useState(new Set(''));
  const [resource, setResource] = useState("");
  const [curLC, setCurLC] = useState("");
  const [isPending, setIsPending] = useState(false);

  const {user} = useAuthContext()
    useEffect(()=>{
      if(!user){
        return
      }
        getEntry(id, user.token).then((e:BookEntry)=>{
            const be: BookEntry = e
            setTitle(be.title)
            setTitlec(e.titlec)
            setTitlep(e.titlep)
            setSubjects(new Set(e.subjects))
            setAuthor(e.author)
            setAuthorc(e.authorc)
            setAuthorp(e.authorp)
            setEntryNumber(e.entryNumber)
            setNote(e.note)
            setISBN(e.ISBN)
            setPublication(e.publication)
            setPageCount(e.pageCount)
            setSeriesTitle(e.seriesTitle)
            setLanguageCode(new Set(e.languageCode))
            setResource(e.resource)
          })
    }, [id])
  
  const navigate = useNavigate();
  const onAddLCClick = (e) => {
    e.preventDefault();
    let tempLC = languageCode;
    tempLC.add(curLC);
    setLanguageCode(tempLC);
    setCurLC("");
  };
  const onAddSubjectClick = (e) => {
    e.preventDefault();
    let tempSubjects = subjects;
    tempSubjects.add(curSubject);
    setSubjects(tempSubjects);
    setCurSubject("");
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsPending(true);
    let currentDate: Date = new Date(Date.now());
    let newBookEntry = {
      author: author,
      authorc: authorc,
      authorp: authorp,
      title: title,
      titlec: titlec,
      titlep: titlep,
      note: note,
      ISBN: ISBN,
      publication: publication,
      pageCount: pageCount,
      seriesTitle: seriesTitle,
      seriesTitlec: "",
      languageCode: Array.from(languageCode),
      resource: resource,
      subjects: Array.from(subjects),
    };
    console.log(newBookEntry)
    patchEntry(API_URL +'film-entries/' +id, newBookEntry, user.token).then((v) => {
      setIsPending(false);
      navigate("/");
    });
  };
  return (
    <div className="create">
      <h2>Edit Entry: {entryNumber}</h2>
      <form onSubmit={handleSubmit}>
        <label>Entry Number:</label>
        <input
          type="text"
          required
          value={entryNumber}
          onChange={(e) => setEntryNumber(e.target.value)}
        ></input>

        <label>ISBN:</label>
        <input
          type="text"
          value={ISBN}
          onChange={(e) => setISBN(e.target.value)}
        ></input>

        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <label>Title(中文):</label>
        <input
          type="text"
          value={titlec}
          onChange={(e) => setTitlec(e.target.value)}
        ></input>
        <label>Title(Pinyin):</label>
        <input
          type="text"
          value={titlep}
          onChange={(e) => setTitlep(e.target.value)}
        ></input>

        <label>Authors:</label>
        <input
          type="text"
          
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        ></input>
        <label>Author(中文):</label>
        <input
          type="text"
          value={authorc}
          onChange={(e) => setAuthorc(e.target.value)}
        ></input>
        <label>Author(Pinyin):</label>
        <input
          type="text"
          value={authorp}
          onChange={(e) => setAuthorp(e.target.value)}
        ></input>
        <label>Subject(s):</label>
        <input
          list="subjects"
          id="subject-choice"
          name="subject-choice"
          value={curSubject}
          onChange={(e) => setCurSubject(e.target.value)}
        />
        <datalist id="subjects">
          {allSubjects.map((sub) => (
            <option key={sub} value={sub}></option>
          ))}
        </datalist>
        <div className="subject-list">
          {Array.from(subjects).map((subject) => (
            <p key={subject}>{subject}</p>
          ))}
        </div>
        <button onClick={(e) => onAddSubjectClick(e)}>Add Subject</button>
        <label>Publication:</label>
        <input
          type="text"
          value={publication}
          onChange={(e) => setPublication(e.target.value)}
        ></input>

        <label>Page Count:</label>
        <input
          type="text"
          value={pageCount}
          onChange={(e) => setPageCount(e.target.value)}
        ></input>

        <label>Series Title:</label>
        <input
          type="text"
          value={seriesTitle}
          onChange={(e) => setSeriesTitle(e.target.value)}
        ></input>

        <label>Resource:</label>
        <input
          type="text"
          value={resource}
          onChange={(e) => setResource(e.target.value)}
        ></input>

        <label>Note:</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
        ></textarea>

<label>Language Code(s):</label>
        <input
          list="lc"
          id="lc-choice"
          name="lc-choice"
          value={curLC}
          onChange={(e) => setCurLC(e.target.value)}
        />
        <datalist id="lc"> 
          {allLC.map((sub) => (
            <option key={sub} value={sub}></option>
          ))}
        </datalist>
        <div className="lc-list">
          {Array.from(languageCode).map((lc) => (
            <p key={lc}>{lc}</p>
          ))}
        </div>
        <button onClick={(e) => onAddLCClick(e)}>Add Language Code</button>
        <p></p>
        {!isPending && <button>Update</button>}
        {isPending && <button disabled>Updating Entry...</button>}
      </form>
    </div>
  );
};

export default Edit;
