import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch, NavLink} from "react-router-dom";
import StartPage from "./components/StartPage/StartPage";
import Battle from "./components/Battle/Battle";
import Stats from "./components/Stats/Stats";
import Upload from "./components/Upload/Upload";
import MatchResult from "./components/Result/MatchResult";
import styled from "styled-components";

const StyledFooter = styled.footer`
position: fixed;
bottom: 0;
height: 8rem;
width: 100%;
background-image: linear-gradient(#6B7A8F, #6B7A8F);
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
            <Route path="/matchresult"><MatchResult /></Route>
            <Route path="/"><StartPage /></Route>
        </Switch>
      </main>
      <StyledFooter></StyledFooter>
      </Router>
 
  );
}

export default App;
