import React, {useState, useEffect} from "react";



const MatchUp = ({ match }) => {

    const [allGames, setAllGames] = useState([]);
    const [game, setGame] = useState("");
    const [winnerId, setWinnerId] = useState("");
    const [contestants, setContestants] = useState([]);
    const [winningHamster, setWinningHamster] = useState("");
    const [loosingHamster, setLoosingHamster] = useState("");

    const id1 = match.params.id1;
    const id2 = match.params.id2;

    useEffect(() => {

        if(match) {

            async function getGames() {
                let response = await fetch(`/games`);
                const games = await response.json();
                setAllGames(games.games)
            }
            getGames();

        }
        
    }, []);

    //Filtrera fram matcher där id-nr på match-deltagare är samma som id-nr i url.
    const searchGame = allGames.filter(game => {
        return game.contestants.id1 == id1 && game.contestants.id2 == id2 || game.contestants.id1 == id2 && game.contestants.id2 == id1;
    })
    
    // setGame(searchGame);

    console.log(searchGame);
    console.log(game);
  
    useEffect(() => {
        if(searchGame.length == 0) {
            console.log("That battle does not exist!")
        }else {
            setWinnerId(searchGame[0].winner.id);

            console.log(winnerId);

            async function getContestants() {

                const hamsterOne = await getHamsterById(match.params.id1);
                const hamsterTwo = await getHamsterById(match.params.id2);

                console.log(hamsterOne);
                console.log(hamsterTwo)

                // setContestants([hamsterOne, hamsterTwo]);
                // console.log(contestants);

                // if(hamsterOne.hamster.id === winnerId) {
                //     setWinningHamster(hamsterOne);
                //     setLoosingHamster(hamsterTwo);
                // }else {
                //     setWinningHamster(hamsterTwo); 
                //     setLoosingHamster(hamsterOne);
                // }
            }
            getContestants();

        }
    }, []);

    //console.log(contestants);
    console.log(winningHamster);
    console.log(loosingHamster);

    return (
        <section className="matchup">
            <p>{winnerId}</p>
        </section>
    )

}

async function getHamsterById(id) {
    let response = await fetch(`/hamsters/${id}`);
    const hamster = await response.json();
    console.log(hamster);
    return hamster
}

export default MatchUp;


//Hitta games enligt id i url
//jämför Id med hamster id för att få fram hamsterobj
//spara hamsterobj, jämför med winning-id i games-obj.