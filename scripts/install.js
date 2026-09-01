const { execSync } = require('child_process');
const path = require('path');

console.log('Starting npm install...');
try {
  const out = execSync('npm.cmd install --legacy-peer-deps --no-fund --no-audit', {
    cwd: path.resolve(__dirname, '..'),
    encoding: 'utf8',
    stdio: 'inherit'
  });
  console.log('npm install finished successfully!');
} catch (err) {
  console.error('npm install encountered an error:', err);
  process.exit(1);
}
