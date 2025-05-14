const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/api/:path(*)', async (req, res) => {
  try {
    const targetURL = `https://sky.shiiyu.moe/api/${req.params.path}`;
    const response = await axios.get(targetURL, {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: err.message });
  }
});

app.get('/', (req, res) => {
  res.send('Proxy is live');
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`🚀 Proxy running on port ${PORT}`));