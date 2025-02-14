require("express-async-errors");
const migrationsRun = require("./database/sqlite/migrations");

const AppError = require("./Utils/AppError");

const express = require('express');

const app = express();

const routes = require('./routes');

app.use(express.json());
app.use(routes);

migrationsRun();

app.use(( error, request, response, next) => {
    if(error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    }

    console.error(error);

    return response.status(500).json({
        status: "error",
        message: "Internal server error"
    });
});

const port = 3333;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});