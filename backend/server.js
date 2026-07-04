const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const session = require('express-session');
const passport = require('./config/passport');
const conectarDB = require('./config/db');
const usuariosRouter = require('./routes/usuarios');
const authRouter = require('./routes/auth');
const path = require('path');

conectarDB();

const app = express();
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', authRouter);
app.use('/api/usuarios', usuariosRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
