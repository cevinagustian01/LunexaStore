const fs = require('fs');
let html = fs.readFileSync('public/bot-cms.html', 'utf8');

const regex = /function switchView\([\s\S]*?classList\.remove\('d-none'\);\n        }/;
const newSwitchView = `function switchView(tab) {
            document.getElementById('view-orders').classList.add('d-none');
            document.getElementById('view-products').classList.add('d-none');
            document.getElementById('view-settings').classList.add('d-none');
            
            document.getElementById(\`view-\${tab}\`).classList.remove('d-none');
        }`;

html = html.replace(regex, newSwitchView);
fs.writeFileSync('public/bot-cms.html', html, 'utf8');
console.log("Fixed switchView logic");
