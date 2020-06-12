import React, {useState, useEffect} from "react";
import "./Battle.css";
// import firebase from "firebase/app";


const Battle = () => {

    const [hamsterOne, setHamsterOne] = useState("");
    const [hamsterTwo, setHamsterTwo] = useState("");

    useEffect(() => {
        
        //lägg bilder i mappen istället?
        async function getRandomHamster() {
            let response = await fetch("/hamsters/random");
            const randomHamsterOne = await response.json();
            console.log(randomHamsterOne);

            response = await fetch("/hamsters/random");
            const randomHamsterTwo = await response.json();
            console.log(randomHamsterTwo.name);

            setHamsterOne(randomHamsterOne)
            setHamsterTwo(randomHamsterTwo);
        }

        getRandomHamster();

    }, [])

    return(
        <section className="battle">
            <h1>Which hamster is the winner?</h1>
            <section>
                <article>
                    <img src={"/images/" + hamsterOne.imgName} alt="Cute hamster"/>
                    <p>{hamsterOne.name}</p>
                </article>
                <article>
                    <img src={"/images/" + hamsterTwo.imgName} alt="Cute hamster"/>
                    <p>{hamsterTwo.name}</p>
                </article>
            </section>
            <p>Click the cutest hamster!</p>
        </section>
    )
}

export default Battle;