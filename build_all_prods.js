const fs = require('fs');

let html = fs.readFileSync('public/bot-cms.html', 'utf8');

const oldRender = `                tbody.innerHTML = Object.values(data.items).map(p => \`
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
                \`).join('');`;

const newRender = `                tbody.innerHTML = Object.values(data.items).map(p => {
                    const priceFormatted = typeof p.price === 'number' ? 'Rp ' + p.price.toLocaleString() : p.price;
                    const actionBtns = p.isPremku 
                        ? \`<span class="badge bg-secondary">Integrasi</span>\` 
                        : \`
                            <button onclick="editProduct('\${p.id}')" class="btn btn-sm btn-outline-primary" style="border-radius:10px;"><i class="fas fa-edit"></i></button>
                            <button onclick="deleteProduct('\${p.id}')" class="btn btn-sm btn-outline-danger" style="border-radius:10px;"><i class="fas fa-trash"></i></button>
                          \`;
                    return \`
                    <tr>
                        <td class="text-muted small">\${String(p.id).substring(0,8)}</td>
                        <td><span class="badge bg-light text-dark border">\${p.catId}</span></td>
                        <td class="fw-bold">\${p.name} \${p.isPremku ? '<i class="fas fa-link text-info ms-1" title="Produk Integrasi"></i>' : ''}</td>
                        <td class="fw-bold text-success">\${priceFormatted}</td>
                        <td><span class="badge rounded-pill \${p.sold?'bg-danger':'bg-success'}">\${p.sold?'Habis':'Tersedia'}</span></td>
                        <td class="text-center">
                            \${actionBtns}
                        </td>
                    </tr>
                    \`;
                }).join('');`;

html = html.replace(oldRender, newRender);

fs.writeFileSync('public/bot-cms.html', html, 'utf8');
console.log('Done patch html');
