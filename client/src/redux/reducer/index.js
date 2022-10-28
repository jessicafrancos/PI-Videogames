const initialState = {
    videogames: [],
    videogamesOriginal: [],
    videogameDetail: {},
    genres: [],
    platforms: [],
    error: {},
    loading: true,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_ALL_VIDEOGAME":
      //debugger
      return{
        ...state,
        loading: false,
        videogames: action.payload.map((page) => page),
        videogamesOriginal: action.payload.map((page) => page)
      }
    case "GET_DETAIL":
      return{
        ...state,
        videogameDetail: action.payload
      }

    case "CLEAN_DETAIL":
      return{
        ...state,
        videogameDetail: action.payload
      }
    case "GET_VIDEOGAME_NAME":
      return{
        ...state,
        videogames: action.payload
      }
    case "CREATE_VIDEOGAME":
      return {
        ...state,
        //videogames: [...state.videogames, action.payload],
        // videogames: [...state.videogames, action.payload]
      }
    case "FILTER_BY_GENRE":
      let hello = state.videogames
      let helloo = hello.filter(v => v.genre.includes(action.payload))
      //debugger
      return{
        ...state,
        videogames: helloo
      }

    case  "CLEAR_FILTER":
      return{
        ...state,
          videogames: state.videogamesOriginal
      }

    case "GET_ALL_GENRES":
      return{
        ...state,
        genres: action.payload
      }

    case "GET_ALL_PLATFORMS":
      return{
        ...state,
        platforms: action.payload
      }

    case "ORDER_VIDEOGAMES":
      return{
        ...state,
        videogames: action.payload,
      }
    case "CLOSE_CARD":
      return{
        ...state,
        videogames: state.videogames.filter((videog) => videog.id !== action.payload) 
      }
    case "ERROR":
      return{
        ...state,
        error: action.payload
      }
      // let hola = state.videogames
      // if(action.payload === "upkward") {
      //   hola = state.videogames.sort((a,b) => {
      //   if(a.name > b.name) return 1;
      //   return 0;
      // })}
      // else if(action.payload === "backward"){
      //   hola = state.videogames.sort((a,b) => {
      //   if(a.name > b.name) return -1;
      //   return 0;
      // })}
      // else if(action.payload === "rating") {
      //   hola = state.videogames.sort((a,b) => {
      //   if(a.rating > b.rating) return 1;
      //   return 0;
      // })}

      // return{
      //   ...state,
      //   videogames: hola
      // }

    //   let hola = state.videogames
    //   if(action.payload === "upkward") {
    //     hola = state.videogames.sort((a,b) => {
    //     if(a.name > b.name) return -1;
    //     return 0;
    //   })
    //   return{
    //     ...state,
    //     videogames: hola
    //   }
    // }
    //   else if(action.payload === "backward"){
    //     hola = state.videogames.sort((a,b) => {
    //     if(a.name < b.name) return -1;
    //     return 0;
    //   })
    //   return{
    //     ...state,
    //     videogames: hola
    //   }
    // }
    //   else if(action.payload === "rating") {
    //     hola = state.videogames.sort((a,b) => {
    //     if(a.rating > b.rating) return 1;
    //     return 0;
    //   })
    //   return{
    //     ...state,
    //     videogames: hola
    //   }
    // }


      // return{
      //   ...state,
      //   videogames: hola
      // }
    
    default: return {...state}
  }
}

export default rootReducer;