const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');

// Middlewares
const errorMiddleware = require("./middlewares/error");
const userRoutes = require("./routes/userRoutes");
const branchRoutes = require("./routes/branchRoutes");
// Initialize Express App
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1", userRoutes);
app.use("/api/v1", branchRoutes);
// Error Handling
app.use(errorMiddleware);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

module.exports = app;
