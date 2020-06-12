import React, {useState, useEffect} from "react";
import "./Battle.css";
import MatchResult from "../Result/MatchResult";



const Battle = () => {

    const [hamsterOne, setHamsterOne] = useState("");
    const [hamsterTwo, setHamsterTwo] = useState("");
    const [newGame, setNewGame] = useState(false);
    const [winner, setWinner] = useState("");
    const [generateNewHamsters, setGenerateNewHamsters] = useState(false);

    useEffect(() => {

        async function getRandomHamster() {
            let response = await fetch("/hamsters/random");
            const randomHamsterOne = await response.json();

            response = await fetch("/hamsters/random");
            const randomHamsterTwo = await response.json();

            //Ej testat om denna fungerar
            if(randomHamsterOne !== randomHamsterTwo) {
                setHamsterOne(randomHamsterOne)
                setHamsterTwo(randomHamsterTwo);
            }else {
                console.log("FOUND SAME!")
                generateNewHamsters ? setGenerateNewHamsters(false) : setGenerateNewHamsters(true);
            }
        }

        getRandomHamster();

    }, [newGame, generateNewHamsters])

    function handleClick(winner, looser) {
        console.log(winner.id);
        console.log(looser.id);
        setWinner(winner);
        newGame ? setNewGame(false) : setNewGame(true);
        updateWinner(winner.id);
        updateLooser(looser.id);
    }

    return(
        <section className="battle">
            <h1>Which hamster is the cutest?</h1>
            <p>Click to choose!</p>
            <section>
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

export default Battle;