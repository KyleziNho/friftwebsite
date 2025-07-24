const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Building privacy page...');

// Temporarily modify webpack config to build privacy page
const originalIndexJs = fs.readFileSync('src/index.tsx', 'utf8');
const privacyJs = fs.readFileSync('src/privacy.tsx', 'utf8');

// Replace index.tsx with privacy.tsx content
fs.writeFileSync('src/index.tsx', privacyJs);

try {
  // Build the app
  execSync('npm run build', { stdio: 'inherit' });
  
  // Copy the built files to privacy directory
  const buildDir = 'build';
  const privacyDir = path.join(buildDir, 'privacy-temp');
  
  if (!fs.existsSync(privacyDir)) {
    fs.mkdirSync(privacyDir, { recursive: true });
  }
  
  // Copy built files
  fs.copyFileSync(path.join(buildDir, 'index.html'), path.join(buildDir, 'privacy.html'));
  
  console.log('Privacy page built successfully!');
} finally {
  // Restore original index.tsx
  fs.writeFileSync('src/index.tsx', originalIndexJs);
}