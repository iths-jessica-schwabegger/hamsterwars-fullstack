import React, {useState, useEffect} from "react";

const HamsterCard = () => {

    const [topHamsters, setTopHamsters] = useState([]);
    const [bottomHamsters, setBottomHamsters] = useState([]);


    useEffect(() => {
        async function getTopHamsters() {
                const response = await fetch("/charts/top");
                const topFive = await response.json();
                setTopHamsters(topFive.topHamsters);
        }
        getTopHamsters();

        async function getBottomHamsters() {
                const response = await fetch("/charts/bottom");
                const bottomFive = await response.json();
                setBottomHamsters(bottomFive.bottomHamsters);
        }
        getBottomHamsters();
    }, []);

    return(
        <section className="hamster-cards">
            <article className="top-hamsters">
                <h3>Top 5 hamsters!</h3>
                {topHamsters.map(hamster => (
                    <section>
                        <article>
                            <h5>{hamster.name}</h5>
                            <p>Wins: {hamster.wins}</p>
                        </article>
                        <img src={"/images/" + hamster.imgName} alt="Cute hamster"></img>
                    </section>
                ))}
            </article>
            <article className="bottom-hamsters">
                <h3>Bottom 5 hamsters!</h3>
                {bottomHamsters.map(hamster => (
                    <section>
                        <article>
                            <h5>{hamster.name}</h5>
                            <p>Defeats: {hamster.defeats}</p>
                        </article>
                        <img src={"/images/" + hamster.imgName} alt="Cute hamster"></img>
                    </section>
                ))}
            </article>
        </section>
    )
}

export default HamsterCard;