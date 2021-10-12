const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const userRouter = require('./routers/userRouter');
const connect = require('./schemas');
// CORS 
const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connect();
app.use('/user',[userRouter]);

app.listen(port, () => {
	console.log(`Server On http://localhost:${port}`);
});