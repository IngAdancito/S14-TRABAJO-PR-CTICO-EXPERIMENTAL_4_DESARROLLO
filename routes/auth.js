const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Usuario = require('../models/Usuario');

// Iniciar autenticación con Google
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Callback de Google
router.get('/auth/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id, email: req.user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.redirect(`http://localhost:5000?token=${token}`);
  }
);

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ mensaje: 'Credenciales inválidas' });
    }

    const coincide = await usuario.compararPassword(password);
    if (!coincide) {
      return res.status(400).json({ mensaje: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: usuario._id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      usuario: { id: usuario._id, nombre: usuario.nombre, email: usuario.email }
    });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

module.exports = router;
