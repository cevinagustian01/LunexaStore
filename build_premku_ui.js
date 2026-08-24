const fs = require('fs');

let html = fs.readFileSync('public/bot-cms.html', 'utf8');

const newDashboardUI = `
            <div id="dashboard-content" class="d-none">
                <!-- Header Welcome -->
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2 class="fw-bold mb-1 text-dark" style="letter-spacing: -0.5px;">Selamat Datang, Administrator 👋</h2>
                        <p class="text-muted small mb-0">Kelola transaksi bot, pantau statistik, dan atur produk LUNEXA.</p>
                    </div>
                    <div>
                        <span class="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 px-3 py-2" style="border-radius: 20px;">
                            <i class="fas fa-circle me-1" style="font-size: 0.5rem;"></i> System Online
                        </span>
                    </div>
                </div>

                <!-- Info Marquee -->
                <div class="alert text-white mb-4 d-flex align-items-center py-2" style="background: linear-gradient(90deg, #6b46c1, #805ad5); border: none; border-radius: 12px; box-shadow: 0 4px 15px rgba(107, 70, 193, 0.2);">
                    <i class="fas fa-bullhorn me-3"></i>
                    <marquee scrollamount="6" class="small fw-bold" style="letter-spacing: 0.5px;">INFO UPDATE: Sistem transaksi API dan Bot Telegram LUNEXA beroperasi normal. 🚀 Kumpulkan total transaksi untuk fitur VIP!</marquee>
                </div>

                <!-- Main Top Section (Card + Grid) -->
                <div class="row g-4 mb-4">
                    <!-- VIP Card -->
                    <div class="col-lg-5">
                        <div class="p-4 text-white position-relative d-flex flex-column" style="background: linear-gradient(135deg, #111122, #1a1a3a); border-radius: 20px; overflow: hidden; height: 100%; min-height: 240px; box-shadow: 0 10px 30px rgba(0,0,0,0.15);">
                            <!-- Decorative blur circle -->
                            <div style="position: absolute; top: -50px; right: -50px; width: 150px; height: 150px; border-radius: 50%; background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent); filter: blur(20px);"></div>
                            <div style="position: absolute; bottom: 0; left: 0; width: 100%; height: 50%; background: linear-gradient(to top, rgba(0,0,0,0.4), transparent);"></div>
                            
                            <div class="d-flex justify-content-between align-items-center mb-4 position-relative z-1">
                                <div>
                                    <div class="text-uppercase" style="letter-spacing: 2px; color: #a0aec0; font-size: 0.65rem; font-weight: 800;">LUNEXA ADMIN CARD</div>
                                    <div class="d-flex align-items-center mt-1">
                                        <i class="fas fa-wallet text-white-50 me-2 small"></i>
                                        <div class="text-white-50 small">Total Pendapatan Bot</div>
                                    </div>
                                </div>
                                <div class="fw-bold" style="color: #cbd5e1; font-size: 0.8rem; letter-spacing: 1px;">OWNER</div>
                            </div>
                            
                            <div class="mb-auto position-relative z-1">
                                <h2 class="fw-bold mb-0 text-white" id="card-revenue" style="font-size: 2.5rem; letter-spacing: -1px;">Rp 0</h2>
                            </div>
                            
                            <div class="mt-4 pt-3 border-top border-secondary border-opacity-50 position-relative z-1 d-flex justify-content-between align-items-end">
                                <div>
                                    <div class="text-white-50" style="font-size: 0.6rem; letter-spacing: 1px;">CARD HOLDER</div>
                                    <div class="fw-bold text-uppercase mt-1" style="letter-spacing: 2px; font-size: 0.85rem;">LUNEXA ADMIN</div>
                                </div>
                                <div>
                                    <i class="fab fa-bots fs-3 text-white-50"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 8 Grid Buttons -->
                    <div class="col-lg-7">
                        <div class="row g-3 h-100">
                            <!-- Button 1 -->
                            <div class="col-3 text-center">
                                <div class="glass-card p-3 h-100 d-flex flex-column align-items-center justify-content-center cursor-pointer border-0 shadow-sm" onclick="switchView('orders')" style="transition: all 0.2s; cursor: pointer; background: white;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
                                    <div class="bg-primary bg-opacity-10 text-primary mb-2 d-flex align-items-center justify-content-center" style="width: 45px; height: 45px; border-radius: 50%;">
                                        <i class="fas fa-shopping-cart fs-5"></i>
                                    </div>
                                    <div class="text-uppercase text-muted" style="font-size: 0.55rem; font-weight: 700; letter-spacing: 1px;">PANTAU</div>
                                    <div class="fw-bold text-dark mt-1" style="font-size: 0.8rem;">Pesanan</div>
                                </div>
                            </div>
                            <!-- Button 2 -->
                            <div class="col-3 text-center">
                                <div class="glass-card p-3 h-100 d-flex flex-column align-items-center justify-content-center cursor-pointer border-0 shadow-sm" onclick="switchView('products')" style="transition: all 0.2s; cursor: pointer; background: white;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
                                    <div class="bg-success bg-opacity-10 text-success mb-2 d-flex align-items-center justify-content-center" style="width: 45px; height: 45px; border-radius: 50%;">
                                        <i class="fas fa-box-open fs-5"></i>
                                    </div>
                                    <div class="text-uppercase text-muted" style="font-size: 0.55rem; font-weight: 700; letter-spacing: 1px;">KATALOG</div>
                                    <div class="fw-bold text-dark mt-1" style="font-size: 0.8rem;">Produk</div>
                                </div>
                            </div>
                            <!-- Button 3 -->
                            <div class="col-3 text-center">
                                <div class="glass-card p-3 h-100 d-flex flex-column align-items-center justify-content-center cursor-pointer border-0 shadow-sm" onclick="switchView('settings')" style="transition: all 0.2s; cursor: pointer; background: white;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
                                    <div class="bg-warning bg-opacity-10 text-warning mb-2 d-flex align-items-center justify-content-center" style="width: 45px; height: 45px; border-radius: 50%;">
                                        <i class="fas fa-cog fs-5"></i>
                                    </div>
                                    <div class="text-uppercase text-muted" style="font-size: 0.55rem; font-weight: 700; letter-spacing: 1px;">ATUR</div>
                                    <div class="fw-bold text-dark mt-1" style="font-size: 0.8rem;">Harga</div>
                                </div>
                            </div>
                            <!-- Button 4 -->
                            <div class="col-3 text-center">
                                <div class="glass-card p-3 h-100 d-flex flex-column align-items-center justify-content-center cursor-pointer border-0 shadow-sm" onclick="window.location.href='cms.html'" style="transition: all 0.2s; cursor: pointer; background: white;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
                                    <div class="bg-info bg-opacity-10 text-info mb-2 d-flex align-items-center justify-content-center" style="width: 45px; height: 45px; border-radius: 50%;">
                                        <i class="fas fa-chart-line fs-5"></i>
                                    </div>
                                    <div class="text-uppercase text-muted" style="font-size: 0.55rem; font-weight: 700; letter-spacing: 1px;">UTAMA</div>
                                    <div class="fw-bold text-dark mt-1" style="font-size: 0.8rem;">Data Trx</div>
                                </div>
                            </div>
                            <!-- Button 5 -->
                            <div class="col-3 text-center">
                                <div class="glass-card p-3 h-100 d-flex flex-column align-items-center justify-content-center cursor-pointer border-0 shadow-sm opacity-50" style="background: white;">
                                    <div class="bg-danger bg-opacity-10 text-danger mb-2 d-flex align-items-center justify-content-center" style="width: 45px; height: 45px; border-radius: 50%;">
                                        <i class="fas fa-gift fs-5"></i>
                                    </div>
                                    <div class="text-uppercase text-muted" style="font-size: 0.55rem; font-weight: 700; letter-spacing: 1px;">BONUS</div>
                                    <div class="fw-bold text-dark mt-1" style="font-size: 0.8rem;">Gacha</div>
                                </div>
                            </div>
                            <!-- Button 6 -->
                            <div class="col-3 text-center">
                                <div class="glass-card p-3 h-100 d-flex flex-column align-items-center justify-content-center cursor-pointer border-0 shadow-sm opacity-50" style="background: white;">
                                    <div class="bg-danger bg-opacity-10 text-danger mb-2 d-flex align-items-center justify-content-center" style="width: 45px; height: 45px; border-radius: 50%;">
                                        <i class="fas fa-headset fs-5"></i>
                                    </div>
                                    <div class="text-uppercase text-muted" style="font-size: 0.55rem; font-weight: 700; letter-spacing: 1px;">BANTUAN</div>
                                    <div class="fw-bold text-dark mt-1" style="font-size: 0.8rem;">Tiket</div>
                                </div>
                            </div>
                            <!-- Button 7 -->
                            <div class="col-3 text-center">
                                <div class="glass-card p-3 h-100 d-flex flex-column align-items-center justify-content-center cursor-pointer border-0 shadow-sm opacity-50" style="background: white;">
                                    <div class="bg-success bg-opacity-10 text-success mb-2 d-flex align-items-center justify-content-center" style="width: 45px; height: 45px; border-radius: 50%;">
                                        <i class="fas fa-money-check-alt fs-5"></i>
                                    </div>
                                    <div class="text-uppercase text-muted" style="font-size: 0.55rem; font-weight: 700; letter-spacing: 1px;">LAPORAN</div>
                                    <div class="fw-bold text-dark mt-1" style="font-size: 0.8rem;">Mutasi</div>
                                </div>
                            </div>
                            <!-- Button 8 -->
                            <div class="col-3 text-center">
                                <div class="glass-card p-3 h-100 d-flex flex-column align-items-center justify-content-center cursor-pointer border-0 shadow-sm opacity-50" style="background: white;">
                                    <div class="bg-secondary bg-opacity-10 text-secondary mb-2 d-flex align-items-center justify-content-center" style="width: 45px; height: 45px; border-radius: 50%;">
                                        <i class="fas fa-user-cog fs-5"></i>
                                    </div>
                                    <div class="text-uppercase text-muted" style="font-size: 0.55rem; font-weight: 700; letter-spacing: 1px;">AKUN</div>
                                    <div class="fw-bold text-dark mt-1" style="font-size: 0.8rem;">Profil</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Bottom Stats Cards -->
                <div class="row g-4 mb-4">
                    <div class="col-md-4">
                        <div class="glass-card d-flex flex-column justify-content-center p-4 border-0 shadow-sm h-100" style="background: white; border-radius: 16px;">
                            <div class="d-flex align-items-center mb-3">
                                <div class="bg-success bg-opacity-10 text-success me-3 d-flex align-items-center justify-content-center" style="width: 35px; height: 35px; border-radius: 50%;">
                                    <i class="fas fa-users fs-6"></i>
                                </div>
                                <div class="text-muted small fw-bold text-uppercase" style="font-size: 0.65rem; letter-spacing: 1px;">TOTAL PENGGUNA BOT</div>
                            </div>
                            <h3 class="fw-bold mb-0 text-dark" id="card-users">0 <span class="text-muted fw-normal" style="font-size: 1rem;">Users</span></h3>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="glass-card d-flex flex-column justify-content-center p-4 border-0 shadow-sm h-100" style="background: white; border-radius: 16px;">
                            <div class="d-flex align-items-center mb-3">
                                <div class="bg-primary bg-opacity-10 text-primary me-3 d-flex align-items-center justify-content-center" style="width: 35px; height: 35px; border-radius: 50%;">
                                    <i class="fas fa-shopping-bag fs-6"></i>
                                </div>
                                <div class="text-muted small fw-bold text-uppercase" style="font-size: 0.65rem; letter-spacing: 1px;">TOTAL PESANAN BOT</div>
                            </div>
                            <h3 class="fw-bold mb-0 text-dark" id="card-orders">0 <span class="text-muted fw-normal" style="font-size: 1rem;">Trx</span></h3>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="glass-card d-flex flex-column justify-content-center p-4 border-0 shadow-sm h-100" style="background: white; border-radius: 16px;">
                            <div class="d-flex align-items-center mb-3">
                                <div class="bg-info bg-opacity-10 text-info me-3 d-flex align-items-center justify-content-center" style="width: 35px; height: 35px; border-radius: 50%;">
                                    <i class="fas fa-box fs-6"></i>
                                </div>
                                <div class="text-muted small fw-bold text-uppercase" style="font-size: 0.65rem; letter-spacing: 1px;">PRODUK AKTIF TOKO</div>
                            </div>
                            <h3 class="fw-bold mb-0 text-dark" id="card-products">0 <span class="text-muted fw-normal" style="font-size: 1rem;">Item</span></h3>
                        </div>
                    </div>
                </div>

                <!-- Spacer between grid and views -->
                <div class="border-top mb-4 opacity-25"></div>

                <!-- Data Views Below -->
`;

