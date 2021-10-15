const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const userRouter = require('./routers/userRouter');
const postRouter = require('./routers/postRouter');
const replyRouter = require('./routers/replyRouter');
const connect = require('./schemas');
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output");
// CORS 
const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connect();
app.use('/user', [userRouter]);
app.use('/post', [postRouter]);
app.use('/reply', [replyRouter]);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(port, () => {
    console.log(`Server On http://localhost:${port}`);
});