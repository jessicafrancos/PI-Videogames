import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getDetail, cleanDetail } from "../redux/actions";
import { NavLink } from "react-router-dom";
import style from "../styleSheets/Detail.module.css";

const Detail = (props) => {

    const detailId = props.props.match.params.id;
    useEffect(() => {
        props.getDetail(detailId)
        return () => {
            props.cleanDetail()
        }
    }, [])

    return (
        <div className={style.container}>

            <div className={style.images}>
                <img src="https://images.unsplash.com/photo-1607853202273-797f1c22a38e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80" alt="datailImage" />
                <img src="https://images.unsplash.com/photo-1555864326-5cf22ef123cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1467&q=80" alt="datailImage" />
                <img src="https://images.unsplash.com/photo-1636828982375-a4ec8b809e5e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="datailImage" />
                <img src="https://images.unsplash.com/photo-1651984293033-4f3f465da333?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80" alt="datailImage" />
                <img src="https://images.unsplash.com/photo-1527332900615-32bb872f6b62?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=689&q=80" alt="DetailImage" />
            </div>

            <div className={style.titleDiv}>Have fun little dumb!</div>
            <div className={style.title}>{props.videogameDetail.name}</div>
            <br />
            <br />
            <div className={style.detailCard}>
                <img className={style.image} src={props.videogameDetail.image} alt={props.videogameDetail.name} />
                <div style={{
                    display: 'flex'
                }}>
                    <h5> Name: </h5>
                    <p className={style.paragh}>{props.videogameDetail.name}</p>
                </div>
                <div style={{
                    display: 'flex'
                }}>
                    <h5> Description: </h5>
                    <div dangerouslySetInnerHTML={{ __html: props.videogameDetail.description }} />
                </div>
                <div style={{
                    display: 'flex'
                }}>
                    <h5> Release Date: </h5>
                    <p className={style.paragh}>{props.videogameDetail.releaseDate}</p>
                </div>
                <div style={{
                    display: 'flex'
                }}>
                    <h5> Rating: </h5>
                    <p className={style.paragh}>{props.videogameDetail.rating}</p>
                </div>

                <div style={{
                    display: 'flex'
                }}>
                    <h5> Genres: </h5>
                    {
                        props.videogameDetail.genre && props.videogameDetail.genre.map(genre => (
                            <p className={style.paragh}>{genre} , </p> 
                        ))
                    }
                </div>
                <div style={{
                    display: 'flex'
                }}>
                    <h5>
                        Platforms:
                    </h5>
                    {
                        props.videogameDetail.platforms && props.videogameDetail.platforms.map(platform => (
                            <p className={style.paragh}>{platform},  </p>
                        ))
                    }

                </div>

                {/* <p className={style.paragh}>platforms: {props.videogameDetail.platforms.name}</p> */}

            </div>

            <br /><br /><br />



            <NavLink className={style.link} to={"/home"}><button className={style.button}>Go Back!</button></NavLink>

            <br /><br /><br />

        </div>
    )
};

function mapStateToProps(state) {
    return {
        videogameDetail: state.videogameDetail,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getDetail: (detailId) => dispatch(getDetail(detailId)),
        cleanDetail: () => dispatch(cleanDetail())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);