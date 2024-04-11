const express = require('express');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(morgan('dev'));
app.use(helmet());

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
app.get('/board', (req, res) => {
    res.render('board');
});
app.get('/board/:id', (req, res) => {
    res.render('board-detail');
});

app.get('/board/create', (req, res) => {
    res.render('board-create');
});
app.get('/board/update', (req, res) => {
    res.render('board-update');
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
