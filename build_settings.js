const fs = require('fs');

let html = fs.readFileSync('public/bot-cms.html', 'utf8');

const sidebarMenuToAdd = `
                    <li class="nav-item">
                        <button onclick="switchView('settings')" id="btn-side-settings" class="nav-link fw-bold px-3 py-2 text-start w-100 text-secondary" style="border-radius: 12px; transition: all 0.3s; border: none; background: transparent;">
                            <i class="fas fa-cog me-2" style="width: 20px;"></i> Setting Netflix
                        </button>
                    </li>
                </ul>`;

html = html.replace('</ul>', sidebarMenuToAdd);

const settingsView = `
                <!-- Settings View -->
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
                </div>
            </div>`;

html = html.replace('</div>\n        </div>\n    </div>\n\n    <!-- Product Modal -->', settingsView + '\n        </div>\n    </div>\n\n    <!-- Product Modal -->');

const jsToAdd = `
        function switchView(tab) {
            document.getElementById('btn-side-orders').className = 'nav-link fw-bold px-3 py-2 text-start w-100 text-secondary';
            document.getElementById('btn-side-products').className = 'nav-link fw-bold px-3 py-2 text-start w-100 text-secondary';
            document.getElementById('btn-side-settings').className = 'nav-link fw-bold px-3 py-2 text-start w-100 text-secondary';
            document.getElementById('view-orders').classList.add('d-none');
            document.getElementById('view-products').classList.add('d-none');
            document.getElementById('view-settings').classList.add('d-none');
            
            document.getElementById(\`btn-side-\${tab}\`).className = 'nav-link fw-bold px-3 py-2 text-start w-100 active-link';
            document.getElementById(\`view-\${tab}\`).classList.remove('d-none');
        }

        async function loadSettings() {
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

// replace switchView logic and insert loadSettings calls
html = html.replace(/function switchView\([\s\S]*?classList\.remove\('d-none'\);\n        }/, jsToAdd);

// Find loadProducts(); inside init() and add loadSettings();
html = html.replace('loadProducts();', 'loadProducts();\n                loadSettings();');

fs.writeFileSync('public/bot-cms.html', html, 'utf8');
console.log('Done modifying bot-cms.html');
