// Script to update React packages to compatible versions
const fs = require('fs');
const path = require('path');

// Read current package.json
const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Update React packages to compatible versions
const updates = {
  'react': '^19.2.0',
  'react-dom': '^19.2.0',
  'react-native': '^0.86.0',
  'react-native-safe-area-context': '^5.6.2',
  'react-native-screens': '^4.23.0',
  'react-native-web': '^0.21.0',
  '@types/react': '~19.2.10'
};

// Apply updates
Object.keys(updates).forEach(packageName => {
  if (packageJson.dependencies[packageName]) {
    packageJson.dependencies[packageName] = updates[packageName];
    console.log(`Updated ${packageName}: ${packageJson.dependencies[packageName]} -> ${updates[packageName]}`);
  }
});

// Write updated package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
console.log('✅ Package.json updated successfully!');
console.log('Run "npm install" to apply changes');
