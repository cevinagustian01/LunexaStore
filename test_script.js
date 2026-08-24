
        let CMS_KEY = localStorage.getItem('adminKey') || '';
        const API_BASE = '/api/bot';

        async function login() {
            const key = document.getElementById('admin-key').value;
            if(!key) return;
            document.getElementById('login-msg').textContent = 'Checking...';
            CMS_KEY = key;
            try {
                const res = await fetch(`${API_BASE}/stats`, { headers: { 'X-Admin-Key': CMS_KEY } });
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
                const res = await fetch(`${API_BASE}/stats`, { headers: { 'X-Admin-Key': CMS_KEY } });
                if(!res.ok) throw new Error('Unauthorized');
                const data = await res.json();
                
                document.getElementById('login-screen').style.display = 'none';
                document.getElementById('dashboard-content').classList.remove('d-none');
                
                
                document.getElementById('card-users').innerHTML = data.stats.users + ' <span class="text-muted fw-normal" style="font-size: 1rem;">Users</span>';
                document.getElementById('card-orders').innerHTML = data.stats.totalOrders + ' <span class="text-muted fw-normal" style="font-size: 1rem;">Trx</span>';
                document.getElementById('card-revenue').textContent = 'Rp ' + data.stats.revenue.toLocaleString('id-ID');
                
                // wait for products to load to update card-products
                setTimeout(() => {
                    const totalProducts = Object.keys(allProducts).length;
                    document.getElementById('card-products').innerHTML = totalProducts + ' <span class="text-muted fw-normal" style="font-size: 1rem;">Item</span>';
                }, 1000);

                
                loadOrders();
                loadProducts();
                loadSettings();
            } catch(e) {
                document.getElementById('login-screen').style.display = 'block';
                localStorage.removeItem('adminKey');
            }
        }

        
        function switchView(tab) {
            document.getElementById('view-orders').classList.add('d-none');
            document.getElementById('view-products').classList.add('d-none');
            document.getElementById('view-settings').classList.add('d-none');
            
            document.getElementById('view-' + tab).classList.remove('d-none');
        }

        async function loadSettings() {
            try {
                const res = await fetch(`${API_BASE}/settings`, { headers: { 'X-Admin-Key': CMS_KEY } });
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
                await fetch(`${API_BASE}/settings`, {
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
        }
        }

        async function loadOrders() {
            try {
                const res = await fetch(`${API_BASE}/orders`, { headers: { 'X-Admin-Key': CMS_KEY } });
                const data = await res.json();
                const tbody = document.getElementById('orders-tbody');
                tbody.innerHTML = data.orders.map(o => `
                    <tr>
                        <td><span class="badge bg-secondary rounded-pill">${o.refId || o.orderId}</span></td>
                        <td class="fw-bold">${o.userId}</td>
                        <td class="text-primary fw-bold">${o.productName || 'Deposit'}</td>
                        <td class="fw-bold text-success">Rp ${(o.totalUser || o.amount || 0).toLocaleString()}</td>
                        <td><span class="badge rounded-pill ${o.status==='success'?'bg-success':'bg-warning text-dark'}">${o.status}</span></td>
                        <td class="text-muted small">${o.createdAt}</td>
                    </tr>
                `).join('');
            } catch(e) {}
        }

        async function loadProducts() {
            try {
                const res = await fetch(`${API_BASE}/products`, { headers: { 'X-Admin-Key': CMS_KEY } });
                const data = await res.json();
                allProducts = data.items;
                const tbody = document.getElementById('products-tbody');
                tbody.innerHTML = Object.values(data.items).map(p => {
                    const priceFormatted = typeof p.price === 'number' ? 'Rp ' + p.price.toLocaleString() : p.price;
                    const actionBtns = p.isPremku 
                        ? `<span class="badge bg-secondary">Integrasi</span>` 
                        : `
                            <button onclick="editProduct('${p.id}')" class="btn btn-sm btn-outline-primary" style="border-radius:10px;"><i class="fas fa-edit"></i></button>
                            <button onclick="deleteProduct('${p.id}')" class="btn btn-sm btn-outline-danger" style="border-radius:10px;"><i class="fas fa-trash"></i></button>
                          `;
                    return `
                    <tr>
                        <td class="text-muted small">${String(p.id).substring(0,8)}</td>
                        <td><span class="badge bg-light text-dark border">${p.catId}</span></td>
                        <td class="fw-bold">${p.name} ${p.isPremku ? '<i class="fas fa-link text-info ms-1" title="Produk Integrasi"></i>' : ''}</td>
                        <td class="fw-bold text-success">${priceFormatted}</td>
                        <td><span class="badge rounded-pill ${p.sold?'bg-danger':'bg-success'}">${p.sold?'Habis':'Tersedia'}</span></td>
                        <td class="text-center">
                            ${actionBtns}
                        </td>
                    </tr>
                    `;
                }).join('');
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
    