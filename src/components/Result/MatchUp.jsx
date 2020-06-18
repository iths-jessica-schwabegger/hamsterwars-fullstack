import React, {useState, useEffect} from "react";
import "../../App.css";



const MatchUp = ({ match }) => {

    const [game, setGame] = useState([]);
    const [winnerId, setWinnerId] = useState("");
    const [hamsterOne, setHamsterOne] = useState("");
    const [hamsterTwo, setHamsterTwo] = useState("");

    const id1 = match.params.id1;
    const id2 = match.params.id2;

    useEffect(() => {

            async function getGames() {
                let response = await fetch(`/games`);
                const games = await response.json();

                const searchGame = games.games.filter(game => {
                    return game.contestants.id1 == id1 && game.contestants.id2 == id2 || game.contestants.id1 == id2 && game.contestants.id2 == id1;
                })

                setGame(searchGame);
                setWinnerId(searchGame[0].winner.id);
            }
            getGames();
        
    }, []);
  
    useEffect(() => {
        if(game.length == 0) {
            console.log("That battle does not exist!")
        }else {
            console.log("Match found")

            async function getContestants() {

                const hamsterOne = await getHamsterById(match.params.id1);
                const hamsterTwo = await getHamsterById(match.params.id2);

                setHamsterOne(hamsterOne.hamster);
                setHamsterTwo(hamsterTwo.hamster);

         }
            getContestants();
        }
    }, [game]);

    return (
        <section className="matchup">
            <h1>Previous match results</h1>
            <section>
                <article>
                    <img src={"/images/" + (hamsterOne.id === winnerId ? hamsterOne.imgName : hamsterTwo.imgName)} alt="Cute hamster" />
                    <p>{hamsterOne.id === winnerId ? hamsterOne.name : hamsterTwo.name}</p>

                    <h5>About {hamsterOne.id === winnerId ? hamsterOne.name : hamsterTwo.name}</h5>
                    <ul key={hamsterOne.id}>
                        <li>Age: {hamsterOne.id === winnerId ? hamsterOne.age : hamsterTwo.age}</li>
                        <li>Loves to {hamsterOne.id === winnerId ? hamsterOne.loves : hamsterTwo.loves}</li>
                        <li>Favourite food: {hamsterOne.id === winnerId ? hamsterOne.favFood : hamsterTwo.favFood}</li>
                    </ul>
                </article>
                    <h3>DEFEATS</h3>
                <article>
                    <img src={"/images/" + (hamsterOne.id === winnerId ? hamsterTwo.imgName : hamsterOne.imgName)} alt="Cute hamster" />
                    <p>{hamsterOne.id === winnerId ? hamsterTwo.name : hamsterOne.name}</p>

                    <h5>About {hamsterOne.id === winnerId ? hamsterTwo.name : hamsterOne.name}</h5>
                    <ul key={hamsterTwo.id}>
                        <li>Age: {hamsterOne.id === winnerId ? hamsterTwo.age : hamsterTwo.One}</li>
                        <li>Loves to {hamsterOne.id === winnerId ? hamsterTwo.loves : hamsterOne.loves}</li>
                        <li>Favourite food: {hamsterOne.id === winnerId ? hamsterTwo.favFood : hamsterOne.favFood}</li>
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
