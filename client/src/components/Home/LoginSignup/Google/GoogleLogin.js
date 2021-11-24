import React from 'react';
import { GoogleLogin } from 'react-google-login';
require('dotenv').config();

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function Login() {
    const onSuccess = (res) => {
        console.log(`[Google Login Success] currentUser:`, res.profileObj);
    };
    const onFailure = (res) => {
        console.log(`[Google Login Failed] res`, res);
    };

    return <div>
        <GoogleLogin
        clientID={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={`single_host_origin`}
        style={{ marginTop: '100px'}}
        isSignedIn={true}
        
        />
    </div>    
 }

 export default Login;