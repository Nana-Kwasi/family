/**
 * Mirrors src/site-content/*.json → public/site-content/ so runtime fetch works
 * and you can swap JSON on the server without rebuilding the JS bundle.
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const srcDir = path.join(root, 'src', 'site-content');
const destDir = path.join(root, 'public', 'site-content');

if (!fs.existsSync(srcDir)) {
  process.exit(0);
}

fs.mkdirSync(destDir, { recursive: true });
for (const f of fs.readdirSync(srcDir)) {
  if (f.endsWith('.json')) {
    fs.copyFileSync(path.join(srcDir, f), path.join(destDir, f));
  }
}
