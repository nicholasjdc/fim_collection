import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BookEntry } from "./BookEntry"
import './App.css'
import {addEntryJSON, getEntry } from './firebase'
function App() {
  const [count, setCount] = useState(0);
  const a = "a";
  const date = new Date(Date.now());
  let testBookEntry:BookEntry = new BookEntry(a,a,a,a,a,a,a,a,a,a,date)
  let entryJSON:Object = testBookEntry.toJSONBE();
  addEntryJSON(entryJSON, testBookEntry.ISBN);
  getEntry(testBookEntry.ISBN);
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
