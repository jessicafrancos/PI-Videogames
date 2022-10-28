const axios = require('axios');
const { UUID } = require('sequelize');
const { Videogame, Genre, videogame_Genre, Platform } = require('../db');
const { Op } = require("sequelize");


// //1. /videogames:
const getVideogames = async (req, res) => {
    try {
        const apiData = await axios.get("https://api.rawg.io/api/games?key=66fccfa9ddd14f559840d22b7725bca1");

        const nPages = 5;
        const urls = ["https://api.rawg.io/api/games?key=66fccfa9ddd14f559840d22b7725bca1"];

        for (let i = 2; i <= nPages; i++) {
            urls.push(`https://api.rawg.io/api/games?key=66fccfa9ddd14f559840d22b7725bca1&page=${i}`);
        }

        const promiseUrls = urls.map((url) => axios.get(url));
        const promiseData = await Promise.all(promiseUrls)
            .then((promises) => {
                const promiseResults = promises.map((p) =>
                    p.data.results.map((videog) => {
                        return {
                            id: videog.id,
                            image: videog.background_image,
                            name: videog.name,
                            genres: videog.genres.map((genre) => genre.name),
                            releaseDate: videog.released,
                            rating: videog.rating,
                            platforms: videog.platforms.map((plat) => plat.platform.name)
                        }
                    })
                )
                const joined = promiseResults[0].concat(promiseResults[1], promiseResults[2], promiseResults[3], promiseResults[4])

                const joinedEach = joined.map(each => {
                    return {
                        id: each.id,
                        image: each.image,
                        name: each.name,
                        genres: each.genres.map(g => g),
                        releaseDate: each.releaseDate,
                        rating: each.rating,
                        platforms: each.platforms.map((plat) => plat)
                    }
                })
                return joinedEach
            })


        try {
            const exist = Videogame.findAll()

            //if(!exist.length){
            //  const create = promiseData.map(async v => await Videogame.bulkCreate(joinedEach)
            //}

            if (!exist.length) {
                const create = promiseData.map(async v => await Videogame.create({
                    id: v.id,
                    image: v.image,
                    name: v.name,
                    description: v.description ? v.description : "description not registed",
                    genre: v.genres,
                    releaseDate: v.releaseDate,
                    rating: v.rating,
                    platform: v.platforms
                }))
                await Promise.all(create);

            }
        } catch (error) {
            console.log(error)
        }

        // if(req.query.filter){
        //     try {
        //        let videog = await findAll({
        //         where: {
        //             genres: req.query.filter
        //         },
        //         limit: 15,
        //         offset: req.query.pages,
        //         order: [["name", req.query.order]],
        //         include: {model: Genre }
        //        });
        //        return res.json(videog)
        //     } catch (error) {
        //         console.log(error)
        //     }
        // } else {
        //     try {
        //         let videog = await findAll({
        //             limit: 15,
        //             offset: req.query.pages,
        //             order: [["name", req.query.order]],
        //             include: {model: Genre }
        //         })
        //         return res.json(videog)
        //     } catch (error) {
        //         console.log(error)
        //     }
        // }
        //if(req.query.order){}

        //console.log(promiseData);

        //const dbVideogames = await Videogame.findAll();
        // const response =  [...promiseData,...dbVideogames]




        //ORDER & FILTER!
        let order = req.query.order
        let pageSize = req.query.pageSize
        let pageNumber = req.query.pageNumber
        let dbVideogames

        if (order === 'rating') {
            dbVideogames = await Videogame.findAll({
                limit: pageSize || 15,
                offset: pageNumber && pageSize ? pageNumber * pageSize : 0,
                order: [
                    ['rating', 'DESC']
                ]
            });
        } else {
            dbVideogames = await Videogame.findAll({
                limit: pageSize || 15,
                offset: pageNumber && pageSize ? pageNumber * pageSize : 0,
                order: [
                    ['name', order || 'ASC']
                ]
            });
        }

        const response = dbVideogames

        res.status(200).send(response)

    } catch (error) {
        console.log({ error: error.message });
    }
}

// //2. GET /videogames?name="...":
const getVideogamesName = async (req, res) => {
    try {
        const { name } = req.query;
        console.log(name);
        const dataQueryInfo = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=66fccfa9ddd14f559840d22b7725bca1`);
        const dataQuery = dataQueryInfo.data;
        const sliceData = dataQuery.results
        const slice = sliceData.slice(0, 15)
        const response = slice.map((videog) => {
            return {
                id: videog.id,
                image: videog.background_image,
                name: videog.name,
                genre: videog.genres ? videog.genres.map((p) => p.name) : "genres for this game are not registed",
                rating: videog.rating ? videog.rating.map((p) => p.name) : "rating for this game are not registed"
            }
        })

        if (!name) {
            return res.status(400).json(`the videogame ${name} is not registed`)
        }
        res.status(200).json(response)
        // res.status(200).json(search)
    } catch (error) {
        console.log({ error: error.message });
    }
}

// //3. GET /videogames/{idVideogame}: DONE
const getVideogamesId = async (req, res) => {
    try {
        const { id } = req.params;
        //const dataParams = dataVideogames.id;

        const dataParamsInfo = await axios.get(`https://api.rawg.io/api/games/${id}?key=66fccfa9ddd14f559840d22b7725bca1`);
        const dataParams = dataParamsInfo.data;
        const response = {
            image: dataParams.background_image,
            name: dataParams.name,
            description: dataParams.description,
            releaseDate: dataParams.released,
            rating: dataParams.rating,
            platforms: dataParams.platforms.map((p) => p.platform.name),
            genre: dataParams.genres.map((p) => p.name),
        }
        // console.log(response);
        if (!id) {
            return res.status(400).json("Ops! Videogame not found");
        }
        res.status(200).json(response)

    } catch (error) {
        console.log({ error: error.message });
    }
}

