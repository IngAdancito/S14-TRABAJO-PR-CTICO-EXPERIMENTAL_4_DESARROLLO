const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Usuario = require('../models/Usuario');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let usuario = await Usuario.findOne({ email: profile.emails[0].value });

    if (!usuario) {
      usuario = await Usuario.create({
        nombre: profile.displayName,
        email: profile.emails[0].value,
        password: 'google_oauth_' + Math.random().toString(36)
      });
    }

    done(null, usuario);
  } catch (error) {
    done(error, null);
  }
}));

passport.serializeUser((usuario, done) => {
  done(null, usuario.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const usuario = await Usuario.findById(id);
    done(null, usuario);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
