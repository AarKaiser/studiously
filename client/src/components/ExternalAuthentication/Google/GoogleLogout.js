import React from 'react';
import { GoogleLogout } from 'react-google-login';


const googleClientId = process.env.googleClientId;

function Logout() {
    const onSuccess = () => {
        console.log(`[Logged out of Google successfully!]`);
    };

    return (
        <div>
            <GoogleLogout
            clientId = {googleClientId}
            buttonText="Logout"
            onLogoutSuccess={onSuccess}
            ></GoogleLogout>       
        </div>
    );
}
export default Logout;