//4. POST /videogames DONE
const postVideogames = async (req, res) => {
    const { id, name, description, releaseDate, rating, genresId, platformIds, platforms, genre } = req.body;
    console.log(req.body);
    try {
        if (!name || !description || !rating || !platforms) {
            return res
                .status(400)
                .json("information incomplete")
        }
        // const videog = await Videogame.create({
        //     name: name,
        //     description: description,
        //     releaseDate: releaseDate,
        //     rating: rating,
        //     genre: genres,
        //     //genreId: genreId,
        //     platforms: platforms,
        //     Genre: genre
        // }, {
        //     include: Genre
        // });


        const videog = Videogame.findOrCreate({
            where: { name: name },
            defaults: {
                id: UUID,
                description: description,
                releaseDate: releaseDate,
                rating: rating,
                //genre: genres,
                platforms: platforms,
                Genre: genre
            }
        });
        await videog.addGenres(genresId)
        await videog.addPlatforms(platformIds)

        res.status(200).json(videog);
    } catch (error) {
        console.log(error);
        res.status(404).json({ error: error.message })
    }
}

const editVideogame = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (id) {
        const hola = await Videogame.update({ name: name }, {
            where: {
                id: id
            }
        });
        res.status(200).json(hola)
    } else {
        res.status(404)
    }
}

const createVideogame = async (req, res) => {
    try {
        const { name, description, rating, genreIds, platformIds } = req.body;

        // const [videogame, created] = await Videogame.findOrCreate({
        const [newvideog, created] = await Videogame.findOrCreate({
            where: { name: name },
            defaults: { name, description, rating }
        });

        // const videogame = await Videogame.findOne({
        //     where: { name: name }
        // })

        // if (!videogame) {
        //     const created = await Videogame.create({
        //         name,
        //         description,
        //         rating
        //     })
        await newvideog.addGenres(genreIds);
        await newvideog.addPlatforms(platformIds);
        //     res.status(200).json("Creado")
        //     return;
        // }


        res.status(200).json({
            newvideog
        })


        // const platform = await Plaftorm.findOrCreate({ name: name, description: description });
        // const apiDataInfo = await axios.get("https://api.rawg.io/api/games?key=66fccfa9ddd14f559840d22b7725bca1")
        // const apiData = apiDataInfo.data.results;
        // const tryy = apiData.map((one) =>  one.platforms)
        // const tryyy = tryy.map((one)=> one.map(plat => plat.platform))
        // const mapp = tryyy.map(p => p.map(p=> {
        //     return{
        //         id: p.id,
        //         name: p.name
        //     }
        // }))
        // const dataPlatform = []

        // const each = mapp.map(element => element.map(el=> {
        //     return dataPlatform.push(el)
        // }))

        // const uniqueIds = new Set();
        // const unique = dataPlatform.filter(element => {
        //     const isDuplicate = uniqueIds.has(element.id)
        //     uniqueIds.add(element.id)
        //     if(!isDuplicate) {
        //         return true
        //     }
        //     return false
        // })

        // res.status(200).json({
        //     ...videogame,
        //     created
        // })

    } catch (error) {
        console.log({ error: error.message });
        res.status(500).json({ error: error.message })
    }
}

const deleteVideogame = async (req, res) => {
    const { id } = req.params;
    const row = await Videogame.findOne({
        where: { id: id },
    });

    if (row) {
        await row.destroy();
        res.status(204).json({});
    } else {
        res.status(404).json({});
    }
}

//6. /platforms:
const getPlatforms = async (req, res) => {
    try {
        const apiDataInfo = await axios.get("https://api.rawg.io/api/games?key=66fccfa9ddd14f559840d22b7725bca1")
        const apiData = apiDataInfo.data.results;
        const tryy = apiData.map((one) => one.platforms)
        const tryyy = tryy.map((one) => one.map(plat => plat.platform))
        const mapp = tryyy.map(p => p.map(p => {
            return {
                id: p.id,
                name: p.name
            }
        }))
        const dataPlatform = []

        const each = mapp.map(element => element.map(el => {
            return dataPlatform.push(el)
        }))

        const uniqueIds = new Set();
        const unique = dataPlatform.filter(element => {
            const isDuplicate = uniqueIds.has(element.id)
            uniqueIds.add(element.id)
            if (!isDuplicate) {
                return true
            }
            return false
        })
        res.status(200).json(unique)
    } catch (error) {
        console.log({ error: error.message });
    }
}
const editPlatform = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (id) {
        const hola = await Platform.update({ name: name }, {
            where: {
                id: id
            }
        });
        console.log(hola)
        res.status(200).json(hola)
    } else {
        res.status(404)
    }
}

