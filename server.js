const express = require('express');
const cors = require('cors');
const moviesRouter = require('./routes/movies');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/movies', moviesRouter);
app.get("/api/movies/:id", (req, res) => {
  const movieId = req.params.id;
  const sql = "SELECT * FROM movies WHERE id = ?";

  db.query(sql, [movieId], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Database error" });
    } else if (result.length > 0) {
      // Ensure JSON response
      let movie = result[0];
      movie.downloadLinks = JSON.parse(movie.downloadLinks || "{}");
      res.json(movie);
    } else {
      res.status(404).json({ error: "Movie not found" });
    }
  });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
