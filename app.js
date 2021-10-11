const express = require('express');
const app = express();
require('dotenv').config();
const port = 3000;
const userRouter = require('./routers/userRouter');

// CORS 처리
const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/',[userRouter]);

app.listen(port, () => {
	console.log(`Server start at http://localhost:${port}`);
});