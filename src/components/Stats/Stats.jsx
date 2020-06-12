import React, {useState, useEffect} from "react";
import "./Stats.css";
import HamsterCard from "./HamsterCard";

const Stats = () => {

    const [totalGames, setTotalGames] = useState("");
    //top 5, bottom 5 hamstrar

    useEffect(() => {
        async function getTotalGames() {
            const response = await fetch("/stats/total");
            const games = await response.json();
            setTotalGames(games);
        }
        getTotalGames();
    }, []);

    return(
        <section className="stats">
            <h1>Stats will appear here</h1>
            <article>
                <p>Total games played: {totalGames.totalGames}</p>
            </article>
            <HamsterCard />
        </section>
    )

}

export default Stats;