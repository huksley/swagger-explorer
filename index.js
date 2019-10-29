const express = require('express')
const app = express()
const swaggerUi = require('swagger-ui-express');
const fs = require("fs")
const path = require("path")

var options = {
    explorer: true,
    swaggerOptions: {
        urls: fs.readdirSync("./swagger").filter(f => f !== "README.md").map(f => ({
            url: "/swagger/" + f,
            name: path.basename(f)
        })).concat([{
            url: "https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v3.0/api-with-examples.yaml",
            name: "OpenAPI example api-with-examples.yaml"
        }, {
            url: "https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v3.0/petstore.yaml",
            name: "PetStore example"
        }])
    }
};

app.use('/swagger', express.static('swagger'))
app.use('/', swaggerUi.serve, swaggerUi.setup(null, options));
app.listen(process.env.PORT || 3000)
