const fs = require('fs');

const cmsHtml = fs.readFileSync('public/cms.html', 'utf8');
const botHtml = fs.readFileSync('public/bot-cms.html', 'utf8');

// 1. Get the top part of cms.html
const splitToken = '<!-- Navigation Tabs -->';
const topPart = cmsHtml.split(splitToken)[0];

const newTabs = `
        <!-- Navigation Tabs -->
        <div class="d-flex mb-4 gap-2 border-bottom pb-3 flex-wrap justify-content-center">
            <a href="cms.html" class="btn btn-outline-brand" id="tab-cms" style="border-radius: 20px; text-decoration: none;"><i class="fas fa-shopping-cart me-2"></i>Data Transaksi</a>
            <a href="cms-cookies.html" class="btn btn-outline-brand" id="tab-cookies" style="border-radius: 20px; text-decoration: none;"><i class="fas fa-cookie-bite me-2"></i>Data Cookies</a>
            <a href="bot-cms.html" class="btn btn-brand" id="tab-bot" style="border-radius: 20px; text-decoration: none;"><i class="fas fa-robot me-2"></i>Bot Dashboard</a>
        </div>
`;

// 2. We want everything from <div id="login-screen"> to the end of the file from bot-cms.html
// This will include login screen, dashboard-content, product modal, and script.
const contentStart = botHtml.indexOf('<div id="login-screen"');
if (contentStart === -1) {
    console.error("Could not find login-screen");
    process.exit(1);
}
let mainContent = botHtml.substring(contentStart);

// We need to close the .container-fluid div before the product modal
mainContent = mainContent.replace('<!-- Product Modal -->', '</div> <!-- end container -->\n    <!-- Product Modal -->');

const fullNewBotHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bot Dashboard | LUNEXA CMS</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --primary: #ff4b82;
            --secondary: #ff7eb3;
            --bg-color: #fff0f5;
            --card-bg: rgba(255, 255, 255, 0.95);
            --text-main: #4a4a4a;
            --border-color: #ffe4e1;
        }
        body {
            background: linear-gradient(135deg, #fff5f8 0%, #ffe4e1 100%);
            color: var(--text-main);
            font-family: 'Inter', 'Segoe UI', Tahoma, sans-serif;
            min-height: 100vh;
        }
        .navbar-custom {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            padding: 15px 30px;
            box-shadow: 0 4px 30px rgba(255, 75, 130, 0.1);
            margin-bottom: 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid var(--border-color);
        }
        .brand-header {
            color: var(--primary);
            font-weight: 800;
            letter-spacing: 1px;
            margin: 0;
        }
        .glass-card {
            background: var(--card-bg);
            border-radius: 20px;
            border: 1px solid var(--border-color);
            box-shadow: 0 8px 32px rgba(255, 75, 130, 0.05);
            backdrop-filter: blur(10px);
            padding: 25px;
        }
        .btn-brand {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            border: none;
            color: white;
            font-weight: 600;
        }
        .btn-brand:hover {
            opacity: 0.9;
            color: white;
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(255, 75, 130, 0.3);
        }
        .btn-outline-brand {
            border: 2px solid var(--primary);
            color: var(--primary);
            font-weight: 600;
            background: transparent;
        }
        .btn-outline-brand:hover {
            background: var(--primary);
            color: white;
        }
    </style>
</head>
<body>

    <div id="app">
        <!-- Top Navbar -->
        <div class="navbar-custom">
            <h3 class="brand-header"><i class="fas fa-chart-line me-2"></i>LUNEXA CMS</h3> 
            <div class="fw-bold text-muted" style="font-size: 0.9rem;">
                <i class="fas fa-user-circle me-2"></i> Administrator
            </div>
        </div>

        <div class="container-fluid" style="max-width: 1400px; padding: 0 30px;">
            ${newTabs}

            ${mainContent}
`;

fs.writeFileSync('public/bot-cms.html', fullNewBotHtml, 'utf8');
console.log('Final fix applied');