const createPlatforms = async (req, res) => {
    try {
        const { name, description } = req.body;
        const [platform, created] = await Platform.findOrCreate({
            where: { name: name },
            defaults: { name, description }
        });

        // const platform = await Plaftorm.findOrCreate({ name: name, description: description });
        // const apiDataInfo = await axios.get("https://api.rawg.io/api/games?key=66fccfa9ddd14f559840d22b7725bca1")
        // const apiData = apiDataInfo.data.results;
        // const tryy = apiData.map((one) =>  one.platforms)
        // const tryyy = tryy.map((one)=> one.map(plat => plat.platform))
        // const mapp = tryyy.map(p => p.map(p=> {
        //     return{
        //         id: p.id,
        //         name: p.name
        //     }
        // }))
        // const dataPlatform = []

        // const each = mapp.map(element => element.map(el=> {
        //     return dataPlatform.push(el)
        // }))

        // const uniqueIds = new Set();
        // const unique = dataPlatform.filter(element => {
        //     const isDuplicate = uniqueIds.has(element.id)
        //     uniqueIds.add(element.id)
        //     if(!isDuplicate) {
        //         return true
        //     }
        //     return false
        // })

        res.status(200).json({
            ...platform,
            created
        })

    } catch (error) {
        console.log({ error: error.message });
    }
}

const deletePlatform = async (req, res) => {
    const { id } = req.params;
    const row = await Platform.findOne({
        where: { id: id },
    });

    if (row) {
        await row.destroy();
        res.status(204);
    } else {
        res.status(404);
    }
}

//7. /genre:
const editGenre = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (id) {
        const hola = await Genre.update({ name: name }, {
            where: {
                id: id
            }
        });
        console.log(hola)
        res.status(200).json(hola)
    } else {
        res.status(404)
    }
}

const createGenre = async (req, res) => {
    try {
        const { name, description } = req.body;
        const [genre, created] = await Genre.findOrCreate({
            //const newGenre = await Genre.findOrCreate({
            where: { name: name },
            defaults: { name, description }
        });

        // const platform = await Plaftorm.findOrCreate({ name: name, description: description });
        // const apiDataInfo = await axios.get("https://api.rawg.io/api/games?key=66fccfa9ddd14f559840d22b7725bca1")
        // const apiData = apiDataInfo.data.results;
        // const tryy = apiData.map((one) =>  one.platforms)
        // const tryyy = tryy.map((one)=> one.map(plat => plat.platform))
        // const mapp = tryyy.map(p => p.map(p=> {
        //     return{
        //         id: p.id,
        //         name: p.name
        //     }
        // }))
        // const dataPlatform = []

        // const each = mapp.map(element => element.map(el=> {
        //     return dataPlatform.push(el)
        // }))

        // const uniqueIds = new Set();
        // const unique = dataPlatform.filter(element => {
        //     const isDuplicate = uniqueIds.has(element.id)
        //     uniqueIds.add(element.id)
        //     if(!isDuplicate) {
        //         return true
        //     }
        //     return false
        // })

        res.status(200).json({
            ...genre,
            created
        })

    } catch (error) {
        console.log({ error: error.message });
    }
}

const deleteGenre = async (req, res) => {
    const { id } = req.params;
    const row = await Genre.findOne({
        where: { id: id },
    });

    if (row) {
        await row.destroy();
        res.status(204);
    } else {
        res.status(404);
    }
}

//5. GET /genres:
const getGenres = async (req, res) => {
    const apiDataInfo = await axios.get("https://api.rawg.io/api/genres?key=66fccfa9ddd14f559840d22b7725bca1");
    const apiData = apiDataInfo.data.results;

    const create = apiData.map((one) => {
        return {
            id: one.id,
            name: one.name
        }
    })

    try {
        const exist = await Genre.findAll()
        if (!exist.length) {
            const dbGenre = create.map(async g => await Genre.create({
                id: g.id,
                name: g.name
            }))
            await Promise.all(dbGenre);
        }

        const dbGenres = await Genre.findAll();

        res.status(200).json(dbGenres)
    } catch (error) {
        console.log({ error: error.message });
    }
}

module.exports = {
    postVideogames,
    getVideogames,
    editVideogame,
    createVideogame,
    deleteVideogame,
    getPlatforms,
    editPlatform,
    createPlatforms,
    deletePlatform,
    getGenres,
    editGenre,
    createGenre,
    deleteGenre,
    getVideogamesId,
    getVideogamesName
};