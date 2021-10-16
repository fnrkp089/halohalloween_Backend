const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const userRouter = require('./routers/userRouter');
const postRouter = require('./routers/postRouter');
const replyRouter = require('./routers/replyRouter');
const connect = require('./schemas');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const yamljs = require('yamljs');
const swaggerDoc = yamljs.load('./swagger/api.yaml');
const cors = require('cors');

// CORS 


// const whitelist = [process.env.WHITE_LIST];
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("!!!PERMISSION DENIED!!!"));
//     }
//   },
// };

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connect();
app.use('/user', [userRouter]);
app.use('/post', [postRouter]);
app.use('/reply', [replyRouter]);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));


app.listen(port, () => {
    console.log(`Server On http://localhost:${port}`);
});