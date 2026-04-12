const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function replaceColor(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceColor(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('orange')) {
        content = content.replace(/orange/g, 'blue');
        fs.writeFileSync(fullPath, content);
      }
    }
  });
}

replaceColor(srcDir);
console.log('Colors successfully swapped back to a deep blue to match background requirements.');
