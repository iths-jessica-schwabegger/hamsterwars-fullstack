import React, {useState} from "react";
import "./MatchResult.css";


const MatchResult = (props) => {

    const winner = props.winner;

    return(
        <section className="match-result">
            <article>
                <h3>And the winner is..</h3>
                <ul>
                    <li>Name: {winner.name}</li>
                    <li>Age: {winner.age}</li>
                </ul>
                {/* <img src={"/images/" + winner.imgName} alt=""></img> */}
            </article>
        </section>
    ) 
}

export default MatchResult;