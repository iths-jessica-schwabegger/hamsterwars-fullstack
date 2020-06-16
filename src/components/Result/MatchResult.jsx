import React from "react";
import "./MatchResult.css";


const MatchResult = (props) => {

    const winner = props.winner;

    return(
        <section className="match-result">
            <h3>And the winner is..</h3>
            <article>
                <img src={"/images/" + winner.imgName} alt=""></img>
                <ul>
                    <li key={winner.id + winner.name}>Name: {winner.name}</li>
                    <li key={winner.id + winner.age}>Age: {winner.age}</li>
                </ul>
            </article>
        </section>
    ) 
}

export default MatchResult;