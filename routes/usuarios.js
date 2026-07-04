const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const { proteger } = require('../middleware/auth');

// POST /api/usuarios — Crear un usuario
router.post('/', async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const usuario = new Usuario({ nombre, email, password });
    const guardado = await usuario.save();
    res.status(201).json(guardado);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
});

// GET /api/usuarios — Obtener todos los usuarios (protegido)
router.get('/', proteger, async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

// GET /api/usuarios/:id — Obtener un usuario por ID (protegido)
router.get('/:id', proteger, async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

// PUT /api/usuarios/:id — Actualizar un usuario (protegido)
router.put('/:id', proteger, async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const actualizado = await Usuario.findByIdAndUpdate(
      req.params.id,
      { nombre, email, password },
      { new: true, runValidators: true }
    );
    if (!actualizado) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
});

// DELETE /api/usuarios/:id — Eliminar un usuario (protegido)
router.delete('/:id', proteger, async (req, res) => {
  try {
    const eliminado = await Usuario.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

module.exports = router;
