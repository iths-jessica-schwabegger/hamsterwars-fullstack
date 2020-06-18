import React, {useState, useEffect} from "react";
import "../../App.css";



const MatchUp = ({ match }) => {

    const [game, setGame] = useState([]);
    const [winnerId, setWinnerId] = useState("");
    const [hamsterOne, setHamsterOne] = useState("");
    const [hamsterTwo, setHamsterTwo] = useState("");
    const [winningHamster, setWinningHamster] = useState("");
    const [loosingHamster, setLoosingHamster] = useState("");


    const id1 = match.params.id1;
    const id2 = match.params.id2;

    useEffect(() => {

            async function getGames() {
                let response = await fetch(`/games`);
                const games = await response.json();
                console.log(games);
                const searchGame = games.games.filter(game => {
                    return game.contestants.id1 == id1 && game.contestants.id2 == id2 || game.contestants.id1 == id2 && game.contestants.id2 == id1;
                })

                setGame(searchGame);
            }
            getGames();
        
    }, []);

  
    useEffect(() => {
        if(game.length == 0) {
            console.log("That battle does not exist!")
        }else {
            console.log("Match found")
            setWinnerId(game[0].winner.id);

            async function getContestants() {

                const hamsterOne = await getHamsterById(match.params.id1);
                const hamsterTwo = await getHamsterById(match.params.id2);

                // setHamsterOne(hamsterOne.hamster);
                // setHamsterTwo(hamsterTwo.hamster);

            //Blir fel, hann inte fixa klart
            if(hamsterOne.hamster.id === winnerId) {
                setWinningHamster(hamsterOne.hamster);
                setLoosingHamster(hamsterTwo.hamster);
            }else{
                setWinningHamster(hamsterTwo.hamster); 
                setLoosingHamster(hamsterOne.hamster);
            }

            }
            getContestants();
        }
    }, [game]);

    return (
        <section className="matchup">
            <h1>Previous match results</h1>
            <section>
                <article>
                    <img src={"/images/" + winningHamster.imgName} alt="Cute hamster" />
                    <p>{winningHamster.name}</p>

                    <h5>About {winningHamster.name}</h5>
                    <ul key={winningHamster.id}>
                        <li>Age: {winningHamster.age}</li>
                        <li>Loves to {winningHamster.loves}</li>
                        <li>Favourite food: {winningHamster.favFood}</li>
                    </ul>
                </article>
                    <h3>DEFEATS</h3>
                <article>
                    <img src={"/images/" + loosingHamster.imgName} alt="Cute hamster" />
                    <p>{loosingHamster.name}</p>

                    <h5>About {loosingHamster.name}</h5>
                    <ul key={loosingHamster.id}>
                        <li>Age: {loosingHamster.age}</li>
                        <li>Loves to {loosingHamster.loves}</li>
                        <li>Favourite food: {loosingHamster.favFood}</li>
                    </ul>
                </article>
            </section>
        </section>
    )

}

async function getHamsterById(id) {
    let response = await fetch(`/hamsters/${id}`);
    const hamster = await response.json();
    return hamster
}

export default MatchUp;
