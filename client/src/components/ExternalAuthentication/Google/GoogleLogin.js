import React from 'react';
import { GoogleLogin } from 'react-google-login';

const googleClientId = process.env.googleClientId;

function Login() {
    const onSuccess = (res) => {
        console.log(`[Google Login Success] currentUser:`, res.profileObj);
    };
    const onFailure = (res) => {
        console.log(`[Google Login Failed] res`, res);
    };

    return <div>
        <GoogleLogin
        clientID={googleClientId}
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