import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './function_helpers/i18n.ts'
import {AuthContextProvider} from './context/AuthContext.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='236439659202-p9qjso49daj492ok2ehuqscacgijsol1.apps.googleusercontent.com'>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
