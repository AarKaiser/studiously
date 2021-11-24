import FacebookLogin from "./Facebook/FacebookLogin";
import GoogleLogin from "./Google/GoogleLogin";
import GoogleLogout from "./Google/GoogleLogout";

export default function Home(props) {
    return (
        <div className='home-container'>
            <p>Signin & Signup Test Environment</p>
            <p>Facebook Login</p>
            <FacebookLogin />
            <p>Google Login</p>
            <GoogleLogin />
            <p>Google Logout</p>
            <GoogleLoglout />
        </div>
    )}