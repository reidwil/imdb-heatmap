const fs = require('fs');

// Read the script.js file
let script = fs.readFileSync('script.js', 'utf8');

// Replace the placeholder with the actual API key from the environment variable
const apiKey = process.env.OMDB_API_KEY;
script = script.replace('__OMDB_API_KEY__', apiKey);

// Write the updated script back to script.js
fs.writeFileSync('script.js', script);
