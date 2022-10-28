const { Router, response } = require('express');
const axios = require('axios');
const { Videogame, Genre, videogame_Genre } = require('../db');
const { getVideogames, 
    getVideogamesName, 
    getVideogamesId, 
    postVideogames, 
    //getGenres, 
    getPlatforms, 
    deleteVideogame, 
    deletePlatform,
    createPlatforms, 
    editPlatform,
    createGenre,
    getGenres,
    createVideogame,
    addGenresToVideogames,
    editVideogame} = require("./controller")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//2. GET /videogames?name="...":  DONE
router.get("/videogame", (req, res) => getVideogamesName(req, res));
router.get("/videogames", (req, res) => getVideogames(req, res));
router.get("/videogames/:id", (req, res) => getVideogamesId(req, res))
router.post("/videogames", (req, res) => createVideogame(req, res))
router.put("/videogames/:id", (req, res) => editVideogame(req, res))
router.post("/videogames/bulk", (req, res) => postVideogames(req, res))
router.delete("/videogames/:id", (req, res) => deleteVideogame(req, res))
router.put("/videogames/:id", (req, res) => editVideogame(req, res))

//5. GET /genres: DONEE
router.get("/genres", (req, res) => getGenres(req, res))
router.post("/genres", (req, res) => createGenre(req, res))
router.get("/genres", (req, res) => getGenre(req, res))
router.get("/genres/:id", (req, res) => getGenre(req, res))
router.delete("/genres/:id", (req, res) => deleteGenre(req, res))
router.put("/genres/:id", (req, res) => editGenre(req, res))
router.post("/genres/bulk", (req, res) => addGenresToVideogames(req, res))

//6. GET/platforms
router.post("/platforms", (req, res) => createPlatforms(req, res))
router.get("/platforms", (req, res) => getPlatforms(req, res))
router.get("/platforms/:id", (req, res) => getPlatforms(req, res))
router.delete("/platforms/:id", (req, res) => deletePlatform(req, res))
router.put("/platforms/:id", (req, res) => editPlatform(req, res))

module.exports = router;