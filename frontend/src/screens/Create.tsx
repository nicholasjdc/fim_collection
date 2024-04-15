import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postEntry } from "../function_helpers/mongoFunctions";
import { allLC, allSubjects } from "../function_helpers/handyVariables";
import { useAuthContext } from "../hooks/useAuthContext";
const Create = () => {
  const [title, setTitle] = useState("");
  const [titlec, setTitlec] = useState("");
  const [titlep, setTitlep] = useState("");
  const [subjects, setSubjects] = useState(new Set(""));
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
  const [languageCode, setLanguageCode] = useState(new Set(""));
  const [resource, setResource] = useState("");
  const [curLC, setCurLC] = useState("");
  const [isPending, setIsPending] = useState(false);

  const navigate = useNavigate();
  const { user } = useAuthContext();
  useEffect(() => {
    console.log("SUBJECTS CHANGED");
  }, [subjects, curSubject]);
  const onAddSubjectClick = (e) => {
    e.preventDefault();
    let tempSubjects = subjects;
    tempSubjects.add(curSubject);
    setSubjects(tempSubjects);
    setCurSubject("");
  };
  const onAddLCClick = (e) => {
    e.preventDefault();
    let tempLC = languageCode;
    tempLC.add(curLC);
    setLanguageCode(tempLC);
    setCurLC("");
  };
  const onChangeLCInput = (e) => {
    e.preventDefault();
    setCurLC(e.target.value);
    checkCompletion(e.target.value, allLC, "lc");
  };
  const onChangeSubjectInput = (e) => {
    e.preventDefault();
    setCurSubject(e.target.value);
    checkCompletion(e.target.value, allSubjects, "subject");
  };

  function checkCompletion(val, opts, type) {
    for (var i = 0; i < opts.length; i++) {
      if (opts[i] === val) {
        // An item was selected from the list!
        // yourCallbackHere()
        if (type == "subject") {
          let tempSubjects = subjects;
          tempSubjects.add(val);
          setSubjects(tempSubjects);
        } else if (type == "lc") {
          let tempLC = languageCode;
          tempLC.add(val);
          setLanguageCode(tempLC);
        }
        //setCurSubject("");
        break;
      }
    }
  }
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsPending(true);
    let currentDate: Date = new Date(Date.now());
    let newBookEntry = {
      entryNumber: entryNumber,
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
      instantiatedAt: currentDate,
      subjects: Array.from(subjects),
      missingFields: [],
      keyWords: [],
      titleKeyWords: [],
      authorKeyWords: [],
    };
    postEntry(newBookEntry, user.token).then((v) => {
      setIsPending(false);
      navigate("/");
    });
  };
  return (
    <div className="create">
      <h2>Add a New Entry</h2>
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
          onChange={(e) => onChangeSubjectInput(e)} //setCurSubject(e.target.value)}
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
          onChange={(e) => onChangeLCInput(e)}
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
        <p></p>
        {!isPending && <button>Add Entry</button>}
        {isPending && <button disabled>Adding Entry...</button>}
      </form>
    </div>
  );
};

export default Create;
