import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getHighestEntryNumber, postEntry } from "../function_helpers/sqlFunctions";
import { allLC, allSubjects } from "../function_helpers/handyVariables";
import { useAuthContext } from "../hooks/useAuthContext";
import { useTranslation } from "react-i18next";
import GrayBox from "../screen_helpers/GrayBox";
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
    if(user){
    getHighestEntryNumber(user.token).then((result)=>{
      setEntryNumber(result.data +1)
    }).catch((error)=>{
      console.log(error)
    })
  }
  }, [user]);
  const onAddSubjectClick = (e) => {
    e.preventDefault();
    let tempSubjects = new Set( subjects);
    tempSubjects.add(curSubject);
    setSubjects(tempSubjects);
    setCurSubject("");
  };
  const onLCClose = (e, lc) =>{
    e.preventDefault()
    let tempLC = new Set(languageCode)
    tempLC.delete(lc)
    setLanguageCode(tempLC)

  }
  const onClose = (e, subject) => {
    e.preventDefault()
    let tempSubjects = new Set(subjects);
    tempSubjects.delete(subject)
    setSubjects(tempSubjects)
    //Hacky solution to forcing a reload -- REDO LOW PRIORITY
    

  }
  const onAddLCClick = (e) => {
    e.preventDefault();
    let tempLC = new Set(languageCode);
    tempLC.add(curLC);
    setLanguageCode(tempLC);
    setCurLC("");
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsPending(true);
    const titleAgg = title + titlec + titlep
    const authorAgg = author+authorc+authorp
    const keyword = titleAgg+authorAgg+entryNumber+publication+seriesTitle+Array.from(subjects).toString+Array.from(languageCode).toString()+note+resource;
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
      subjects: Array.from(subjects),
      titleAgg: titleAgg,
      authorAgg: authorAgg,
      keyword: keyword,

    };
    postEntry(newBookEntry, user.token).then((v) => {
      setIsPending(false);
      navigate("/");
    });
  };
  const {t} = useTranslation()
  return (
    <div className="create">
      <h2>{t("Add a New Entry")}</h2>
      <form onSubmit={handleSubmit}>
        <label>{t("entry-number")}:</label>
        <input
          type="text"
          required
          value={entryNumber}
          onChange={(e) => setEntryNumber(e.target.value)}
        ></input>

        <label>{t("isbn")}:</label>
        <input
          type="text"
          value={ISBN}
          onChange={(e) => setISBN(e.target.value)}
        ></input>

        <label>{t("title")}:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <label>{t("title")}(中文):</label>
        <input
          type="text"
          value={titlec}
          onChange={(e) => setTitlec(e.target.value)}
        ></input>
        <label>{t("title")}(Pinyin):</label>
        <input
          type="text"
          value={titlep}
          onChange={(e) => setTitlep(e.target.value)}
        ></input>

        <label>{t("author")}:</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        ></input>
        <label>{t("author")}(中文):</label>
        <input
          type="text"
          value={authorc}
          onChange={(e) => setAuthorc(e.target.value)}
        ></input>
        <label>{t("author")}(Pinyin):</label>
        <input
          type="text"
          value={authorp}
          onChange={(e) => setAuthorp(e.target.value)}
        ></input>
        <label>{t("subjects")}:</label>
        <input
          list="subjects"
          id="subject-choice"
          name="subject-choice"
          value={curSubject}
          onChange={(e) => setCurSubject(e.target.value)} //onChangeSubjectInput(e)
        />
        <datalist id="subjects">
          {allSubjects.map((sub) => (
            <option key={sub} value={sub}></option>
          ))}
        </datalist>
        <div className="subject-list">
          {Array.from(subjects).map((subject) => (
            GrayBox({ text: subject, onClose: (e) => onClose(e, subject) })
          ))}
        </div>
        <button onClick={(e) => onAddSubjectClick(e)}>{t("add-subject")}</button>

        <label>{t("publication")}:</label>
        <input
          type="text"
          value={publication}
          onChange={(e) => setPublication(e.target.value)}
        ></input>

        <label>{t("page-count")}:</label>
        <input
          type="text"
          value={pageCount}
          onChange={(e) => setPageCount(e.target.value)}
        ></input>

        <label>{t("series-title")}:</label>
        <input
          type="text"
          value={seriesTitle}
          onChange={(e) => setSeriesTitle(e.target.value)}
        ></input>

        <label>{t("resource")}:</label>
        <input
          type="text"
          value={resource}
          onChange={(e) => setResource(e.target.value)}
        ></input>

        <label>{t("note")}:</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
        ></textarea>

        <label>{t("language-codes")}:</label>
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
            GrayBox({ text: lc, onClose: (e) => onLCClose(e, lc) })
          ))}
        </div>
        <button onClick={(e)=>onAddLCClick(e)}>{t("add-language-code")}</button>
        <p></p>
        {!isPending && <button>{t("add-entry")}</button>}
        {isPending && <button disabled>{t("adding-entry")}...</button>}
      </form>
    </div>
  );
};

export default Create;
