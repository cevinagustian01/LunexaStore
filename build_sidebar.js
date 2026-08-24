const fs = require('fs');

const sidebarHtml = (activeId) => `
      <div class="d-flex" style="min-height: 100vh; width: 100%;">
          <!-- Sidebar -->
          <div class="sidebar shadow-sm" style="width: 260px; background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); border-right: 1px solid var(--border-color); position: fixed; height: 100vh; overflow-y: auto; z-index: 1050; display: flex; flex-direction: column;">
              <div class="p-4 border-bottom">
                  <h4 class="fw-bold mb-0" style="color: var(--primary); letter-spacing: 1px;"><i class="fas fa-chart-line me-2"></i>LUNEXA CMS</h4>
              </div>
              
              <div class="p-3 flex-grow-1">
                  <div class="text-muted small fw-bold mb-3 ms-2 text-uppercase" style="letter-spacing: 1px; font-size: 0.75rem;">Layanan CMS</div>
                  <ul class="nav flex-column gap-2 mb-4">
                      <li class="nav-item">
                          <a href="cms.html" class="nav-link fw-bold px-3 py-2 \${activeId === 'cms' ? 'active-link' : 'text-secondary'}" style="border-radius: 12px; transition: all 0.3s;">
                              <i class="fas fa-shopping-cart me-2" style="width: 20px;"></i> Data Transaksi
                          </a>
                      </li>
                      <li class="nav-item">
                          <a href="cms-cookies.html" class="nav-link fw-bold px-3 py-2 \${activeId === 'cookies' ? 'active-link' : 'text-secondary'}" style="border-radius: 12px; transition: all 0.3s;">
                              <i class="fas fa-cookie-bite me-2" style="width: 20px;"></i> Data Cookies
                          </a>
                      </li>
                  </ul>

                  <div class="text-muted small fw-bold mb-3 ms-2 text-uppercase" style="letter-spacing: 1px; font-size: 0.75rem;">Telegram Bot</div>
                  <ul class="nav flex-column gap-2">
                      <li class="nav-item">
                          <a href="bot-transaksi.html" class="nav-link fw-bold px-3 py-2 \${activeId === 'bot-trans' ? 'active-link' : 'text-secondary'}" style="border-radius: 12px; transition: all 0.3s;">
                              <i class="fas fa-robot me-2" style="width: 20px;"></i> Transaksi Bot
                          </a>
                      </li>
                      <li class="nav-item">
                          <a href="bot-produk.html" class="nav-link fw-bold px-3 py-2 \${activeId === 'bot-prod' ? 'active-link' : 'text-secondary'}" style="border-radius: 12px; transition: all 0.3s;">
                              <i class="fas fa-box-open me-2" style="width: 20px;"></i> Produk (Toko 2)
                          </a>
                      </li>
                  </ul>
              </div>
              
              <div class="p-4 border-top text-center">
                  <div class="d-flex align-items-center justify-content-center mb-3">
                      <i class="fas fa-user-circle fs-2 text-muted me-2"></i>
                      <div class="text-start">
                          <div class="fw-bold text-dark" style="font-size: 0.9rem;">Administrator</div>
                          <div class="text-success small"><i class="fas fa-circle me-1" style="font-size: 0.5rem;"></i>Online</div>
                      </div>
                  </div>
                  <button onclick="doLogout ? doLogout() : (typeof logout !== 'undefined' ? logout() : null)" class="btn btn-outline-danger btn-sm w-100" style="border-radius: 12px; font-weight: 600;">
                      <i class="fas fa-sign-out-alt me-1"></i> Logout
                  </button>
              </div>
          </div>

          <!-- Main Content -->
          <div class="main-content flex-grow-1" style="margin-left: 260px; padding: 30px; width: calc(100% - 260px); min-height: 100vh;">
`;

const cssInject = `
    <style>
        .active-link {
            background: linear-gradient(135deg, var(--primary), #ff758c) !important;
            color: white !important;
            box-shadow: 0 4px 15px rgba(255, 75, 130, 0.3);
        }
        .nav-link:hover:not(.active-link) {
            background: rgba(255, 75, 130, 0.1);
            color: var(--primary) !important;
        }
        .navbar-custom { display: none !important; } /* Hide old navbar */
    </style>
`;

