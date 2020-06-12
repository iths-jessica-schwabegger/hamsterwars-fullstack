import React, {useState, useEffect} from "react";

const HamsterCard = () => {

    const [topHamsters, setTopHamsters] = useState("");
    const [bottomHamsters, setBottomHamsters] = useState("");


    useEffect(() => {
        async function getTopHamsters() {
            const response = await fetch("/charts/top");
            const topFive = await response.json();
            console.log(topFive.topHamsters);
            setTopHamsters(topFive.topHamsters);
        }
        getTopHamsters();

        async function getBottomHamsters() {
            const response = await fetch("/charts/top");
            const bottomFive = await response.json();
            setBottomHamsters(bottomFive.topHamsters);
        }
        getBottomHamsters();
    }, [])
    console.log(topHamsters);
    return(
        <section className="hamster-card">
            {/* <article>
                {topHamsters.map(hamster => (
                    <ul>
                        <li>{hamster.name}</li>
                        <li>{hamster.wins}</li>
                    </ul>
                ))}
            </article>
            <article>
                {bottomHamsters.map(hamster => (
                        <ul>
                            <li>{hamster.name}</li>
                            <li>{hamster.wins}</li>
                        </ul>
                ))}
            </article> */}
        </section>
    )
}

export default HamsterCard;