const replaceRegex = /<div id="dashboard-content" class="d-none">[\s\S]*?<!-- Orders View -->/;

html = html.replace(replaceRegex, newDashboardUI + '\n                <!-- Orders View -->');

// Also update javascript variables mapped to the DOM
const jsUpdates = `
                document.getElementById('card-users').innerHTML = data.stats.users + ' <span class="text-muted fw-normal" style="font-size: 1rem;">Users</span>';
                document.getElementById('card-orders').innerHTML = data.stats.totalOrders + ' <span class="text-muted fw-normal" style="font-size: 1rem;">Trx</span>';
                document.getElementById('card-revenue').textContent = 'Rp ' + data.stats.revenue.toLocaleString('id-ID');
                
                // wait for products to load to update card-products
                setTimeout(() => {
                    const totalProducts = Object.keys(allProducts).length;
                    document.getElementById('card-products').innerHTML = totalProducts + ' <span class="text-muted fw-normal" style="font-size: 1rem;">Item</span>';
                }, 1000);
`;

html = html.replace(/document\.getElementById\('stat-users'\)\.textContent = data\.stats\.users;[\s\S]*?toLocaleString\('id-ID'\);/, jsUpdates);

fs.writeFileSync('public/bot-cms.html', html, 'utf8');
console.log('UI Rebuild Complete');
