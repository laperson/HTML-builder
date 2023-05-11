const fs = require('node:fs/promises');
const path = require('path');

async function buildCssBundle() {
  const stylesDir = path.join(__dirname, 'styles');
  const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');

  const styles = await Promise.all(
    (await fs.readdir(stylesDir)).filter(file => path.extname(file) === '.css')
      .map(async file => await fs.readFile(path.join(stylesDir, file), 'utf8'))
  );

  await fs.writeFile(bundlePath, styles.join('\n'));
}

buildCssBundle();