function processFile(filename, activeId) {
    let html = fs.readFileSync(filename, 'utf8');
    
    // Inject custom CSS
    if (!html.includes('.active-link')) {
        html = html.replace('</head>', cssInject + '\n</head>');
    }
    
    // Replace old structure
    if (html.includes('<!-- Top Navbar -->')) {
        const topNavRegex = /<!-- Top Navbar -->[\s\S]*?(?=<div class="container)/;
        html = html.replace(topNavRegex, sidebarHtml(activeId));
        
        // Remove old Navigation Tabs
        html = html.replace(/<!-- Navigation Tabs -->[\s\S]*?<\/div>/, '');
        
        // Replace container with container-fluid
        html = html.replace(/<div class="container" style="max-width: 1200px;">/, '<div class="container-fluid p-0">');
        
        // Close the sidebar and main-content divs before scripts
        html = html.replace(/<script src="https:\/\/cdn\.jsdelivr\.net/, '</div></div>\n    <script src="https://cdn.jsdelivr.net');
    }
    
    fs.writeFileSync(filename, html, 'utf8');
}

// Ensure bot-transaksi and bot-produk exist from bot-cms
if (fs.existsSync('public/bot-cms.html')) {
    let botHtml = fs.readFileSync('public/bot-cms.html', 'utf8');
    
    // Split into trans and prod manually
    // We can just duplicate bot-cms.html, rename them, then run processFile, and then hide/remove unnecessary parts
    fs.writeFileSync('public/bot-transaksi.html', botHtml, 'utf8');
    fs.writeFileSync('public/bot-produk.html', botHtml, 'utf8');
    
    // Cleanup bot-transaksi.html
    let tHtml = fs.readFileSync('public/bot-transaksi.html', 'utf8');
    tHtml = tHtml.replace(/<!-- Sub Navigation Tabs for Bot Dashboard -->[\s\S]*?<\/div>/, ''); // remove tabs
    tHtml = tHtml.replace(/id="view-products" class="glass-card d-none"/, 'id="view-products" class="d-none"');
    tHtml = tHtml.replace(/<div class="d-flex justify-content-between align-items-end mb-4">[\s\S]*?<\/div>/, `<div class="mb-4">
                <h3 class="fw-bold" style="color: var(--primary);">Transaksi Bot</h3>
                <p class="text-muted mb-0">Kelola riwayat pesanan dari Telegram Bot.</p>
            </div>`);
    tHtml = tHtml.replace('function switchView', '// function switchView');
    fs.writeFileSync('public/bot-transaksi.html', tHtml, 'utf8');
    
    // Cleanup bot-produk.html
    let pHtml = fs.readFileSync('public/bot-produk.html', 'utf8');
    pHtml = pHtml.replace(/<!-- Sub Navigation Tabs for Bot Dashboard -->[\s\S]*?<\/div>/, ''); // remove tabs
    pHtml = pHtml.replace(/<!-- Stats -->[\s\S]*?<!-- Orders View -->/s, '<!-- Orders View -->');
    pHtml = pHtml.replace(/id="view-orders" class="glass-card"/, 'id="view-orders" class="d-none"');
    pHtml = pHtml.replace(/id="view-products" class="glass-card d-none"/, 'id="view-products" class="glass-card"');
    pHtml = pHtml.replace(/<div class="d-flex justify-content-between align-items-end mb-4">[\s\S]*?<\/div>/, `<div class="mb-4">
                <h3 class="fw-bold" style="color: var(--primary);">Produk Bot (Toko 2)</h3>
                <p class="text-muted mb-0">Kelola stok dan harga produk Telegram Bot.</p>
            </div>`);
    fs.writeFileSync('public/bot-produk.html', pHtml, 'utf8');
    
    // Delete old bot-cms
    fs.unlinkSync('public/bot-cms.html');
}

processFile('public/cms.html', 'cms');
processFile('public/cms-cookies.html', 'cookies');
if(fs.existsSync('public/bot-transaksi.html')) processFile('public/bot-transaksi.html', 'bot-trans');
if(fs.existsSync('public/bot-produk.html')) processFile('public/bot-produk.html', 'bot-prod');

