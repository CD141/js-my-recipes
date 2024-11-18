
const router = require('express').Router()

const recipes = require('../../../data/recipes.json')

router.get('/', (request, response) => {
    const allRecipes = recipes.map(({id, title, image, prepTime, difficulty}) => {
        return { id, title, image, prepTime, difficulty }
    })
    response.send(results)
})

router.get('/recipe/:id', async (request, response) => {
    const { id } = request.params
    const found = await recipes.findOne({ _id: parseInt(id) })

    if (!found) response.send({ error: `Cannot find recipe numebr with id: ${id}`})
        else response.send(found)
})

router.get('/recipe/add', async (request, response) => {
    const { title, image, description, ingredients, instructions, prepTime, diffuclty } = request.params
    const result = await recipes.insertOne({ title, image, description, ingredients, instructions, prepTime, diffuclty })
    response.send(result)
})

module.exports = router
