// server.js
require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch'); // if node v18+, native fetch is available
const app = express();
const PORT = process.env.PORT || 3000;

const API_KEY = process.env.OPENWEATHER_API_KEY;

app.use(express.static('public')); // serve your frontend files (html, css, js) from 'public' folder

// API proxy route
app.get('/weather', async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  try {
    const apiResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );
    const data = await apiResponse.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
