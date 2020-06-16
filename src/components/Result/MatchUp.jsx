import React, {useState, useEffect} from "react";



const MatchUp = ({ match }) => {

    const [games, setGames] = useState([]);
    const [gameStatus, setGameStatus] = useState(null);
    const [winner, setWinner] = useState("");

    const id1 = match.params.id1;
    const id2 = match.params.id2;

    useEffect(() => {

        if(match) {

            async function getGames() {
                let response = await fetch(`/games`);
                const games = await response.json();
                setGames(games.games)
            }
            getGames();

        }
        
    }, []);

    //Filtrera fram matcher där id-nr på match-deltagare är samma som id-nr i url.
    const contestants = games.filter(game => {
        return game.contestants.id1 == id1 && game.contestants.id2 == id2 || game.contestants.id1 == id2 && game.contestants.id2 == id1;
    })
  
    useEffect(() => {
        if(contestants.length == 0) {
            console.log("That battle does not exist!")
        }else {
            setWinner(contestants[0].winner.id);

            console.log(winner);

            async function getContestants() {
                let response = await fetch(`/hamsters/${match.params.id1}`);
                const hamsterOne = await response.json();
                console.log(hamsterOne);

                response = await fetch(`/hamsters/${match.params.id2}`);
                const hamsterTwo = await response.json();
                console.log(hamsterTwo)
            }
            getContestants();
        }
    }, []);


    return (
        <section className="matchup">
            <p>{}</p>
        </section>
    )

}

export default MatchUp;