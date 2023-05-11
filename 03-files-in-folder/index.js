const fs = require('node:fs/promises');
const path = require('node:path');

const p = path.resolve(__dirname, 'secret-folder');

fs.readdir(p, { withFileTypes: true })
  .then((files) => {
    files.forEach((file) => {
      if (file.isFile()) {
        fs.stat(path.resolve(p, file.name))
          .then((stats) => {
            const size = stats.size / 1024;
            const name = path.parse(file.name).name;
            const ext = path.parse(file.name).ext.slice(1);
            console.log(`${name}-${ext}-${size.toFixed(3)}kb`);
          });
      }
    });
  });