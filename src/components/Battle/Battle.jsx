import React, {useState, useEffect} from "react";
import "./Battle.css";
import MatchResult from "../Result/MatchResult";



const Battle = ({ match }) => {

    const [hamsterOne, setHamsterOne] = useState("");
    const [hamsterTwo, setHamsterTwo] = useState("");
    const [newGame, setNewGame] = useState(false);
    const [winner, setWinner] = useState("");

    useEffect(() => {

        if(match) {

            async function getHamsterById() {
                    let response = await fetch(`/hamsters/${match.params.id1}`);
                    const hamsterOne = await response.json();
                    console.log(hamsterOne);

                    response = await fetch(`/hamsters/${match.params.id2}`);
                    const hamsterTwo = await response.json();
                    console.log(hamsterTwo)

                    setHamsterOne(hamsterOne.hamster);
                    setHamsterTwo(hamsterTwo.hamster);
            }
            getHamsterById();
        }else {

            async function getRandomHamster() {
                let response = await fetch("/hamsters/random");
                const randomHamsterOne = await response.json();

                response = await fetch("/hamsters/random");
                const randomHamsterTwo = await response.json();

                if(randomHamsterOne.id === randomHamsterTwo.id) {
                    console.log("FOUND SAME!")
                    newGame ? setNewGame(false) : setNewGame(true);

                }else {
                    setHamsterOne(randomHamsterOne)
                    setHamsterTwo(randomHamsterTwo);
                }
            }
            getRandomHamster();
        }

    }, [newGame])

    const handleClick = async (winner, looser) => {
        console.log(winner.id);
        console.log(looser.id);
        setWinner(winner);
        newGame ? setNewGame(false) : setNewGame(true);
        await updateWinner(winner.id);
        await updateLooser(looser.id);
        await updateGames(winner.id, looser.id);
    }

    return(
        <section className="battle">
            <h1>Which hamster is the cutest?</h1>
            <p>Click to choose!</p>
            <section className="battle-images">
                <article>
                        <img src={"/images/" + hamsterOne.imgName} alt="Cute hamster"
                            onClick={() => handleClick(hamsterOne, hamsterTwo)}/>
                    <p>{hamsterOne.name}</p>
                </article>
                <article>
                        <img src={"/images/" + hamsterTwo.imgName} alt="Cute hamster"
                            onClick={() => handleClick(hamsterTwo, hamsterOne)}/>
                    <p>{hamsterTwo.name}</p>
                </article>
            </section>
            
            {winner !== "" ? <MatchResult winner={winner}/> : ""}
        </section>
        
    )
}


function updateWinner(id) {
    
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "superSecretKey");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({"wins":1,"defeats":0});

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`/hamsters/${id}/results`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));


    }

    function updateLooser(id) {
        
            const myHeaders = new Headers();
            myHeaders.append("Authorization", "superSecretKey");
            myHeaders.append("Content-Type", "application/json");
        
            var raw = JSON.stringify({"wins":0,"defeats":1});
        
            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(`/hamsters/${id}/results`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

    }

    function updateGames(winner, looser) {

            var myHeaders = new Headers();
            myHeaders.append("Authorization", "superSecretKey");
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({"contestants":{"id1": winner,"id2": looser}, "winner":{"id": winner}});

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };

            fetch("/games", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

    }

export default Battle;