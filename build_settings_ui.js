const fs = require('fs');

let html = fs.readFileSync('public/bot-cms.html', 'utf8');

const oldSettings = `                <!-- Settings View -->
                <div id="view-settings" class="glass-card d-none">
                    <h5 class="fw-bold mb-4"><i class="fas fa-cog me-2"></i>Pengaturan Harga Netflix Crack</h5>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="form-label text-muted small fw-bold">Harga 1 Hari (Rp)</label>
                                <input type="number" class="form-control" id="set-day1" style="border-radius: 12px;">
                            </div>
                            <div class="mb-3">
                                <label class="form-label text-muted small fw-bold">Harga 7 Hari (Rp)</label>
                                <input type="number" class="form-control" id="set-day7" style="border-radius: 12px;">
                            </div>
                            <div class="mb-3">
                                <label class="form-label text-muted small fw-bold">Harga 1 Bulan (Rp)</label>
                                <input type="number" class="form-control" id="set-day30" style="border-radius: 12px;">
                            </div>
                            <button class="btn btn-brand w-100" style="border-radius: 12px;" onclick="saveSettings()">Simpan Pengaturan</button>
                        </div>
                    </div>
                </div>`;

const newSettings = `                <!-- Settings View -->
                <div id="view-settings" class="d-none">
                    
                    <div class="row g-4">
                        <!-- Left Col: Netflix Prices -->
                        <div class="col-lg-8">
                            <div class="glass-card h-100">
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
                            <div class="glass-card h-100">
                                <div class="d-flex align-items-center mb-4">
                                    <div class="bg-success bg-opacity-10 text-success p-2 rounded me-3">
                                        <i class="fas fa-link fs-5"></i>
                                    </div>
                                    <h5 class="fw-bold mb-0">Margin Premku</h5>
                                </div>
                                <p class="text-muted small mb-4">Keuntungan statis yang ditambahkan otomatis ke harga asli produk Premku.</p>
                                
                                <label class="form-label text-muted fw-bold" style="font-size: 0.8rem;">Profit / Item</label>
                                <div class="input-group shadow-sm mb-4" style="border-radius: 12px; overflow: hidden;">
                                    <span class="input-group-text bg-light border-0 text-muted fw-bold">Rp</span>
                                    <input type="number" class="form-control border-0 bg-white" id="set-profit" placeholder="Misal: 2000">
                                </div>
                                
                                <button class="btn btn-brand w-100 shadow-sm" style="border-radius: 12px; padding: 12px;" onclick="saveSettings()">
                                    <i class="fas fa-save me-2"></i> Simpan Semua Pengaturan
                                </button>
                            </div>
                        </div>
                    </div>

                </div>`;

html = html.replace(oldSettings, newSettings);

// Update loadSettings and saveSettings logic
const oldJS = `        async function loadSettings() {
            try {
                const res = await fetch(\`\${API_BASE}/settings\`, { headers: { 'X-Admin-Key': CMS_KEY } });
                const data = await res.json();
                if(data.ok && data.netflixPrices) {
                    document.getElementById('set-day1').value = data.netflixPrices.day1;
                    document.getElementById('set-day7').value = data.netflixPrices.day7;
                    document.getElementById('set-day30').value = data.netflixPrices.day30;
                }
            } catch(e) {}
        }

        async function saveSettings() {
            const day1 = document.getElementById('set-day1').value;
            const day7 = document.getElementById('set-day7').value;
            const day30 = document.getElementById('set-day30').value;
            try {
                await fetch(\`\${API_BASE}/settings\`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'X-Admin-Key': CMS_KEY },
                    body: JSON.stringify({ day1, day7, day30 })
                });
                alert('Pengaturan harga Netflix berhasil disimpan!');
            } catch(e) {
                alert('Gagal menyimpan pengaturan');
            }
        }`;

const newJS = `        async function loadSettings() {
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
        }

        async function saveSettings() {
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

html = html.replace(oldJS, newJS);

fs.writeFileSync('public/bot-cms.html', html, 'utf8');
console.log('UI Rebuild Complete');
