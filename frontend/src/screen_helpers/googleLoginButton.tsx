/*
clientId
: 
"236439659202-p9qjso49daj492ok2ehuqscacgijsol1.apps.googleusercontent.com"
credential
: 
"eyJhbGciOiJSUzI1NiIsImtpZCI6IjY3NGRiYmE4ZmFlZTY5YWNhZTFiYzFiZTE5MDQ1MzY3OGY0NzI4MDMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIyMzY0Mzk2NTkyMDItcDlxanNvNDlkYWo0OTJvazJlaHVxc2NhY2dpanNvbDEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIyMzY0Mzk2NTkyMDItcDlxanNvNDlkYWo0OTJvazJlaHVxc2NhY2dpanNvbDEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDY2ODQ5MTMxNzIwNzczMjY1MzUiLCJlbWFpbCI6Im5pY2hvbGFzZGVudG9uY2hlbmdAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5iZiI6MTcxNzYxMTcxMSwibmFtZSI6Ik5pY2hvbGFzIERlbnRvbi1DaGVuZyIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NMRkNFdW4wOXduemFOVkNUYk4wcFhwN0xHaVNmeVRsYmNsbEM1SnRHUlJDTE5HWVE9czk2LWMiLCJnaXZlbl9uYW1lIjoiTmljaG9sYXMiLCJmYW1pbHlfbmFtZSI6IkRlbnRvbi1DaGVuZyIsImlhdCI6MTcxNzYxMjAxMSwiZXhwIjoxNzE3NjE1NjExLCJqdGkiOiIzZTEyZjkwNTk1MWZmNmE2NDYyMjBkNzc4MDk1MzFhYTBhMzc1ZGE1In0.T6N_oAQq8eh9C2PweJUeFGR6iNWl18089UKsO-Viz5SylNF1NpAnwixtmKP9H9gakaqKDByWL8PHTc_JN24Vn-6lvnU2mGiPdZf5feURL49MUTdjwdHt69vbidUzIx2MUHMNprMt50KojqEQBKmPf_s4feXAhzmZhO5tg_-hstLneptcprN_1KGf8Eee6dvX1oZqPVDeWb1Otglj_YfL-zTi4RvoujxBDndPmAgDg8OylUE5pQTmCV6Mdl4pFUHCGgyBkWsJmbtC9bZCYlYrTLDg4IoafcgWuK6L1ZBecvSij2NvTG5SAvB7-BtyVfLoJezV-1YL4t48ynWOyQH43g"
select_by
: 
"btn"
*/
import axios from 'axios';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { getGoogleTokens } from '../function_helpers/sqlFunctions';

function GoogleLoginButton() {
    const [user, setUser] = useState(null)
    const [profile, setProfile] = useState(null)
    useEffect(
        () => {
            if (user) {
         
            }
        },
        [ user ]
    );
    const handleSubmit = async (response) => {
        console.log(JSON.stringify(response));
        getGoogleTokens(JSON.stringify(response))
    };
    const errorMessage = () => {
        console.log("GONE WRONG");
    };
    const googleLogin = useGoogleLogin({
        onSuccess: async ({ code }) => {
            console.log("CODE")
            console.log(code)
          const tokens = await getGoogleTokens(code)
            console.log("TOKENS")
          console.log(tokens);
        },
        onError: ()=>{console.log("ERROR")},

        flow: 'auth-code',
      });
    
      
    return (
        <div className='googleLoginButton'>
            <button onClick={(e)=>{e. preventDefault();googleLogin}}>useGoogleLogin</button>
            <GoogleLogin onSuccess={handleSubmit} onError={errorMessage} />
        </div>
    )
}
export default GoogleLoginButton;