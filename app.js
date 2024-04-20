const express = require('express');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(morgan('dev'));
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                connectSrc: ["'self'", 'http://localhost:5000'],
                imgSrc: ["'self'", 'http://localhost:5000', 'data:'],
            },
        },
        crossOriginResourcePolicy: false,
    })
);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/login', (req, res) => {
    res.render('login');
});
app.get('/register', (req, res) => {
    res.render('register');
});
app.get('/user/update', (req, res) => {
    res.render('user-update');
});

app.get('/user/password', (req, res) => {
    res.render('password-update');
});

app.get('/post', (req, res) => {
    res.render('post');
});

app.get('/post/create', (req, res) => {
    res.render('post-upload');
});
app.get('/post/:id/update', (req, res) => {
    res.render('post-update');
});
app.get('/post/:id', (req, res) => {
    res.render('post-detail');
});

app.all('*', (req, res) => {
    res.status(404).json({
        status: 'fail',
        message: `Can't find ${req.originalUrl} on this server`,
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`app listening on http://localhost:${port}`);
});
