import express from 'express'

const routes  = express.Router()

routes.get('/', (request, response) => {
    response.json({
        ok: "Hello world"
    }) 
})

export default routes;