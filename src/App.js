import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch, NavLink} from "react-router-dom";
import StartPage from "./components/StartPage/StartPage";
import Battle from "./components/Battle/Battle";
import Stats from "./components/Stats/Stats";
import Upload from "./components/Upload/Upload";
import styled from "styled-components";

const StyledSection = styled.section`
width: 100%;
height: 10rem;
background-image: linear-gradient(rgb(35, 35, 49), rgb(35, 35, 49));
transform: skewY(5deg);
transform-origin: bottom left;
`




function App() {
  return (

    <Router>
      <Switch>
        <Route path="/">
          <header className="app-header">
            <nav>
              <NavLink to="/" activeClassName="active"> Start </NavLink>
              <NavLink to="/battle" activeClassName="active"> Battle </NavLink>
              <NavLink to="/stats" activeClassName="active"> Stats </NavLink>
              <NavLink to="/upload" activeClassName="active"> Upload new hamster </NavLink>
            </nav>
          </header>
        </Route>
      </Switch>

      <main>
        
        <Switch>
            <Route path="/battle"><Battle /></Route>
            <Route path="/stats"><Stats /></Route>
            <Route path="/upload"><Upload /></Route>
            <Route path="/"><StartPage /></Route>
        </Switch>
        <StyledSection></StyledSection>
      </main>
      <footer></footer>
    </Router>
 
  );
}

export default App;
