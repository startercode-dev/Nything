const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const express = require('express');
const morgan = require('morgan'); //LOG the request that happened
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const viewRouter = require('./routes/viewRoutes');
const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');
const forumRouter = require('./routes/forumRoutes');
const commentRouter = require('./routes/commentRoutes');

const app = express();

app.enable('trust proxy');

app.use(expressLayouts);
app.set('layout', './layouts/main-layout.ejs');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serving Static files
app.use(express.static(path.join(__dirname, 'public')));

// 1) GLOBAL MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cookieParser());

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour!',
});
app.use('/api', limiter);

app.use(
  express.json({
    limit: '10kb',
  })
);

//Data Sanitization against NoSQL
app.use(mongoSanitize());

//Data Sanitization against NoS
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// app.options('*', cors());
app.use(cors());
app.options('*', cors());

app.use(compression());

// 3) ROUTES
app.use('/', viewRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/forums', forumRouter);
app.use('/api/v1/comments', commentRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
