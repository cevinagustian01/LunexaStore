const fs = require('fs');
let html = fs.readFileSync('public/bot-cms.html', 'utf8');

if (html.includes("        }\n        }\n\n        async function loadOrders")) {
    html = html.replace("        }\n        }\n\n        async function loadOrders", "        }\n\n        async function loadOrders");
    fs.writeFileSync('public/bot-cms.html', html, 'utf8');
    console.log("Fixed syntax error");
} else {
    // try different spacing
    html = html.replace(/\s*\}\s*\}\s*async function loadOrders/g, "\n        }\n\n        async function loadOrders");
    fs.writeFileSync('public/bot-cms.html', html, 'utf8');
    console.log("Fixed syntax error with regex");
}
