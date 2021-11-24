import React from 'react';
import { GoogleLogout } from 'react-google-login';
require('dotenv').config();

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function Logout() {
    const onSuccess = () => {
        console.log(`[Logged out of Google successfully!]`);
    };

    return (
        <div>
            <GoogleLogout
            clientId = {clientId}
            buttonText="Logout"
            onLogoutSuccess={onSuccess}
            ></GoogleLogout>       
        </div>
    );
}
export default Logout;

