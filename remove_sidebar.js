const fs = require('fs');
let html = fs.readFileSync('public/bot-cms.html', 'utf8');

// Remove sidebar CSS
const oldCss = `.main-content {
            margin-left: 260px;
            padding: 30px;
            width: calc(100% - 260px);
            min-height: 100vh;
        }`;
const newCss = `.main-content {
            padding: 30px 20px;
            width: 100%;
            max-width: 1300px;
            margin: 0 auto;
            min-height: 100vh;
        }`;
html = html.replace(oldCss, newCss);

// Remove the entire Sidebar div
const sidebarRegex = /<!-- Sidebar -->[\s\S]*?<!-- Main Content -->/;
html = html.replace(sidebarRegex, '<!-- Main Content -->');

// Also remove .sidebar class from style if it exists
html = html.replace(/\.sidebar \{[\s\S]*?\}\s*/, '');

fs.writeFileSync('public/bot-cms.html', html, 'utf8');
console.log('Sidebar removed');
