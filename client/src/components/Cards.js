import React, { useEffect } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import Card from "./Card";
import { getAllVideogames } from "../redux/actions/index";
import style from "../styleSheets/Cards.module.css"

const Cards = (props) => {

    //const [loading, setLoading] = useState(false)

    useEffect(() => {
        const response = () => {
            //setLoading(true)
            props.getAllVideogames();
            //const resp = res.payload
            //console.log("responseeee:",resp)
            //setLoading(false)
        }
        response();
    }) 

    // if(loading){
    //     return(
    //         <h3> loading... </h3>
    //     )
    // }

    return(
        <div className={style.cardsContainer}>
            {
                props.videogames && props.videogames.map((v) => 
                <NavLink key={v.id} to={`/videogames/${v.id}`}>
                    <div >
                        <Card image={v.image} name={v.name} typeGenres={v.typeGenres}/>
                    </div>
                </NavLink>
                )
            }
        </div>
    )
};

function mapStateToProps (state){
    return{
        videogames: state.videogames,
        //loading: state.loading,
    }
}

function mapDispatchToProps (dispatch) {
    return{
        getAllVideogames: () => dispatch(getAllVideogames())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards);