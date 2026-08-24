const fs = require('fs');
let html = fs.readFileSync('public/bot-cms.html', 'utf8');

const oldFunc = /function switchView\([\s\S]*?classList\.remove\('d-none'\);\s*}/;

if (oldFunc.test(html)) {
    console.log("Match found");
    const newFunc = `function switchView(tab) {
            document.getElementById('view-orders').classList.add('d-none');
            document.getElementById('view-products').classList.add('d-none');
            document.getElementById('view-settings').classList.add('d-none');
            
            document.getElementById('view-' + tab).classList.remove('d-none');
        }`;
    html = html.replace(oldFunc, newFunc);
    fs.writeFileSync('public/bot-cms.html', html, 'utf8');
} else {
    console.log("Match NOT found");
}
