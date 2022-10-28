import React from 'react';
import { NavLink } from "react-router-dom";
import style from "../styleSheets/Landing.module.css"


const LandingPage = () => {
    return(
        <div className={style.background}>

            {/* <div className={style.divimages}>
            <img src='https://images.unsplash.com/photo-1625805866852-b2ab3e740530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' alt='LandingPageImage'/>
                <img src='https://images.unsplash.com/photo-1625805866852-b2ab3e740530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' alt='LandingPageImage'/>
                <img src="https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1467&q=80" alt="LandingPageImage"/>
                <img src='https://images.unsplash.com/photo-1625805866852-b2ab3e740530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' alt='LandingPageImage'/>
                <img src='https://images.unsplash.com/photo-1535223289827-42f1e9919769?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' alt='LandingPageImage'/>
            </div> */}

            <br/><br/><br/>

            <img className={style.image} src='./videogame.png' alt="landingImage"/>


            <div className={style.divText}>
                <h1 className={style.text}>Discover the fantasy world, create your own game & find all the alternativies for having fun!!!</h1>
            </div>


            <button className={style.button}><NavLink className={style.link} to={"/home"}>Let's Play!</NavLink></button>
            <br/><br/><br/>
        </div>
    )
}

export default LandingPage;