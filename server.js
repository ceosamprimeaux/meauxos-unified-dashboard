// Simple server for Cloud Run - serves Next.js static export
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;
const directory = path.join(__dirname, 'out');

// Serve static files
app.use(express.static(directory));

// Handle client-side routing (SPA) - all routes serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(directory, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Serving files from: ${directory}`);
});
