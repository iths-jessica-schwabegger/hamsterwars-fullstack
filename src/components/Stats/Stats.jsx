import React, {useState, useEffect} from "react";
import "./Stats.css";
import HamsterCard from "./HamsterCard";

const Stats = () => {

    const [totalGames, setTotalGames] = useState("");

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
            <article className="total-games">
                <p>Total games</p>
                <h2>{totalGames.totalGames}</h2>
            </article>
            <HamsterCard />
        </section>
    )

}

export default Stats;