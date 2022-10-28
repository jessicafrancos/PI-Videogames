import './App.css';
import React from 'react';
import NavBar from './components/NavBar';
import { Route } from 'react-router-dom';
import Home from './components/Home.jsx';
import CreateVideoGames from './components/CreateV.jsx';
import LandingPage from './components/Landing.jsx';
import Detail from './components/Detail.jsx';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Route exact path={"/"} render={() => <LandingPage/>}/>
      <Route path={"/home"} render={() => <Home/>}/>
      <Route path={"/videogames/:id"} render={(props) => <Detail props={props}/>}/>
      <Route path={"/create"} render={() => <CreateVideoGames/>}/>
    </div>
  );
}

export default App;
