import React, { useState } from "react";
import { connect } from "react-redux";
import { getVideogameName } from "../redux/actions";
import style from "../styleSheets/Search.module.css";

const SearchInput = (props) => {
    const [input, setInput] = useState("");

    const handleChange = (e) => {
        e.preventDefault(e);
        //videogames.filter(v => (v.name.toLowerCase().includes(input.toLowerCase())));
        //e.target.value.toLowerCase()
        setInput(e.target.value);

    };

    const handleSubmit = (e) => {
        e.preventDefault(e);
        props.getVideogameName(input);
        console.log(input)
        setInput("")
        //debugger
    }

    return(
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input className={style.input} type={"text"} name="videogame" value={input} placeholder="Search" onChange={(e)=>handleChange(e)}/>
                <input className={style.submit} type={"submit"}/> 
            </form>
        </div>
    )
}

function mapStateToProps (state){
    return{
        videogames: state.videogames,
        loading: state.loading,
    }
}

function mapDispatchToProps (dispatch) {
    return{
        getVideogameName: (input) => dispatch(getVideogameName(input))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput)