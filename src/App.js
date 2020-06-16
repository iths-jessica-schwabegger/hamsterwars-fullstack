import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch, NavLink, Link} from "react-router-dom";
import StartPage from "./components/StartPage/StartPage";
import Battle from "./components/Battle/Battle";
import Stats from "./components/Stats/Stats";
import Upload from "./components/Upload/Upload";
import MatchResult from "./components/Result/MatchResult";
import MatchUp from "./components/Result/MatchUp";
import styled from "styled-components";

const StyledFooter = styled.footer`
position: fixed;
bottom: 0;
height: 8rem;
width: 100%;
background-image: linear-gradient(#6B7A8F, #6B7A8F);
transform: skewY(5deg);
transform-origin: bottom left;
`;

const StyledButton = styled.button`
  font-size: 0.7rem;
  padding: 0.5rem 1rem;
  align-self: flex-start;
  margin: 1rem auto 0 1rem;
  background-color: #6B7A8F;
`

function App() {
  return (

    <Router>
      <Switch>
        <Route path="/">
          <header className="app-header">
            {/* <StyledButton>
              <Link to="/matchup">Search old game</Link>
            </StyledButton> */}
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
            <Route path="/battle/:id1/:id2" component={Battle}/>
            <Route path="/battle"><Battle /></Route>
            <Route path="/stats"><Stats /></Route>
            <Route path="/upload"><Upload /></Route>
            <Route path="/matchresult"><MatchResult /></Route>
            <Route path="/matchup/:id1/:id2" component={MatchUp}/>
            <Route path="/"><StartPage /></Route>
        </Switch>
      </main>
      <StyledFooter></StyledFooter>
      </Router>
 
  );
}

export default App;
