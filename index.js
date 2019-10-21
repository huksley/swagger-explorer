const express = require('express')
const app = express()
const swaggerUi = require('swagger-ui-express');
const fs = require("fs")
const path = require("path")

var options = {
    explorer: true,
    swaggerOptions: {
        urls: fs.readdirSync("./swagger").filter(f => f !== "README.md").map(f =>({
            url: "/swagger/" + f,
            name: path.basename(f)
        }))
    }
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, options));
app.use('/swagger', express.static('swagger'))

app.listen(3000)
