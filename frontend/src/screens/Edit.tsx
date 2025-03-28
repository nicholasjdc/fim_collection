import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BookEntry } from "../screen_helpers/BookEntry";
import { deleteEntry, getEntry, patchEntry, postEntry } from "../function_helpers/sqlFunctions";
import { API_URL, allLC, allSubjects } from "../function_helpers/handyVariables";
import { useAuthContext } from "../hooks/useAuthContext";
import GrayBox from "../screen_helpers/GrayBox";
import { useTranslation } from "react-i18next";
const Edit = () => {
  const { id } = useParams(); //Grab route parameters from current route
  const {t} = useTranslation();

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
        getEntry(id, user.accessToken, user.refreshToken).then((e:BookEntry)=>{
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

  
    }
  const navigate = useNavigate();
  const onAddLCClick = (e) => {
    e.preventDefault();
    let tempLC = new Set(languageCode);
    tempLC.add(curLC);
    setLanguageCode(tempLC);
    setCurLC("");
  };
  const onAddSubjectClick = (e) => {
    e.preventDefault();
    let tempSubjects = new Set(subjects);
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
    patchEntry(API_URL +'film-entries/' +id, newBookEntry, user.accessToken, user.refreshToken).then((v) => {
      setIsPending(false);
      navigate("/");
    });
  };
  return (
    <div className="create">
      <h2>{t("edit-entry")}: {entryNumber}</h2>
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
        {!isPending && <button>{t("update")}</button>}
        {isPending && <button disabled>{t("updating-entry")}...</button>}
      </form>
    </div>
  );
};

export default Edit;
