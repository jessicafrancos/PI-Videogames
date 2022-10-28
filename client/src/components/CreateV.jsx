import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { newVideogame, getAllGenres, getAllPlatforms } from "../redux/actions";
import { NavLink } from "react-router-dom";
import style from "../styleSheets/Create.module.css";

const CreateVideoGames = (props) => {
  const [input, setInput] = useState({
    name: "",
    description: "",
    releaseDate: "",
    rating: "",
    genres: "",
    platforms: ""
  })

  const [errors, setErrors] = useState({});

  let validateInput = (input) => {
    const myRe = /[a-zA-ZÀ-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-ZÀ-ÖØ-öø-ÿ]+\.?)*/
    const errors = {};
    if (!input.name.length) errors.name = "Name require";
    if (myRe.exec(input.name) === true) errors.name = "Name invalid";
    if (!input.description.length) errors.description = "Description require";
    if (!input.releaseDate.length) errors.releaseDate = "Select a release date"
    if (!input.rating.length) errors.rating = "Rate videogame"
    if (!input.genres.length) errors.genres = "Select type of genres"
    if (!input.platforms.length) errors.platforms = "Select platforms"
    //if(errors){}
    return errors
  }


  useEffect(() => {
    const allGenres = async () => {
      await props.getAllGenres()
      await props.getAllPlatforms()
    }
    allGenres();
    // setErrors(validateInput(input));
  }, [])

  useEffect(() => {
    setErrors(validateInput(input));
  }, [input])

  // let handleGenres = (e) => {
  //   console.log("", e)
  //   setInput((prev) => ({...prev, ["genres"]: e.target.value}))
  // }

  let handleChange = (e) => {
    //debugger
    e.preventDefault(e);
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  };

  let handleSubmit = (e) => {
    e.preventDefault(e);
    props.newVideogame(input);

    if (!Object.keys(errors).length) {
      setInput({
        name: "",
        description: "",
        releaseDate: "",
        rating: "",
        genres: "",
        platforms: ""
      });
      const created = () => (alert("Videogame created!"));
      created();
    }
  }


  let expanded = false;

  function showCheckboxes() {
    let checkboxes = document.getElementById("checkboxes");
    if (!expanded) {
      checkboxes.style.display = "block";
      expanded = true;
    } else {
      checkboxes.style.display = "none";
      expanded = false;
    }
  }

  return (
    <div className={style.container}>

      <div className={style.images}>
        <img src="https://images.unsplash.com/photo-1607016284318-d1384bf5edd1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="Create Videogame" />
        <img src="https://images.unsplash.com/photo-1636487658572-323ec2efc218?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80" alt="Create Videogame" />
        <img src="https://images.unsplash.com/photo-1521484358791-8c8504da415e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=80" alt="Create Videogame" />
        <img src="https://images.unsplash.com/photo-1518719028738-e7262020a932?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" alt="CreateImages" />
      </div>

      <br /><br /><br />
      <br /><br /><br />
      <br /><br /><br />

      <div className={style.title}><h3 style={{ color: "white" }}>CREATE VIDEOGAME</h3> </div>
      <br /><br />
      <form className={style.formu} onSubmit={(e) => handleSubmit(e)}>

        <div className={style.eachDiv}>

          <label className={style.label}>Videogame name </label>
          <input className={style.input} placeholder="Name" type={"text"} name={"name"} value={input.name} onChange={(e) => handleChange(e)} />
          <p className={style.errors}>{errors.name && errors.name}</p>
        </div>

        <br /><br /><br />

        <div className={style.eachDiv}>

          <label className={style.label}>Description </label>
          <input className={style.input} placeholder="description" type={"text"} name={"description"} value={input.description} onChange={(e) => handleChange(e)} />
          <p className={style.errors}>{errors.description && errors.description}</p>
        </div>

        <br /><br /><br />

        <div className={style.eachDiv}>

          <label className={style.label}>Release Date </label>
          <input className={style.input} type={"date"} name={"releaseDate"} min="2022-10-13" value={input.releaseDate} onChange={(e) => handleChange(e)} />
          <p className={style.errors}>{errors.description && errors.description}</p>
        </div>

        <br /><br /><br />

        <div className={style.eachDiv}>

          <label className={style.label}>Rating ☆</label>
          <input className={style.rating} type={"range"} name={"rating"} min="0" max="5" value={input.rating} onChange={(e) => handleChange(e)} />
          <p className={style.errors}>{errors.rating && errors.rating}</p>
        </div>

        <br /><br /><br />

        <div className={style.eachDiv}>

          <label className={style.label}>Genres</label>
          <select multiple className={style.input} name={"genres"} onChange={(e) => handleChange(e)}>

            <option className={style.labelName} value="">Filter</option>

            {props.genres.map((v) => (
              <option key={v.id} name={v.name} value={JSON.stringify(v)}>{v.name}</option>))}

          </select>

          <p className={style.errors}>{errors.genres && errors.genres}</p>
        </div>
        <br /><br /><br />
        <div className={style.eachDiv}>
          <label className={style.label}>Platforms </label>

          <select multiple className={style.input} name={"platforms"} onChange={(e) => handleChange(e)}>

            <option className={style.labelName} value="">Platforms</option>

            {props.platforms.map((p) => (
              <option key={p.id} name={p.name} value={JSON.stringify(p)}>{p.name}</option>))}

          </select>

          <p className={style.errors}>{errors.platforms && errors.platforms}</p>
        </div>

        <br /><br /><br />
        <br /><br /><br />

        <input name="buttonSubmit" disabled={Object.keys(errors).length > 0} className={style.submit} type="submit" value={"Create new videogame"} />
      </form>
      <br /><br /><br />
      <br /><br /><br />


      <button className={style.goBack}><NavLink className={style.link} to={"/home"}>Go Back!</NavLink></button>
      <br /><br /><br />
      <br /><br /><br />

    </div>
  )
}


function mapStateToProps(state) {
  return {
    videogames: state.videogames,
    loading: state.loading,
    genres: state.genres,
    platforms: state.platforms
  }
}

function mapDispatchToProps(dispatch) {
  return {
    newVideogame: (input) => dispatch(newVideogame(input)),
    getAllGenres: () => dispatch(getAllGenres()),
    getAllPlatforms: () => dispatch(getAllPlatforms())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateVideoGames);