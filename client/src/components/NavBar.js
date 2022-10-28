import React from "react";
import { NavLink } from "react-router-dom";
import style from "../styleSheets/NavBar.module.css";
import Search from "./Search";

const NavBar = () => {
  return(
    <div className={style.container}>

      <nav className={style.navBar}>
        <div className={style.home}>
          <p className={style.pHome}>
            <NavLink className={style.font} to={"/home"}>
              
              <img className={style.homeImage} src="./cooltext.png" alt="HomeImage"/>
            </NavLink>
          </p>
         </div>

         <div className={style.div}>
         
          <NavLink className={style.font} to={"/"}>
            Landing Page
          </NavLink>
         

         
            <NavLink className={style.font} to={"/create"}>
              Create Videogame
            </NavLink>
         

          <div className={style.search}><Search/></div>
        </div>

      </nav>

      {/* <div className={style.language}> ENG/SPA</div> */}
      
    </div>
  )
}

export default NavBar;