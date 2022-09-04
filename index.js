const express = require('express');
var app = express();
const swaggerUi = require(`swagger-ui-express`),
    swaggerDocument = require(`./swagger.json`);

app.use("/api", require("./code/routes"))
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}..`));