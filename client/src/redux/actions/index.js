import axios from 'axios'


export function getAllVideogames(pageNumber = 0) {
    //debugger
    return function (dispatch) {
        return axios.get(`http://localhost:3001/videogames?pageSize=15&pageNumber=${pageNumber}`)
        .then(response => response.data)
        .then(response => dispatch({type: "GET_ALL_VIDEOGAME", payload: response}))
        .catch((error) => console.log(error))
    }
}

export function getAllVideogamesWithOrder(pages, order, filter) {
    return function (dispatch) {
        return axios.get(`http://localhost:3001/videogames?order=${order}`)
        .then(response => response.data)
        .then(response => dispatch({type: "GET_ALL_VIDEOGAME", payload: response}))
        .catch((error) => console.log(error))
    }
}

export function getDetail(detailId) {
    return function (dispatch) {
        return axios.get(`http://localhost:3001/videogames/${detailId}`)
        .then(response => response.data)
        .then(response => dispatch({type: "GET_DETAIL", payload: response}))
        .catch((error) => console.log(error))
    }
}

export function getVideogameName(input) {
    return function (dispatch) {
        return axios.get(`http://localhost:3001/videogame?name=${input}`)
        .then(response => response.data)
        .then(response => dispatch({type: "GET_VIDEOGAME_NAME", payload: response}))
        .catch((error) => console.log(error))
    }
}

export function newVideogame(input) {
    return function (dispatch) {
        const parsedGenre = JSON.parse(input.genres)
        const parsedPlatform = JSON.parse(input.platforms)
        const MappedInput = {
            ...input,
            platformIds: [parsedPlatform.id],
            genreIds: [parsedGenre.id],
        }
        
        return axios.post(`http://localhost:3001/videogames`, MappedInput)
        .then(response => console.log(response))
        // .then(response => dispatch({type: "CREATE_VIDEOGAME", payload: response}))
        // .catch((error) => console.log(error))
    }
}

export function getAllGenres() {
    return function (dispatch) {
        return axios.get(`http://localhost:3001/genres`)
        .then(response => response.data)
        .then(response => dispatch({type: "GET_ALL_GENRES", payload: response}))
        .catch((error) => console.log(error))
    }
}

export function getAllPlatforms() {
    return function (dispatch) {
        return axios.get(`http://localhost:3001/platforms`)
        .then(response =>  response.data)
        .then(response => dispatch({type: "GET_ALL_PLATFORMS", payload: response}))
        .catch((error) => console.log(error))
    }
}

export function cleanDetail(){
    return({type: "CLEAN_DETAIL", payload: {}})
}

export function filterByGenre(event){
    return({type: "FILTER_BY_GENRE", payload: event})
}

export function clearFilter(event){
    return({type: "CLEAR_FILTER", payload: event})
}

export function orderVideogames(event){
    return function (dispatch) {
        return axios.get(`http://localhost:3001/videogames?order=${event}`)
        .then(response => response.data)
        .then(response => dispatch({type: "ORDER_VIDEOGAMES", payload: response}))
        .catch((error) => console.log(error))
    }
}

export function closeCard(id){
    return function (dispatch) {
        return axios.delete(`http://localhost:3001/videogame`, id)
        .then(response => response.data)
        .then(response => dispatch({type: "CLOSE_CARD", payload: response}))
        .catch((error) => console.log(error))
    }
}

// export function getAllVideogames(pageNumber = 0) {
//     //debugger
//     return function (dispatch) {
//         try {
//             axios.get(`http://localhost:3001/videogames?pageSize=15&pageNumber=${pageNumber}`)
//             .then(response => response.data)
//             .then(response => dispatch({type: "GET_ALL_VIDEOGAME", payload: response}))
//         } catch (error) {
//             dispatch({type: "ERROR", payload: error })
//         }
//     }
// }




// export function getAllVideogamesWithOrder(pages, order, filter) {
//     return function (dispatch) {
//         try {
//             axios.get(`http://localhost:3001/videogames?order=${order}`)
//             .then(response => response.data)
//             .then(response => dispatch({type: "GET_ALL_VIDEOGAME", payload: response}))
//         } catch (error) {
//             dispatch({type: "ERROR", payload: error })
//         }
//     }
// }




// export function getDetail(detailId) {
//     return function (dispatch) {
//         try {
//             axios.get(`http://localhost:3001/videogames/${detailId}`)
//             .then(response => response.data)
//             .then(response => dispatch({type: "GET_DETAIL", payload: response}))
//         } catch (error) {
//             dispatch({type: "ERROR", payload: error })
//         }
// }



// export function getVideogameName(input) {
//     return function (dispatch) {
//         try {
//             axios.get(`http://localhost:3001/videogame?name=${input}`)
//         .then(response => response.data)
//         .then(response => dispatch({type: "GET_VIDEOGAME_NAME", payload: response}))
//         } catch (error) {
//             dispatch({type: "ERROR", payload: error })
//         }
//     }
// }




// export function newVideogame(input) {
//     return function (dispatch) {
//         try {
//             debugger
//             const parsedGenre = JSON.parse(input.genres)
//             const parsedPlatform = JSON.parse(input.platforms)
//             const MappedInput = {
//                 ...input,
//                 platforms: [parsedPlatform.name],
//                 genres: [parsedGenre.name],
//                 genreId: parsedGenre.id,
//                 genre: parsedGenre
//             }
            
//             return axios.post(`http://localhost:3001/videogames`, MappedInput)
//             .then(response => console.log(response))
//             // .then(response => dispatch({type: "CREATE_VIDEOGAME", payload: response}))
//             // .catch((error) => console.log(error))
//         } catch (error) {
//             dispatch({type: "ERROR", payload: error }) 
//         }
//     }
// }



// export function getAllGenres() {
//     return function (dispatch) {
//         try {
//             axios.get(`http://localhost:3001/genres`)
//             .then(response => response.data)
//             .then(response => dispatch({type: "GET_ALL_GENRES", payload: response}))
//         } catch (error) {
//             dispatch({type: "ERROR", payload: error }) 
//         }
//     }
// }



// export function getAllPlatforms() {
//     return function (dispatch) {
//         try {
//             xios.get(`http://localhost:3001/platforms`)
//         .then(response =>  response.data)
//         .then(response => dispatch({type: "GET_ALL_PLATFORMS", payload: response}))
//         } catch (error) {
//             dispatch({type: "ERROR", payload: error })
//         }
//     }
// }




// export function orderVideogames(event){
//     return function (dispatch) {
//         try {
//             axios.get(`http://localhost:3001/videogames?order=${event}`)
//             .then(response => response.data)
//             .then(response => dispatch({type: "ORDER_VIDEOGAMES", payload: response}))
//         } catch (error) {
//             dispatch({type: "ERROR", payload: error })
//         }
//     }
// }



// export function closeCard(id){
//     return function (dispatch) {
//         try {
//             const res = axios.delete(`http://localhost:3001/videogame`, id)
//             .then(response => response.data)
//             .then(response => dispatch({type: "CLOSE_CARD", payload: response}))
//         } catch (error) {
//             dispatch({type: "ERROR", payload: error })
//         }
//     }
// }