import React, {useState} from "react";
import { useEffect } from "react";
import "./StartPage.css";
import {Link} from "react-router-dom";


const StartPage = () => {
     
    const [startText, setStartText] = useState("");

    return(
        <section>
            <section className="welcome-section">
                <h1>Welcome to Hamsterwars!</h1>
                <p>Which hamster is the cutest?</p>
            </section>
            <article>
                <Link to="/battle">
                    <button>To the BATTLE!</button>
                </Link>
            </article>
        </section>
    )
}

export default StartPage;