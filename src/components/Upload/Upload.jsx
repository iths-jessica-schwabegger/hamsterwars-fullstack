import React, {useState} from "react";
import "./Upload.css";

const Upload = () => {

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [loves, setLoves] = useState("");
    const [food, setFood] = useState("");

    const [nameTouched, setNameTouched] = useState(false);
    const [ageTouched, setAgeTouched] = useState(false);
    const [lovesTouched, setLovesTouched] = useState(false);
    const [foodTouched, setFoodTouched] = useState(false);


    let [nameClass, nameError] = nameTouched ? isValidString(name) : ["", ""];
    let [ageClass, ageError] = ageTouched ? isValidAge(age) : ["", ""];
    let [lovesClass, lovesError] = lovesTouched ? isValidString(loves) : ["", ""];
    let [foodClass, foodError] = foodTouched ? isValidString(food) : ["", ""];

    const stopSubmit = event => {
        event.preventDefault();
    }

    return(
        <section className="upload">
            <h1>Upload your own hamster!</h1>
            <form onSubmit={stopSubmit}>
                <input placeholder="Name" 
                    onChange={e => setName(e.target.value)}
                    onBlur={() => setNameTouched(true)}
                    className={nameClass}></input>
                <section className={nameError ? "error name-error" : "hide"}>{nameError ? nameError : ""}</section>
                <input placeholder="Age" 
                    onChange={e => setAge(e.target.value)}
                    onBlur={() => setAgeTouched(true)}
                    className={ageClass}></input>
                <section className={ageError ? "error age-error" : "hide"}>{ageError ? ageError : ""}</section>
                <input placeholder="Loves to do" 
                    onChange={e => setLoves(e.target.value)}
                    onBlur={() => setLovesTouched(true)}
                    className={lovesClass}></input>
                <section className={lovesError ? "error loves-error" : "hide"}>{lovesError ? lovesError : ""}</section>
                <input placeholder="Favourite food" 
                    onChange={e => setFood(e.target.value)}
                    onBlur={() => setFoodTouched(true)}
                    className={foodClass}></input>
                    <section className={foodError ? "error food-error" : "hide"}>{foodError ? foodError : ""}</section>
                <p>Upload img?</p>
            </form>
            <button>Add hamster</button>
            <p className={name ? "" : "hide"}>{name} will be added to the battle!</p>
        </section>
    )
}

function isValidString(input) {
    if(String(input) !== "") {
        return ["valid", ""];
    }else {
        return ["invalid", "Field is empty. Please write something!"]
    }
}

function isValidAge(age) {
    if(!isNaN(age) && age !== "" && age < 100) {
        return ["valid", ""]
    }else {
        return ["invalid", "Please enter your hamster's age in years."]
    }
}

export default Upload;