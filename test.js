const fs = require('fs');

function extractContent(file) {
    const html = fs.readFileSync(file, 'utf8');
    
    // In cms.html and cms-cookies.html, the actual content starts after the Navigation Tabs.
    // The Navigation Tabs usually look like <!-- Navigation Tabs --> ... </div>
    // Then there is <div class="d-flex justify-content-between align-items-end mb-4">
    
    let contentStart = html.indexOf('<div class="d-flex justify-content-between align-items-end mb-4">');
    if (contentStart === -1) {
        // Fallback for my bot-cms.html, but I'll be regenerating it anyway.
        contentStart = html.indexOf('<div class="row g-3 mb-4">');
    }
    
    let contentEnd = html.indexOf('</div> <!-- end container -->');
    if(contentEnd === -1) contentEnd = html.indexOf('</div>\n    </div>'); // guess
    
    // It's tricky to extract cleanly.
    return html;
}
console.log('Script loaded');
