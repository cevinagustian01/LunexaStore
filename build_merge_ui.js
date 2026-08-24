const fs = require('fs');

const cmsHtml = fs.readFileSync('public/cms.html', 'utf8');
const topPart = cmsHtml.split('<!-- Navigation Tabs -->')[0];

const newTabs = `
        <!-- Navigation Tabs -->
        <div class="d-flex mb-4 gap-2 border-bottom pb-3 flex-wrap justify-content-center">
            <a href="cms.html" class="btn btn-outline-brand" id="tab-cms" style="border-radius: 20px; text-decoration: none;"><i class="fas fa-shopping-cart me-2"></i>Data Transaksi</a>
            <a href="cms-cookies.html" class="btn btn-outline-brand" id="tab-cookies" style="border-radius: 20px; text-decoration: none;"><i class="fas fa-cookie-bite me-2"></i>Data Cookies</a>
            <a href="bot-cms.html" class="btn btn-outline-brand" id="tab-bot" style="border-radius: 20px; text-decoration: none;"><i class="fas fa-robot me-2"></i>Bot Dashboard</a>
        </div>
`;

// ---------------------------------------------------------
// GENERATE bot-cms.html
// ---------------------------------------------------------
const botBody = `
        <div class="d-flex justify-content-between align-items-end mb-4">
            <div>
                <h2 class="fw-bold" style="color: var(--primary);">Bot Dashboard</h2>
                <p class="text-muted mb-0">Kelola riwayat pesanan dan stok Telegram Bot.</p>
            </div>
            <button onclick="logout()" class="btn btn-outline-danger" style="border-radius: 20px; font-weight: 600;"><i class="fas fa-sign-out-alt me-2"></i>Logout</button>
        </div>

        <div id="login-screen" class="glass-card text-center p-5 mb-4" style="max-width: 500px; margin: 0 auto; display: none;">
            <div class="mb-4">
                <i class="fas fa-lock text-muted mb-3" style="font-size: 3rem;"></i>
                <h4 class="fw-bold">Akses Admin</h4>
                <p class="text-muted small">Masukkan Kunci Keamanan Admin</p>
            </div>
            <input type="password" id="admin-key" class="form-control text-center mb-3" placeholder="••••••••" style="border-radius: 20px; padding: 10px;" onkeypress="if(event.key === 'Enter') login()">
            <button class="btn btn-brand w-100" style="border-radius: 20px;" onclick="login()">Login Akses</button>
            <p id="login-msg" class="text-danger mt-3 mb-0 fw-bold small"></p>
        </div>

        <div id="dashboard-content" class="d-none">
            <!-- Stats -->
            <div class="row g-3 mb-4">
                <div class="col-md-4">
                    <div class="glass-card text-center">
                        <h6 class="text-muted"><i class="fas fa-users me-2"></i>Total Users</h6>
                        <h2 class="fw-bold" id="stat-users" style="color: var(--primary);">-</h2>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="glass-card text-center">
                        <h6 class="text-muted"><i class="fas fa-shopping-bag me-2"></i>Total Orders</h6>
                        <h2 class="fw-bold" id="stat-orders" style="color: #2ea043;">-</h2>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="glass-card text-center">
                        <h6 class="text-muted"><i class="fas fa-wallet me-2"></i>Total Revenue</h6>
                        <h2 class="fw-bold" id="stat-rev" style="color: #e3b341;">-</h2>
                    </div>
                </div>
            </div>

            <!-- Sub Navigation Tabs for Bot Dashboard -->
            <div class="d-flex mb-4 gap-2 flex-wrap">
                <button class="btn btn-brand" id="btn-tab-orders" onclick="switchView('orders')" style="border-radius: 20px;"><i class="fas fa-history me-2"></i>Riwayat Transaksi Bot</button>
                <button class="btn btn-outline-brand" id="btn-tab-products" onclick="switchView('products')" style="border-radius: 20px;"><i class="fas fa-box-open me-2"></i>Produk Toko 2</button>
            </div>

            <!-- Orders View -->
            <div id="view-orders" class="glass-card">
                <div class="table-responsive">
                    <table class="table table-hover align-middle">
                        <thead style="background: rgba(255, 75, 130, 0.1);">
                            <tr>
                                <th class="border-0">Ref ID</th>
                                <th class="border-0">User ID</th>
                                <th class="border-0">Produk</th>
                                <th class="border-0">Total</th>
                                <th class="border-0">Status</th>
                                <th class="border-0">Tanggal</th>
                            </tr>
                        </thead>
                        <tbody id="orders-tbody" class="border-top-0">
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Products View -->
            <div id="view-products" class="glass-card d-none">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h5 class="fw-bold mb-0"></h5>
                    <button class="btn btn-brand btn-sm" style="border-radius:20px;" onclick="showAddModal()"><i class="fas fa-plus me-1"></i> Tambah Produk</button>
                </div>
                <div class="table-responsive">
                    <table class="table table-hover align-middle">
                        <thead style="background: rgba(255, 75, 130, 0.1);">
                            <tr>
                                <th class="border-0">ID</th>
                                <th class="border-0">Kategori</th>
                                <th class="border-0">Nama Produk</th>
                                <th class="border-0">Harga</th>
                                <th class="border-0">Status</th>
                                <th class="border-0 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody id="products-tbody" class="border-top-0">
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div> <!-- end container -->

    <!-- Product Modal -->
    <div class="modal fade" id="productModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content" style="border-radius: 20px; border: none; background: var(--bg-color);">
          <div class="modal-header border-0 pb-0">
            <h5 class="modal-title fw-bold" id="modal-title">Tambah Produk</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <input type="hidden" id="prod-id">
            <div class="mb-3">
                <label class="form-label text-muted small fw-bold">Kategori ID</label>
                <input type="text" class="form-control" id="prod-cat" style="border-radius: 15px;">
            </div>
            <div class="mb-3">
                <label class="form-label text-muted small fw-bold">Nama Produk</label>
                <input type="text" class="form-control" id="prod-name" style="border-radius: 15px;">
            </div>
            <div class="mb-3">
                <label class="form-label text-muted small fw-bold">Harga (Rp)</label>
                <input type="number" class="form-control" id="prod-price" style="border-radius: 15px;">
            </div>
            <div class="mb-3">
                <label class="form-label text-muted small fw-bold">Data (Diberikan ke pembeli)</label>
                <textarea class="form-control" id="prod-data" rows="3" style="border-radius: 15px;"></textarea>
            </div>
            <div class="form-check d-none" id="div-sold">
              <input class="form-check-input" type="checkbox" id="prod-sold">
              <label class="form-check-label text-muted small fw-bold">Tandai Terjual (Sold)</label>
            </div>
          </div>
          <div class="modal-footer border-0 pt-0">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal" style="border-radius: 15px;">Batal</button>
            <button type="button" class="btn btn-brand" onclick="saveProduct()" style="border-radius: 15px;">Simpan</button>
          </div>
        </div>
      </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        document.getElementById('tab-bot').className = 'btn btn-brand';

        let CMS_KEY = localStorage.getItem('adminKey') || '';
        const API_BASE = '/api/bot';

        async function login() {
            const key = document.getElementById('admin-key').value;
            if(!key) return;
            document.getElementById('login-msg').textContent = 'Checking...';
            CMS_KEY = key;
            try {
                const res = await fetch(\`\${API_BASE}/stats\`, { headers: { 'X-Admin-Key': CMS_KEY } });
                if(res.ok) {
                    localStorage.setItem('adminKey', CMS_KEY);
                    location.reload();
                } else {
                    document.getElementById('login-msg').textContent = 'Invalid Admin Key';
                    CMS_KEY = '';
                }
            } catch(e) {
                document.getElementById('login-msg').textContent = 'Server Bot Error.';
            }
        }

        function logout() {
            localStorage.removeItem('adminKey');
            location.reload();
        }

        let allProducts = {};
        let productModal;
        document.addEventListener("DOMContentLoaded", () => {
            productModal = new bootstrap.Modal(document.getElementById('productModal'));
        });

        async function init() {
            if(!CMS_KEY) {
                document.getElementById('login-screen').style.display = 'block';
                return;
            }
            try {
                const res = await fetch(\`\${API_BASE}/stats\`, { headers: { 'X-Admin-Key': CMS_KEY } });
                if(!res.ok) throw new Error('Unauthorized');
                const data = await res.json();
                
                document.getElementById('login-screen').style.display = 'none';
                document.getElementById('dashboard-content').classList.remove('d-none');
                
                document.getElementById('stat-users').textContent = data.stats.users;
                document.getElementById('stat-orders').textContent = data.stats.totalOrders;
                document.getElementById('stat-rev').textContent = 'Rp ' + data.stats.revenue.toLocaleString('id-ID');
                
                loadOrders();
                loadProducts();
            } catch(e) {
                document.getElementById('login-screen').style.display = 'block';
                localStorage.removeItem('adminKey');
            }
        }

        function switchView(tab) {
            document.getElementById('btn-tab-orders').className = 'btn btn-outline-brand';
            document.getElementById('btn-tab-products').className = 'btn btn-outline-brand';
            document.getElementById('view-orders').classList.add('d-none');
            document.getElementById('view-products').classList.add('d-none');
            
            document.getElementById(\`btn-tab-\${tab}\`).className = 'btn btn-brand';
            document.getElementById(\`view-\${tab}\`).classList.remove('d-none');
        }

        async function loadOrders() {
            try {
                const res = await fetch(\`\${API_BASE}/orders\`, { headers: { 'X-Admin-Key': CMS_KEY } });
                const data = await res.json();
                const tbody = document.getElementById('orders-tbody');
                tbody.innerHTML = data.orders.map(o => \`
                    <tr>
                        <td><span class="badge bg-secondary rounded-pill">\${o.refId || o.orderId}</span></td>
                        <td class="fw-bold">\${o.userId}</td>
                        <td class="text-primary fw-bold">\${o.productName || 'Deposit'}</td>
                        <td class="fw-bold text-success">Rp \${(o.totalUser || o.amount || 0).toLocaleString()}</td>
                        <td><span class="badge rounded-pill \${o.status==='success'?'bg-success':'bg-warning text-dark'}">\${o.status}</span></td>
                        <td class="text-muted small">\${o.createdAt}</td>
                    </tr>
                \`).join('');
            } catch(e) {}
        }

        async function loadProducts() {
            try {
                const res = await fetch(\`\${API_BASE}/products\`, { headers: { 'X-Admin-Key': CMS_KEY } });
                const data = await res.json();
                allProducts = data.items;
                const tbody = document.getElementById('products-tbody');
                tbody.innerHTML = Object.values(data.items).map(p => \`
                    <tr>
                        <td class="text-muted small">\${p.id}</td>
                        <td>\${p.catId}</td>
                        <td class="fw-bold">\${p.name}</td>
                        <td class="fw-bold text-success">Rp \${p.price.toLocaleString()}</td>
                        <td><span class="badge rounded-pill \${p.sold?'bg-danger':'bg-success'}">\${p.sold?'Habis':'Tersedia'}</span></td>
                        <td class="text-center">
                            <button onclick="editProduct('\${p.id}')" class="btn btn-sm btn-outline-primary" style="border-radius:10px;"><i class="fas fa-edit"></i></button>
                            <button onclick="deleteProduct('\${p.id}')" class="btn btn-sm btn-outline-danger" style="border-radius:10px;"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>
                \`).join('');
            } catch(e) {}
        }

        function showAddModal() {
            document.getElementById('modal-title').textContent = 'Tambah Produk';
            document.getElementById('prod-id').value = '';
            document.getElementById('prod-cat').value = 'CAT1';
            document.getElementById('prod-name').value = '';
            document.getElementById('prod-price').value = '';
            document.getElementById('prod-data').value = '';
            document.getElementById('div-sold').classList.add('d-none');
            productModal.show();
        }

        function editProduct(id) {
            const p = allProducts[id];
            if(!p) return;
            document.getElementById('modal-title').textContent = 'Edit Produk';
            document.getElementById('prod-id').value = p.id;
            document.getElementById('prod-cat').value = p.catId;
            document.getElementById('prod-name').value = p.name;
            document.getElementById('prod-price').value = p.price;
            document.getElementById('prod-data').value = p.data;
            document.getElementById('prod-sold').checked = !!p.sold;
            document.getElementById('div-sold').classList.remove('d-none');
            productModal.show();
        }

        async function saveProduct() {
            const id = document.getElementById('prod-id').value;
            const payload = {
                catId: document.getElementById('prod-cat').value,
                name: document.getElementById('prod-name').value,
                price: document.getElementById('prod-price').value,
                data: document.getElementById('prod-data').value,
                sold: document.getElementById('prod-sold').checked
            };
            
            const endpoint = id ? '/api/bot/products/edit' : '/api/bot/products/add';
            if(id) payload.id = id;

            try {
                await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'X-Admin-Key': CMS_KEY },
                    body: JSON.stringify(payload)
                });
                productModal.hide();
                loadProducts();
            } catch(e) {
                alert('Gagal menyimpan produk');
            }
        }

        async function deleteProduct(id) {
            if(!confirm('Yakin hapus produk ini?')) return;
            try {
                await fetch('/api/bot/products/delete', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'X-Admin-Key': CMS_KEY },
                    body: JSON.stringify({ id })
                });
                loadProducts();
            } catch(e) {
                alert('Gagal menghapus produk');
            }
        }

        init();
    </script>
</body>
</html>
`;
fs.writeFileSync('public/bot-cms.html', topPart.replace('style="display: none;"', '') + newTabs + botBody, 'utf8');

// ---------------------------------------------------------
// 3. UPDATE cms.html and cms-cookies.html Tabs
// ---------------------------------------------------------
function updateTabs(file, activeId) {
    let html = fs.readFileSync(file, 'utf8');
    html = html.replace(/<!-- Navigation Tabs -->[\s\S]*?<\/div>/, newTabs.trim());
    let re = new RegExp(`id="${activeId}" class="btn btn-outline-brand"`);
    html = html.replace(re, `id="${activeId}" class="btn btn-brand"`);
    fs.writeFileSync(file, html, 'utf8');
}

updateTabs('public/cms.html', 'tab-cms');
updateTabs('public/cms-cookies.html', 'tab-cookies');

// Delete the old separated files
if (fs.existsSync('public/bot-transaksi.html')) fs.unlinkSync('public/bot-transaksi.html');
if (fs.existsSync('public/bot-produk.html')) fs.unlinkSync('public/bot-produk.html');

