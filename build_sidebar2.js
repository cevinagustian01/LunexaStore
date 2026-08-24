const fs = require('fs');

const botHtml = \
<!DOCTYPE html>
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
            --primary-grad: linear-gradient(135deg, #ff7eb3, #ff758c);
            --bg-color: #fff0f5;
            --card-bg: rgba(255, 255, 255, 0.95);
            --text-main: #4a4a4a;
            --text-muted: #888888;
            --border-color: #ffe4e1;
        }
        body {
            background: linear-gradient(135deg, #fff5f8 0%, #ffe4e1 100%);
            color: var(--text-main);
            font-family: 'Inter', 'Segoe UI', Tahoma, sans-serif;
            min-height: 100vh;
        }
        .sidebar {
            width: 260px;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-right: 1px solid var(--border-color);
            position: fixed;
            height: 100vh;
            overflow-y: auto;
            z-index: 1050;
            display: flex;
            flex-direction: column;
        }
        .main-content {
            margin-left: 260px;
            padding: 30px;
            width: calc(100% - 260px);
            min-height: 100vh;
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
            background: var(--primary-grad);
            border: none;
            color: white;
            font-weight: 600;
        }
        .btn-brand:hover {
            opacity: 0.9;
            color: white;
            transform: translateY(-2px);
        }
        .active-link {
            background: linear-gradient(135deg, var(--primary), #ff758c) !important;
            color: white !important;
            box-shadow: 0 4px 15px rgba(255, 75, 130, 0.3);
        }
        .nav-link:hover:not(.active-link) {
            background: rgba(255, 75, 130, 0.1);
            color: var(--primary) !important;
        }
    </style>
</head>
<body>
    <div class="d-flex">
        <!-- Sidebar -->
        <div class="sidebar shadow-sm">
            <div class="p-4 border-bottom">
                <h4 class="fw-bold mb-0" style="color: var(--primary); letter-spacing: 1px;"><i class="fas fa-chart-line me-2"></i>LUNEXA CMS</h4>
            </div>
            
            <div class="p-3 flex-grow-1">
                <a href="cms.html" class="btn btn-outline-danger btn-sm w-100 mb-4 fw-bold" style="border-radius: 12px;"><i class="fas fa-arrow-left me-2"></i>Kembali ke CMS Utama</a>
                
                <div class="text-muted small fw-bold mb-3 ms-2 text-uppercase" style="letter-spacing: 1px; font-size: 0.75rem;">Menu Bot</div>
                <ul class="nav flex-column gap-2 mb-4">
                    <li class="nav-item">
                        <button onclick="switchView('orders')" id="btn-side-orders" class="nav-link fw-bold px-3 py-2 text-start w-100 active-link" style="border-radius: 12px; transition: all 0.3s; border: none; background: transparent;">
                            <i class="fas fa-history me-2" style="width: 20px;"></i> Transaksi Bot
                        </button>
                    </li>
                    <li class="nav-item">
                        <button onclick="switchView('products')" id="btn-side-products" class="nav-link fw-bold px-3 py-2 text-start w-100 text-secondary" style="border-radius: 12px; transition: all 0.3s; border: none; background: transparent;">
                            <i class="fas fa-box-open me-2" style="width: 20px;"></i> Produk (Toko 2)
                        </button>
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
                <button onclick="logout()" class="btn btn-outline-danger btn-sm w-100" style="border-radius: 12px; font-weight: 600;">
                    <i class="fas fa-sign-out-alt me-1"></i> Logout
                </button>
            </div>
        </div>

        <!-- Main Content -->
        <div class="main-content">
            
            <div id="login-screen" class="glass-card text-center p-5 mx-auto mt-5" style="max-width: 400px; display: none;">
                <h3 class="fw-bold mb-3" style="color: var(--primary);"><i class="fas fa-lock me-2"></i>CMS Login</h3>
                <p class="text-muted mb-4">Enter your admin key to continue</p>
                <div class="mb-3 text-start">
                    <label class="form-label fw-bold">Admin Key</label>
                    <input type="password" id="admin-key" class="form-control" style="background: #fafafa; border: 1px solid var(--border-color); color: #333; border-radius: 12px;" placeholder="Enter key..." onkeypress="if(event.key === 'Enter') login()">
                </div>
                <button class="btn btn-brand w-100" style="border-radius: 12px;" onclick="login()">Login</button>
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

                <!-- Orders View -->
                <div id="view-orders" class="glass-card">
                    <h5 class="fw-bold mb-3"><i class="fas fa-history me-2"></i>Riwayat Transaksi Bot</h5>
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
                        <h5 class="fw-bold mb-0"><i class="fas fa-box-open me-2"></i>Produk Bot (Toko 2)</h5>
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
        </div>
    </div>

    <!-- Product Modal -->
    <div class="modal fade" id="productModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content" style="border-radius: 20px; border: none; background: var(--bg-color);">
          <div class="modal-header border-0 pb-0">
            <h5 class="modal-title fw-bold" id="modal-title">Tambah Produk</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
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
        let CMS_KEY = localStorage.getItem('adminKey') || '';
        const API_BASE = '/api/bot';

        async function login() {
            const key = document.getElementById('admin-key').value;
            if(!key) return;
            document.getElementById('login-msg').textContent = 'Checking...';
            CMS_KEY = key;
            try {
                const res = await fetch(\\/stats\, { headers: { 'X-Admin-Key': CMS_KEY } });
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
                const res = await fetch(\\/stats\, { headers: { 'X-Admin-Key': CMS_KEY } });
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
            document.getElementById('btn-side-orders').className = 'nav-link fw-bold px-3 py-2 text-start w-100 text-secondary';
            document.getElementById('btn-side-products').className = 'nav-link fw-bold px-3 py-2 text-start w-100 text-secondary';
            document.getElementById('view-orders').classList.add('d-none');
            document.getElementById('view-products').classList.add('d-none');
            
            document.getElementById(\tn-side-\\).className = 'nav-link fw-bold px-3 py-2 text-start w-100 active-link';
            document.getElementById(\iew-\\).classList.remove('d-none');
        }

        async function loadOrders() {
            try {
                const res = await fetch(\\/orders\, { headers: { 'X-Admin-Key': CMS_KEY } });
                const data = await res.json();
                const tbody = document.getElementById('orders-tbody');
                tbody.innerHTML = data.orders.map(o => \
                    <tr>
                        <td><span class="badge bg-secondary rounded-pill">\</span></td>
                        <td class="fw-bold">\</td>
                        <td class="text-primary fw-bold">\</td>
                        <td class="fw-bold text-success">Rp \</td>
                        <td><span class="badge rounded-pill \">\</span></td>
                        <td class="text-muted small">\</td>
                    </tr>
                \).join('');
            } catch(e) {}
        }

        async function loadProducts() {
            try {
                const res = await fetch(\\/products\, { headers: { 'X-Admin-Key': CMS_KEY } });
                const data = await res.json();
                allProducts = data.items;
                const tbody = document.getElementById('products-tbody');
                tbody.innerHTML = Object.values(data.items).map(p => \
                    <tr>
                        <td class="text-muted small">\</td>
                        <td>\</td>
                        <td class="fw-bold">\</td>
                        <td class="fw-bold text-success">Rp \</td>
                        <td><span class="badge rounded-pill \">\</span></td>
                        <td class="text-center">
                            <button onclick="editProduct('\')" class="btn btn-sm btn-outline-primary" style="border-radius:10px;"><i class="fas fa-edit"></i></button>
                            <button onclick="deleteProduct('\')" class="btn btn-sm btn-outline-danger" style="border-radius:10px;"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>
                \).join('');
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
\
fs.writeFileSync('public/bot-cms.html', botHtml, 'utf8');

// Also clean up old bot-transaksi and bot-produk if they exist
if(fs.existsSync('public/bot-transaksi.html')) fs.unlinkSync('public/bot-transaksi.html');
if(fs.existsSync('public/bot-produk.html')) fs.unlinkSync('public/bot-produk.html');
