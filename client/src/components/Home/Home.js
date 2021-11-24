import React from "react"
import './Home.css'
import Navbar from "./Navbar/Navbar";
import LoginSignup from "./LoginSignup/LoginSignup";

export default function Home(props) {
    return (
        <div className='home-container'>
            <Navbar />
            <p>*********************************</p>

            
            <h2>Home Works!</h2>

            <p>*********************************</p>
            <h3>Test Environment for Logins</h3>
            <LoginSignup />
            <p>*********************************</p>
        </div>
    )}