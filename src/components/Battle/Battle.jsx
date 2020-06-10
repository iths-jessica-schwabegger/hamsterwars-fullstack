import React, {useState, useEffect} from "react";
import "./Battle.css";
import mountainImage from "./mountainImage.jpg";


const Battle = () => {

const [hamster, setHamster] = useState(null);

        // let randomHamster = getRandomHamster();
        // console.log(randomHamster.name);
        // setHamster(randomHamster);


    return(
        <section className="battle">
            <h1>Which hamster is the winner?</h1>
            <section>
                <img src={mountainImage} alt=""/>
                <img src={mountainImage} alt=""/>
            </section>
            {/* <p>{data.name}</p> */}
        </section>
    )
}


async function getRandomHamster() {
    let baseUrl = "/api";

    try{
        const response = await fetch(baseUrl + "/hamsters/random");
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export default Battle;