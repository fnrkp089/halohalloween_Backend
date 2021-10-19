const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const userRouter = require('./routers/userRouter');
const postRouter = require('./routers/postRouter');
const replyRouter = require('./routers/replyRouter');
const connect = require('./schemas');

//yamljs & swagger install
const swaggerUi = require('swagger-ui-express');
const yamljs = require('yamljs');

// CORS 
const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connect();
app.use('/user', [userRouter]);
app.use('/post', [postRouter]);
app.use('/reply', [replyRouter]);

//convert yaml to js
const swaggerDoc = yamljs.load('./swagger/api.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
//port
app.listen(port, () => {
    console.log(`Server On http://localhost:${port}`);
});
