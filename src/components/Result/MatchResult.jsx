import React, {useState} from "react";
import "./MatchResult.css";


const MatchResult = (props) => {

    console.log(props.winner);
    return(
        <section className="match-result">
            <article>
                <h3>And the winner is..</h3>
                <ul>
                    <li>Name: {props.winner.name}</li>
                    <li>Age: {props.winner.age}</li>
                </ul>
            </article>
        </section>
    ) 
}

export default MatchResult;