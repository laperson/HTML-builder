const fs = require('node:fs/promises');
const path = require('node:path');

async function copyDir() {
  const src = path.resolve(__dirname, 'files');
  const trg = path.resolve(__dirname, 'files-copy');

  await fs.mkdir(trg, { recursive: true });

  const files = await fs.readdir(src);

  for (let file of files) {
    const srcPath = path.join(src, file);
    const trgPath = path.join(trg, file);
    const stat = await fs.stat(srcPath);
    if (stat.isDirectory()) {
      await copyDir(srcPath, trgPath);
    } else {
      await fs.copyFile(srcPath, trgPath);
    }
  }

  const trgFiles = await fs.readdir(trg);

  for (let file of trgFiles) {
    const srcPath = path.join(src, file);
    const trgPath = path.join(trg, file);

    try {
      await fs.stat(srcPath);
    } catch (error) {
      if (error.code === 'ENOENT') {
        await fs.unlink(trgPath);
      }
    }
  }
}

copyDir();
