var createError = require('http-errors');
var express = require('express');
const session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const Esdeveniment = require('./models/esdeveniments')
const Opinion = require('./models/opinions')
const Recinte = require('./models/recintes')
const Reserva = require('./models/reservas')
const Usuari = require ('./models/usuaris')

mongoose.connect('mongodb://127.0.0.1:27017/db_catskills');
const dbMongoose = mongoose.connection;
dbMongoose.once('open', function () {
    console.log('OK')
})


/*
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
 */

var app = express();

/*
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
 */


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*
app.use('/', indexRouter);
app.use('/users', usersRouter);
 */

module.exports = app;




app.use(session({
    secret: '440677', // Replace with your own secret key
    resave: false,
    saveUninitialized: false
}));

// Define a login route
app.post('/login', async (req, res) => {
    const { nom, password } = req.body;

    // Perform your authentication logic here
    // Retrieve the user from your MongoDB database based on the username
    const user = await Usuari.findOne({ nom });
    const hashedPassword = await bcrypt.hash(password, 10);

    if (!user) {
        res.status(401).send('Invalid credentials');
        return;
    }

    // Compare the password provided with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
        req.session.isLoggedIn = true;
        res.cookie('username', nom, { maxAge: 86400000 }); // Set a cookie with the username (adjust the maxAge as desired)
        res.send('Login successful!');
    } else {
        res.status(401).send('Invalid credentials');
    }
});

// Define a logout route
app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
            res.status(500).send('Error occurred during logout');
        } else {
            res.clearCookie('username'); // Clear the username cookie
            res.send('Logout successful!');
        }
    });
});




//GET OPINIONS
app.get('/api/opinions/', async (req, res) => {
    let filter = {}
    try {
        const opinions = await Opinion.find(filter)
        res.json({'opinions': opinions});

        console.log(opinions);
    } catch (error) {
        console.error('Error en la obtenció de les opinions', error.message);
        res.send(error);
    }
});
//GET OPINION + ID
app.get('/api/opinions/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const opinionArr = await Opinion.find({ _id: id }).populate('user_id').populate('esdeveniment_id');
        const opinion = opinionArr[0];
        res.json({ opinions : opinion });
    } catch (error) {
        console.error('Error en la obtenció de la opinió', error.message);
        res.send(error);
    }
});
// ADD OPINION
app.post('/api/opinions/', async (req, res) => {
    try {
        let params = req.body;
        const opinion = await Opinion.create(params);
        res.send(opinion);
    } catch (error) {
        console.log(error);
    }
});

// MODIFY OPINION
app.post('/api/opinions/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const opinion = req.body;
        const opinionUpdated = await Opinion.findOneAndUpdate({ _id: id }, opinion);
        res.json(opinionUpdated);
    } catch (error) {
        console.log(error);
    }
});

// DELETE OPINION
app.delete('/api/opinions/:id', async function (req, res) {
    try {
        const id = req.params.id;
        const borrar = await Opinion.deleteOne({ _id: id });
        res.json(borrar);
    } catch (error) {
        console.log(error);
    }
});

// GET ESDEVENIMENTS
app.get('/api/esdeveniments/', async (req, res) => {
    let filter = {}
    try {
        const esdeveniments = await Esdeveniment.find(filter)
        res.json({'esdeveniments':esdeveniments});
    } catch (error) {
        console.error('Error en la obtenció dels esdeveniments', error.message);
        res.send(error);
    }
});

//GET ESDEVENIMENTS + ID
app.get('/api/esdeveniments/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const esdevenimentArr = await Esdeveniment.find({ _id: id }).populate('nomRecinte');
        const esdeveniment = esdevenimentArr[0];
        res.json({ esdeveniments : esdeveniment });
    } catch (error) {
        console.error('Error en la obtenció del esdeveniments', error.message);
        res.send(error);
    }
});

//GET RECINTES
app.get('/api/recintes/', async (req, res) => {
    let filter = {}
    try {
        const recintes = await Recinte.find(filter)
        res.send({'recintes': recintes});

        console.log(recintes);
    } catch (error) {
        console.error('Error en la obtenció dels recintes', error.message);
        res.send(error);
    }
});
//GET RECINTES + ID
app.get('/api/recintes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const recintesArr = await Recinte.find({ _id: id });
        const recintes = recintesArr[0];
        res.json({ recintes : recintes });
    } catch (error) {
        console.error('Error en la obtenció del recinte', error.message);
        res.send(error);
    }
});

// GET RESERVAS
app.get('/api/reservas/', async (req, res) => {
    let filter = {}
    try {
        const reservas = await Reserva.find(filter)
        res.send({'reservas': reservas});

        console.log(reservas);
    } catch (error) {
        console.error('Error en la obtenció de les reserves', error.message);
        res.send(error);
    }
});
// GET RESERVA + ID
app.get('/api/reservas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const reservaArr = await Reserva.find({ _id: id }).populate('user_id').populate('esdeveniment_id');
        const reservas = reservaArr[0];
        res.json({ reservas : reservas });
    } catch (error) {
        console.error('Error en la obtenció de la reserva', error.message);
        res.send(error);
    }
});
// ADD RESERVA
app.post('/api/reservas/', async (req, res) => {
    try {
        let params = req.body;
        const reserva = await Reserva.create(params);
        res.send(reserva);
    } catch (error) {
        console.log(error);
    }
});

// MODIFY RESERVA
app.post('/api/reservas/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const reserva = req.body;
        const reservaUpdated = await Reserva.findOneAndUpdate({ _id: id }, reserva);
        res.json(reservaUpdated);
    } catch (error) {
        console.log(error);
    }
});

// DELETE RESERVA
app.delete('/api/reservas/:id', async function (req, res) {
    try {
        const id = req.params.id;
        const borrar = await Reserva.deleteOne({ _id: id });
        res.json(borrar);
    } catch (error) {
        console.log(error);
    }
});

// GET USUARIS
app.get('/api/usuaris/', async (req, res) => {
    let filter = {}
    try {
        const usuaris = await Usuari.find(filter)
        res.send({'usuaris': usuaris});

    } catch (error) {
        console.error('Error en la obtenció dels usuaris', error.message);
        res.send(error);
    }
});
//GET USUARI + ID
app.get('/api/usuaris/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const usuarisArr = await Usuari.find({ _id: id });
        const usuaris = usuarisArr[0];
        res.json({ usuaris : usuaris });
    } catch (error) {
        console.error('Error en la obtenció del usuari', error.message);
        res.send(error);
    }
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
