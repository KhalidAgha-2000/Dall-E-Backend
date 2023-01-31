import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import createError from 'http-errors';
import session from 'express-session';
import cors from 'cors';
import * as dotenv from 'dotenv';
import mongoose from "mongoose";
import bodyparser from "body-parser";
dotenv.config()

var app = express();

import postRouter from './routes/post.js';
import dalleRouter from './routes/dalle.js';
import bodyParser from 'body-parser';


//-------------------------------------Using modules middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true, parameterLimit: '1000000000', limit: '10mb' }));
app.use(cookieParser());
app.use(cors());
app.listen(5000 || process.env.PORT)
// app.use(static(join(__dirname, 'public')));
// app.use('/static', static(join(__dirname, 'public')))

//-------------------------------------Creating a server
var IS_PRODUCTION = app.get('env') === 'production'
if (IS_PRODUCTION) {
    app.set('trust proxy', 1) // secures the app if it is running behind Nginx/Apache/similar
}
app.use(session({
    secret: 'keyword cat', //<-- this should be a secret phrase 
    cookie: { secure: IS_PRODUCTION },//<-- secure only on production 
    resave: true,
    saveUninitialized: true
}))


//-------------------------------------Start Server & Connect to DataBase
app.get('/', async (req, res) => {
    res.send('Dall-E Server ')
})
mongoose.set('strictQuery', true);
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("--------------- Successfully Connected To Database --------------- ");
}).catch(console.error);




// app.use('/users', usersRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/dalle', dalleRouter);


//-------------------------------------Create and error object,catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});


//-------------------------------------Error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500).send({
        success: false,
        message: err.message
    });
});

export default app;
