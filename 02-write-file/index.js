const fs = require('node:fs');
const readline = require('node:readline');
const p = require('node:path'); 

const stream = fs.createWriteStream(p.resolve(__dirname, 'out.txt'));
console.log('Welcome!');
const rl = readline.createInterface( process.stdin, process.stdout );

rl.on('line', (line) => {
  if (line === 'exit') {
    console.log('Goodbye!');
    rl.close();
    stream.close();
    return;
  }
  stream.write(line + '\n');
});

process.on('SIGINT', () => {
  console.log('Goodbye!');
  rl.close();
  stream.close();
});
