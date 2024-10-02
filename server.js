const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'dist')));

// The "catchall" handler: for any request that doesn't
// match one above, send back index.html.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
