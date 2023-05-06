const fs = require('node:fs');
const p = require('node:path'); 
 
const stream = fs.createReadStream(p.resolve(__dirname, 'text.txt'));
stream.pipe(process.stdout);