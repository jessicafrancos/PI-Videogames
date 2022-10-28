import React, { useEffect, useState } from "react";
import Card from "./Card";
import { connect } from "react-redux";
//import { NavLink } from "react-router-dom";
import { filterByGenre, orderVideogames, getAllGenres, getAllVideogames, clearFilter, closeCard } from "../redux/actions";
import style from "../styleSheets/home.module.css"

const Home = (props) => {

  const [noCategory, setNoCategory] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [filterChanged, setFilterChanged] = useState(false);

  useEffect(() => {
    const response = async () => {

      await props.getAllVideogames();
      await props.getAllGenres();
    }
    response();
  }, [])

  useEffect(() => {

    if (props.videogames.length <= 0 && filterChanged) {
      setNoCategory(true)
    }
  }, [props.videogames])


  //PAGINATION
  const next = async () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage)
    await props.getAllVideogames(nextPage);
    setCurrentPage(nextPage);
  }

  const prev = async () => {
    const prevPage = currentPage - 1
    if (prevPage < 0) return
    else {
      await props.getAllVideogames(prevPage);
      setCurrentPage(prevPage)
    }
  }

  const onClose = () => {
    props.closeCard();
  }

  //FILTER
  const handleFilter = async (e) => {
    setFilterChanged(true);
    if (e.target.value === 'ALL') {
      props.clearFilter()
      await props.getAllVideogames();
      setFilterChanged(false);

      return;
    }
    await props.clearFilter()
    await props.filterByGenre(e.target.value);

  }

  //ORDER
  const handleOrder = async (e) => {
    await props.orderVideogames(e.target.value)
  }

  return (
    <div className={style.container}>
      <div className={style.fixedLeft}></div>
      <div className={style.fixedRight}></div>

      <div className={style.images}>
        <img src="https://images.unsplash.com/photo-1606813907291-d86efa9b94db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80" alt="HomeImage" />
        <img src="https://images.unsplash.com/photo-1513807762437-8c8dee6b3776?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80" alt="homeImage" />
        <img src="https://images.unsplash.com/photo-1625805866449-3589fe3f71a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="HomeImage" />
        <img src="https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1467&q=80" alt="HomeImage" />
      </div>

      <div className={style.filterOrder}>
        <div>
          <select className={style.filter} onChange={(e) => handleFilter(e)}>
            <option value="">Filter</option>
            <option value="ALL">All</option>
            {props.genres.map((option) => (
              <option key={option.id} value={(option.name)}>{option.name}</option>
            ))}
          </select>
        </div>

        <div>
          <select className={style.order} onChange={(e) => handleOrder(e)}>
            <option value="">Order</option>
            <option value="ASC">Upkward</option>
            <option value="DESC">Backward</option>
            <option value="rating">Rating</option>
          </select>
        </div>

      </div>

      <br /><br /><br />
      <br /><br /><br />
      <br /><br /><br />
      {
        props.loading && (
          <img src="./loading.gif" alt="LoadingGif" />
        )
      }
      {
        noCategory && props.videogames.length <= 0 && (
          <div className={style.notFound}>
            <img className={style.notFoundImg} src="https://cdn.pixabay.com/photo/2019/04/12/08/44/pacman-4121590_960_720.png" alt="not found" />
            <p className={style.notFoundP}> Oops! There are not videogames related to this category  </p>
          </div>
        )
      }

      <div className={style.cardsContainer}>

        <div className={style.card}>
          {
            props.videogames && props.videogames.map((v, index) =>
              <Card
                key={index}
                onClose={onClose}
                id={v.id}
                image={v.image}
                name={v.name}
                rating={v.rating}
                genre={v.genre} />
            )
          }
        </div>
      </div>

      <br /> <br /> <br />
      <br /> <br /> <br />

      {
        !filterChanged && (
          <div>
            <button className={style.prevNext} disable={currentPage <= 0} onClick={prev} >{"<    Prev"}</button>
            <button className={style.prevNext} disable={currentPage > 6} onClick={next} >{"Next    >"}</button>
          </div>
        )
      }
      <br /> <br /> <br />

      <footer className={style.footer}>
        <br /> <br /> <br />
        <br /> <br /> <br />
        <br /> <br /> <br />
        <p>
          Henry Videogames
        </p>
        <p>
          Jessica Franco  2022 ®
        </p>

        <p>
          2022  ®
        </p>

        <br /> <br /> <br />

      </footer>

    </div>
  );
}

function mapStateToProps(state) {
  //debugger
  return {
    videogames: state.videogames,
    videogamesOriginal: state.videogamesOriginal,
    genres: state.genres,
    loading: state.loading,
    error: state.error
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAllGenres: () => dispatch(getAllGenres()),
    filterByGenre: (event) => dispatch(filterByGenre(event)),
    orderVideogames: (event) => dispatch(orderVideogames(event)),
    getAllVideogames: (page) => dispatch(getAllVideogames(page)),
    clearFilter: () => dispatch(clearFilter()),
    closeCard: () => dispatch(closeCard())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);