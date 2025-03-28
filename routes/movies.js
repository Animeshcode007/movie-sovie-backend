// backend/routes/movies.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all movies with optional filtering by category
router.get('/', async (req, res) => {
  try {
    const category = req.query.category;
    const query = category 
      ? 'SELECT * FROM movies WHERE category = ?'
      : 'SELECT * FROM movies';
    const [rows] = category
      ? await db.execute(query, [category])
      : await db.execute(query);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single movie by id
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM movies WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Movie not found' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new movie (admin only – for now you can secure this route by IP or secret token)
router.post('/', async (req, res) => {
  try {
    // Simple security: check for a secret key in headers (you can replace with any method)
    if (req.headers['x-admin-secret'] !== 'YOUR_SECRET_KEY') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const { title, genre, category, imdbRating, thumbnail, screenshots, description, downloadLink } = req.body;
    const [result] = await db.execute(
      'INSERT INTO movies (title, genre, category, imdbRating, thumbnail, screenshots, description, downloadLink) VALUES (?,?,?,?,?,?,?,?)',
      [title, genre, category, imdbRating, thumbnail, JSON.stringify(screenshots), description, downloadLink]
    );
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
