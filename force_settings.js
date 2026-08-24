const fs = require('fs');

let html = fs.readFileSync('public/bot-cms.html', 'utf8');

// Replace Settings View HTML
const oldSettingsRegex = /<!-- Settings View -->[\s\S]*?<\/button>\s*<\/div>\s*<\/div>\s*<\/div>/;

const newSettings = `                <!-- Settings View -->
                <div id="view-settings" class="d-none">
                    
                    <div class="row g-4">
                        <!-- Left Col: Netflix Prices -->
                        <div class="col-lg-8">
                            <div class="glass-card h-100 border-0 shadow-sm">
                                <div class="d-flex align-items-center mb-4">
                                    <div class="bg-primary bg-opacity-10 text-primary p-2 rounded me-3">
                                        <i class="fas fa-film fs-5"></i>
                                    </div>
                                    <h5 class="fw-bold mb-0">Harga Netflix (Toko 1)</h5>
                                </div>
                                <p class="text-muted small mb-4">Atur harga jual untuk masing-masing durasi paket Netflix Crack.</p>
                                
                                <div class="row g-3">
                                    <div class="col-md-4">
                                        <label class="form-label text-muted fw-bold" style="font-size: 0.8rem;">Paket 1 Hari</label>
                                        <div class="input-group shadow-sm" style="border-radius: 12px; overflow: hidden;">
                                            <span class="input-group-text bg-light border-0 text-muted fw-bold">Rp</span>
                                            <input type="number" class="form-control border-0 bg-white" id="set-day1" placeholder="0">
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <label class="form-label text-muted fw-bold" style="font-size: 0.8rem;">Paket 7 Hari</label>
                                        <div class="input-group shadow-sm" style="border-radius: 12px; overflow: hidden;">
                                            <span class="input-group-text bg-light border-0 text-muted fw-bold">Rp</span>
                                            <input type="number" class="form-control border-0 bg-white" id="set-day7" placeholder="0">
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <label class="form-label text-muted fw-bold" style="font-size: 0.8rem;">Paket 1 Bulan</label>
                                        <div class="input-group shadow-sm" style="border-radius: 12px; overflow: hidden;">
                                            <span class="input-group-text bg-light border-0 text-muted fw-bold">Rp</span>
                                            <input type="number" class="form-control border-0 bg-white" id="set-day30" placeholder="0">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Right Col: Premku Margin -->
                        <div class="col-lg-4">
                            <div class="glass-card h-100 border-0 shadow-sm">
                                <div class="d-flex align-items-center mb-4">
                                    <div class="bg-success bg-opacity-10 text-success p-2 rounded me-3">
                                        <i class="fas fa-link fs-5"></i>
                                    </div>
                                    <h5 class="fw-bold mb-0">Margin Premku</h5>
                                </div>
                                <p class="text-muted small mb-4">Keuntungan statis yang ditambahkan otomatis ke harga asli produk Premku (Toko 2).</p>
                                
                                <label class="form-label text-muted fw-bold" style="font-size: 0.8rem;">Profit / Item</label>
                                <div class="input-group shadow-sm mb-4" style="border-radius: 12px; overflow: hidden;">
                                    <span class="input-group-text bg-light border-0 text-muted fw-bold">Rp</span>
                                    <input type="number" class="form-control border-0 bg-white" id="set-profit" placeholder="Misal: 2000">
                                </div>
                                
                                <button class="btn btn-brand w-100 shadow-sm" style="border-radius: 12px; padding: 12px;" onclick="saveSettings()">
                                    <i class="fas fa-save me-2"></i> Simpan Pengaturan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>`;

if(oldSettingsRegex.test(html)) {
    html = html.replace(oldSettingsRegex, newSettings);
} else {
    console.error("Settings HTML not found!");
}

// Replace loadSettings logic
const oldLoadJS = /async function loadSettings\(\) \{[\s\S]*?catch\(e\) \{\}\s*\}/;
const newLoadJS = `async function loadSettings() {
            try {
                const res = await fetch(\`\${API_BASE}/settings\`, { headers: { 'X-Admin-Key': CMS_KEY } });
                const data = await res.json();
                if(data.ok) {
                    if(data.netflixPrices) {
                        document.getElementById('set-day1').value = data.netflixPrices.day1;
                        document.getElementById('set-day7').value = data.netflixPrices.day7;
                        document.getElementById('set-day30').value = data.netflixPrices.day30;
                    }
                    if(data.profit !== undefined) {
                        document.getElementById('set-profit').value = data.profit;
                    }
                }
            } catch(e) {}
        }`;
if(oldLoadJS.test(html)) html = html.replace(oldLoadJS, newLoadJS);

// Replace saveSettings logic
const oldSaveJS = /async function saveSettings\(\) \{[\s\S]*?alert\('Gagal menyimpan pengaturan'\);\s*\}/;
const newSaveJS = `async function saveSettings() {
            const btn = event.currentTarget;
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Menyimpan...';
            btn.disabled = true;

            const day1 = document.getElementById('set-day1').value;
            const day7 = document.getElementById('set-day7').value;
            const day30 = document.getElementById('set-day30').value;
            const profit = document.getElementById('set-profit').value;
            try {
                await fetch(\`\${API_BASE}/settings\`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'X-Admin-Key': CMS_KEY },
                    body: JSON.stringify({ day1, day7, day30, profit })
                });
                setTimeout(() => {
                    btn.innerHTML = '<i class="fas fa-check-circle me-2"></i> Tersimpan!';
                    btn.classList.replace('btn-brand', 'btn-success');
                    setTimeout(() => {
                        btn.innerHTML = originalHTML;
                        btn.classList.replace('btn-success', 'btn-brand');
                        btn.disabled = false;
                        loadProducts(); // refresh products table immediately to show new margin
                    }, 2000);
                }, 500);
            } catch(e) {
                alert('Gagal menyimpan pengaturan');
                btn.innerHTML = originalHTML;
                btn.disabled = false;
            }
        }`;
if(oldSaveJS.test(html)) html = html.replace(oldSaveJS, newSaveJS);

fs.writeFileSync('public/bot-cms.html', html, 'utf8');
console.log('Force Rebuild Settings UI Complete');
