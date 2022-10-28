import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import style from "../styleSheets/Card.module.css"


const Card = (props) => {
    return (
        <div
            key={props.key}
            className={style.card}>
            <button className={style.close} onClick={props.onClose}>x</button>
            <br />
            <img src={props.image} alt={props.name} className={style.images} />
            <NavLink style={{
                textDecoration: 'none',
                textDecorationColor: "black",
                color: 'black'
            }} to={`/videogames/${props.id}`}><h3 className={style.name}>{props.name}</h3></NavLink>

            <div className={style.info}>
                <p className={style.rating}>Rating ☆ {props.rating} </p>
            </div>
            <br />
            <p className={style.pGenre}>Genres</p>
            <p className={style.p}> {props.genre.length ? props.genre.map((g, index) => <span key={index}> {g} </span>) : "genres for this game are not registed"}</p>

            <NavLink to={`/videogames/${props.id}`}><button className={style.button}>Check this videogame</button></NavLink>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        videogames: state.videogames,
        loading: state.loading,
    }
}

// function mapDispatchToProps (dispatch) {
//     return{
//         getAllVideogames: () => dispatch(getAllVideogames())
//     }
// }

export default connect(mapStateToProps, /*mapDispatchToProps*/)(Card);